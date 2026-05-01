# StyleLink — Developer Guide

> For developers (human or AI) who need to understand, maintain, or extend this project.
> Read this AFTER reading `01-MASTER-PROMPT.md` and `02-ARCHITECTURE.md`.

---

## Quick Start (New Developer)

### Prerequisites

- Node.js v18+ installed
- pnpm (`npm install -g pnpm`)
- Supabase account (free tier)
- VS Code (recommended)

### Setup Steps

```bash
# 1. Clone the repo
git clone <repo-url>
cd website

# 2. Install dependencies
pnpm install

# 3. Create environment file
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 4. Run database migration
# Go to Supabase Dashboard → SQL Editor
# Paste contents of supabase/migrations/001_initial_schema.sql → Run

# 5. Create storage buckets
# Supabase Dashboard → Storage → New Bucket:
#   - "outfit-images" (Public)
#   - "profile-photos" (Public)

# 6. Run storage policies
# Go to Supabase Dashboard → SQL Editor
# Paste and run:
CREATE POLICY "Public read outfit images" ON storage.objects FOR SELECT USING (bucket_id = 'outfit-images');
CREATE POLICY "Authenticated upload outfit images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'outfit-images' AND auth.role() = 'authenticated');
CREATE POLICY "Public read profile photos" ON storage.objects FOR SELECT USING (bucket_id = 'profile-photos');
CREATE POLICY "Authenticated upload profile photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'profile-photos' AND auth.role() = 'authenticated');

# 7. Disable email confirmation (for dev)
# Supabase Dashboard → Authentication → Providers → Email → Turn OFF "Confirm email"

# 8. Start dev server
pnpm dev
# Open http://localhost:3000
```

### If Behind Corporate Proxy (SSL Interception)

Add to `.env.local`:

```
NODE_TLS_REJECT_UNAUTHORIZED=0
```

Start with:

```bash
# Windows PowerShell
$env:NODE_TLS_REJECT_UNAUTHORIZED=0
pnpm dev

# Mac/Linux
NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dev
```

---

## File-by-File Guide

### Configuration Files

| File                 | Purpose                                         | When to Edit                            |
| -------------------- | ----------------------------------------------- | --------------------------------------- |
| `lib/config.ts`      | Brand name, limits, categories, platform colors | Rebranding, adding categories/platforms |
| `.env.local`         | Supabase keys, GA ID, app URL                   | Per-environment setup                   |
| `next.config.mjs`    | Image domains, redirects                        | Adding new image sources                |
| `tailwind.config.ts` | Colors, fonts, animations                       | Design system changes                   |
| `middleware.ts`      | Route protection, session refresh               | Adding new protected routes             |

### Adding a New Feature — Checklist

1. ☐ Read `01-MASTER-PROMPT.md` — is it in scope?
2. ☐ Check `02-ARCHITECTURE.md` — where does it fit?
3. ☐ Create the page in `app/` folder
4. ☐ Create components in `components/` folder
5. ☐ Add types to `lib/types.ts` if needed
6. ☐ Update database schema if needed (new migration file)
7. ☐ Update this guide if adding new patterns
8. ☐ Test on mobile viewport

---

## Common Tasks

### Rename the Platform

1. Edit `lib/config.ts` → Change `name` and `tagline`
2. Done. Everything reads from this file.

### Change the Color Theme

1. Edit `app/globals.css` → Change the CSS variables in `:root { ... }`
2. All colors across the entire site update instantly.
3. Key variables:
   - `--color-background` — page background
   - `--color-surface` — card/panel backgrounds
   - `--color-gold-accent` — primary CTA/accent color
   - `--color-primary-dark` — dark text/buttons
   - `--color-product-card-bg` — product card background
   - `--color-product-card-border` — product card border
   - `--color-product-card-hover` — product card hover accent
   - `--color-shop-btn-bg` — "Shop This Item" button background
   - `--color-shop-btn-text` — "Shop This Item" button text

### Add a New Category

1. Edit `lib/config.ts` → Add to `categories` array
2. Done. Filter bar and dropdown automatically include it.

### Add a New E-Commerce Platform

1. Edit `lib/config.ts` → Add to `platforms` array
2. Edit `lib/config.ts` → Add color entry to `platformColors`
3. Done. Badge and dropdown automatically include it.

### Add a New Dashboard Page

1. Create file: `app/dashboard/your-page/page.tsx`
2. Add nav item to `components/layout/DashboardSidebar.tsx`
3. The page is automatically protected by middleware (auth required)

### Add a New Public Page

1. Create file: `app/your-page/page.tsx`
2. Use `<Header />` and `<Footer />` components for consistency
3. No auth needed — it's public by default

### Change Max Products Per Outfit

1. Edit `lib/config.ts` → Change `maxProductsPerOutfit` value
2. Done. Form and validation automatically respect it.

---

## Component Patterns

### Server Component (Data Fetching)

```typescript
// app/some-page/page.tsx
import { createServerSupabaseClient } from "@/lib/supabase-server";

export default async function SomePage() {
  const supabase = createServerSupabaseClient();

  // Use getSession() not getUser() (proxy compatibility)
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Fetch data
  const { data } = await supabase.from("table").select("*");

  return <div>{/* render data */}</div>;
}
```

### Client Component (Interactive)

```typescript
// components/something/Interactive.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";

export function Interactive() {
  const [data, setData] = useState(null);

  const handleAction = async () => {
    const supabase = createClient();
    // ... client-side operations
  };

  return <button onClick={handleAction}>Do Something</button>;
}
```

### Post-Auth Navigation

