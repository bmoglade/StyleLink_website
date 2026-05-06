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

1. ☐ Confirm you are on the `v1` branch (NEVER commit to `master`)
2. ☐ Read `01-MASTER-PROMPT.md` — is it in scope?
3. ☐ Check `02-ARCHITECTURE.md` — where does it fit?
4. ☐ Create the page in `app/` folder
5. ☐ Create components in `components/` folder
6. ☐ Add types to `lib/types.ts` if needed
7. ☐ Update database schema if needed (new migration file)
8. ☐ **Update documentation** (see Documentation Maintenance below)
9. ☐ Test on mobile viewport
10. ☐ Commit code + docs together in the same commit

---

## Documentation Maintenance

> **Rule: Every code change on `v1` must include the relevant doc updates in the same commit.**
> You should never have to ask "did you update the docs?" — it happens automatically.

### Which Docs Exist and What They Cover

| Document                     | Purpose                                                                                  | Lives In        |
| ---------------------------- | ---------------------------------------------------------------------------------------- | --------------- |
| `00-SESSION-START-PROMPT.md` | Context for new AI sessions — branching info, current status, deploy commands            | `website/docs/` |
| `01-MASTER-PROMPT.md`        | Product definition, tech stack, constraints, completed features, design system           | `website/docs/` |
| `02-ARCHITECTURE.md`         | System diagram, route map, data flows, DB schema, folder structure, technical decisions  | `website/docs/` |
| `03-DEVELOPER-GUIDE.md`      | Setup instructions, common tasks, patterns, troubleshooting, config reference, branching | `website/docs/` |
| `CHANGELOG.md`               | Every change ever made, organized by version                                             | `website/docs/` |

### When To Update Each Doc

| You just...                                       | Update these                                                                    |
| ------------------------------------------------- | ------------------------------------------------------------------------------- |
| Added a new page/route                            | `02-ARCHITECTURE` (route map + folder structure) + `CHANGELOG`                  |
| Added a new component                             | `02-ARCHITECTURE` (folder structure) + `CHANGELOG`                              |
| Added/changed a DB table or column                | `02-ARCHITECTURE` (DB schema section) + new migration file + `CHANGELOG`        |
| Changed the design system (colors, fonts, layout) | `01-MASTER-PROMPT` (design system section) + `CHANGELOG`                        |
| Added a new platform or category                  | `03-DEVELOPER-GUIDE` (configurable elements table) + `CHANGELOG`                |
| Found & fixed a new bug pattern                   | `03-DEVELOPER-GUIDE` (troubleshooting table) + `CHANGELOG`                      |
| Added a new config option                         | `03-DEVELOPER-GUIDE` (quick reference table) + `CHANGELOG`                      |
| Made a technical architecture decision            | `02-ARCHITECTURE` (key technical decisions table) + `CHANGELOG`                 |
| Changed deploy process or branching               | `02-ARCHITECTURE` (deployment) + `03-DEVELOPER-GUIDE` (branching) + `CHANGELOG` |
| Completed a major feature                         | `01-MASTER-PROMPT` (features list) + `CHANGELOG`                                |
| Made ANY code change at all                       | `CHANGELOG` (always — under `[Unreleased - v1.0.0]`)                            |

### CHANGELOG Rules

- All entries go under `[Unreleased - v1.0.0]` while on the `v1` branch
- Use sections: `### Added`, `### Changed`, `### Fixed`, `### Removed`, `### Database Migrations Required`
- When `v1` merges to `master`: rename `[Unreleased - v1.0.0]` → `[1.0.0] - YYYY-MM-DD`
- Create a fresh `[Unreleased]` section for the next version

### What Happens At Release Time

```
BEFORE merge (on v1):
  01-MASTER-PROMPT.md    → has "v1.0 — COMPLETED" with all new features listed
  02-ARCHITECTURE.md     → reflects the current system (routes, schema, folder structure)
  03-DEVELOPER-GUIDE.md  → has all new patterns, configs, troubleshooting entries
  CHANGELOG.md           → has [Unreleased - v1.0.0] with every change

AFTER merge to master:
  CHANGELOG.md           → rename [Unreleased - v1.0.0] → [1.0.0] - 2026-XX-XX
  00-SESSION-START-PROMPT → update status to "v1.0.0 — Production"
  Everything else        → already correct (came with the merge)
```

### Documentation Quality Standards

- **Be specific** — "Added `is_featured` column to outfits table" not "updated database"
- **Include file paths** — "New file: `components/layout/LogoutButton.tsx`"
- **Explain why** — In troubleshooting, include the cause AND the fix
- **Keep tables updated** — Route map, folder structure, and config tables must match actual code
- **No stale docs** — If you remove a feature, remove it from the docs too

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
3. Edit `lib/config.ts` → Add logo path to `platformLogos`
4. Optionally add logo PNG to `public/images/platforms/<name>.png` (64×64px)
5. Done. Badge, dropdown, logo, and **scrolling brand strip on homepage** automatically include it.

