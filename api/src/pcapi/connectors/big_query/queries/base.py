import typing

import pydantic

from .. import connector


RowIterator = typing.Generator[pydantic.BaseModel, None, None]


class MalformedRow(Exception):
    def __init__(self, msg: str, index: int, model: typing.Type[pydantic.BaseModel], raw_query: str):
        self.index = index
        self.model = model
        self.raw_query = raw_query
        super().__init__(msg)


class BaseQuery:
    def __init__(self, backend: connector.BaseBackend):
        self.backend = backend

    def execute(self, page_size: int  = 1_000) -> RowIterator:
        rows = self.backend.run_query(self.raw_query, page_size=page_size)
        for index, row in enumerate(rows):
            try:
                yield self.model(**row)  # type: ignore
            except pydantic.ValidationError as err:
                raise MalformedRow(msg=str(row), index=index, model=self.model, raw_query=self.raw_query) from err

    @property
    def raw_query(self) -> str:
        raise NotImplementedError()

    @property
    def model(self) -> typing.Type[pydantic.BaseModel]:
        raise NotImplementedError()
