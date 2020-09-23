from datetime import datetime, timedelta

from models import EventType, ThingType, VenueSQLEntity
from repository import repository
from tests.model_creators.generic_creators import create_booking, create_user, create_stock, create_offerer, \
    create_venue, \
    create_deposit, create_recommendation, create_bank_information
from tests.model_creators.specific_creators import create_stock_from_event_occurrence, create_offer_with_thing_product, \
    create_offer_with_event_product, create_event_occurrence
from utils.logger import logger

now = datetime.utcnow()
three_days = timedelta(days=3)


def save_users_with_deposits():
    user1 = create_user(can_book_free_offers=True, email='user1@test.com', reset_password_token_validity_limit=datetime.utcnow() + timedelta(hours=24))
    user2 = create_user(can_book_free_offers=True, email='user2@test.com', reset_password_token_validity_limit=datetime.utcnow() + timedelta(hours=24))
    user3 = create_user(can_book_free_offers=True, email='user3@test.com', reset_password_token_validity_limit=datetime.utcnow() + timedelta(hours=24))
    user4 = create_user(can_book_free_offers=True, email='user4@test.com', reset_password_token_validity_limit=datetime.utcnow() + timedelta(hours=24))
    user5 = create_user(can_book_free_offers=True, email='user5@test.com', reset_password_token_validity_limit=datetime.utcnow() + timedelta(hours=24))
    deposit1 = create_deposit(user1, amount=500)
    deposit2 = create_deposit(user2, amount=500)
    deposit3 = create_deposit(user3, amount=500)
    deposit4 = create_deposit(user4, amount=500)
    deposit5 = create_deposit(user5, amount=500)
    repository.save(deposit1, deposit2, deposit3, deposit4, deposit5)
    logger.info('created 5 users with 500 € deposits')
    return user1, user2, user3, user4, user5


def save_offerer_with_iban():
    offerer_with_iban = create_offerer(siren='180046021', name='Philarmonie')
    venue_with_siret = create_venue(offerer=offerer_with_iban, siret='18004602100026', is_virtual=False)
    venue_without_siret = create_venue(offerer=offerer_with_iban, siret=None, is_virtual=False, comment='pas de siret')
    venue_online = create_venue(offerer=offerer_with_iban, siret=None, is_virtual=True)
    bank_information = create_bank_information(
        offerer=offerer_with_iban, bic='TRPUFRP1',
        iban='FR7610071750000000100420866', application_id=1,
    )
    repository.save(bank_information, venue_online, venue_with_siret, venue_without_siret)
    logger.info('created 1 offerer with iban and 1 virtual venue, 1 venue with siret and 1 venue without siret')
    return venue_online, venue_with_siret, venue_without_siret


def save_offerer_without_iban():
    offerer_without_iban = create_offerer(siren='213400328', name='Béziers')
    venue_with_siret_with_iban = create_venue(offerer=offerer_without_iban, siret='21340032800018', is_virtual=False)
    venue_with_siret_without_iban = create_venue(offerer=offerer_without_iban, siret='21340032800802', is_virtual=False)
    venue_online = create_venue(offerer=offerer_without_iban, siret=None, is_virtual=True)

    bank_information = create_bank_information(
        venue=venue_with_siret_with_iban, bic='BDFEFRPPCCT',
        iban='FR733000100206C343000000066', application_id=2,
    )
    repository.save(bank_information, venue_online, venue_with_siret_with_iban, venue_with_siret_without_iban)
    logger.info('created 1 offerer without iban and 1 virtual venue, 1 venue with siret with iban and 1 venue with siret without iban')
    return venue_online, venue_with_siret_with_iban, venue_with_siret_without_iban


def save_free_event_offer_with_stocks(venue: VenueSQLEntity):
    free_event_offer = create_offer_with_event_product(venue, event_name='Free event',
                                                       event_type=EventType.SPECTACLE_VIVANT)
    past_occurrence = create_event_occurrence(free_event_offer, beginning_datetime=now - three_days)
    future_occurrence = create_event_occurrence(free_event_offer, beginning_datetime=now + three_days)
    past_free_event_stock = create_stock_from_event_occurrence(past_occurrence, price=0)
    future_free_event_stock = create_stock_from_event_occurrence(future_occurrence, price=0)
    repository.save(past_free_event_stock, future_free_event_stock)
    logger.info('created 1 event offer with 1 past and 1 future occurrence with 1 free stock each')
    return past_free_event_stock, future_free_event_stock


