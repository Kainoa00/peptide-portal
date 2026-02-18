interface Props {
  peptideName: string
  dosage: string
  frequency: string
  status: 'pending' | 'approved' | 'active' | 'cancelled'
  category?: string
  providerName?: string
  approvedAt?: string
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Awaiting provider review',
  approved: 'Approved — processing order',
  active: 'Active',
  cancelled: 'Cancelled',
}

// Returns inline style objects for badge colors using CSS vars
function statusBadgeStyle(status: string): React.CSSProperties {
  switch (status) {
    case 'pending':
      return {
        background: 'var(--amber-dim)',
        color: 'var(--amber)',
        border: '1px solid rgba(212,151,90,0.3)',
      }
    case 'approved':
      return {
        background: 'var(--teal-dim)',
        color: 'var(--teal)',
        border: '1px solid var(--border-teal)',
      }
    case 'active':
      return {
        background: 'var(--teal-dim)',
        color: 'var(--teal)',
        border: '1px solid var(--border-teal)',
        boxShadow: '0 0 12px rgba(45,214,168,0.15)',
      }
    case 'cancelled':
      return {
        background: 'rgba(53,53,78,0.4)',
        color: 'var(--text-3)',
        border: '1px solid var(--border)',
      }
    default:
      return {}
  }
}

// Returns the category accent color for the card border
function categoryAccent(category?: string): string {
  switch (category) {
    case 'longevity':
      return 'rgba(212,151,90,0.3)'
    case 'recovery':
      return 'rgba(45,214,168,0.3)'
    case 'weight_loss':
      return 'rgba(232,112,112,0.3)'
    case 'cognitive':
      return 'rgba(155,142,232,0.3)'
    default:
      return 'var(--border-teal)'
  }
}

export default function ProtocolStatus({
  peptideName,
  dosage,
  frequency,
  status,
  category,
  providerName,
  approvedAt,
}: Props) {
  const accent = categoryAccent(category)

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: `1px solid ${accent}`,
        borderRadius: 'var(--r-lg)',
        padding: '28px 32px',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        {/* Left: peptide info */}
        <div className="flex-1 min-w-0">
          <p
            className="text-xs uppercase tracking-widest mb-2"
            style={{ color: 'var(--text-3)' }}
          >
            Active Protocol
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(26px, 3vw, 34px)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--text)',
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            {peptideName}
          </h2>

          {/* Dosage + frequency chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="text-xs px-3 py-1 rounded-full"
              style={{
                background: 'var(--surface-2)',
                color: 'var(--text-2)',
                border: '1px solid var(--border)',
              }}
            >
              {dosage}
            </span>
            <span
              className="text-xs px-3 py-1 rounded-full"
              style={{
                background: 'var(--surface-2)',
                color: 'var(--text-2)',
                border: '1px solid var(--border)',
              }}
            >
              {frequency}
            </span>
          </div>

          {/* Provider + date row */}
          {(providerName || approvedAt) && (
            <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: 'var(--text-2)' }}>
              {providerName && (
                <span className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  {providerName}
                </span>
              )}
              {approvedAt && (
                <span className="flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Approved {new Date(approvedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right: status badge */}
        <div className="flex-shrink-0">
          <span
            className="text-xs font-medium px-3.5 py-1.5 rounded-full"
            style={statusBadgeStyle(status)}
          >
            {status === 'active' && (
              <span
                className="inline-block w-1.5 h-1.5 rounded-full mr-1.5"
                style={{ background: 'var(--teal)', verticalAlign: 'middle' }}
              />
            )}
            {STATUS_LABELS[status]}
          </span>
        </div>
      </div>
    </div>
  )
}