### Change Landing Page Content (Admin Method — Preferred)

1. Login as admin at `/login`
2. Go to `/dashboard/outfits/new` → Create outfit with images
3. Toggle ⭐ "Feature on Landing Page" → ON
4. Publish — homepage auto-displays this outfit
5. To change: create another outfit with ⭐ ON (auto-replaces previous)

### Change Landing Page Content (Manual Fallback)

1. Replace images in `public/images/landing/` (outfit.jpg + product-1.png to product-5.png)
2. Edit `lib/landing-mockup.ts` → Update title, description, product names, platforms
3. Deploy — only used when no admin-featured outfit exists in DB

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

1. Create new migration file: `supabase/migrations/003_your_feature.sql`
2. Write CREATE TABLE + indexes + RLS policies
3. Run in Supabase SQL Editor
4. Add TypeScript type to `lib/types.ts`

### Modifying Existing Table

1. Create new migration file (never edit 001 or 002)
2. Use `ALTER TABLE` statements
3. Update TypeScript types in `lib/types.ts`
4. Update affected components

### Current Migrations

| File                      | Purpose                                   | Status   |
| ------------------------- | ----------------------------------------- | -------- |
| `001_initial_schema.sql`  | All tables, indexes, RLS                  | Required |
| `002_featured_outfit.sql` | `is_featured` column + trigger on outfits | Required |

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

```bash
git add .
git commit -m "description of change"
git -c http.sslVerify=false push github main
# Vercel auto-deploys in ~1-2 minutes — check https://vercel.com/dashboard
```

No manual steps needed. Vercel watches the `main` branch on GitHub.

---

## Troubleshooting

| Problem                                | Cause                                        | Fix                                                                                  |
| -------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------ |
| `SELF_SIGNED_CERT_IN_CHAIN`            | Corporate proxy                              | Set `NODE_TLS_REJECT_UNAUTHORIZED=0` in env                                          |
| `Missing ActionQueueContext`           | React 18.3.x                                 | Pin React to 18.2.0 in package.json                                                  |
| Login redirect loop                    | `getUser()` failing in middleware            | Use `getSession()` instead                                                           |
| Images not loading                     | `next/image` proxy issue                     | Use `<img>` tag instead                                                              |
| `next.config.ts` not supported         | Next.js 14.2 limitation                      | Rename to `next.config.mjs`                                                          |
| Fonts not loading                      | Corporate proxy blocks Google Fonts API      | Use `<link>` tags in layout                                                          |
| Outfit cards invisible                 | CSS `opacity: 0` on animation class          | Remove `opacity: 0` from `.stagger-fade-in`                                          |
| Empty products in nested query         | RLS blocking nested select                   | Fetch outfits and products separately                                                |
| Post-login stays on login page         | `router.push()` doesn't sync cookies         | Use `window.location.href`                                                           |
| Git push SSL error                     | Corporate proxy intercepts HTTPS             | `git -c http.sslVerify=false push github main`                                       |
| Vercel `MIDDLEWARE_INVOCATION_FAILED`  | Middleware crashes if Supabase unavailable   | Added try/catch + env var check in middleware                                        |
| Vercel "No framework detected"         | Root directory change resets preset          | Added `vercel.json` with `"framework": "nextjs"`                                     |
| TypeScript `implicitly has 'any' type` | Missing type on `cookiesToSet` param         | Add `{ name: string; value: string; options?: any }[]` type                          |
| "Database error querying schema"       | `is_featured` column missing from DB         | Run migration `002_featured_outfit.sql` in Supabase SQL Editor                       |
| Event handlers in Server Component     | `onError`/`onMouseEnter` in `page.tsx`       | Remove handlers from Server Components; add `"use client"` to interactive components |
| Admin user creation via SQL fails      | `crypt()` unreliable in some Supabase setups | Sign up via website `/signup` instead of raw SQL                                     |
| Brand strip bg bleeds full page width  | `bg-surface` was on `<section>` (full-width) | Move bg/border to inner `container-content` div                                      |

---

## Configurable Elements (Quick Reference)

