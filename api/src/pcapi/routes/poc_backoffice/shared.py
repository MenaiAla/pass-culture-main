from flask import render_template

from pcapi.models.feature import FeatureToggle

from . import blueprint
from . import utils


@blueprint.poc_backoffice_web.route("/search/invalid", methods=["GET"])
@utils.ff_enabled(FeatureToggle.ENABLE_NEW_BACKOFFICE_POC, redirect_to=".unauthorized")
def invalid_search():  # type: ignore
    return render_template("invalid_search.html")
