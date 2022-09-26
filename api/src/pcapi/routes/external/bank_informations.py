from pcapi.connectors.dms import api as dms_connector_api
from pcapi.core.finance.dms import api as dms_finance_api
from pcapi.routes.apis import public_api
from pcapi.serialization.decorator import spectree_serialize
from pcapi.validation.routes import dms as dms_validation


@public_api.post("/bank_informations/venue/application_update")
@dms_validation.require_dms_token
@spectree_serialize(on_success_status=202, json_format=False, on_error_statuses=[400])
def update_venue_dms_application(form: dms_validation.DMSWebhookRequest) -> None:
    dms_application = dms_connector_api.DMSGraphQLClient().get_bank_info_application_details(
        application_number=form.dossier_id
    )
    dms_finance_api.handle_dms_venue_application(dms_application)
