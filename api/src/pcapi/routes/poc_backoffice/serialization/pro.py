from enum import Enum

from .shared import SearchUserModel


class TypeOptions(Enum):
    USER = "user"
    OFFERER = "offerer"
    VENUE = "venue"


class SearchProUserModel(SearchUserModel):
    type: TypeOptions  # type: ignore
