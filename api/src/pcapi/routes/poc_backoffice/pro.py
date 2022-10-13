from functools import partial
import typing

from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
import pydantic

from pcapi.core.offerers import api as offerers_api
from pcapi.core.permissions import models as perm_models
from pcapi.core.users import api as users_api
from pcapi.models.feature import FeatureToggle

from . import blueprint
from . import search_utils
from . import utils
from .serialization import search


class Context:
    fetch_rows_func: search_utils.SearchFunc
    template_columns_header: list[str]
    template_columns: list[str]


class UserContext(Context):
    fetch_rows_func = users_api.search_pro_account
    template_columns_header = ["id", "prénom", "nom", "email"]
    template_columns = ["id", "firstName", "lastName", "email"]


class OffererContext(Context):
    fetch_rows_func = offerers_api.search_offerer
    template_columns_header = ["id", "nom", "ville", "code postal"]
    template_columns = ["id", "name", "city", "postalCode"]


class VenueContext(Context):
    fetch_rows_func = offerers_api.search_venue
    template_columns_header = ["id", "nom", "adresse", "code postal", "ville"]
    template_columns = ["id", "name", "address", "postalCode", "city"]


@blueprint.poc_backoffice_web.route("/pro/search", methods=["GET"])
@utils.ff_enabled(FeatureToggle.ENABLE_NEW_BACKOFFICE_POC, redirect_to=".unauthorized")
@utils.permission_required(perm_models.Permissions.SEARCH_PRO_ACCOUNT, redirect_to=".unauthorized")
def search_pro():  # type: ignore
    if not request.args:
        return render_template(
            "search_pro.html",
            title="Recherche pro",
            dst=url_for(".search_pro"),
            type_options=[opt.value for opt in search.TypeOptions],
        )

    try:
        search_model = search.SearchProModel(**request.args)
    except pydantic.ValidationError:
        return redirect(url_for(".invalid_search"))

    next_page = partial(
        url_for,
        ".search_pro",
        type=search_model.type.value,
        terms=search_model.terms,
        order_by=search_model.order_by,
        per_page=search_model.per_page,
    )

    context = get_context(search_model)
    paginated_rows = search_utils.fetch_paginated_rows(context.fetch_rows_func, search_model)
    next_pages_urls = search_utils.pagination_links(next_page, 1, paginated_rows.pages)

    return render_template(
        "search_result.html",
        columns_header=context.template_columns_header,
        columns=context.template_columns,
        next_pages_urls=next_pages_urls,
        new_search_url=url_for(".search_pro"),
        rows=paginated_rows,
        terms=search_model.terms,
        order_by=search_model.order_by,
        per_page=search_model.per_page,
    )


def get_context(search_model: search.SearchProModel) -> typing.Type[Context]:
    return {
        search.TypeOptions.USER: UserContext,
        search.TypeOptions.OFFERER: OffererContext,
        search.TypeOptions.VENUE: VenueContext,
    }[search_model.type]
