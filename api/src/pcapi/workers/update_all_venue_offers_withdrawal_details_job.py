import pcapi.core.offerers.models as offerers_models
import pcapi.core.offers.api as offers_api
import pcapi.core.offers.models as offers_models
from pcapi.workers import worker
from pcapi.workers.decorators import job


@job(worker.low_queue)
def update_all_venue_offers_withdrawal_details_job(
    venue: offerers_models.Venue,
    withdrawal_details: str,
) -> None:
    query = offers_models.Offer.query.filter_by(venueId=venue.id)
    offers_api.batch_update_offers(query, {"withdrawalDetails": withdrawal_details})
