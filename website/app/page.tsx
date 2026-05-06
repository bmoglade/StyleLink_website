import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig, platformColors, platformLogos } from "@/lib/config";
import { getLandingImages } from "@/lib/queries";
import type { LandingImage } from "@/lib/types";

/**
 * Homepage — Influra v1.0
 * ========================
 * Full-page dark luxury landing page with 6 stacked sections:
 *
 * 1. HERO — "Monetize Your Taste" + fashion photo collage (admin-managed images)
 * 2. FOR CREATORS — "Turn Your Style Into Income" + dashboard mockup
 * 3. FOR SHOPPERS — "Shop Complete Looks" + phone/outfit mockup
 * 4. HOW IT WORKS — 3-step process + stats bar
 * 5. PRICING — 3 tiers (visual only, no payment)
 * 6. FOOTER CTA — "Ready to Monetize?" + email → /signup
 * 7. Footer — 4-column layout
 *
 * Images are loaded from the `landing_images` table.
 * Admin uploads images via /dashboard/landing-images.
 * If no image exists for a slot, a placeholder icon is shown.
 */

export default async function HomePage() {
  // Fetch all admin-uploaded landing page images
  const images = await getLandingImages();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">

        {/* ═══════════════════════════════════════════════════════════
            SECTION 1: HERO
            "Monetize Your Taste" + photo collage grid (right)
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="container-content">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">

              {/* Left — Headline + CTA */}
              <div className="lg:w-[35%] text-center lg:text-left lg:pt-8">
                <p className="text-[11px] uppercase tracking-[0.25em] text-gold-accent font-medium mb-5">
                  India&apos;s #1 Creator Platform
                </p>
                <h1 className="font-display text-5xl font-bold text-gold-accent sm:text-6xl lg:text-7xl leading-[1.05]">
                  Monetize<br />Your Taste
                </h1>
                <p className="mt-6 text-[15px] text-white/80 leading-relaxed max-w-xs mx-auto lg:mx-0">
                  Create, influence, and earn —<br />all in one place.
                </p>
                <div className="mt-8">
                  <Link
                    href="/signup"
                    className="inline-block bg-gold-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-background hover:bg-gold-accent-hover transition-colors duration-200 rounded-full"
                  >
                    Join {siteConfig.name}
                  </Link>
                </div>
              </div>

              {/* Right — Photo Collage Grid (6 tilted images, 3 columns)
                  Layout matches mockup: staggered vertically, all slightly tilted,
                  middle column offset down, no overlapping. */}
              <div className="lg:w-[65%]">
                <div className="grid grid-cols-3 gap-5 sm:gap-6">
                  {/* Column 1: two images stacked */}
                  <div className="flex flex-col gap-5">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-surface-elevated border border-white/10 transform -rotate-2 hover:rotate-0 transition-transform duration-300 shadow-lg">
                      <LandingImg slot="hero-1" images={images} />
                    </div>
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-surface-elevated border border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-300 shadow-lg">
                      <LandingImg slot="hero-4" images={images} />
                    </div>
                  </div>
                  {/* Column 2: two images stacked, offset down */}
                  <div className="flex flex-col gap-5 mt-10">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-surface-elevated border border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-300 shadow-lg">
                      <LandingImg slot="hero-2" images={images} />
                    </div>
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-surface-elevated border border-white/10 transform -rotate-2 hover:rotate-0 transition-transform duration-300 shadow-lg">
                      <LandingImg slot="hero-5" images={images} />
                    </div>
                  </div>
                  {/* Column 3: two images stacked */}
                  <div className="flex flex-col gap-5">
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-surface-elevated border border-white/10 transform rotate-3 hover:rotate-0 transition-transform duration-300 shadow-lg">
                      <LandingImg slot="hero-3" images={images} />
                    </div>
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-surface-elevated border border-white/10 transform -rotate-1 hover:rotate-0 transition-transform duration-300 shadow-lg">
                      <LandingImg slot="hero-6" images={images} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tagline — bottom center */}
            <p className="mt-16 text-center text-[15px] text-white/60 italic font-body tracking-wide">
              A luxury creator platform designed to turn influence into income.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 2: FOR CREATORS
            "Turn Your Style Into Income" + Dashboard mockup (right)
            ═══════════════════════════════════════════════════════════ */}
        <section id="creators" className="py-16 sm:py-20 lg:py-24 bg-section-alt">
          <div className="container-content">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">

              {/* Left — Copy */}
              <div className="lg:w-[45%] text-center lg:text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-gold-accent font-medium mb-4">
                  For Creators
                </p>
                <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl leading-tight">
                  Turn Your Style<br />Into Income
                </h2>
                <p className="mt-5 text-base text-text-secondary leading-relaxed max-w-md mx-auto lg:mx-0">
                  Stop hunting for affiliate links across platforms. {siteConfig.name} gives you one storefront, smart links, and real-time commission tracking — so you focus on creating.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-text-primary text-left max-w-md mx-auto lg:mx-0">
                  <li className="flex items-center gap-3">
                    <span className="text-gold-accent">✦</span>
                    Personal outfit storefront with your domain
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-gold-accent">✦</span>
                    One-click tagging from 5+ platforms
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-gold-accent">✦</span>
                    Real-time analytics dashboard
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-gold-accent">✦</span>
                    Brand collaboration opportunities
                  </li>
                </ul>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link
                    href="/signup"
                    className="inline-block bg-gold-accent px-6 py-3 text-sm font-semibold text-background hover:bg-gold-accent-hover transition-colors duration-200 rounded-full text-center"
                  >
                    Apply to Join
                  </Link>
                  <Link
                    href="/#how-it-works"
                    className="inline-block border border-border px-6 py-3 text-sm font-medium text-text-primary hover:border-gold-accent hover:text-gold-accent transition-colors duration-200 rounded-full text-center"
                  >
                    See How It Works
                  </Link>
                </div>
                <p className="mt-4 text-xs text-text-secondary">
                  Join 10,000+ creators already earning on {siteConfig.name}
                </p>
              </div>

              {/* Right — Dashboard Mockup Card */}
              <div className="lg:w-[55%] flex justify-center lg:justify-end">
                <div className="w-full max-w-lg gold-border-glow rounded-lg p-5 bg-surface">
                  {/* Dashboard header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-base font-semibold text-text-primary">Creator Dashboard</h3>
                  </div>
                  {/* Creator info row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-surface-elevated border border-border overflow-hidden">
                        <LandingImg slot="creator-profile" images={images} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">Priya Sharma</p>
                        <p className="text-xs text-text-secondary">45K followers</p>
                      </div>
                    </div>
                    <span className="text-xs bg-gold-accent/10 text-gold-accent px-2.5 py-1 rounded-sm font-medium">
                      ⭐ Top Creator This Week
                    </span>
                  </div>
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="bg-surface-elevated rounded-md p-3 text-center border border-border-light">
                      <p className="font-display text-lg font-bold text-gold-accent">₹24,500</p>
                      <p className="text-[10px] text-text-secondary mt-0.5">earned this month</p>
                    </div>
                    <div className="bg-surface-elevated rounded-md p-3 text-center border border-border-light">
                      <p className="font-display text-lg font-bold text-text-primary">342</p>
                      <p className="text-[10px] text-text-secondary mt-0.5">outfit clicks today</p>
                    </div>
                    <div className="bg-surface-elevated rounded-md p-3 text-center border border-border-light">
                      <p className="font-display text-lg font-bold text-text-primary">18%</p>
                      <p className="text-[10px] text-text-secondary mt-0.5">conversion rate</p>
                    </div>
                  </div>
                  {/* Bottom row: chart + outfit preview */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-surface-elevated rounded-md p-3 border border-border-light">
                      <p className="text-xs text-text-secondary mb-2">Earnings trend</p>
                      {/* Mini bar chart (decorative) */}
                      <div className="flex items-end gap-1.5 h-16">
                        {[35, 50, 45, 65, 55, 80, 70].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gold-accent/60 rounded-sm"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="bg-surface-elevated rounded-md p-3 border border-border-light">
                      <p className="text-xs text-text-secondary mb-2">Sample outfit</p>
                      <div className="h-16 w-full rounded-sm overflow-hidden bg-background border border-border">
                        <LandingImg slot="creator-outfit" images={images} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 3: FOR SHOPPERS
            "Shop Complete Looks. Instantly." + outfit mockup (left)
            ═══════════════════════════════════════════════════════════ */}
        <section id="shoppers" className="py-16 sm:py-20 lg:py-24">
          <div className="container-content">
            <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-center lg:gap-16">

              {/* Left — Outfit Mockup with tags + grid */}
              <div className="lg:w-[45%]">
                <div className="relative">
                  {/* Main outfit image (phone-like frame) */}
                  <div className="w-56 sm:w-64 mx-auto lg:mx-0 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-border bg-surface-elevated shadow-2xl">
                    <LandingImg slot="shopper-main" images={images} />
                  </div>
                  {/* Floating product tags */}
                  <div className="absolute top-8 right-4 sm:right-8 lg:right-auto lg:left-56 space-y-2">
                    <ProductTag name="White Crop Top" price="₹899" platform="Amazon" />
                    <ProductTag name="Wide Leg Jeans" price="₹1,499" platform="Myntra" />
                    <ProductTag name="Strappy Heels" price="₹1,299" platform="Ajio" />
                  </div>
                  {/* "Shop This Look" badge */}
                  <div className="absolute bottom-8 left-4 sm:left-8 lg:left-12 bg-surface/90 backdrop-blur-sm border border-border px-4 py-2 rounded-md">
                    <span className="text-sm font-medium text-text-primary">Shop This Look</span>
                  </div>
                </div>
                {/* Mini grid below */}
                <div className="mt-6 grid grid-cols-4 gap-2 max-w-xs mx-auto lg:mx-0">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square rounded-md overflow-hidden bg-surface-elevated border border-border">
                      <LandingImg slot={`shopper-grid-${i}`} images={images} />
                    </div>
                  ))}
                </div>
                {/* Platform logos */}
                <div className="mt-4 flex items-center gap-2 max-w-xs mx-auto lg:mx-0">
                  {Object.entries(platformLogos).filter(([n, s]) => s && n !== "Other").slice(0, 5).map(([name, src]) => (
                    <div key={name} className="h-8 w-8 rounded-md bg-surface-elevated flex items-center justify-center border border-border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src!} alt={name} className="h-5 w-5 object-contain" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Copy */}
              <div className="lg:w-[55%] text-center lg:text-left">
                <p className="text-xs uppercase tracking-[0.2em] text-gold-accent font-medium mb-4">
                  For Shoppers
                </p>
                <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl leading-tight">
                  Shop Complete<br />Looks. Instantly.
                </h2>
                <p className="mt-5 text-base text-text-secondary leading-relaxed max-w-md mx-auto lg:mx-0">
                  No more broken links. No more tab-hopping. Discover complete outfits curated by creators you love — and shop everything with one click.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-text-primary text-left max-w-md mx-auto lg:mx-0">
                  <li className="flex items-center gap-3">
                    <span className="text-gold-accent">🔗</span>
                    Verified links that never expire
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-gold-accent">💰</span>
                    Built-in price comparison across platforms
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-gold-accent">🛒</span>
                    Seamless checkout — no multiple carts
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-gold-accent">☑️</span>
                    Curated by real fashion creators
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="/signup"
                    className="inline-block border border-gold-accent px-6 py-3 text-sm font-semibold text-gold-accent hover:bg-gold-accent hover:text-background transition-colors duration-200 rounded-full"
                  >
                    Explore Looks
                  </Link>
                </div>
                <p className="mt-3 text-xs text-gold-accent font-medium">
                  50,000+ shoppable outfits
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 4: HOW IT WORKS
            3-step process cards + stats bar
            ═══════════════════════════════════════════════════════════ */}
        <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-section-alt section-gold-top">
          <div className="container-content">
            {/* Section header */}
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.2em] text-gold-accent font-medium mb-3">
                The Process
              </p>
              <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
                How {siteConfig.name} Works
              </h2>
              <div className="w-16 h-0.5 bg-gold-accent mx-auto mt-4" />
              <p className="mt-4 text-sm text-text-secondary">
                From post to purchase in three seamless steps.
              </p>
            </div>

            {/* 3-step cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <StepCard
                number="01"
                icon="storefront"
                title="Create Your Storefront"
                description="Set up your Influra profile in minutes. Upload outfit photos and build your personal fashion storefront."
              />
              <StepCard
                number="02"
                icon="link"
                title="Tag Complete Outfits"
                description="Tag every item in your look with smart affiliate links from Amazon, Flipkart, Myntra, Meesho, and Ajio."
              />
              <StepCard
                number="03"
                icon="bag"
                title="Earn Every Time"
                description="Your followers shop the complete look with one click. You earn commission on every purchase — tracked in one dashboard."
              />
            </div>

            {/* Platform logos between steps and stats */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {Object.entries(platformLogos).filter(([n, s]) => s && n !== "Other").slice(0, 5).map(([name, src]) => (
                <div key={name} className="h-9 w-9 rounded-full bg-surface-elevated flex items-center justify-center border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src!} alt={name} className="h-5 w-5 object-contain" />
                </div>
              ))}
            </div>

            {/* Stats bar */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto border-t border-border pt-10">
              <StatItem value="3x" label="Higher Conversion Rate" />
              <StatItem value="1-Click" label="Outfit Publishing" />
              <StatItem value="100%" label="Commission Tracking" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 5: PRICING
            3 tiers — visual only, no payment integration
            ═══════════════════════════════════════════════════════════ */}
        <section id="pricing" className="py-16 sm:py-20 lg:py-24">
          <div className="container-content">
            {/* Section header */}
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.2em] text-gold-accent font-medium mb-3">
                Pricing
              </p>
              <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
                Choose Your Plan
              </h2>
              <p className="mt-3 text-sm text-text-secondary">
                Start free. Scale as you grow.
              </p>
              {/* Monthly/Yearly toggle (decorative) */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="h-6 w-10 rounded-full bg-gold-accent relative">
                  <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-background" />
                </div>
                <span className="text-sm text-text-secondary">Monthly</span>
                <span className="text-sm text-text-secondary">|</span>
                <span className="text-sm text-text-secondary">Yearly (Save 20%)</span>
              </div>
            </div>

            {/* Pricing cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Starter */}
              <PricingCard
                tier="Starter"
                badge="FREE FOREVER"
                price="₹0"
                period=""
                features={[
                  "Basic storefront",
                  "Affiliate links (up to 50/month)",
                  "Standard analytics",
                  "Email support",
                ]}
                cta="Get Started"
                ctaHref="/signup"
                highlighted={false}
              />
              {/* Pro */}
              <PricingCard
                tier="Pro"
                badge="MOST POPULAR"
                price="₹999"
                period="/mo"
                features={[
                  "Unlimited outfit posts",
                  "Custom domain",
                  "Advanced analytics dashboard",
                  "Priority support",
                  "Brand collaboration access",
                  "Price drop alerts for followers",
                ]}
                cta="Start Pro Trial"
                ctaHref="/signup"
                highlighted={true}
              />
              {/* Enterprise */}
              <PricingCard
                tier="Enterprise"
                badge=""
                price="Custom"
                period=""
                features={[
                  "Everything in Pro",
                  "Dedicated account manager",
                  "White-label storefront",
                  "API access",
                  "Agency multi-creator management",
                ]}
                cta="Contact Us"
                ctaHref="/signup"
                highlighted={false}
              />
            </div>

            {/* Trust line */}
            <p className="text-center text-xs text-text-secondary mt-8">
              🔒 No credit card required · Cancel anytime · 14-day free trial on Pro
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 6: FOOTER CTA
            "Ready to Monetize Your Style?" + email input
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 lg:py-24 bg-section-alt section-gold-top">
          <div className="container-content">
            <div className="text-center max-w-2xl mx-auto">
              {/* Halo icon */}
              <svg
                width="32"
                height="16"
                viewBox="0 0 24 12"
                fill="none"
                className="mx-auto mb-4 opacity-70"
              >
                <ellipse cx="12" cy="6" rx="10" ry="5" stroke="#C9A96E" strokeWidth="1.5" fill="none" />
              </svg>
              <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">
                Ready to Monetize<br />Your Style?
              </h2>
              <p className="mt-4 text-base text-text-secondary">
                Join thousands of creators earning from their fashion influence.
              </p>
              {/* Email + CTA (links to signup) */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                <Link
                  href="/signup"
                  className="w-full sm:w-auto inline-block bg-gold-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-background hover:bg-gold-accent-hover transition-colors duration-200 rounded-full text-center"
                >
                  Join {siteConfig.name}
                </Link>
              </div>
              <p className="mt-4 text-xs text-text-secondary">
                Free to join · No credit card needed
              </p>
              {/* Social proof */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-background bg-surface-elevated overflow-hidden"
                    >
                      <LandingImg slot={`cta-avatar-${i}`} images={images} />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-text-secondary">
                  +10,000 creators
                </span>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPONENTS (local to homepage)
   ═══════════════════════════════════════════════════════════ */

/**
 * Landing Image — Shows admin-uploaded image or a placeholder icon.
 * Reads from the `images` map fetched at page level.
 * The `slot` prop matches the slot name in the landing_images DB table.
 */
/**
 * Landing Image — Shows admin-uploaded image or a placeholder icon.
 * Images always fill the container (object-cover) so any size image works.
 * The `slot` prop matches the slot name in the landing_images DB table.
 */
function LandingImg({ slot, images, className = "" }: { slot: string; images: Record<string, LandingImage>; className?: string }) {
  const img = images[slot];
  if (img) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={img.image_url}
        alt={img.alt_text || slot}
        className={`h-full w-full object-cover ${className}`}
        loading="lazy"
      />
    );
  }
  // Placeholder when no image uploaded yet
  return (
    <div className="flex h-full w-full items-center justify-center text-text-secondary/20" data-slot={slot}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    </div>
  );
}

/**
 * Product Tag — floating label on the shopper section mockup
 */
function ProductTag({ name, price, platform }: { name: string; price: string; platform: string }) {
  const colors = platformColors[platform] || platformColors.Other;
  return (
    <div className="glass-card rounded-md px-3 py-2 flex items-center gap-2 shadow-lg">
      <div
        className="h-5 w-5 rounded-sm flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: colors.bg }}
      >
        <span className="text-[7px] font-bold" style={{ color: colors.text }}>
          {platform.charAt(0)}
        </span>
      </div>
      <div>
        <p className="text-xs font-medium text-text-primary">{name} — {price}</p>
        <p className="text-[10px] text-text-secondary">{platform}</p>
      </div>
    </div>
  );
}

/**
 * Step Card — used in "How It Works" section
 */
function StepCard({ number, icon, title, description }: {
  number: string;
  icon: "storefront" | "link" | "bag";
  title: string;
  description: string;
}) {
  const icons = {
    storefront: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
    link: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    bag: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  };

  return (
    <div className="gold-border-glow rounded-lg p-6 bg-surface text-center relative">
      {/* Number badge */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-accent text-background text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
        {number}
      </div>
      {/* Icon */}
      <div className="mt-4 mb-4 text-gold-accent flex justify-center">
        {icons[icon]}
      </div>
      <h3 className="font-display text-base font-semibold text-text-primary">{title}</h3>
      <p className="mt-2 text-sm text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
}

/**
 * Stat Item — used in stats bar below "How It Works"
 */
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-3xl font-bold text-text-primary sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm text-text-secondary">{label}</p>
    </div>
  );
}

/**
 * Pricing Card — visual only, CTAs link to /signup
 */
function PricingCard({ tier, badge, price, period, features, cta, ctaHref, highlighted }: {
  tier: string;
  badge: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted: boolean;
}) {
  return (
    <div className={`rounded-lg p-6 border ${highlighted ? "gold-border-glow bg-surface" : "border-border bg-surface"} relative flex flex-col`}>
      {/* Badge */}
      {badge && (
        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider ${
          highlighted ? "bg-gold-accent text-background" : "bg-surface-elevated text-text-secondary border border-border"
        }`}>
          {badge}
        </div>
      )}
      {/* Tier name */}
      <h3 className="font-display text-lg font-semibold text-text-primary text-center mt-3">{tier}</h3>
      {/* Price */}
      <div className="text-center mt-3 mb-5">
        <span className="font-display text-3xl font-bold text-text-primary">{price}</span>
        {period && <span className="text-sm text-text-secondary">{period}</span>}
      </div>
      {/* Features */}
      <ul className="space-y-2.5 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
            <span className={`mt-0.5 ${highlighted ? "text-gold-accent" : "text-green-400"}`}>✓</span>
            {feature}
          </li>
        ))}
      </ul>
      {/* CTA */}
      <Link
        href={ctaHref}
        className={`mt-6 block text-center py-3 text-sm font-semibold rounded-full transition-colors duration-200 ${
          highlighted
            ? "bg-gold-accent text-background hover:bg-gold-accent-hover"
            : "border border-border text-text-primary hover:border-gold-accent hover:text-gold-accent"
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}
