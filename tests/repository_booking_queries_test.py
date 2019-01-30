""" repository booking queries test """
from datetime import datetime, timedelta

import pytest

from models import PcObject, ThingType
from repository.booking_queries import find_all_ongoing_bookings_by_stock, \
    find_offerer_bookings, find_all_bookings_for_stock, find_all_bookings_for_event_occurrence, \
    find_final_offerer_bookings, find_date_used, user_has_booked_an_online_activation
from tests.conftest import clean_database
from utils.test_utils import create_booking, \
    create_deposit, \
    create_offerer, \
    create_stock_with_event_offer, \
    create_stock_with_thing_offer, \
    create_user, \
    create_venue, create_stock_from_event_occurrence, create_event_occurrence, create_thing_offer, create_event_offer, \
    create_booking_activity, save_all_activities, create_stock_from_offer


@clean_database
@pytest.mark.standalone
def test_find_all_by_offerer_with_event_and_things(app):
    # given
    user = create_user()
    now = datetime.utcnow()
    create_deposit(user, now, amount=1600)
    offerer1 = create_offerer(siren='123456789')
    offerer2 = create_offerer(siren='987654321')
    venue1 = create_venue(offerer1, siret=offerer1.siren + '12345')
    venue2 = create_venue(offerer2, siret=offerer2.siren + '12345')
    stock1 = create_stock_with_event_offer(offerer1, venue1, price=200)
    stock2 = create_stock_with_thing_offer(offerer1, venue1, thing_offer=None, price=300)
    stock3 = create_stock_with_thing_offer(offerer2, venue2, thing_offer=None, price=400)
    booking1 = create_booking(user, stock1, venue1, recommendation=None, quantity=2)
    booking2 = create_booking(user, stock2, venue1, recommendation=None, quantity=1)
    booking3 = create_booking(user, stock3, venue2, recommendation=None, quantity=2)
    PcObject.check_and_save(booking1, booking2, booking3)

    # when
    bookings = find_offerer_bookings(offerer1.id)

    # then
    assert booking1 in bookings
    assert booking2 in bookings
    assert booking3 not in bookings


@clean_database
@pytest.mark.standalone
def test_find_all_ongoing_bookings(app):
    # Given
    offerer = create_offerer(siren='985281920')
    PcObject.check_and_save(offerer)
    venue = create_venue(offerer)
    stock = create_stock_with_thing_offer(offerer, venue, thing_offer=None, price=0)
    user = create_user()
    cancelled_booking = create_booking(user, stock, is_cancelled=True)
    validated_booking = create_booking(user, stock, is_used=True)
    ongoing_booking = create_booking(user, stock, is_cancelled=False, is_used=False)
    PcObject.check_and_save(ongoing_booking)
    PcObject.check_and_save(validated_booking)
    PcObject.check_and_save(cancelled_booking)

    # When
    all_ongoing_bookings = find_all_ongoing_bookings_by_stock(stock)

    # Then
    assert all_ongoing_bookings == [ongoing_booking]


@pytest.mark.standalone
@clean_database
def test_find_all_bookings_for_stock(app):
    # Given
    offerer = create_offerer()
    venue = create_venue(offerer)
    stock_to_search = create_stock_with_thing_offer(offerer, venue, thing_offer=None, price=0)
    stock_not_to_search = create_stock_with_thing_offer(offerer, venue, thing_offer=None, price=0)
    user_1 = create_user(email='email1@test.com')
    user_2 = create_user(email='email2@test.com')
    booking_to_find_1 = create_booking(user_1, stock_to_search)
    booking_to_find_2 = create_booking(user_2, stock_to_search, quantity=2)
    booking_not_to_find = create_booking(user_1, stock_not_to_search)

    PcObject.check_and_save(booking_to_find_1, booking_to_find_2, booking_not_to_find)

    # When
    all_bookings_for_stock = find_all_bookings_for_stock(stock_to_search)
    # Then
    assert booking_to_find_1 in all_bookings_for_stock
    assert booking_to_find_2 in all_bookings_for_stock
    assert booking_not_to_find not in all_bookings_for_stock


