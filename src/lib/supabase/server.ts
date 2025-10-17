import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

export function createClient() {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    throw new Error("Supabase env missing (SUPABASE_URL / SUPABASE_ANON_KEY).");
  }
  const store = cookies();
  return createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) { return store.get(name)?.value; },
      set(name: string, value: string, options: any) {
        try { store.set({ name, value, ...options }); } catch { /* noop for edge */ }
      },
      remove(name: string, options: any) {
        try { store.set({ name, value: "", ...options }); } catch { /* noop */ }
      },
    },
  });
}
