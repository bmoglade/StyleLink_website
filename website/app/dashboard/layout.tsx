import { DashboardSidebar } from "@/components/layout/DashboardSidebar";

/**
 * Dashboard Layout
 * ================
 * Wraps all /dashboard/* pages with sidebar navigation.
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

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="p-6 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
