import Link from "next/link";
import { siteConfig } from "@/lib/config";

/**
 * Auth Header (for login/signup pages)
 * =====================================
 * Simple header without session check (used in client components).
 * Does NOT show "Join as Creator" since user is already on auth page.
 */
export function AuthHeader() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="container-content flex h-16 items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold text-primary-dark">
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
