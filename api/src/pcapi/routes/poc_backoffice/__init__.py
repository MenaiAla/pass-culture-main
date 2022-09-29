from flask import Flask


def install_routes(app: Flask) -> None:
    # pylint: disable=unused-import
    from . import auth
    from . import home
    from . import accounts
    from . import shared
    from . import pro
