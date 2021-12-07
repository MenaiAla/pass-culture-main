import datetime

import pytest

import pcapi.core.finance.factories as finance_factories
import pcapi.core.offerers.factories as offerers_factories
import pcapi.core.users.factories as users_factories
from pcapi.utils import human_ids


pytestmark = pytest.mark.usefixtures("db_session")


def test_get_invoices_query(client):
    business_unit1 = finance_factories.BusinessUnitFactory()
    invoice1 = finance_factories.InvoiceFactory(businessUnit=business_unit1, amount=1234)
    business_unit2 = finance_factories.BusinessUnitFactory()
    invoice2 = finance_factories.InvoiceFactory(businessUnit=business_unit2)
    venue1 = offerers_factories.VenueFactory(businessUnit=business_unit1)
    offerer = venue1.managingOfferer
    _venue2 = offerers_factories.VenueFactory(
        managingOfferer=offerer,
        businessUnit=business_unit2,
    )
    other_business_unit = finance_factories.BusinessUnitFactory()
    _other_venue = offerers_factories.VenueFactory(businessUnit=other_business_unit)
    _other_invoice = finance_factories.InvoiceFactory(businessUnit=other_business_unit)
    pro = users_factories.ProFactory(offerers=[offerer])

    client = client.with_session_auth(pro.email)
    humanized_offerer_id = human_ids.humanize(offerer.id)
    response = client.get(f"/finance/{humanized_offerer_id}/invoices")

    assert response.status_code == 200
    invoices = response.json
    assert len(invoices) == 2
    assert invoices[0] == {
        "reference": invoice1.reference,
        "date": invoice1.date.date().isoformat(),
        "amount": 12.34,
        "url": invoice1.url,
        "businessUnitName": business_unit1.name,
    }
    assert invoices[1]["reference"] == invoice2.reference


def test_get_invoices_query_specify_business_unit(client):
    business_unit1 = finance_factories.BusinessUnitFactory()
    invoice1 = finance_factories.InvoiceFactory(businessUnit=business_unit1)
    business_unit2 = finance_factories.BusinessUnitFactory()
    _invoice2 = finance_factories.InvoiceFactory(businessUnit=business_unit2)
    venue = offerers_factories.VenueFactory(businessUnit=business_unit1)
    offerer = venue.managingOfferer
    pro = users_factories.ProFactory(offerers=[offerer])

    client = client.with_session_auth(pro.email)
    params = {"businessUnitId": business_unit1.id}
    humanized_offerer_id = human_ids.humanize(offerer.id)
    response = client.get(f"/finance/{humanized_offerer_id}/invoices", params=params)

    assert response.status_code == 200
    invoices = response.json
    assert len(invoices) == 1
    assert invoices[0]["reference"] == invoice1.reference


def test_get_invoices_query_specify_dates(client):
    business_unit = finance_factories.BusinessUnitFactory()
    _invoice_before = finance_factories.InvoiceFactory(
        businessUnit=business_unit,
        date=datetime.datetime(2021, 6, 1),
    )
    invoice_within = finance_factories.InvoiceFactory(
        businessUnit=business_unit,
        date=datetime.datetime(2021, 7, 1),
    )
    _invoice_after = finance_factories.InvoiceFactory(
        businessUnit=business_unit,
        date=datetime.datetime(2021, 8, 1),
    )
    venue = offerers_factories.VenueFactory(businessUnit=business_unit)
    offerer = venue.managingOfferer
    pro = users_factories.ProFactory(offerers=[offerer])

    client = client.with_session_auth(pro.email)
    params = {"periodBeginningDate": "2021-07-01", "periodEndingDate": "2021-07-31"}
    humanized_offerer_id = human_ids.humanize(offerer.id)
    response = client.get(f"/finance/{humanized_offerer_id}/invoices", params=params)

    assert response.status_code == 200
    invoices = response.json
    assert len(invoices) == 1
    assert invoices[0]["reference"] == invoice_within.reference


def test_get_invoices_query_unauthorized_offerer(client):
    offerer = offerers_factories.OffererFactory()
    pro = users_factories.ProFactory()

    client = client.with_session_auth(pro.email)
    humanized_offerer_id = human_ids.humanize(offerer.id)
    response = client.get(f"/finance/{humanized_offerer_id}/invoices")

    assert response.status_code == 403


def test_get_invoices_query_unauthorized_business_unit(client):
    offerer = offerers_factories.OffererFactory()
    pro = users_factories.ProFactory(offerers=[offerer])
    other_invoice = finance_factories.InvoiceFactory()
    other_business_unit = other_invoice.businessUnit

    client = client.with_session_auth(pro.email)
    humanized_offerer_id = human_ids.humanize(offerer.id)
    params = {"businessUnitId": other_business_unit.id}
    response = client.get(f"/finance/{humanized_offerer_id}/invoices", params=params)

    assert response.status_code == 200
    invoices = response.json
    assert invoices == []
