import Link from "next/link";
import { siteConfig } from "@/lib/config";

/**
 * Site Footer
 * ===========
 * Minimal dark footer matching luxury theme.
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-content py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Brand */}
          <div>
            <span className="font-display text-lg font-bold text-gold-accent">
              {siteConfig.name}
            </span>
            <p className="mt-1 text-xs text-text-secondary">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <Link
              href="/privacy"
              className="hover:text-text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/disclosure"
              className="hover:text-text-primary transition-colors"
            >
              Disclosure
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-text-secondary">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
