const STAGES = ['processing', 'compounding', 'shipped', 'delivered'] as const
type Stage = typeof STAGES[number]

const STAGE_ICONS: Record<Stage, React.ReactNode> = {
  processing: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  compounding: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0H5a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2v-4a2 2 0 00-2-2h-4" />
    </svg>
  ),
  shipped: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  delivered: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
}

interface Props {
  currentStage: Stage
}

export default function FulfillmentTracker({ currentStage }: Props) {
  const currentIndex = STAGES.indexOf(currentStage)

  return (
    <div>
      {/* Desktop: horizontal stepper */}
      <div className="hidden sm:flex items-center">
        {STAGES.map((stage, i) => {
          const isCompleted = i < currentIndex
          const isActive = i === currentIndex
          const isFuture = i > currentIndex

          return (
            <div key={stage} className="flex items-center" style={{ flex: i < STAGES.length - 1 ? 1 : 'none' }}>
              {/* Stage node */}
              <div className="flex flex-col items-center gap-2" style={{ minWidth: 56 }}>
                {/* Circle */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    ...(isActive
                      ? {
                          background: 'var(--teal)',
                          color: '#06060F',
                          boxShadow: '0 0 16px rgba(45,214,168,0.45), 0 0 32px rgba(45,214,168,0.2)',
                        }
                      : isCompleted
                      ? {
                          background: 'var(--teal-dim)',
                          color: 'var(--teal)',
                          border: '1px solid var(--border-teal)',
                        }
                      : {
                          background: 'var(--surface-3)',
                          color: 'var(--text-3)',
                          border: '1px solid var(--border)',
                        }),
                  }}
                >
                  {STAGE_ICONS[stage]}
                </div>

                {/* Label */}
                <span
                  className="text-xs capitalize text-center"
                  style={{
                    color: isActive ? 'var(--teal)' : isCompleted ? 'var(--text-2)' : 'var(--text-3)',
                    fontWeight: isActive ? 500 : 400,
                    letterSpacing: '0.02em',
                  }}
                >
                  {stage}
                </span>
              </div>

              {/* Connector line */}
              {i < STAGES.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 1,
                    marginBottom: 20, // align with circle centers
                    background: isCompleted
                      ? 'linear-gradient(90deg, var(--teal), rgba(45,214,168,0.4))'
                      : 'var(--surface-3)',
                    transition: 'background 0.4s ease',
                    minWidth: 24,
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile: vertical list */}
      <div className="flex sm:hidden flex-col gap-3">
        {STAGES.map((stage, i) => {
          const isCompleted = i < currentIndex
          const isActive = i === currentIndex

          return (
            <div key={stage} className="flex items-center gap-3">
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  ...(isActive
                    ? {
                        background: 'var(--teal)',
                        color: '#06060F',
                        boxShadow: '0 0 12px rgba(45,214,168,0.4)',
                      }
                    : isCompleted
                    ? {
                        background: 'var(--teal-dim)',
                        color: 'var(--teal)',
                        border: '1px solid var(--border-teal)',
                      }
                    : {
                        background: 'var(--surface-3)',
                        color: 'var(--text-3)',
                        border: '1px solid var(--border)',
                      }),
                }}
              >
                {STAGE_ICONS[stage]}
              </div>
              <span
                className="text-sm capitalize"
                style={{
                  color: isActive ? 'var(--teal)' : isCompleted ? 'var(--text-2)' : 'var(--text-3)',
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {stage}
                {isActive && (
                  <span
                    className="ml-2 text-xs px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--teal-dim)', color: 'var(--teal)' }}
                  >
                    In progress
                  </span>
                )}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
