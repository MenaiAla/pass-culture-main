from flask import url_for
import pytest

from pcapi.core.testing import override_features
from pcapi.core.users import factories as users_factories

from . import search_helpers
from . import unauthorized_helpers


pytestmark = pytest.mark.usefixtures("db_session")


class SearchPublicAccountsUnauthorizedTest(unauthorized_helpers.UnauthorizedHelper):
    endpoint = "poc_backoffice_web.search_public_accounts"


class SearchPublicAccountsAuthorizedTest(search_helpers.SearchHelper):
    endpoint = "poc_backoffice_web.search_public_accounts"

    @override_features(ENABLE_NEW_BACKOFFICE_POC=True)
    def test_search_result_page(self, client, legit_user):  # type: ignore
        url = url_for(self.endpoint, terms=legit_user.email, order_by="", page=1, per_page=20)

        response = client.with_session_auth(legit_user.email).get(url)

        assert response.status_code == 200, f"[{response.status}] {response.location}"
        assert legit_user.email in str(response.data)


class GetPublicAccountUnauthorizedTest(unauthorized_helpers.UnauthorizedHelper):
    endpoint = "poc_backoffice_web.get_public_account"
    endpoint_kwargs = {"user_id": 1}


class GetPublicAccountTest:
    @override_features(ENABLE_NEW_BACKOFFICE_POC=True)
    def test_get_account(self, client, legit_user):
        user = users_factories.UserFactory()
        url = url_for("poc_backoffice_web.get_public_account", user_id=user.id)

        response = client.with_session_auth(legit_user.email).get(url)
        assert response.status_code == 200, f"[{response.status_code}] {response.location}"
