'use client'

import Link from 'next/link'
import ProtocolStatus from '@/components/dashboard/ProtocolStatus'
import FulfillmentTracker from '@/components/dashboard/FulfillmentTracker'

/* ─── Mock Data ──────────────────────────────────────────────────── */
const MOCK_PRESCRIPTION = {
  id: 'rx-001',
  peptideName: 'CJC-1295 / Ipamorelin',
  category: 'longevity',
  dosage: '300mcg CJC-1295 + 300mcg Ipamorelin',
  frequency: '5 nights/week, subcutaneous injection',
  status: 'active' as const,
  approvedAt: '2026-01-15',
  providerName: 'Dr. Sarah Chen, MD',
}

const MOCK_ORDER = {
  status: 'shipped' as const,
  trackingNumber: 'USPS-9400111899223456789',
  estimatedDelivery: '2026-02-20',
  updatedAt: '2026-02-17',
}

/* ─── Quick Action Button ────────────────────────────────────────── */
interface ActionButtonProps {
  href: string
  icon: React.ReactNode
  label: string
  description: string
  accent?: string
  accentDim?: string
  accentBorder?: string
}

function ActionButton({ href, icon, label, description, accent, accentDim, accentBorder }: ActionButtonProps) {
  return (
    <Link
      href={href}
      className="group block"
      style={{
        background: 'var(--surface)',
        border: `1px solid ${accentBorder ?? 'var(--border)'}`,
        borderRadius: 'var(--r)',
        padding: '18px 20px',
        textDecoration: 'none',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = `0 0 24px ${accentDim ?? 'rgba(37,87,54,0.1)'}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div className="flex items-center gap-3">
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: accentDim ?? 'var(--teal-dim)',
            color: accent ?? 'var(--teal)',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
            {label}
          </div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>
            {description}
          </div>
        </div>
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2"
          style={{ color: 'var(--text-3)', flexShrink: 0 }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}

/* ─── Empty State ────────────────────────────────────────────────── */
function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-24 anim-fade-up"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-xl)',
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'var(--surface-3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--text-3)' }}>
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
        </svg>
      </div>
      <h3
        className="font-display mb-2"
        style={{ fontSize: 28, fontWeight: 400, fontStyle: 'italic', color: 'var(--text)' }}
      >
        No active protocol
      </h3>
      <p className="text-sm mb-8 max-w-xs" style={{ color: 'var(--text-2)' }}>
        Complete your health assessment to receive a physician-reviewed peptide protocol tailored to your goals.
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
        Start Assessment →
      </Link>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function DashboardPage() {
  const prescription = MOCK_PRESCRIPTION
  const hasProtocol = !!prescription

  return (
    <main
      style={{
        background: '#fdfcf8',
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
            My Protocol
          </h1>
          {prescription && (
            <p className="text-sm" style={{ color: 'var(--text-2)' }}>
              Prescribed by{' '}
              <span style={{ color: 'var(--text)' }}>{prescription.providerName}</span>
            </p>
          )}
        </div>

        {!hasProtocol ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-8">

            {/* ── Protocol Status Card ── */}
            <div className="anim-fade-up d-100">
              <ProtocolStatus
                peptideName={prescription.peptideName}
                dosage={prescription.dosage}
                frequency={prescription.frequency}
                status={prescription.status}
                category={prescription.category}
                providerName={prescription.providerName}
                approvedAt={prescription.approvedAt}
              />
            </div>

            {/* ── Shipment Status ── */}
            <div
              className="anim-fade-up d-200"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-lg)',
                padding: '24px 28px',
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                <div>
                  <h2
                    className="text-base font-medium mb-1"
                    style={{ color: 'var(--text)' }}
                  >
                    Shipment Status
                  </h2>
                  <p className="text-xs" style={{ color: 'var(--text-2)' }}>
                    Est. delivery{' '}
                    <span style={{ color: 'var(--teal)' }}>
                      {new Date(MOCK_ORDER.estimatedDelivery).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </p>
                </div>

                {/* Tracking number */}
                <div
                  className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-2)',
                    fontFamily: 'monospace',
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="3" width="15" height="13" rx="1" />
                    <path d="M16 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  {MOCK_ORDER.trackingNumber}
                </div>
              </div>

              <FulfillmentTracker currentStage={MOCK_ORDER.status} />

              <p className="text-xs mt-5" style={{ color: 'var(--text-3)' }}>
                Last updated {new Date(MOCK_ORDER.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* ── Quick Actions ── */}
            <div className="anim-fade-up d-300">
              <h2
                className="text-sm font-medium mb-4"
                style={{ color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }}
              >
                Quick Actions
              </h2>

              <div className="flex flex-col gap-3">
                <ActionButton
                  href="/dashboard/messages"
                  label="Message Provider"
                  description="Send a message to Dr. Sarah Chen"
                  accent="var(--teal)"
                  accentDim="var(--teal-dim)"
                  accentBorder="var(--border-teal)"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                  }
                />
                <ActionButton
                  href="/dashboard/subscription"
                  label="View Subscription"
                  description="Manage billing and payment details"
                  accent="var(--amber)"
                  accentDim="var(--amber-dim)"
                  accentBorder="rgba(212,151,90,0.25)"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                  }
                />
                <ActionButton
                  href="/catalog"
                  label="Browse Catalog"
                  description="Explore available peptide protocols"
                  accent="var(--text-2)"
                  accentDim="rgba(108,108,139,0.12)"
                  accentBorder="var(--border)"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  }
                />
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  )
}
