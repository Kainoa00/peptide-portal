'use client'

import { useState } from 'react'
import Link from 'next/link'

const ACCENT = '#D4A574'

/* ─── Types ─────────────────────────────────────────────────────── */
interface Intake {
  id: string
  goals: string[]
  contraindications: string[]
  experience_level: string
  created_at: string
  recommended_protocols: string[]
  profiles: {
    full_name: string | null
    email: string | null
    state: string | null
  }
}

interface Peptide {
  id: string
  name: string
  slug: string
}

/* ─── Intake Card ─────────────────────────────────────────────── */
function IntakeCard({ intake, peptide }: { intake: Intake; peptide?: Peptide }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [actionTaken, setActionTaken] = useState(false)

  async function handleApprove() {
    setLoading('approve')
    try {
      const res = await fetch('/api/prescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'approve',
          intakeId: intake.id,
          dosage: 'As directed',
          notes: 'Approved via provider dashboard',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setActionTaken(true)
      } else {
        alert('Error: ' + (data.error || 'Failed to approve'))
      }
    } catch (err) {
      alert('Something went wrong')
    } finally {
      setLoading(null)
    }
  }

  async function handleDeny() {
    setLoading('deny')
    try {
      const res = await fetch('/api/prescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'deny',
          intakeId: intake.id,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setActionTaken(true)
      } else {
        alert('Error: ' + (data.error || 'Failed to deny'))
      }
    } catch (err) {
      alert('Something went wrong')
    } finally {
      setLoading(null)
    }
  }

  if (actionTaken) {
    return (
      <div style={{
        background: '#F0FDF4',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #86EFAC',
      }}>
        <p style={{ color: '#166534', fontWeight: 600 }}>✓ Action completed. This intake has been processed.</p>
      </div>
    )
  }

  return (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid #E5E5E5',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontWeight: '600', fontSize: '16px' }}>
              {intake.profiles?.full_name || 'Unknown'}
            </span>
            <span style={{ fontSize: '12px', color: '#888', background: '#f5f5f5', padding: '2px 8px', borderRadius: '4px' }}>
              {intake.profiles?.state || 'N/A'}
            </span>
            <span style={{ fontSize: '12px', color: '#888' }}>
              {intake.profiles?.email}
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
            <span><strong>Goals:</strong> {intake.goals?.join(', ') || 'None'}</span>
            <span><strong>Experience:</strong> {intake.experience_level || 'N/A'}</span>
          </div>

          {peptide && (
            <p style={{ fontSize: '14px', color: ACCENT, fontWeight: '600', margin: '0 0 8px 0' }}>
              Recommended: {peptide.name}
            </p>
          )}

          {intake.contraindications && intake.contraindications.length > 0 && (
            <div style={{ marginTop: '12px', background: '#FEF3C7', padding: '12px', borderRadius: '8px', fontSize: '13px' }}>
              <strong>⚠️ Contraindications:</strong> {intake.contraindications.join(', ')}
            </div>
          )}

          <p style={{ fontSize: '12px', color: '#888', marginTop: '12px' }}>
            Submitted: {new Date(intake.created_at).toLocaleString()}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
          <button
            onClick={handleDeny}
            disabled={!!loading}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid #E5E5E5',
              background: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading === 'deny' ? 'Processing...' : 'Deny'}
          </button>
          <button
            onClick={handleApprove}
            disabled={!!loading}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              background: ACCENT,
              color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              opacity: loading ? 0.5 : 1,
            }}
          >
            {loading === 'approve' ? 'Processing...' : 'Approve'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function ProviderDashboardClient({ intakes, peptides, providerName }: {
  intakes: Intake[]
  peptides: Peptide[]
  providerName: string
}) {
  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #E5E5E5', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>P</span>
            </div>
            <span style={{ fontWeight: '600', fontSize: '18px', color: '#1A1A1A' }}>Peptide Portal</span>
            <span style={{ background: '#F5F0E8', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', color: '#8B7355' }}>Provider</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>{providerName}</span>
            <Link href="/login" style={{ fontSize: '14px', color: '#666', textDecoration: 'none' }}>Sign out</Link>
          </div>
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
            {intakes.map((intake) => {
              const peptide = peptides?.find(p => p.id === intake.recommended_protocols?.[0])
              return <IntakeCard key={intake.id} intake={intake} peptide={peptide} />
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
