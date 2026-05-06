import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { LogoutButton } from "./LogoutButton";

/**
 * Site Header — v1.0 Redesign
 * ============================
 * Layout: Left nav | Center logo (with halo) | Right auth buttons
 *
 * Navigation states:
 * - NOT logged in: "Join as creator" (gold outline) + "Log in" (text)
 * - Logged in: "← Dashboard" + "Log Out"
 *
 * Left nav links scroll to sections on homepage or navigate to anchors.
 * Logo is always centered with the signature halo icon above.
 */
export async function Header() {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  const isLoggedIn = !!session?.user;

  return (
    <header className="border-b border-border-light bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container-content flex h-16 items-center justify-between">
        
        {/* Left — Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#about"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            About us
          </Link>
          <Link
            href="/#shoppers"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Shop
          </Link>
          <Link
            href="/#creators"
            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            Creators
          </Link>
        </nav>

        {/* Center — Logo with Halo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          {/* Halo icon */}
          <svg
            width="24"
            height="12"
            viewBox="0 0 24 12"
            fill="none"
            className="mb-0.5 opacity-80"
          >
            <ellipse cx="12" cy="6" rx="10" ry="5" stroke="#C9A96E" strokeWidth="1.5" fill="none" />
          </svg>
          <span className="font-display text-xl font-bold tracking-wide text-text-primary">
            {siteConfig.name.toUpperCase()}
          </span>
        </Link>

        {/* Right — Auth Buttons */}
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
                href="/signup"
                className="border border-gold-accent px-4 py-2 text-sm font-medium text-gold-accent hover:bg-gold-accent hover:text-background transition-colors duration-200 rounded-sm"
              >
                Join as creator
              </Link>
              <Link
                href="/login"
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Log in
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
