---
globs: website/**/*.{ts,tsx,css,json,sql}
description: Rules and constraints for the StyleLink affiliate marketing website
  project under the website/ folder
alwaysApply: false
---

This repository contains a Next.js 14 affiliate marketing website project in the `website/` folder.

ALWAYS read this rule before making any changes to files under `website/`.

KEY CONSTRAINTS:
- Framework: Next.js 14 (App Router ONLY — no pages router)
- Language: TypeScript strict mode
- Styling: Tailwind CSS ONLY (no CSS-in-JS, no styled-components)
- Database: Supabase (PostgreSQL) with Row Level Security
- Auth: Supabase Auth (email + Google OAuth)
- Package Manager: pnpm
- Deployment target: Vercel
- All config is in `website/lib/config.ts` — platform name "StyleLink" is configurable there
- Environment variables control all deployment-specific settings

DO NOT:
- Add Redux, MobX, or heavy state management
- Use CSS-in-JS libraries
- Use class components
- Use pages router
- Add heavy JS animations (CSS transitions only)
- Over-abstract or add features not in Phase 1 scope
- Build consumer accounts, payment processing, AI recommendations, social features, notifications

PHASE 1 FEATURES ONLY:
1. Public creator storefront (/[username])
2. Creator authentication (login/signup)
3. Creator dashboard
4. Create/Edit outfit (max 15 products)
5. Creator profile settings
6. Click tracking via /go/[productId]
7. Homepage

OUT-OF-STOCK LOGIC:
- Products with in_stock=false are hidden from public storefront
- If ALL products in an outfit are out of stock, hide the entire outfit
- Dashboard shows all products regardless of stock status

DESIGN: Editorial luxury meets Indian fashion. Colors: bg #FAF8F5, gold accent #C9A96E, near-black #1A1A1A. Fonts: Playfair Display (headings) + DM Sans (body). Sharp button corners (no border-radius).