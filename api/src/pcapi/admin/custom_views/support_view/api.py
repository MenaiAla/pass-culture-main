import enum
import logging

import flask

import pcapi.core.fraud.api as fraud_api
import pcapi.core.fraud.models as fraud_models
from pcapi.core.mails.transactional.users.subscription_document_error import send_subscription_document_error_email
import pcapi.core.payments.exceptions as payment_exceptions
from pcapi.core.subscription import api as subscription_api
from pcapi.core.subscription import messages as subscription_messages
import pcapi.core.subscription.exceptions as subscription_exceptions
from pcapi.core.subscription.models import SubscriptionItemStatus
import pcapi.core.users.api as users_api
import pcapi.core.users.models as users_models
from pcapi.models import db


logger = logging.getLogger(__name__)


class BeneficiaryActivationStatus(enum.Enum):
    INCOMPLETE = "incomplete"
    KO = "ko"
    NOT_APPLICABLE = "n/a"
    OK = "ok"
    SUSPICIOUS = "suspicious"


SUBSCRIPTION_ITEM_METHODS = [
    subscription_api.get_email_validation_subscription_item,
    subscription_api.get_phone_validation_subscription_item,
    subscription_api.get_user_profiling_subscription_item,
    subscription_api.get_profile_completion_subscription_item,
    subscription_api.get_identity_check_subscription_item,
    subscription_api.get_honor_statement_subscription_item,
]


def get_subscription_items_by_eligibility(user: users_models.User):  # type: ignore [no-untyped-def]
    subscription_items = []
    for method in SUBSCRIPTION_ITEM_METHODS:
        subscription_items.append(
            {
                users_models.EligibilityType.UNDERAGE.name: method(user, users_models.EligibilityType.UNDERAGE),
                users_models.EligibilityType.AGE18.name: method(user, users_models.EligibilityType.AGE18),
            },
        )

    return subscription_items


def get_beneficiary_activation_status(user: users_models.User) -> BeneficiaryActivationStatus:
    if user.is_beneficiary and not users_api.is_eligible_for_beneficiary_upgrade(user, user.eligibility):
        return BeneficiaryActivationStatus.OK

    # even if the user is above 18, we want to know the status in case subscription steps were performed
    eligibility = user.eligibility or users_models.EligibilityType.AGE18

    subscription_items = [method(user, eligibility) for method in SUBSCRIPTION_ITEM_METHODS]
    if any(item.status == SubscriptionItemStatus.KO for item in subscription_items):
        return BeneficiaryActivationStatus.KO
    if any(item.status == SubscriptionItemStatus.SUSPICIOUS for item in subscription_items):
        return BeneficiaryActivationStatus.SUSPICIOUS
    if any(item.status in (SubscriptionItemStatus.TODO, SubscriptionItemStatus.PENDING) for item in subscription_items):
        return BeneficiaryActivationStatus.INCOMPLETE

    return BeneficiaryActivationStatus.NOT_APPLICABLE


def on_admin_review(review: fraud_models.BeneficiaryFraudReview, user: users_models.User, data):  # type: ignore [no-untyped-def]

    if review.review == fraud_models.FraudReviewStatus.OK.value:
        fraud_check = fraud_api.get_last_filled_identity_fraud_check(user)
        if not fraud_check:
            flask.flash("Pas de vérification d'identité effectuée", "error")
            return flask.redirect(flask.url_for(".details_view", id=user.id))

        source_data = fraud_check.source_data()

        users_api.update_user_information_from_external_source(user, source_data)  # type: ignore [arg-type]
        if data["eligibility"] == "Par défaut":
            eligibility = fraud_api.decide_eligibility(user, source_data)  # type: ignore [arg-type]

            if not eligibility:
                flask.flash(
                    "Aucune éligibilité trouvée. Veuillez choisir une autre Eligibilité que 'Par défaut'", "error"
                )
                return flask.redirect(flask.url_for(".details_view", id=user.id))
        else:
            eligibility = users_models.EligibilityType[data["eligibility"]]
        try:
            subscription_api.activate_beneficiary_for_eligibility(user, fraud_check, eligibility)
            flask.flash(f"L'utilisateur a bien été activé en tant que bénéficiaire '{eligibility.value}'", "success")

        except subscription_exceptions.InvalidEligibilityTypeException:
            flask.flash(f"L'égibilité '{eligibility.value}' n'existe pas !", "error")
            return flask.redirect(flask.url_for(".details_view", id=user.id))
        except subscription_exceptions.CannotUpgradeBeneficiaryRole:
            flask.flash(f"L'utilisateur ne peut pas être promu au rôle {eligibility.value}", "error")
            return flask.redirect(flask.url_for(".details_view", id=user.id))
        except payment_exceptions.UserHasAlreadyActiveDeposit:
            flask.flash(f"L'utilisateur bénéficie déjà d'un déposit non expiré du type '{eligibility.value}'", "error")
            return flask.redirect(flask.url_for(".details_view", id=user.id))
        except payment_exceptions.DepositTypeAlreadyGrantedException:
            flask.flash("Un déposit de ce type a déjà été créé", "error")
            return flask.redirect(flask.url_for(".details_view", id=user.id))

    elif review.review == fraud_models.FraudReviewStatus.REDIRECTED_TO_DMS.value:
        review.reason += " ; Redirigé vers DMS"  # type: ignore [operator]

        send_subscription_document_error_email(user.email, "unread-document")
        flask.flash("L'utilisateur  à été redirigé vers DMS")
        subscription_messages.on_redirect_to_dms_from_idcheck(user)
    elif review.review == fraud_models.FraudReviewStatus.KO.value:
        subscription_messages.on_fraud_review_ko(user)

    db.session.add(review)
    db.session.commit()

    flask.flash("Une revue manuelle ajoutée pour l'utilisateur")
    return flask.redirect(flask.url_for(".details_view", id=user.id))
