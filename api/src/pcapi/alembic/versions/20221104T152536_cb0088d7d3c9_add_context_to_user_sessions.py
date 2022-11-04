"""add context to user sessions
"""
from alembic import op
import sqlalchemy as sa


# pre/post deployment: pre
# revision identifiers, used by Alembic.
revision = "cb0088d7d3c9"
down_revision = "92484e2002ee"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("user_session", sa.Column("context", sa.String(), nullable=True))


def downgrade():
    op.drop_column("user_session", "context")
