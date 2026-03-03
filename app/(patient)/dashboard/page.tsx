'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase'

const ACCENT = '#D4A574'
const ACCENT_DARK = '#8B7355'
const ACCENT_LIGHT = '#F5F0E8'

/* ─── Types ─────────────────────────────────────────────────────── */
interface UserProfile {
  id: string
  full_name: string | null
}

interface IntakeSubmission {
  id: string
  goals: string[]
  experience_level: string
  status: string
  created_at: string
}

/* ─── Empty State ────────────────────────────────────────────────── */
function EmptyState() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 24px',
      background: '#fff',
      border: '1px solid #E5E5E5',
      borderRadius: '20px',
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: '#FAFAF8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
        </svg>
      </div>
      <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1A1A1A', marginBottom: '8px' }}>
        No active protocol
      </h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px', maxWidth: '320px' }}>
        Complete your health assessment to receive a physician-reviewed peptide protocol tailored to your goals.
      </p>
      <Link href="/quiz" style={{
        background: ACCENT,
        color: '#fff',
        borderRadius: '999px',
        padding: '10px 28px',
        fontSize: '14px',
        fontWeight: 600,
        textDecoration: 'none',
      }}>
        Start Assessment →
      </Link>
    </div>
  )
}

/* ─── Quick Action Button ────────────────────────────────────────── */
function ActionButton({ href, icon, label, description }: { href: string; icon: React.ReactNode; label: string; description: string }) {
  return (
    <Link href={href} style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '18px 20px',
      background: '#fff',
      border: '1px solid #E5E5E5',
      borderRadius: '12px',
      textDecoration: 'none',
      transition: 'all 0.25s ease',
    }}>
      <div style={{
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: ACCENT_LIGHT,
        color: ACCENT,
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>{label}</div>
        <div style={{ fontSize: '12px', color: '#666' }}>{description}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  )
}

/* ─── Mock Data (shown if no real data) ──────────────────────────── */
const MOCK_PRESCRIPTION = {
  id: 'rx-001',
  peptideName: 'CJC-1295 / Ipamorelin',
  category: 'longevity',
  dosage: '300mcg CJC-1295 + 300mcg Ipamorelin',
  frequency: '5 nights/week, subcutaneous injection',
  status: 'active' as const,
  approvedAt: '2026-01-15',
  providerName: 'Dr. Sarah Chen, MD',
}

const MOCK_ORDER = {
  status: 'shipped' as const,
  trackingNumber: 'USPS-9400111899223456789',
  estimatedDelivery: '2026-02-20',
  updatedAt: '2026-02-17',
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [intake, setIntake] = useState<IntakeSubmission | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!isSupabaseConfigured) {
        setLoading(false)
        return
      }
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      setProfile(profileData)

      // Fetch latest intake submission
      const { data: intakeData } = await supabase
        .from('intake_submissions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
      setIntake(intakeData)
      setLoading(false)
    }
    fetchData()
  }, [])

  // Use mock data if no real data, or show empty state
  const hasProtocol = !loading && intake && intake.status !== 'pending'

  const prescription = hasProtocol ? MOCK_PRESCRIPTION : null

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '8px' }}>
          Patient Dashboard
        </p>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, marginBottom: '8px' }}>
          My Protocol
        </h1>
        {prescription && (
          <p style={{ fontSize: '14px', color: '#666' }}>
            Prescribed by <span style={{ color: '#1A1A1A', fontWeight: 600 }}>{prescription.providerName}</span>
          </p>
        )}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>Loading...</div>
      ) : !hasProtocol ? (
        <EmptyState />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Protocol Status Card */}
          <div style={{
            background: '#fff',
            border: `1px solid ${ACCENT}`,
            borderRadius: '16px',
            padding: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: ACCENT, marginBottom: '8px' }}>
                  Active Protocol
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1A1A', marginBottom: '4px' }}>
                  {prescription?.peptideName}
                </h2>
                <p style={{ fontSize: '14px', color: '#666' }}>{prescription?.category}</p>
              </div>
              <span style={{
                fontSize: '12px',
                fontWeight: 600,
                padding: '6px 12px',
                borderRadius: '20px',
                background: ACCENT_LIGHT,
                color: ACCENT_DARK,
              }}>
                Active
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', paddingTop: '16px', borderTop: '1px solid #E5E5E5' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Dosage</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>{prescription?.dosage}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Frequency</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>{prescription?.frequency}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Approved</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>{prescription ? new Date(prescription.approvedAt).toLocaleDateString() : ''}</div>
              </div>
            </div>
          </div>

          {/* Shipment Status */}
          <div style={{
            background: '#fff',
            border: '1px solid #E5E5E5',
            borderRadius: '16px',
            padding: '24px',
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1A1A1A', marginBottom: '16px' }}>Shipment Status</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13" rx="1" />
                <path d="M16 8h4l3 3v5h-7V8z" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#666' }}>{MOCK_ORDER.trackingNumber}</span>
            </div>
            <div style={{ height: '8px', background: '#E5E5E5', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '75%', height: '100%', background: ACCENT, borderRadius: '4px' }} />
            </div>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '12px' }}>
              Est. delivery: <span style={{ color: ACCENT_DARK, fontWeight: 600 }}>{new Date(MOCK_ORDER.estimatedDelivery).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </p>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              Quick Actions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <ActionButton href="/dashboard/messages" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>} label="Message Provider" description="Send a message to Dr. Sarah Chen" />
              <ActionButton href="/dashboard/subscription" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>} label="View Subscription" description="Manage billing and payment details" />
              <ActionButton href="/catalog" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>} label="Browse Catalog" description="Explore available peptide protocols" />
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
