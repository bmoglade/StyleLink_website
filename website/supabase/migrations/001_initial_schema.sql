-- ============================================
-- StyleLink Database Schema
-- Migration 001: Initial Schema
-- ============================================

-- Users / Creators
CREATE TABLE creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  instagram_handle TEXT,
  youtube_handle TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Outfits / Looks
CREATE TABLE outfits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES creators(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products within an outfit
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  outfit_id UUID REFERENCES outfits(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  platform TEXT NOT NULL,
  affiliate_url TEXT NOT NULL,
  price TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Click tracking
CREATE TABLE clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  outfit_id UUID REFERENCES outfits(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES creators(id) ON DELETE CASCADE,
  clicked_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT
);

-- ============================================
-- Indexes for performance
-- ============================================

CREATE INDEX idx_creators_username ON creators(username);
CREATE INDEX idx_creators_auth_id ON creators(auth_id);
CREATE INDEX idx_outfits_creator_id ON outfits(creator_id);
CREATE INDEX idx_outfits_published ON outfits(creator_id, is_published);
CREATE INDEX idx_products_outfit_id ON products(outfit_id);
CREATE INDEX idx_products_in_stock ON products(outfit_id, in_stock);
CREATE INDEX idx_clicks_creator_id ON clicks(creator_id);
CREATE INDEX idx_clicks_clicked_at ON clicks(creator_id, clicked_at);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE outfits ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;

-- Creators: read own, write own, public read
CREATE POLICY "Public can view creators"
  ON creators FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own creator profile"
  ON creators FOR INSERT
  WITH CHECK (auth.uid() = auth_id);

CREATE POLICY "Users can update own creator profile"
  ON creators FOR UPDATE
  USING (auth.uid() = auth_id)
  WITH CHECK (auth.uid() = auth_id);

-- Outfits: public read published, creator read/write own
CREATE POLICY "Public can view published outfits"
  ON outfits FOR SELECT
  USING (
    is_published = true
    OR creator_id IN (SELECT id FROM creators WHERE auth_id = auth.uid())
  );

CREATE POLICY "Creators can insert own outfits"
  ON outfits FOR INSERT
  WITH CHECK (creator_id IN (SELECT id FROM creators WHERE auth_id = auth.uid()));

CREATE POLICY "Creators can update own outfits"
  ON outfits FOR UPDATE
  USING (creator_id IN (SELECT id FROM creators WHERE auth_id = auth.uid()))
  WITH CHECK (creator_id IN (SELECT id FROM creators WHERE auth_id = auth.uid()));

CREATE POLICY "Creators can delete own outfits"
  ON outfits FOR DELETE
  USING (creator_id IN (SELECT id FROM creators WHERE auth_id = auth.uid()));

-- Products: public read (in-stock from published outfits), creator read/write own
CREATE POLICY "Public can view products of published outfits"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Creators can insert products to own outfits"
  ON products FOR INSERT
  WITH CHECK (outfit_id IN (
    SELECT id FROM outfits WHERE creator_id IN (
      SELECT id FROM creators WHERE auth_id = auth.uid()
    )
  ));

CREATE POLICY "Creators can update products of own outfits"
  ON products FOR UPDATE
  USING (outfit_id IN (
    SELECT id FROM outfits WHERE creator_id IN (
      SELECT id FROM creators WHERE auth_id = auth.uid()
    )
  ));

CREATE POLICY "Creators can delete products of own outfits"
  ON products FOR DELETE
  USING (outfit_id IN (
    SELECT id FROM outfits WHERE creator_id IN (
      SELECT id FROM creators WHERE auth_id = auth.uid()
    )
  ));

-- Clicks: anyone can insert (public tracking), creators read own
CREATE POLICY "Anyone can insert clicks"
  ON clicks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Creators can view own clicks"
  ON clicks FOR SELECT
  USING (creator_id IN (SELECT id FROM creators WHERE auth_id = auth.uid()));

-- ============================================
-- Storage Buckets
-- ============================================
-- NOTE: Create these manually in Supabase Dashboard:
-- 1. Bucket: "outfit-images" (public)
-- 2. Bucket: "profile-photos" (public)
-- 
-- Storage policies (set in Dashboard → Storage → Policies):
-- - outfit-images: Public read, authenticated users upload to their own folder
-- - profile-photos: Public read, authenticated users upload to their own folder
