'use client'

import Link from 'next/link'

const ACCENT = '#D4A574'
const ACCENT_DARK = '#8B7355'
const ACCENT_LIGHT = '#F5F0E8'

/* ─── Types ─────────────────────────────────────────────────────── */
interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: 'intake' | 'approval' | 'shipment' | 'delivery' | 'refill' | 'message' | 'lab'
  status: 'completed' | 'active' | 'upcoming'
  meta?: Record<string, string>
}

/* ─── Mock Data ──────────────────────────────────────────────────── */
const MOCK_TIMELINE: TimelineEvent[] = [
  {
    id: 'ev-010',
    date: '2026-02-20',
    title: 'Refill shipment arriving',
    description: 'Your next 30-day supply of CJC-1295 / Ipamorelin is estimated to arrive Thursday.',
    type: 'delivery',
    status: 'upcoming',
    meta: { tracking: 'USPS-9400111899223456789' },
  },
  {
    id: 'ev-009',
    date: '2026-02-17',
    title: 'Refill order shipped',
    description: 'Month 2 supply shipped from Empower Pharmacy. Temperature-controlled packaging.',
    type: 'shipment',
    status: 'active',
    meta: { carrier: 'USPS Priority' },
  },
  {
    id: 'ev-008',
    date: '2026-02-10',
    title: 'Lab results reviewed',
    description: 'Dr. Chen reviewed your 30-day IGF-1 panel. Levels are within expected range. No dosage adjustments needed.',
    type: 'lab',
    status: 'completed',
    meta: { result: 'IGF-1: 284 ng/mL' },
  },
  {
    id: 'ev-007',
    date: '2026-02-03',
    title: 'Provider check-in',
    description: 'Dr. Chen sent a 30-day check-in message. You reported improved sleep quality and recovery.',
    type: 'message',
    status: 'completed',
  },
  {
    id: 'ev-006',
    date: '2026-01-22',
    title: 'First shipment delivered',
    description: 'Your initial 30-day supply was delivered and signed for.',
    type: 'delivery',
    status: 'completed',
    meta: { tracking: 'USPS-9400111899223456001' },
  },
  {
    id: 'ev-005',
    date: '2026-01-18',
    title: 'Order shipped',
    description: 'Your compounded CJC-1295 / Ipamorelin shipped from Empower Pharmacy in cold-chain packaging.',
    type: 'shipment',
    status: 'completed',
    meta: { carrier: 'USPS Priority', pharmacy: 'Empower Pharmacy' },
  },
  {
    id: 'ev-004',
    date: '2026-01-16',
    title: 'Prescription sent to pharmacy',
    description: 'Dr. Chen transmitted your Rx to our PCAB-accredited compounding pharmacy partner for fulfillment.',
    type: 'refill',
    status: 'completed',
  },
  {
    id: 'ev-003',
    date: '2026-01-15',
    title: 'Prescription approved',
    description: 'Dr. Sarah Chen, MD approved your protocol: CJC-1295 / Ipamorelin (300mcg each, 5 nights/week subcutaneous).',
    type: 'approval',
    status: 'completed',
    meta: { provider: 'Dr. Sarah Chen, MD', dosage: '300mcg each' },
  },
  {
    id: 'ev-002',
    date: '2026-01-14',
    title: 'Intake submitted for review',
    description: 'Your health assessment was submitted and entered the physician review queue. Goals: Longevity, Sleep.',
    type: 'intake',
    status: 'completed',
    meta: { goals: 'Longevity, Sleep' },
  },
  {
    id: 'ev-001',
    date: '2026-01-14',
    title: 'Account created',
    description: 'Welcome to Peptide Portal. You completed the intake quiz and created your patient account.',
    type: 'intake',
    status: 'completed',
  },
]

