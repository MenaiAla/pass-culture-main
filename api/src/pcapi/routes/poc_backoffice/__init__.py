from flask import Flask


def install_routes(app: Flask) -> None:
    # pylint: disable=unused-import
    from . import accounts
    from . import auth
    from . import filters
    from . import home
    from . import offerers
    from . import pro
    from . import search

    filters.install_template_filters(app)
