import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

/**
 * Dashboard Layout
 * ================
 * Wraps all /dashboard/* pages with sidebar navigation.
 * Mobile: sidebar is hidden, hamburger menu toggles it.
 * Desktop: sidebar always visible on left.
 * Protected by middleware (redirects to /login if not authenticated).
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content — top padding on mobile for fixed header */}
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="p-4 pt-[72px] sm:p-6 sm:pt-[72px] md:p-8 md:pt-8">{children}</div>
      </main>
    </div>
  );
}
