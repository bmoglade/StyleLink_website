import { createServerSupabaseClient } from "@/lib/supabase-server";
import type { OutfitWithProducts, LandingImage } from "@/lib/types";

/**
 * Server-side Data Queries
 * =========================
 * All database reads used in Server Components.
 * These run on the server only — never exposed to client.
 */

/** Hardcoded admin emails — always have admin access regardless of DB flag */
const ADMIN_EMAILS = ["admin@influra.com"];

/**
 * Check if the current user is an admin.
 * Uses both hardcoded email list AND is_admin flag in DB.
 * Returns false if not logged in.
 */
export async function isCurrentUserAdmin(): Promise<boolean> {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) return false;

  // Check hardcoded email list first (instant, no DB query)
  if (ADMIN_EMAILS.includes(session.user.email || "")) return true;

  // Check DB flag
  const { data: creator } = await supabase
    .from("creators")
    .select("is_admin")
    .eq("auth_id", session.user.id)
    .single();

  return creator?.is_admin === true;
}

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

/**
 * Get all landing page images, organized by section.
 * Used by the homepage to fill image placeholders.
 * Returns a map: { "hero-1": LandingImage, "creator-profile": LandingImage, ... }
 */
export async function getLandingImages(): Promise<
  Record<string, LandingImage>
> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("landing_images")
    .select("*")
    .order("display_order", { ascending: true });

  if (error || !data) return {};

  // Convert array to map keyed by slot name for easy lookup
  const imageMap: Record<string, LandingImage> = {};
  for (const img of data) {
    imageMap[img.slot] = img;
  }
  return imageMap;
}

/**
 * Get landing images for a specific section.
 * Used by admin page to show images per section.
 */
export async function getLandingImagesBySection(
  section: string
): Promise<LandingImage[]> {
  const supabase = createServerSupabaseClient();

  const { data, error } = await supabase
    .from("landing_images")
    .select("*")
    .eq("section", section)
    .order("display_order", { ascending: true });

  if (error || !data) return [];
  return data;
}
