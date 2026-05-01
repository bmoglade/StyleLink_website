import { PlatformBadge } from "@/components/ui/Badge";
import { truncate } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import type { Product } from "@/lib/types";

interface ProductItemProps {
  product: Product;
}

/**
 * Product Item Component
 * ======================
 * Single product card within an outfit grid.
 * Shows: product image (if available), platform badge, name, and "Shop This Item" button.
 * Links through /go/[productId] for click tracking.
 *
 * Layout matches reference: image on top, platform badge, name, shop button at bottom.
 */
export function ProductItem({ product }: ProductItemProps) {
  return (
    <div
      className="flex flex-col border overflow-hidden transition-colors duration-200 hover:border-[var(--color-product-card-hover)]"
      style={{
        backgroundColor: "var(--color-product-card-bg)",
        borderColor: "var(--color-product-card-border)",
      }}
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-background">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-2">
        {/* Platform Badge */}
        <div className="mb-1.5">
          <PlatformBadge platform={product.platform} />
        </div>

        {/* Product Name */}
        <p className="text-xs font-medium text-text-primary leading-tight line-clamp-2 flex-1">
          {truncate(product.name, siteConfig.maxProductNameLength)}
        </p>

        {/* Shop This Item Button */}
        <a
          href={`/go/${product.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center justify-center gap-1 px-2 py-1.5 text-[11px] font-semibold transition-colors duration-200"
          style={{
            backgroundColor: "var(--color-shop-btn-bg)",
            color: "var(--color-shop-btn-text)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-shop-btn-hover-bg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-shop-btn-bg)";
          }}
        >
          Shop This Item
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>
    </div>
  );
}
