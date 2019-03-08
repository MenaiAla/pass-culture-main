from models import PcObject
from repository import offerer_queries


def parse_sirene_data(data: dict) -> dict:
    field_equivalence = {
        "siren": "siren",
        "l1_normalisee": "name",
        "l4_normalisee": "address",
        "libelle_commune": "city",
        "latitude": "latitude",
        "longitude": "longitude",
        "code_postal": "postalCode",
    }
    return {equivalence: data['siege_social'][key] for key, equivalence in field_equivalence.items() if
            key in data['siege_social']}


def update_offerer_with_sirene_data(data: dict):
    parsed_data = parse_sirene_data(data)
    offerer = offerer_queries.find_by_siren(parsed_data['siren'])
    offerer.address = parsed_data.get('address') or offerer.address
    offerer.name = parsed_data.get('name') or offerer.name
    offerer.city = parsed_data.get('city') or offerer.city
    offerer.latitude = parsed_data.get('latitude') or offerer.latitude
    offerer.longitude = parsed_data.get('longitude') or offerer.longitude
    offerer.postalCode = parsed_data.get('postalCode') or offerer.postalCode
    PcObject.check_and_save(offerer)
