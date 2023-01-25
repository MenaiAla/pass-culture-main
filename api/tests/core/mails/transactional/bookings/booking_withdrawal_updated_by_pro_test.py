import dataclasses
from datetime import datetime

import pytest

from pcapi.core.bookings import factories as bookings_factory
import pcapi.core.mails.testing as mails_testing
from pcapi.core.mails.transactional.bookings.booking_withdrawal_updated_by_pro import (
    send_booking_withdrawal_updated_by_pro,
)
from pcapi.core.mails.transactional.sendinblue_template_ids import TransactionalEmail
import pcapi.core.offers.factories as offers_factories
from pcapi.core.offers.models import WithdrawalTypeEnum
from pcapi.core.users.factories import BeneficiaryGrant18Factory


pytestmark = pytest.mark.usefixtures("db_session")


def test_sendinblue_send_email():
    individual_booking = bookings_factory.IndividualBookingFactory(
        stock=offers_factories.EventStockFactory(
            offer__name="my awesome offer",
            offer__withdrawalDelay=15 * 24 * 3600,  # 15 days
            offer__withdrawalDetails="my withdrawal details",
            offer__withdrawalType=WithdrawalTypeEnum.ON_SITE,
            offer__venue__address="my awesome address",
            offer__venue__managingOfferer__name="my offerer name",
        ),
        token="XXXXXX",
        dateCreated=datetime.utcnow(),
        user=BeneficiaryGrant18Factory(),
    ).individualBooking
    send_booking_withdrawal_updated_by_pro(individual_booking)

    assert len(mails_testing.outbox) == 1
    email = mails_testing.outbox[0]
    assert email.sent_data["template"] == dataclasses.asdict(TransactionalEmail.OFFER_WITHDRAWAL_UPDATED_BY_PRO.value)
    assert email.sent_data["params"]["OFFER_NAME"] == "my awesome offer"
    assert email.sent_data["params"]["OFFER_TOKEN"] == "XXXXXX"
    assert email.sent_data["params"]["OFFER_WITHDRAWAL_DELAY"] == "2 semaines"
    assert email.sent_data["params"]["OFFER_WITHDRAWAL_DETAILS"] == "my withdrawal details"
    assert email.sent_data["params"]["OFFER_WITHDRAWAL_TYPE"] == WithdrawalTypeEnum.ON_SITE
    assert email.sent_data["params"]["OFFERER_NAME"] == "my offerer name"
    assert email.sent_data["params"]["USER_FIRST_NAME"] == individual_booking.booking.user.firstName
    assert email.sent_data["params"]["VENUE_ADDRESS"] == "my awesome address"
