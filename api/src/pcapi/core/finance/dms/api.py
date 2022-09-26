from datetime import datetime
import logging

from schwifty import BIC
from schwifty import IBAN

from pcapi import settings
from pcapi.connectors.dms import api as dms_api
from pcapi.connectors.dms import models as dms_models
from pcapi.connectors.dms import serializer as dms_serializer
from pcapi.core.finance import models as finance_models
from pcapi.core.finance.models import BankInformation
from pcapi.core.offerers import repository as offerers_repository
from pcapi.utils import urls


logger = logging.getLogger(__name__)


PROCEDURE_NUMBER_VERSION_MAP = {
    settings.DMS_VENUE_PROCEDURE_ID_V2: 2,
    settings.DMS_VENUE_PROCEDURE_ID_V3: 3,
    settings.DMS_VENUE_PROCEDURE_ID_V4: 4,
}
DEPRECATED_PROCEDURE_VERSIONS = (2, 3)
BANK_INFO_STATUS_WEIGHT = {
    finance_models.BankInformationStatus.ACCEPTED: 2,
    finance_models.BankInformationStatus.DRAFT: 1,
    finance_models.BankInformationStatus.REJECTED: 0,
}


def handle_dms_venue_application(
    dms_application: dms_models.DmsApplicationResponse,
) -> finance_models.BankInformation | None:
    application_number = dms_application.number
    application_scalar_id = dms_application.id  # a base-64 encoded str such as b"Dossier-1234"
    state = dms_application.state
    procedure_number = dms_application.procedure.number
    procedure_version = PROCEDURE_NUMBER_VERSION_MAP[procedure_number]

    log_extra_data = {
        "application_number": application_number,
        "application_scalar_id": application_scalar_id,
        "procedure_number": procedure_number,
        "procedure_version": procedure_version,
        "dms_state": state,
    }

    if procedure_version not in PROCEDURE_NUMBER_VERSION_MAP:
        logger.error("[DMS][BANK_INFO] Unknown procedure number for application", extra=log_extra_data)

    if procedure_version in DEPRECATED_PROCEDURE_VERSIONS:
        logger.info(
            "This DMS application was created on a bank info procedure that is deprecated.",
            extra={
                "application_number": application_number,
                "procedure_version": procedure_version,
                "procedure_number": procedure_number,
            },
        )

    application_content = dms_serializer.parse_venue_bank_information_graphql(dms_application)
    logger.info("[DMS] Application received with state %s", state, extra=log_extra_data)

    if procedure_version in DEPRECATED_PROCEDURE_VERSIONS:
        venue = offerers_repository.find_venue_by_siret(application_content.siret)
    else:
        venue = offerers_repository.find_venue_by_dms_token(application_content.dms_token)

    if not venue:
        logger.error("[DMS][BANK_INFO] Venue not found for application", extra=log_extra_data)
        return None

    if application_content.venue_url_annotation:
        result = _update_application_annotation_text(
            application_scalar_id,
            application_content.venue_url_annotation.id,
            urls.build_pc_pro_venue_link(venue),
        )
        errors = result["dossierModifierAnnotationText"].get("errors")  # pylint: disable=unsubscriptable-object
        if errors:
            logger.error("[DMS][BANK_INFO] Got errors when updating DMS annotation", extra=log_extra_data)

    bank_information = BankInformation.query.filter(applicationId=application_content.application_number).one_or_none()
    if not bank_information:
        bank_information = BankInformation.query.filter(venueId=venue.id).one_or_none()

    if bank_information:
        check_new_bank_information_older_than_saved_one(
            bank_information, application_content.latest_modification_datetime, log_extra_data
        )
        if (
            bank_information.venue_id == venue.id
            and bank_information.application_id != application_content.application_number
        ):
            check_new_bank_information_has_a_more_advanced_status(
                # TODO traduire state en status
                bank_information,
                application_content.status,
                log_extra_data,
            )

    # new_bank_informations = self.create_new_bank_informations(application_details, venue.identifier)
    #
    # check_new_bank_information_valid(new_bank_informations, api_errors)

    return None


def _update_application_annotation_text(application_scalar_id: str, annotation_id: str, message: str) -> dict:
    client = dms_api.DMSGraphQLClient()
    return client.update_text_annotation(
        dossier_id=application_scalar_id,
        instructeur_id=settings.DMS_INSTRUCTOR_ID,
        annotation_id=annotation_id,
        value=message,
    )


def check_new_bank_information_older_than_saved_one(
    bank_information: finance_models.BankInformation, modification_date: datetime, log_extra_data: dict
) -> None:
    is_new_bank_information_older_than_saved_one = (
        bank_information.dateModified is not None and modification_date < bank_information.date_modified
    )
    if is_new_bank_information_older_than_saved_one:
        logger.error("[DMS][BANK_INFO] Received application details are older than saved one", extra=log_extra_data)


def check_new_bank_information_has_a_more_advanced_status(
    bank_information: finance_models.BankInformation, status: finance_models.BankInformationStatus, log_extra_data: dict
) -> None:
    is_new_bank_information_status_more_important_than_saved_one = (
        bank_information.status and BANK_INFO_STATUS_WEIGHT[status] < BANK_INFO_STATUS_WEIGHT[bank_information.status]  # type: ignore [index]
    )
    if is_new_bank_information_status_more_important_than_saved_one:
        if status == finance_models.BankInformationStatus.DRAFT:
            logger.error(
                "[DMS][BANK_INFO] Received application is in draft state. Move it to 'Accepté' to save it",
                extra=log_extra_data,
            )
        else:
            logger.error(
                "[DMS][BANK_INFO] Received application details state does not allow to change bank information",
                extra=log_extra_data,
            )


def check_new_bank_information_valid(bank_information: finance_models.BankInformation, log_extra_data: dict) -> None:
    if bank_information.status == finance_models.BankInformationStatus.ACCEPTED:
        if bank_information.iban is None:
            logger.error("[DMS][BANK_INFO] IBAN is missing", extra=log_extra_data)
        else:
            try:
                IBAN(bank_information.iban)
            except (ValueError, TypeError):
                logger.error("[DMS][BANK_INFO] IBAN is invalid", extra=log_extra_data | {"iban": bank_information.iban})
        if bank_information.bic is None:
            logger.error("[DMS][BANK_INFO] BIC is missing", extra=log_extra_data)
        else:
            try:
                BIC(bank_information.bic)
            except (ValueError, TypeError):
                logger.error("[DMS][BANK_INFO] BIC is invalid", extra=log_extra_data | {"iban": bank_information.bic})
    else:
        if bank_information.iban:
            logger.error(
                "[DMS][BANK_INFO] IBAN must be empty for this bank information state: %s", bank_information.status.name
            )
        if bank_information.bic:
            logger.error(
                "[DMS][BANK_INFO] BIC must be empty for this bank information state: %s", bank_information.status.name
            )
