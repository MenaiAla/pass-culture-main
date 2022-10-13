import pytest

from pcapi.core.permissions import models as perm_models
from pcapi.core.users import factories as users_factories
from pcapi.core.users import models as users_models
from pcapi.models import db


@pytest.fixture(scope="function", name="legit_user")
def legit_user_fixture() -> users_models.User:
    user = users_factories.UserFactory(isActive=True)
    user.backoffice_profile = users_models.BackOfficeUserProfile(user=user, role=perm_models.Roles.ADMIN)

    db.session.commit()

    return user
