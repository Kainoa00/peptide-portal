'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

const ACCENT = '#D4A574'

export default function ProviderSignupPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    clinicName: '',
    specialty: '',
    state: 'UT',
    licenseNumber: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // In production, this would create a provider record in the database
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#D4A574', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px', color: '#1A1A1A' }}>
            Thank You!
          </h1>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>
            We've received your request. Our team will contact you within 24 hours to schedule your onboarding call.
          </p>
          <Link href="/" style={{ color: ACCENT, fontWeight: 600, textDecoration: 'none' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #E5E5E5', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>P</span>
            </div>
            <span style={{ fontWeight: 600, fontSize: '18px', color: '#1A1A1A' }}>Peptide Portal</span>
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px', color: '#1A1A1A' }}>
            Start Your Pilot
          </h1>
          <p style={{ fontSize: '16px', color: '#666' }}>
            30 days free. No credit card required.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1A1A1A' }}>
                First Name
              </label>
              <input
                type="text"
                required
                value={form.firstName}
                onChange={e => setForm({ ...form, firstName: e.target.value })}
                style={{ width: '100%', padding: '12px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '10px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1A1A1A' }}>
                Last Name
              </label>
              <input
                type="text"
                required
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
                style={{ width: '100%', padding: '12px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '10px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1A1A1A' }}>
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={{ width: '100%', padding: '12px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '10px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1A1A1A' }}>
              Phone
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              style={{ width: '100%', padding: '12px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '10px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1A1A1A' }}>
              Clinic Name
            </label>
            <input
              type="text"
              required
              value={form.clinicName}
              onChange={e => setForm({ ...form, clinicName: e.target.value })}
              style={{ width: '100%', padding: '12px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '10px', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1A1A1A' }}>
                Specialty
              </label>
              <select
                required
                value={form.specialty}
                onChange={e => setForm({ ...form, specialty: e.target.value })}
                style={{ width: '100%', padding: '12px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '10px', outline: 'none', background: '#fff' }}
              >
                <option value="">Select...</option>
                <option value="concierge">Concierge Medicine</option>
                <option value="anti-aging">Anti-Aging</option>
                <option value="wellness">Wellness</option>
                <option value="primary">Primary Care</option>
                <option value="sports">Sports Medicine</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1A1A1A' }}>
                State
              </label>
              <select
                required
                value={form.state}
                onChange={e => setForm({ ...form, state: e.target.value })}
                style={{ width: '100%', padding: '12px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '10px', outline: 'none', background: '#fff' }}
              >
                <option value="UT">Utah</option>
                <option value="AZ">Arizona</option>
                <option value="CO">Colorado</option>
                <option value="NV">Nevada</option>
                <option value="ID">Idaho</option>
                <option value="WY">Wyoming</option>
                <option value="NM">New Mexico</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#1A1A1A' }}>
              Medical License Number
            </label>
            <input
              type="text"
              required
              value={form.licenseNumber}
              onChange={e => setForm({ ...form, licenseNumber: e.target.value })}
              style={{ width: '100%', padding: '12px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '10px', outline: 'none' }}
            />
          </div>

          {error && (
            <div style={{ background: '#FEF2F2', color: '#DC2626', padding: '12px', borderRadius: '8px', fontSize: '14px', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              background: ACCENT,
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Submitting...' : 'Start Free Pilot'}
          </button>

          <p style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginTop: '16px' }}>
            By submitting, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </main>
    </div>
  )
}
