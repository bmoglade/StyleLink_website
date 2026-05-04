"use client";

import { createClient } from "@/lib/supabase";

/**
 * Logout Button (Client Component)
 * =================================
 * Used in the header when user is logged in on public pages (storefront, homepage).
 * Provides a visible logout option outside the dashboard sidebar.
 * Styled as a subtle bordered button matching the dark luxury theme.
 * Redirects to homepage after logout.
 */
export function LogoutButton() {
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className="border border-red-500/50 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500 hover:text-white transition-colors duration-200"
    >
      Log Out
    </button>
  );
}
