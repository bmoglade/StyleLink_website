import { ProductGrid } from "./ProductGrid";
import { CategoryBadge } from "@/components/ui/Badge";
import { getStaggerDelay } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import type { OutfitWithProducts } from "@/lib/types";

interface OutfitCardProps {
  outfit: OutfitWithProducts;
  index: number;
  creatorUsername?: string;
}

/**
 * Outfit Card Component
 * =====================
 * Main card displaying an outfit with image (left) and products (right).
 * Desktop: side-by-side layout (image left, product grid right)
 * Mobile: stacked layout (image top, products below)
 *
 * Reference layout: Left panel = outfit photo, Right panel = 5-column product grid.
 * Shows shareable link for each outfit (for creators to use in reels/ads).
 *
 * Only shows if at least 1 product is in stock.
 * Uses <img> instead of next/image to avoid domain config issues with Supabase storage.
 */
export function OutfitCard({ outfit, index, creatorUsername }: OutfitCardProps) {
  const inStockProducts = outfit.products.filter((p) => p.in_stock);

  // Don't render if all products are out of stock
  if (inStockProducts.length === 0) return null;

  const outfitLink = creatorUsername
    ? `${siteConfig.url}/${creatorUsername}?look=${outfit.id}`
    : null;

  return (
    <article
      id={`look-${outfit.id}`}
      className="stagger-fade-in card-hover border border-border bg-surface overflow-hidden"
      style={{ animationDelay: getStaggerDelay(index) }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Outfit Image — Left Panel */}
        <div className="relative h-80 w-full overflow-hidden sm:h-96 md:h-auto md:w-80 flex-shrink-0">
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
            <h3 className="font-display text-lg font-semibold text-text-primary">
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

          {/* Shareable outfit link */}
          {outfitLink && (
            <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
              <input
                type="text"
                value={outfitLink}
                readOnly
                className="flex-1 bg-background border border-border px-2 py-1 text-[10px] text-text-secondary truncate"
              />
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(outfitLink)}
                className="flex-shrink-0 border border-border bg-surface px-2 py-1 text-[10px] font-medium text-text-secondary hover:text-gold-accent hover:border-gold-accent transition-colors"
                title="Copy outfit link"
              >
                📋 Copy
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
