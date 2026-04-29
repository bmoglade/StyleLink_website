import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config";

/**
 * 404 — Creator Not Found
 * ========================
 * Shown when a username doesn't exist.
 */
export default function CreatorNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-display text-5xl font-bold text-primary-dark">
            404
          </h1>
          <p className="mt-4 text-lg text-text-secondary">
            This creator doesn&apos;t exist yet.
          </p>
          <p className="mt-2 text-sm text-text-secondary">
            The username you&apos;re looking for isn&apos;t on {siteConfig.name}.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block bg-gold-accent px-6 py-3 text-sm font-medium text-white hover:bg-[#B8954F] transition-colors duration-200"
          >
            Go to Homepage
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
