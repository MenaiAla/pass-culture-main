import pytest 

pytestmark = pytest.mark.usefixtures("db_session")


class GetNotBookedFavoritesQueryTest:
    def test_
