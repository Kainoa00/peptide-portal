'use client'

const STAGES = ['processing', 'compounding', 'shipped', 'delivered'] as const
type Stage = typeof STAGES[number]

interface Order {
  id: string
  patientName: string
  peptideName: string
  status: Stage
  trackingNumber: string | null
  updatedAt?: string
}

interface Props {
  orders: Order[]
  onAdvance: (orderId: string, newStatus: Stage) => void
}

const STATUS_STYLE: Record<Stage, React.CSSProperties> = {
  processing: {
    background: 'rgba(53,53,78,0.5)',
    color: 'var(--text-3)',
    border: '1px solid var(--border)',
  },
  compounding: {
    background: 'var(--amber-dim)',
    color: 'var(--amber)',
    border: '1px solid rgba(212,151,90,0.25)',
  },
  shipped: {
    background: 'var(--teal-dim)',
    color: 'var(--teal)',
    border: '1px solid rgba(45,214,168,0.25)',
  },
  delivered: {
    background: 'rgba(45,214,168,0.18)',
    color: '#2DD6A8',
    border: '1px solid rgba(45,214,168,0.35)',
  },
}

const STATUS_LABELS: Record<Stage, string> = {
  processing: 'Processing',
  compounding: 'Compounding',
  shipped: 'Shipped',
  delivered: 'Delivered',
}

const NEXT_STAGE_LABEL: Record<Stage, string | null> = {
  processing: 'Compounding',
  compounding: 'Shipped',
  shipped: 'Delivered',
  delivered: null,
}

export default function OrderStatusTable({ orders, onAdvance }: Props) {
  if (orders.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '48px 24px',
          color: 'var(--text-2)',
          fontSize: '14px',
        }}
      >
        No orders in this category.
      </div>
    )
  }

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr>
            {['Patient', 'Peptide', 'Status', 'Tracking', 'Updated', 'Action'].map((col) => (
              <th
                key={col}
                style={{
                  padding: '10px 16px',
                  textAlign: 'left',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-3)',
                  borderBottom: '1px solid var(--border)',
                  whiteSpace: 'nowrap',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => {
            const nextStageKey = STAGES[STAGES.indexOf(order.status) + 1]
            const nextLabel = NEXT_STAGE_LABEL[order.status]

            return (
              <tr
                key={order.id}
                style={{
                  borderBottom: i < orders.length - 1 ? '1px solid var(--border)' : 'none',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = 'var(--surface-2)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.background = 'transparent' }}
              >
                {/* Patient */}
                <td style={{ padding: '14px 16px', color: 'var(--text)', fontWeight: 500 }}>
                  {order.patientName}
                </td>

                {/* Peptide */}
                <td style={{ padding: '14px 16px', color: 'var(--text-2)' }}>
                  {order.peptideName}
                </td>

                {/* Status Badge */}
                <td style={{ padding: '14px 16px' }}>
                  <span
                    style={{
                      ...STATUS_STYLE[order.status],
                      display: 'inline-block',
                      borderRadius: '100px',
                      padding: '3px 10px',
                      fontSize: '11px',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {STATUS_LABELS[order.status]}
                  </span>
                </td>

                {/* Tracking */}
                <td style={{ padding: '14px 16px', color: 'var(--text-2)', fontSize: '12px', fontFamily: 'monospace' }}>
                  {order.trackingNumber ? (
                    <span style={{ color: 'var(--text-2)' }}>{order.trackingNumber}</span>
                  ) : (
                    <span style={{ color: 'var(--text-3)' }}>—</span>
                  )}
                </td>

                {/* Updated */}
                <td style={{ padding: '14px 16px', color: 'var(--text-3)', fontSize: '12px', whiteSpace: 'nowrap' }}>
                  {order.updatedAt ?? '—'}
                </td>

                {/* Action */}
                <td style={{ padding: '14px 16px' }}>
                  {nextStageKey && nextLabel ? (
                    <button
                      onClick={() => onAdvance(order.id, nextStageKey)}
                      style={{
                        background: 'transparent',
                        border: '1px solid transparent',
                        borderRadius: '6px',
                        padding: '5px 12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--amber)',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s ease',
                        fontFamily: 'inherit',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,151,90,0.4)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'transparent' }}
                    >
                      Mark {nextLabel}
                    </button>
                  ) : (
                    <span style={{ fontSize: '12px', color: 'var(--teal)', fontWeight: 600 }}>
                      Complete
                    </span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
