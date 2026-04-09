'use client'

import { useState } from 'react'
import Link from 'next/link'

/* ─── Types ─────────────────────────────────────────────────────── */
interface Intake {
  id: string
  goals: string[]
  contraindications: string[]
  experience_level: string
  created_at: string
  recommended_protocols: string[]
  profiles: {
    full_name: string | null
    state: string | null
  }
}

interface Peptide {
  id: string
  name: string
  slug: string
}

/* ─── Intake Card ─────────────────────────────────────────────── */
function IntakeCard({ intake, peptide }: { intake: Intake; peptide?: Peptide }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [actionTaken, setActionTaken] = useState(false)

  async function handleApprove() {
    setLoading('approve')
    try {
      const res = await fetch('/api/prescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'approve',
          intakeId: intake.id,
          dosage: 'As directed',
          notes: 'Approved via provider dashboard',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setActionTaken(true)
      } else {
        alert('Error: ' + (data.error || 'Failed to approve'))
      }
    } catch (err) {
      alert('Something went wrong')
    } finally {
      setLoading(null)
    }
  }

  async function handleDeny() {
    setLoading('deny')
    try {
      const res = await fetch('/api/prescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'deny',
          intakeId: intake.id,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setActionTaken(true)
      } else {
        alert('Error: ' + (data.error || 'Failed to deny'))
      }
    } catch (err) {
      alert('Something went wrong')
    } finally {
      setLoading(null)
    }
  }

  if (actionTaken) {
    return (
      <div className="bg-green-50 rounded-2xl p-6 border border-green-300">
        <p className="text-green-700 font-semibold flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Action completed. This intake has been processed.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB]">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="font-semibold text-base text-[#131811]">
              {intake.profiles?.full_name || 'Unknown'}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F6F8F6] text-[#6B7280]">
              {intake.profiles?.state || 'N/A'}
            </span>
            <span className="text-xs text-[#9CA3AF]">
              {intake.profiles?.state ? `${intake.profiles.state}` : ''}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 mb-2 text-sm text-[#6B7280]">
            <span><strong className="text-[#131811]">Goals:</strong> {intake.goals?.join(', ') || 'None'}</span>
            <span><strong className="text-[#131811]">Experience:</strong> {intake.experience_level || 'N/A'}</span>
          </div>

          {peptide && (
            <p className="text-sm text-[#D4A574] font-semibold mb-2">
              Recommended: {peptide.name}
            </p>
          )}

          {intake.contraindications && intake.contraindications.length > 0 && (
            <div className="mt-3 bg-amber-50 px-4 py-3 rounded-xl text-sm text-amber-800 flex items-start gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5" aria-hidden="true">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span><strong>Contraindications:</strong> {intake.contraindications.join(', ')}</span>
            </div>
          )}

          <p className="text-xs text-[#9CA3AF] mt-3">
            Submitted: {new Date(intake.created_at).toLocaleString()}
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDeny}
            disabled={!!loading}
            className="px-5 py-2.5 rounded-full border border-[#E5E7EB] bg-white text-[#131811] text-sm font-semibold hover:bg-[#F6F8F6] transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === 'deny' ? 'Processing...' : 'Deny'}
          </button>
          <button
            onClick={handleApprove}
            disabled={!!loading}
            className="px-5 py-2.5 rounded-full bg-[#D4A574] text-white text-sm font-semibold hover:bg-[#B8864A] transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === 'approve' ? 'Processing...' : 'Approve'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function ProviderDashboardClient({ intakes, peptides, providerName }: {
  intakes: Intake[]
  peptides: Peptide[]
  providerName: string
}) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2">
          Provider Dashboard
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-normal tracking-tight text-[#131811] mb-2">
          Review Queue
        </h1>
        <p className="text-sm text-[#6B7280]">
          {intakes?.length || 0} pending intake{intakes?.length !== 1 ? 's' : ''}
        </p>
      </div>

      {intakes && intakes.length > 0 ? (
        <div className="flex flex-col gap-4">
          {intakes.map((intake) => {
            const peptide = peptides?.find(p => p.id === intake.recommended_protocols?.[0])
            return <IntakeCard key={intake.id} intake={intake} peptide={peptide} />
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E5E7EB]">
          <div className="w-14 h-14 rounded-full bg-[#F6F8F6] flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" aria-hidden="true">
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
              <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
            </svg>
          </div>
          <p className="text-[#6B7280]">No pending intakes. Check back later.</p>
        </div>
      )}
    </div>
  )
}
