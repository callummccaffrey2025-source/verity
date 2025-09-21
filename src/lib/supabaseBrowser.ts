import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

export function createClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createBrowserClient(url, key);
}

// Back-compat name used elsewhere
export const getSupabaseBrowser = createClient;

export function getSupabaseBrowser(){ 
  return (typeof supabaseBrowser!=="undefined") ? supabaseBrowser : null as any;
}
