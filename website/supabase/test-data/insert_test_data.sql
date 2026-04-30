-- ============================================
-- StyleLink Test Data — 10 Outfits with Products
-- ============================================
-- 
-- INSTRUCTIONS:
-- 1. First, find your creator ID from the creators table in Supabase
--    (Go to Table Editor → creators → copy the "id" value)
-- 2. Replace ALL occurrences of 'YOUR_CREATOR_ID' below with your actual creator ID
--    (Your creator ID is: 3f33352a-a15c-48ed-a559-81422df97ca6)
-- 3. Run this SQL in Supabase SQL Editor
-- 4. Then upload images for each outfit and update the image_url column
--
-- NOTE: image_url is set to placeholder. After running this SQL,
-- you'll upload images via the dashboard edit page for each outfit.
-- ============================================

-- Using your creator ID
-- Replace if different: 3f33352a-a15c-48ed-a559-81422df97ca6

-- ==================== OUTFIT 1 ====================
INSERT INTO outfits (id, creator_id, title, category, image_url, is_published)
VALUES (
  'a0000001-0000-0000-0000-000000000001',
  '3f33352a-a15c-48ed-a559-81422df97ca6',
  'Monday Power Suit',
  'Office',
  'https://placehold.co/600x800/1A1A1A/FFFFFF?text=Monday+Power+Suit',
  true
);

INSERT INTO products (outfit_id, name, platform, affiliate_url, price, display_order, in_stock) VALUES
('a0000001-0000-0000-0000-000000000001', 'Black Blazer Structured Fit', 'Amazon', 'https://amazon.in/blazer-example', '₹2,499', 0, true),
('a0000001-0000-0000-0000-000000000001', 'White Silk Blouse', 'Myntra', 'https://myntra.com/blouse-example', '₹1,299', 1, true),
('a0000001-0000-0000-0000-000000000001', 'High Waist Trousers Black', 'Flipkart', 'https://flipkart.com/trousers-example', '₹1,599', 2, true),
('a0000001-0000-0000-0000-000000000001', 'Pointed Toe Heels Nude', 'Ajio', 'https://ajio.com/heels-example', '₹2,199', 3, true),
('a0000001-0000-0000-0000-000000000001', 'Leather Tote Bag Black', 'Amazon', 'https://amazon.in/tote-example', '₹1,899', 4, true);

-- ==================== OUTFIT 2 ====================
INSERT INTO outfits (id, creator_id, title, category, image_url, is_published)
VALUES (
  'a0000001-0000-0000-0000-000000000002',
  '3f33352a-a15c-48ed-a559-81422df97ca6',
  'Brunch Date Outfit',
  'Casual',
  'https://placehold.co/600x800/C9A96E/FFFFFF?text=Brunch+Date',
  true
);

INSERT INTO products (outfit_id, name, platform, affiliate_url, price, display_order, in_stock) VALUES
('a0000001-0000-0000-0000-000000000002', 'Floral Wrap Dress Midi', 'Myntra', 'https://myntra.com/wrap-dress', '₹1,899', 0, true),
('a0000001-0000-0000-0000-000000000002', 'Straw Crossbody Bag', 'Amazon', 'https://amazon.in/straw-bag', '₹799', 1, true),
('a0000001-0000-0000-0000-000000000002', 'Block Heel Sandals Tan', 'Flipkart', 'https://flipkart.com/sandals-tan', '₹1,099', 2, true),
('a0000001-0000-0000-0000-000000000002', 'Gold Hoop Earrings Small', 'Nykaa', 'https://nykaa.com/hoops-gold', '₹449', 3, true),
('a0000001-0000-0000-0000-000000000002', 'Cat Eye Sunglasses Brown', 'Ajio', 'https://ajio.com/sunglasses-cat', '₹699', 4, true);

-- ==================== OUTFIT 3 ====================
INSERT INTO outfits (id, creator_id, title, category, image_url, is_published)
VALUES (
  'a0000001-0000-0000-0000-000000000003',
  '3f33352a-a15c-48ed-a559-81422df97ca6',
  'Diwali Glam',
  'Festive',
  'https://placehold.co/600x800/FF3F6C/FFFFFF?text=Diwali+Glam',
  true
);

