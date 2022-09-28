"""Add api_key secret and prefix

Revision ID: ab0e07746494
Revises: 6f68a45d6d9a
Create Date: 2021-06-21 15:11:51.190059

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "ab0e07746494"
down_revision = "6f68a45d6d9a"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic ###
    op.add_column("api_key", sa.Column("dateCreated", sa.DateTime(), server_default=sa.text("now()"), nullable=False))
    op.add_column("api_key", sa.Column("prefix", sa.Text(), nullable=True, unique=True))
    op.add_column("api_key", sa.Column("secret", sa.LargeBinary(), nullable=True))
    op.alter_column("api_key", "value", nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic ###
    op.drop_column("api_key", "prefix")
    op.drop_column("api_key", "secret")
    op.drop_column("api_key", "dateCreated")
    # ### end Alembic commands ###