/**
 * Landing Page Mockup Data
 * =========================
 * SINGLE SOURCE OF TRUTH for all images & content on the homepage outfit card.
 *
 * This is NOT connected to the database. It's a static mockup for display only.
 * To refresh the landing page content, just:
 *   1. Replace images in: public/images/landing/
 *   2. Update the data below (names, prices, platforms)
 *   3. The homepage auto-reflects changes — no other files to touch.
 *
 * IMAGE FILES GO HERE:
 *   website/public/images/landing/
 *     ├── outfit.jpg            ← Main outfit photo (left side of card)
 *     ├── product-1.jpg         ← Product thumbnail for row 1
 *     ├── product-2.jpg         ← Product thumbnail for row 2
 *     ├── product-3.jpg         ← Product thumbnail for row 3
 *     ├── product-4.jpg         ← Product thumbnail for row 4
 *     └── product-5.jpg         ← Product thumbnail for row 5
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

  /**
   * Main outfit image (left panel of the card)
   * Replace with: /images/landing/outfit.jpg (600×800px portrait)
   * Currently using SVG placeholder
   */
  outfitImage: "/images/landing/outfit.svg",

  /** Emotional tagline below the card */
  tagline: "Your followers want to dress like you. Let them.",

  /** Product list — each row in the outfit card */
  products: [
    {
      name: "Ribbed Tank Top",
      platform: "Amazon",
      price: "₹1,890",
      image: "/images/landing/product-1.svg",
    },
    {
      name: "Tailored Wide Leg Pants",
      platform: "Flipkart",
      price: "₹3,790",
      image: "/images/landing/product-2.svg",
    },
    {
      name: "Clean Leather Sneakers",
      platform: "Myntra",
      price: "₹2,499",
      image: "/images/landing/product-3.svg",
    },
    {
      name: "Minimal Shoulder Bag",
      platform: "Ajio",
      price: "₹2,999",
      image: "/images/landing/product-4.svg",
    },
    {
      name: "Gold Hoop Earrings Set",
      platform: "Nykaa",
      price: "₹699",
      image: "/images/landing/product-5.svg",
    },
  ],

  /** Total price displayed at bottom of card */
  total: "₹11,877",
} as const;

export type LandingProduct = (typeof landingMockup.products)[number];
