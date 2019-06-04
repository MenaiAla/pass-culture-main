from datetime import datetime

from models import PcObject
from tests.conftest import clean_database, TestClient
from tests.test_utils import API_URL, create_stock_with_thing_offer, \
    create_deposit, create_venue, create_offerer, \
    create_user, create_booking, create_user_offerer


class Get:
    class Returns200:
        @clean_database
        def when_user_has_an_offerer_attached(self, app):
            # Given
            user = create_user(email='user+plus@email.fr')
            deposit = create_deposit(user, datetime.utcnow(), amount=500, source='public')
            offerer1 = create_offerer()
            offerer2 = create_offerer(siren='123456788')
            user_offerer1 = create_user_offerer(user, offerer1, validation_token=None)
            user_offerer2 = create_user_offerer(user, offerer2, validation_token=None)
            venue1 = create_venue(offerer1)
            venue2 = create_venue(offerer1, siret='12345678912346')
            venue3 = create_venue(offerer2, siret='12345678912347')
            stock1 = create_stock_with_thing_offer(offerer=offerer1, venue=venue1, price=10)
            stock2 = create_stock_with_thing_offer(offerer=offerer1, venue=venue2, price=11)
            stock3 = create_stock_with_thing_offer(offerer=offerer2, venue=venue3, price=12)
            stock4 = create_stock_with_thing_offer(offerer=offerer2, venue=venue3, price=13)
            booking1 = create_booking(user, stock1, venue=venue1, token='ABCDEF')
            booking2 = create_booking(user, stock1, venue=venue1, token='ABCDEG')
            booking3 = create_booking(user, stock2, venue=venue2, token='ABCDEH')
            booking4 = create_booking(user, stock3, venue=venue3, token='ABCDEI')
            booking5 = create_booking(user, stock4, venue=venue3, token='ABCDEJ')
            booking6 = create_booking(user, stock4, venue=venue3, token='ABCDEK')

            PcObject.save(deposit, booking1, booking2, booking3,
                          booking4, booking5, booking6, user_offerer1,
                          user_offerer2)

            # When
            response = TestClient().with_auth(user.email).get(
                API_URL + '/bookings/csv')
            response_lines = response.text.split('\n')

            # Then
            assert response.status_code == 200
            assert response.headers['Content-type'] == 'text/csv; charset=utf-8;'
            assert response.headers['Content-Disposition'] == 'attachment; filename=reservations_pass_culture.csv'
            assert len(response_lines) == 8

        @clean_database
        def when_user_has_no_offerer_attached(self, app):
            # Given
            user = create_user(email='user+plus@email.fr')
            PcObject.save(user)

            # When
            response = TestClient().with_auth(user.email).get(
                API_URL + '/bookings/csv')
            response_lines = response.text.split('\n')

            # Then
            assert response.status_code == 200
            assert len(response_lines) == 2
