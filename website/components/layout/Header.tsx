import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { createServerSupabaseClient } from "@/lib/supabase-server";

/**
 * Site Header
 * ===========
 * Minimal header with logo/name and navigation.
 * Used on all public pages.
 * If user is logged in, shows "Dashboard" link instead of "Log in".
 */
export async function Header() {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  const isLoggedIn = !!session?.user;

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
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              ← Dashboard
            </Link>
          ) : (
            <>
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
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
