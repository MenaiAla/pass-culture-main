from flask import url_for
import pytest

from pcapi.core.testing import override_features
from pcapi.core.offerers import factories as offerers_factories
from . import search_page


pytestmark = pytest.mark.usefixtures("db_session")


class ProUnauthorizedTest(search_page.UnauthorizedTest):
    endpoint = "poc_backoffice_web.search_pro"


class ProAuthorizedTest(search_page.AuthorizedTest):
    endpoint = "poc_backoffice_web.search_pro"

    @override_features(ENABLE_NEW_BACKOFFICE_POC=True)
    def test_search_result_page_user(self, client, legit_user):
        self._search_result_page_base(
            client,
            legit_user,
            offerers_factories.UserOffererFactory().user.email,
            "user"
        )

    @override_features(ENABLE_NEW_BACKOFFICE_POC=True)
    def test_search_result_page_offerer(self, client, legit_user):
        self._search_result_page_base(
            client,
            legit_user,
            offerers_factories.UserOffererFactory().offerer.name,
            "offerer"
        )

    @override_features(ENABLE_NEW_BACKOFFICE_POC=True)
    def test_search_result_page_venue(self, client, legit_user):
        self._search_result_page_base(
            client,
            legit_user,
            offerers_factories.VenueFactory().name,
            "venue"
        )

    def _search_result_page_base(self, client, legit_user, search_term, search_type):
        url = url_for(self.endpoint, terms=search_term, type=search_type)

        response = client.with_session_auth(legit_user.email).get(url)

        assert response.status_code == 200, f"[{response.status}] {response.location}"
        assert search_term in str(response.data)
