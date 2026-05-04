"use client";

/**
 * CopyLinkInput Component
 * =======================
 * A read-only input with a "Copy" button.
 * Client component (uses navigator.clipboard).
 */

interface CopyLinkInputProps {
  text: string;
}

export function CopyLinkInput({ text }: CopyLinkInputProps) {
  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={text}
        readOnly
        className="flex-1 bg-background border border-border px-2 py-1 text-[11px] text-text-secondary truncate"
      />
      <button
        type="button"
        onClick={handleCopy}
        className="flex-shrink-0 border border-border bg-surface px-2 py-1 text-[10px] font-medium text-text-secondary hover:text-text-primary hover:border-gold-accent transition-colors"
        title="Copy link"
      >
        📋 Copy
      </button>
    </div>
  );
}
