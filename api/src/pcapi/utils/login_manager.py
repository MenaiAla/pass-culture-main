import uuid

import flask
from flask import current_app as app
import werkzeug.datastructures

import pcapi.core.users.backoffice.api as backoffice_api
import pcapi.core.users.models as users_models
from pcapi.models import db
from pcapi.models.api_errors import ApiErrors
from pcapi.routes.backoffice_v3.blueprint import backoffice_v3_web


def get_request_authorization() -> werkzeug.datastructures.Authorization | None:
    try:
        return flask.request.authorization
    except UnicodeDecodeError:
        # `werkzeug.http.parse_authorization_header()` raises a
        # UnicodeDecodeError if the login or the password contains
        # characters that have not been encoded in "utf-8", which
        # we'll happily send to Sentry, where the password could
        # appear as clear text.
        return None


@app.login_manager.user_loader  # type: ignore [attr-defined]
def get_user_with_id(user_id: int) -> users_models.User | None:
    flask.session.permanent = True

    session_uuid = flask.session.get("session_uuid")
    session_context = flask.session.get("context")

    query = users_models.UserSession.query.filter_by(userId=user_id, uuid=session_uuid, context=session_context)
    if not query.one_or_none():
        return None

    try:
        if flask.request.blueprint.startswith(backoffice_v3_web.name):  # type: ignore
            return backoffice_api.fetch_user_with_profile(user_id)
    except AttributeError:
        pass

    return users_models.User.query.get(user_id)


@app.login_manager.unauthorized_handler  # type: ignore [attr-defined]
def send_401() -> tuple[flask.Response, int]:
    e = ApiErrors()
    e.add_error("global", "Authentification nécessaire")
    return flask.jsonify(e.errors), 401


def stamp_session(user: users_models.User, context: users_models.UserSessionContext | None = None) -> None:
    session_uuid = uuid.uuid4()

    flask.session["session_uuid"] = session_uuid
    flask.session["user_id"] = user.id
    flask.session["context"] = context.name if context else None

    db.session.add(users_models.UserSession(userId=user.id, uuid=session_uuid, context=context))
    db.session.commit()


def discard_session(context: users_models.UserSessionContext | None = None) -> None:
    session_uuid = flask.session.get("session_uuid")
    user_id = flask.session.get("user_id")
    flask.session.clear()

    filter_kwargs = {"userId": user_id, "uuid": session_uuid}
    if context:
        filter_kwargs["context"] = context.name

    users_models.UserSession.query.filter_by(**filter_kwargs).delete(synchronize_session=False)
    db.session.commit()
