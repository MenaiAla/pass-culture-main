import typing

from flask_wtf import FlaskForm
import wtforms
from wtforms import validators
from wtforms import fields
from flask import render_template


def search_terms_field_widget(field: wtforms.StringField, *args: typing.Any, **kwargs: typing.Any) -> str:
    return render_template("components/forms/search/terms.html", field=field)


def filter_list_input(field: fields.Field) -> list[str] | None:
    if field is None:
        return None

    if isinstance(field, list):
        return [item.strip() for item in field]

    return [item.strip() for item in field.split(",")]


class SearchForm(FlaskForm):
    class Meta:
        csrf = False

    terms = wtforms.StringField(
        "terms",
        widget=search_terms_field_widget,
        validators=[
            validators.InputRequired(message="Recherche vide, veuillez saisir un terme"),
            validators.Length(min=1, max=4096, message="Longueur de l'expression recherchée incorrecte"),
        ],
    )

    order_by = wtforms.HiddenField(
        "order_by",
        default=["id"],
        validators=[
            validators.Optional(strip_whitespace=True),
            #  validators.AnyOf(values=["id", "firstName", "lastName", "email"], message="Valeur de tri incorrecte"),
        ],
    )

    page = wtforms.HiddenField(
        "page",
        default=1,
        validators=[
            validators.Optional(),
            validators.NumberRange(min=1, max=128, message="Numéro de page incorrect"),
        ]
    )

    per_page = wtforms.HiddenField(
        "per_page",
        default=20,
        validators=[
            validators.Optional(),
            validators.NumberRange(min=1, max=64, message="Nombre de résultats par page incorrect")
        ]
    )

    @classmethod
    def filter_terms(cls, field: fields.Field) -> list[str] | None:
        return filter_list_input(field)

    @classmethod
    def filter_order_by(cls, field: fields.Field) -> list[str] | None:
        return filter_list_input(field)

    @classmethod
    def filter_page(cls, field: fields.Field) -> int:
        return int(field)

    @classmethod
    def filter_per_page(cls, field: fields.Field) -> int:
        return int(field)


class ProSearchForm(SearchForm):
    pass
