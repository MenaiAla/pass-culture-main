"""Add column isDraft on offer table
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "3693d7345622"
down_revision = "363db8d498a7"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("offer", sa.Column("isDraft", sa.Boolean()))


def downgrade() -> None:
    op.drop_column("offer", "isDraft")