def save_non_reimbursable_thing_offer(venue: VenueSQLEntity):
    paid_non_reimbursable_offer = create_offer_with_thing_product(venue, thing_name='Concert en ligne',
                                                                  thing_type=ThingType.JEUX_VIDEO, url='http://my.game.fr')
    non_reimbursable_stock = create_stock(offer=paid_non_reimbursable_offer, price=30)
    repository.save(non_reimbursable_stock)
    logger.info('created 1 non reimbursable thing offer with 1 paid stock of 30 €')
    return non_reimbursable_stock


def save_reimbursable_thing_offer(venue: VenueSQLEntity):
    paid_reimbursable_offer = create_offer_with_thing_product(venue, thing_name='Roman cool',
                                                              thing_type=ThingType.LIVRE_EDITION)
    reimbursable_stock = create_stock(offer=paid_reimbursable_offer, price=30)
    repository.save(reimbursable_stock)
    logger.info('created 1 reimbursable thing offer with 1 paid stock of 30 €')
    return reimbursable_stock


def save_paid_online_book_offer(venue: VenueSQLEntity):
    paid_reimbursable_offer = create_offer_with_thing_product(venue, thing_name='Roman cool',
                                                              thing_type=ThingType.LIVRE_EDITION, url='https://mycoolbook.fr')
    reimbursable_stock = create_stock(offer=paid_reimbursable_offer, price=20)
    repository.save(reimbursable_stock)
    logger.info('created 1 online book offer with 1 paid stock of 20 €')
    return reimbursable_stock


def save_paid_reimbursable_event_offer(venue: VenueSQLEntity):
    paid_reimbursable_event_offer = create_offer_with_event_product(venue, event_name='Paid event',
                                                                    event_type=EventType.SPECTACLE_VIVANT)
    past_occurrence = create_event_occurrence(paid_reimbursable_event_offer, beginning_datetime=now - three_days)
    future_occurrence = create_event_occurrence(paid_reimbursable_event_offer, beginning_datetime=now + three_days)
    past_event_stock = create_stock_from_event_occurrence(past_occurrence, price=10)
    future_event_stock = create_stock_from_event_occurrence(future_occurrence, price=10)
    repository.save(past_event_stock, future_event_stock)
    logger.info('created 1 event offer with 1 past and 1 future occurrence with 1 paid stock of 10 € each')
    return past_event_stock, future_event_stock


