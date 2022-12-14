import pytest

import pcapi.utils.cinema_providers as cinema_providers_utils


@pytest.mark.parametrize(
    "uuid,result",
    [
        ("123%12345678912345#111/2022-12-12 11:00:00", 111),
        ("123445+43423", None),
        (None, None),
        ("movie_id%%siret#show_id/showtime", None),
    ],
)
def test_get_cds_show_id_from_uuid(uuid, result):
    assert result == cinema_providers_utils.get_cds_show_id_from_uuid(uuid)


@pytest.mark.parametrize(
    "stock_uuid,result",
    [
        ("123%12345678912345#111", 111),
        ("123445+43423", None),
        (None, None),
        ("movie_id%%siret#show_id", None),
    ],
)
def test_get_boost_showtime_id_from_uuid(stock_uuid, result):
    assert result == cinema_providers_utils.get_boost_showtime_id_from_uuid(stock_uuid)


@pytest.mark.parametrize(
    "stock_uuid,provider_name,result",
    [
        ("123%12345678912345#111/2022-12-12 11:00:00", "CDSStocks", 111),
        ("123%12345678912345#111", "BoostStocks", 111),
        ("123445+43423", None, None),
        (None, None, None),
        ("movie_id%%siret#show_id", "CDSStocks", None),
        ("movie_id%%siret#show_id", "BoostStocks", None),
    ],
)
def test_get_showtime_id_from_uuid(stock_uuid, provider_name, result):
    assert result == cinema_providers_utils.get_showtime_id_from_uuid(stock_uuid, provider_name)


@pytest.mark.parametrize(
    "offer_uuid,result",
    [
        ("123%45%Boost", 123),
        ("123445+43423", None),
        (None, None),
        ("movie_id%%venue_id%Boost", None),
    ],
)
def test_get_boost_film_id_from_uuid(offer_uuid, result):
    assert result == cinema_providers_utils.get_boost_film_id_from_uuid(offer_uuid)