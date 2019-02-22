from datetime import datetime

import pytest

from models import PcObject
from models.payment_status import TransactionStatus, PaymentStatus
from repository.payment_queries import find_transaction_checksum, find_error_payments
from tests.conftest import clean_database
from tests.test_utils import create_payment_transaction, create_payment, create_booking, create_user, create_deposit


@pytest.mark.standalone
class FindTransactionChecksumTest:
    @clean_database
    def test_returns_a_checksum_if_message_id_is_known(self, app):
        pass
        # given
        message_id = 'ABCD1234'
        transaction = create_payment_transaction(transaction_message_id=message_id)
        PcObject.check_and_save(transaction)

        # when
        checksum = find_transaction_checksum(message_id)

        # then
        assert checksum == transaction.checksum

    @clean_database
    def test_returns_none_is_message_id_is_unknown(self, app):
        pass
        # given
        message_id = 'ABCD1234'
        transaction = create_payment_transaction(transaction_message_id=message_id)
        PcObject.check_and_save(transaction)

        # when
        checksum = find_transaction_checksum('EFGH5678')

        # then
        assert checksum is None


@pytest.mark.standalone
class FindErrorPaymentsTest:
    @clean_database
    def test_returns_payments_with_last_payment_status_error(self, app):
        # Given
        user = create_user()
        booking = create_booking(user)
        deposit = create_deposit(user, datetime.utcnow())
        error_payment1 = create_payment(booking, booking.stock.resolvedOffer.venue.managingOfferer, 10)
        error_payment2 = create_payment(booking, booking.stock.resolvedOffer.venue.managingOfferer, 10)
        pending_payment = create_payment(booking, booking.stock.resolvedOffer.venue.managingOfferer, 10)
        error_status1 = PaymentStatus()
        error_status1.status = TransactionStatus.ERROR
        error_payment1.statuses.append(error_status1)
        error_status2 = PaymentStatus()
        error_status2.status = TransactionStatus.ERROR
        error_payment2.statuses.append(error_status2)

        PcObject.check_and_save(error_payment1, error_payment2, pending_payment, deposit)

        # When
        payments = find_error_payments()

        # Then
        assert len(payments) == 2
        for error_payment1 in payments:
            assert sorted(error_payment1.statuses, key=lambda x: x.date)[-1].status == TransactionStatus.ERROR

    @clean_database
    def test_does_not_return_payment_if_has_status_error_but_not_last(self, app):
        # Given
        user = create_user()
        booking = create_booking(user)
        deposit = create_deposit(user, datetime.utcnow())
        error_payment = create_payment(booking, booking.stock.resolvedOffer.venue.managingOfferer, 10)
        pending_payment = create_payment(booking, booking.stock.resolvedOffer.venue.managingOfferer, 10)
        error_status = PaymentStatus()
        error_status.status = TransactionStatus.ERROR
        sent_status = PaymentStatus()
        sent_status.status = TransactionStatus.SENT
        error_payment.statuses.extend([error_status, sent_status])

        PcObject.check_and_save(error_payment, pending_payment, deposit)

        # When
        payments = find_error_payments()

        # Then
        assert payments == []
