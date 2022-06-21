import logging
import typing

import pydantic

from .. import connector


logger = logging.getLogger(__name__)


class BaseQuery:
    def __init__(self, backend: connector.BaseBackend):
        self.backend = backend

    def execute(self, page_size: int = 10_000) -> typing.Generator[pydantic.BaseModel, None, None]:
        rows = self.backend.run_query(self.query)
        try:
            return (self.model(row) for row in rows)
        except pydantic.ValidationError:
            logger.error(
                "Failed to serialize one or more row(s)", extra={"query": self.query, "model": str(self.model)}
            )
            raise

    @property
    def query(self) -> str:
        raise NotImplementedError()

    @property
    def model(self) -> pydantic.BaseModel:
        raise NotImplementedError()