INSERT INTO products (outfit_id, name, platform, affiliate_url, price, display_order, in_stock) VALUES
('a0000001-0000-0000-0000-000000000003', 'Banarasi Silk Saree Red Gold', 'Myntra', 'https://myntra.com/banarasi-saree', '₹5,999', 0, true),
('a0000001-0000-0000-0000-000000000003', 'Kundan Necklace Set Heavy', 'Amazon', 'https://amazon.in/kundan-set', '₹2,499', 1, true),
('a0000001-0000-0000-0000-000000000003', 'Gold Jhumka Earrings', 'Meesho', 'https://meesho.com/jhumka-gold', '₹599', 2, true),
('a0000001-0000-0000-0000-000000000003', 'Embroidered Potli Bag Red', 'Flipkart', 'https://flipkart.com/potli-red', '₹899', 3, true),
('a0000001-0000-0000-0000-000000000003', 'Kolhapuri Heels Gold', 'Ajio', 'https://ajio.com/kolhapuri-gold', '₹1,299', 4, true),
('a0000001-0000-0000-0000-000000000003', 'Maang Tikka Gold Plated', 'Nykaa', 'https://nykaa.com/maang-tikka', '₹349', 5, true);

-- ==================== OUTFIT 4 ====================
INSERT INTO outfits (id, creator_id, title, category, image_url, is_published)
VALUES (
  'a0000001-0000-0000-0000-000000000004',
  '3f33352a-a15c-48ed-a559-81422df97ca6',
  'Gym to Coffee Look',
  'Casual',
  'https://placehold.co/600x800/333333/FFFFFF?text=Gym+to+Coffee',
  true
);

INSERT INTO products (outfit_id, name, platform, affiliate_url, price, display_order, in_stock) VALUES
('a0000001-0000-0000-0000-000000000004', 'Sports Bra High Support Black', 'Amazon', 'https://amazon.in/sports-bra', '₹999', 0, true),
('a0000001-0000-0000-0000-000000000004', 'High Waist Leggings Navy', 'Myntra', 'https://myntra.com/leggings-navy', '₹1,299', 1, true),
('a0000001-0000-0000-0000-000000000004', 'Oversized Hoodie Grey', 'Flipkart', 'https://flipkart.com/hoodie-grey', '₹899', 2, true),
('a0000001-0000-0000-0000-000000000004', 'White Sneakers Minimal', 'Ajio', 'https://ajio.com/sneakers-white', '₹2,499', 3, true),
('a0000001-0000-0000-0000-000000000004', 'Gym Duffel Bag Black', 'Amazon', 'https://amazon.in/duffel-black', '₹1,199', 4, true);

-- ==================== OUTFIT 5 ====================
INSERT INTO outfits (id, creator_id, title, category, image_url, is_published)
VALUES (
  'a0000001-0000-0000-0000-000000000005',
  '3f33352a-a15c-48ed-a559-81422df97ca6',
  'Minimal Skincare Routine',
  'Beauty',
  'https://placehold.co/600x800/FC2779/FFFFFF?text=Skincare+Routine',
  true
);

INSERT INTO products (outfit_id, name, platform, affiliate_url, price, display_order, in_stock) VALUES
('a0000001-0000-0000-0000-000000000005', 'Gentle Cleanser Foam 150ml', 'Nykaa', 'https://nykaa.com/cleanser-foam', '₹599', 0, true),
('a0000001-0000-0000-0000-000000000005', 'Vitamin C Serum 30ml', 'Amazon', 'https://amazon.in/vitc-serum', '₹899', 1, true),
('a0000001-0000-0000-0000-000000000005', 'Hyaluronic Acid Moisturizer', 'Nykaa', 'https://nykaa.com/ha-moisturizer', '₹749', 2, true),
('a0000001-0000-0000-0000-000000000005', 'SPF 50 Sunscreen Gel', 'Amazon', 'https://amazon.in/spf50-gel', '₹499', 3, true),
('a0000001-0000-0000-0000-000000000005', 'Jade Roller Face Massager', 'Meesho', 'https://meesho.com/jade-roller', '₹299', 4, true),
('a0000001-0000-0000-0000-000000000005', 'Sheet Mask Pack of 7', 'Flipkart', 'https://flipkart.com/sheet-mask-7', '₹399', 5, false);

