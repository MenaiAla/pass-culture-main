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



@blueprint.poc_backoffice_web.route("/pro/offerer/<int:offerer_id>", methods=["GET"])
@utils.ff_enabled(FeatureToggle.ENABLE_NEW_BACKOFFICE_POC)
@utils.permission_required(perm_models.Permissions.READ_PUBLIC_ACCOUNT, redirect_to=".unauthorized")
def get_offerer(offerer_id: int):  # type: ignore
    offerer_basic_info = offerers_api.get_offerer_basic_info(offerer_id)

    if not offerer_basic_info:
        return redirect(url_for(".not_found"))

    return render_template("offerer/get.html", offerer=offerer_basic_info)



# @blueprint.backoffice_blueprint.route("offerers/<int:offerer_id>", methods=["GET"])
# @spectree_serialize(
#     response_model=serialization.OffererBasicInfoResponseModel,
#     on_success_status=200,
#     api=blueprint.api,
# )
# @perm_utils.permission_required(perm_models.Permissions.READ_PRO_ENTITY)
# def get_offerer_basic_info(offerer_id: int) -> serialization.OffererBasicInfoResponseModel:

#     offerer_basic_info = offerers_api.get_offerer_basic_info(offerer_id)

#     if not offerer_basic_info:
#         raise api_errors.ResourceNotFoundError(errors={"offerer_id": "La structure n'existe pas"})

#     return serialization.OffererBasicInfoResponseModel(
#         data=serialization.OffererBasicInfo(
#             id=offerer_basic_info.id,
#             name=offerer_basic_info.name,
#             isActive=offerer_basic_info.isActive,
#             siren=offerer_basic_info.siren,
#             region=regions_utils.get_region_name_from_postal_code(offerer_basic_info.postalCode),
#             bankInformationStatus=serialization.OffererBankInformationStatus(
#                 **{stat: (offerer_basic_info.bank_informations or {}).get(stat, 0) for stat in ("ko", "ok")}
#             ),
#             isCollectiveEligible=offerer_basic_info.is_collective_eligible,
#         ),
#     )


# @blueprint.backoffice_blueprint.route("offerers/<int:offerer_id>/total_revenue", methods=["GET"])
# @spectree_serialize(
#     response_model=serialization.OffererTotalRevenueResponseModel,
#     on_success_status=200,
#     api=blueprint.api,
# )
# @perm_utils.permission_required(perm_models.Permissions.READ_PRO_ENTITY)
# def get_offerer_total_revenue(offerer_id: int) -> serialization.OffererTotalRevenueResponseModel:
#     total_revenue = offerers_api.get_offerer_total_revenue(offerer_id)

#     return serialization.OffererTotalRevenueResponseModel(data=total_revenue)


# @blueprint.backoffice_blueprint.route("offerers/<int:offerer_id>/offers_stats", methods=["GET"])
# @spectree_serialize(
#     response_model=serialization.OffererOfferStatsResponseModel,
#     on_success_status=200,
#     api=blueprint.api,
# )
# @perm_utils.permission_required(perm_models.Permissions.READ_PRO_ENTITY)
# def get_offerer_offers_stats(offerer_id: int) -> serialization.OffererOfferStatsResponseModel:
#     # TODO: réduire de le timeout de requête SQL pour ce endpoint
#     #  (peu d'intérêt pour des grosses structures pour qui le requête va prendre
#     #  de toute façon trop de temps, alors autant ne pas bourriner la DB pour rien)
#     offers_stats = offerers_api.get_offerer_offers_stats(offerer_id)

#     return serialization.OffererOfferStatsResponseModel(
#         data=serialization.OffersStats(
#             active=serialization.BaseOffersStats(
#                 individual=offers_stats.individual_offers["active"] if offers_stats.individual_offers else 0,
#                 collective=offers_stats.collective_offers["active"] if offers_stats.collective_offers else 0,
#             ),
#             inactive=serialization.BaseOffersStats(
#                 individual=offers_stats.individual_offers["inactive"] if offers_stats.individual_offers else 0,
#                 collective=offers_stats.collective_offers["inactive"] if offers_stats.collective_offers else 0,
#             ),
#         )
#     )
