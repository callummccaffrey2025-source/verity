import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

export function createClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient(url, key, {
    cookies: {
      get: async (name: string) => (await cookies()).get(name)?.value,
      set: async (name: string, value: string, options: CookieOptions) => {
        try { (await cookies()).set({ name, value, ...options }); } catch {}
      },
      remove: async (name: string, options: CookieOptions) => {
        try { (await cookies()).set({ name, value: '', ...options, maxAge: 0 }); } catch {}
      },
    },
  });
}

// Back-compat name used elsewhere
export const getSupabaseServer = createClient;
