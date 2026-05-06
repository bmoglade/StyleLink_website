import Link from "next/link";
import { siteConfig, platformLogos } from "@/lib/config";

/**
 * Site Footer — v1.0 Redesign
 * ============================
 * 4-column layout: Brand + Platform + Company + Support
 * Social icons row under brand
 * Platform logo badges at bottom-right
 * Copyright bar at bottom
 *
 * Logo: Uses FooterLogo client component that fetches from DB.
 * This keeps Footer usable in both server and client pages.
 */
export function Footer() {
  // Platform logos for the badge row
  const platforms = Object.entries(platformLogos)
    .filter(([name, src]) => src && name !== "Other")
    .slice(0, 6);

  return (
    <footer className="border-t border-border bg-section-darker">
      <div className="container-content py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Column 1: Brand */}
          <div>
            {/* Logo — fallback (header handles DB logo separately) */}
            <div className="flex flex-col items-start">
              <svg width="20" height="10" viewBox="0 0 24 12" fill="none" className="mb-0.5 opacity-80">
                <ellipse cx="12" cy="6" rx="10" ry="5" stroke="#C9A96E" strokeWidth="1.5" fill="none" />
              </svg>
              <span className="font-display text-lg font-bold tracking-[0.15em] text-text-primary">
                {siteConfig.name.toUpperCase()}
              </span>
            </div>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              One link. Complete looks.<br />Zero friction.
            </p>
            {/* Social icons */}
            <div className="mt-4 flex items-center gap-3">
              <SocialIcon href="#" label="Instagram">
                <path d="M7.8 2h8.4C19 2 21 4 21 6.8v8.4c0 2.8-2 4.8-4.8 4.8H7.8C5 20 3 18 3 15.2V6.8C3 4 5 2 7.8 2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="17" cy="6.5" r="1" fill="currentColor"/>
              </SocialIcon>
              <SocialIcon href="#" label="Pinterest">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M12 7c-2.5 0-4.5 2-4.5 4.5 0 1.6.8 3 2 3.8l1-3.8s-.3-1 .5-1.5c.8-.5 1.8.2 1.8 1 0 1-1 2-1.3 3-.2 1 .5 1.8 1.5 1.8 2 0 3.2-2 3.2-4.3C16.2 9 14.5 7 12 7z" stroke="currentColor" strokeWidth="1" fill="none"/>
              </SocialIcon>
              <SocialIcon href="#" label="YouTube">
                <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <polygon points="10,8.5 16,12 10,15.5" fill="currentColor"/>
              </SocialIcon>
              <SocialIcon href="#" label="Twitter">
                <path d="M22 4s-1.5.7-2.8 1c-.8-1-2-1.5-3.2-1.5-2.5 0-4.5 2-4.5 4.5 0 .3 0 .7.1 1C8 8.8 5 7 3 4.5c-.4.7-.6 1.5-.6 2.3 0 1.6.8 3 2 3.8-.7 0-1.4-.2-2-.5v.1c0 2.2 1.6 4 3.7 4.4-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 1.9 2.4 3.3 4.5 3.3-1.7 1.3-3.8 2.1-6 2.1-.4 0-.8 0-1.2-.1C4.5 21.3 7 22 9.6 22c7.5 0 11.6-6.2 11.6-11.6v-.5c.8-.6 1.5-1.3 2-2.2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </SocialIcon>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div>
            <h4 className="font-display text-sm font-semibold text-text-primary mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <FooterLink href="/#how-it-works">How It Works</FooterLink>
              <FooterLink href="/#creators">For Creators</FooterLink>
              <FooterLink href="/#shoppers">For Shoppers</FooterLink>
              <FooterLink href="/#pricing">Pricing</FooterLink>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-display text-sm font-semibold text-text-primary mb-4">Company</h4>
            <ul className="space-y-2.5">
              <FooterLink href="/#about">About Us</FooterLink>
              <FooterLink href="/disclosure">Partners</FooterLink>
              <FooterLink href="/#contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="font-display text-sm font-semibold text-text-primary mb-4">Support</h4>
            <ul className="space-y-2.5">
              <FooterLink href="/signup">Creator Guide</FooterLink>
              <FooterLink href="/disclosure">Affiliate Terms</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Use</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom bar: Copyright + Platform logos */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          {/* Platform logo badges */}
          <div className="flex items-center gap-2">
            {platforms.map(([name, src]) => (
              <div
                key={name}
                className="h-8 w-8 rounded-md bg-surface-elevated flex items-center justify-center overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src!}
                  alt={name}
                  className="h-5 w-5 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Footer link item */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
      >
        {children}
      </Link>
    </li>
  );
}

/** Social icon wrapper */
function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-gold-accent hover:border-gold-accent transition-colors duration-200"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        {children}
      </svg>
    </a>
  );
}