/* ─── Helper Functions ───────────────────────────────────────────── */
function eventAccent(type: TimelineEvent['type']): { color: string; dim: string } {
  switch (type) {
    case 'approval':
      return { color: ACCENT, dim: ACCENT_LIGHT }
    case 'shipment':
    case 'delivery':
      return { color: '#D97706', dim: '#FEF3C7' }
    case 'lab':
      return { color: '#7C3AED', dim: '#EDE9FE' }
    case 'message':
      return { color: ACCENT, dim: ACCENT_LIGHT }
    case 'refill':
      return { color: '#D97706', dim: '#FEF3C7' }
    case 'intake':
    default:
      return { color: '#666', dim: '#F5F5F5' }
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatRelative(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days < 0) return `in ${Math.abs(days)} day${Math.abs(days) !== 1 ? 's' : ''}`
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) !== 1 ? 's' : ''} ago`
  return `${Math.floor(days / 30)} month${Math.floor(days / 30) !== 1 ? 's' : ''} ago`
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
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#F5F5F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      </div>
      <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#1A1A1A', marginBottom: '8px' }}>
        No history yet
      </h2>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px', maxWidth: '320px' }}>
        Your treatment timeline will appear here once you begin your protocol.
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
        Start Assessment
      </Link>
    </div>
  )
}

/* ─── Summary Stats ──────────────────────────────────────────────── */
function SummaryStats() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
      marginBottom: '40px',
    }}>
      {[
        { label: 'Protocol', value: 'CJC-1295 / Ipamorelin', accent: ACCENT },
        { label: 'Duration', value: '34 days', color: ACCENT },
        { label: 'Shipments', value: '2', color: '#1A1A1A' },
        { label: 'Status', value: 'Active', color: ACCENT },
      ].map((stat) => (
        <div key={stat.label} style={{
          background: '#fff',
          border: '1px solid #E5E5E5',
          borderRadius: '12px',
          padding: '16px 18px',
        }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '6px' }}>
            {stat.label}
          </p>
          <p style={{ fontSize: '14px', fontWeight: 600, color: stat.color || '#1A1A1A' }}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function HistoryPage() {
  const events = MOCK_TIMELINE

  // Group events by month
  const grouped: { month: string; events: TimelineEvent[] }[] = []
  let currentMonth = ''
  for (const event of events) {
    const month = new Date(event.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    if (month !== currentMonth) {
      currentMonth = month
      grouped.push({ month, events: [] })
    }
    grouped[grouped.length - 1].events.push(event)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '8px' }}>
          Patient Dashboard
        </p>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, marginBottom: '8px' }}>
          Treatment History
        </h1>
        <p style={{ fontSize: '14px', color: '#666' }}>A complete timeline of your care</p>
      </div>

      {events.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <SummaryStats />

          {/* Timeline */}
          <div>
            {grouped.map((group, gi) => (
              <div key={group.month} style={{ marginBottom: '32px' }}>
                {/* Month header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#666', whiteSpace: 'nowrap' }}>
                    {group.month}
                  </h2>
                  <div style={{ flex: 1, height: '1px', background: '#E5E5E5' }} />
                </div>

                {/* Events */}
                <div style={{ position: 'relative', paddingLeft: '28px' }}>
                  {/* Vertical line */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '11px',
                    width: '1px',
                    background: 'linear-gradient(180deg, #D4A574 0%, #E5E5E5 100%)',
                  }} />

                  {group.events.map((event, ei) => {
                    const accent = eventAccent(event.type)
                    const isLast = gi === grouped.length - 1 && ei === group.events.length - 1

                    return (
                      <div key={event.id} style={{ position: 'relative', marginBottom: '24px', paddingBottom: isLast ? 0 : undefined }}>
                        {/* Timeline node */}
                        <div style={{
                          position: 'absolute',
                          left: '-28px',
                          top: '4px',
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: event.status === 'active' ? accent.color : accent.dim,
                          border: `1px solid ${event.status === 'active' ? accent.color : '#E5E5E5'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 1,
                        }}>
                          {event.status === 'active' && (
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
                          )}
                        </div>

                        {/* Event card */}
                        <div style={{
                          background: '#fff',
                          border: `1px solid ${event.status === 'active' ? accent.dim : '#E5E5E5'}`,
                          borderRadius: '12px',
                          padding: '16px 20px',
                        }}>
                          {/* Top row: date + status */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                              <span style={{ fontSize: '12px', color: '#888' }}>{formatDate(event.date)}</span>
                              <span style={{ fontSize: '12px', color: '#888' }}>{formatRelative(event.date)}</span>
                            </div>
                            <span style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              padding: '4px 10px',
                              borderRadius: '12px',
                              background: event.status === 'active' ? accent.dim : '#F5F5F5',
                              color: event.status === 'active' ? accent.color : '#666',
                            }}>
                              {event.status === 'active' ? 'In Progress' : event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A', marginBottom: '6px' }}>
                            {event.title}
                          </h3>

                          {/* Description */}
                          <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.6 }}>
                            {event.description}
                          </p>

                          {/* Meta details */}
                          {event.meta && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                              {Object.entries(event.meta).map(([key, value]) => (
                                <span key={key} style={{
                                  fontSize: '11px',
                                  padding: '4px 10px',
                                  borderRadius: '8px',
                                  background: '#FAFAF8',
                                  border: '1px solid #E5E5E5',
                                  color: '#666',
                                }}>
                                  <span style={{ color: '#888', textTransform: 'capitalize' }}>{key}: </span>
                                  {value}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Record count */}
          <p style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginTop: '24px' }}>
            {events.length} event{events.length !== 1 ? 's' : ''} in your treatment history
          </p>
        </>
      )}
    </div>
  )
}
