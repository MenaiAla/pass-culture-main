from datetime import datetime

from sqlalchemy import func

from models import Recommendation, Mediation, Offer, Stock, EventOccurrence
from utils.config import BLOB_SIZE


def find_unseen_tutorials_for_user(seen_recommendation_ids, user):
    return Recommendation.query.join(Mediation) \
        .filter(
        (Mediation.tutoIndex != None)
        & (Recommendation.user == user)
        & ~Recommendation.id.in_(seen_recommendation_ids)
    ) \
        .order_by(Mediation.tutoIndex) \
        .all()


def count_read_recommendations_for_user(user):
    return filter_out_recommendation_on_soft_deleted_stocks() \
        .filter((Recommendation.user == user) & (Recommendation.dateRead != None)) \
        .count()


def find_all_unread_recommendations(user, seen_recommendation_ids, limit=BLOB_SIZE):
    query = filter_out_recommendation_on_soft_deleted_stocks()
    query = filter_unseen_recommendations_for_user(query, user, seen_recommendation_ids)
    query = query.filter(Recommendation.dateRead == None) \
        .group_by(Recommendation) \
        .order_by(func.random()) \
        .limit(limit)

    return query.all()


def find_all_read_recommendations(user, seen_recommendation_ids, limit=BLOB_SIZE):
    query = filter_out_recommendation_on_soft_deleted_stocks()
    query = filter_unseen_recommendations_for_user(query, user, seen_recommendation_ids)
    query = query.filter(Recommendation.dateRead != None) \
        .group_by(Recommendation) \
        .order_by(func.random()) \
        .limit(limit)

    return query.all()


def find_recommendations_for_user_matching_offers_and_search_term(user_id, offer_ids, search):
    return Recommendation.query \
        .filter(Recommendation.userId == user_id) \
        .filter(Recommendation.offerId.in_(offer_ids)) \
        .filter(Recommendation.search == search) \
        .all()


def filter_out_recommendation_on_soft_deleted_stocks():
    join_on_stocks = Recommendation.query \
        .join(Offer) \
        .join(Stock) \
        .filter_by(isSoftDeleted=False)
    join_on_event_occurrences = Recommendation.query \
        .join(Offer) \
        .join(EventOccurrence) \
        .join(Stock) \
        .filter_by(isSoftDeleted=False)

    return join_on_stocks.union_all(join_on_event_occurrences)


def filter_unseen_recommendations_for_user(query, user, seen_recommendation_ids):
    new_query = query \
        .outerjoin(Mediation) \
        .filter((Recommendation.user == user)
                & ~Recommendation.id.in_(seen_recommendation_ids)
                & (Mediation.tutoIndex == None)
                & ((Recommendation.validUntilDate == None) | (Recommendation.validUntilDate > datetime.utcnow())))
    return new_query
