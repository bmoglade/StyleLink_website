/**
 * Site Configuration
 * ==================
 * Change values here to rebrand the entire platform.
 * This is the SINGLE SOURCE OF TRUTH for all branding.
 *
 * For production deployment:
 * 1. Update `name`, `tagline`, `description` as needed
 * 2. Set NEXT_PUBLIC_APP_URL in environment variables
 * 3. Everything else adapts automatically
 */

export const siteConfig = {
  // Brand
  name: "StyleLink",
  tagline: "Shop Creator Looks",
  description:
    "Discover complete outfits from your favorite fashion creators. Every look, every item, one click away.",

  // URL — reads from environment variable (configurable per deployment)
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  // Social / SEO defaults
  ogImage: "/og-image.png",

  // Creator constraints
  maxProductsPerOutfit: 15,
  maxBioLength: 120,
  maxOutfitTitleLength: 60,
  maxProductNameLength: 40,
  usernameMinLength: 3,
  usernameMaxLength: 20,
  maxImageSizeMB: 5,
  targetImageSizeKB: 500,

  // Categories available for outfits
  categories: [
    "All",
    "Office",
    "Casual",
    "Festive",
    "Beauty",
    "Home",
    "Other",
  ] as const,

  // Supported e-commerce platforms
  platforms: [
    "Amazon",
    "Flipkart",
    "Myntra",
    "Nykaa",
    "Ajio",
    "Meesho",
    "Other",
  ] as const,
} as const;

/**
 * Platform badge styling configuration
 * Used for rendering colored badges next to products
 */
export const platformColors: Record<
  string,
  { bg: string; text: string }
> = {
  Amazon: { bg: "#FF9900", text: "#000000" },
  Flipkart: { bg: "#2874F0", text: "#FFFFFF" },
  Myntra: { bg: "#FF3F6C", text: "#FFFFFF" },
  Nykaa: { bg: "#FC2779", text: "#FFFFFF" },
  Ajio: { bg: "#1A1A1A", text: "#FFFFFF" },
  Meesho: { bg: "#9B2EFA", text: "#FFFFFF" },
  Other: { bg: "#666666", text: "#FFFFFF" },
};

export type Category = (typeof siteConfig.categories)[number];
export type Platform = (typeof siteConfig.platforms)[number];
