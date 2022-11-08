import enum
import typing

import sqlalchemy as sqla
from sqlalchemy.orm import declarative_mixin
from sqlalchemy.sql.elements import BinaryExpression


if typing.TYPE_CHECKING:
    from pcapi.utils.typing import hybrid_property
else:
    from sqlalchemy.ext.hybrid import hybrid_property


class ValidationStatus(enum.Enum):
    NEW = "NEW"
    PENDING = "PENDING"
    VALIDATED = "VALIDATED"
    REJECTED = "REJECTED"


@declarative_mixin
class ValidationStatusMixin:
    validationStatus = sqla.Column(sqla.Enum(ValidationStatus, create_constraint=False), nullable=True)

    @hybrid_property
    def isValidated(self) -> bool:
        return self.validationStatus == ValidationStatus.VALIDATED

    @isValidated.expression
    def isValidated(cls) -> BinaryExpression:  # pylint: disable=no-self-argument
        return cls.validationStatus == ValidationStatus.VALIDATED

    @hybrid_property
    def isWaitingForValidation(self) -> bool:
        return self.validationStatus in (ValidationStatus.NEW, ValidationStatus.PENDING)

    @isWaitingForValidation.expression
    def isWaitingForValidation(cls) -> BinaryExpression:  # pylint: disable=no-self-argument
        return cls.validationStatus.in_([ValidationStatus.NEW, ValidationStatus.PENDING])

    @hybrid_property
    def isRejected(self) -> bool:
        return self.validationStatus == ValidationStatus.REJECTED

    @isRejected.expression
    def isRejected(cls) -> BinaryExpression:  # pylint: disable=no-self-argument
        # sqla.not_(isRejected) works only if we check None separately.
        return sqla.and_(cls.validationStatus != None, cls.validationStatus == ValidationStatus.REJECTED)
