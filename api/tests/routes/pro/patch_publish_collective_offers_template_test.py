import pytest

from pcapi.core.educational.factories import CollectiveOfferTemplateFactory
from pcapi.core.educational.models import CollectiveOfferTemplate
import pcapi.core.offerers.factories as offerers_factories
from pcapi.models.offer_mixin import OfferValidationStatus
from pcapi.utils.human_ids import humanize


@pytest.mark.usefixtures("db_session")
class Returns204Test:
    def when_publishing_offer_template(self, client):
        # Given
        offer1 = CollectiveOfferTemplateFactory(validation=OfferValidationStatus.DRAFT)
        venue = offer1.venue
        offerer = venue.managingOfferer
        offerers_factories.UserOffererFactory(user__email="pro@example.com", offerer=offerer)

        # When
        client = client.with_session_auth("pro@example.com")
        response = client.patch(f"/collective/offers-template/{humanize(offer1.id)}/publish")

        # Then
        assert response.status_code == 204
        assert CollectiveOfferTemplate.query.get(offer1.id).validation == OfferValidationStatus.APPROVED
