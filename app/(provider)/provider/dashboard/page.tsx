'use client'

import Link from 'next/link'

// ─── Mock Data ─────────────────────────────────────────────────────────────
const MOCK_PENDING = [
  { id: 'sub-001', patientName: 'James Whitfield', state: 'TX', age: '34', goals: ['recovery', 'longevity'], experienceLevel: 'intermediate', submittedAt: '2026-02-17T09:14:00Z', contraindications: [], recommendedProtocol: 'CJC-1295 / Ipamorelin' },
  { id: 'sub-002', patientName: 'Maria Gonzalez', state: 'FL', age: '42', goals: ['weight_loss'], experienceLevel: 'beginner', submittedAt: '2026-02-17T08:02:00Z', contraindications: [], recommendedProtocol: 'Tirzepatide' },
  { id: 'sub-003', patientName: 'Derek Park', state: 'AZ', age: '28', goals: ['cognitive', 'recovery'], experienceLevel: 'expert', submittedAt: '2026-02-16T19:55:00Z', contraindications: [], recommendedProtocol: 'Semax' },
]

const MOCK_FLAGGED = [
  { id: 'sub-004', patientName: 'Robert Kim', state: 'CA', age: '56', goals: ['longevity'], experienceLevel: 'beginner', submittedAt: '2026-02-16T11:30:00Z', contraindications: ['diabetes', 'cardiovascular'], recommendedProtocol: 'CJC-1295 / Ipamorelin' },
]

const MOCK_ACTIVE = [
  { id: 'rx-001', patientName: 'Sarah Chen', peptideName: 'CJC-1295 / Ipamorelin', dosage: '300mcg each', status: 'active', orderStatus: 'shipped', approvedAt: '2026-01-15' },
  { id: 'rx-002', patientName: 'Tom Bradley', peptideName: 'Tirzepatide', dosage: '5mg', status: 'active', orderStatus: 'delivered', approvedAt: '2026-01-08' },
]

const GOAL_LABELS: Record<string, string> = {
  recovery: 'Recovery',
  longevity: 'Longevity',
  weight_loss: 'Weight Loss',
  cognitive: 'Cognitive',
  performance: 'Performance',
}

// ─── Helpers ───────────────────────────────────────────────────────────────
function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const diffH = Math.floor(diffMs / (1000 * 60 * 60))
  const diffM = Math.floor(diffMs / (1000 * 60))
  if (diffH >= 24) return `${Math.floor(diffH / 24)}d ago`
  if (diffH >= 1) return `${diffH}h ago`
  return `${diffM}m ago`
}

const ORDER_STATUS_STYLE: Record<string, React.CSSProperties> = {
  shipped:   { color: 'var(--teal)',  background: 'var(--teal-dim)',  border: '1px solid rgba(37,87,54,0.25)',  borderRadius: '100px', padding: '2px 8px', fontSize: '11px', fontWeight: 600 },
  delivered: { color: 'var(--teal)',     background: 'rgba(37,87,54,0.15)', border: '1px solid rgba(37,87,54,0.30)', borderRadius: '100px', padding: '2px 8px', fontSize: '11px', fontWeight: 600 },
  processing:{ color: 'var(--amber)',background: 'var(--amber-dim)', border: '1px solid rgba(212,151,90,0.25)',  borderRadius: '100px', padding: '2px 8px', fontSize: '11px', fontWeight: 600 },
}

// ─── Sub-components ────────────────────────────────────────────────────────
function StatBar() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '32px',
        flexWrap: 'wrap',
      }}
    >
      {[
        { label: 'Pending Review', count: MOCK_PENDING.length, color: 'var(--amber)' },
        { label: 'Flagged', count: MOCK_FLAGGED.length, color: 'var(--rose)' },
        { label: 'Active Prescriptions', count: MOCK_ACTIVE.length, color: 'var(--teal)' },
      ].map(({ label, count, color }) => (
        <div
          key={label}
          style={{
            flex: '1 1 160px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '28px', fontWeight: 700, color }}>{count}</span>
          <span style={{ fontSize: '13px', color: 'var(--text-2)' }}>{label}</span>
        </div>
      ))}
    </div>
  )
}

function ColumnHeader({ title, count, color }: { title: string; count: number; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
      <h2
        style={{
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-2)',
          margin: 0,
        }}
      >
        {title}
      </h2>
      <span
        style={{
          background: color === 'var(--rose)' ? 'var(--rose-dim)' : color === 'var(--teal)' ? 'var(--teal-dim)' : 'var(--amber-dim)',
          color,
          border: `1px solid ${color === 'var(--rose)' ? 'rgba(232,112,112,0.3)' : color === 'var(--teal)' ? 'rgba(37,87,54,0.3)' : 'rgba(212,151,90,0.3)'}`,
          borderRadius: '100px',
          fontSize: '11px',
          fontWeight: 700,
          padding: '2px 8px',
        }}
      >
        {count}
      </span>
    </div>
  )
}

