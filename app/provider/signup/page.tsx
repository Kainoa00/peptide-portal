'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const ACCENT = '#D4A574'

export default function ProviderSignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
    clinicName: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      // Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.fullName,
          }
        }
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      if (authData.user) {
        // Update profile to provider role (requires service role key - for demo, manually set)
        // In production, you'd want a proper onboarding flow
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ role: 'provider' })
          .eq('id', authData.user.id)

        if (profileError) {
          console.error('Profile update error:', profileError)
        }

        router.push('/provider/dashboard')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', fontFamily: 'system-ui, -apple-system, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '32px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: '700', fontSize: '18px' }}>P</span>
            </div>
          </Link>
          <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#1A1A1A' }}>
            Create provider account
          </h1>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Start your 30-day free pilot
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '32px', borderRadius: '20px', border: '1px solid #E5E5E5' }}>
          {error && (
            <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', marginBottom: '24px' }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1A1A1A', marginBottom: '8px' }}>
              Full Name
            </label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="Dr. John Smith"
              required
              style={{ width: '100%', padding: '14px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '12px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1A1A1A', marginBottom: '8px' }}>
              Clinic Name
            </label>
            <input
              type="text"
              value={form.clinicName}
              onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
              placeholder="Smith Wellness Clinic"
              required
              style={{ width: '100%', padding: '14px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '12px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1A1A1A', marginBottom: '8px' }}>
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@clinic.com"
              required
              style={{ width: '100%', padding: '14px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '12px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1A1A1A', marginBottom: '8px' }}>
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
              minLength={6}
              style={{ width: '100%', padding: '14px 16px', fontSize: '15px', border: '1px solid #E5E5E5', borderRadius: '12px', outline: 'none' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '16px', background: ACCENT, color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Creating account...' : 'Start Free Pilot'}
          </button>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#666', marginTop: '20px' }}>
            Already have an account? <Link href="/provider/login" style={{ color: ACCENT, textDecoration: 'none' }}>Log in</Link>
          </p>
        </form>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: '24px' }}>
          No credit card required. 30-day free pilot.
        </p>
      </div>
    </div>
  )
}
