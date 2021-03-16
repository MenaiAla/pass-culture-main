from sqlalchemy.orm.util import aliased

from pcapi.models import VenueProvider
from pcapi.models.provider import Provider
from pcapi.utils.logger import logger

from . import synchronize_provider_api


def synchronize_stocks() -> None:
    # Alias for provider table, and explicit "on" clause for the "join", are mandatory because
    # VenueProvider model already has a "select" on the provider table for its polymorphic query
    provider_alias = aliased(Provider)

    venue_providers = (
        VenueProvider.query.join(provider_alias, provider_alias.id == VenueProvider.providerId)
        .filter(provider_alias.apiUrl != None)
        .filter(VenueProvider.isActive == True)
        .all()
    )

    for venue_provider in venue_providers:
        try:
            synchronize_provider_api.synchronize_venue_provider(venue_provider)
        except Exception as exc:  # pylint: disable=broad-except
            logger.exception("Could not synchronize venue_provider=%s: %s", venue_provider.id, exc)
