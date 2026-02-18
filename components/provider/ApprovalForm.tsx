'use client'

import { useState } from 'react'

interface Props {
  submissionId: string
  suggestedPeptideId: string
  onApprove: (data: { dosage: string; frequency: string; notes: string }) => Promise<void>
  onDeny: (reason: string) => Promise<void>
  onRequestInfo: (message: string) => Promise<void>
}

type Action = 'approve' | 'deny' | 'info' | null

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  background: 'var(--surface-3)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '13px',
  color: 'var(--text)',
  outline: 'none',
  fontFamily: 'inherit',
  resize: 'vertical' as const,
}

export default function ApprovalForm({ onApprove, onDeny, onRequestInfo }: Props) {
  const [action, setAction] = useState<Action>(null)
  const [dosage, setDosage] = useState('')
  const [frequency, setFrequency] = useState('')
  const [notes, setNotes] = useState('')
  const [reason, setReason] = useState('')
  const [infoRequest, setInfoRequest] = useState('')

  function actionButtonStyle(btn: NonNullable<Action>): React.CSSProperties {
    const colors: Record<NonNullable<Action>, { color: string; bg: string; dimBg: string; border: string }> = {
      approve: { color: '#2DD6A8', bg: '#2DD6A8', dimBg: 'rgba(45,214,168,0.12)', border: 'rgba(45,214,168,0.4)' },
      deny:    { color: '#E87070', bg: '#E87070', dimBg: 'rgba(232,112,112,0.12)', border: 'rgba(232,112,112,0.4)' },
      info:    { color: '#D4975A', bg: '#D4975A', dimBg: 'rgba(212,151,90,0.12)',  border: 'rgba(212,151,90,0.4)' },
    }
    const c = colors[btn]
    const isActive = action === btn
    return {
      padding: '9px 18px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: `1px solid ${isActive ? c.border : 'var(--border)'}`,
      background: isActive ? c.dimBg : 'transparent',
      color: isActive ? c.color : 'var(--text-2)',
      fontFamily: 'inherit',
    }
  }

  function confirmButtonStyle(variant: 'approve' | 'deny' | 'info', disabled?: boolean): React.CSSProperties {
    const colors = {
      approve: '#2DD6A8',
      deny:    '#E87070',
      info:    '#D4975A',
    }
    return {
      width: '100%',
      padding: '11px',
      borderRadius: '8px',
      fontSize: '13px',
      fontWeight: 700,
      cursor: disabled ? 'not-allowed' : 'pointer',
      border: 'none',
      background: colors[variant],
      color: '#06060F',
      opacity: disabled ? 0.4 : 1,
      transition: 'opacity 0.2s',
      fontFamily: 'inherit',
      letterSpacing: '0.02em',
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Action Selection */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => setAction('approve')} style={actionButtonStyle('approve')}>
          Approve
        </button>
        <button onClick={() => setAction('deny')} style={actionButtonStyle('deny')}>
          Deny
        </button>
        <button onClick={() => setAction('info')} style={actionButtonStyle('info')}>
          Request Info
        </button>
      </div>

      {/* Approve Form */}
      {action === 'approve' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-2)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Dosage
            </label>
            <input
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="e.g. 300mcg"
              style={INPUT_STYLE}
            />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-2)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Frequency
            </label>
            <input
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              placeholder="e.g. Once daily at night"
              style={INPUT_STYLE}
            />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-2)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Notes for Patient
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional instructions or guidance..."
              rows={4}
              style={{ ...INPUT_STYLE, resize: 'vertical' }}
            />
          </div>
          <button
            onClick={() => onApprove({ dosage, frequency, notes })}
            style={confirmButtonStyle('approve')}
          >
            Confirm Approval
          </button>
        </div>
      )}

      {/* Deny Form */}
      {action === 'deny' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-2)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Reason for Denial
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Required — explain the reason for denial..."
              rows={4}
              required
              style={{ ...INPUT_STYLE, resize: 'vertical' }}
            />
          </div>
          <button
            onClick={() => onDeny(reason)}
            disabled={!reason.trim()}
            style={confirmButtonStyle('deny', !reason.trim())}
          >
            Confirm Denial
          </button>
        </div>
      )}

      {/* Request Info Form */}
      {action === 'info' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '11px', color: 'var(--text-2)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Information Needed
            </label>
            <textarea
              value={infoRequest}
              onChange={(e) => setInfoRequest(e.target.value)}
              placeholder="What additional information do you need from the patient?"
              rows={4}
              style={{ ...INPUT_STYLE, resize: 'vertical' }}
            />
          </div>
          <button
            onClick={() => onRequestInfo(infoRequest)}
            style={confirmButtonStyle('info')}
          >
            Send Request
          </button>
        </div>
      )}
    </div>
  )
}
