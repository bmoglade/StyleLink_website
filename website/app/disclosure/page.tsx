import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config";

export default function AffiliateDisclosurePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container-content py-12">
          <h1 className="font-display text-3xl font-bold text-primary-dark">
            Affiliate Disclosure
          </h1>
          <div className="mt-8 space-y-6 text-sm text-text-secondary leading-relaxed">
            <p>
              <strong className="text-primary-dark">
                {siteConfig.name} contains affiliate links.
              </strong>
            </p>

            <p>
              When you click on a product link on this platform and make a purchase on
              the linked e-commerce site (Amazon, Flipkart, Myntra, Nykaa, Ajio, Meesho,
              or others), the creator whose storefront you visited may earn a small
              commission at no additional cost to you.
            </p>

            <h2 className="font-display text-lg font-semibold text-primary-dark">
              What This Means
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Product links on this platform are affiliate links</li>
              <li>Creators earn a commission when you purchase through their links</li>
              <li>You pay the same price as you would without the affiliate link</li>
              <li>Affiliate commissions help creators produce content for free</li>
            </ul>

            <h2 className="font-display text-lg font-semibold text-primary-dark">
              Our Commitment
            </h2>
            <p>
              Creators on {siteConfig.name} share products they genuinely recommend.
              However, product availability, pricing, and quality are determined by the
              respective e-commerce platforms.
            </p>

            <p className="mt-6 border-t border-border pt-6 text-xs">
              This disclosure is in compliance with the FTC guidelines and Indian
              Consumer Protection (E-Commerce) Rules.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
