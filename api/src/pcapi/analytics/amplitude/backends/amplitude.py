from amplitude import Amplitude

from pcapi import settings

import logging

AMPLITUDE_API_KEY = settings.AMPLITUDE_API_KEY
AMPLITUDE_API_KEY = "fr0vv76g96e0Ch4PI04cHCcG-oDFRAFa"

client = Amplitude(AMPLITUDE_API_KEY)


client.configuration.logger = logging.getLogger(__name__)
client.configuration.min_id_length = 1
client.configuration.server_zone = "EU"
client.configuration.use_batch = True
client.configuration.server_url = "proxy url that forwarding the requests"
client.configuration.opt_out = False