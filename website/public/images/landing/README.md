# Landing Page Images

All images displayed on the homepage outfit card are served from this folder.

## How to Update (Refresh Content)

1. Replace the image files below with new ones (keep same filenames)
2. Update text/prices in: `website/lib/landing-mockup.ts`
3. Deploy — the landing page automatically reflects changes

## Required Files

| File | Size | Purpose |
|------|------|---------|
| `outfit.jpg` | 600×800px (3:4 portrait) | Main outfit image (left side of card) |
| `product-1.jpg` | 200×200px (square) | Product thumbnail — row 1 |
| `product-2.jpg` | 200×200px (square) | Product thumbnail — row 2 |
| `product-3.jpg` | 200×200px (square) | Product thumbnail — row 3 |
| `product-4.jpg` | 200×200px (square) | Product thumbnail — row 4 |
| `product-5.jpg` | 200×200px (square) | Product thumbnail — row 5 |

## Notes

- Format: JPG or PNG (keep under 200KB each for fast page loads)
- The `.svg` placeholder files are just for development — replace with real photos
- To add/remove products: edit `website/lib/landing-mockup.ts`
- Product images appear as small thumbnails next to each product row
- Outfit image is the hero image on the left panel of the card
