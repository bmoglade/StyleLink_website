-- ============================================
-- Migration 002: Featured Outfit for Landing Page
-- ============================================
-- Adds is_featured flag to outfits table.
-- Only ONE outfit should be featured at a time (displayed on homepage).
-- Admin creates outfit normally, then toggles "Feature on Landing Page".

-- Add is_featured column
ALTER TABLE outfits ADD COLUMN is_featured BOOLEAN DEFAULT false;

-- Index for quick lookup of featured outfit
CREATE INDEX idx_outfits_featured ON outfits(is_featured) WHERE is_featured = true;

-- Function to ensure only one outfit is featured at a time
-- When an outfit is marked as featured, all others are un-featured.
CREATE OR REPLACE FUNCTION ensure_single_featured_outfit()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_featured = true THEN
    UPDATE outfits SET is_featured = false WHERE id != NEW.id AND is_featured = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: auto-unfeature other outfits when one is featured
CREATE TRIGGER trg_single_featured_outfit
  BEFORE INSERT OR UPDATE OF is_featured ON outfits
  FOR EACH ROW
  WHEN (NEW.is_featured = true)
  EXECUTE FUNCTION ensure_single_featured_outfit();

-- Allow public to read the featured outfit (already covered by existing SELECT policy)
-- No additional RLS changes needed — public can already view published outfits.
