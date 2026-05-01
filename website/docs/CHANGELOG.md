# StyleLink — Changelog

> All notable changes to this project are documented here.
> Format: [version] - date - summary

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
- **Product Card Design** — New card-style layout: image on top, platform badge, name, shop button (matches reference)
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
