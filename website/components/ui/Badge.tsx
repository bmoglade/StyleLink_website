import { platformColors } from "@/lib/config";

interface BadgeProps {
  platform: string;
}

/**
 * Platform Badge Component
 * ========================
 * Renders a colored badge for each e-commerce platform.
 * Colors are defined in lib/config.ts — single source of truth.
 */
export function PlatformBadge({ platform }: BadgeProps) {
  const colors = platformColors[platform] || platformColors.Other;

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
      }}
    >
      {platform}
    </span>
  );
}

interface CategoryBadgeProps {
  category: string;
}

/**
 * Category Badge Component
 * ========================
 * Subtle tag for outfit categories (Office, Casual, etc.)
 */
export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className="inline-flex items-center border border-border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-text-secondary">
      {category}
    </span>
  );
}