-- ==================== OUTFIT 6 ====================
INSERT INTO outfits (id, creator_id, title, category, image_url, is_published)
VALUES (
  'a0000001-0000-0000-0000-000000000006',
  '3f33352a-a15c-48ed-a559-81422df97ca6',
  'Work From Home Chic',
  'Home',
  'https://placehold.co/600x800/9B2EFA/FFFFFF?text=WFH+Chic',
  true
);

INSERT INTO products (outfit_id, name, platform, affiliate_url, price, display_order, in_stock) VALUES
('a0000001-0000-0000-0000-000000000006', 'Ribbed Knit Lounge Set Beige', 'Myntra', 'https://myntra.com/lounge-set-beige', '₹1,499', 0, true),
('a0000001-0000-0000-0000-000000000006', 'Fuzzy Slippers Cream', 'Amazon', 'https://amazon.in/fuzzy-slippers', '₹599', 1, true),
('a0000001-0000-0000-0000-000000000006', 'Silk Scrunchie Set 5-Pack', 'Meesho', 'https://meesho.com/scrunchie-silk', '₹249', 2, true),
('a0000001-0000-0000-0000-000000000006', 'Scented Candle Vanilla Lavender', 'Amazon', 'https://amazon.in/candle-vanilla', '₹699', 3, true);

-- ==================== OUTFIT 7 ====================
INSERT INTO outfits (id, creator_id, title, category, image_url, is_published)
VALUES (
  'a0000001-0000-0000-0000-000000000007',
  '3f33352a-a15c-48ed-a559-81422df97ca6',
  'College Campus Style',
  'Casual',
  'https://placehold.co/600x800/2874F0/FFFFFF?text=Campus+Style',
  true
);

INSERT INTO products (outfit_id, name, platform, affiliate_url, price, display_order, in_stock) VALUES
('a0000001-0000-0000-0000-000000000007', 'Oversized Denim Jacket Blue', 'Flipkart', 'https://flipkart.com/denim-jacket', '₹1,799', 0, true),
('a0000001-0000-0000-0000-000000000007', 'White Crop Top Basic', 'Myntra', 'https://myntra.com/crop-white', '₹499', 1, true),
('a0000001-0000-0000-0000-000000000007', 'Mom Jeans Light Wash', 'Ajio', 'https://ajio.com/mom-jeans', '₹1,399', 2, true),
('a0000001-0000-0000-0000-000000000007', 'Canvas Tote Bag Printed', 'Meesho', 'https://meesho.com/canvas-tote', '₹349', 3, true),
('a0000001-0000-0000-0000-000000000007', 'Platform Sneakers White', 'Amazon', 'https://amazon.in/platform-sneakers', '₹1,999', 4, true),
('a0000001-0000-0000-0000-000000000007', 'Layered Gold Chain Necklace', 'Nykaa', 'https://nykaa.com/layered-chain', '₹599', 5, true);

-- ==================== OUTFIT 8 ====================
INSERT INTO outfits (id, creator_id, title, category, image_url, is_published)
VALUES (
  'a0000001-0000-0000-0000-000000000008',
  '3f33352a-a15c-48ed-a559-81422df97ca6',
  'Holi Party Outfit',
  'Festive',
  'https://placehold.co/600x800/FF9900/000000?text=Holi+Party',
  true
);

INSERT INTO products (outfit_id, name, platform, affiliate_url, price, display_order, in_stock) VALUES
('a0000001-0000-0000-0000-000000000008', 'White Kurta Cotton Men/Women', 'Amazon', 'https://amazon.in/white-kurta', '₹699', 0, true),
('a0000001-0000-0000-0000-000000000008', 'White Palazzo Pants Cotton', 'Flipkart', 'https://flipkart.com/white-palazzo', '₹599', 1, true),
('a0000001-0000-0000-0000-000000000008', 'Colorful Bangles Set 12-Pack', 'Meesho', 'https://meesho.com/bangles-color', '₹199', 2, true),
('a0000001-0000-0000-0000-000000000008', 'Kolhapuri Chappals White', 'Ajio', 'https://ajio.com/kolhapuri-white', '₹799', 3, true),
('a0000001-0000-0000-0000-000000000008', 'Waterproof Phone Pouch', 'Amazon', 'https://amazon.in/phone-pouch', '₹299', 4, true);

