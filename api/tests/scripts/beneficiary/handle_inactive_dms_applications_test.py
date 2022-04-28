from unittest.mock import patch

import freezegun
import pytest

from pcapi.connectors.dms import api as api_dms
from pcapi.core.fraud import factories as fraud_factories
from pcapi.core.fraud import models as fraud_models
from pcapi.core.testing import override_settings
from pcapi.scripts.beneficiary.handle_inactive_dms_applications import _has_inactivity_delay_expired
from pcapi.scripts.beneficiary.handle_inactive_dms_applications import handle_inactive_dms_applications

from tests.scripts.beneficiary.fixture import make_parsed_graphql_application


class HandleInactiveApplicationTest:
    @patch.object(api_dms.DMSGraphQLClient, "mark_without_continuation")
    @patch.object(api_dms.DMSGraphQLClient, "make_on_going")
    @patch.object(api_dms.DMSGraphQLClient, "get_applications_with_details")
    @freezegun.freeze_time("2022-04-27")
    @override_settings(DMS_ENROLLMENT_INSTRUCTOR="SomeInstructorId")
    @pytest.mark.usefixtures("db_session")
    def test_mark_without_continuation(self, dms_applications_mock, make_on_going_mock, mark_without_continuation_mock):
        active_application = make_parsed_graphql_application(
            application_id=1, state="en_construction", last_modification_date="2022-04-01T00:00:00+02:00"
        )
        inactive_application = make_parsed_graphql_application(
            application_id=2, state="en_construction", last_modification_date="2021-11-11T00:00:00+02:00"
        )

        active_fraud_check = fraud_factories.BeneficiaryFraudCheckFactory(
            type=fraud_models.FraudCheckType.DMS,
            thirdPartyId=str(active_application.number),
            status=fraud_models.FraudCheckStatus.STARTED,
        )
        inactive_fraud_check = fraud_factories.BeneficiaryFraudCheckFactory(
            type=fraud_models.FraudCheckType.DMS,
            thirdPartyId=str(inactive_application.number),
            status=fraud_models.FraudCheckStatus.STARTED,
        )

        dms_applications_mock.return_value = [active_application, inactive_application]

        handle_inactive_dms_applications(1)

        make_on_going_mock.assert_called_once_with(
            inactive_application.id, "SomeInstructorId", disable_notification=True
        )
        mark_without_continuation_mock.assert_called_once_with(
            inactive_application.id,
            "SomeInstructorId",
            motivation="Aucune activité n'a eu lieu sur votre dossier depuis plus de 90 jours",
        )
        assert active_fraud_check.status == fraud_models.FraudCheckStatus.STARTED
        assert inactive_fraud_check.status == fraud_models.FraudCheckStatus.CANCELED


class HasInactivityDelayExpiredTest:
    def test_has_inactivity_delay_expired_without_message(self):
        no_message_application = make_parsed_graphql_application(
            application_id=1, state="en_construction", last_modification_date="2022-01-01T00:00:00+02:00", messages=[]
        )

        assert _has_inactivity_delay_expired(no_message_application)

    @freezegun.freeze_time("2022-04-27")
    def test_has_inactivity_delay_expired_with_recent_message(self):
        no_message_application = make_parsed_graphql_application(
            application_id=1,
            state="en_construction",
            last_modification_date="2022-01-01T00:00:00+02:00",
            messages=[
                {"createdAt": "2022-04-06T00:00:00+02:00", "email": "instrouctor@example.com"},
                {"createdAt": "2020-04-06T00:00:00+02:00", "email": "instrouctor@example.com"},
            ],
        )

        assert not _has_inactivity_delay_expired(no_message_application)

    @freezegun.freeze_time("2022-04-27")
    def test_has_inactivity_delay_expired_with_old_message(self):
        no_message_application = make_parsed_graphql_application(
            application_id=1,
            state="en_construction",
            last_modification_date="2022-01-01T00:00:00+02:00",
            messages=[
                {"createdAt": "2022-01-01T00:00:00+02:00", "email": "instrouctor@example.com"},
                {"createdAt": "2020-04-06T00:00:00+02:00", "email": "instrouctor@example.com"},
            ],
        )

        assert _has_inactivity_delay_expired(no_message_application)

    @freezegun.freeze_time("2022-04-27")
    def test_has_inactivity_delay_expired_with_old_message_sent_by_user(self):
        applicant_email = "applikant@example.com"

        no_message_application = make_parsed_graphql_application(
            application_id=1,
            email=applicant_email,
            state="en_construction",
            last_modification_date="2022-01-01T00:00:00+02:00",
            messages=[
                {"createdAt": "2021-01-01T00:00:00+02:00", "email": applicant_email},
                {"createdAt": "2020-04-06T00:00:00+02:00", "email": "instrouctor@example.com"},
            ],
        )

        assert not _has_inactivity_delay_expired(no_message_application)
