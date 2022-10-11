"""add on delete cascade to role/permissions
"""
from alembic import op


# pre/post deployment: pre
# revision identifiers, used by Alembic.
revision = "e3caccc345ea"
down_revision = "3a90f34b5b14"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.drop_constraint("role_permission_roleId_fkey", "role_permission", type_="foreignkey")
    op.drop_constraint("role_permission_permissionId_fkey", "role_permission", type_="foreignkey")
    op.create_foreign_key(
        "role_permission_permissionId_fkey",
        "role_permission",
        "permission",
        ["permissionId"],
        ["id"],
        ondelete="CASCADE",
    )
    op.create_foreign_key(
        "role_permission_roleId_fkey", "role_permission", "role", ["roleId"], ["id"], ondelete="CASCADE"
    )


def downgrade() -> None:
    op.drop_constraint("role_permission_roleId_fkey", "role_permission", type_="foreignkey")
    op.drop_constraint("role_permission_permissionId_fkey", "role_permission", type_="foreignkey")
    op.create_foreign_key(
        "role_permission_permissionId_fkey", "role_permission", "permission", ["permissionId"], ["id"]
    )
    op.create_foreign_key("role_permission_roleId_fkey", "role_permission", "role", ["roleId"], ["id"])
