import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase-server";

/**
 * Click Redirect Endpoint
 * =======================
 * Route: /go/[productId]
 *
 * 1. Looks up the product's affiliate URL
 * 2. Checks if product is in stock
 * 3. Logs the click to the `clicks` table
 * 4. Redirects (302) to the affiliate URL
 *
 * Uses admin client to bypass RLS (this is a public endpoint).
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const { productId } = params;

  try {
    const supabase = createAdminSupabaseClient();

    // Fetch the product
    const { data: product, error } = await supabase
      .from("products")
      .select("id, affiliate_url, in_stock, outfit_id, outfits(creator_id)")
      .eq("id", productId)
      .single();

    // Product not found
    if (error || !product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Product out of stock
    if (!product.in_stock) {
      return NextResponse.json(
        { error: "This product is currently unavailable" },
        { status: 410 }
      );
    }

    // Log the click (fire and forget — don't block the redirect)
    const userAgent = request.headers.get("user-agent") || null;
    const referrer = request.headers.get("referer") || null;
    const creatorId = (product as any).outfits?.creator_id || null;

    supabase.from("clicks").insert({
      product_id: productId,
      outfit_id: product.outfit_id,
      creator_id: creatorId,
      user_agent: userAgent,
      referrer: referrer,
    });

    // Redirect to affiliate URL
    return NextResponse.redirect(product.affiliate_url, 302);
  } catch (err) {
    // Fallback: if anything fails, return a generic error
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
