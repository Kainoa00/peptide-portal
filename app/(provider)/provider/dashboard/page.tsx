import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import ProviderDashboardClient from './ProviderDashboardClient'

export const dynamic = 'force-dynamic'

export default async function ProviderDashboardPage() {
  const cookieStore = await cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from Server Component
          }
        },
      },
    }
  )

  // Check auth
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Please log in to access the provider dashboard</h1>
        <a href="/login" style={{ color: '#D4A574' }}>Login</a>
      </div>
    )
  }

  // Check provider role and get name
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'provider') {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Access denied. Provider role required.</h1>
        <a href="/" style={{ color: '#D4A574' }}>Go home</a>
      </div>
    )
  }

  // Fetch pending intakes with user info
  const { data: intakes } = await supabase
    .from('intake_submissions')
    .select(`
      *,
      profiles:user_id(full_name, email, state)
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  // Fetch peptides for recommended protocols
  const { data: peptides } = await supabase.from('peptides').select('id, name, slug')

  return (
    <ProviderDashboardClient 
      intakes={intakes || []} 
      peptides={peptides || []}
      providerName={profile.full_name || 'Provider'}
    />
  )
}
