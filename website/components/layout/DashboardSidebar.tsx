"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
 */
export function DashboardSidebar() {
  const pathname = usePathname();

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
        </ul>
      </nav>

      {/* View Storefront Link */}
      <div className="border-t border-border px-4 py-4">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 text-xs text-text-secondary hover:text-gold-accent transition-colors"
        >
          <span>👤</span>
          View your storefront →
        </Link>
      </div>
    </aside>
  );
}
