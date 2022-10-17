from functools import wraps
import logging
import typing

from flask import Response
from flask import request
from flask import url_for
from flask_login import current_user
import werkzeug

from pcapi import settings
from pcapi.core.permissions import models as perm_models
from pcapi.models.feature import FeatureToggle


logger = logging.getLogger(__name__)


def ff_enabled(feature: FeatureToggle) -> typing.Callable:
    def wrapper(func: typing.Callable) -> typing.Callable:
        @wraps(func)
        def wrapped(*args, **kwargs) -> tuple[Response, int] | typing.Callable:  # type: ignore[no-untyped-def]
            if not feature.is_active():
                return werkzeug.utils.redirect(url_for(".not_enabled"))

            return func(*args, **kwargs)

        return wrapped

    return wrapper


def permission_required(permission: perm_models.Permissions, redirect_to: str) -> typing.Callable:
    """
    Ensure that the current user is connected and that it has the
    expected permissions.
    """

    def wrapper(func: typing.Callable) -> typing.Callable:
        @wraps(func)
        def wrapped(*args, **kwargs) -> tuple[Response, int] | typing.Callable:  # type: ignore[no-untyped-def]
            if not current_user.is_authenticated:
                return werkzeug.utils.redirect(url_for(redirect_to))

            try:
                user_role = current_user.backoffice_profile.role
            except AttributeError:
                return werkzeug.utils.redirect(url_for(redirect_to))

            user_permission = perm_models.ROLES_PERMISSIONS_MAPPING[user_role]

            if permission not in user_permission and not settings.IS_TESTING:
                logger.warning(
                    "user %s missed permission %s while trying to access %s",
                    current_user.email,
                    permission.name,
                    request.url,
                )

                return werkzeug.utils.redirect(url_for(redirect_to))

            return func(*args, **kwargs)

        return wrapped

    return wrapper


def custom_login_required(redirect_to: str) -> typing.Callable:
    def wrapper(func: typing.Callable) -> typing.Callable:
        @wraps(func)
        def wrapped(*args, **kwargs) -> tuple[Response, int] | typing.Callable:  # type: ignore[no-untyped-def]
            if not current_user.is_authenticated:
                return werkzeug.utils.redirect(url_for(redirect_to))

            return func(*args, **kwargs)

        return wrapped

    return wrapper
