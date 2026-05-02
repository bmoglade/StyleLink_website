# StyleLink — Changelog

> All notable changes to this project are documented here.
> Format: [version] - date - summary

---

## [0.2.1] - 2025-XX-XX - UX Fixes & Navigation Improvements

### Added

- **Shareable Outfit Links** — Each published outfit now has a copyable link (`site.com/username?look=outfitId`) shown on:
  - Dashboard Overview page (below each outfit)
  - Public Storefront page (at bottom of each outfit card)
  - Creators can use these links in Instagram reels, ads, or bio
- **"← Dashboard" link in Header** — When creator is logged in and views storefront, header shows link back to dashboard
- **"← Overview" button on Edit page** — After saving, easy navigation back to dashboard
- **Success message after edit** — Shows confirmation + links to Overview and Storefront
- **"My Storefront" in sidebar nav** — Always visible, opens in new tab
- **Storefront URL badge** — Shown at bottom of sidebar for quick reference
- **CopyLinkInput component** — Reusable client component for copyable URLs
- **AuthHeader component** — Minimal header for login/signup pages (no "Join as Creator" shown)
- **Test Users SQL** — Script with instructions to create 5 test accounts

### Changed

- **Product Card Layout** — Reordered to match reference: Platform badge (top) → Image → Name → Shop button
- **Header (public pages)** — Now session-aware: shows "← Dashboard" for logged-in creators, "Log in / Join" for visitors
- **Login/Signup pages** — Use AuthHeader (no "Join as Creator" button visible on auth pages)
- **Edit Outfit flow** — No longer redirects away after save; stays on page with success message + nav links
- **Product image upload** — Fixed state batching bug (both `image_file` and `image_url` now update in single setState call)
- **Product image upload** — Fixed file extension detection for compressed blobs + added explicit `contentType`

### Removed

- **Google OAuth buttons** — Temporarily hidden from Login and Signup pages (was showing error because not configured in Supabase). Code is preserved in comments — re-enable when Google OAuth is set up in Supabase Dashboard.

### Notes

- **Google OAuth can be re-enabled later:** Uncomment the Google button code in `app/login/page.tsx` and `app/signup/page.tsx` after configuring: Supabase Dashboard → Authentication → Providers → Google → Enable + add OAuth credentials from Google Cloud Console.

---

## [0.2.0] - 2025-XX-XX - Phase 2 Refinements (User Feedback)

### Added

- **Product Images** — Each product in an outfit can now have its own image (optional upload)
- **"Shop This Item" button** — Clear CTA under each product card guiding users to buy
- **Ad Space (Desktop)** — Left/right sidebar gutters on storefront for running ads
- **Ad Space (Mobile)** — Placeholder slots between outfits every 2nd card
- **Outfit Published URL** — After creating an outfit, shows copyable link for creator to use in bio/reels/ads
- **Facebook Handle** — Added to creator profile (settings + public storefront display)
- **Pinterest Handle** — Added to creator profile (settings + public storefront display)
- **Logout Button** — Added to dashboard sidebar so creators can sign out
- **CSS Custom Properties** — All colors now defined as CSS variables in `globals.css` for easy theme changes

### Changed

- **Product Grid Layout** — Changed from 3-column to **5-column (desktop) / 3-column (tablet) / 2-column (mobile)** to match reference design
- **Product Card Design** — New card-style layout: platform badge on top, image, name, shop button (matches reference)
- **Outfit Card Layout** — Removed total price display, moved category badge to image overlay
- **Color System** — Migrated from hardcoded Tailwind colors to CSS custom properties (change once → applies everywhere)
- **Product Card Colors** — Now configurable via CSS variables (`--color-product-card-bg`, `--color-product-card-border`, etc.)
- **Storefront Width** — Wider container (1440px) on desktop to accommodate ad gutters

### Removed

- **"Shop This Look" button** — Removed from outfit cards (individual product links are clearer)
- **Price display** — Removed from product cards and outfit total (Phase 1 scope reduction)
- **In-Stock Toggle** — Removed from create outfit form (defaults to in-stock; future: auto-detect from store)
- **next/image** in CreatorProfileHeader — Replaced with `<img>` for proxy compatibility

### Database Migration Required

Run `supabase/migrations/002_add_product_images_and_social_handles.sql`:

