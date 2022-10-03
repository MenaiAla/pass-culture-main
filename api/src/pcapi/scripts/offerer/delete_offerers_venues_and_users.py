import typing
import csv
from dataclasses import dataclass

from pcapi.core.finance import models as finance_models
from pcapi.core.offers import models as offers_models
from pcapi.core.offerers import models as offerers_models
from pcapi.core.users import models as users_models
from pcapi.core.criteria import models as criteria_models


@dataclass
class EmailWithSiret:
    email: str
    siret: str


def parse_csv(path: str) -> list[EmailWithSiret]:
    rows = []

    with open(path, mode='r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            rows.append(EmailWithSiret(email=row['email'], siret=row['siret']))

    return rows


def delete_venues(venue_ids: typing.Collection[int]) -> None:
    offers_models.Offer.query.filter(offers_models.Offer.venueId.in_(venue_ids)).delete()
    offerers_models.VenueContact.query.filter(offerers_models.VenueContact.venueId.in_(venue_ids)).delete()
    criteria_models.VenueCriterion.query.filter(criteria_models.VenueCriterion.venueId.in_(venue_ids)).delete()
    finance_models.BusinessUnitVenueLink.query.filter(finance_models.BusinessUnitVenueLink.venueId.in_(venue_ids)).delete()

    offerers_models.Venue.query.filter(offerers_models.Venue.id.in_(venue_ids)).delete()


def delete_offerers(offerer_ids: typing.Collection[int]) -> None:
    offerers_models.Offerer.query.filter(offerers_models.Offerer.id.in_(offerer_ids)).delete()


def delete_users(emails: typing.Collection[str]) -> None:
    users_models.User.query.filter(users_models.User.email.in_(emails)).delete()


def delete_offerers_with_their_venues_and_users(emails_and_sirets: list[EmailWithSiret]) -> None:
    pass
