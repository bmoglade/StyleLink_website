import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig, platformColors, platformLogos } from "@/lib/config";

/**
 * Homepage — Influra
 * ==================
 * Route: /
 * Luxury dark theme landing page.
 * Layout: Hero (headline left + outfit card right) + How it works + Earnings
 * Mobile: stacked vertically.
 *
 * Outfit card on homepage is a DUMMY mockup — not connected to real data.
 * It uses the same visual style as the real product list view.
 */

/** Dummy products for the homepage mockup card */
const MOCK_PRODUCTS = [
  { platform: "Amazon",   name: "Ribbed Tank Top",          price: "₹1,890" },
  { platform: "Flipkart", name: "Tailored Wide Leg Pants",  price: "₹3,790" },
  { platform: "Myntra",   name: "Clean Leather Sneakers",   price: "₹2,499" },
  { platform: "Ajio",     name: "Minimal Shoulder Bag",     price: "₹2,999" },
  { platform: "Nykaa",    name: "Gold Hoop Earrings Set",   price: "₹699"   },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section — Full width dark */}
        <section className="py-16 sm:py-20 lg:py-28">
          <div className="container-content">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
              {/* Left — Headline + CTA */}
              <div className="flex-1 text-center lg:text-left">
                <h1 className="font-display text-4xl font-bold text-text-primary sm:text-5xl lg:text-6xl leading-tight">
                  Monetize
                  <br />
                  Your Taste.
                </h1>
                <p className="mt-6 text-lg text-text-secondary">
                  Build → Share → Earn
                </p>
                <div className="mt-8">
                  <Link
              href="/signup"
                    className="inline-block border-2 border-gold-accent px-8 py-3 text-sm font-semibold uppercase tracking-wider text-gold-accent hover:bg-gold-accent hover:text-background transition-colors duration-200"
            >
                    Start for Free
                  </Link>
                </div>
              </div>

              {/* Right — Outfit Card Mockup (list view, like WearThis) */}
              <div className="flex-1 flex flex-col items-center lg:items-end">
                <div className="w-full max-w-md border border-border bg-surface overflow-hidden">
                  {/* Top: Outfit image + card header side by side */}
                  <div className="flex">
                    {/* Outfit image placeholder (left) */}
                    <div className="w-40 sm:w-48 flex-shrink-0 bg-background border-r border-border">
                      <div className="aspect-[3/4] w-full flex items-center justify-center text-text-secondary/30">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
      >
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
      </div>
      </div>

                    {/* Right side: Title + product list */}
                    <div className="flex-1 min-w-0 p-4">
                      {/* Card Header */}
                      <h3 className="font-display text-lg font-semibold text-text-primary">
                        City Minimal Essentials
                      </h3>
                      <p className="mt-1 text-xs text-text-secondary">
                        Clean. Classic. Effortless pieces for everyday confidence.
                      </p>

                      {/* Mock Product List */}
                      <div className="mt-4 space-y-3">
                        {MOCK_PRODUCTS.map((product) => (
                          <MockProduct key={product.name} {...product} />
                        ))}
    </div>

                      {/* Total */}
                      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                        <span className="text-sm font-medium text-gold-accent">Total</span>
                        <span className="font-display text-lg font-bold text-text-primary">₹11,877</span>
    </div>
                    </div>
                  </div>
                </div>

                {/* Emotional closer below card */}
                <p className="mt-6 max-w-sm text-center text-sm italic text-text-secondary lg:text-right">
                  &ldquo;Your followers want to dress like you. Let them.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — How it Works + Earnings */}
        <section className="border-t border-border bg-surface py-16">
          <div className="container-content">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {/* How it Works */}
              <div>
                <h2 className="font-display text-2xl font-bold text-text-primary">
                  How it works
                </h2>
                <div className="mt-6 space-y-5">
                  <StepItem number="01" text="Create your storefront" />
                  <StepItem number="02" text="Add your outfits and affiliate links" />
                  <StepItem number="03" text="Share once. Earn always." />
                </div>
              </div>

              {/* Earnings Potential */}
              <div>
                <h2 className="font-display text-2xl font-bold text-text-primary">
                  Earnings potential
                </h2>
                <div className="mt-6">
                  <p className="font-display text-4xl font-bold text-gold-accent sm:text-5xl">
                    ₹45,000<span className="text-xl text-text-secondary">/month</span>
                  </p>
                  <p className="mt-3 text-sm text-text-secondary">
                    Earned by active creators in affiliate commissions
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    {/* Placeholder avatars */}
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full border-2 border-surface bg-border"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-text-secondary">
                      10K+ creators earning with {siteConfig.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

/**
 * Mock Product Row — used in the hero outfit card mockup (DUMMY, not real data)
 *
 * Layout: [Square Store Logo] Product Name ........... ₹Price
 * Logo: loads from /images/platforms/<platform>.png
 * Fallback: colored square with first letter if image not found
 */
function MockProduct({
  platform,
  name,
  price,
}: {
  platform: string;
  name: string;
  price: string;
}) {
  const colors = platformColors[platform] || platformColors.Other;
  const logoSrc = platformLogos[platform] || null;

  return (
    <div className="flex items-center gap-3">
      {/* Platform square logo */}
      <MockPlatformLogo platform={platform} logoSrc={logoSrc} colors={colors} />
      {/* Product info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">{name}</p>
        <p className="text-[11px] font-medium" style={{ color: colors.bg }}>
          {platform}
        </p>
      </div>
      {/* Price */}
      <span className="flex-shrink-0 text-sm text-text-secondary">{price}</span>
    </div>
  );
}

/**
 * Mock Platform Logo — Square
 * Shows logo image if file exists at the configured path, otherwise colored square with letter.
 * Used only in the homepage mockup card.
 *
 * TO ADD REAL LOGOS:
 * 1. Save logo file to: website/public/images/platforms/<platform-lowercase>.png
 *    e.g. amazon.png, flipkart.png, myntra.png, nykaa.png, ajio.png, meesho.png
 * 2. Recommended size: 64x64px PNG with transparent background
 * 3. Logos are configured in lib/config.ts → platformLogos
 * 4. Both homepage mockup and real product cards will auto-display them
 */
function MockPlatformLogo({
  platform,
  logoSrc,
  colors,
}: {
  platform: string;
  logoSrc: string | null;
  colors: { bg: string; text: string };
}) {
  // For the homepage mockup: show blank square placeholder (logos to be added later)
  // When logo images are added to public/images/platforms/, they'll display automatically
  return (
    <div
      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm overflow-hidden border border-border"
      style={{ backgroundColor: colors.bg }}
    >
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={`${platform} logo`}
          className="h-full w-full object-contain p-0.5 bg-white"
        />
      ) : (
        <span className="text-[10px] font-bold" style={{ color: colors.text }}>
          {platform.charAt(0)}
        </span>
      )}
    </div>
  );
}

/**
 * Step Item — numbered steps in "How it works"
 */
function StepItem({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-display text-2xl font-bold text-gold-accent">{number}</span>
      <span className="text-sm text-text-primary">{text}</span>
    </div>
  );
}