function GoalPill({ goal }: { goal: string }) {
  return (
    <span
      style={{
        background: 'var(--amber-dim)',
        color: 'var(--amber)',
        border: '1px solid rgba(212,151,90,0.2)',
        borderRadius: '100px',
        fontSize: '11px',
        fontWeight: 500,
        padding: '2px 8px',
      }}
    >
      {GOAL_LABELS[goal] ?? goal}
    </span>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function ProviderDashboardPage() {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', padding: '40px 32px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 className="font-display" style={{ fontSize: '36px', fontWeight: 600, color: 'var(--text)', margin: '0 0 6px 0', letterSpacing: '-0.01em' }}>
          Review Queue
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-2)', margin: 0 }}>{dateStr}</p>
      </div>

      {/* Stats */}
      <StatBar />

      {/* Kanban Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', alignItems: 'start' }}>

        {/* ── Column 1: Pending Review ── */}
        <div>
          <ColumnHeader title="Pending Review" count={MOCK_PENDING.length} color="var(--amber)" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: 'calc(100vh - 260px)', overflowY: 'auto' }}>
            {MOCK_PENDING.map((sub) => (
              <div
                key={sub.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderLeft: '3px solid var(--amber)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {/* Name + State */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '15px' }}>{sub.patientName}</span>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-2)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '6px', padding: '2px 7px' }}>{sub.state}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-2)' }}>Age {sub.age}</span>
                  </div>
                </div>

                {/* Goals */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {sub.goals.map((g) => <GoalPill key={g} goal={g} />)}
                </div>

                {/* Protocol */}
                <p style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0 }}>
                  <span style={{ color: 'var(--text-3)' }}>Protocol: </span>
                  {sub.recommendedProtocol}
                </p>

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-3)' }}>{timeAgo(sub.submittedAt)}</span>
                  <Link
                    href={`/provider/review/${sub.id}`}
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--amber)',
                      textDecoration: 'none',
                    }}
                  >
                    Review →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Column 2: Flagged ── */}
        <div>
          <ColumnHeader title="Flagged" count={MOCK_FLAGGED.length} color="var(--rose)" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: 'calc(100vh - 260px)', overflowY: 'auto' }}>
            {MOCK_FLAGGED.map((sub) => (
              <div
                key={sub.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid rgba(232,112,112,0.2)',
                  borderLeft: '3px solid var(--rose)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {/* Warning Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '12px' }}>⚠</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rose)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Requires careful review
                  </span>
                </div>

                {/* Name + State */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '15px' }}>{sub.patientName}</span>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-2)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '6px', padding: '2px 7px' }}>{sub.state}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-2)' }}>Age {sub.age}</span>
                  </div>
                </div>

                {/* Goals */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {sub.goals.map((g) => <GoalPill key={g} goal={g} />)}
                </div>

                {/* Contraindications */}
                {sub.contraindications.length > 0 && (
                  <div style={{ background: 'var(--rose-dim)', border: '1px solid rgba(232,112,112,0.2)', borderRadius: '8px', padding: '10px 12px' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--rose)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Contraindications</p>
                    {sub.contraindications.map((c) => (
                      <p key={c} style={{ fontSize: '12px', color: 'var(--rose)', margin: '2px 0', textTransform: 'capitalize' }}>• {c}</p>
                    ))}
                  </div>
                )}

                {/* Protocol */}
                <p style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0 }}>
                  <span style={{ color: 'var(--text-3)' }}>Protocol: </span>
                  {sub.recommendedProtocol}
                </p>

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-3)' }}>{timeAgo(sub.submittedAt)}</span>
                  <Link
                    href={`/provider/review/${sub.id}`}
                    style={{ fontSize: '12px', fontWeight: 600, color: 'var(--rose)', textDecoration: 'none' }}
                  >
                    Review →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Column 3: Active Prescriptions ── */}
        <div>
          <ColumnHeader title="Active Prescriptions" count={MOCK_ACTIVE.length} color="var(--teal)" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: 'calc(100vh - 260px)', overflowY: 'auto' }}>
            {MOCK_ACTIVE.map((rx) => (
              <div
                key={rx.id}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderLeft: '3px solid var(--teal)',
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {/* Name */}
                <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '15px' }}>{rx.patientName}</span>

                {/* Peptide */}
                <p style={{ fontSize: '13px', color: 'var(--text-2)', margin: 0 }}>{rx.peptideName}</p>

                {/* Dosage */}
                <p style={{ fontSize: '12px', color: 'var(--text-3)', margin: 0 }}>Dosage: {rx.dosage}</p>

                {/* Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={ORDER_STATUS_STYLE[rx.orderStatus] ?? { color: 'var(--text-2)' }}>
                    {rx.orderStatus}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-3)' }}>
                    Approved {rx.approvedAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
