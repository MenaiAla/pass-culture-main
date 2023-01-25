from pcapi.core.bookings.models import IndividualBooking
from pcapi.utils.date import format_time_in_second_to_human_readable


def get_booking_token(individual_booking: IndividualBooking) -> str:
    return (
        individual_booking.booking.activationCode.code
        if individual_booking.booking.activationCode
        else individual_booking.booking.token
    )


def get_offer_withdrawal_delay(individual_booking: IndividualBooking) -> str | None:
    return (
        format_time_in_second_to_human_readable(individual_booking.booking.stock.offer.withdrawalDelay)
        if individual_booking.booking.stock.offer.withdrawalDelay
        else None
    )


def get_offer_withdrawal_details(individual_booking: IndividualBooking) -> str | None:
    return individual_booking.booking.stock.offer.withdrawalDetails or None


def get_offer_withdrawal_type(individual_booking: IndividualBooking) -> str:
    return individual_booking.booking.stock.offer.withdrawalType


def get_offerer_name(individual_booking: IndividualBooking) -> str:
    return individual_booking.booking.stock.offer.venue.managingOfferer.name


def get_venue_address(individual_booking: IndividualBooking) -> str:
    return individual_booking.booking.stock.offer.venue.address


def get_booking_firstname(individual_booking: IndividualBooking) -> str:
    return individual_booking.booking.firstName
