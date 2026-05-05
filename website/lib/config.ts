/**
 * Site Configuration
 * ==================
 * Change values here to rebrand the entire platform.
 * This is the SINGLE SOURCE OF TRUTH for all branding.
 *
 * HOW TO REBRAND:
 * 1. Change `name` → site name everywhere (header, footer, SEO, emails)
 * 2. Change `tagline` → subtitle on homepage + SEO
 * 3. Change `description` → meta descriptions + OG tags
 *
 * HOW TO CHANGE COLORS:
 * Colors are defined as CSS custom properties in `app/globals.css` (:root section).
 * Change the hex values there → entire site theme updates instantly.
 * No need to touch any component files.
 *
 * For production deployment:
 * 1. Update `name`, `tagline`, `description` as needed
 * 2. Set NEXT_PUBLIC_APP_URL in environment variables
 * 3. Everything else adapts automatically
 */

export const siteConfig = {
  // Brand — Change these to rebrand the entire platform
  name: "Influra",
  tagline: "Monetize Your Taste",
  description:
    "A luxury creator platform designed to turn influence into income. Build your storefront, share your looks, earn from every click.",

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
  // To add a new category: just add a string to this array
  categories: [
    "All",
    "Office",
    "Casual",
    "Festive",
    "Beauty",
    "Home",
    "Other",
  ] as const,

  // Supported e-commerce platforms for product creation dropdown
  // To add a new platform: add here AND add color entry in platformColors below
  platforms: [
    "Amazon",
    "Flipkart",
    "Myntra",
    "Nykaa",
    "Ajio",
    "Meesho",
    "Tata Cliq",
    "Bewakoof",
    "H&M",
    "Zara",
    "Other",
  ] as const,
} as const;

/**
 * Platform badge styling configuration
 * Used for rendering colored badges next to products.
 *
 * NOTE: Product card colors (bg, border, hover, button) are in globals.css as CSS variables.
 * These platform badge colors are separate — they represent the e-commerce brand identity.
 * When the team decides on per-platform card theming, update globals.css variables.
 */
export const platformColors: Record<string, { bg: string; text: string }> = {
  Amazon: { bg: "#FF9900", text: "#000000" },
  Flipkart: { bg: "#2874F0", text: "#FFFFFF" },
  Myntra: { bg: "#FF3F6C", text: "#FFFFFF" },
  Nykaa: { bg: "#FC2779", text: "#FFFFFF" },
  Ajio: { bg: "#1A1A1A", text: "#FFFFFF" },
  Meesho: { bg: "#9B2EFA", text: "#FFFFFF" },
  "Tata Cliq": { bg: "#E42574", text: "#FFFFFF" },
  Bewakoof: { bg: "#FDD835", text: "#000000" },
  "H&M": { bg: "#E50010", text: "#FFFFFF" },
  Zara: { bg: "#000000", text: "#FFFFFF" },
  Other: { bg: "#666666", text: "#FFFFFF" },
};

/**
 * Platform Logo Configuration
 * ============================
 * Maps platform names to their logo image paths.
 * Place logo images in: public/images/platforms/
 * Recommended: 64x64px PNG with transparent background.
 *
 * HOW TO ADD LOGOS:
 * 1. Save logo image to: website/public/images/platforms/<platform-lowercase>.png
 * 2. Add/update the entry below.
 * 3. The ProductItem and homepage mockup will automatically display the logo.
 *
 * When logo is null → falls back to colored square with first letter.
 */
/**
 * Platform Logo Configuration
 * ============================
 * Maps platform names to their logo image paths.
 * Place logo images in: public/images/platforms/
 * Recommended: 64×64px or 120×40px PNG with transparent background.
 *
 * HOW TO ADD A NEW STORE:
 * 1. Add the platform name to siteConfig.platforms above
 * 2. Add color entry to platformColors above
 * 3. Add logo path below (or null for text fallback)
 * 4. Save logo image to: website/public/images/platforms/<name>.png
 * 5. Everything auto-updates: product dropdown, badges, scrolling strip
 *
 * The scrolling brand strip on the homepage reads from this list.
 * If a logo image file is missing, the strip shows the platform name in text.
 */
export const platformLogos: Record<string, string | null> = {
  Amazon: "/images/platforms/amazon.png",
  Flipkart: "/images/platforms/flipkart.png",
  Myntra: "/images/platforms/myntra.png",
  Nykaa: "/images/platforms/nykaa.png",
  Ajio: "/images/platforms/ajio.png",
  Meesho: "/images/platforms/meesho.png",
  "Tata Cliq": "/images/platforms/tatacliq.png",
  Bewakoof: "/images/platforms/bewakoof.png",
  "H&M": "/images/platforms/hm.png",
  Zara: "/images/platforms/zara.png",
  Other: null,
};

export type Category = (typeof siteConfig.categories)[number];
export type Platform = (typeof siteConfig.platforms)[number];
