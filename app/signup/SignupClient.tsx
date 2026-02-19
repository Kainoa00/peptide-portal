'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function SignupClient() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/quiz')
  }

  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'var(--teal)'
  }
  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = 'var(--border)'
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `
          radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37,87,54,0.07) 0%, transparent 60%),
          var(--bg)
        `,
      }}
    >
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#255736' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11" />
              <circle cx="12" cy="17" r="4" />
            </svg>
          </div>
          <span className="text-lg font-extrabold tracking-tight" style={{ color: '#131811' }}>
            Peptide Portal
          </span>
        </Link>

        <Link
          href="/"
          aria-label="Close"
          className="flex items-center justify-center w-9 h-9 rounded-full transition-colors"
          style={{
            border: '1px solid var(--border)',
            color: 'var(--text-2)',
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </Link>
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md anim-fade-up">

          {/* Heading */}
          <div className="mb-10 text-center">
            <h1
              className="font-display mb-3"
              style={{
                fontSize: 'clamp(38px, 6vw, 58px)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.1,
              }}
            >
              Start your protocol.
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}>
              Create an account to begin your consultation.
            </p>
          </div>

          {/* Card */}
          <div
            className="rounded-2xl p-8 anim-fade-up d-100"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full name */}
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="block text-xs font-medium tracking-wide uppercase"
                  style={{ color: 'var(--text-2)' }}
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full rounded-xl px-4 py-3 text-sm transition-colors outline-none"
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-xs font-medium tracking-wide uppercase"
                  style={{ color: 'var(--text-2)' }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl px-4 py-3 text-sm transition-colors outline-none"
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium tracking-wide uppercase"
                  style={{ color: 'var(--text-2)' }}
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full rounded-xl px-4 py-3 text-sm transition-colors outline-none"
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>

              {/* Confirm password */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-medium tracking-wide uppercase"
                  style={{ color: 'var(--text-2)' }}
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl px-4 py-3 text-sm transition-colors outline-none"
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }}
                  onFocus={inputFocus}
                  onBlur={inputBlur}
                />
              </div>

              {/* Error */}
              {error && (
                <div
                  className="text-sm px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(232,112,112,0.08)',
                    border: '1px solid rgba(232,112,112,0.2)',
                    color: 'var(--rose)',
                  }}
                >
                  {error}
                </div>
              )}

              {/* Consent */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <input
                  type="checkbox"
                  id="consent"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  style={{ marginTop: 2, accentColor: 'var(--teal)', width: 16, height: 16 }}
                />
                <label htmlFor="consent" style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>
                  I agree to the{' '}
                  <a href="/privacy" style={{ color: 'var(--teal)' }}>Privacy Policy</a>
                  {' '}and{' '}
                  <a href="/terms" style={{ color: 'var(--teal)' }}>Terms of Service</a>
                  , and consent to telehealth services and the collection of health information.
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full py-3.5 text-sm font-medium transition-all"
                style={{
                  background: loading ? 'rgba(37,87,54,0.5)' : 'var(--teal)',
                  color: '#FFFFFF',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
            </form>

            {/* HIPAA notice */}
            <div className="mt-5 flex items-start gap-2">
              <svg
                className="flex-shrink-0 mt-0.5"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ color: 'var(--text-3)' }}
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-3)' }}>
                Your health data is encrypted and HIPAA-compliant. We never sell your information.
              </p>
            </div>
          </div>

          {/* Footer link */}
          <p
            className="mt-6 text-center text-sm anim-fade-up d-200"
            style={{ color: 'var(--text-2)' }}
          >
            Already have an account?{' '}
            <Link
              href="/login"
              className="transition-colors"
              style={{ color: 'var(--teal)' }}
            >
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
