import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { siteConfig } from "@/lib/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CreatorProfileHeader } from "@/components/creator/CreatorProfileHeader";
import { StorefrontContent } from "./StorefrontContent";
import type { CreatorProfile, OutfitWithProducts } from "@/lib/types";

interface PageProps {
  params: { username: string };
}

/**
 * Public Creator Storefront Page
 * ==============================
 * Route: /[username]
 * SSR for SEO — fetches creator data server-side.
 * This is the MOST IMPORTANT page of the platform.
 */

// Dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createServerSupabaseClient();
  const { data: creator } = await supabase
    .from("creators")
    .select("display_name, bio, username")
    .eq("username", params.username)
    .single();

  if (!creator) {
    return { title: "Creator Not Found" };
  }

  return {
    title: `${creator.display_name}'s Outfits`,
    description:
      creator.bio ||
      `Shop ${creator.display_name}'s curated outfit collections on ${siteConfig.name}`,
    openGraph: {
      title: `${creator.display_name}'s Outfits | ${siteConfig.name}`,
      description:
        creator.bio ||
        `Shop ${creator.display_name}'s curated outfit collections`,
      url: `${siteConfig.url}/${creator.username}`,
      type: "profile",
    },
  };
}

async function getCreatorData(username: string) {
  const supabase = createServerSupabaseClient();

  // Fetch creator profile
  const { data: creator, error: creatorError } = await supabase
    .from("creators")
    .select("*")
    .eq("username", username)
    .single();

  if (creatorError || !creator) return null;

  // Fetch published outfits with their in-stock products
  const { data: outfits, error: outfitsError } = await supabase
    .from("outfits")
    .select(
      `
      *,
      products (*)
    `
    )
    .eq("creator_id", creator.id)
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (outfitsError) return null;

  // Calculate stats (only count in-stock products)
  const outfitsWithProducts = (outfits || []) as OutfitWithProducts[];
  const totalProducts = outfitsWithProducts.reduce(
    (sum, outfit) => sum + outfit.products.filter((p) => p.in_stock).length,
    0
  );

  // Only count outfits that have at least one in-stock product
  const visibleOutfits = outfitsWithProducts.filter((outfit) =>
    outfit.products.some((p) => p.in_stock)
  );

  const creatorProfile: CreatorProfile = {
    ...creator,
    outfit_count: visibleOutfits.length,
    product_count: totalProducts,
  };

  return { creator: creatorProfile, outfits: outfitsWithProducts };
}

export default async function CreatorStorefrontPage({ params }: PageProps) {
  const data = await getCreatorData(params.username);

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container-content">
          {/* Creator Profile Header */}
          <CreatorProfileHeader creator={data.creator} />

          {/* Outfit Grid with Category Filter */}
          <StorefrontContent outfits={data.outfits} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
