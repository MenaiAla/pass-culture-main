import datetime

from pcapi.routes.serialization import BaseModel


class EduconnectUserE2ERequest(BaseModel):
    birth_date: datetime.date
    first_name: str
    last_name: str
