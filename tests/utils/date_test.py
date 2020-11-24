import datetime

import dateutil
import pytest

from pcapi.utils.date import CUSTOM_TIMEZONES
from pcapi.utils.date import get_date_formatted_for_email
from pcapi.utils.date import get_department_timezone
from pcapi.utils.date import get_time_formatted_for_email


class GetDateFormattedForEmail:
    def test_should_return_day_followed_by_month_written_in_words(self):
        # Given
        december_23 = datetime.date(2019, 12, 23)

        # When
        date_formatted_for_email = get_date_formatted_for_email(december_23)

        # Then
        assert date_formatted_for_email == "23 décembre"

    def test_should_return_1_digit_day_when_day_is_less_than_10(self):
        # Given
        december_09 = datetime.date(2019, 12, 9)

        # When
        date_formatted_for_email = get_date_formatted_for_email(december_09)

        # Then
        assert date_formatted_for_email == "9 décembre"


class GetTimeFormattedForEmail:
    def test_should_return_hour_followed_by_two_digits_minutes(self):
        # Given
        twelve_o_clock = datetime.time(12, 0, 0, 0)

        # When
        time_formatted_for_email = get_time_formatted_for_email(twelve_o_clock)

        # Then
        assert time_formatted_for_email == "12h00"


class GetDepartmentTimezone:
    def test_should_alert_when_department_code_is_not_a_string(self):
        # When
        with pytest.raises(AssertionError):
            get_department_timezone(86)

    def test_should_return_paris_as_default_timezone(self):
        assert get_department_timezone("1") == "Europe/Paris"

    def test_should_return_custom_timezones(self):
        assert get_department_timezone("973") == "America/Cayenne"

    def test_all_custom_timezones_are_valid(self):
        for timezone in CUSTOM_TIMEZONES.values():
            assert dateutil.tz.gettz(timezone) is not None, f"{timezone} is not a valid timezone"
