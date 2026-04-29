import Image from "next/image";
import { ProductGrid } from "./ProductGrid";
import { CategoryBadge } from "@/components/ui/Badge";
import { calculateTotalPrice, getStaggerDelay } from "@/lib/utils";
import type { OutfitWithProducts } from "@/lib/types";

interface OutfitCardProps {
  outfit: OutfitWithProducts;
  index: number;
}

/**
 * Outfit Card Component
 * =====================
 * Main card displaying an outfit with image (left) and products (right).
 * Desktop: side-by-side layout
 * Mobile: stacked layout
 *
 * Only shows if at least 1 product is in stock.
 */
export function OutfitCard({ outfit, index }: OutfitCardProps) {
  const inStockProducts = outfit.products.filter((p) => p.in_stock);

  // Don't render if all products are out of stock
  if (inStockProducts.length === 0) return null;

  const totalPrice = calculateTotalPrice(
    inStockProducts.map((p) => p.price)
  );

  return (
    <article
      className="stagger-fade-in card-hover border border-border bg-surface overflow-hidden"
      style={{ animationDelay: getStaggerDelay(index) }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Outfit Image — Left Panel */}
        <div className="relative h-64 w-full overflow-hidden md:h-auto md:w-72 flex-shrink-0">
          <Image
            src={outfit.image_url}
            alt={outfit.title}
            fill
            sizes="(max-width: 768px) 100vw, 288px"
            className="object-cover image-hover-zoom"
          />
        </div>

        {/* Products — Right Panel */}
        <div className="flex flex-1 flex-col p-4">
          {/* Header */}
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold text-primary-dark">
                {outfit.title}
              </h3>
              <div className="mt-1">
                <CategoryBadge category={outfit.category} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-secondary">Total</p>
              <p className="font-display text-lg font-bold text-primary-dark">
                {totalPrice}
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <ProductGrid products={outfit.products} />
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <span className="text-xs text-text-secondary">
              {inStockProducts.length} item{inStockProducts.length !== 1 ? "s" : ""}
            </span>
            <a
              href={`/go/${inStockProducts[0]?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-dark px-4 py-2 text-xs font-medium text-white hover:bg-[#333333] transition-colors duration-200"
            >
              Shop This Look →
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
