-- ============================================
-- Influra Database Migration 003
-- Landing Page Images + Admin System
-- ============================================
-- Run this in Supabase Dashboard → SQL Editor
-- Required for v1.0 homepage redesign
-- ============================================

-- ─────────────────────────────────────────────
-- STEP 1: Add is_admin column to creators table
-- ─────────────────────────────────────────────

ALTER TABLE creators ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Set admin@influra.com as admin (adjust if your admin email is different)
UPDATE creators 
SET is_admin = true 
WHERE auth_id = (
  SELECT id FROM auth.users WHERE email = 'admin@influra.com'
);

-- ─────────────────────────────────────────────
-- STEP 2: Create landing_images table
-- ─────────────────────────────────────────────
-- Stores admin-uploaded images for the homepage.
-- Each image belongs to a section and slot.
-- Homepage queries this table to display images.

CREATE TABLE IF NOT EXISTS landing_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,          -- "hero", "creators", "shoppers", "cta"
  slot TEXT NOT NULL,             -- "hero-1", "hero-2", "creator-profile", etc.
  image_url TEXT NOT NULL,        -- Supabase Storage public URL
  alt_text TEXT DEFAULT '',       -- Accessibility text
  display_order INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',   -- Optional: creator name, follower count, etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Each section+slot combination must be unique (one image per placeholder)
  UNIQUE(section, slot)
);

-- Index for fast homepage queries
CREATE INDEX IF NOT EXISTS idx_landing_images_section ON landing_images(section);
CREATE INDEX IF NOT EXISTS idx_landing_images_section_slot ON landing_images(section, slot);

-- ─────────────────────────────────────────────
-- STEP 3: Row Level Security for landing_images
-- ─────────────────────────────────────────────
-- Anyone can read (homepage needs to display images)
-- Only admins can write (insert, update, delete)

ALTER TABLE landing_images ENABLE ROW LEVEL SECURITY;

-- Public read — homepage needs to fetch images without auth
CREATE POLICY "Anyone can view landing images"
  ON landing_images FOR SELECT
  USING (true);

-- Admin-only insert
CREATE POLICY "Admins can insert landing images"
  ON landing_images FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM creators 
      WHERE auth_id = auth.uid() 
      AND is_admin = true
    )
  );

-- Admin-only update
CREATE POLICY "Admins can update landing images"
  ON landing_images FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM creators 
      WHERE auth_id = auth.uid() 
      AND is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM creators 
      WHERE auth_id = auth.uid() 
      AND is_admin = true
    )
  );

-- Admin-only delete
CREATE POLICY "Admins can delete landing images"
  ON landing_images FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM creators 
      WHERE auth_id = auth.uid() 
      AND is_admin = true
    )
  );

-- ─────────────────────────────────────────────
-- STEP 4: Create storage bucket for landing images
-- ─────────────────────────────────────────────
-- NOTE: Create this bucket manually in Supabase Dashboard:
--   Dashboard → Storage → New Bucket → "landing-images" (Public)
--
-- Then add these storage policies (Dashboard → Storage → landing-images → Policies):
--
--   SELECT (Public read):
--     CREATE POLICY "Public read landing images" 
--     ON storage.objects FOR SELECT 
--     USING (bucket_id = 'landing-images');
--
--   INSERT (Admins only):
--     CREATE POLICY "Admins upload landing images" 
--     ON storage.objects FOR INSERT 
--     WITH CHECK (
--       bucket_id = 'landing-images' 
--       AND auth.role() = 'authenticated'
--       AND EXISTS (
--         SELECT 1 FROM public.creators 
--         WHERE auth_id = auth.uid() 
--         AND is_admin = true
--       )
--     );
--
--   UPDATE (Admins only):
--     CREATE POLICY "Admins update landing images" 
--     ON storage.objects FOR UPDATE 
--     USING (
--       bucket_id = 'landing-images'
--       AND EXISTS (
--         SELECT 1 FROM public.creators 
--         WHERE auth_id = auth.uid() 
--         AND is_admin = true
--       )
--     );
--
--   DELETE (Admins only):
--     CREATE POLICY "Admins delete landing images" 
--     ON storage.objects FOR DELETE 
--     USING (
--       bucket_id = 'landing-images'
--       AND EXISTS (
--         SELECT 1 FROM public.creators 
--         WHERE auth_id = auth.uid() 
--         AND is_admin = true
--       )
--     );

-- ─────────────────────────────────────────────
-- STEP 5: Auto-update updated_at timestamp
-- ─────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_landing_images_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_landing_images_updated_at ON landing_images;
CREATE TRIGGER trg_landing_images_updated_at
  BEFORE UPDATE ON landing_images
  FOR EACH ROW
  EXECUTE FUNCTION update_landing_images_updated_at();

-- ─────────────────────────────────────────────
-- DONE!
-- ─────────────────────────────────────────────
-- 
-- Summary of what was created:
--   ✅ is_admin column on creators table
--   ✅ admin@influra.com set as admin
--   ✅ landing_images table (section, slot, image_url, alt_text, metadata)
--   ✅ RLS policies (public read, admin-only write)
--   ✅ Auto-updating updated_at trigger
--
-- Next steps:
--   1. Create "landing-images" storage bucket in Supabase Dashboard
--   2. Add storage policies (see STEP 4 comments above)
--   3. Deploy v1 code
--   4. Login as admin → Dashboard → Landing Page Images → Upload
--
-- Image slot reference (what the homepage expects):
--
-- Section: "hero"
--   hero-1, hero-2, hero-3, hero-4, hero-5, hero-6
--
-- Section: "creators"  
--   creator-profile    (small circle photo)
--   creator-outfit     (sample outfit image)
--
-- Section: "shoppers"
--   shopper-main       (main outfit in phone mockup)
--   shopper-grid-1 through shopper-grid-6
--
-- Section: "cta"
--   cta-avatar-1, cta-avatar-2, cta-avatar-3, cta-avatar-4
