'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CATEGORY_META, type Peptide } from '@/lib/peptide-data'

interface Props {
  peptide: Peptide
}

export default function PrescriptionPanel({ peptide }: Props) {
  const meta = CATEGORY_META[peptide.category]
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleStartConsultation() {
    setLoading(true)
    // Route to quiz with peptide pre-selected, or to checkout
    // For prototype: send to quiz
    router.push(`/quiz?peptide=${peptide.slug}`)
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'var(--surface)',
        border: `1px solid ${meta.border}`,
        boxShadow: `0 0 60px ${meta.dim}`,
      }}
    >
      {/* Header accent bar */}
      <div className="h-1" style={{ background: meta.accent }} />

      <div className="p-7">
        {/* Price */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-3)' }}>
            Monthly subscription
          </p>
          <div className="flex items-end gap-1">
            <span
              className="font-display"
              style={{ fontSize: 52, fontWeight: 300, color: 'var(--text)', lineHeight: 1 }}
            >
              ${peptide.priceMonthly}
            </span>
            <span className="text-sm pb-1" style={{ color: 'var(--text-2)' }}>/month</span>
          </div>
          <p className="text-xs mt-1.5" style={{ color: 'var(--text-3)' }}>
            Includes physician consultation, prescription, and shipping
          </p>
        </div>

        {/* Divider */}
        <div className="mb-6" style={{ borderTop: '1px solid var(--border)' }} />

        {/* Protocol specs */}
        <div className="space-y-3 mb-7">
          {[
            { icon: '💊', label: 'Dosage', value: peptide.dosageRange },
            { icon: '📍', label: 'Route', value: peptide.deliveryMethod.split('(')[0].trim() },
            { icon: '🔄', label: 'Cycle', value: peptide.cycleLength },
          ].map((row) => (
            <div key={row.label} className="flex items-start justify-between gap-3">
              <span className="text-xs" style={{ color: 'var(--text-3)' }}>
                {row.label}
              </span>
              <span className="text-xs text-right font-medium" style={{ color: 'var(--text-2)', maxWidth: 180 }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <button
          onClick={handleStartConsultation}
          disabled={loading}
          className="w-full py-4 rounded-xl text-sm font-medium transition-all mb-3"
          style={{
            background: meta.accent,
            color: '#06060F',
            boxShadow: `0 0 28px ${meta.dim}`,
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Redirecting…' : 'Start Consultation'}
        </button>

        {/* Secondary CTA */}
        <Link
          href="/quiz"
          className="w-full py-3.5 rounded-xl text-sm font-medium text-center block transition-colors"
          style={{
            border: '1px solid var(--border)',
            color: 'var(--text-2)',
          }}
        >
          Take the intake quiz first
        </Link>

        {/* Trust micro-copy */}
        <div className="mt-6 space-y-2.5">
          {[
            'Physician review within 48 hours',
            'Cancel or pause anytime',
            'Refunded if prescription is denied',
            'HIPAA-compliant data handling',
          ].map((line) => (
            <div key={line} className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--teal)', flexShrink: 0 }}>
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span className="text-xs" style={{ color: 'var(--text-3)' }}>{line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FDA disclaimer */}
      {peptide.fdaStatus !== 'approved' && (
        <div
          className="px-7 py-4 text-xs leading-relaxed"
          style={{
            background: 'rgba(0,0,0,0.2)',
            borderTop: '1px solid var(--border)',
            color: 'var(--text-3)',
          }}
        >
          This is a research compound. All prescriptions are issued by a licensed physician following a medical review. For educational purposes only — not FDA-evaluated for this indication.
        </div>
      )}
    </div>
  )
}
