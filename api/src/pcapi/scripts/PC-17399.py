import logging

from pcapi.core.finance.models import BankInformationStatus
from pcapi.core.offerers import api as offerers_api
import pcapi.core.offerers.models as offerers_models
from pcapi.core.users.external import update_external_pro
from pcapi.domain.bank_information import CannotRegisterBankInformation
from pcapi.domain.bank_information import check_new_bank_information_has_a_more_advanced_status
from pcapi.domain.bank_information import check_new_bank_information_older_than_saved_one
from pcapi.domain.bank_information import check_new_bank_information_valid
from pcapi.domain.bank_informations.bank_informations import BankInformations
from pcapi.domain.bank_informations.bank_informations_repository import BankInformationsRepository
from pcapi.domain.demarches_simplifiees import ApplicationDetail
from pcapi.domain.demarches_simplifiees import archive_dossier
from pcapi.domain.demarches_simplifiees import format_error_to_demarches_simplifiees_text
from pcapi.domain.demarches_simplifiees import get_venue_bank_information_application_details_by_application_id
from pcapi.domain.demarches_simplifiees import update_demarches_simplifiees_text_annotations
from pcapi.domain.venue.venue_with_basic_information.venue_with_basic_information import VenueWithBasicInformation
from pcapi.domain.venue.venue_with_basic_information.venue_with_basic_information_repository import (
    VenueWithBasicInformationRepository,
)
from pcapi.infrastructure.repository.bank_informations.bank_informations_sql_repository import (
    BankInformationsSQLRepository,
)
from pcapi.infrastructure.repository.venue.venue_with_basic_information.venue_with_basic_information_sql_repository import (
    VenueWithBasicInformationSQLRepository,
)


logger = logging.getLogger(__name__)


class SaveVenueBankInformations:
    def __init__(
        self,
        venue_repository: VenueWithBasicInformationRepository,
        bank_informations_repository: BankInformationsRepository,
    ):
        self.venue_repository = venue_repository
        self.bank_informations_repository = bank_informations_repository

    def execute(self, application_id: str, procedure_id: str = "4") -> BankInformations | None:
        application_details = get_venue_bank_information_application_details_by_application_id(
            application_id=application_id,
            procedure_version=int(procedure_id),
            dms_api_version=2,
        )

        api_errors = CannotRegisterBankInformation()

        venue = self.get_referent_venue(application_details, api_errors)

        if api_errors.errors:
            if application_details.annotation_id is not None:
                if application_details.status != BankInformationStatus.REJECTED:
                    update_demarches_simplifiees_text_annotations(
                        application_details.dossier_id,  # type: ignore [arg-type]
                        application_details.annotation_id,
                        format_error_to_demarches_simplifiees_text(api_errors),
                    )
                return None
            if application_details.status == BankInformationStatus.ACCEPTED:
                raise api_errors
            return None

        assert venue  # for typing purposes
        bank_information = self.bank_informations_repository.get_by_application(application_details.application_id)
        if not bank_information:
            bank_information = self.bank_informations_repository.find_by_venue(venue.identifier)

        if bank_information:
            check_new_bank_information_older_than_saved_one(
                bank_information, application_details.modification_date, api_errors
            )
            if (
                bank_information.venue_id == venue.identifier
                and bank_information.application_id != application_details.application_id
            ):
                check_new_bank_information_has_a_more_advanced_status(
                    bank_information, application_details.status, api_errors
                )

        new_bank_informations = self.create_new_bank_informations(application_details, venue.identifier)

        check_new_bank_information_valid(new_bank_informations, api_errors)

        if api_errors.errors:
            if application_details.annotation_id is not None:
                update_demarches_simplifiees_text_annotations(
                    application_details.dossier_id,  # type: ignore [arg-type]
                    application_details.annotation_id,
                    format_error_to_demarches_simplifiees_text(api_errors),
                )
                return None
            raise api_errors

        if not bank_information:
            self.bank_informations_repository.save(new_bank_informations)
        elif bank_information.application_id == application_details.application_id:
            self.bank_informations_repository.update_by_application_id(new_bank_informations)
        elif bank_information.venue_id == venue.identifier:
            self.bank_informations_repository.update_by_venue_id(new_bank_informations)
        else:
            raise NotImplementedError()

        if application_details.status == BankInformationStatus.ACCEPTED:
            venue_sql_entity = offerers_models.Venue.query.get(venue.identifier)
            offerers_api.link_venue_to_reimbursement_point(venue_sql_entity, venue.identifier)

        update_external_pro(venue.bookingEmail)
        if application_details.annotation_id is not None:
            if application_details.status == BankInformationStatus.ACCEPTED:
                update_demarches_simplifiees_text_annotations(
                    application_details.dossier_id,  # type: ignore [arg-type]
                    application_details.annotation_id,
                    "Dossier exceptionally imported (cf JIRA PC-17399)",
                )
            if application_details.status == BankInformationStatus.DRAFT:
                raise Exception("Unexpected draft status")
        if application_details.status != BankInformationStatus.DRAFT:
            archive_dossier(application_details.dossier_id)  # type: ignore [arg-type]
        return bank_information

    def get_referent_venue(
        self,
        application_details: ApplicationDetail,
        api_errors: CannotRegisterBankInformation,
    ) -> VenueWithBasicInformation | None:
        venue = None
        if dms_token := (application_details.dms_token or "").strip():
            venue = self.venue_repository.find_by_dms_token(dms_token)
            if not venue:
                api_errors.add_error("Venue", "Venue not found")

        assert venue, "Could not find venue"
        logger.info("Bypassing the SIRET check (cf JIRA PC-17399")
        return venue

    def create_new_bank_informations(self, application_details: ApplicationDetail, venue_id: int) -> BankInformations:
        new_bank_informations = BankInformations()
        new_bank_informations.application_id = application_details.application_id  # type: ignore [assignment]
        new_bank_informations.venue_id = venue_id
        new_bank_informations.status = application_details.status  # type: ignore [assignment]
        new_bank_informations.date_modified = application_details.modification_date
        if application_details.status == BankInformationStatus.ACCEPTED:
            new_bank_informations.iban = application_details.iban
            new_bank_informations.bic = application_details.bic
        else:
            new_bank_informations.iban = None
            new_bank_informations.bic = None
        return new_bank_informations


bank_informations_repository = BankInformationsSQLRepository()
venue_identifier_repository = VenueWithBasicInformationSQLRepository()

save_venue_bank_informations = SaveVenueBankInformations(
    venue_repository=venue_identifier_repository,
    bank_informations_repository=bank_informations_repository,
)


def save_bank_info_override_sirene(application_id: str, procedure_id: str) -> None:
    save_venue_bank_informations.execute(application_id, procedure_id)
