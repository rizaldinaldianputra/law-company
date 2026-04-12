import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ejcbhupncuwcmcqoqede.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_p_7H558iEvnsUroPJE3DUg_qZ1ElnS_";

export const createClient = () => {
  if (!supabaseUrl || !supabaseKey) {
    return new Proxy({} as any, {
      get: () => () => ({ data: null, error: null }),
    });
  }
  return createBrowserClient(supabaseUrl, supabaseKey);
}
