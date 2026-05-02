import { ProductItem } from "./ProductItem";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  products: Product[];
}

/**
 * Product Grid Component
 * ======================
 * Renders products in a responsive grid:
 * Desktop: 5 columns
 * Tablet: 3 columns
 * Mobile: 2 columns (products fully visible, not cropped)
 *
 * Handles 1-15 products gracefully.
 * Mobile: shows all products in scrollable grid (no max-height restriction).
 */
export function ProductGrid({ products }: ProductGridProps) {
  // Only show in-stock products on public storefront
  const visibleProducts = products.filter((p) => p.in_stock);

  if (visibleProducts.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
      {visibleProducts
        .sort((a, b) => a.display_order - b.display_order)
        .map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
    </div>
  );
}
