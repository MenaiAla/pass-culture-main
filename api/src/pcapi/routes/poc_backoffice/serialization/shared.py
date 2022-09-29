import typing

import pydantic

from pcapi.routes.serialization import BaseModel


SearchTerm = pydantic.constr(min_length=1, max_length=128, strip_whitespace=True)
SortByCol = typing.Literal[
    "id",
    "-id",
    "email",
    "-email",
    "firstName",
    "-firstName",
    "lastName",
    "-lastName",
]

SearchTerms = pydantic.conlist(item_type=SearchTerm, min_items=1, max_items=16, unique_items=True)
SearchOrderBy = pydantic.conlist(item_type=SortByCol, min_items=0, max_items=16, unique_items=True)  # type: ignore
SearchPage = pydantic.conint(ge=1, le=10)
SearchPerPage = pydantic.conint(ge=1, le=100)

OrderByCols: typing.Collection[str] = SortByCol.__args__  # type: ignore


class SearchUserModel(BaseModel):
    terms: SearchTerms  # type: ignore
    order_by: SearchOrderBy = ["id"]  # type: ignore
    page: SearchPage = 1  # type: ignore
    per_page: SearchPerPage = 20  # type: ignore

    @pydantic.validator("terms", pre=True)
    def validate_terms(cls, value):  # type: ignore
        return value.split(",")

    @pydantic.validator("order_by", pre=True)
    def validate_order_by(cls, value):  # type: ignore
        if not value:
            return ["id"]
        return value.split(",")

    @pydantic.root_validator(pre=True)
    def filter_empty_fields(cls, values: dict) -> dict:
        return {k: v for k, v in values.items() if v}
