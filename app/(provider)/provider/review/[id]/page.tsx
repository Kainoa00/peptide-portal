'use client'

import { useState } from 'react'
import Link from 'next/link'
import IntakeReviewPanel from '@/components/provider/IntakeReviewPanel'
import ApprovalForm from '@/components/provider/ApprovalForm'

// ─── Mock Data ─────────────────────────────────────────────────────────────
const MOCK_SUBMISSION_DETAIL = {
  id: 'sub-001',
  patientName: 'James Whitfield',
  state: 'TX',
  age: '34',
  goals: ['recovery', 'longevity'],
  experienceLevel: 'intermediate',
  activityLevel: 'active',
  sleepQuality: 'fair',
  weight: '185 lbs',
  height: "5'11\"",
  medicalHistory: { cancer: false, diabetes: false, thyroid: false, cardiovascular: false, pregnancy: false },
  currentMedications: 'None',
  contraindications: [] as string[],
  recommendedProtocol: 'CJC-1295 / Ipamorelin',
  recommendedProtocolSlug: 'cjc-1295-ipamorelin',
  submittedAt: '2026-02-17T09:14:00Z',
}

// ─── Types ─────────────────────────────────────────────────────────────────
type DecisionState =
  | { type: 'idle' }
  | { type: 'approved'; dosage: string; frequency: string; notes: string }
  | { type: 'denied'; reason: string }
  | { type: 'info_requested'; message: string }

// ─── Page ──────────────────────────────────────────────────────────────────
export default function IntakeReviewPage() {
  const sub = MOCK_SUBMISSION_DETAIL
  const [decision, setDecision] = useState<DecisionState>({ type: 'idle' })

  const submittedDate = new Date(sub.submittedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  async function handleApprove(data: { dosage: string; frequency: string; notes: string }) {
    // Mock handler — no real API call
    setDecision({ type: 'approved', ...data })
  }

  async function handleDeny(reason: string) {
    setDecision({ type: 'denied', reason })
  }

  async function handleRequestInfo(message: string) {
    setDecision({ type: 'info_requested', message })
  }

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', padding: '40px 32px' }}>

      {/* Back Link */}
      <Link
        href="/provider/dashboard"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '13px',
          color: 'var(--text-2)',
          textDecoration: 'none',
          marginBottom: '28px',
          transition: 'color 0.2s',
        }}
      >
        ← Queue
      </Link>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px', alignItems: 'start' }}>

        {/* ── LEFT: Patient Detail ── */}
        <div>
          {/* Patient Header */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 600, color: 'var(--text)', margin: '0 0 6px 0', letterSpacing: '-0.01em' }}>
                  {sub.patientName}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-2)' }}>
                    {sub.state} · Age {sub.age}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-3)' }}>
                    Submitted {submittedDate}
                  </span>
                </div>
              </div>

              {/* Protocol Chip */}
              <div
                style={{
                  background: 'var(--amber-dim)',
                  border: '1px solid rgba(212,151,90,0.3)',
                  borderRadius: '10px',
                  padding: '10px 16px',
                  flexShrink: 0,
                }}
              >
                <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--amber)', margin: '0 0 4px 0' }}>
                  Recommended Protocol
                </p>
                <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', margin: 0 }}>
                  {sub.recommendedProtocol}
                </p>
              </div>
            </div>
          </div>

          {/* Intake Review Panel */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '28px',
            }}
          >
            <h2
              style={{
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-2)',
                margin: '0 0 24px 0',
              }}
            >
              Intake Assessment
            </h2>
            <IntakeReviewPanel
              data={{
                patientName: sub.patientName,
                state: sub.state,
                age: sub.age,
                goals: sub.goals,
                experienceLevel: sub.experienceLevel,
                activityLevel: sub.activityLevel,
                sleepQuality: sub.sleepQuality,
                weight: sub.weight,
                height: sub.height,
                medicalHistory: sub.medicalHistory,
                contraindications: sub.contraindications,
                currentMedications: sub.currentMedications,
              }}
            />
          </div>
        </div>

        {/* ── RIGHT: Decision Panel ── */}
        <div style={{ position: 'sticky', top: '40px' }}>
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderTop: '3px solid var(--amber)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <h2
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: 'var(--text)',
                margin: '0 0 20px 0',
              }}
            >
              Prescription Decision
            </h2>

            {/* Decision Result */}
            {decision.type === 'approved' && (
              <div
                style={{
                  background: 'var(--teal-dim)',
                  border: '1px solid rgba(37,87,54,0.3)',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '20px',
                }}
              >
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--teal)', margin: '0 0 10px 0' }}>
                  Prescription Approved
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-2)', margin: '4px 0' }}>Dosage: {decision.dosage || '—'}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-2)', margin: '4px 0' }}>Frequency: {decision.frequency || '—'}</p>
                {decision.notes && (
                  <p style={{ fontSize: '12px', color: 'var(--text-2)', margin: '8px 0 0 0' }}>Notes: {decision.notes}</p>
                )}
              </div>
            )}

            {decision.type === 'denied' && (
              <div
                style={{
                  background: 'var(--rose-dim)',
                  border: '1px solid rgba(232,112,112,0.3)',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '20px',
                }}
              >
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--rose)', margin: '0 0 8px 0' }}>
                  Prescription Denied
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0 }}>Reason: {decision.reason}</p>
              </div>
            )}

            {decision.type === 'info_requested' && (
              <div
                style={{
                  background: 'var(--amber-dim)',
                  border: '1px solid rgba(212,151,90,0.3)',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '20px',
                }}
              >
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--amber)', margin: '0 0 8px 0' }}>
                  Information Requested
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-2)', margin: 0 }}>
                  Message sent to patient. Awaiting their response.
                </p>
              </div>
            )}

            {/* Approval Form */}
            <ApprovalForm
              submissionId={sub.id}
              suggestedPeptideId={sub.recommendedProtocolSlug}
              onApprove={handleApprove}
              onDeny={handleDeny}
              onRequestInfo={handleRequestInfo}
            />
          </div>
        </div>

      </div>
    </main>
  )
}
