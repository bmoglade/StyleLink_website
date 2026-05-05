import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig, platformColors, platformLogos } from "@/lib/config";
import { landingMockup } from "@/lib/landing-mockup";
import { getFeaturedOutfit } from "@/lib/queries";

/**
 * Homepage — Influra
 * ==================
 * Layout: 3 stacked sections, content-driven height (no forced min-height)
 *
 * Section 1 (Hero):   38/62 split — headline left, outfit card right
 * Divider:            Thin scrolling logo strip — sits tight under hero
 * Section 2 (Info):   45/55 split — How it works + Earnings, centered
 * Footer:             Standard footer
 *
 * All sections share the same container-content for horizontal alignment.
 */

export default async function HomePage() {
  const featuredOutfit = await getFeaturedOutfit();

  const displayData = featuredOutfit
    ? {
        title: featuredOutfit.title,
        description: featuredOutfit.category,
        outfitImage: featuredOutfit.image_url,
        tagline: landingMockup.tagline,
        products: featuredOutfit.products.map((p) => ({
          name: p.name,
          platform: p.platform,
          image: p.image_url || "",
        })),
      }
    : {
        title: landingMockup.title,
        description: landingMockup.description,
        outfitImage: landingMockup.outfitImage,
        tagline: landingMockup.tagline,
        products: landingMockup.products.map((p) => ({
          name: p.name,
          platform: p.platform,
          image: p.image,
        })),
      };

  const brandStripPlatforms = Object.keys(platformLogos).filter(
    (p) => p !== "Other"
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">

        {/* ═══════════════════════════════════════════════════════════
            SECTION 1: HERO
            Content-driven height. No min-height forcing dead space.
            Left (38%): Headline + subtext + CTA
            Right (62%): Outfit card + tagline
            ═══════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-16 lg:py-20">
          <div className="container-content">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">

              {/* Left — Headline + CTA — vertically centered with card */}
              <div className="lg:w-[38%] text-center lg:text-left">
                <h1 className="font-display text-4xl font-bold text-text-primary sm:text-5xl lg:text-6xl leading-tight">
                  Monetize
                  <br />
                  Your Taste.
                </h1>
                <p className="mt-5 text-lg font-semibold text-gold-accent">
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

              {/* Right — Outfit Card + Tagline */}
              <div className="lg:w-[62%] flex flex-col items-center lg:items-end">
                <div className="w-full max-w-lg border border-border bg-surface overflow-hidden">
                  <div className="flex">
                    {/* Outfit image — vertically centered, contained */}
                    <div className="w-40 sm:w-48 flex-shrink-0 bg-background border-r border-border overflow-hidden flex items-center justify-center">
                      <div className="aspect-[3/4] w-full flex items-center justify-center">
                        {displayData.outfitImage ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={displayData.outfitImage}
                            alt={displayData.title}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-text-secondary/30">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
                              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                              <circle cx="9" cy="9" r="2" />
                              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Product list */}
                    <div className="flex-1 min-w-0 p-4 sm:p-5">
                      <h3 className="font-display text-lg font-semibold text-text-primary">
                        {displayData.title}
                      </h3>
                      <p className="mt-1 text-xs text-text-secondary">
                        {displayData.description}
                      </p>
                      <div className="mt-4 space-y-3">
                        {displayData.products.map((product, index) => (
                          <LandingProductRow key={index} {...product} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tagline — golden, matches card width */}
                <p className="mt-4 w-full max-w-lg text-center text-base font-display font-semibold italic text-gold-accent lg:text-right">
                  &ldquo;{displayData.tagline}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            DIVIDER: Brand logo scrolling strip
            Constrained to same content width as hero + bottom sections
            ═══════════════════════════════════════════════════════════ */}
        <section className="border-y border-border bg-surface py-4">
          <div className="container-content">
            <p className="text-[10px] uppercase tracking-widest text-text-secondary text-center mb-3">
              Shop from trusted platforms
            </p>
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-x gap-10 sm:gap-14">
                {brandStripPlatforms.map((platform) => (
                  <BrandLogo key={`a-${platform}`} platform={platform} />
                ))}
                {brandStripPlatforms.map((platform) => (
                  <BrandLogo key={`b-${platform}`} platform={platform} />
                ))}
                {brandStripPlatforms.map((platform) => (
                  <BrandLogo key={`c-${platform}`} platform={platform} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 2: INFO
            45/55 split — How it works + Earnings — centered max-w-4xl
            Slightly more vertical padding than divider, less than hero
            ═══════════════════════════════════════════════════════════ */}
        <section className="bg-background py-14 sm:py-16 lg:py-20">
          <div className="container-content">
            <div className="mx-auto max-w-4xl">
              <div className="grid grid-cols-1 gap-10 md:grid-cols-[45%_55%] md:gap-12 lg:gap-16 items-start">

                {/* How it Works — 45% */}
                <div>
                  <h2 className="font-display text-xl font-bold text-text-primary sm:text-2xl">
                    How it works
                  </h2>
                  <div className="mt-5 space-y-4">
                    <StepItem number="01" text="Create your storefront" />
                    <StepItem number="02" text="Add your outfits and affiliate links" />
                    <StepItem number="03" text="Share once. Earn always." />
                  </div>
                </div>

                {/* Earnings Potential — 55% */}
                <div>
                  <h2 className="font-display text-xl font-bold text-text-primary sm:text-2xl">
                    Earnings potential
                  </h2>
                  <div className="mt-5">
                    <p className="font-display text-3xl font-bold text-gold-accent sm:text-4xl">
                      ₹45,000<span className="text-lg text-text-secondary">/month</span>
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">
                      Earned by active creators in affiliate commissions
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="h-7 w-7 rounded-full border-2 border-background bg-border"
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
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

/**
 * Brand Logo — Platform logo in the scrolling strip.
 */
function BrandLogo({ platform }: { platform: string }) {
  const logoSrc = platformLogos[platform];
  const colors = platformColors[platform] || platformColors.Other;

  return (
    <div className="flex-shrink-0 flex items-center justify-center h-10 px-2">
      {logoSrc ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={logoSrc}
          alt={platform}
          className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
        />
      ) : (
        <span
          className="text-sm font-bold tracking-wide whitespace-nowrap opacity-80"
          style={{ color: colors.bg }}
        >
          {platform}
        </span>
      )}
    </div>
  );
}

/**
 * Landing Product Row — displayed in hero outfit card
 */
function LandingProductRow({
  platform,
  name,
  image,
}: {
  platform: string;
  name: string;
  image: string;
}) {
  const colors = platformColors[platform] || platformColors.Other;

  return (
    <div className="flex items-center gap-2.5">
      <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-sm border border-border bg-background">
        {image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ backgroundColor: colors.bg }}
          >
            <span className="text-[8px] font-bold" style={{ color: colors.text }}>
              {platform.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">{name}</p>
        <p className="text-[11px] font-medium" style={{ color: colors.bg }}>
          {platform}
        </p>
      </div>
    </div>
  );
}

/**
 * Step Item — numbered steps in "How it works"
 */
function StepItem({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-display text-xl font-bold text-gold-accent">{number}</span>
      <span className="text-sm text-text-primary">{text}</span>
    </div>
  );
}