- Added `image_url` column to `products` table
- Added `facebook_handle` column to `creators` table
- Added `pinterest_handle` column to `creators` table

---

## [0.1.0] - 2025-01-XX - Phase 1 Complete (Baseline)

### Added

- **Public Storefront** (`/[username]`) — SSR page showing creator's published outfits with category filter
- **Authentication** — Email + password signup/login via Supabase Auth, Google OAuth support
- **Creator Dashboard** (`/dashboard`) — Stats (outfits, products, weekly clicks) + outfit list with publish/draft toggle
- **Create Outfit** (`/dashboard/outfits/new`) — Form with image upload, category, 1-15 products with affiliate links
- **Edit Outfit** (`/dashboard/outfits/[id]/edit`) — Pre-filled form, update/delete functionality
- **Profile Settings** (`/dashboard/settings`) — Display name, username, bio, profile photo, social handles
- **Click Tracking** (`/go/[productId]`) — Logs click + redirects to affiliate URL (302)
- **Out-of-Stock** — Toggle per product, hidden from public storefront, outfit hidden if all products OOS
- **Homepage** (`/`) — Value proposition, how-it-works, CTA for creators
- **Legal Pages** — Privacy policy, terms of service, affiliate disclosure
- **Google Analytics** — GA4 via gtag.js, conditional loading
- **Image Compression** — Client-side compression via browser-image-compression (target <500KB)
- **Responsive Design** — Mobile-first, Tailwind CSS, works on all screen sizes

### Technical Foundation

- Next.js 14.2.21 (App Router)
- React 18.2.0 (pinned)
- Supabase (PostgreSQL + Auth + Storage)
- TypeScript strict mode
- Tailwind CSS with custom design system
- Corporate proxy workarounds documented and implemented
- Centralized config (`lib/config.ts`) — single file rebrand
- Row Level Security on all database tables

### Database Schema

- `creators` — User profiles with username, bio, social handles
- `outfits` — Looks with title, category, image, publish state
- `products` — Items with name, platform, affiliate URL, price, stock status
- `clicks` — Tracking with product/outfit/creator IDs, user agent, referrer

---

## [0.3.0] - 2025-05-02 - Production Deployment to Vercel 🚀

### Added

- **Vercel Production Deployment** — Site is now live at `https://stylelink-phi.vercel.app/`
- **`vercel.json`** — Added framework detection config (`"framework": "nextjs"`) so Vercel correctly identifies the project
- **Resilient Middleware** — Middleware now has try/catch error handling and env var checks; if Supabase is unavailable, requests pass through instead of crashing with 500 error
- **GitHub Remote** — Repository now pushes to GitHub (`bmoglade/StyleLink_website`) in addition to Foundry; Vercel auto-deploys on every push to `main`

### Fixed

- **TypeScript type error in `lib/supabase-server.ts`** — Added explicit type annotation for `cookiesToSet` parameter (`{ name: string; value: string; options?: any }[]`) to fix build failure
- **TypeScript type error in `middleware.ts`** — Same `cookiesToSet` type annotation fix
- **MIDDLEWARE_INVOCATION_FAILED (500 error)** — Middleware now gracefully handles missing env vars and Supabase connection failures instead of crashing the entire site

### Deployment Setup

- **Vercel Config**: Framework = Next.js, Root Directory = `website`, Build = `npm run build`, Output = `.next`
- **Environment Variables on Vercel**: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_APP_URL`, `NODE_ENV`
- **Supabase Auth Config**: Site URL and Redirect URLs updated to production Vercel URL
- **Auto-deploy pipeline**: Push to GitHub `main` → Vercel auto-builds and deploys

### Notes

- `NODE_TLS_REJECT_UNAUTHORIZED=0` must NEVER be set on Vercel — it is a local dev workaround only
- `NEXT_PUBLIC_APP_URL` on Vercel is set to `https://stylelink-phi.vercel.app/`
- Git SSL workaround for corporate proxy: `git -c http.sslVerify=false push github main`

---

## [Unreleased] - Changes in Progress

> Add entries here as new features/fixes are implemented.
> Move to a versioned section when a batch of changes is deployed.

### Added

- (none yet)

### Changed

- (none yet)

### Fixed

- (none yet)

### Removed

- (none yet)

---

## Changelog Format Guide

When adding entries, use this format:
