#!/usr/bin/env python
from werkzeug.middleware.profiler import ProfilerMiddleware

from pcapi import settings
from pcapi.admin.install import install_admin_views
from pcapi.documentation import install_documentation
from pcapi.flask_app import admin
from pcapi.flask_app import app
from pcapi.flask_app import db
from pcapi.local_providers.install import install_local_providers
from pcapi.routes import install_routes
from pcapi.routes.native.v1.blueprint import native_v1
from pcapi.routes.pro.blueprints import pro_api_v2


if settings.PROFILE_REQUESTS:
    profiling_restrictions = [settings.PROFILE_REQUESTS_LINES_LIMIT]
    app.config["PROFILE"] = True
    app.wsgi_app = ProfilerMiddleware(app.wsgi_app, restrictions=profiling_restrictions)


def install_login_manager() -> None:
    # pylint: disable=unused-import
    import pcapi.utils.login_manager


with app.app_context():
    if settings.IS_DEV:
        install_local_providers()

    install_login_manager()
    install_documentation()
    install_admin_views(admin, db.session)
    install_routes(app)

    app.register_blueprint(native_v1, url_prefix="/native/v1")
    app.register_blueprint(pro_api_v2, url_prefix="/v2")

if __name__ == "__main__":
    port = settings.FLASK_PORT
    if settings.IS_DEV and settings.DEBUG_ACTIVATED:
        import debugpy

        if not debugpy.is_client_connected():
            debugpy.listen(("0.0.0.0", 10002))
            print("⏳ Code debugger can now be attached, press F5 in VS Code for example ⏳", flush=True)
            debugpy.wait_for_client()
            print("🎉 Code debugger attached, enjoy debugging 🎉", flush=True)

    app.run(host="0.0.0.0", port=port, debug=True, use_reloader=True)
