"use client";

import { useState } from "react";
import { CategoryFilter } from "@/components/creator/CategoryFilter";
import { OutfitGrid } from "@/components/outfit/OutfitGrid";
import type { OutfitWithProducts } from "@/lib/types";

interface StorefrontContentProps {
  outfits: OutfitWithProducts[];
  creatorUsername: string;
}

/**
 * Storefront Content (Client Component)
 * ======================================
 * Handles category filtering client-side.
 * Wraps the filter bar and outfit grid.
 *
 * Layout includes ad space gutters on desktop (left/right sides).
 * Mobile: full width, ads between outfits.
 * Passes creatorUsername to OutfitGrid so each card can show a shareable link.
 */
export function StorefrontContent({ outfits, creatorUsername }: StorefrontContentProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredOutfits =
    activeCategory === "All"
      ? outfits
      : outfits.filter(
          (outfit) => outfit.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <section className="pb-12">
      {/* Filter Bar */}
      <CategoryFilter
        activeCategory={activeCategory}
        onFilterChange={setActiveCategory}
      />

      {/* Desktop: 3-column layout with ad gutters on sides */}
      <div className="flex gap-4">
        {/* Left Ad Space — Desktop only */}
        <aside
          className="hidden lg:flex w-[160px] flex-shrink-0 flex-col items-center"
          data-ad-slot="desktop-left-sidebar"
          aria-label="Advertisement space"
        >
          <div className="sticky top-24 w-full border border-dashed border-border bg-background p-3 text-center">
            <span className="text-xs text-text-secondary">Ad Space</span>
          </div>
        </aside>

        {/* Main Outfit Content */}
        <div className="flex-1 min-w-0">
          <OutfitGrid outfits={filteredOutfits} creatorUsername={creatorUsername} />
        </div>

        {/* Right Ad Space — Desktop only */}
        <aside
          className="hidden lg:flex w-[160px] flex-shrink-0 flex-col items-center"
          data-ad-slot="desktop-right-sidebar"
          aria-label="Advertisement space"
        >
          <div className="sticky top-24 w-full border border-dashed border-border bg-background p-3 text-center">
            <span className="text-xs text-text-secondary">Ad Space</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
