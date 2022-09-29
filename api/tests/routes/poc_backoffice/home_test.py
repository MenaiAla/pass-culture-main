from flask import url_for

from pcapi.core.testing import override_features


class HomePageTest:
    @override_features(ENABLE_NEW_BACKOFFICE_POC=True)
    def test_view_home_page(self, client):  # type: ignore
        response = client.get(url_for("poc_backoffice_web.home"))
        assert response.status_code == 200
