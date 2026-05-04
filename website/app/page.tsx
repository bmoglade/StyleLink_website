import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig, platformColors, platformLogos } from "@/lib/config";
import { landingMockup } from "@/lib/landing-mockup";

/**
 * Homepage — Influra
 * ==================
 * Route: /
 * Luxury dark theme landing page (Server Component — no event handlers).
 * Layout: Hero (headline left + outfit card right) + How it works + Earnings
 * Mobile: stacked vertically.
 *
 * Outfit card is a STATIC MOCKUP — all data comes from lib/landing-mockup.ts
 * All images come from public/images/landing/ folder.
 *
 * TO REFRESH LANDING PAGE CONTENT:
 * 1. Replace images in: public/images/landing/ (outfit.jpg, product-1.jpg, etc.)
 * 2. Update text/prices in: lib/landing-mockup.ts
 * 3. Deploy — homepage auto-updates. No other files to touch.
 */

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
                  {/* Two-panel: Outfit image (left) + product list (right) */}
                  <div className="flex">
                    {/* Outfit image (left panel) — from public/images/landing/ */}
                    <div className="w-40 sm:w-48 flex-shrink-0 bg-background border-r border-border overflow-hidden">
                      <div className="aspect-[3/4] w-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={landingMockup.outfitImage}
                          alt={landingMockup.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Right side: Title + product list */}
                    <div className="flex-1 min-w-0 p-4">
                      {/* Card Header */}
                      <h3 className="font-display text-lg font-semibold text-text-primary">
                        {landingMockup.title}
                      </h3>
                      <p className="mt-1 text-xs text-text-secondary">
                        {landingMockup.description}
                      </p>

                      {/* Product List — from landing-mockup.ts */}
                      <div className="mt-4 space-y-3">
                        {landingMockup.products.map((product, index) => (
                          <MockProduct key={index} {...product} />
                        ))}
    </div>

                      {/* Total */}
                      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                        <span className="text-sm font-medium text-gold-accent">Total</span>
                        <span className="font-display text-lg font-bold text-text-primary">
                          {landingMockup.total}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emotional closer below card */}
                <p className="mt-6 max-w-sm text-center text-sm italic text-text-secondary lg:text-right">
                  &ldquo;{landingMockup.tagline}&rdquo;
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
 * Mock Product Row — used in the hero outfit card mockup
 *
 * Layout: [Product Thumbnail] Product Name + Platform ... ₹Price
 *
 * Images come from: public/images/landing/product-N.svg (or .jpg when replaced)
 * All data from: lib/landing-mockup.ts
 *
 * NOTE: This is a Server Component — no onError/onClick handlers allowed.
 * Images must exist at the configured paths. Use SVG placeholders during development.
 */
function MockProduct({
  platform,
  name,
  price,
  image,
}: {
  platform: string;
  name: string;
  price: string;
  image: string;
}) {
  const colors = platformColors[platform] || platformColors.Other;

  return (
    <div className="flex items-center gap-2.5">
      {/* Product thumbnail — from public/images/landing/product-N */}
      <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-sm border border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

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
