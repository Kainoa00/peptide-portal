'use client'

import { useState } from 'react'
import Link from 'next/link'

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
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F6F8F6] flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-normal tracking-tight text-[#131811] mb-3">Request Received!</h1>
          <p className="text-sm text-[#6B7280] mb-6 leading-relaxed">
            Thanks {form.name.split(' ')[0]}! We&apos;ll be in touch within 24 hours to schedule your demo.
          </p>
          <p className="text-sm text-[#6B7280] mb-6">
            Or book a time directly:{' '}
            <a href="https://calendly.com/kaishintaku08" target="_blank" rel="noopener noreferrer" className="text-[#D4A574] font-semibold no-underline hover:text-[#B8864A]">
              calendly.com/kaishintaku08
            </a>
          </p>
          <Link href="/" className="text-sm text-[#D4A574] no-underline hover:text-[#B8864A] cursor-pointer">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F6F8F6] py-12 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/provider" className="inline-flex items-center gap-2 text-sm text-[#6B7280] no-underline hover:text-[#131811] transition-colors cursor-pointer mb-8">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to provider info
        </Link>

        <h1 className="font-display text-3xl font-normal tracking-tight text-[#131811] mb-2">Request a Demo</h1>
        <p className="text-sm text-[#6B7280] mb-8">
          See how Peptide Portal works. 10 minutes, no pressure.
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 border border-[#E5E7EB]">
          <div className="mb-5">
            <label htmlFor="demo-name" className="block text-sm font-medium text-[#131811] mb-1.5">Your Name <span className="text-red-500">*</span></label>
            <input
              id="demo-name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Dr. Smith"
              className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="demo-clinic" className="block text-sm font-medium text-[#131811] mb-1.5">Clinic Name <span className="text-red-500">*</span></label>
            <input
              id="demo-clinic"
              type="text"
              required
              value={form.clinic}
              onChange={(e) => setForm({ ...form, clinic: e.target.value })}
              placeholder="Smith Wellness Clinic"
              className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="demo-email" className="block text-sm font-medium text-[#131811] mb-1.5">Email <span className="text-red-500">*</span></label>
            <input
              id="demo-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@clinic.com"
              className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="demo-phone" className="block text-sm font-medium text-[#131811] mb-1.5">Phone</label>
            <input
              id="demo-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="(801) 555-0100"
              className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="demo-interest" className="block text-sm font-medium text-[#131811] mb-1.5">What are you interested in?</label>
            <select
              id="demo-interest"
              value={form.interest}
              onChange={(e) => setForm({ ...form, interest: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors cursor-pointer"
            >
              <option value="">Select an option</option>
              <option value="automate">Automate patient intake</option>
              <option value="recurring">Build recurring revenue</option>
              <option value="compliance">HIPAA compliance</option>
              <option value="exploring">Just exploring</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-full bg-[#D4A574] text-white font-semibold hover:bg-[#B8864A] transition-colors duration-200 cursor-pointer"
          >
            Request Demo
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-[#6B7280] mb-3">Or schedule directly:</p>
          <a
            href="https://calendly.com/kaishintaku08"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4A574] font-semibold no-underline hover:text-[#B8864A] text-sm cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Book a time that works for you
          </a>
        </div>

        <p className="text-center text-xs text-[#9CA3AF] mt-4">
          No commitment. We&apos;ll work around your schedule.
        </p>
      </div>
    </div>
  )
}
