/** Back-compat shim: some files may import from "@/lib/supabaseServer".
 * We simply re-export the server createClient helper. */
export { createClient } from "./supabase/server";
/** Optional name people sometimes used: */
export const getSupabaseServer = () => createClient();
import { createClient } from "./supabase/server";
