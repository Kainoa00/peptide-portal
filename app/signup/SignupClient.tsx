'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Eye, EyeOff } from 'lucide-react'

export default function SignupClient() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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

    if (!consent) {
      setError('Please agree to the terms and privacy policy.')
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

    // Use hard redirect to ensure session is properly loaded
    window.location.href = '/quiz'
  }

  return (
    <div className="min-h-screen bg-[#F6F8F6] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 no-underline cursor-pointer mb-6">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#131811" strokeWidth="1.5" aria-hidden="true">
              <path d="M16 2L28 9v14l-12 7L4 23V9l12-7z" />
              <circle cx="16" cy="16" r="4" />
              <path d="M16 12v-4M20 14l3.5-2M20 18l3.5 2M16 20v4M12 18l-3.5 2M12 14l-3.5-2" />
            </svg>
            <span className="font-semibold text-lg text-[#131811]">PeptidePortal</span>
          </Link>
          <h1 className="font-display text-3xl font-normal tracking-tight text-[#131811] mb-2">
            Create your account
          </h1>
          <p className="text-[#6B7280] text-base">
            Get started with your free consultation
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="fullName" className="block text-sm font-medium text-[#131811] mb-1.5">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors"
                placeholder="John Smith"
                required
                autoComplete="name"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-[#131811] mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="block text-sm font-medium text-[#131811] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors"
                  placeholder="Min. 8 characters"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#131811] mb-1.5">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors"
                placeholder="Re-enter password"
                required
                autoComplete="new-password"
              />
            </div>

            <div className="mb-6 flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 accent-[#D4A574] cursor-pointer"
              />
              <label htmlFor="consent" className="text-sm text-[#6B7280] leading-relaxed cursor-pointer">
                I agree to the{' '}
                <Link href="/terms" className="text-[#D4A574] no-underline hover:text-[#B8864A]">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-[#D4A574] no-underline hover:text-[#B8864A]">Privacy Policy</Link>
              </label>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-5" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-full bg-[#D4A574] text-white font-semibold hover:bg-[#B8864A] transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-[#6B7280]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#D4A574] font-semibold no-underline hover:text-[#B8864A] cursor-pointer">
              Sign in
            </Link>
          </div>

          <div className="text-center mt-4 text-xs text-[#9CA3AF]">
            <Link href="/provider/signup" className="text-[#B8864A] no-underline hover:text-[#D4A574] cursor-pointer">
              Provider? Start free pilot
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline ml-1" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Social proof */}
        <div className="text-center mt-6">
          <div className="flex items-center justify-center gap-1 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#D4A574" stroke="#D4A574" strokeWidth="2" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <p className="text-xs text-[#9CA3AF]">Join 4,200+ patients</p>
        </div>

      </div>
    </div>
  )
}
