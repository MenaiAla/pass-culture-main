import typing

from flask import render_template
from flask_wtf import FlaskForm
import wtforms
from wtforms import validators

import pcapi.core.fraud.models as fraud_models
import pcapi.core.users.models as users_models


class EditAccountForm(FlaskForm):
    last_name = wtforms.StringField(
        "lastName",
        #  widget=search_terms_field_widget,
        validators=[
            validators.InputRequired(message="Nom obligatoire"),
        ],
    )

    first_name = wtforms.StringField(
       "firstName",
       #  widget=search_terms_field_widget,
       validators=[
           validators.InputRequired(message="Prénom obligatoire"),
       ],
    )

    email = wtforms.StringField(
       "email",
       #  widget=search_terms_field_widget,
       validators=[
           validators.InputRequired(message="Email obligatoire"),
       ],
    )


def account_eligibility_field_widget(field: wtforms.SelectField, *args: typing.Any, **kwargs: typing.Any) -> str:
    return render_template("components/forms/account/eligibility.html", field=field, label="éligilité")


def account_status_field_widget(field: wtforms.SelectField, *args: typing.Any, **kwargs: typing.Any) -> str:
    return render_template("components/forms/account/status.html", field=field, label="Nouveau statut")


def account_reason_field_widget(field: wtforms.SelectField, *args: typing.Any, **kwargs: typing.Any) -> str:
    return render_template("components/forms/account/reason.html", field=field, label="Raison du changement")


class ManualReviewForm(FlaskForm):
    status = wtforms.SelectField(
        "status",
        choices=[opt.value for opt in fraud_models.FraudReviewStatus],
        validators=[validators.InputRequired("Le statut est obligatoire")],
        widget=account_status_field_widget,
    )

    eligibility = wtforms.SelectField(
        "eligibility",
        choices=[(opt.name, opt.value) for opt in users_models.EligibilityType],
        validators=[validators.InputRequired("L'éligibilité est obligatoire")],
        widget=account_eligibility_field_widget,
    )

    reason = wtforms.StringField(
        "reason",
        validators=[validators.InputRequired("La raison est obligatoire")],
        widget=account_reason_field_widget,
    )
