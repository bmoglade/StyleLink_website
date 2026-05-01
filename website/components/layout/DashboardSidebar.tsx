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
 * Highlights active route.
 * Includes: storefront link (always visible), logout button.
 * Storefront link fetches username on mount.
 */
export function DashboardSidebar() {
  const pathname = usePathname();
  const [username, setUsername] = useState<string | null>(null);

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

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-surface">
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/" className="font-display text-lg font-bold text-primary-dark">
          {siteConfig.name}
        </Link>
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
                      ? "bg-background text-primary-dark"
                      : "text-text-secondary hover:bg-background hover:text-text-primary"
                  )}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}

          {/* Storefront link — always visible in nav */}
          {username && (
            <li>
              <a
                href={`/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-background hover:text-text-primary transition-colors duration-200"
              >
                <span>🌐</span>
                My Storefront
              </a>
            </li>
          )}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-border px-4 py-4 space-y-2">
        {username && (
          <div className="px-3 py-1.5 text-[10px] text-text-secondary bg-background border border-border truncate">
            {siteConfig.url}/{username}
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <span>🚪</span>
          Log Out
        </button>
      </div>
    </aside>
  );
}
