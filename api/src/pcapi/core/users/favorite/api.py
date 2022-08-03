import typing
from dataclasses import dataclass
from datetime import date
from datetime import time
from datetime import datetime
from datetime import timedelta
from collections import abc

from flask_sqlalchemy import BaseQuery
import sqlalchemy.sql.functions as sqla_func

from pcapi.core.bookings import models as bookings_models
from pcapi.core.offers import models as offers_models
from pcapi.core.users import models


def get_not_booked_favorites_grouped_by_offer_query(since: int) -> BaseQuery:
    today_min = datetime.combine(date.today(), time.min)
    three_days_ago = today_min - timedelta(days=since)

    return (
        models.Favorite
        .query
        .join(offers_models.Offer, offers_models.Stock, bookings_models.Booking)
        .filter(models.Favorite.dateCreated < three_days_ago)
        .filter(offers_models.Stock != None)
        .filter(bookings_models.Booking == None)
        .filter(offers_models.Stock.beginningDatetime > datetime.utcnow())
        .group_by(offers_models.Offer.id)
        .with_entities(
            offers_models.Offer.id,
            sqla_func.array_agg(models.Favorite.userId)
        )
    )


@dataclass
class OfferWithUserIds:
    offer_id: int
    user_ids: typing.Collection[int]


OfferWithUserIdsIterable = typing.Generator[OfferWithUserIds, None, None]


def get_offers_and_users_from_not_booked_favorites(since: int = 3) -> OfferWithUserIdsIterable:
    query = get_not_booked_favorites_grouped_by_offer_query(since)
    for row in query.yield_per(1_000):
        yield OfferWithUserIds(offer_id=row[0], user_ids=row[1])
