from flask import url_for
import pytest

from pcapi.core.offerers import factories as offerers_factories
from pcapi.core.testing import override_features

from . import search_helpers
from . import unauthorized_helpers


pytestmark = pytest.mark.usefixtures("db_session")


def build_pro_user():
    return offerers_factories.UserOffererFactory().user


def build_offerer():
    return offerers_factories.UserOffererFactory().offerer


def build_venue():
    return offerers_factories.VenueFactory()


class SearchProUnauthorizedTest(unauthorized_helpers.UnauthorizedHelper):
    endpoint = "poc_backoffice_web.search_pro"


class SearchProTest(search_helpers.SearchHelper):
    endpoint = "poc_backoffice_web.search_pro"

    @pytest.mark.parametrize(
        "pro_builder,pro_type",
        [
            (build_pro_user, "user"),
            (build_offerer, "offerer"),
            (build_venue, "venue"),
        ]
    )
    @override_features(ENABLE_NEW_BACKOFFICE_POC=True)
    def test_search_result_page(self, client, legit_user, pro_builder, pro_type):
        pro_object = pro_builder()

        url = url_for(self.endpoint, terms=pro_object.id, type=pro_type)

        response = client.with_session_auth(legit_user.email).get(url)

        assert response.status_code == 200, f"[{response.status_code}] {response.location}"


class GetProUnauthorizedTest(unauthorized_helpers.UnauthorizedHelper):
    endpoint = "poc_backoffice_web.get_pro"
    endpoint_kwargs = {"row_id": 1, "pro_type": "user"}


class GetProTest:
    @pytest.mark.parametrize(
        "pro_builder,pro_type",
        [
            (build_pro_user, "user"),
            (build_offerer, "offerer"),
            (build_venue, "venue"),
        ]
    )
    @override_features(ENABLE_NEW_BACKOFFICE_POC=True)
    def test_get_account(self, client, legit_user, pro_builder, pro_type):
        pro_object = pro_builder()

        url = url_for("poc_backoffice_web.get_pro", row_id=pro_object.id, pro_type=pro_type)

        response = client.with_session_auth(legit_user.email).get(url)
        assert response.status_code == 200, f"[{response.status_code}] {response.location}"
