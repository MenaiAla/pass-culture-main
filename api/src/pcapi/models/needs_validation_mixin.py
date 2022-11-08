import secrets
import typing

import sqlalchemy as sqla
from sqlalchemy.orm import declarative_mixin
from sqlalchemy.sql.elements import BinaryExpression


if typing.TYPE_CHECKING:
    from pcapi.utils.typing import hybrid_property
else:
    from sqlalchemy.ext.hybrid import hybrid_property


@declarative_mixin
class NeedsValidationMixin:
    validationToken = sqla.Column(sqla.String(27), unique=True, nullable=True)

    def generate_validation_token(self) -> None:
        self.validationToken = secrets.token_urlsafe(20)

    @hybrid_property
    def isValidated(self) -> bool:
        return self.validationToken is None

    @isValidated.expression
    def isValidated(cls) -> BinaryExpression:  # pylint: disable=no-self-argument
        return cls.validationToken.is_(None)
