from functools import partial
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


GetBaseQuery = typing.Callable[[int], BaseQuery]


class Context:
    fetch_rows_func: search_utils.SearchFunc
    get_item_base_query: GetBaseQuery

    @classmethod
    def get_pro_link(cls, row_id: int) -> str:
        raise NotImplementedError()


class UserContext(Context):
    fetch_rows_func = users_api.search_pro_account
    get_item_base_query = users_api.get_pro_account_base_query

    @classmethod
    def get_pro_link(cls, row_id: int) -> str:
        return url_for(".get_pro", row_id=row_id, pro_type="user")


class OffererContext(Context):
    fetch_rows_func = offerers_api.search_offerer
    get_item_base_query = offerers_api.get_offerer_base_query

    @classmethod
    def get_pro_link(cls, row_id: int) -> str:
        return url_for(".get_pro", row_id=row_id, pro_type="offerer")


class VenueContext(Context):
    fetch_rows_func = offerers_api.search_venue
    get_item_base_query = offerers_api.get_venue_base_query

    @classmethod
    def get_pro_link(cls, row_id: int) -> str:
        return url_for(".get_pro", row_id=row_id, pro_type="venue")


def render_search_template(form: search_forms.ProSearchForm | None = None) -> str:
    if form is None:
        form = search_forms.ProSearchForm()

    return render_template(
        "pro/search.html",
        title="Recherche pro",
        dst=url_for(".search_pro"),
        type_options=[opt.value for opt in search.TypeOptions],
        form=search_forms.ProSearchForm(),
    )


@blueprint.poc_backoffice_web.route("/pro/search", methods=["GET"])
@utils.ff_enabled(FeatureToggle.ENABLE_NEW_BACKOFFICE_POC)
@utils.permission_required(perm_models.Permissions.SEARCH_PRO_ACCOUNT, redirect_to=".unauthorized")
def search_pro():  # type: ignore
    if not request.args:
        return render_search_template()

    form = search_forms.ProSearchForm(request.args)
    if not form.validate():
        return render_search_template(form)

    try:
        search_model = search.SearchProModel(**form.data)
    except pydantic.ValidationError as err:
        for error in err.errors():
            form.add_error_to(error["loc"][0])
        return render_search_template(form)

    next_page = partial(
        url_for,
        ".search_pro",
        type=search_model.type.value,
        terms=search_model.terms,
        order_by=search_model.order_by,
        per_page=search_model.per_page,
    )

    context = get_context(search_model.type)
    paginated_rows = search_utils.fetch_paginated_rows(context.fetch_rows_func, search_model)
    next_pages_urls = search_utils.pagination_links(next_page, search_model.page, paginated_rows.pages)

    return render_template(
        "pro/search_result.html",
        form=form,
        dst=url_for(".search_pro"),
        result_type=form.type.data,
        next_pages_urls=next_pages_urls,
        new_search_url=url_for(".search_pro"),
        get_link_to_detail=context.get_pro_link,
        rows=paginated_rows,
        terms=search_model.terms,
        order_by=search_model.order_by,
        per_page=search_model.per_page,
    )


# TODO à suppr pour que ça ne gère que les Venue ou les users
@blueprint.poc_backoffice_web.route("/pro/<string:pro_type>/<int:row_id>", methods=["GET"])
@utils.ff_enabled(FeatureToggle.ENABLE_NEW_BACKOFFICE_POC)
@utils.permission_required(perm_models.Permissions.READ_PUBLIC_ACCOUNT, redirect_to=".unauthorized")
def get_pro(pro_type: str, row_id: int):  # type: ignore
    try:
        formatted_pro_type = search.TypeOptions[pro_type.upper()]
        context = get_context(formatted_pro_type)
    except KeyError:
        return redirect(url_for(".not_found"))

    query = context.get_item_base_query(row_id)
    row = query.one_or_none()
    if not row:
        return redirect(url_for(".not_found"))

    return render_template("pro/get.html", row=row, pro_type=pro_type)


def get_context(pro_type: search.TypeOptions) -> typing.Type[Context]:
    return {
        search.TypeOptions.USER: UserContext,
        search.TypeOptions.OFFERER: OffererContext,
        search.TypeOptions.VENUE: VenueContext,
    }[pro_type]
