import { createBrowserClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

// Browser client (for client components)
export function createClient() {
  return createBrowserClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder',
  )
}

// Admin client (for server-side webhook handlers — bypasses RLS)
export function createAdminClient() {
  return createSupabaseClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'placeholder',
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
}

// Helper to check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)
