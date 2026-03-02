import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

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

  // Check provider role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
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
    <div style={{ minHeight: '100vh', background: '#FAFAF8', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #E5E5E5', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#D4A574', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>P</span>
            </div>
            <span style={{ fontWeight: '600', fontSize: '18px' }}>Peptide Portal</span>
            <span style={{ background: '#F5F0E8', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', color: '#8B7355' }}>Provider</span>
          </div>
          <a href="/login" style={{ fontSize: '14px', color: '#666', textDecoration: 'none' }}>Sign out</a>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Review Queue</h1>
        <p style={{ color: '#666', marginBottom: '32px' }}>
          {intakes?.length || 0} pending intake{intakes?.length !== 1 ? 's' : ''}
        </p>

        {intakes && intakes.length > 0 ? (
          <div style={{ display: 'grid', gap: '16px' }}>
            {intakes.map((intake: any) => {
              const peptide = peptides?.find(p => p.id === intake.recommended_protocols?.[0])
              return (
                <div key={intake.id} style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  border: '1px solid #E5E5E5',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ fontWeight: '600', fontSize: '16px' }}>
                          {intake.profiles?.full_name || 'Unknown'}
                        </span>
                        <span style={{ fontSize: '12px', color: '#888', background: '#f5f5f5', padding: '2px 8px', borderRadius: '4px' }}>
                          {intake.profiles?.state || 'N/A'}
                        </span>
                      </div>
                      <p style={{ fontSize: '14px', color: '#666', margin: '0 0 8px 0' }}>
                        Goals: {intake.goals?.join(', ') || 'None'}
                      </p>
                      {peptide && (
                        <p style={{ fontSize: '14px', color: '#D4A574', fontWeight: '600', margin: 0 }}>
                          Recommended: {peptide.name}
                        </p>
                      )}
                      {intake.contraindications && intake.contraindications.length > 0 && (
                        <div style={{ marginTop: '12px', background: '#FEF3C7', padding: '12px', borderRadius: '8px', fontSize: '13px' }}>
                          <strong>⚠️ Contraindications:</strong> {intake.contraindications.join(', ')}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: '1px solid #E5E5E5',
                        background: '#fff',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}>
                        Request Info
                      </button>
                      <button style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#D4A574',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}>
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px', background: '#fff', borderRadius: '16px' }}>
            <p style={{ color: '#666', fontSize: '16px' }}>No pending intakes. Check back later.</p>
          </div>
        )}
      </main>
    </div>
  )
}
