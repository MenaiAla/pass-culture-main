"""add_stock_priceCategoryId_foreign_key
"""
from alembic import op

from pcapi import settings


# pre/post deployment: post
# revision identifiers, used by Alembic.
revision = "930a602ac1af"
down_revision = "38f003447a1f"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("""SET SESSION statement_timeout = '900s'""")
    op.execute(
        """
        ALTER TABLE stock ADD CONSTRAINT "stock_priceCategoryId_fkey" FOREIGN KEY ("priceCategoryId") REFERENCES "price_category" ("id") NOT VALID
        """
    )

    op.execute(
        """
        ALTER TABLE price_category DROP CONSTRAINT IF EXISTS "price_category_offerId_fkey";
        ALTER TABLE price_category ADD CONSTRAINT "price_category_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "offer" ("id") ON DELETE CASCADE NOT VALID;
        """
    )
    op.execute(f"""SET SESSION statement_timeout={settings.DATABASE_STATEMENT_TIMEOUT}""")


def downgrade() -> None:
    op.execute(
        """
        ALTER TABLE offer DROP CONSTRAINT IF EXISTS "price_category_offerId_fkey";
        """
    )
    op.execute(
        """
        ALTER TABLE stock DROP CONSTRAINT "stock_priceCategoryId_fkey"
        """
    )
