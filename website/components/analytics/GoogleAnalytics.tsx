"use client";

import Script from "next/script";

/**
 * Google Analytics 4 Component
 * ============================
 * Loads GA4 tracking script only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 * In development (no ID set), this renders nothing — zero overhead.
 *
 * For production:
 * 1. Create a GA4 property at https://analytics.google.com
 * 2. Get your Measurement ID (G-XXXXXXXXXX)
 * 3. Set NEXT_PUBLIC_GA_MEASUREMENT_ID in your .env.production or Vercel env vars
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Don't load GA in development or if no ID is configured
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}
