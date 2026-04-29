import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase Client — Browser (Client Components)
 * ==============================================
 * Used in client components for real-time operations,
 * auth state changes, and client-side data fetching.
 *
 * For server-side operations (SSR, Server Actions, Route Handlers),
 * use lib/supabase-server.ts instead.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
