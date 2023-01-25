from pcapi.core import mails
import pcapi.core.bookings.api as bookings_api
from pcapi.core.bookings.models import IndividualBooking
from pcapi.core.mails import models
from pcapi.core.mails.transactional.bookings import common as bookings_common
from pcapi.core.mails.transactional.sendinblue_template_ids import TransactionalEmail
from pcapi.utils.date import get_date_formatted_for_email
from pcapi.utils.date import get_time_formatted_for_email
from pcapi.utils.date import utc_datetime_to_department_timezone
from pcapi.utils.urls import booking_app_link


def send_individual_booking_event_reminder_email_to_beneficiary(individual_booking: IndividualBooking) -> bool:
    data = get_booking_event_reminder_to_beneficiary_email_data(individual_booking)

    if data is None:
        return False

    return mails.send(recipients=[individual_booking.user.email], data=data)


def get_booking_event_reminder_to_beneficiary_email_data(
    individual_booking: IndividualBooking,
) -> models.TransactionalEmailData | None:
    if individual_booking.booking.stock.beginningDatetime is None:
        return None

    department_code = (
        individual_booking.booking.stock.offer.venue.departementCode
        if not individual_booking.booking.stock.offer.isDigital
        else individual_booking.user.departementCode
    )

    event_beginning_date_in_tz = utc_datetime_to_department_timezone(
        individual_booking.booking.stock.beginningDatetime, department_code
    )
    formatted_event_beginning_date = get_date_formatted_for_email(event_beginning_date_in_tz)
    formatted_event_beginning_time = get_time_formatted_for_email(event_beginning_date_in_tz)

    return models.TransactionalEmailData(
        template=TransactionalEmail.BOOKING_EVENT_REMINDER_TO_BENEFICIARY.value,
        params={
            "BOOKING_LINK": booking_app_link(individual_booking.booking),
            "EVENT_DATETIME_ISO": event_beginning_date_in_tz.isoformat(),
            "EVENT_DATE": formatted_event_beginning_date,
            "EVENT_HOUR": formatted_event_beginning_time,
            "IS_DUO_EVENT": individual_booking.booking.quantity == 2,
            "OFFER_NAME": individual_booking.booking.stock.offer.name,
            "OFFER_TAGS": ",".join([criterion.name for criterion in individual_booking.booking.stock.offer.criteria]),
            "OFFER_TOKEN": bookings_common.get_booking_token(individual_booking),
            "OFFER_WITHDRAWAL_DELAY": bookings_common.get_offer_withdrawal_delay(individual_booking),
            "OFFER_WITHDRAWAL_DETAILS": bookings_common.get_offer_withdrawal_details(individual_booking),
            "OFFER_WITHDRAWAL_TYPE": bookings_common.get_offer_withdrawal_type(individual_booking),
            "QR_CODE": bookings_api.get_qr_code_data(individual_booking.booking.token),
            "SUBCATEGORY": individual_booking.booking.stock.offer.subcategoryId,
            "USER_FIRST_NAME": individual_booking.user.firstName,
            "VENUE_ADDRESS": bookings_common.get_venue_address(individual_booking),
            "VENUE_CITY": individual_booking.booking.stock.offer.venue.city,
            "VENUE_NAME": individual_booking.booking.stock.offer.venue.publicName
            if individual_booking.booking.stock.offer.venue.publicName
            else individual_booking.booking.stock.offer.venue.name,
            "VENUE_POSTAL_CODE": individual_booking.booking.stock.offer.venue.postalCode,
        },
    )
