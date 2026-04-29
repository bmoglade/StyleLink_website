-- ============================================
-- StyleLink Seed Data (Demo/Testing)
-- ============================================
-- NOTE: This seed data uses placeholder UUIDs.
-- In a real setup, creators would be linked to actual auth.users entries.
-- For local testing, you can insert this after creating test users via the Supabase auth UI.
-- 
-- To use this:
-- 1. Create a test user in Supabase Auth (Dashboard → Authentication → Users → Add User)
-- 2. Replace 'AUTH_USER_ID_1' below with the actual UUID from auth.users
-- 3. Run this SQL in Supabase SQL Editor

-- ============================================
-- Demo Creator: Priya Sharma
-- ============================================

-- First, insert the creator (replace AUTH_USER_ID_1 with real auth user ID)
-- INSERT INTO creators (id, auth_id, username, display_name, bio, instagram_handle, youtube_handle)
-- VALUES (
--   '11111111-1111-1111-1111-111111111111',
--   'AUTH_USER_ID_1',  -- Replace with actual auth.users UUID
--   'priya_styles',
--   'Priya Sharma',
--   'Fashion creator sharing everyday corporate & festive looks ✨',
--   'priya_styles',
--   'PriyaStyles'
-- );

-- ============================================
-- Demo Outfits (linked to creator above)
-- ============================================
-- Uncomment and run after creator is inserted:

-- Outfit 1: Navy Corporate Chic
-- INSERT INTO outfits (id, creator_id, title, category, image_url, is_published)
-- VALUES (
--   '22222222-2222-2222-2222-222222222201',
--   '11111111-1111-1111-1111-111111111111',
--   'Navy Corporate Chic',
--   'Office',
--   'https://placehold.co/600x800/1A1A1A/FFFFFF?text=Navy+Corporate',
--   true
-- );

-- INSERT INTO products (outfit_id, name, platform, affiliate_url, price, display_order, in_stock) VALUES
-- ('22222222-2222-2222-2222-222222222201', 'Women''s Suit Vest Sleeveless Top', 'Amazon', 'https://amazon.in/example1', '₹1,499', 0, true),
-- ('22222222-2222-2222-2222-222222222201', 'Spring Wide Leg Palazzo Pants', 'Flipkart', 'https://flipkart.com/example1', '₹1,299', 1, true),
-- ('22222222-2222-2222-2222-222222222201', 'Polarized Sunglasses Trendy', 'Myntra', 'https://myntra.com/example1', '₹899', 2, true),
-- ('22222222-2222-2222-2222-222222222201', 'Gold Shell Earrings Mermaid', 'Meesho', 'https://meesho.com/example1', '₹349', 3, true),
-- ('22222222-2222-2222-2222-222222222201', 'Payson Soft Construction Bow Flats', 'Ajio', 'https://ajio.com/example1', '₹2,199', 4, true),
-- ('22222222-2222-2222-2222-222222222201', 'Sloana Satchel Bag Striped', 'Nykaa', 'https://nykaa.com/example1', '₹1,899', 5, true);

-- Outfit 2: Weekend Brunch
-- INSERT INTO outfits (id, creator_id, title, category, image_url, is_published)
-- VALUES (
--   '22222222-2222-2222-2222-222222222202',
--   '11111111-1111-1111-1111-111111111111',
--   'Weekend Brunch Vibes',
--   'Casual',
--   'https://placehold.co/600x800/C9A96E/FFFFFF?text=Weekend+Brunch',
--   true
-- );

-- INSERT INTO products (outfit_id, name, platform, affiliate_url, price, display_order, in_stock) VALUES
-- ('22222222-2222-2222-2222-222222222202', 'Floral Midi Dress Cotton', 'Myntra', 'https://myntra.com/example2', '₹1,899', 0, true),
-- ('22222222-2222-2222-2222-222222222202', 'Block Heel Sandals Beige', 'Amazon', 'https://amazon.in/example2', '₹999', 1, true),
-- ('22222222-2222-2222-2222-222222222202', 'Woven Tote Bag Natural', 'Flipkart', 'https://flipkart.com/example2', '₹699', 2, true),
-- ('22222222-2222-2222-2222-222222222202', 'Minimal Gold Hoops', 'Nykaa', 'https://nykaa.com/example2', '₹449', 3, true),
-- ('22222222-2222-2222-2222-222222222202', 'SPF 50 Tinted Sunscreen', 'Nykaa', 'https://nykaa.com/example3', '₹599', 4, false); -- Out of stock example

-- Outfit 3: Festive Glow
-- INSERT INTO outfits (id, creator_id, title, category, image_url, is_published)
-- VALUES (
--   '22222222-2222-2222-2222-222222222203',
--   '11111111-1111-1111-1111-111111111111',
--   'Festive Glow',
--   'Festive',
--   'https://placehold.co/600x800/FF3F6C/FFFFFF?text=Festive+Glow',
--   true
-- );

-- INSERT INTO products (outfit_id, name, platform, affiliate_url, price, display_order, in_stock) VALUES
-- ('22222222-2222-2222-2222-222222222203', 'Silk Saree with Gold Border', 'Myntra', 'https://myntra.com/example4', '₹4,999', 0, true),
-- ('22222222-2222-2222-2222-222222222203', 'Kundan Jewellery Set', 'Amazon', 'https://amazon.in/example3', '₹1,299', 1, true),
-- ('22222222-2222-2222-2222-222222222203', 'Gold Clutch Evening Bag', 'Ajio', 'https://ajio.com/example2', '₹1,599', 2, true),
-- ('22222222-2222-2222-2222-222222222203', 'Embroidered Juttis', 'Meesho', 'https://meesho.com/example2', '₹799', 3, true),
-- ('22222222-2222-2222-2222-222222222203', 'Bindi Set Multipack', 'Amazon', 'https://amazon.in/example4', '₹149', 4, true);

-- ============================================
-- To test, run these in Supabase SQL Editor after:
-- 1. Creating a user via Authentication → Add User
-- 2. Replacing AUTH_USER_ID_1 with the real user UUID
-- 3. Uncommenting the INSERT statements above
-- ============================================
