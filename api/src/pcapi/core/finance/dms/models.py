from datetime import datetime
import enum
import logging

import pydantic


logger = logging.getLogger(__name__)


class DmsAnnotation(pydantic.BaseModel):
    id: str
    label: str
    text: str | None


class DmsFieldErrorKeyEnum(enum.Enum):
    iban = "iban"
    bic = "bic"
    siret = "siret"


class DmsFieldErrorDetails(pydantic.BaseModel):
    key: DmsFieldErrorKeyEnum
    value: str | None


class DMSContent(pydantic.BaseModel):
    """Formerly ApplicationDetail"""

    application_number: int = pydantic.Field(..., alias="application_id")  # keep alias for old data
    bic: str | None = None
    dms_token: str | None = None
    dossier_id: str = None
    error_annotation: DmsAnnotation | None
    field_errors: list[DmsFieldErrorDetails | None]
    iban: str | None = None
    latest_modification_datetime: datetime
    procedure_number: int = pydantic.Field(..., alias="procedure_id")  # keep alias for old data
    processed_datetime: datetime | None
    registration_datetime: datetime | None
    siret: str | None = None
    state: str | None
    venue_url_annotation: DmsAnnotation | None

    class Config:
        allow_population_by_field_name = True
