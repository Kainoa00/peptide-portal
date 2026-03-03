'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

const ACCENT = '#D4A574'
const ACCENT_LIGHT = '#F5F0E8'

/* ─── Types ─────────────────────────────────────────────────────── */
interface PatientIntake {
  id: string
  user_id: string
  goals: string[]
  experience_level: string
  status: string
  created_at: string
  full_name?: string
  email?: string
}

/* ─── Mock Data ──────────────────────────────────────────────────── */
const MOCK_PENDING = [
  { id: '1', name: 'John D.', email: 'john@email.com', goals: ['weight_loss'], submitted: '2 hours ago' },
  { id: '2', name: 'Sarah M.', email: 'sarah@email.com', goals: ['longevity'], submitted: '5 hours ago' },
  { id: '3', name: 'Mike T.', email: 'mike@email.com', goals: ['recovery'], submitted: '1 day ago' },
]

const MOCK_ACTIVE = [
  { id: '1', name: 'Robert K.', protocol: 'Tirzepatide', status: 'active', since: 'Jan 15' },
  { id: '2', name: 'Lisa P.', protocol: 'CJC-1295/Ipamorelin', status: 'active', since: 'Jan 22' },
  { id: '3', name: 'David L.', protocol: 'Semax', status: 'active', since: 'Feb 1' },
]

/* ─── Page ───────────────────────────────────────────────────────── */
export default function ProviderDashboard() {
  const [pending, setPending] = useState(MOCK_PENDING)
  const [active, setActive] = useState(MOCK_ACTIVE)
  const [showReview, setShowReview] = useState<string | null>(null)

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #E5E5E5',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>P</span>
          </div>
          <span style={{ fontWeight: 600, fontSize: '18px', color: '#1A1A1A' }}>Provider Dashboard</span>
        </div>
        <button style={{
          padding: '8px 16px',
          background: 'transparent',
          border: '1px solid #E5E5E5',
          borderRadius: '8px',
          fontSize: '14px',
          color: '#666',
          cursor: 'pointer',
        }}>
          Sign Out
        </button>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Pending Reviews', value: '3', color: '#D97706' },
            { label: 'Active Patients', value: '24', color: ACCENT },
            { label: 'This Month', value: '$4,896', color: '#16A34A' },
            { label: 'Prescriptions', value: '31', color: '#1A1A1A' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #E5E5E5' }}>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Pending Reviews */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E5E5E5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1A1A1A' }}>Pending Reviews</h2>
              <span style={{ background: '#FEF3C7', color: '#D97706', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>
                {pending.length} New
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pending.map(patient => (
                <div key={patient.id} style={{
                  padding: '16px',
                  background: '#FAFAF8',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1A1A1A', marginBottom: '4px' }}>{patient.name}</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>Goals: {patient.goals.join(', ')} • {patient.submitted}</div>
                  </div>
                  <button
                    onClick={() => setShowReview(patient.id)}
                    style={{
                      padding: '8px 16px',
                      background: ACCENT,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Patients */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #E5E5E5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1A1A1A' }}>Active Patients</h2>
              <span style={{ background: ACCENT_LIGHT, color: ACCENT, padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>
                {active.length} Active
              </span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {active.map(patient => (
                <div key={patient.id} style={{
                  padding: '16px',
                  background: '#FAFAF8',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div>
                    <div style={{ fontWeight: 600, color: '#1A1A1A', marginBottom: '4px' }}>{patient.name}</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>{patient.protocol} • Since {patient.since}</div>
                  </div>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#16A34A',
                  }} />
                </div>
              ))}
            </div>

            <button style={{
              width: '100%',
              marginTop: '16px',
              padding: '12px',
              background: 'transparent',
              border: '1px solid #E5E5E5',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#666',
              cursor: 'pointer',
            }}>
              View All Patients →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1A1A1A', marginBottom: '16px' }}>Quick Actions</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { label: 'Review Pending', icon: '📋' },
              { label: 'Send Message', icon: '💬' },
              { label: 'View Analytics', icon: '📊' },
              { label: 'Settings', icon: '⚙️' },
            ].map(action => (
              <button key={action.label} style={{
                padding: '12px 20px',
                background: '#fff',
                border: '1px solid #E5E5E5',
                borderRadius: '10px',
                fontSize: '14px',
                color: '#1A1A1A',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span>{action.icon}</span> {action.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
