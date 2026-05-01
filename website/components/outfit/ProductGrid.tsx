import { ProductItem } from "./ProductItem";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
}

/**
 * Product Grid Component
 * ======================
 * Renders products in a grid matching reference layout:
 * Desktop: 5 columns × 3 rows (scrollable if more than 15)
 * Tablet: 3 columns
 * Mobile: 2 columns
 *
 * Handles 1-15 products gracefully.
 */
export function ProductGrid({ products }: ProductGridProps) {
  // Only show in-stock products on public storefront
  const visibleProducts = products.filter((p) => p.in_stock);

  if (visibleProducts.length === 0) return null;

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2"
      style={{
        maxHeight: visibleProducts.length > 15 ? "480px" : "none",
        overflowY: visibleProducts.length > 15 ? "auto" : "visible",
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
