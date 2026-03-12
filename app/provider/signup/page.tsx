'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

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
      // Create user + set provider role via admin API
      const res = await fetch('/api/provider/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password, fullName: form.fullName }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create account.')
        setLoading(false)
        return
      }

      // Sign in immediately (email confirmation skipped)
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      })

      if (signInError) {
        setError(signInError.message)
        setLoading(false)
        return
      }

      router.push('/provider/dashboard')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F8F6] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo + Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 no-underline cursor-pointer mb-6">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#131811" strokeWidth="1.5" aria-hidden="true">
              <path d="M16 2L28 9v14l-12 7L4 23V9l12-7z" />
              <circle cx="16" cy="16" r="4" />
              <path d="M16 12v-4M20 14l3.5-2M20 18l3.5 2M16 20v4M12 18l-3.5 2M12 14l-3.5-2" />
            </svg>
            <span className="font-semibold text-lg text-[#131811]">PeptidePortal</span>
          </Link>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#F5F0E8] text-[#B8864A] mb-4">
            Provider Portal
          </div>
          <h1 className="font-display text-3xl font-normal tracking-tight text-[#131811] mb-2">
            Create provider account
          </h1>
          <p className="text-[#6B7280] text-base">
            Start your 30-day free pilot
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#E5E7EB]">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-5" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="provider-name" className="block text-sm font-medium text-[#131811] mb-1.5">
                Full Name
              </label>
              <input
                id="provider-name"
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="Dr. John Smith"
                required
                autoComplete="name"
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="clinic-name" className="block text-sm font-medium text-[#131811] mb-1.5">
                Clinic Name
              </label>
              <input
                id="clinic-name"
                type="text"
                value={form.clinicName}
                onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                placeholder="Smith Wellness Clinic"
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="provider-email" className="block text-sm font-medium text-[#131811] mb-1.5">
                Email
              </label>
              <input
                id="provider-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@clinic.com"
                required
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="provider-password" className="block text-sm font-medium text-[#131811] mb-1.5">
                Password
              </label>
              <input
                id="provider-password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Min. 6 characters"
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-full bg-[#D4A574] text-white font-semibold hover:bg-[#B8864A] transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Start Free Pilot'}
            </button>
          </form>

          <p className="text-center text-sm text-[#6B7280] mt-5">
            Already have an account?{' '}
            <Link href="/provider/login" className="text-[#D4A574] font-semibold no-underline hover:text-[#B8864A] cursor-pointer">
              Log in
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-[#9CA3AF] mt-6">
          No credit card required. 30-day free pilot.
        </p>
      </div>
    </div>
  )
}
