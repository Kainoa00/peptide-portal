import { redirect } from 'next/navigation'
import PatientDashboardClient from './PatientDashboardClient'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
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
  if (!user) redirect('/login')

  const { data: intake } = await supabase
    .from('intake_submissions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (!intake) {
    return <PatientDashboardClient intake={null} peptide={null} provider={null} />
  }

  const peptideSlug = intake.recommended_protocols?.[0]
  const { data: peptide } = peptideSlug
    ? await supabase.from('peptides').select('*').eq('slug', peptideSlug).single()
    : { data: null }

  const { data: providerProfile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('role', 'provider')
    .limit(1)
    .single()

  return (
    <PatientDashboardClient
      intake={intake}
      peptide={peptide}
      provider={providerProfile?.full_name || 'Your Provider'}
    />
  )
}
