import pytest

import pcapi.connectors.big_query.connector as bq_connector
from pcapi.connectors.big_query.queries import favorites_not_booked
from pcapi.connectors.big_query.queries import base


def test_get_rows():
    rows = [
        {"userId": 1, "offerName": "my offer", "bookingId": 10},
        {"userId": 2, "offerName": "my offer", "bookingId": 11},
        {"userId": 3, "offerName": "my offer", "bookingId": 12},
    ]
    backend = bq_connector.TestingBackend(rows)
    query = favorites_not_booked.FavoritesNotBooked(backend=backend)

    res = list(query.execute())
    assert res == rows


def test_unexpected_row():
    rows = [
        {"userId": 1, "offerName": "my offer", "bookingId": 10},
        {"unexpectedKey": "someValue"},
    ]
    backend = bq_connector.TestingBackend(rows)
    query = favorites_not_booked.FavoritesNotBooked(backend=backend)

    with pytest.raises(base.MalformedRow):
        list(query.execute())
