"use client";

import { createClient } from "@/lib/supabase";

/**
 * Logout Button (Client Component)
 * =================================
 * Used in the header when user is logged in on public pages (storefront, homepage).
 * Provides a visible logout option outside the dashboard sidebar.
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
      className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-200"
    >
      Log Out
    </button>
  );
}