| What to Change          | Where to Change                                                          | Notes                                    |
| ----------------------- | ------------------------------------------------------------------------ | ---------------------------------------- |
| Site name / tagline     | `lib/config.ts` → `name`, `tagline`                                      | Applies to header, footer, SEO, metadata |
| All colors / theme      | `app/globals.css` → `:root` CSS variables                                | One file, instant rebrand                |
| Product card colors     | `app/globals.css` → `--color-product-card-*`                             | Background, border, hover, button        |
| Platform badge colors   | `lib/config.ts` → `platformColors`                                       | Per-platform brand colors                |
| Platform logos          | `lib/config.ts` → `platformLogos` + images in `public/images/platforms/` | 64×64px PNG                              |
| Scrolling brand strip   | Auto-reads from `platformLogos` (homepage)                               | Add logo → strip auto-updates            |
| Categories              | `lib/config.ts` → `categories` array                                     | Auto-updates filter bar + dropdown       |
| Platforms               | `lib/config.ts` → `platforms` + `platformColors`                         | Auto-updates badges + dropdown + strip   |
| Max products per outfit | `lib/config.ts` → `maxProductsPerOutfit`                                 | Form validation auto-updates             |
| Ad slot frequency       | `components/outfit/OutfitGrid.tsx` → modulo check                        | Currently every 2nd outfit               |
| Landing page content    | Dashboard → Create Outfit → Toggle ⭐ Featured                           | Preferred method (no code changes)       |
| Landing page fallback   | `lib/landing-mockup.ts` + `public/images/landing/`                       | Used only when no featured outfit in DB  |

## Google OAuth (Currently Disabled)

Google OAuth login buttons are **temporarily hidden** because Google OAuth is not configured in the Supabase project.

**To re-enable:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → Create OAuth 2.0 credentials
2. Set authorized redirect URI: `https://YOUR_SUPABASE_URL/auth/v1/callback`
3. Go to Supabase Dashboard → Authentication → Providers → Google → Enable
4. Paste Google Client ID + Client Secret
5. Uncomment the Google OAuth button code in:
   - `app/login/page.tsx` (search for "Google OAuth")
   - `app/signup/page.tsx` (search for "Google OAuth")
6. Test login flow

The `handleGoogleLogin` / `handleGoogleSignup` functions are still in the code — just the UI buttons are hidden.

---

## Future Phase Ideas (Not Built Yet)

These are discussed ideas for future versions. Do NOT build unless explicitly requested:

- ~~Dashboard sidebar mobile hamburger menu~~ ✅ Done in v0.4.0
- ~~Google OAuth login~~ ✅ Buttons added in v0.4.0 (needs Supabase config)
- Inline product editing from dashboard overview (click product → edit image/link directly)
- Expandable product list within each outfit row on dashboard overview
- Deep links to individual outfits (`/username/outfit-slug`)
- Instagram Story shareable card images
- QR code per outfit
- Click analytics chart/graph
- Multiple creator profiles per account
- Custom domain per creator (CNAME)
- Automated out-of-stock detection (via e-commerce API — requires API partnerships)

---

## Git Remotes & Branching

This repo has two remotes and a branch-based version control workflow:

| Remote   | URL                                   | Purpose                   |
| -------- | ------------------------------------- | ------------------------- |
| `origin` | Foundry (Palantir)                    | Primary code repo         |
| `github` | github.com/bmoglade/StyleLink_website | Vercel auto-deploy source |

### Branch Strategy

| Foundry Branch | GitHub Branch | Vercel                     | Purpose                         |
| -------------- | ------------- | -------------------------- | ------------------------------- |
| `master`       | `main`        | **Production** (live site) | Stable, frozen between releases |
| `v1`           | `develop`     | **Preview URL** (testing)  | All new development work        |

### Rules

1. **NEVER commit directly to `master`** — all work happens on `v1`
2. **To release:** Create PR in Foundry (`v1 → master`) → merge → push `master` to GitHub `main`
3. **To test:** Push `v1` to GitHub `develop` → Vercel generates preview URL automatically
4. **After release:** Tag the version on `master`, then continue new work on `v1`

### Daily Development (on `v1` branch)

```bash
# In Foundry/AI environment:
git add . && git commit -m "description"
git push origin v1

# On local PC (to see preview):
git pull origin v1
git -c http.sslVerify=false push github develop
# → Vercel preview URL generated (only you can see)
```

### Release to Production

```bash
# After PR merged in Foundry: v1 → master
# On local PC:
git checkout master
git pull origin master
git -c http.sslVerify=false push github main    # Production updates
git tag v1.0.0
git push origin v1.0.0                          # Tag the release

# Start next version:
git checkout v1
```

### Documentation Rules During Development

- All doc updates happen on `v1` alongside code
- CHANGELOG entries go under `[Unreleased - v1.0.0]`
- When merged to `master` → rename to `[1.0.0] - date`
- `master` docs are frozen between releases

---

## Contact / Ownership

- **Project Owner:** Bhushan Moglade
- **Repository (Foundry):** ri.stemma.main.repository.b2e8b5a3-4b79-4e84-ae4e-b75249b50c7a
- **Repository (GitHub):** https://github.com/bmoglade/StyleLink_website
- **Supabase Project:** [Dashboard URL]
- **Vercel Deployment:** https://stylelink-phi.vercel.app/
- **Domain:** stylelink-phi.vercel.app (Vercel default — custom domain can be added later)
