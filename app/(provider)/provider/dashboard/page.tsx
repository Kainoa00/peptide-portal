import { redirect } from 'next/navigation'
import ProviderDashboardClient from './ProviderDashboardClient'

export const dynamic = 'force-dynamic'

export default async function ProviderDashboardPage() {
  const { createServerClient } = await import('@supabase/ssr')
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/provider/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'provider') redirect('/login')

  // profiles table has full_name and state but NOT email (email lives in auth.users)
  const { data: intakes } = await supabase
    .from('intake_submissions')
    .select('*, profiles:user_id(full_name, state)')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  const { data: peptides } = await supabase
    .from('peptides')
    .select('id, name, slug')

  return (
    <ProviderDashboardClient
      intakes={intakes || []}
      peptides={peptides || []}
      providerName={profile.full_name || 'Provider'}
    />
  )
}
