/**
 * Shared TypeScript types for StyleLink
 * ======================================
 * These types mirror the database schema exactly.
 * Used across both server and client components.
 */

export interface Creator {
  id: string;
  auth_id: string;
  username: string;
  display_name: string;
  bio: string | null;
  profile_image_url: string | null;
  instagram_handle: string | null;
  youtube_handle: string | null;
  facebook_handle: string | null;
  pinterest_handle: string | null;
  is_admin: boolean;
  created_at: string;
}

export interface Outfit {
  id: string;
  creator_id: string;
  title: string;
  category: string;
  image_url: string;
  is_published: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  outfit_id: string;
  name: string;
  platform: string;
  affiliate_url: string;
  price: string;
  image_url: string | null;
  display_order: number;
  in_stock: boolean;
  created_at: string;
}

export interface Click {
  id: string;
  product_id: string;
  outfit_id: string;
  creator_id: string;
  clicked_at: string;
  user_agent: string | null;
  referrer: string | null;
}

/**
 * Composite types for page rendering
 */

// Outfit with its products (used on storefront)
export interface OutfitWithProducts extends Outfit {
  products: Product[];
}

// Creator with their outfit count and product count (used on storefront header)
export interface CreatorProfile extends Creator {
  outfit_count: number;
  product_count: number;
}

// Dashboard stats
export interface DashboardStats {
  total_outfits: number;
  total_products: number;
  clicks_this_week: number;
}

/**
 * Form types (used in create/edit forms)
 */

export interface ProductFormData {
  id?: string; // present when editing
  name: string;
  platform: string;
  affiliate_url: string;
  price: string;
  image_file?: File | null;
  image_url?: string; // present when editing (existing image)
  in_stock: boolean;
}

export interface OutfitFormData {
  title: string;
  category: string;
  image: File | null;
  image_url?: string; // present when editing (existing image)
  is_published: boolean;
  products: ProductFormData[];
}

export interface ProfileFormData {
  display_name: string;
  username: string;
  bio: string;
  profile_image: File | null;
  profile_image_url?: string; // existing image
  instagram_handle: string;
  youtube_handle: string;
  facebook_handle: string;
  pinterest_handle: string;
}

/**
 * Landing page image management
 */

export interface LandingImage {
  id: string;
  section: string;       // "hero", "creators", "shoppers", "cta"
  slot: string;          // "hero-1", "creator-profile", etc.
  image_url: string;
  alt_text: string;
  display_order: number;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

/** All slots organized by section for the admin page */
export interface LandingImageSlotConfig {
  section: string;
  slot: string;
  label: string;
  description: string;
  aspectRatio: string;  // e.g., "3/4", "1/1"
}
