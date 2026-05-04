import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { OutfitWithProducts } from "@/lib/types";

/**
 * Server-side Data Queries
 * =========================
 * All database reads used in Server Components.
 * These run on the server only — never exposed to client.
 */

/**
 * Get the featured outfit for the landing page.
 * Returns the single outfit marked as is_featured=true, with all its products.
 * Returns null if no outfit is featured (fallback to static mockup data).
 */
export async function getFeaturedOutfit(): Promise<OutfitWithProducts | null> {
  const supabase = createServerSupabaseClient();

  const { data: outfit, error } = await supabase
    .from("outfits")
    .select("*")
    .eq("is_featured", true)
    .eq("is_published", true)
    .single();

  if (error || !outfit) return null;

  // Fetch products for this outfit
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("outfit_id", outfit.id)
    .order("display_order", { ascending: true });

  return {
    ...outfit,
    products: products || [],
  };
}
