'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Eye, EyeOff } from 'lucide-react'

export default function ProviderLoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      if (authData.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .single()

        if (profile?.role === 'provider') {
          router.push('/provider/dashboard')
        } else {
          await supabase.auth.signOut()
          setError('This account does not have provider access.')
          setLoading(false)
        }
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F8F6] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">

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
            Provider Login
          </h1>
          <p className="text-[#6B7280] text-base">Access your dashboard</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 border border-[#E5E7EB]">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-5" role="alert">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="provider-email" className="block text-sm font-medium text-[#131811] mb-1.5">Email</label>
              <input
                id="provider-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@clinic.com"
                required
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="provider-password" className="block text-sm font-medium text-[#131811] mb-1.5">Password</label>
              <div className="relative">
                <input
                  id="provider-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-full bg-[#D4A574] text-white font-semibold hover:bg-[#B8864A] transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-[#6B7280] mt-5">
            Need an account?{' '}
            <Link href="/provider/signup" className="text-[#D4A574] font-semibold no-underline hover:text-[#B8864A] cursor-pointer">
              Start free pilot
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
