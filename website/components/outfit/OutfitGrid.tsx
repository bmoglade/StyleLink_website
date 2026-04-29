import { OutfitCard } from "./OutfitCard";
import type { OutfitWithProducts } from "@/lib/types";

interface OutfitGridProps {
  outfits: OutfitWithProducts[];
}

/**
 * Outfit Grid Component
 * =====================
 * Renders a vertical list of outfit cards.
 * Each card is full-width (image left, products right).
 *
 * Handles empty state when no outfits match filter.
 */
export function OutfitGrid({ outfits }: OutfitGridProps) {
  // Filter out outfits where all products are out of stock
  const visibleOutfits = outfits.filter((outfit) =>
    outfit.products.some((p) => p.in_stock)
  );

  if (visibleOutfits.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-xl text-text-secondary">
          No outfits to show
        </p>
        <p className="mt-2 text-sm text-text-secondary">
          Check back later for new looks!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {visibleOutfits.map((outfit, index) => (
        <OutfitCard key={outfit.id} outfit={outfit} index={index} />
      ))}
    </div>
  );
}
