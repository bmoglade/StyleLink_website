/**
 * Landing Page Mockup Data — FALLBACK ONLY
 * ==========================================
 * This data is used ONLY if no admin-featured outfit is set.
 *
 * PRIMARY FLOW (preferred):
 *   Admin creates an outfit in dashboard → marks it as "featured" →
 *   Homepage automatically displays that outfit with its products.
 *
 * FALLBACK FLOW:
 *   If no featured outfit exists, this static data is shown instead.
 *
 * IMAGE FILES (fallback only):
 *   website/public/images/landing/
 *     ├── outfit.jpg            ← Main outfit photo (left side of card)
 *     ├── product-1.png         ← Product thumbnail for row 1
 *     ├── product-2.png         ← Product thumbnail for row 2
 *     ├── product-3.png         ← Product thumbnail for row 3
 *     ├── product-4.png         ← Product thumbnail for row 4
 *     └── product-5.png         ← Product thumbnail for row 5
 *
 * RECOMMENDED SIZES:
 *   - outfit.jpg:    600×800px (3:4 ratio, portrait)
 *   - product-N.jpg: 200×200px (1:1 square)
 *   - Format: JPG or PNG, keep under 200KB each for fast loading
 *
 * TO CHANGE CONTENT REGULARLY:
 *   Just swap images in the folder and update this file.
 *   Great for seasonal looks, trending outfits, featured creators, etc.
 */

export const landingMockup = {
  /** Outfit card title */
  title: "City Minimal Essentials",

  /** Outfit card description */
  description: "Clean. Classic. Effortless pieces for everyday confidence.",

  /** Main outfit image (left panel of the card) — 600×800px portrait */
  outfitImage: "/images/landing/outfit.jpg",

  /** Emotional tagline below the card */
  tagline: "Your followers want to dress like you. Let them.",

  /** Product list — each row in the outfit card */
  products: [
    {
      name: "Ribbed Tank Top",
      platform: "Amazon",
      image: "/images/landing/product-1.png",
    },
    {
      name: "Tailored Wide Leg Pants",
      platform: "Flipkart",
      image: "/images/landing/product-2.png",
    },
    {
      name: "Clean Leather Sneakers",
      platform: "Myntra",
      image: "/images/landing/product-3.png",
    },
    {
      name: "Minimal Shoulder Bag",
      platform: "Ajio",
      image: "/images/landing/product-4.png",
    },
    {
      name: "Gold Hoop Earrings Set",
      platform: "Nykaa",
      image: "/images/landing/product-5.png",
    },
  ],
} as const;

export type LandingProduct = (typeof landingMockup.products)[number];
