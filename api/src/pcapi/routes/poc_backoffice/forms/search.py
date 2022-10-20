import typing

from flask import render_template
from flask_wtf import FlaskForm
import wtforms
from wtforms import validators

from pcapi.routes.poc_backoffice.serialization.search import TypeOptions


def search_terms_field_widget(field: wtforms.StringField, *args: typing.Any, **kwargs: typing.Any) -> str:
    return render_template("components/forms/search/terms.html", field=field)


def search_type_field_widget(field: wtforms.SelectField, *args: typing.Any, **kwargs: typing.Any) -> str:
    return render_template("components/forms/search/type.html", field=field, selected=field.data)


class SearchForm(FlaskForm):
    class Meta:
        csrf = False

    terms = wtforms.StringField(
        "terms",
        widget=search_terms_field_widget,
        validators=[
            validators.InputRequired(message="Recherche vide, veuillez saisir un terme"),
        ],
    )

    order_by = wtforms.HiddenField("order_by", validators=[validators.Optional(strip_whitespace=True)])

    page = wtforms.HiddenField("page", validators=[validators.Optional()])

    per_page = wtforms.HiddenField("per_page", validators=[validators.Optional()])

    def add_error_to(self, field_name: str) -> None:
        msg = self.error_msg_builder(field_name)

        field = getattr(self, field_name)
        field.errors.append(msg)

    def error_msg_builder(self, field_name: str) -> str:
        match field_name:
            case "terms":
                return "Recherche invalide"
            case "order_by":
                return "Valeur de tri invalide"
            case "page":
                return "Numéro de page invalide"
            case "per_page":
                return "Nombre de résultats par page invalide"
            case _:
                return "Champ inconnu"


class ProSearchForm(SearchForm):
    type = wtforms.SelectField(
        "type",
        widget=search_type_field_widget,
        choices=[opt.value for opt in TypeOptions],
        validators=[
            validators.InputRequired(message="Type de ressource invalide"),
        ],
    )
