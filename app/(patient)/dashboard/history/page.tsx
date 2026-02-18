'use client'

import Link from 'next/link'

/* ─── Mock Timeline Data ─────────────────────────────────────────── */
interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: 'intake' | 'approval' | 'shipment' | 'delivery' | 'refill' | 'message' | 'lab'
  status: 'completed' | 'active' | 'upcoming'
  meta?: Record<string, string>
}

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

/* ─── Icon + Color by event type ─────────────────────────────────── */
function eventIcon(type: TimelineEvent['type']): React.ReactNode {
  switch (type) {
    case 'intake':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
        </svg>
      )
    case 'approval':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )
    case 'shipment':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="3" width="15" height="13" rx="1" />
          <path d="M16 8h4l3 3v5h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      )
    case 'delivery':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )
    case 'refill':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0H5a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2v-4a2 2 0 00-2-2h-4" />
        </svg>
      )
    case 'message':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      )
    case 'lab':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2v6.5L20 22H4l5.5-13.5V2" />
          <line x1="8.5" y1="2" x2="15.5" y2="2" />
          <line x1="7" y1="16" x2="17" y2="16" />
        </svg>
      )
  }
}

function eventAccent(type: TimelineEvent['type']): { color: string; dim: string; border: string } {
  switch (type) {
    case 'approval':
      return { color: 'var(--teal)', dim: 'var(--teal-dim)', border: 'var(--border-teal)' }
    case 'shipment':
    case 'delivery':
      return { color: 'var(--amber)', dim: 'var(--amber-dim)', border: 'rgba(212,151,90,0.3)' }
    case 'lab':
      return { color: 'var(--lavender)', dim: 'var(--lavender-dim)', border: 'rgba(155,142,232,0.3)' }
    case 'message':
      return { color: 'var(--teal)', dim: 'var(--teal-dim)', border: 'var(--border-teal)' }
    case 'refill':
      return { color: 'var(--amber)', dim: 'var(--amber-dim)', border: 'rgba(212,151,90,0.3)' }
    case 'intake':
    default:
      return { color: 'var(--text-2)', dim: 'var(--surface-3)', border: 'var(--border)' }
  }
}

function statusBadge(status: TimelineEvent['status']): React.CSSProperties {
  switch (status) {
    case 'active':
      return {
        background: 'var(--teal-dim)',
        color: 'var(--teal)',
        border: '1px solid var(--border-teal)',
      }
    case 'upcoming':
      return {
        background: 'var(--amber-dim)',
        color: 'var(--amber)',
        border: '1px solid rgba(212,151,90,0.3)',
      }
    case 'completed':
    default:
      return {
        background: 'var(--surface-3)',
        color: 'var(--text-2)',
        border: '1px solid var(--border)',
      }
  }
}

function statusLabel(status: TimelineEvent['status']): string {
  switch (status) {
    case 'active': return 'In Progress'
    case 'upcoming': return 'Upcoming'
    case 'completed': return 'Completed'
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
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
    <div
      className="flex flex-col items-center justify-center py-20 text-center"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-xl)',
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--surface-3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-3)' }}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      </div>
      <h3
        className="font-display mb-2"
        style={{ fontSize: 26, fontWeight: 400, fontStyle: 'italic', color: 'var(--text)' }}
      >
        No history yet
      </h3>
      <p className="text-sm mb-6 max-w-xs" style={{ color: 'var(--text-2)' }}>
        Your treatment timeline will appear here once you begin your protocol.
      </p>
      <Link
        href="/quiz"
        style={{
          background: 'var(--teal)',
          color: '#FFFFFF',
          borderRadius: 999,
          padding: '10px 28px',
          fontSize: 14,
          fontWeight: 500,
          textDecoration: 'none',
          boxShadow: '0 0 24px rgba(37,87,54,0.2)',
        }}
      >
        Start Assessment
      </Link>
    </div>
  )
}

