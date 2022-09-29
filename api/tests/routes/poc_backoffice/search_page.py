from flask import url_for
import pytest

from pcapi.core.testing import override_features
from pcapi.core.users import factories as users_factories


pytestmark = pytest.mark.usefixtures("db_session")


class UnauthorizedTest:
    @property
    def endpoint(self):
        raise NotImplementedError()

    @property
    def search_path(self):
        return url_for(self.endpoint)

    @override_features(ENABLE_NEW_BACKOFFICE_POC=True)
    def test_missing_permission(self, client):  # type: ignore
        user = users_factories.UserFactory(isActive=True)
        response = client.with_session_auth(user.email).get(self.search_path)

        assert response.status_code == 302
        assert response.location == url_for("poc_backoffice_web.unauthorized", _external=True)

    @override_features(ENABLE_NEW_BACKOFFICE_POC=True)
    def test_not_logged_in(self, client):  # type: ignore
        response = client.get(self.search_path)
        assert response.status_code == 302
        assert response.location == url_for("poc_backoffice_web.unauthorized", _external=True)

    @override_features(ENABLE_NEW_BACKOFFICE_POC=False)
    def test_ff_disabled(self, client):  # type: ignore
        response = client.get(self.search_path)

        assert response.status_code == 302
        assert response.location == url_for("poc_backoffice_web.unauthorized", _external=True)


class AuthorizedTest:
    @property
    def endpoint(self):
        raise NotImplementedError()

    @property
    def search_path(self):
        return url_for(self.endpoint)

    @override_features(ENABLE_NEW_BACKOFFICE_POC=True)
    def test_view_empty_search_page(self, client, legit_user):  # type: ignore
        response = client.with_session_auth(legit_user.email).get(
            self.search_path
        )
        assert response.status_code == 200

    @override_features(ENABLE_NEW_BACKOFFICE_POC=True)
    def test_invalid_search(self, client, legit_user):  # type: ignore
        url = url_for(self.endpoint, unknown="param")
        response = client.with_session_auth(legit_user.email).get(url)

        assert response.status_code == 302, f"[{response.status}] {response.location}"
        assert response.location == url_for("poc_backoffice_web.invalid_search", _external=True)
