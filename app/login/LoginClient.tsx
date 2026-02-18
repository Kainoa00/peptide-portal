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
      style={{
        background: `
          radial-gradient(ellipse 70% 50% at 50% 0%, rgba(45,214,168,0.07) 0%, transparent 60%),
          var(--bg)
        `,
      }}
    >
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-xl"
          style={{ color: 'var(--text)', fontStyle: 'italic', fontWeight: 400 }}
        >
          peptide
          <span style={{ color: 'var(--teal)', fontStyle: 'normal', fontWeight: 300 }}>
            portal
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
              Welcome back.
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}>
              Sign in to access your protocol and physician messages.
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
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--teal)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl px-4 py-3 text-sm transition-colors outline-none"
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--teal)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
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
                  background: loading ? 'rgba(45,214,168,0.5)' : 'var(--teal)',
                  color: '#06060F',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
              <span className="text-xs" style={{ color: 'var(--text-3)' }}>
                or
              </span>
              <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
            </div>

            {/* Guest / catalog link */}
            <Link
              href="/catalog"
              className="flex items-center justify-center gap-2 w-full rounded-full py-3.5 text-sm transition-colors"
              style={{
                border: '1px solid var(--border-hover)',
                color: 'var(--text-2)',
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
            style={{ color: 'var(--text-2)' }}
          >
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="transition-colors"
              style={{ color: 'var(--teal)' }}
            >
              Sign up →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
