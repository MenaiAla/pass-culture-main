"""Add NOT NULL constraint on venue.venueTypeCode (step 4 of 4)"""
from alembic import op


# pre/post deployment: post
# revision identifiers, used by Alembic.
revision = "7b21e6a1c115"
down_revision = "bb40e9f3d8ea"
branch_labels = None
depends_on = None


CONSTRAINT = "venue_venuetypecode_not_null_constraint"


def upgrade():
    op.drop_constraint(CONSTRAINT, table_name="venue")


def downgrade():
    op.execute(f"""ALTER TABLE "venue" ADD CONSTRAINT "{CONSTRAINT}" CHECK ("venueTypeCode" IS NOT NULL) NOT VALID""")
