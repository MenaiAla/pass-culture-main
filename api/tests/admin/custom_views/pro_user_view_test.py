from datetime import datetime
from datetime import timedelta
from unittest.mock import patch

from wtforms.form import Form

from pcapi.admin.custom_views.pro_user_view import ProUserView
from pcapi.core.history import models as history_models
import pcapi.core.offerers.factories as offerers_factories
from pcapi.core.offerers.models import Offerer
from pcapi.core.offerers.models import UserOfferer
import pcapi.core.users.factories as users_factories
from pcapi.core.users.models import Token
from pcapi.core.users.models import TokenType
from pcapi.core.users.models import User

from tests.conftest import TestClient
from tests.conftest import clean_database


class ProUserViewTest:
    @clean_database
    @patch("wtforms.csrf.session.SessionCSRF.validate_csrf_token")
    def test_pro_user_creation(self, mocked_validate_csrf_token, app):
        # Given
        bo_user = users_factories.AdminFactory(email="USER@example.com")
        offerers_factories.VirtualVenueTypeFactory()

        data = dict(
            email="toto@testemail.fr",
            firstName="Juste",
            lastName="Leblanc",
            phoneNumber="0601020304",
            dateOfBirth="2020-12-09 09:45:00",
            departementCode="93",
            postalCode="93000",
            offererSiren="123654987",
            offererName="Les films du plat pays",
            offererPostalCode="93000",
            offererCity="Nantes",
            csrf_token="token",
        )

        # When
        client = TestClient(app.test_client()).with_session_auth("user@example.com")
        response = client.post("/pc/back-office/pro_users/new", form=data)

        # Then
        assert response.status_code == 302

        users_filtered = User.query.filter_by(email="toto@testemail.fr").all()
        assert len(users_filtered) == 1
        user_created = users_filtered[0]
        assert user_created.firstName == "Juste"
        assert user_created.lastName == "Leblanc"
        assert user_created.publicName == "Juste Leblanc"
        assert user_created.phoneNumber == "+33601020304"
        assert user_created.dateOfBirth == datetime(2020, 12, 9, 9, 45)
        assert user_created.departementCode == "93"
        assert user_created.postalCode == "93000"
        assert not user_created.has_beneficiary_role
        assert user_created.has_pro_role
        assert len(user_created.deposits) == 0

        offerers_filtered = Offerer.query.filter_by(siren="123654987").all()
        assert len(offerers_filtered) == 1
        offerer_created = offerers_filtered[0]
        assert offerer_created.name == "Les films du plat pays"
        assert offerer_created.postalCode == "93000"
        assert offerer_created.city == "Nantes"
        assert offerer_created.isValidated

        user_offerers_filtered = UserOfferer.query.filter_by(
            userId=user_created.id,
            offererId=offerer_created.id,
        ).all()
        assert len(user_offerers_filtered) == 1

        token = Token.query.filter_by(userId=user_created.id).first()
        assert token.type == TokenType.RESET_PASSWORD
        assert token.expirationDate > datetime.utcnow() + timedelta(days=29)
        assert token.expirationDate < datetime.utcnow() + timedelta(days=31)

        actions_list = history_models.ActionHistory.query.all()
        assert len(actions_list) == 1
        assert actions_list[0].actionType == history_models.ActionType.OFFERER_VALIDATED
        assert actions_list[0].authorUser == bo_user
        assert actions_list[0].user == users_filtered[0]
        assert actions_list[0].offerer == offerer_created

    @clean_database
    @patch("wtforms.csrf.session.SessionCSRF.validate_csrf_token")
    def test_pro_user_edition(self, mocked_validate_csrf_token, app):
        # Given
        admin_user = users_factories.AdminFactory()
        pro_user = users_factories.ProFactory()

        data = dict(
            csrf_token="token",
            firstName=pro_user.firstName,
            lastName=pro_user.lastName,
            dateOfBirth="",
            departementCode="06",
            postalCode="06000",
            comment="",
            email=pro_user.email,
            phoneNumber="0601020304",
        )

        # When
        client = TestClient(app.test_client()).with_session_auth(admin_user.email)
        response = client.post(f"/pc/back-office/pro_users/edit?id={pro_user.id}", form=data)

        # Then
        assert response.status_code == 302

        updated_user = User.query.filter_by(email=pro_user.email).first()
        assert updated_user.firstName == pro_user.firstName
        assert updated_user.lastName == pro_user.lastName
        assert updated_user.dateOfBirth is None
        assert updated_user.departementCode == "06"
        assert updated_user.postalCode == "06000"
        assert updated_user.phoneNumber == "+33601020304"

    @clean_database
    @patch("wtforms.csrf.session.SessionCSRF.validate_csrf_token")
    def test_pro_user_edition_phone_number_error(self, mocked_validate_csrf_token, app):
        # Given
        admin_user = users_factories.AdminFactory()
        pro_user = users_factories.ProFactory()

        data = dict(
            csrf_token="token",
            firstName=pro_user.firstName,
            lastName=pro_user.lastName,
            dateOfBirth="",
            departementCode="06",
            postalCode="06000",
            comment="",
            email=pro_user.email,
            phoneNumber="+++123",
        )

        # When
        client = TestClient(app.test_client()).with_session_auth(admin_user.email)
        response = client.post(f"/pc/back-office/pro_users/edit?id={pro_user.id}", form=data)

        # Then
        assert response.status_code == 200

        assert "Numéro de téléphone invalide" in response.data.decode("utf8")

        updated_user = User.query.filter_by(email=pro_user.email).first()
        assert updated_user.departementCode == pro_user.departementCode
        assert updated_user.postalCode == pro_user.postalCode
        assert updated_user.phoneNumber == pro_user.phoneNumber

    def test_it_gives_a_random_password_to_user(self, app, db_session):
        # Given
        offerers_factories.VirtualVenueTypeFactory()
        pro_user_view = ProUserView(User, db_session)
        pro_user_view_create_form = pro_user_view.get_create_form()
        data = dict(
            firstName="Juste",
            lastName="Leblanc",
            offererSiren="123654987",
            offererName="Les films du plat pays",
            offererPostalCode="93000",
            offererCity="Nantes",
        )
        form = pro_user_view_create_form(data=data)
        user = User()

        # When
        pro_user_view.on_model_change(form, user, True)
        first_password = user.password

        pro_user_view.on_model_change(form, user, True)

        # Then
        assert user.password != first_password

    def test_should_create_the_public_name(self, app, db_session):
        # Given
        user = User()
        user.firstName = "Ken"
        user.lastName = "Thompson"
        user.publicName = None
        view = ProUserView(model=User, session=db_session)

        # When
        view.on_model_change(Form(), model=user, is_created=False)

        # Then
        assert user.publicName == "Ken Thompson"

    def test_order_by_works(self, app, db_session):
        view = ProUserView(model=User, session=db_session)
        view.get_list(page=1, sort_column="email", sort_desc="", search="", filters="")

    @clean_database
    # FIXME (dbaty, 2020-12-16): I could not find a quick way to
    # generate a valid CSRF token in tests. This should be fixed.
    @patch("wtforms.csrf.session.SessionCSRF.validate_csrf_token")
    def test_suspend_pro(self, mocked_validate_csrf_token, app):
        admin = users_factories.AdminFactory(email="admin15@example.com")
        pro = users_factories.ProFactory(email="user15@example.com")

        client = TestClient(app.test_client()).with_session_auth(admin.email)
        url = f"/pc/back-office/pro_users/suspend?user_id={pro.id}"
        data = {
            "reason": "fraud suspicion",
            "csrf_token": "token",
        }
        response = client.post(url, form=data)

        assert response.status_code == 302
        assert not pro.isActive

    @clean_database
    # FIXME (dbaty, 2020-12-16): I could not find a quick way to
    # generate a valid CSRF token in tests. This should be fixed.
    @patch("wtforms.csrf.session.SessionCSRF.validate_csrf_token")
    def test_unsuspend_pro(self, mocked_validate_csrf_token, app):
        admin = users_factories.AdminFactory(email="admin15@example.com")
        pro = users_factories.ProFactory(email="user15@example.com", isActive=False)

        client = TestClient(app.test_client()).with_session_auth(admin.email)
        url = f"/pc/back-office/pro_users/unsuspend?user_id={pro.id}"
        data = {
            "reason": "fraud",
            "csrf_token": "token",
        }
        response = client.post(url, form=data)

        assert response.status_code == 302
        assert pro.isActive