"""update backoffice user profile
"""
from alembic import op
import sqlalchemy as sa


# pre/post deployment: pre
# revision identifiers, used by Alembic.
revision = "70d369ab5c57"
down_revision = "e3caccc345ea"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        "backoffice_user_profile",
        sa.Column(
            "role",
            sa.String(),
            nullable=False,
        ),
    )
    op.drop_constraint("backoffice_user_profile_roleId_fkey", "backoffice_user_profile", type_="foreignkey")
    op.drop_column("backoffice_user_profile", "roleId")


def downgrade():
    op.add_column("backoffice_user_profile", sa.Column("roleId", sa.BIGINT(), autoincrement=False, nullable=True))
    op.create_foreign_key(
        "backoffice_user_profile_roleId_fkey", "backoffice_user_profile", "role", ["roleId"], ["id"], ondelete="CASCADE"
    )
    op.drop_column("backoffice_user_profile", "role")
