import typing

from flask_sqlalchemy import BaseQuery
from flask_sqlalchemy import Pagination

from .serialization import search


SearchFunc = typing.Callable[[typing.Iterable[str], list[str] | None], BaseQuery]


def fetch_paginated_rows(search_func: SearchFunc, search_model: search.SearchUserModel) -> Pagination:
    query = search_func(search_model.terms, search_model.order_by)
    return query.paginate(page=search_model.page, per_page=search_model.per_page, error_out=False)


UrlForPartial = typing.Callable[[int], str]


def pagination_links(partial_func: UrlForPartial, start_page: int, end_page: int) -> list[tuple[int, str]]:
    return [(page, partial_func(page=page)) for page in range(start_page, end_page + 1)]  # type: ignore[call-arg]
