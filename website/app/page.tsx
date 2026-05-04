import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config";

/**
 * Homepage — Influra
 * ==================
 * Route: /
 * Luxury dark theme landing page.
 * Layout: Hero (headline left + outfit card right) + How it works + Earnings
 * Mobile: stacked vertically.
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

              {/* Right — Outfit Card Mockup */}
              <div className="flex-1 flex flex-col items-center lg:items-end">
                <div className="w-full max-w-sm border border-border bg-surface p-4 sm:p-5">
                  {/* Card Header */}
                  <h3 className="font-display text-lg font-semibold text-text-primary">
                    City Minimal Essentials
      </h3>
                  <p className="mt-1 text-xs text-text-secondary">
                    Clean. Classic. Effortless pieces for everyday confidence.
                  </p>

                  {/* Mock Product List */}
                  <div className="mt-4 space-y-3">
                    <MockProduct platform="Amazon" name="Ribbed Tank Top" price="₹1,890" color="#FF9900" />
                    <MockProduct platform="Flipkart" name="Tailored Wide Leg Pants" price="₹3,790" color="#2874F0" />
                    <MockProduct platform="Myntra" name="Clean Leather Sneakers" price="₹2,499" color="#FF3F6C" />
                    <MockProduct platform="Ajio" name="Minimal Shoulder Bag" price="₹2,999" color="#1A1A1A" />
                    <MockProduct platform="Nykaa" name="Gold Hoop Earrings Set" price="₹699" color="#FC2779" />
    </div>

                  {/* Total */}
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-sm font-medium text-gold-accent">Total</span>
                    <span className="font-display text-lg font-bold text-text-primary">₹11,877</span>
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
 * Mock Product Row — used in the hero outfit card mockup
 */
function MockProduct({
  platform,
  name,
  price,
  color,
}: {
  platform: string;
  name: string;
  price: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {/* Platform icon circle */}
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {platform.charAt(0)}
      </div>
      {/* Product info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">{name}</p>
        <p className="text-[11px] text-gold-accent">{platform}</p>
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

