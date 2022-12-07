"""Add NOT NULL constraint on venue.venueTypeCode (step 3 of 4)"""
from alembic import op


# pre/post deployment: post
# revision identifiers, used by Alembic.
revision = "bb40e9f3d8ea"
down_revision = "27275b5c0eef"
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column("venue", "venueTypeCode", nullable=False)


def downgrade():
    op.alter_column("venue", "venueTypeCode", nullable=True)
