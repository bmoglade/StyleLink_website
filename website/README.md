# StyleLink — Creator Outfit Storefront

A web platform where fashion/lifestyle creators build personal storefronts displaying their outfit collections. Each outfit contains multiple products with individual affiliate links from Amazon, Flipkart, Myntra, Nykaa, Ajio, and Meesho.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (email + Google OAuth)
- **Image Storage:** Supabase Storage
- **Deployment:** Vercel
- **Package Manager:** pnpm

---

## Quick Start (Local Development)

### Prerequisites

- [Node.js](https://nodejs.org) v18+ installed
- [pnpm](https://pnpm.io) package manager
- A [Supabase](https://supabase.com) account (free tier)

### Step 1: Install pnpm (if not installed)

```bash
npm install -g pnpm
```

### Step 2: Install dependencies

```bash
cd website
pnpm install
```

### Step 3: Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (choose any region, set a database password)
3. Wait for the project to finish provisioning (~2 minutes)
4. Go to **Settings → API** and copy:
   - `Project URL` → this is your `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → this is your `SUPABASE_SERVICE_ROLE_KEY`

### Step 4: Create database tables

1. In Supabase Dashboard, go to **SQL Editor**
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and click **Run**
4. All tables, indexes, and RLS policies will be created

### Step 5: Create storage buckets

1. In Supabase Dashboard, go to **Storage**
2. Create bucket: `outfit-images` (set to **Public**)
3. Create bucket: `profile-photos` (set to **Public**)
4. For each bucket, add a policy:
   - **SELECT** (read): Allow for all users (public)
   - **INSERT** (upload): Allow for authenticated users

### Step 6: Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_GA_MEASUREMENT_ID=       # Leave blank for development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 7: Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Supabase Auth Setup (Google OAuth — Optional)

To enable "Continue with Google":

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project → APIs & Services → OAuth consent screen → Configure
3. Create OAuth 2.0 credentials (Web application)
4. Add authorized redirect URI: `https://your-project-id.supabase.co/auth/v1/callback`
5. In Supabase Dashboard → Authentication → Providers → Google → Enable
6. Paste your Google Client ID and Client Secret

---

## Testing with Demo Data

1. Create a test user: Supabase Dashboard → Authentication → Users → Add User
2. Copy the user's UUID
3. Open `supabase/seed.sql`
4. Replace `AUTH_USER_ID_1` with the actual UUID
5. Uncomment the INSERT statements
6. Run in SQL Editor

---

## Deploy to Vercel (Production)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/stylelink.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Import Project** → Select your GitHub repo
3. Framework Preset: Next.js (auto-detected)
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` (your GA4 measurement ID)
   - `NEXT_PUBLIC_APP_URL` (your production URL, e.g., `https://stylelink.vercel.app`)
5. Click **Deploy**

### Step 3: Custom Domain (Optional)

1. In Vercel → Project Settings → Domains
2. Add your domain (e.g., `stylelink.in`)
3. Update DNS records as instructed by Vercel
4. Update `NEXT_PUBLIC_APP_URL` to your custom domain

---

## Production Checklist

- [ ] Environment variables set in Vercel
- [ ] `NEXT_PUBLIC_APP_URL` updated to production URL
- [ ] Google OAuth redirect URI updated to production URL
- [ ] Google Analytics measurement ID configured
- [ ] Storage bucket policies verified
- [ ] RLS policies tested
- [ ] Custom domain configured (optional)
- [ ] Platform name updated in `lib/config.ts` (if changing from "StyleLink")

---

## Project Structure

```
website/
├── app/
│   ├── [username]/          # Public creator storefront (SSR)
│   ├── auth/callback/       # OAuth callback handler
│   ├── dashboard/           # Protected creator dashboard
│   │   ├── outfits/new/     # Create outfit form
│   │   ├── outfits/[id]/edit/ # Edit outfit form
│   │   └── settings/        # Profile settings
│   ├── go/[productId]/      # Click redirect endpoint
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── layout.tsx           # Root layout
│   ├── globals.css          # Global styles
│   └── page.tsx             # Homepage
├── components/
│   ├── analytics/           # Google Analytics
│   ├── creator/             # Creator profile components
│   ├── layout/              # Header, Footer, Sidebar
│   ├── outfit/              # Outfit card, product grid
│   └── ui/                  # Reusable UI primitives
├── lib/
│   ├── config.ts            # Site configuration (name, colors, limits)
│   ├── supabase.ts          # Browser Supabase client
│   ├── supabase-server.ts   # Server Supabase client
│   ├── types.ts             # TypeScript types
│   └── utils.ts             # Helper functions
├── supabase/
│   ├── migrations/          # Database schema SQL
│   └── seed.sql             # Demo data
├── middleware.ts             # Auth protection middleware
└── README.md                # This file
```

---

## Configuration

All branding and limits are configurable in `lib/config.ts`:

```typescript
export const siteConfig = {
  name: "StyleLink",              // Change platform name here
  tagline: "Shop Creator Looks",
  maxProductsPerOutfit: 15,
  // ... all other config
}
```

Change this one file to rebrand the entire platform.

---

## License

Private — All rights reserved.
