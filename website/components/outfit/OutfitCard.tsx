import { ProductGrid } from "./ProductGrid";
import { CategoryBadge } from "@/components/ui/Badge";
import { getStaggerDelay } from "@/lib/utils";
import type { OutfitWithProducts } from "@/lib/types";

interface OutfitCardProps {
  outfit: OutfitWithProducts;
  index: number;
}

/**
 * Outfit Card Component
 * =====================
 * Main card displaying an outfit with image (left) and products (right).
 * Desktop: side-by-side layout (image left, product grid right)
 * Mobile: stacked layout (image top, products below)
 *
 * Reference layout: Left panel = outfit photo, Right panel = 5-column product grid.
 * "Shop This Look" removed — each product has its own "Shop This Item" button.
 * Price removed for this phase.
 *
 * Only shows if at least 1 product is in stock.
 * Uses <img> instead of next/image to avoid domain config issues with Supabase storage.
 */
export function OutfitCard({ outfit, index }: OutfitCardProps) {
  const inStockProducts = outfit.products.filter((p) => p.in_stock);

  // Don't render if all products are out of stock
  if (inStockProducts.length === 0) return null;

  return (
    <article
      className="stagger-fade-in card-hover border border-border bg-surface overflow-hidden"
      style={{ animationDelay: getStaggerDelay(index) }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Outfit Image — Left Panel */}
        <div className="relative h-72 w-full overflow-hidden md:h-auto md:w-80 flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={outfit.image_url}
            alt={outfit.title}
            className="h-full w-full object-cover image-hover-zoom"
          />
          {/* Category badge overlaid on image */}
          <div className="absolute bottom-3 left-3">
                <CategoryBadge category={outfit.category} />
              </div>
            </div>

        {/* Products — Right Panel */}
        <div className="flex flex-1 flex-col p-4">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-primary-dark">
              {outfit.title}
            </h3>
            <span className="text-xs text-text-secondary">
              {inStockProducts.length} item{inStockProducts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Products Grid — 5 columns on desktop like reference */}
          <div className="flex-1">
            <ProductGrid products={outfit.products} />
          </div>
        </div>
      </div>
    </article>
  );
}

