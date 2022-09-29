from flask import url_for
import pytest

from pcapi.core.testing import override_features
from . import search_page


pytestmark = pytest.mark.usefixtures("db_session")


class PublicAccountsUnauthorizedTest(search_page.UnauthorizedTest):
    endpoint = "poc_backoffice_web.search_public_accounts"


class PublicAccountsAuthorizedTest(search_page.AuthorizedTest):
    endpoint = "poc_backoffice_web.search_public_accounts"

    @override_features(ENABLE_NEW_BACKOFFICE_POC=True)
    def test_search_result_page(self, client, legit_user):  # type: ignore
        url = url_for(
            self.endpoint, terms=legit_user.email, order_by="", page=1, per_page=20
        )

        response = client.with_session_auth(legit_user.email).get(url)

        assert response.status_code == 200, f"[{response.status}] {response.location}"
        assert legit_user.email in str(response.data)
