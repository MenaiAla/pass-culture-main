from flask import url_for
import pytest

from pcapi.core.testing import override_features
from pcapi.core.users import factories as users_factories


pytestmark = pytest.mark.usefixtures("db_session")


class UnauthorizedHelper:
    @property
    def endpoint(self):
        raise NotImplementedError()

    @property
    def endpoint_kwargs(self):
        return {}

    @property
    def path(self):
        return url_for(self.endpoint, **self.endpoint_kwargs)

    @override_features(ENABLE_NEW_BACKOFFICE_POC=True)
    def test_missing_permission(self, client):  # type: ignore
        user = users_factories.UserFactory(isActive=True)
        response = client.with_session_auth(user.email).get(self.path)

        assert response.status_code == 302
        assert response.location == url_for("poc_backoffice_web.unauthorized", _external=True)

    @override_features(ENABLE_NEW_BACKOFFICE_POC=True)
    def test_not_logged_in(self, client):  # type: ignore
        response = client.get(self.path)
        assert response.status_code == 302
        assert response.location == url_for("poc_backoffice_web.unauthorized", _external=True)

    @override_features(ENABLE_NEW_BACKOFFICE_POC=False)
    def test_ff_disabled(self, client):  # type: ignore
        response = client.get(self.path)

        assert response.status_code == 302
        assert response.location == url_for("poc_backoffice_web.not_enabled", _external=True)
