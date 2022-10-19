from functools import partial

from flask import redirect
from flask import render_template
from flask import request
from flask import url_for
from flask_sqlalchemy import Pagination
import pydantic

from pcapi.core.permissions import models as perm_models
from pcapi.core.users import api as users_api
from pcapi.core.users import models as users_models
from pcapi.models.feature import FeatureToggle

from . import blueprint
from . import search_utils
from . import utils
from .forms import search as search_forms
from .serialization import search


@blueprint.poc_backoffice_web.route("/public_accounts/search", methods=["GET"])
@utils.ff_enabled(FeatureToggle.ENABLE_NEW_BACKOFFICE_POC)
@utils.permission_required(perm_models.Permissions.SEARCH_PUBLIC_ACCOUNT, redirect_to=".unauthorized")
def search_public_accounts():  # type: ignore
    if not request.args:
        return render_template(
            "accounts/search.html",
            title="Recherche grand public",
            dst=url_for(".search_public_accounts"),
            order_by_options=search.OrderByCols,
            form=search_forms.SearchForm(),
        )

    #  try:
    #      search_model = search.SearchUserModel(**request.args)
    #  except pydantic.ValidationError:
    #      return redirect(url_for(".invalid_search"))

    form = search_forms.SearchForm(request.args)
    if not form.validate():
        return render_template(
            "accounts/search.html",
            title="Recherche grand public",
            dst=url_for(".search_public_accounts"),
            order_by_options=search.OrderByCols,
            form=form,
        )

    next_page = partial(
        url_for,
        ".search_public_accounts",
        terms=form.terms.data,
        order_by=form.order_by.data,
        page=form.page.data,
        per_page=form.per_page.data,
    )

    paginated_rows = fetch_rows(form)
    next_pages_urls = search_utils.pagination_links(next_page, form.page.data, paginated_rows.pages)

    column_headers = ["id", "prénom", "nom", "status", "pass", "email", "téléphone"]
    columns = ["id", "firstName", "lastName", "isActive", "roles", "email", "phoneNumber"]

    return render_template(
        "accounts/search_result.html",
        columns_header=column_headers,
        columns=columns,
        next_pages_urls=next_pages_urls,
        new_search_url=url_for(".search_public_accounts"),
        get_link_to_detail=get_public_account_link,
        rows=paginated_rows,
        terms=form.terms.data,
        order_by=form.order_by.data,
        per_page=form.per_page.data,
    )


@blueprint.poc_backoffice_web.route("/public_accounts/<int:user_id>", methods=["GET"])
@utils.ff_enabled(FeatureToggle.ENABLE_NEW_BACKOFFICE_POC)
@utils.permission_required(perm_models.Permissions.READ_PUBLIC_ACCOUNT, redirect_to=".unauthorized")
def get_public_account(user_id: int):  # type: ignore
    user = users_models.User.query.get_or_404(user_id)
    return render_template("accounts/public_account.html", user=user)


def fetch_rows(search_model: search.SearchUserModel) -> Pagination:
    return search_utils.fetch_paginated_rows(users_api.search_public_account, search_model)


def get_public_account_link(user_id: int) -> str:
    return url_for(".get_public_account", user_id=user_id)
