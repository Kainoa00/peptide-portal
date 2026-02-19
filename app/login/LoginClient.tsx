'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function LoginClient() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#fdfcf8' }}
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
            border: '1px solid rgba(19,24,17,0.12)',
            color: 'rgba(19,24,17,0.5)',
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
                color: '#131811',
                lineHeight: 1.1,
              }}
            >
              Welcome back.
            </h1>
            <p className="text-sm" style={{ color: 'rgba(19,24,17,0.6)' }}>
              Sign in to access your protocol and physician messages.
            </p>
          </div>

          {/* Card */}
          <div
            className="rounded-2xl p-8 anim-fade-up d-100"
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(19,24,17,0.08)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-xs font-medium tracking-wide uppercase"
                  style={{ color: 'rgba(19,24,17,0.5)' }}
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
                    background: '#f4f7f4',
                    border: '1px solid rgba(19,24,17,0.12)',
                    color: '#131811',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#255736'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(19,24,17,0.12)'
                  }}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium tracking-wide uppercase"
                  style={{ color: 'rgba(19,24,17,0.5)' }}
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl px-4 py-3 text-sm transition-colors outline-none"
                  style={{
                    background: '#f4f7f4',
                    border: '1px solid rgba(19,24,17,0.12)',
                    color: '#131811',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#255736'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(19,24,17,0.12)'
                  }}
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

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full py-3.5 text-sm font-medium transition-all"
                style={{
                  background: loading ? 'rgba(37,87,54,0.5)' : '#255736',
                  color: '#FFFFFF',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'rgba(19,24,17,0.08)' }} />
              <span className="text-xs" style={{ color: 'rgba(19,24,17,0.35)' }}>
                or
              </span>
              <div className="flex-1 h-px" style={{ background: 'rgba(19,24,17,0.08)' }} />
            </div>

            {/* Guest / catalog link */}
            <Link
              href="/catalog"
              className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-sm transition-colors"
              style={{
                border: '1px solid rgba(19,24,17,0.15)',
                color: 'rgba(19,24,17,0.6)',
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M1 6h4l2.7 8.4a2 2 0 001.9 1.6h8.8a2 2 0 001.9-1.4L22 8H6" />
                <circle cx="10" cy="21" r="1" />
                <circle cx="18" cy="21" r="1" />
              </svg>
              Continue as guest / Browse catalog
            </Link>
          </div>

          {/* Footer link */}
          <p
            className="mt-6 text-center text-sm anim-fade-up d-200"
            style={{ color: 'rgba(19,24,17,0.6)' }}
          >
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="transition-colors"
              style={{ color: '#255736' }}
            >
              Sign up →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