/* ─── Summary Stats ──────────────────────────────────────────────── */
function SummaryStats() {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 anim-fade-up d-100"
    >
      {[
        { label: 'Protocol', value: 'CJC-1295 / Ipamorelin', accent: 'var(--amber)' },
        { label: 'Duration', value: '34 days', accent: 'var(--teal)' },
        { label: 'Shipments', value: '2', accent: 'var(--text)' },
        { label: 'Status', value: 'Active', accent: 'var(--teal)' },
      ].map((stat) => (
        <div
          key={stat.label}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r)',
            padding: '16px 18px',
          }}
        >
          <p className="text-xs uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-3)' }}>
            {stat.label}
          </p>
          <p className="text-sm font-medium" style={{ color: stat.accent }}>
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
    <main
      style={{
        background: 'var(--bg)',
        minHeight: '100vh',
        padding: '48px 24px 80px',
      }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        {/* ── Page Header ── */}
        <div className="mb-10 anim-fade-up">
          <p
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: 'var(--text-3)' }}
          >
            Patient Dashboard
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 5vw, 52px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--text)',
              lineHeight: 1.1,
              marginBottom: 8,
            }}
          >
            Treatment History
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-2)' }}>
            A complete timeline of your care
          </p>
        </div>

        {events.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Summary stats */}
            <SummaryStats />

            {/* Timeline */}
            <div className="anim-fade-up d-200">
              {grouped.map((group, gi) => (
                <div key={group.month} className="mb-8">
                  {/* Month header */}
                  <div className="flex items-center gap-3 mb-5">
                    <h2 className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-2)', whiteSpace: 'nowrap' }}>
                      {group.month}
                    </h2>
                    <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  </div>

                  {/* Events */}
                  <div className="relative" style={{ paddingLeft: 28 }}>
                    {/* Vertical line */}
                    <div
                      className="absolute top-0 bottom-0"
                      style={{
                        left: 11,
                        width: 1,
                        background: 'linear-gradient(180deg, var(--border-teal) 0%, var(--border) 100%)',
                      }}
                    />

                    {group.events.map((event, ei) => {
                      const accent = eventAccent(event.type)
                      const isLast = gi === grouped.length - 1 && ei === group.events.length - 1

                      return (
                        <div
                          key={event.id}
                          className="relative mb-6"
                          style={{ paddingBottom: isLast ? 0 : undefined }}
                        >
                          {/* Timeline node */}
                          <div
                            className="absolute flex items-center justify-center"
                            style={{
                              left: -28,
                              top: 4,
                              width: 22,
                              height: 22,
                              borderRadius: '50%',
                              background: event.status === 'active' ? accent.color : accent.dim,
                              border: `1px solid ${accent.border}`,
                              color: event.status === 'active' ? '#06060F' : accent.color,
                              boxShadow: event.status === 'active' ? `0 0 12px ${accent.dim}` : 'none',
                              zIndex: 1,
                            }}
                          >
                            <div style={{ transform: 'scale(0.65)' }}>
                              {eventIcon(event.type)}
                            </div>
                          </div>

                          {/* Event card */}
                          <div
                            style={{
                              background: 'var(--surface)',
                              border: `1px solid ${event.status === 'active' ? accent.border : 'var(--border)'}`,
                              borderRadius: 'var(--r)',
                              padding: '16px 20px',
                              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = accent.border
                              e.currentTarget.style.boxShadow = `0 0 24px ${accent.dim}`
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = event.status === 'active' ? accent.border : 'var(--border)'
                              e.currentTarget.style.boxShadow = 'none'
                            }}
                          >
                            {/* Top row: date + status */}
                            <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                              <div className="flex items-center gap-3">
                                <span className="text-xs" style={{ color: 'var(--text-3)' }}>
                                  {formatDate(event.date)}
                                </span>
                                <span className="text-xs" style={{ color: 'var(--text-3)' }}>
                                  {formatRelative(event.date)}
                                </span>
                              </div>
                              <span
                                className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                                style={statusBadge(event.status)}
                              >
                                {statusLabel(event.status)}
                              </span>
                            </div>

                            {/* Title */}
                            <h3
                              className="text-sm font-medium mb-1.5"
                              style={{ color: 'var(--text)' }}
                            >
                              {event.title}
                            </h3>

                            {/* Description */}
                            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
                              {event.description}
                            </p>

                            {/* Meta details */}
                            {event.meta && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {Object.entries(event.meta).map(([key, value]) => (
                                  <span
                                    key={key}
                                    className="text-xs px-2.5 py-1 rounded-lg"
                                    style={{
                                      background: 'var(--surface-2)',
                                      border: '1px solid var(--border)',
                                      color: 'var(--text-2)',
                                    }}
                                  >
                                    <span style={{ color: 'var(--text-3)', textTransform: 'capitalize' }}>{key}: </span>
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
            <p
              className="text-xs text-center mt-6 anim-fade-up d-300"
              style={{ color: 'var(--text-3)' }}
            >
              {events.length} event{events.length !== 1 ? 's' : ''} in your treatment history
            </p>
          </>
        )}

      </div>
    </main>
  )
}
