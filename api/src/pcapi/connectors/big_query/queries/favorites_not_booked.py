import pydantic

from pcapi import settings

from .base import BaseQuery


class FavoritesNotBookedModel(pydantic.BaseModel):
    userId: int
    offerName: str
    bookingId: int


class FavoritesNotBooked(BaseQuery):
    raw_query = f"""
        SELECT
            *
        FROM
            `{settings.BIG_QUERY_NOTIFICATIONS_TABLE_BASE}.favorite_not_booked`
        WHERE
            table_creation_day = CURRENT_DATE()
    """

    model = FavoritesNotBookedModel
