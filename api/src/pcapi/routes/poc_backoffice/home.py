from flask import render_template
from flask_login import current_user
from flask import url_for
import werkzeug

from . import blueprint


@blueprint.poc_backoffice_web.route("/", methods=["GET"])
def home():  # type: ignore
    if current_user and not current_user.is_anonymous:
        return werkzeug.utils.redirect(url_for("poc_backoffice_web.search_public_accounts"))
    return render_template("home.html", context={"current_user": current_user})
