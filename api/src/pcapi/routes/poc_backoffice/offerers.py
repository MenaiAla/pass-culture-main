from functools import partial
import time
import typing

from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
from flask_sqlalchemy import BaseQuery
import pydantic

from pcapi.core.offerers import api as offerers_api
from pcapi.core.permissions import models as perm_models
from pcapi.core.users import api as users_api
from pcapi.models.feature import FeatureToggle

from . import blueprint
from . import search_utils
from . import utils
from .forms import search as search_forms
from .serialization import search


@blueprint.poc_backoffice_web.route("/pro/offerer/<int:offerer_id>", methods=["GET"])
@utils.ff_enabled(FeatureToggle.ENABLE_NEW_BACKOFFICE_POC)
@utils.permission_required(perm_models.Permissions.READ_PUBLIC_ACCOUNT, redirect_to=".unauthorized")
def get_offerer(offerer_id: int):  # type: ignore
    offerer_basic_info = offerers_api.get_offerer_basic_info(offerer_id)

    if not offerer_basic_info:
        return redirect(url_for(".not_found"))

    return render_template("offerer/get.html", offerer=offerer_basic_info)


@blueprint.poc_backoffice_web.route("/pro/offerer/<int:offerer_id>/stats", methods=["GET"])
@utils.ff_enabled(FeatureToggle.ENABLE_NEW_BACKOFFICE_POC)
@utils.permission_required(perm_models.Permissions.READ_PUBLIC_ACCOUNT, redirect_to=".unauthorized")
@utils.handle_errors(error_template="components/error.html", turbo_frame_id="total_revenue_frame")
def get_offerer_stats(offerer_id: int):  # type: ignore
    total_revenue = offerers_api.get_offerer_total_revenue(offerer_id)
    offers_stats = offerers_api.get_offerer_offers_stats(offerer_id)

    return render_template(
        "offerer/get/stats.html",
        total_revenue=total_revenue,
        offers_stats={  # a bit dirty, get_offerer_offers_stats should return integers only
            "active": {
                "individual": offers_stats.individual_offers.get("active", 0) if offers_stats.individual_offers else 0,
                "collective": offers_stats.collective_offers.get("active", 0) if offers_stats.collective_offers else 0,
            },
            "inactive": {
                "individual": offers_stats.individual_offers.get("inactive", 0) if offers_stats.individual_offers else 0,
                "collective": offers_stats.collective_offers.get("inactive", 0) if offers_stats.collective_offers else 0,
            },
        },
    )
