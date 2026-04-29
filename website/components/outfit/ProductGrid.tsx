import { ProductItem } from "./ProductItem";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
}

/**
 * Product Grid Component
 * ======================
 * Renders products in a responsive grid within an outfit card.
 * Handles 1-15 products gracefully.
 *
 * Layout:
 * - 1-4 products: 2 columns
 * - 5-9 products: 3 columns (desktop), 2 columns (tablet)
 * - 10-15 products: 3 columns with scroll if needed
 */
export function ProductGrid({ products }: ProductGridProps) {
  // Only show in-stock products on public storefront
  const visibleProducts = products.filter((p) => p.in_stock);

  if (visibleProducts.length === 0) return null;

  // Determine grid columns based on product count
  const gridCols =
    visibleProducts.length <= 4
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div
      className={`grid gap-2 ${gridCols}`}
      style={{
        maxHeight: visibleProducts.length > 9 ? "320px" : "none",
        overflowY: visibleProducts.length > 9 ? "auto" : "visible",
      }}
    >
      {visibleProducts
        .sort((a, b) => a.display_order - b.display_order)
        .map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
    </div>
  );
}