@pytest.mark.standalone
@clean_database
def test_find_all_bookings_for_event_occurrence(app):
    # Given
    offerer = create_offerer()
    venue = create_venue(offerer)
    offer = create_thing_offer(venue)
    event_occurrence_to_search = create_event_occurrence(offer)
    event_occurrence_not_to_search = create_event_occurrence(offer)
    stock_to_search1 = create_stock_from_event_occurrence(event_occurrence_to_search, price=0, available=2)
    stock_to_search2 = create_stock_from_event_occurrence(event_occurrence_to_search, price=0, available=10)
    stock_not_to_search = create_stock_from_event_occurrence(event_occurrence_not_to_search, price=0)
    user_1 = create_user(email='email1@test.com')
    user_2 = create_user(email='email2@test.com')
    booking_to_find_1 = create_booking(user_1, stock_to_search1, venue)
    booking_to_find_2 = create_booking(user_2, stock_to_search2, venue, quantity=2)
    booking_to_find_3 = create_booking(user_2, stock_to_search2, venue)
    booking_not_to_find = create_booking(user_1, stock_not_to_search, venue)

    PcObject.check_and_save(booking_to_find_1, booking_to_find_2, booking_not_to_find, booking_to_find_3)

    # When
    all_bookings_for_event_occurrence = find_all_bookings_for_event_occurrence(event_occurrence_to_search)
    # Then
    assert booking_to_find_1 in all_bookings_for_event_occurrence
    assert booking_to_find_2 in all_bookings_for_event_occurrence
    assert booking_to_find_3 in all_bookings_for_event_occurrence
    assert booking_not_to_find not in all_bookings_for_event_occurrence


@pytest.mark.standalone
@clean_database
def test_find_final_offerer_bookings_returns_bookings_for_given_offerer(app):
    # Given
    user = create_user()
    deposit = create_deposit(user, datetime.utcnow(), amount=500)

    offerer1 = create_offerer(siren='123456789')
    venue = create_venue(offerer1, siret=offerer1.siren + '12345')
    offer = create_thing_offer(venue)
    stock = create_stock_with_thing_offer(offerer1, venue, offer)
    booking1 = create_booking(user, stock=stock, venue=venue, is_used=True)
    booking2 = create_booking(user, stock=stock, venue=venue, is_used=True)

    offerer2 = create_offerer(siren='987654321')
    venue = create_venue(offerer2, siret=offerer2.siren + '12345')
    offer = create_thing_offer(venue)
    stock = create_stock_with_thing_offer(offerer2, venue, offer)
    booking3 = create_booking(user, stock=stock, venue=venue, is_used=True)

    PcObject.check_and_save(deposit, booking1, booking2, booking3)

    # When
    bookings = find_final_offerer_bookings(offerer1.id)

    # Then
    assert len(bookings) == 2
    assert booking1 in bookings
    assert booking2 in bookings


@pytest.mark.standalone
@clean_database
def test_find_final_offerer_bookings_returns_not_cancelled_bookings_for_offerer(app):
    # Given
    user = create_user()
    deposit = create_deposit(user, datetime.utcnow(), amount=500)

    offerer1 = create_offerer(siren='123456789')
    venue = create_venue(offerer1)
    offer = create_thing_offer(venue)
    stock = create_stock_with_thing_offer(offerer1, venue, offer)
    booking1 = create_booking(user, stock=stock, venue=venue, is_used=True)
    booking2 = create_booking(user, stock=stock, venue=venue, is_cancelled=True, is_used=True)

    PcObject.check_and_save(deposit, booking1, booking2)

    # When
    bookings = find_final_offerer_bookings(offerer1.id)

    # Then
    assert len(bookings) == 1
    assert booking1 in bookings


@pytest.mark.standalone
@clean_database
def test_find_final_offerer_bookings_returns_only_used_bookings(app):
    # Given
    user = create_user()
    deposit = create_deposit(user, datetime.utcnow(), amount=500)

    offerer1 = create_offerer(siren='123456789')
    venue = create_venue(offerer1)
    offer = create_thing_offer(venue)
    stock = create_stock_with_thing_offer(offerer1, venue, offer)
    booking1 = create_booking(user, stock=stock, venue=venue, is_used=True)
    booking2 = create_booking(user, stock=stock, venue=venue, is_used=False)

    PcObject.check_and_save(deposit, booking1, booking2)

    # When
    bookings = find_final_offerer_bookings(offerer1.id)

    # Then
    assert len(bookings) == 1
    assert booking1 in bookings


