from functools import wraps
import logging
import time
import typing

from pcapi.models import db
from pcapi.models.feature import FeatureToggle
from pcapi.scheduled_tasks.logger import CronStatus
from pcapi.scheduled_tasks.logger import build_cron_log_message


logger = logging.getLogger(__name__)


def cron_context(func: typing.Callable) -> typing.Callable:
    @wraps(func)
    def wrapper(*args: tuple, **kwargs: dict) -> typing.Callable:
        # The `flask clock` command sets up an application context,
        # but it gets lost when apscheduler starts a job in a new
        # thread. So here we must set an application context again.
        from pcapi.flask_app import app

        with app.app_context():
            return func(*args, **kwargs)

    return wrapper


def cron_require_feature(feature_toggle: FeatureToggle) -> typing.Callable:
    def decorator(func: typing.Callable) -> typing.Callable:
        @wraps(func)
        def wrapper(*args: tuple, **kwargs: dict) -> typing.Optional[typing.Callable]:
            if feature_toggle.is_active():
                return func(*args, **kwargs)
            logger.info("%s is not active", feature_toggle)
            return None

        return wrapper

    return decorator


def log_cron_with_transaction(func: typing.Callable) -> typing.Callable:
    @wraps(func)
    def wrapper(*args: tuple, **kwargs: dict) -> typing.Callable:
        start_time = time.time()
        status = CronStatus.STARTED
        logger.info(build_cron_log_message(name=func.__name__, status=status))

        try:
            result = func(*args, **kwargs)
            # Check if there is something to commit. This avoids idle-in-transaction timeout exception in cron tasks
            # which takes long time and do not write anything in database (e.g. sendinblue automation tasks only read
            # database and often take more than one hour in production).
            if db.session.dirty:
                db.session.commit()
            status = CronStatus.ENDED
        except Exception as exception:
            if db.session.dirty:
                db.session.rollback()
            status = CronStatus.FAILED
            raise exception
        finally:
            duration = time.time() - start_time
            logger.info(build_cron_log_message(name=func.__name__, status=status, duration=duration))

        return result

    return wrapper
