"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CopyLinkInput } from "@/components/ui/CopyLinkInput";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

interface DashboardOutfitListProps {
  outfits: any[];
  creatorUsername: string;
}

/**
 * Dashboard Outfit List with Category Filter
 * ===========================================
 * Client component that wraps the outfit list with category filter pills.
 * Helps creators quickly find and manage outfits when the count grows large.
 */
export function DashboardOutfitList({ outfits, creatorUsername }: DashboardOutfitListProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredOutfits =
    activeCategory === "All"
      ? outfits
      : outfits.filter(
          (outfit) => outfit.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="border border-border bg-surface">
      {/* Header with filter */}
      <div className="border-b border-border px-4 py-3 space-y-3">
        <h2 className="text-sm font-semibold text-primary-dark">
          Your Outfits
        </h2>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {siteConfig.categories.map((category: string) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-3 py-1 text-[11px] font-medium uppercase tracking-wider transition-colors duration-200",
                activeCategory === category
                  ? "bg-primary-dark text-white"
                  : "border border-border text-text-secondary hover:border-primary-dark hover:text-primary-dark"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Outfit List */}
      {filteredOutfits.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm text-text-secondary">
            {activeCategory === "All"
              ? "You haven't created any outfits yet."
              : `No outfits in "${activeCategory}" category.`}
          </p>
          {activeCategory === "All" && (
            <Link href="/dashboard/outfits/new" className="mt-3 inline-block">
              <Button variant="secondary" size="sm">
                Create Your First Outfit
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {filteredOutfits.map((outfit: any) => {
            const outfitLink = `${siteConfig.url}/${creatorUsername}?look=${outfit.id}`;
            return (
              <li key={outfit.id} className="px-4 py-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-card bg-border">
                      {outfit.image_url && (
                        <img
                          src={outfit.image_url}
                          alt={outfit.title}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary-dark">
                        {outfit.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-secondary">
                          {outfit.category}
                        </span>
                        <span
                          className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium ${
                            outfit.is_published
                              ? "bg-green-50 text-green-700"
                              : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {outfit.is_published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/outfits/${outfit.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Shareable Outfit Link */}
                {outfit.is_published && (
                  <div className="pl-[52px]">
                    <CopyLinkInput text={outfitLink} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* Count indicator */}
      <div className="border-t border-border px-4 py-2 text-xs text-text-secondary">
        Showing {filteredOutfits.length} of {outfits.length} outfits
      </div>
    </div>
  );
}
