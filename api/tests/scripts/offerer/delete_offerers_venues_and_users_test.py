import csv
import typing
import tempfile

import pytest

from pcapi.scripts.offerer.delete_offerers_venues_and_users import EmailWithSiret
from pcapi.scripts.offerer.delete_offerers_venues_and_users import parse_csv
from pcapi.scripts.offerer.delete_offerers_venues_and_users import delete_venues
from pcapi.scripts.offerer.delete_offerers_venues_and_users import delete_offerers
from pcapi.scripts.offerer.delete_offerers_venues_and_users import delete_users
from pcapi.scripts.offerer.delete_offerers_venues_and_users import delete_offerers_with_their_venues_and_users
from pcapi.core.offerers import models
from pcapi.core.offerers import factories
from pcapi.core.users import models as users_models
from pcapi.core.users import factories as users_factories


pytestmark = pytest.mark.usefixtures("db_session")


def test_parse_csv() -> None:
    with tempfile.NamedTemporaryFile(mode='w') as fp:
        with open(fp.name, mode='w', encoding='utf-8') as csvfile:
            writer = csv.DictWriter(csvfile, fieldnames=['email', 'siret'])

            writer.writeheader()
            writer.writerow({'email': 'aa@b.com', 'siret': '123'})
            writer.writerow({'email': 'bb@b.com', 'siret': '456'})

        res = parse_csv(fp.name)

    assert res == [
        EmailWithSiret(email="aa@b.com", siret="123"),
        EmailWithSiret(email="bb@b.com", siret="456"),
    ]


def test_delete_venues() -> None:
    venues = factories.VenueFactory.create_batch(3)
    venue_ids = {typing.cast(int, venue.id) for venue in venues}

    delete_venues(venue_ids)

    assert models.Venue.query.count() == 0


def test_delete_offerers() -> None:
    offerers = factories.OffererFactory.create_batch(3)
    offerer_ids = {typing.cast(int, offerer.id) for offerer in offerers}

    delete_offerers(offerer_ids)

    assert models.Offerer.query.count() == 0


def test_delete_users() -> None:
    users = users_factories.UserFactory.create_batch(3)
    user_emails = {typing.cast(str, user.email) for user in users}

    delete_users(user_emails)

    assert users_models.User.query.count() == 0


def test_delete_offerers_with_their_venues_and_users() -> None:
    user_offerer_1 = factories.UserOffererFactory()
    venues_1 = factories.VenueFactory.create_batch(2, managingOfferer=user_offerer_1.offerer)

    user_offerer_2 = factories.UserOffererFactory()
    venues_2 = factories.VenueFactory.create_batch(2, managingOfferer=user_offerer_2.offerer)

    emails_and_sirets = [
        EmailWithSiret(email=user_offerer_1.user.email, siret=venues_1[0].siret),
        EmailWithSiret(email=user_offerer_1.user.email, siret=venues_1[1].siret),
        EmailWithSiret(email=user_offerer_2.user.email, siret=venues_2[0].siret),
        EmailWithSiret(email=user_offerer_2.user.email, siret=venues_2[1].siret),
    ]

    delete_offerers_with_their_venues_and_users(emails_and_sirets)

    assert users_models.User.query.count() == 0
    assert models.Venue.query.count() == 0
    assert models.Offerer.query.count() == 0
