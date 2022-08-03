import logging

from pcapi.tasks import batch_tasks
from pcapi.core.users.favorite import api


logger = logging.getLogger(__name__)


def not_booked_favorites_notifications() -> None:
    """
    Find soon expiring bookings that will expire in exactly N days and
    send a notification to each user.
    """
    offers_and_users = api.get_offers_and_users_from_not_booked_favorites()
    for offer_and_users in offers_and_users:
        try:
            notification_data = get_not_booked_favorites_notifications(offer_and_users)
            batch_tasks.send_transactional_notification_task.delay(notification_data)
        except Exception:  # pylint: disable=broad-except
            logger.exception(
                "Failed to register send_transactional_notification_task for offer %d, with %d user(s)",
                offer_and_users.offer_id,
                len(offer_and_users.user_ids)
            )
