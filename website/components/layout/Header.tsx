import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { LogoutButton } from "./LogoutButton";

/**
 * Site Header
 * ===========
 * Dark luxury theme header.
 * Navigation states:
 * - NOT logged in: "Log in" (text) + "Join as Creator" (gold outline button)
 * - Logged in: "← Dashboard" + "Log Out" (red text)
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
          <span className="font-display text-xl font-bold text-gold-accent">
            {siteConfig.name}
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-3 sm:gap-4">
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                ← Dashboard
              </Link>
              <LogoutButton />
            </>
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
                className="border border-gold-accent px-4 py-2 text-sm font-medium text-gold-accent hover:bg-gold-accent hover:text-background transition-colors duration-200"
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
