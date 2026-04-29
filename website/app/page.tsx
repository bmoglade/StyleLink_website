import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config";

/**
 * Homepage
 * ========
 * Route: /
 * Landing page with value props and CTA.
 */
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container-content py-20 text-center">
          <h1 className="font-display text-4xl font-bold text-primary-dark sm:text-5xl lg:text-6xl">
            Your Outfits.
            <br />
            <span className="text-gold-accent">One Link.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-text-secondary">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="bg-gold-accent px-8 py-3 text-sm font-medium text-white hover:bg-[#B8954F] transition-colors duration-200"
            >
              Join as Creator
            </Link>
            <Link
              href="#how-it-works"
              className="border border-border px-8 py-3 text-sm font-medium text-text-primary hover:bg-background transition-colors duration-200"
            >
              How It Works
            </Link>
          </div>
        </section>

        {/* For Creators Section */}
        <section className="border-t border-border bg-surface py-16">
          <div className="container-content">
            <h2 className="text-center font-display text-2xl font-bold text-primary-dark sm:text-3xl">
              For Creators
            </h2>
            <p className="mt-2 text-center text-sm text-text-secondary">
              Build your storefront in minutes. Earn from every click.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <BenefitCard
                emoji="🛍️"
                title="One Link for All Looks"
                description="Replace your messy Linktree with a beautiful, organized outfit storefront."
              />
              <BenefitCard
                emoji="💰"
                title="Earn Affiliate Income"
                description="Paste your affiliate links from Amazon, Flipkart, Myntra — earn on every purchase."
              />
              <BenefitCard
                emoji="📊"
                title="Track Performance"
                description="See which outfits and products get the most clicks. Optimize what works."
              />
            </div>
          </div>
        </section>

        {/* For Shoppers Section */}
        <section id="how-it-works" className="py-16">
          <div className="container-content">
            <h2 className="text-center font-display text-2xl font-bold text-primary-dark sm:text-3xl">
              For Shoppers
            </h2>
            <p className="mt-2 text-center text-sm text-text-secondary">
              Find every item from your favorite creator&apos;s outfit in one place.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <BenefitCard
                emoji="👗"
                title="Complete Looks"
                description="See the full outfit — every piece, every accessory — organized beautifully."
              />
              <BenefitCard
                emoji="🔗"
                title="Direct Links"
                description="Click any item to buy directly from Amazon, Flipkart, Myntra, and more."
              />
              <BenefitCard
                emoji="⚡"
                title="Shop in Seconds"
                description="No more hunting through stories or expired links. Everything in one place."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-primary-dark py-16">
          <div className="container-content text-center">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Ready to monetize your outfits?
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Join {siteConfig.name} and start earning from your style today.
            </p>
            <Link
              href="/signup"
              className="mt-6 inline-block bg-gold-accent px-8 py-3 text-sm font-medium text-white hover:bg-[#B8954F] transition-colors duration-200"
            >
              Create Your Storefront — Free
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function BenefitCard({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border border-border bg-background p-6 text-center">
      <span className="text-3xl">{emoji}</span>
      <h3 className="mt-3 font-display text-lg font-semibold text-primary-dark">
        {title}
      </h3>
      <p className="mt-2 text-sm text-text-secondary">{description}</p>
    </div>
  );
}
