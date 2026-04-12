import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createClient = (cookieStore: Awaited<ReturnType<typeof cookies>>) => {
  if (!supabaseUrl || !supabaseKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Supabase connection configuration is incomplete:");
      if (!supabaseUrl) console.warn("- NEXT_PUBLIC_SUPABASE_URL is missing");
      if (!supabaseKey) console.warn("- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is missing");
    }
    // Return a proxy that ignores all calls to avoid crashing during build-time static analysis
    return new Proxy({} as any, {
      get: () => () => ({ data: null, error: null }),
    });
  }

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};
