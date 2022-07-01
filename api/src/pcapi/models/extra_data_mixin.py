import typing

from sqlalchemy import Column
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.hybrid import hybrid_property


class ExtraDataMixin:
    _jsonData = Column("jsonData", JSONB)

    @hybrid_property
    def extraData(self) -> dict:
        if not isinstance(self._jsonData, dict):
            raise ValueError("extraData must be a dictionary")
        return self._jsonData

    @extraData.expression  # type: ignore[no-redef]
    def extraData(cls) -> dict:  # pylint: disable=no-self-argument
        return cls._jsonData

    @extraData.setter  # type: ignore[no-redef]
    def extraData(self, value: typing.Optional[dict]) -> None:
        if not isinstance(value, dict):
            raise ValueError("extraData must be a dictionary")
        self._jsonData = value
