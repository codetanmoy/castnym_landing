import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY

if (!SUPABASE_URL) {
  throw new Error("Missing Supabase URL. Set SUPABASE_URL (and optionally NEXT_PUBLIC_SUPABASE_URL) in the environment.")
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase service role key. Set SUPABASE_SERVICE_ROLE_KEY or SUPABASE_KEY in the environment.")
}

export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
  },
})
