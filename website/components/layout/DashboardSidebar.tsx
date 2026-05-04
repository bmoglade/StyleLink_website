"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "📊" },
  { href: "/dashboard/outfits/new", label: "New Outfit", icon: "➕" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

/**
 * Dashboard Sidebar Navigation
 * ============================
 * Left sidebar for creator dashboard.
 * Mobile: hidden by default, toggled via hamburger button.
 * Desktop: always visible (w-64).
 * Includes: storefront link, logout button (prominent).
 */
export function DashboardSidebar() {
  const pathname = usePathname();
  const [username, setUsername] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    async function fetchUsername() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: creator } = await supabase
        .from("creators")
        .select("username")
        .eq("auth_id", user.id)
        .single();
      if (creator) setUsername(creator.username);
    }
    fetchUsername();
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile Header Bar — visible only on mobile */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-border bg-surface px-4 md:hidden">
        <Link href="/" className="font-display text-lg font-bold text-gold-accent">
          {siteConfig.name}
        </Link>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex h-10 w-10 items-center justify-center text-text-primary"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-64 flex-col border-r border-border bg-surface transition-transform duration-300 md:relative md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <Link href="/" className="font-display text-lg font-bold text-gold-accent">
            {siteConfig.name}
          </Link>
          {/* Close button on mobile */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center text-text-secondary md:hidden"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "bg-background text-text-primary"
                        : "text-text-secondary hover:bg-background hover:text-text-primary"
                    )}
                  >
                    <span>{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* Storefront link — same tab (internal page, user has "← Dashboard" to come back) */}
            {username && (
              <li>
                <Link
                  href={`/${username}`}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-background hover:text-text-primary transition-colors duration-200"
                >
                  <span>🌐</span>
                  My Storefront
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Bottom actions — Logout prominent */}
        <div className="border-t border-border px-4 py-4 space-y-3">
          {username && (
            <div className="px-3 py-1.5 text-[10px] text-text-secondary bg-background border border-border truncate">
              {siteConfig.url}/{username}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
          >
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
