'use client'

import { useState } from 'react'

const ACCENT = '#D4A574'
const ACCENT_DARK = '#8B7355'
const ACCENT_LIGHT = '#F5F0E8'

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

/* ─── Page ───────────────────────────────────────────────────────── */
export default function SubscriptionPage() {
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  async function handleManageBilling() {
    // Demo mode - show alert
    alert('In production, this would redirect to Stripe billing portal.')
  }

  function handleCancelConfirm() {
    setCancelled(true)
    setShowCancelModal(false)
  }

  const effectiveStatus = cancelled ? 'cancelled' : MOCK_SUBSCRIPTION.status

  return (
    <>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '8px' }}>
            Patient Dashboard
          </p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1 }}>
            Subscription
          </h1>
        </div>

        {/* Current Plan Card */}
        <div style={{
          background: '#fff',
          border: `1px solid ${effectiveStatus === 'active' ? ACCENT : '#E5E5E5'}`,
          borderRadius: '20px',
          padding: '28px 32px',
          marginBottom: '20px',
        }}>
          {/* Plan header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '8px' }}>
                Current Plan
              </p>
              <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#1A1A1A', marginBottom: '8px' }}>
                {MOCK_SUBSCRIPTION.peptideName}
              </h2>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '38px', fontWeight: 700, color: '#1A1A1A', lineHeight: 1 }}>
                  ${MOCK_SUBSCRIPTION.amount}
                </span>
                <span style={{ fontSize: '14px', color: '#666' }}>/month</span>
              </div>
            </div>

            {/* Status badge */}
            <span style={{
              fontSize: '12px',
              fontWeight: 600,
              padding: '6px 14px',
              borderRadius: '20px',
              background: effectiveStatus === 'active' ? ACCENT_LIGHT : '#F5F5F5',
              color: effectiveStatus === 'active' ? ACCENT_DARK : '#888',
            }}>
              {effectiveStatus === 'active' ? '● Active' : 'Cancelled'}
            </span>
          </div>

          {/* Next billing */}
          {effectiveStatus === 'active' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: '#666',
              paddingBottom: '24px',
              borderBottom: '1px solid #E5E5E5',
              marginBottom: '24px',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Next billing on{' '}
              <span style={{ color: '#1A1A1A', fontWeight: 600 }}>
                {new Date(MOCK_SUBSCRIPTION.nextBillingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          )}

          {/* Cancelled notice */}
          {effectiveStatus === 'cancelled' && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: '#DC2626',
              padding: '12px 16px',
              background: '#FEF2F2',
              borderRadius: '12px',
              marginBottom: '24px',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              Your subscription has been cancelled. Your prescription is paused.
            </div>
          )}

          {/* Manage Billing button */}
          <button
            onClick={handleManageBilling}
            disabled={effectiveStatus === 'cancelled'}
            style={{
              width: '100%',
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              background: effectiveStatus === 'cancelled' ? '#E5E5E5' : ACCENT,
              color: effectiveStatus === 'cancelled' ? '#888' : '#fff',
              fontSize: '14px',
              fontWeight: 600,
              cursor: effectiveStatus === 'cancelled' ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            Manage Billing
          </button>
        </div>

        {/* What's Included */}
        <div style={{
          background: '#fff',
          border: '1px solid #E5E5E5',
          borderRadius: '20px',
          padding: '24px 28px',
          marginBottom: '20px',
        }}>
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
            What&apos;s Included
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {INCLUDED_ITEMS.map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '9px',
                  background: ACCENT_LIGHT,
                  color: ACCENT,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A', marginBottom: '2px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cancel Section */}
        {effectiveStatus === 'active' && (
          <div style={{
            background: '#fff',
            border: '1px solid #E5E5E5',
            borderRadius: '20px',
            padding: '20px 28px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>
                  Cancel Subscription
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Your prescription will be paused. You can reactivate at any time.
                </div>
              </div>
              <button
                onClick={() => setShowCancelModal(true)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '9px',
                  border: '1px solid rgba(232,112,112,0.3)',
                  background: 'transparent',
                  color: '#DC2626',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Cancel subscription
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: 'rgba(0,0,0,0.5)',
        }} onClick={() => setShowCancelModal(false)}>
          <div style={{
            background: '#fff',
            border: '1px solid #FECACA',
            borderRadius: '20px',
            padding: '32px 28px',
            maxWidth: '440px',
            width: '100%',
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#FEF2F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <h3 style={{ fontSize: '26px', fontWeight: 700, color: '#1A1A1A', marginBottom: '12px' }}>
              Cancel subscription?
            </h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
              Are you sure? Your prescription will be paused and your next shipment will not be processed. You can reactivate at any time from your account.
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowCancelModal(false)}
                style={{
                  flex: 1,
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: '1px solid #E5E5E5',
                  background: 'transparent',
                  color: '#1A1A1A',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Keep subscription
              </button>
              <button
                onClick={handleCancelConfirm}
                style={{
                  flex: 1,
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: '1px solid #FECACA',
                  background: '#FEF2F2',
                  color: '#DC2626',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Yes, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
