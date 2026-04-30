"use client";

import { useState } from "react";
import { CategoryFilter } from "@/components/creator/CategoryFilter";
import { OutfitGrid } from "@/components/outfit/OutfitGrid";
import type { OutfitWithProducts } from "@/lib/types";

interface StorefrontContentProps {
  outfits: OutfitWithProducts[];
}

/**
 * Storefront Content (Client Component)
 * ======================================
 * Handles category filtering client-side.
 * Wraps the filter bar and outfit grid.
 */
export function StorefrontContent({ outfits }: StorefrontContentProps) {
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

      {/* Outfit Grid */}
      <OutfitGrid outfits={filteredOutfits} />
    </section>
  );
}