def save_sandbox():
    user1, user2, user3, user4, user5 = save_users_with_deposits()
    venue_online_of_offerer_with_iban, venue_with_siret_of_offerer_with_iban, venue_without_siret_of_offerer_with_iban \
        = save_offerer_with_iban()
    venue_online_of_offerer_without_iban, venue_of_offerer_without_iban_with_siret_with_iban,\
    venue_of_offerer_without_iban_with_siret_without_iban = save_offerer_without_iban()
    past_free_event_stock, future_free_event_stock = save_free_event_offer_with_stocks(
        venue_with_siret_of_offerer_with_iban)
    non_reimbursable_stock_of_offerer_with_iban = save_non_reimbursable_thing_offer(venue_online_of_offerer_with_iban)
    reimbursable_stock_of_offerer_with_iban = save_reimbursable_thing_offer(venue_with_siret_of_offerer_with_iban)
    past_event_stock_of_offerer_with_iban, future_event_stock_of_offerer_with_iban \
        = save_paid_reimbursable_event_offer(venue_without_siret_of_offerer_with_iban)

    past_event_stock_of_offerer_without_iban, future_event_stock_of_offerer_without_iban \
        = save_paid_reimbursable_event_offer(venue_of_offerer_without_iban_with_siret_without_iban)

    reimbursable_stock_of_offerer_without_iban = save_reimbursable_thing_offer(venue_of_offerer_without_iban_with_siret_with_iban)
    online_book_stock_of_offerer_without_iban = save_paid_online_book_offer(venue_online_of_offerer_with_iban)

    bookings = [
        create_booking(user=user1, is_used=False,
                       recommendation=create_recommendation(offer=past_free_event_stock.offer, user=user1),
                       stock=past_free_event_stock, token='TOKEN1', venue=venue_with_siret_of_offerer_with_iban),
        create_booking(user=user2, is_used=False,
                       recommendation=create_recommendation(offer=past_free_event_stock.offer, user=user2),
                       stock=past_free_event_stock, token='TOKEN2', venue=venue_with_siret_of_offerer_with_iban),
        create_booking(user=user3, is_used=False,
                       recommendation=create_recommendation(offer=past_free_event_stock.offer, user=user3),
                       stock=past_free_event_stock, token='TOKEN3', venue=venue_with_siret_of_offerer_with_iban),
        create_booking(user=user4, is_used=True,
                       recommendation=create_recommendation(offer=future_free_event_stock.offer, user=user4),
                       stock=future_free_event_stock, token='TOKEN4', venue=venue_with_siret_of_offerer_with_iban),
        create_booking(user=user5, is_used=False,
                       recommendation=create_recommendation(offer=future_free_event_stock.offer, user=user5),
                       stock=future_free_event_stock, token='TOKEN5', venue=venue_with_siret_of_offerer_with_iban),
        create_booking(user=user1, is_used=True, recommendation=create_recommendation(
            offer=non_reimbursable_stock_of_offerer_with_iban.offer,
            user=user1), stock=non_reimbursable_stock_of_offerer_with_iban, token='TOKEN6',
                       venue=venue_online_of_offerer_with_iban),
        create_booking(user=user2, is_used=True, recommendation=create_recommendation(
            offer=non_reimbursable_stock_of_offerer_with_iban.offer,
            user=user2), stock=non_reimbursable_stock_of_offerer_with_iban, token='TOKEN7',
                       venue=venue_online_of_offerer_with_iban),
        create_booking(user=user3, is_used=True, recommendation=create_recommendation(
            offer=non_reimbursable_stock_of_offerer_with_iban.offer,
            user=user3), stock=non_reimbursable_stock_of_offerer_with_iban, token='TOKEN8',
                       venue=venue_online_of_offerer_with_iban),
        create_booking(user=user4, is_used=False, recommendation=create_recommendation(
            offer=non_reimbursable_stock_of_offerer_with_iban.offer,
            user=user4), stock=non_reimbursable_stock_of_offerer_with_iban, token='TOKEN9',
                       venue=venue_online_of_offerer_with_iban),
        create_booking(user=user5, is_used=False, recommendation=create_recommendation(
            offer=non_reimbursable_stock_of_offerer_with_iban.offer,
            user=user5), stock=non_reimbursable_stock_of_offerer_with_iban, token='TOKE10',
                       venue=venue_online_of_offerer_with_iban),
        create_booking(user=user1, is_used=True,
                       recommendation=create_recommendation(offer=reimbursable_stock_of_offerer_with_iban.offer,
                                                            user=user1), stock=reimbursable_stock_of_offerer_with_iban,
                       token='TOKE11', venue=venue_with_siret_of_offerer_with_iban),
        create_booking(user=user2, is_used=True,
                       recommendation=create_recommendation(offer=reimbursable_stock_of_offerer_with_iban.offer,
                                                            user=user2), stock=reimbursable_stock_of_offerer_with_iban,
                       token='TOKE12', venue=venue_with_siret_of_offerer_with_iban),
        create_booking(user=user3, is_used=True,
                       recommendation=create_recommendation(offer=reimbursable_stock_of_offerer_with_iban.offer,
                                                            user=user3), stock=reimbursable_stock_of_offerer_with_iban,
                       token='TOKE13', venue=venue_with_siret_of_offerer_with_iban),
        create_booking(user=user4, is_used=False,
                       recommendation=create_recommendation(offer=reimbursable_stock_of_offerer_with_iban.offer,
                                                            user=user4), stock=reimbursable_stock_of_offerer_with_iban,
                       token='TOKE14', venue=venue_with_siret_of_offerer_with_iban),
        create_booking(user=user5, is_used=False,
                       recommendation=create_recommendation(offer=reimbursable_stock_of_offerer_with_iban.offer,
                                                            user=user5), stock=reimbursable_stock_of_offerer_with_iban,
                       token='TOKE15', venue=venue_with_siret_of_offerer_with_iban),
        create_booking(user=user1, is_used=True,
                       recommendation=create_recommendation(offer=past_event_stock_of_offerer_with_iban.offer,
                                                            user=user1), stock=past_event_stock_of_offerer_with_iban,
                       token='TOKE16', venue=venue_without_siret_of_offerer_with_iban),
        create_booking(user=user2, is_used=True,
                       recommendation=create_recommendation(offer=past_event_stock_of_offerer_with_iban.offer,
                                                            user=user2), stock=past_event_stock_of_offerer_with_iban,
                       token='TOKE17', venue=venue_without_siret_of_offerer_with_iban),
        create_booking(user=user3, is_used=False,
                       recommendation=create_recommendation(offer=past_event_stock_of_offerer_with_iban.offer,
                                                            user=user3), stock=past_event_stock_of_offerer_with_iban,
                       token='TOKE18', venue=venue_without_siret_of_offerer_with_iban),
        create_booking(user=user4, is_used=True,
                       recommendation=create_recommendation(offer=future_event_stock_of_offerer_with_iban.offer,
                                                            user=user4), stock=future_event_stock_of_offerer_with_iban,
                       token='TOKE19', venue=venue_without_siret_of_offerer_with_iban),
        create_booking(user=user5, is_used=False,
                       recommendation=create_recommendation(offer=future_event_stock_of_offerer_with_iban.offer,
                                                            user=user5), stock=future_event_stock_of_offerer_with_iban,
                       token='TOKE20', venue=venue_without_siret_of_offerer_with_iban),

        create_booking(user=user1, is_used=True, recommendation=create_recommendation(
            offer=past_event_stock_of_offerer_without_iban.offer,
            user=user1), stock=past_event_stock_of_offerer_without_iban, token='TOKE21',
                       venue=venue_of_offerer_without_iban_with_siret_without_iban),
        create_booking(user=user2, is_used=True, recommendation=create_recommendation(
            offer=past_event_stock_of_offerer_without_iban.offer,
            user=user2), stock=past_event_stock_of_offerer_without_iban, token='TOKE22',
                       venue=venue_of_offerer_without_iban_with_siret_without_iban),
        create_booking(user=user3, is_used=False, recommendation=create_recommendation(
            offer=past_event_stock_of_offerer_without_iban.offer,
            user=user3), stock=past_event_stock_of_offerer_without_iban, token='TOKE23',
                       venue=venue_of_offerer_without_iban_with_siret_without_iban),
        create_booking(user=user4, is_used=True, recommendation=create_recommendation(
            offer=future_event_stock_of_offerer_without_iban.offer,
            user=user4), stock=future_event_stock_of_offerer_without_iban, token='TOKE24',
                       venue=venue_of_offerer_without_iban_with_siret_without_iban),
        create_booking(user=user5, is_used=False, recommendation=create_recommendation(
            offer=future_event_stock_of_offerer_without_iban.offer,
            user=user5), stock=future_event_stock_of_offerer_without_iban, token='TOKE25',
                       venue=venue_of_offerer_without_iban_with_siret_without_iban),
        create_booking(user=user1, is_used=False, recommendation=create_recommendation(
            offer=reimbursable_stock_of_offerer_without_iban.offer,
            user=user1), stock=reimbursable_stock_of_offerer_without_iban, token='TOKE26',
                       venue=venue_of_offerer_without_iban_with_siret_with_iban),
        create_booking(user=user2, is_used=False, recommendation=create_recommendation(
            offer=reimbursable_stock_of_offerer_without_iban.offer,
            user=user2), stock=reimbursable_stock_of_offerer_without_iban, token='TOKE27',
                       venue=venue_of_offerer_without_iban_with_siret_with_iban),
        create_booking(user=user3, is_used=False, recommendation=create_recommendation(
            offer=reimbursable_stock_of_offerer_without_iban.offer,
            user=user3), stock=reimbursable_stock_of_offerer_without_iban, token='TOKE28',
                       venue=venue_of_offerer_without_iban_with_siret_with_iban),
        create_booking(user=user4, is_used=True, recommendation=create_recommendation(
            offer=reimbursable_stock_of_offerer_without_iban.offer,
            user=user4), stock=reimbursable_stock_of_offerer_without_iban, token='TOKE29',
                       venue=venue_of_offerer_without_iban_with_siret_with_iban),
        create_booking(user=user5, is_used=True, recommendation=create_recommendation(
            offer=reimbursable_stock_of_offerer_without_iban.offer,
            user=user5), stock=reimbursable_stock_of_offerer_without_iban, token='TOKE30',
                       venue=venue_of_offerer_without_iban_with_siret_with_iban),
        create_booking(user=user1, is_used=False, recommendation=create_recommendation(
            offer=online_book_stock_of_offerer_without_iban.offer,
            user=user1), stock=online_book_stock_of_offerer_without_iban, token='TOKE31',
                       venue=venue_online_of_offerer_with_iban),
        create_booking(user=user2, is_used=False, recommendation=create_recommendation(
            offer=online_book_stock_of_offerer_without_iban.offer,
            user=user2), stock=online_book_stock_of_offerer_without_iban, token='TOKE32',
                       venue=venue_online_of_offerer_with_iban),
        create_booking(user=user3, is_used=False, recommendation=create_recommendation(
            offer=online_book_stock_of_offerer_without_iban.offer,
            user=user3), stock=online_book_stock_of_offerer_without_iban, token='TOKE33',
                       venue=venue_online_of_offerer_with_iban),
        create_booking(user=user4, is_used=True, recommendation=create_recommendation(
            offer=online_book_stock_of_offerer_without_iban.offer,
            user=user4), stock=online_book_stock_of_offerer_without_iban, token='TOKE34',
                       venue=venue_online_of_offerer_with_iban),
        create_booking(user=user5, is_used=True, recommendation=create_recommendation(
            offer=online_book_stock_of_offerer_without_iban.offer,
            user=user5), stock=online_book_stock_of_offerer_without_iban, token='TOKE35',
                       venue=venue_online_of_offerer_with_iban)
    ]

    logger.info('created %s bookings' % len(bookings))
    repository.save(*bookings)
