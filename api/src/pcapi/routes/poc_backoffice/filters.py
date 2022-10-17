from flask import Flask

from pcapi.core.users import models


def format_user_state(user: models.User) -> str:
    if user.isActive:
        return "Actif"
    return "Suspendu"


def format_user_roles(user: models.User) -> str:
    if not user.roles:
        return "Aucune information"

    match user.roles[0]:
        case models.UserRole.ADMIN:
            return "Admin"
        case models.UserRole.PRO:
            return "Pro"
        case models.UserRole.TEST:
            return "Test"
        case models.UserRole.BENEFICIARY:
            return "Pass 18"
        case models.UserRole.UNDERAGE_BENEFICIARY:
            return "Pass 15-17"


def format_user_phone_number(user: models.User) -> str:
    if not user.phoneNumber:
        return ""

    return user.phoneNumber  # type: ignore


def install_template_filters(app: Flask) -> None:
    app.jinja_env.filters["format_user_state"] = format_user_state
    app.jinja_env.filters["format_user_roles"] = format_user_roles
    app.jinja_env.filters["format_user_phone_number"] = format_user_phone_number
