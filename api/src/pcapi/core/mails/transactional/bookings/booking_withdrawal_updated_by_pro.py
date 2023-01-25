from pcapi.core import mails
from pcapi.core.bookings.models import IndividualBooking
from pcapi.core.mails import models
from pcapi.core.mails.transactional.bookings import common as bookings_common
from pcapi.core.mails.transactional.sendinblue_template_ids import TransactionalEmail


def send_booking_withdrawal_updated_by_pro(individual_booking: IndividualBooking) -> bool:
    data = get_booking_withdrawal_updated_by_pro_email_data(individual_booking)
    return mails.send(recipients=[individual_booking.user.email], data=data)


def get_booking_withdrawal_updated_by_pro_email_data(
    individual_booking: IndividualBooking,
) -> models.TransactionalEmailData:
    return models.TransactionalEmailData(
        template=TransactionalEmail.OFFER_WITHDRAWAL_UPDATED_BY_PRO.value,
        params={
            "OFFER_NAME": individual_booking.booking.stock.offer.name,
            "OFFER_TOKEN": bookings_common.get_booking_token(individual_booking),
            "OFFER_WITHDRAWAL_DELAY": bookings_common.get_offer_withdrawal_delay(individual_booking),
            "OFFER_WITHDRAWAL_DETAILS": bookings_common.get_offer_withdrawal_details(individual_booking),
            "OFFER_WITHDRAWAL_TYPE": bookings_common.get_offer_withdrawal_type(individual_booking),
            "OFFERER_NAME": bookings_common.get_offerer_name(individual_booking),
            "USER_FIRST_NAME": bookings_common.get_booking_firstname(individual_booking),
            "VENUE_ADDRESS": bookings_common.get_venue_address(individual_booking),
        },
    )