```typescript
// ALWAYS use window.location.href for post-login/signup redirects
// DO NOT use router.push() — cookies won't sync properly

window.location.href = "/dashboard"; // ✅ Correct
router.push("/dashboard"); // ❌ Will cause redirect loop
```

### Image Display (Supabase Storage)

```typescript
// ALWAYS use <img> tag, NOT next/image
// next/image requires server-side optimization (fails behind proxy)

<img src={imageUrl} alt={title} className="h-full w-full object-cover" />  // ✅
<Image src={imageUrl} alt={title} fill />  // ❌ Fails behind corporate proxy
```

### Data Fetching (Supabase with RLS)

```typescript
// DO: Fetch related data in SEPARATE queries, combine in JS
const { data: outfits } = await supabase.from("outfits").select("*").eq(...);
const { data: products } = await supabase.from("products").select("*").in("outfit_id", ids);
const combined = outfits.map(o => ({ ...o, products: products.filter(p => p.outfit_id === o.id) }));

// DON'T: Use nested select with RLS (can return empty nested arrays)
const { data } = await supabase.from("outfits").select("*, products(*)");  // ❌ Unreliable with RLS
```

---

## Database Operations

### Adding a New Table

1. Create new migration file: `supabase/migrations/002_your_feature.sql`
2. Write CREATE TABLE + indexes + RLS policies
3. Run in Supabase SQL Editor
4. Add TypeScript type to `lib/types.ts`

### Modifying Existing Table

1. Create new migration file (never edit 001)
2. Use `ALTER TABLE` statements
3. Update TypeScript types in `lib/types.ts`
4. Update affected components

---

## Deployment Checklist

### Before First Production Deploy

- [ ] Create Supabase project for production (separate from dev)
- [ ] Run migration SQL on production Supabase
- [ ] Create storage buckets + policies on production
- [ ] Set up Google OAuth (if using) with production redirect URL
- [ ] Create GA4 property and get measurement ID
- [ ] Push code to GitHub
- [ ] Connect GitHub repo to Vercel
- [ ] Set environment variables in Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL` (production)
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (production)
  - `SUPABASE_SERVICE_ROLE_KEY` (production)
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  - `NEXT_PUBLIC_APP_URL` (e.g., https://stylelink.vercel.app)
- [ ] Deploy
- [ ] Test signup/login on production
- [ ] Test creating an outfit
- [ ] Test public storefront
- [ ] Enable email confirmation for production (Supabase → Auth → Providers → Email)

### For Subsequent Deploys

- Push to GitHub → Vercel auto-deploys
- No manual steps needed

---

## Troubleshooting

| Problem                        | Cause                                   | Fix                                         |
| ------------------------------ | --------------------------------------- | ------------------------------------------- |
| `SELF_SIGNED_CERT_IN_CHAIN`    | Corporate proxy                         | Set `NODE_TLS_REJECT_UNAUTHORIZED=0` in env |
| `Missing ActionQueueContext`   | React 18.3.x                            | Pin React to 18.2.0 in package.json         |
| Login redirect loop            | `getUser()` failing in middleware       | Use `getSession()` instead                  |
| Images not loading             | `next/image` proxy issue                | Use `<img>` tag instead                     |
| `next.config.ts` not supported | Next.js 14.2 limitation                 | Rename to `next.config.mjs`                 |
| Fonts not loading              | Corporate proxy blocks Google Fonts API | Use `<link>` tags in layout                 |
| Outfit cards invisible         | CSS `opacity: 0` on animation class     | Remove `opacity: 0` from `.stagger-fade-in` |
| Empty products in nested query | RLS blocking nested select              | Fetch outfits and products separately       |
| Post-login stays on login page | `router.push()` doesn't sync cookies    | Use `window.location.href`                  |

---

## Configurable Elements (Quick Reference)

| What to Change          | Where to Change                                   | Notes                                    |
| ----------------------- | ------------------------------------------------- | ---------------------------------------- |
| Site name / tagline     | `lib/config.ts` → `name`, `tagline`               | Applies to header, footer, SEO, metadata |
| All colors / theme      | `app/globals.css` → `:root` CSS variables         | One file, instant rebrand                |
| Product card colors     | `app/globals.css` → `--color-product-card-*`      | Background, border, hover, button        |
| Platform badge colors   | `lib/config.ts` → `platformColors`                | Per-platform brand colors                |
| Categories              | `lib/config.ts` → `categories` array              | Auto-updates filter bar + dropdown       |
| Platforms               | `lib/config.ts` → `platforms` + `platformColors`  | Auto-updates badges + dropdown           |
| Max products per outfit | `lib/config.ts` → `maxProductsPerOutfit`          | Form validation auto-updates             |
| Ad slot frequency       | `components/outfit/OutfitGrid.tsx` → modulo check | Currently every 2nd outfit               |

## Future Phase Ideas (Not Built Yet)

These are discussed ideas for Phase 2+. Do NOT build unless explicitly requested:

- Deep links to individual outfits (`/username/outfit-slug`)
- Instagram Story shareable card images
- QR code per outfit
- Dashboard sidebar mobile hamburger menu
- Click analytics chart/graph
- Multiple creator profiles per account
- Custom domain per creator (CNAME)
- Automated out-of-stock detection (via e-commerce API — requires API partnerships)

---

## Contact / Ownership

- **Project Owner:** [Your Name]
- **Repository:** [Repo URL]
- **Supabase Project:** [Dashboard URL]
- **Vercel Deployment:** [Vercel URL]
- **Domain:** [Custom domain if any]
