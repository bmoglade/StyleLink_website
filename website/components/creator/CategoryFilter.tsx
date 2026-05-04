"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

interface CategoryFilterProps {
  onFilterChange: (category: string) => void;
  activeCategory: string;
}

/**
 * Category Filter Bar
 * ===================
 * Horizontal filter pills above the outfit grid.
 * "All" shows everything, other categories filter outfits.
 */
export function CategoryFilter({
  onFilterChange,
  activeCategory,
}: CategoryFilterProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {siteConfig.categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={cn(
            "px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors duration-200",
            activeCategory === category
              ? "bg-gold-accent text-background"
              : "border border-border text-text-secondary hover:border-primary-dark hover:text-primary-dark"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
