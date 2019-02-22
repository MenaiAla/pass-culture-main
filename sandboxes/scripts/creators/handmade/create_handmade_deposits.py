from models.pc_object import PcObject
from utils.logger import logger
from tests.test_utils import create_deposit

def create_handmade_deposits(users_by_name):
    logger.info('create_handmade_deposits')

    deposits_by_name = {}

    deposits_by_name['jeune93 has-booked-some / public / 500'] = create_deposit(
        users_by_name['jeune93 has-booked-some'],
        None,
        amount=500
    )

    PcObject.check_and_save(*deposits_by_name.values())

    logger.info('created {} deposits'.format(len(deposits_by_name)))

    return deposits_by_name
