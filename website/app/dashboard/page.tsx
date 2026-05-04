import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { Button } from "@/components/ui/Button";
import { DashboardOutfitList } from "@/components/dashboard/DashboardOutfitList";
import type { DashboardStats, Outfit } from "@/lib/types";

/**
 * Dashboard Overview Page
 * =======================
 * Route: /dashboard
 * Shows: stats cards, outfit list with edit/delete + shareable link for each outfit.
 */

async function getDashboardData() {
  const supabase = createServerSupabaseClient();

  // Get current user session (uses cookie, no network call to Supabase)
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) redirect("/login");
  const user = session.user;

  // Get creator profile
  const { data: creator, error: creatorError } = await supabase
    .from("creators")
    .select("*")
    .eq("auth_id", user.id)
    .single();

  if (!creator || creatorError) redirect("/signup");

  // Get outfits
  const { data: outfits } = await supabase
    .from("outfits")
    .select("*, products(id, in_stock)")
    .eq("creator_id", creator.id)
    .order("created_at", { ascending: false });

  // Get click count this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const { count: clicksThisWeek } = await supabase
    .from("clicks")
    .select("*", { count: "exact", head: true })
    .eq("creator_id", creator.id)
    .gte("clicked_at", oneWeekAgo.toISOString());

  // Calculate stats
  const allOutfits = outfits || [];
  const totalProducts = allOutfits.reduce(
    (sum: number, o: any) => sum + (o.products?.length || 0),
    0
  );

  const stats: DashboardStats = {
    total_outfits: allOutfits.length,
    total_products: totalProducts,
    clicks_this_week: clicksThisWeek || 0,
  };

  return { creator, outfits: allOutfits, stats };
}

export default async function DashboardPage() {
  const { creator, outfits, stats } = await getDashboardData();

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary">
            Welcome, {creator.display_name}
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Manage your outfits and track performance
          </p>
        </div>
        <Link href="/dashboard/outfits/new">
          <Button variant="primary">+ New Outfit</Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard label="Total Outfits" value={stats.total_outfits} />
        <StatsCard label="Total Products" value={stats.total_products} />
        <StatsCard label="Clicks This Week" value={stats.clicks_this_week} />
      </div>

      {/* Outfit List with Category Filter */}
      <DashboardOutfitList outfits={outfits} creatorUsername={creator.username} />
    </div>
  );
}

function StatsCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-border bg-surface p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
        {label}
      </p>
      <p className="mt-1 font-display text-3xl font-bold text-text-primary">
        {value}
      </p>
    </div>
  );
}


