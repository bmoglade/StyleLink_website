import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { DashboardStats, Outfit } from "@/lib/types";

/**
 * Dashboard Overview Page
 * =======================
 * Route: /dashboard
 * Shows: stats cards, outfit list with edit/delete.
 */

async function getDashboardData() {
  const supabase = createServerSupabaseClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Get creator profile
  const { data: creator } = await supabase
    .from("creators")
    .select("*")
    .eq("auth_id", user.id)
    .single();

  if (!creator) redirect("/signup?step=username");

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
          <h1 className="font-display text-2xl font-bold text-primary-dark">
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

      {/* Outfit List */}
      <div className="border border-border bg-surface">
        <div className="border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold text-primary-dark">
            Your Outfits
          </h2>
        </div>

        {outfits.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-text-secondary">
              You haven&apos;t created any outfits yet.
            </p>
            <Link href="/dashboard/outfits/new" className="mt-3 inline-block">
              <Button variant="secondary" size="sm">
                Create Your First Outfit
              </Button>
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {outfits.map((outfit: any) => (
              <li
                key={outfit.id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-card bg-border">
                    {outfit.image_url && (
                      <img
                        src={outfit.image_url}
                        alt={outfit.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary-dark">
                      {outfit.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-secondary">
                        {outfit.category}
                      </span>
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium ${
                          outfit.is_published
                            ? "bg-green-50 text-green-700"
                            : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {outfit.is_published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/dashboard/outfits/${outfit.id}/edit`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick Link to Storefront */}
      <div className="mt-6 text-center">
        <Link
          href={`/${creator.username}`}
          className="text-sm text-text-secondary hover:text-gold-accent transition-colors"
        >
          View your public storefront →
        </Link>
      </div>
    </div>
  );
}

function StatsCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-border bg-surface p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
        {label}
      </p>
      <p className="mt-1 font-display text-3xl font-bold text-primary-dark">
        {value}
      </p>
    </div>
  );
}