-- ==================== OUTFIT 9 ====================
INSERT INTO outfits (id, creator_id, title, category, image_url, is_published)
VALUES (
  'a0000001-0000-0000-0000-000000000009',
  '3f33352a-a15c-48ed-a559-81422df97ca6',
  'Beach Vacation Vibes',
  'Casual',
  'https://placehold.co/600x800/00BCD4/FFFFFF?text=Beach+Vacation',
  true
);

INSERT INTO products (outfit_id, name, platform, affiliate_url, price, display_order, in_stock) VALUES
('a0000001-0000-0000-0000-000000000009', 'Flowy Beach Cover-Up White', 'Myntra', 'https://myntra.com/coverup-white', '₹1,199', 0, true),
('a0000001-0000-0000-0000-000000000009', 'Bikini Set Tropical Print', 'Amazon', 'https://amazon.in/bikini-tropical', '₹1,499', 1, true),
('a0000001-0000-0000-0000-000000000009', 'Straw Sun Hat Wide Brim', 'Flipkart', 'https://flipkart.com/sun-hat', '₹599', 2, true),
('a0000001-0000-0000-0000-000000000009', 'Waterproof Tote Bag Clear', 'Amazon', 'https://amazon.in/tote-clear', '₹899', 3, true),
('a0000001-0000-0000-0000-000000000009', 'Shell Anklet Gold Plated', 'Meesho', 'https://meesho.com/shell-anklet', '₹199', 4, true),
('a0000001-0000-0000-0000-000000000009', 'Flip Flops Rubber Pastel', 'Ajio', 'https://ajio.com/flip-flops-pastel', '₹399', 5, true);

-- ==================== OUTFIT 10 ====================
INSERT INTO outfits (id, creator_id, title, category, image_url, is_published)
VALUES (
  'a0000001-0000-0000-0000-000000000010',
  '3f33352a-a15c-48ed-a559-81422df97ca6',
  'Date Night Elegance',
  'Other',
  'https://placehold.co/600x800/880E4F/FFFFFF?text=Date+Night',
  true
);

INSERT INTO products (outfit_id, name, platform, affiliate_url, price, display_order, in_stock) VALUES
('a0000001-0000-0000-0000-000000000010', 'Black Bodycon Dress Midi', 'Myntra', 'https://myntra.com/bodycon-black', '₹2,299', 0, true),
('a0000001-0000-0000-0000-000000000010', 'Stiletto Heels Black 3-inch', 'Ajio', 'https://ajio.com/stiletto-black', '₹1,899', 1, true),
('a0000001-0000-0000-0000-000000000010', 'Clutch Bag Gold Shimmer', 'Amazon', 'https://amazon.in/clutch-gold', '₹999', 2, true),
('a0000001-0000-0000-0000-000000000010', 'Statement Ring Gold Rose', 'Nykaa', 'https://nykaa.com/ring-rose-gold', '₹499', 3, true),
('a0000001-0000-0000-0000-000000000010', 'Red Lipstick Matte Finish', 'Nykaa', 'https://nykaa.com/lipstick-red', '₹599', 4, true),
('a0000001-0000-0000-0000-000000000010', 'Perfume Floral Night 50ml', 'Amazon', 'https://amazon.in/perfume-floral', '₹1,299', 5, true),
('a0000001-0000-0000-0000-000000000010', 'Sheer Black Stockings', 'Meesho', 'https://meesho.com/stockings-sheer', '₹199', 6, false);

-- ============================================
-- SUMMARY:
-- 10 outfits inserted across all categories:
--   Office (1): Monday Power Suit
--   Casual (4): Brunch Date, Gym to Coffee, Campus Style, Beach Vacation
--   Festive (2): Diwali Glam, Holi Party
--   Beauty (1): Minimal Skincare Routine
--   Home (1): Work From Home Chic
--   Other (1): Date Night Elegance
--
-- Total products: 54
-- Out of stock products: 2 (Sheet Mask, Sheer Stockings)
--
-- After inserting, upload real images via:
--   Dashboard → Edit each outfit → Change image
-- ============================================
