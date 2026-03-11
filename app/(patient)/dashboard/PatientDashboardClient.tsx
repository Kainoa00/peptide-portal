'use client'

import Link from 'next/link'

interface IntakeSubmission {
  id: string
  goals: string[]
  experience_level: string
  status: string
  created_at: string
  recommended_protocols: string[]
}

interface Peptide {
  id: string
  name: string
  slug: string
  category: string
  description: string
  price_monthly: number
}

interface Props {
  intake: IntakeSubmission | null
  peptide: Peptide | null
  provider: string | null
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-white border border-[#E5E7EB] rounded-2xl">
      <div className="w-16 h-16 rounded-full bg-[#F6F8F6] flex items-center justify-center mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" aria-hidden="true">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
        </svg>
      </div>
      <h2 className="text-2xl font-semibold text-[#131811] mb-2">No active protocol</h2>
      <p className="text-sm text-[#6B7280] mb-6 max-w-xs">
        Complete your health assessment to receive a physician-reviewed peptide protocol tailored to your goals.
      </p>
      <Link
        href="/quiz"
        className="px-6 py-3 rounded-full bg-[#D4A574] text-white font-semibold hover:bg-[#B8864A] transition-colors duration-200 no-underline cursor-pointer"
      >
        Start Assessment
      </Link>
    </div>
  )
}

function ActionButton({ href, icon, label, description }: { href: string; icon: React.ReactNode; label: string; description: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-4 bg-white border border-[#E5E7EB] rounded-xl no-underline hover:shadow-md hover:border-[#D4A574]/30 transition-all duration-200 cursor-pointer group"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#F5F0E8] text-[#D4A574] shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-[#131811]">{label}</div>
        <div className="text-xs text-[#6B7280]">{description}</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" aria-hidden="true" className="shrink-0 group-hover:stroke-[#D4A574] transition-colors">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </Link>
  )
}

export default function PatientDashboardClient({ intake, peptide, provider }: Props) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2">Patient Dashboard</p>
        <h1 className="font-display text-4xl md:text-5xl font-normal tracking-tight text-[#131811] mb-2">
          My Protocol
        </h1>
        {peptide && (
          <p className="text-sm text-[#6B7280]">
            Prescribed by <span className="text-[#131811] font-semibold">{provider || 'Your Provider'}</span>
          </p>
        )}
      </div>

      {!intake || !peptide ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-6">
          {/* Protocol Status Card */}
          <div className="bg-white border border-[#D4A574] rounded-2xl p-6">
            <div className="flex justify-between items-start mb-5 flex-wrap gap-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4A574] mb-2">Active Protocol</div>
                <h2 className="text-2xl font-semibold text-[#131811] mb-1">{peptide.name}</h2>
                <p className="text-sm text-[#6B7280] capitalize">{peptide.category}</p>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                intake.status === 'pending' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
              }`}>
                {intake.status === 'pending' ? 'Pending Review' : 'Active'}
              </span>
            </div>

            <p className="text-sm text-[#6B7280] leading-relaxed mb-5">{peptide.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-[#E5E7EB]">
              <div>
                <div className="text-xs text-[#9CA3AF] mb-1">Monthly Cost</div>
                <div className="text-sm font-semibold text-[#131811]">${peptide.price_monthly}/month</div>
              </div>
              <div>
                <div className="text-xs text-[#9CA3AF] mb-1">Submitted</div>
                <div className="text-sm font-semibold text-[#131811]">{new Date(intake.created_at).toLocaleDateString()}</div>
              </div>
              <div>
                <div className="text-xs text-[#9CA3AF] mb-1">Goals</div>
                <div className="text-sm font-semibold text-[#131811] capitalize">{intake.goals.join(', ')}</div>
              </div>
            </div>
          </div>

          {/* Shipment Status */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
            <h3 className="text-base font-semibold text-[#131811] mb-4">Shipment Status</h3>
            <div className="flex items-center gap-2 mb-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" aria-hidden="true">
                <rect x="1" y="3" width="15" height="13" rx="1" />
                <path d="M16 8h4l3 3v5h-7V8z" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span className="text-xs font-mono text-[#6B7280]">USPS-9400111899223456789</span>
            </div>
            <div className="h-2 bg-[#E5E7EB] rounded-full overflow-hidden mb-3">
              <div className="w-[30%] h-full bg-[#D4A574] rounded-full" />
            </div>
            <p className="text-xs text-[#9CA3AF]">
              Est. delivery: <span className="text-[#B8864A] font-semibold">Processing - ships soon</span>
            </p>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#9CA3AF] mb-4">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <ActionButton
                href="/dashboard/messages"
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>}
                label="Message Provider"
                description="Send a message to Dr. Sarah Chen"
              />
              <ActionButton
                href="/dashboard/subscription"
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>}
                label="View Subscription"
                description="Manage billing and payment details"
              />
              <ActionButton
                href="/catalog"
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>}
                label="Browse Catalog"
                description="Explore available peptide protocols"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
