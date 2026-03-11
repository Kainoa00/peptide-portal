'use client'

import { useState } from 'react'
import Link from 'next/link'

const ACCENT = '#D4A574'

export default function RequestDemoPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    clinic: '',
    email: '',
    phone: '',
    interest: '',
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In production, save to DB or send to email service
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#FAFAF8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>Request Received!</h1>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
            Thanks {form.name.split(' ')[0]}! We'll be in touch within 24 hours to schedule your demo.
          </p>
          <Link href="/" style={{ color: ACCENT, textDecoration: 'none' }}>← Back to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <Link href="/provider" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#666', textDecoration: 'none', marginBottom: '32px' }}>
          ← Back to provider info
        </Link>

        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Request a Demo</h1>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px' }}>
          See how Peptide Portal works. 10 minutes, no pressure.
        </p>

        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid #E5E5E5' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Your Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Dr. Smith"
              style={{ width: '100%', padding: '12px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '10px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Clinic Name *</label>
            <input
              type="text"
              required
              value={form.clinic}
              onChange={(e) => setForm({ ...form, clinic: e.target.value })}
              placeholder="Smith Wellness Clinic"
              style={{ width: '100%', padding: '12px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '10px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Email *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@clinic.com"
              style={{ width: '100%', padding: '12px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '10px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="(801) 555-0100"
              style={{ width: '100%', padding: '12px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '10px', outline: 'none' }}
            />
          </div>

          marginBottom: '24 <div style={{px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>What are you interested in?</label>
            <select
              value={form.interest}
              onChange={(e) => setForm({ ...form, interest: e.target.value })}
              style={{ width: '100%', padding: '12px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '10px', outline: 'none', background: '#fff' }}
            >
              <option value="">Select an option</option>
              <option value="automate">Automate patient intake</option>
              <option value="recurring">Build recurring revenue</option>
              <option value="compliance">HIPAA compliance</option>
              <option value="exploring">Just exploring</option>
            </select>
          </div>

          {/* Optional Calendly embed could go here */}
          <div style={{ marginBottom: '24px', padding: '16px', background: '#F5F0E8', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Or schedule directly:</p>
            <a 
              href="#" 
              style={{ color: ACCENT, fontWeight: '600', textDecoration: 'none', fontSize: '14px' }}
              onClick={(e) => {
                e.preventDefault()
                alert('Add your Calendly link here: https://calendly.com/your-link')
              }}
            >
              📅 Book a time that works for you →
            </a>
          </div>

          <button
            type="submit"
            style={{ width: '100%', padding: '16px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}
          >
            Request Demo
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: '16px' }}>
          No commitment. We'll work around your schedule.
        </p>
      </div>
    </div>
  )
}
