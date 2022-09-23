from unittest.mock import patch

from flask import current_app
import pytest

import pcapi.core.users.factories as users_factories
from pcapi.models.feature import Feature
from pcapi.models.feature import NATIVE_FEATURE_CACHE
from pcapi.models.feature import PRO_FEATURE_CACHE
from pcapi.notifications.internal import testing as internal_notification_testing

from tests.conftest import clean_database


@pytest.mark.usefixtures("clear_redis")
class FeatureViewTest:
    @clean_database
    @patch("wtforms.csrf.session.SessionCSRF.validate_csrf_token")
    def test_feature_edition(self, mocked_validate_csrf_token, client):
        redis_client = current_app.redis_client
        users_factories.AdminFactory(email="admin@example.com")
        inactive_feature = Feature.query.filter_by(isActive=False).first()
        active_feature = Feature.query.filter_by(isActive=True).first()
        redis_client.set(NATIVE_FEATURE_CACHE, "native canary 123546")
        redis_client.set(NATIVE_FEATURE_CACHE, "pro canary 987456")

        data = {"isActive": "true"}
        response = client.with_session_auth("admin@example.com").post(
            f"/pc/back-office/feature/edit?id={inactive_feature.id}", form=data
        )
        assert response.status_code == 302
        assert Feature.query.get(inactive_feature.id).isActive
        assert len(internal_notification_testing.requests) == 1

        data = {"isActive": "false"}
        response = client.with_session_auth("admin@example.com").post(
            f"/pc/back-office/feature/edit?id={active_feature.id}", form=data
        )
        assert response.status_code == 302
        assert not Feature.query.get(active_feature.id).isActive
        assert len(internal_notification_testing.requests) == 2
        assert redis_client.exists(NATIVE_FEATURE_CACHE, PRO_FEATURE_CACHE) == 0
