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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    label: 'Compounding & Dispensing',
    description: 'Custom-dosed peptides from a PCAB-accredited compounding pharmacy.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0H5a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2v-4a2 2 0 00-2-2h-4" />
      </svg>
    ),
  },
  {
    label: 'Temperature-Controlled Shipping',
    description: 'Discreet, refrigerated delivery direct to your door every 30 days.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
    alert('In production, this would redirect to Stripe billing portal.')
  }

  function handleCancelConfirm() {
    setCancelled(true)
    setShowCancelModal(false)
  }

  const effectiveStatus = cancelled ? 'cancelled' : MOCK_SUBSCRIPTION.status

  return (
    <>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2">
            Patient Dashboard
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-normal tracking-tight text-[#131811]">
            Subscription
          </h1>
        </div>

        {/* Current Plan Card */}
        <div className={`bg-white rounded-2xl p-7 mb-5 border ${
          effectiveStatus === 'active' ? 'border-[#D4A574]' : 'border-[#E5E7EB]'
        }`}>
          {/* Plan header */}
          <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2">
                Current Plan
              </p>
              <h2 className="text-2xl font-semibold text-[#131811] mb-2">
                {MOCK_SUBSCRIPTION.peptideName}
              </h2>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-4xl font-normal text-[#131811]">
                  ${MOCK_SUBSCRIPTION.amount}
                </span>
                <span className="text-sm text-[#6B7280]">/month</span>
              </div>
            </div>

            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              effectiveStatus === 'active'
                ? 'bg-green-50 text-green-700'
                : 'bg-[#F6F8F6] text-[#6B7280]'
            }`}>
              {effectiveStatus === 'active' ? 'Active' : 'Cancelled'}
            </span>
          </div>

          {/* Next billing */}
          {effectiveStatus === 'active' && (
            <div className="flex items-center gap-2 text-sm text-[#6B7280] pb-6 border-b border-[#E5E7EB] mb-6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Next billing on{' '}
              <span className="text-[#131811] font-semibold">
                {new Date(MOCK_SUBSCRIPTION.nextBillingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          )}

          {/* Cancelled notice */}
          {effectiveStatus === 'cancelled' && (
            <div className="flex items-center gap-2 text-sm text-red-600 px-4 py-3 bg-red-50 rounded-xl mb-6" role="alert">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
            className={`w-full px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-colors duration-200 ${
              effectiveStatus === 'cancelled'
                ? 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                : 'bg-[#D4A574] text-white hover:bg-[#B8864A] cursor-pointer'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            Manage Billing
          </button>
        </div>

        {/* What's Included */}
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF] mb-5">
            What&apos;s Included
          </h2>

          <div className="flex flex-col gap-4">
            {INCLUDED_ITEMS.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F5F0E8] text-[#D4A574] flex items-center justify-center shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#131811] mb-0.5">
                    {item.label}
                  </div>
                  <div className="text-xs text-[#6B7280]">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cancel Section */}
        {effectiveStatus === 'active' && (
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-sm font-semibold text-[#131811]">
                  Cancel Subscription
                </div>
                <div className="text-xs text-[#6B7280]">
                  Your prescription will be paused. You can reactivate at any time.
                </div>
              </div>
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-4 py-2 rounded-full border border-red-200 bg-transparent text-red-600 text-sm font-medium hover:bg-red-50 transition-colors duration-200 cursor-pointer"
              >
                Cancel subscription
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50"
          onClick={() => setShowCancelModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-modal-title"
        >
          <div
            className="bg-white border border-red-200 rounded-2xl p-8 max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" aria-hidden="true">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <h3 id="cancel-modal-title" className="text-2xl font-semibold text-[#131811] mb-3">
              Cancel subscription?
            </h3>
            <p className="text-sm text-[#6B7280] mb-6">
              Are you sure? Your prescription will be paused and your next shipment will not be processed. You can reactivate at any time from your account.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-5 py-2.5 rounded-full border border-[#E5E7EB] bg-transparent text-[#131811] font-medium hover:bg-[#F6F8F6] transition-colors duration-200 cursor-pointer"
              >
                Keep subscription
              </button>
              <button
                onClick={handleCancelConfirm}
                className="flex-1 px-5 py-2.5 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200 cursor-pointer"
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
