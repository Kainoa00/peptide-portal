'use client'

import Link from 'next/link'

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
function eventAccent(type: TimelineEvent['type']): { color: string; bg: string } {
  switch (type) {
    case 'approval':
    case 'message':
      return { color: 'text-[#D4A574]', bg: 'bg-[#F5F0E8]' }
    case 'shipment':
    case 'delivery':
    case 'refill':
      return { color: 'text-amber-600', bg: 'bg-amber-50' }
    case 'lab':
      return { color: 'text-violet-600', bg: 'bg-violet-50' }
    case 'intake':
    default:
      return { color: 'text-[#6B7280]', bg: 'bg-[#F6F8F6]' }
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
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-white border border-[#E5E7EB] rounded-2xl">
      <div className="w-14 h-14 rounded-full bg-[#F6F8F6] flex items-center justify-center mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-[#131811] mb-2">
        No history yet
      </h2>
      <p className="text-sm text-[#6B7280] mb-6 max-w-xs">
        Your treatment timeline will appear here once you begin your protocol.
      </p>
      <Link
        href="/quiz"
        className="px-6 py-3 rounded-full bg-[#D4A574] text-white font-semibold hover:bg-[#B8864A] transition-colors duration-200 no-underline cursor-pointer"
      >
        Start Assessment
      </Link>
    </div>
  )
}

/* ─── Summary Stats ──────────────────────────────────────────────── */
function SummaryStats() {
  return (
    <div className="grid grid-cols-2 gap-3 mb-10">
      {[
        { label: 'Protocol', value: 'CJC-1295 / Ipamorelin', valueColor: 'text-[#D4A574]' },
        { label: 'Duration', value: '34 days', valueColor: 'text-[#D4A574]' },
        { label: 'Shipments', value: '2', valueColor: 'text-[#131811]' },
        { label: 'Status', value: 'Active', valueColor: 'text-[#D4A574]' },
      ].map((stat) => (
        <div key={stat.label} className="bg-white border border-[#E5E7EB] rounded-xl p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-1.5">
            {stat.label}
          </p>
          <p className={`text-sm font-semibold ${stat.valueColor}`}>
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
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2">
          Patient Dashboard
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-normal tracking-tight text-[#131811] mb-2">
          Treatment History
        </h1>
        <p className="text-sm text-[#6B7280]">A complete timeline of your care</p>
      </div>

      {events.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <SummaryStats />

          {/* Timeline */}
          <div>
            {grouped.map((group, gi) => (
              <div key={group.month} className="mb-8">
                {/* Month header */}
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-[#6B7280] whitespace-nowrap">
                    {group.month}
                  </h2>
                  <div className="flex-1 h-px bg-[#E5E7EB]" aria-hidden="true" />
                </div>

                {/* Events */}
                <div className="relative pl-7">
                  {/* Vertical line */}
                  <div className="absolute top-0 bottom-0 left-[11px] w-px bg-gradient-to-b from-[#D4A574] to-[#E5E7EB]" aria-hidden="true" />

                  {group.events.map((event) => {
                    const accent = eventAccent(event.type)

                    return (
                      <div key={event.id} className="relative mb-6">
                        {/* Timeline node */}
                        <div className={`absolute -left-7 top-1 w-[22px] h-[22px] rounded-full flex items-center justify-center z-10 border ${
                          event.status === 'active'
                            ? 'bg-[#D4A574] border-[#D4A574]'
                            : `${accent.bg} border-[#E5E7EB]`
                        }`}>
                          {event.status === 'active' && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>

                        {/* Event card */}
                        <div className={`bg-white border rounded-xl p-4 ${
                          event.status === 'active' ? 'border-[#D4A574]/30' : 'border-[#E5E7EB]'
                        }`}>
                          {/* Top row */}
                          <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                            <div className="flex gap-3">
                              <span className="text-xs text-[#9CA3AF]">{formatDate(event.date)}</span>
                              <span className="text-xs text-[#9CA3AF]">{formatRelative(event.date)}</span>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                              event.status === 'active'
                                ? 'bg-amber-50 text-amber-700'
                                : event.status === 'upcoming'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-[#F6F8F6] text-[#6B7280]'
                            }`}>
                              {event.status === 'active' ? 'In Progress' : event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                            </span>
                          </div>

                          <h3 className="text-sm font-semibold text-[#131811] mb-1.5">
                            {event.title}
                          </h3>

                          <p className="text-xs text-[#6B7280] leading-relaxed">
                            {event.description}
                          </p>

                          {/* Meta details */}
                          {event.meta && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {Object.entries(event.meta).map(([key, value]) => (
                                <span key={key} className="text-[11px] px-2.5 py-1 rounded-lg bg-[#F6F8F6] border border-[#E5E7EB] text-[#6B7280]">
                                  <span className="text-[#9CA3AF] capitalize">{key}: </span>
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

          <p className="text-xs text-[#9CA3AF] text-center mt-6">
            {events.length} event{events.length !== 1 ? 's' : ''} in your treatment history
          </p>
        </>
      )}
    </div>
  )
}
