import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container-content py-12">
          <h1 className="font-display text-3xl font-bold text-text-primary">
            Terms of Service
          </h1>
          <div className="mt-8 space-y-6 text-sm text-text-secondary leading-relaxed">
            <p>
              By using {siteConfig.name}, you agree to these terms.
            </p>

            <h2 className="font-display text-lg font-semibold text-text-primary">
              For Creators
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>You are responsible for the affiliate links you add</li>
              <li>You must comply with each affiliate network&apos;s terms of service</li>
              <li>You must not upload copyrighted images without permission</li>
              <li>We may remove content that violates these terms</li>
            </ul>

            <h2 className="font-display text-lg font-semibold text-text-primary">
              For Consumers
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Purchases are made on third-party platforms, not on {siteConfig.name}</li>
              <li>{siteConfig.name} is not responsible for product quality, delivery, or returns</li>
              <li>Product availability and prices may change without notice</li>
            </ul>

            <h2 className="font-display text-lg font-semibold text-text-primary">
              Limitation of Liability
            </h2>
            <p>
              {siteConfig.name} acts as a link aggregation platform. We do not sell
              products, process payments, or guarantee any outcomes from affiliate
              purchases.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
