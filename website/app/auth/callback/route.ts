import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

/**
 * OAuth Callback Route
 * ====================
 * Handles the redirect after Google OAuth login.
 * Exchanges the code for a session and redirects to dashboard.
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createServerSupabaseClient();
    await supabase.auth.exchangeCodeForSession(code);

    // Check if this user already has a creator profile
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: creator } = await supabase
        .from("creators")
        .select("username")
        .eq("auth_id", user.id)
        .single();

      // If no creator profile yet, redirect to setup username
      if (!creator) {
        return NextResponse.redirect(new URL("/signup?step=username", requestUrl.origin));
      }
    }
  }

  // Redirect to dashboard
  return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));
}
