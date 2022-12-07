"""Add NOT NULL constraint on venue.venueTypeCode (step 2 of 4)"""
from alembic import op

from pcapi import settings


# pre/post deployment: post
# revision identifiers, used by Alembic.
revision = "27275b5c0eef"
down_revision = "389f4e1a99f8"
branch_labels = None
depends_on = None


CONSTRAINT = "venue_venuetypecode_not_null_constraint"


def upgrade():
    op.execute("COMMIT")
    op.execute("SET SESSION statement_timeout = '900s'")
    op.execute(f'ALTER TABLE "venue" VALIDATE CONSTRAINT "{CONSTRAINT}"')
    op.execute(f"SET SESSION statement_timeout={settings.DATABASE_STATEMENT_TIMEOUT}")


def downgrade():
    pass
