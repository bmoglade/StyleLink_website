import Link from "next/link";
import { siteConfig } from "@/lib/config";

/**
 * Auth Header (for login/signup pages)
 * =====================================
 * Simple header without session check (used in client components).
 * Dark luxury theme — gold brand name.
 */
export function AuthHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="container-content flex h-16 items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-gold-accent">
            {siteConfig.name}
          </span>
        </Link>

        {/* Minimal nav on auth pages */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
