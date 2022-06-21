"""A basic Google Big Query client

Usage:

"""
import typing

from google.cloud import bigquery

from pcapi import settings
from pcapi.utils.module_loading import import_string


def get_backend() -> "BaseBackend":
    backend_class = import_string(settings.GOOGLE_BIG_QUERY_BACKEND)
    return backend_class()


Row = bigquery.table.Row
RowIterator = typing.Generator[Row, None, None]


class BaseBackend:
    def __init__(self):
        self._client = None

    @property
    def client(self):
        if not self._client:
            self.client = bigquery.Client()

    def run_query(self, query: str, page_size: int) -> RowIterator:
        query_job = self.client.query(query)
        return (row for row in query_job.result(page_size))


TestingRow = typing.TypeVar("TestingRow")
TestingRowIterator = typing.Generator[TestingRow, None, None]


class TestingBackend(BaseBackend):
    def __init__(self, rows: typing.Iterable[TestingRow]):
        self.rows = rows
        super().__init__()

    def run_query(self, *args, **kwargs) -> TestingRowIterator:
        return (row for row in self.rows)