@pytest.mark.standalone
@clean_database
def test_find_final_offerer_bookings_returns_only_bookings_on_events_older_than_two_days(app):
    # Given
    user = create_user()
    deposit = create_deposit(user, datetime.utcnow(), amount=500)

    offerer1 = create_offerer(siren='123456789')
    venue = create_venue(offerer1)
    offer = create_event_offer(venue)
    old_event_occurrence = create_event_occurrence(offer, beginning_datetime=datetime.utcnow() - timedelta(hours=49))
    recent_event_occurrence = create_event_occurrence(offer, beginning_datetime=datetime.utcnow() - timedelta(hours=2))
    stock1 = create_stock_from_event_occurrence(old_event_occurrence)
    stock2 = create_stock_from_event_occurrence(recent_event_occurrence)
    booking1 = create_booking(user, stock=stock1, venue=venue, is_used=False)
    booking2 = create_booking(user, stock=stock2, venue=venue, is_used=False)

    PcObject.check_and_save(deposit, booking1, booking2)

    # When
    bookings = find_final_offerer_bookings(offerer1.id)

    # Then
    assert len(bookings) == 1
    assert booking1 in bookings


@pytest.mark.standalone
@clean_database
def test_find_date_used_on_booking_returns_issued_date_of_matching_activity(app):
    # given
    user = create_user()
    deposit = create_deposit(user, datetime.utcnow(), amount=500)
    booking = create_booking(user)
    PcObject.check_and_save(user, deposit, booking)

    activity_insert = create_booking_activity(
        booking, 'booking', 'insert', issued_at=datetime(2018, 1, 28)
    )
    activity_update = create_booking_activity(
        booking, 'booking', 'update', issued_at=datetime(2018, 2, 12),
        data={'isUsed': True}
    )
    save_all_activities(activity_insert, activity_update)

    # when
    date_used = find_date_used(booking)

    # then
    assert date_used == datetime(2018, 2, 12)


@pytest.mark.standalone
@clean_database
def test_find_date_used_on_booking_returns_none_if_no_activity_with_is_used_changed_is_found(app):
    # given
    user = create_user()
    deposit = create_deposit(user, datetime.utcnow(), amount=500)
    booking = create_booking(user)
    PcObject.check_and_save(user, deposit, booking)

    activity_insert = create_booking_activity(
        booking, 'booking', 'insert', issued_at=datetime(2018, 1, 28)
    )

    save_all_activities(activity_insert)

    # when
    date_used = find_date_used(booking)

    # then
    assert date_used is None


@pytest.mark.standalone
class UserHasBookedAnOnlineActivationTest:
    @clean_database
    def test_returns_true_is_a_booking_exists_on_such_stock(self, app):
        # given
        user = create_user()
        offerer = create_offerer(siren='123456789', name='pass Culture')
        venue_online = create_venue(offerer, siret=None, is_virtual=True)
        activation_offer = create_thing_offer(venue_online, thing_type=ThingType.ACTIVATION)
        activation_stock = create_stock_from_offer(activation_offer, available=200, price=0)
        activation_booking = create_booking(user, stock=activation_stock, venue=venue_online)
        PcObject.check_and_save(activation_booking)

        # when
        has_booked = user_has_booked_an_online_activation(user)

        # then
        assert has_booked is True

    @clean_database
    def test_returns_false_is_no_booking_exists_on_such_stock(self, app):
        # given
        user = create_user()
        offerer = create_offerer(siren='123456789', name='pass Culture')
        venue_online = create_venue(offerer, siret=None, is_virtual=True)
        book_offer = create_thing_offer(venue_online, thing_type=ThingType.LIVRE_EDITION)
        book_stock = create_stock_from_offer(book_offer, available=200, price=0)
        book_booking = create_booking(user, stock=book_stock, venue=venue_online)
        PcObject.check_and_save(book_booking)

        # when
        has_booked = user_has_booked_an_online_activation(user)

        # then
        assert has_booked is False
