import { PlatformBadge } from "@/components/ui/Badge";
import { formatPrice, truncate } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import type { Product } from "@/lib/types";

interface ProductItemProps {
  product: Product;
}

/**
 * Product Item Component
 * ======================
 * Single product within an outfit card.
 * Shows: platform badge, name, price, and click-through arrow.
 * Links through /go/[productId] for click tracking.
 */
export function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="flex items-center gap-2 rounded-card border border-border bg-background p-2 transition-colors duration-200 hover:border-gold-accent">
      {/* Platform Badge */}
      <PlatformBadge platform={product.platform} />

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-text-primary truncate">
          {truncate(product.name, siteConfig.maxProductNameLength)}
        </p>
        <p className="text-xs font-semibold text-gold-accent">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* Click-through Arrow */}
      <a
        href={`/go/${product.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center border border-border text-text-secondary hover:border-gold-accent hover:text-gold-accent transition-colors duration-200"
        aria-label={`Buy ${product.name} on ${product.platform}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </a>
    </div>
  );
}
