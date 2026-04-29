"use client";

import { cn } from "@/lib/utils";

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  size?: "sm" | "md";
}

/**
 * Toggle Switch Component
 * =======================
 * Used for: Publish/Draft, In Stock/Out of Stock toggles.
 */
export function Toggle({ enabled, onChange, label, size = "md" }: ToggleProps) {
  const sizes = {
    sm: { track: "h-5 w-9", thumb: "h-3.5 w-3.5", translate: "translate-x-4" },
    md: { track: "h-6 w-11", thumb: "h-4.5 w-4.5", translate: "translate-x-5" },
  };

  const s = sizes[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onChange(!enabled)}
      className={cn(
        "relative inline-flex flex-shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200",
        s.track,
        enabled ? "bg-gold-accent" : "bg-border"
      )}
    >
      <span
        className={cn(
          "inline-block transform rounded-full bg-white shadow-sm transition-transform duration-200",
          s.thumb,
          enabled ? s.translate : "translate-x-0.5"
        )}
      />
      {label && (
        <span className="ml-3 text-sm text-text-primary whitespace-nowrap">
          {label}
        </span>
      )}
    </button>
  );
}
