import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container-content py-12">
          <h1 className="font-display text-3xl font-bold text-text-primary">
            Privacy Policy
          </h1>
          <div className="mt-8 space-y-6 text-sm text-text-secondary leading-relaxed">
            <p>
              At {siteConfig.name}, we respect your privacy. This policy explains how we
              collect, use, and protect your information.
            </p>

            <h2 className="font-display text-lg font-semibold text-text-primary">
              Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account information (email, name) when you sign up as a creator</li>
              <li>Content you upload (outfit images, product details)</li>
              <li>Click data when consumers click affiliate links (anonymous)</li>
              <li>Standard web analytics (via Google Analytics)</li>
            </ul>

            <h2 className="font-display text-lg font-semibold text-text-primary">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide and maintain the platform</li>
              <li>To show click analytics to creators</li>
              <li>To improve the user experience</li>
            </ul>

            <h2 className="font-display text-lg font-semibold text-text-primary">
              Third-Party Links
            </h2>
            <p>
              Our platform contains affiliate links to third-party e-commerce sites
              (Amazon, Flipkart, Myntra, etc.). We are not responsible for their
              privacy practices.
            </p>

            <h2 className="font-display text-lg font-semibold text-text-primary">
              Contact
            </h2>
            <p>
              For privacy inquiries, contact us at privacy@{siteConfig.name.toLowerCase()}.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
