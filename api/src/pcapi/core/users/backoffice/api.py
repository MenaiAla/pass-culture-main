from sqlalchemy import orm

from pcapi.core.permissions import models as perm_models
from pcapi.core.users import models


def upsert_role(user: models.User, role: perm_models.Roles) -> models.BackOfficeUserProfile | None:
    if not user.backoffice_profile:
        user.backoffice_profile = models.BackOfficeUserProfile(user=user, role=role)
    else:
        user.backoffice_profile.role = role

    return user.backoffice_profile


def fetch_user_with_profile(user_id: int) -> models.User | None:
    return (
        models.User.query.filter_by(id=user_id)
        .options(orm.joinedload(models.User.backoffice_profile).load_only(models.BackOfficeUserProfile.role))
        .options(orm.load_only(models.User.id, models.User.email))
        .one_or_none()
    )
