import Link from "next/link";
import { siteConfig } from "@/lib/config";

/**
 * Site Header
 * ===========
 * Minimal header with logo/name and navigation.
 * Used on all public pages.
 */
export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="container-content flex h-16 items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-primary-dark">
            {siteConfig.name}
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="bg-gold-accent px-4 py-2 text-sm font-medium text-white hover:bg-[#B8954F] transition-colors duration-200"
          >
            Join as Creator
          </Link>
        </nav>
      </div>
    </header>
  );
}
