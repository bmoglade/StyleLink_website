"use client";

import { platformColors, platformLogos } from "@/lib/config";
import { truncate } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import type { Product } from "@/lib/types";

interface ProductItemProps {
  product: Product;
}

/**
 * Product Item Component
 * ======================
 * Single product card within an outfit grid.
 * Layout (top to bottom):
 *   1. Product image (hero — full width)
 *   2. Product name
 *   3. Bottom row: Store logo square + store name (left) | Shop button (right)
 *
 * Store logo: Square image from /public/images/platforms/<platform>.png
 * Fallback: colored square with first letter when logo image not available.
 * Links through /go/[productId] for click tracking.
 */
export function ProductItem({ product }: ProductItemProps) {
  const colors = platformColors[product.platform] || platformColors.Other;
  const logoSrc = platformLogos[product.platform] || null;

  return (
    <div
      className="flex flex-col border overflow-hidden transition-colors duration-200 hover:border-[var(--color-product-card-hover)]"
      style={{
        backgroundColor: "var(--color-product-card-bg)",
        borderColor: "var(--color-product-card-border)",
      }}
    >
      {/* Product Image — TOP (hero of the card) */}
      <div className="relative aspect-square w-full overflow-hidden bg-background">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Product Name */}
      <div className="px-2 pt-2">
        <p className="text-xs font-medium text-text-primary leading-tight line-clamp-2">
          {truncate(product.name, siteConfig.maxProductNameLength)}
        </p>
      </div>

      {/* Bottom Row: Store Logo + Name (left) | Shop Button (right) */}
      <div className="flex items-center justify-between gap-1.5 px-2 py-2 mt-auto">
        {/* Store logo + name */}
        <div className="flex items-center gap-1.5 min-w-0">
          {/* Square store logo — image or fallback */}
          <PlatformLogo platform={product.platform} logoSrc={logoSrc} colors={colors} />
          {/* Platform name in brand color */}
          <span
            className="text-[10px] font-medium truncate"
            style={{ color: colors.bg }}
          >
            {product.platform}
          </span>
        </div>

        {/* Shop Button */}
        <a
          href={`/go/${product.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-0.5 px-2 py-1 text-[10px] font-semibold transition-colors duration-200"
          style={{
            backgroundColor: "var(--color-shop-btn-bg)",
            color: "var(--color-shop-btn-text)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-shop-btn-hover-bg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-shop-btn-bg)";
          }}
        >
          Shop
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/**
 * Platform Logo — Square
 * Shows platform logo image if available, otherwise colored square with first letter.
 * To add logos: place images in public/images/platforms/<platform-lowercase>.png
 */
function PlatformLogo({
  platform,
  logoSrc,
  colors,
}: {
  platform: string;
  logoSrc: string | null;
  colors: { bg: string; text: string };
}) {
  if (logoSrc) {
    return (
      <div className="h-5 w-5 flex-shrink-0 overflow-hidden rounded-sm border border-border">
        <img
          src={logoSrc}
          alt={`${platform} logo`}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  // Fallback: colored square with first letter
  return (
    <div
      className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm text-[8px] font-bold"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {platform.charAt(0)}
    </div>
  );
}
