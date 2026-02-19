'use client'

import { useState } from 'react'

/* ─── Mock Data ──────────────────────────────────────────────────── */
const MOCK_SUBSCRIPTION = {
  peptideName: 'CJC-1295 / Ipamorelin',
  amount: 169,
  nextBillingDate: '2026-03-15',
  status: 'active',
  stripeCustomerId: 'cus_mock123',
}

const INCLUDED_ITEMS = [
  {
    label: 'Physician Review',
    description: 'Board-certified MD reviews your intake and manages your prescription.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    label: 'Compounding & Dispensing',
    description: 'Custom-dosed peptides from a PCAB-accredited compounding pharmacy.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0H5a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2v-4a2 2 0 00-2-2h-4" />
      </svg>
    ),
  },
  {
    label: 'Temperature-Controlled Shipping',
    description: 'Discreet, refrigerated delivery direct to your door every 30 days.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: 'Secure Patient Messaging',
    description: 'HIPAA-compliant direct messaging with your prescribing physician.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
]

/* ─── Cancel Confirmation Modal ──────────────────────────────────── */
interface CancelModalProps {
  onCancel: () => void
  onConfirm: () => void
}

function CancelModal({ onCancel, onConfirm }: CancelModalProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'rgba(13,26,16,0.80)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--rose-dim)',
          borderRadius: 'var(--r-lg)',
          padding: '32px 28px',
          maxWidth: 440,
          width: '100%',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warning icon */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'var(--rose-dim)',
            border: '1px solid rgba(232,112,112,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--rose)' }}>
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h3
          className="font-display mb-2"
          style={{ fontSize: 26, fontWeight: 400, fontStyle: 'italic', color: 'var(--text)' }}
        >
          Cancel subscription?
        </h3>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--text-2)' }}>
          Are you sure? Your prescription will be paused and your next shipment will not be processed.
          You can reactivate at any time from your account.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '10px 20px',
              borderRadius: 10,
              border: '1px solid var(--border-hover)',
              background: 'transparent',
              color: 'var(--text)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-2)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            Keep subscription
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              padding: '10px 20px',
              borderRadius: 10,
              border: '1px solid rgba(232,112,112,0.4)',
              background: 'var(--rose-dim)',
              color: 'var(--rose)',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background 0.2s ease, box-shadow 0.2s ease',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(232,112,112,0.2)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--rose-dim)' }}
          >
            Yes, cancel
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function SubscriptionPage() {
  const [portalLoading, setPortalLoading] = useState(false)
  const [portalError, setPortalError] = useState<string | null>(null)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  const sub = MOCK_SUBSCRIPTION

  async function handleManageBilling() {
    setPortalLoading(true)
    setPortalError(null)
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: sub.stripeCustomerId }),
      })

      if (!res.ok) {
        throw new Error('Failed to open billing portal. Please try again.')
      }

      const { url } = await res.json() as { url: string }
      window.location.href = url
    } catch (err) {
      setPortalError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setPortalLoading(false)
    }
  }

  function handleCancelConfirm() {
    // In production: call POST /api/stripe/cancel
    setCancelled(true)
    setShowCancelModal(false)
  }

  const effectiveStatus = cancelled ? 'cancelled' : sub.status

  return (
    <>
      <main
        style={{
          background: '#fdfcf8',
          minHeight: '100vh',
          padding: '48px 24px 80px',
        }}
      >
        <div style={{ maxWidth: 680, margin: '0 auto' }}>

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
              }}
            >
              Subscription
            </h1>
          </div>

          {/* ── Current Plan Card ── */}
          <div
            className="anim-fade-up d-100 mb-5"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border-teal)',
              borderRadius: 'var(--r-lg)',
              padding: '28px 32px',
            }}
          >
            {/* Plan header */}
            <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--text-3)' }}>
                  Current Plan
                </p>
                <h2
                  className="font-display"
                  style={{ fontSize: 26, fontWeight: 400, fontStyle: 'italic', color: 'var(--text)', marginBottom: 4 }}
                >
                  {sub.peptideName}
                </h2>
                <div className="flex items-baseline gap-1 mt-2">
                  <span
                    className="font-display"
                    style={{ fontSize: 38, fontWeight: 400, color: 'var(--text)', lineHeight: 1 }}
                  >
                    ${sub.amount}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-2)' }}>/month</span>
                </div>
              </div>

              {/* Status badge */}
              <span
                className="text-xs font-medium px-3.5 py-1.5 rounded-full"
                style={
                  effectiveStatus === 'active'
                    ? {
                        background: 'var(--teal-dim)',
                        color: 'var(--teal)',
                        border: '1px solid var(--border-teal)',
                        boxShadow: '0 0 10px rgba(37,87,54,0.15)',
                      }
                    : {
                        background: 'var(--surface-3)',
                        color: 'var(--text-3)',
                        border: '1px solid var(--border)',
                      }
                }
              >
                {effectiveStatus === 'active' ? (
                  <>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--teal)',
                        display: 'inline-block',
                        marginRight: 6,
                        verticalAlign: 'middle',
                      }}
                    />
                    Active
                  </>
                ) : (
                  'Cancelled'
                )}
              </span>
            </div>

            {/* Next billing */}
            {effectiveStatus === 'active' && (
              <div
                className="flex items-center gap-2 text-sm mb-6 pb-6"
                style={{
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--text-2)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Next billing on{' '}
                <span style={{ color: 'var(--text)' }}>
                  {new Date(sub.nextBillingDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            )}

            {/* Cancelled notice */}
            {effectiveStatus === 'cancelled' && (
              <div
                className="flex items-center gap-2 text-sm mb-6 pb-6 rounded-xl px-4 py-3"
                style={{
                  background: 'var(--rose-dim)',
                  border: '1px solid rgba(232,112,112,0.2)',
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--rose)',
                  marginBottom: 16,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                Your subscription has been cancelled. Your prescription is paused.
              </div>
            )}

            {/* Manage Billing button */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleManageBilling}
                disabled={portalLoading || effectiveStatus === 'cancelled'}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  borderRadius: 10,
                  border: 'none',
                  background: effectiveStatus === 'cancelled' ? 'var(--surface-3)' : 'var(--teal)',
                  color: effectiveStatus === 'cancelled' ? 'var(--text-3)' : '#FFFFFF',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: effectiveStatus === 'cancelled' ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.2s ease, box-shadow 0.2s ease',
                  opacity: portalLoading ? 0.7 : 1,
                  boxShadow: effectiveStatus === 'active' ? '0 0 24px rgba(37,87,54,0.2)' : 'none',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {portalLoading ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}>
                      <path d="M21 12a9 9 0 11-6.219-8.56" />
                    </svg>
                    Opening portal...
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    Manage Billing
                  </>
                )}
              </button>

              {portalError && (
                <p className="text-xs text-center" style={{ color: 'var(--rose)' }}>
                  {portalError}
                </p>
              )}
            </div>
          </div>

          {/* ── What's Included ── */}
          <div
            className="anim-fade-up d-200 mb-5"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              padding: '24px 28px',
            }}
          >
            <h2
              className="text-sm font-medium mb-5 uppercase tracking-widest"
              style={{ color: 'var(--text-2)' }}
            >
              What&apos;s Included
            </h2>

            <div className="flex flex-col gap-4">
              {INCLUDED_ITEMS.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 9,
                      background: 'var(--teal-dim)',
                      color: 'var(--teal)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-0.5" style={{ color: 'var(--text)' }}>
                      {item.label}
                    </div>
                    <div className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Danger Zone: Cancel ── */}
          {effectiveStatus === 'active' && (
            <div
              className="anim-fade-up d-300"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)',
                padding: '20px 28px',
              }}
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-sm font-medium mb-0.5" style={{ color: 'var(--text)' }}>
                    Cancel Subscription
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-2)' }}>
                    Your prescription will be paused. You can reactivate at any time.
                  </div>
                </div>
                <button
                  onClick={() => setShowCancelModal(true)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 9,
                    border: '1px solid rgba(232,112,112,0.3)',
                    background: 'transparent',
                    color: 'var(--rose)',
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    fontFamily: 'inherit',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--rose-dim)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                >
                  Cancel subscription
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ── Cancel Modal ── */}
      {showCancelModal && (
        <CancelModal
          onCancel={() => setShowCancelModal(false)}
          onConfirm={handleCancelConfirm}
        />
      )}

      {/* Spin keyframe for loading icon */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}
