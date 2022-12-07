"""Add NOT NULL constraint on venue.venueTypeCode (step 1 of 4)"""
from alembic import op


# pre/post deployment: post
# revision identifiers, used by Alembic.
revision = "389f4e1a99f8"
down_revision = "ad44235c316b"
branch_labels = None
depends_on = None


CONSTRAINT = "venue_venuetypecode_not_null_constraint"


def upgrade():
    op.execute(
        f"""
        ALTER TABLE "venue" DROP CONSTRAINT IF EXISTS "{CONSTRAINT}";
        ALTER TABLE "venue" ADD CONSTRAINT "{CONSTRAINT}" CHECK ("venueTypeCode" IS NOT NULL) NOT VALID;
        """
    )


def downgrade():
    op.drop_constraint(CONSTRAINT, table_name="venue")
