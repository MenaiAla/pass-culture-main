-- Events avec beginning date <> de bookingLimitDatetime
-- 12040
-- 11883 en FRANCE

Select
    count(*)
from
    stock
    join offer ON offer.id = stock."offerId"
    join venue on venue.id = offer."venueId"
where
    (
        (
            stock."dateCreated" > '2022-12-20 12:40:00'
            and stock."dateCreated" < '2023-01-16 13:00:00'
        )
        or (
            stock."dateModified" > '2022-12-20 12:40:00'
            and stock."dateModified" < '2023-01-16 13:00:00'
        )
    )
    and LENGTH(venue."departementCode") = 2
    and "beginningDatetime" > '2023-01-18 14:47:00'
    and "beginningDatetime" :: date <> "bookingLimitDatetime" :: date
    and offer."lastProviderId" is null;


update
    stock
    join offer ON offer.id = stock."offerId"
    join venue on venue.id = offer."venueId"
set
    "bookingLimitDatetime" = date("bookingLimitDatetime") + '21:59:59' :: time
where
    (
        (
            stock."dateCreated" > '2022-12-20 12:40:00'
            and stock."dateCreated" < '2023-01-16 13:00:00'
        )
        or (
            stock."dateModified" > '2022-12-20 12:40:00'
            and stock."dateModified" < '2023-01-16 13:00:00'
        )
    )
    and "beginningDatetime" > '2023-01-18 14:47:00'
    and "beginningDatetime" :: date <> "bookingLimitDatetime" :: date
    and offer."lastProviderId" is null;

-- Events avec beginningdate == bookingLimitDate
-- 1467 rows

Select
    count(*)
from
    stock
    join offer ON offer.id = stock."offerId"
where
    (
        (
            stock."dateCreated" > '2022-12-20 12:40:00'
            and stock."dateCreated" < '2023-01-16 13:00:00'
        )
        or (
            stock."dateModified" > '2022-12-20 12:40:00'
            and stock."dateModified" < '2023-01-16 13:00:00'
        )
    )
    and "beginningDatetime" > '2023-01-18 14:47:00'
    and
        "beginningDatetime" :: date = "bookingLimitDatetime" :: date
     and offer."lastProviderId" is null;


update
    stock
join offer ON offer.id = stock."offerId"
set
    "bookingLimitDatetime" = "beginningDatetime"
where
    (
        (
            stock."dateCreated" > '2022-12-20 12:40:00'
            and stock."dateCreated" < '2023-01-16 13:00:00'
        )
        or (
            stock."dateModified" > '2022-12-20 12:40:00'
            and stock."dateModified" < '2023-01-16 13:00:00'
        )
    )
    and "beginningDatetime" > '2023-01-18 14:47:00'
    and
        "beginningDatetime" :: date = "bookingLimitDatetime" :: date
    and offer."lastProviderId" is null;

-- Toutes les offres
-- 13507

Select
    count(*)
from
    stock
    join offer ON offer.id = stock."offerId"
where
    (
        (
            stock."dateCreated" > '2022-12-20 12:40:00'
            and stock."dateCreated" < '2023-01-16 13:00:00'
        )
        or (
            stock."dateModified" > '2022-12-20 12:40:00'
            and stock."dateModified" < '2023-01-16 13:00:00'
        )
    )
    and "beginningDatetime" > '2023-01-18 14:47:00'
    and offer."lastProviderId" is not null and stock."bookingLimitDatetime" is not null;
