import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Order Confirmed | Peptide Portal',
  robots: { index: false, follow: false },
}

/* ─── Animated checkmark styles injected as a style tag ──────────── */
const CHECK_STYLES = `
@keyframes draw-check {
  from { stroke-dashoffset: 60; }
  to   { stroke-dashoffset: 0; }
}
@keyframes pop-circle {
  0%   { transform: scale(0.6); opacity: 0; }
  70%  { transform: scale(1.08); }
  100% { transform: scale(1); opacity: 1; }
}
.check-circle {
  animation: pop-circle 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
}
.check-path {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: draw-check 0.55s ease-out 0.55s forwards;
}
`

interface StepProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  accentClass: string
}

function NextStep({ icon, title, subtitle, accentClass }: StepProps) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#F6F8F6] border border-[#E5E7EB]">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${accentClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-[#131811] mb-0.5">
          {title}
        </p>
        <p className="text-xs text-[#6B7280] leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-[#F6F8F6]">
      <style dangerouslySetInnerHTML={{ __html: CHECK_STYLES }} />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="flex items-center justify-center gap-2 no-underline cursor-pointer">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="#131811" strokeWidth="1.5" aria-hidden="true">
              <path d="M16 2L28 9v14l-12 7L4 23V9l12-7z" />
              <circle cx="16" cy="16" r="4" />
              <path d="M16 12v-4M20 14l3.5-2M20 18l3.5 2M16 20v4M12 18l-3.5 2M12 14l-3.5-2" />
            </svg>
            <span className="text-lg font-semibold text-[#131811]">
              PeptidePortal
            </span>
          </Link>
        </div>

        {/* Animated checkmark */}
        <div className="flex justify-center mb-8">
          <div className="check-circle w-24 h-24 rounded-full flex items-center justify-center bg-[#D4A574]/10 border-2 border-[#D4A574]/35">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path
                className="check-path"
                d="M10 25l10 10 18-20"
                stroke="#D4A574"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-3">
          <h1 className="font-display text-4xl sm:text-5xl font-light italic text-[#131811] leading-tight">
            You&apos;re in the queue.
          </h1>
        </div>

        {/* Subheading */}
        <p className="text-center text-sm text-[#6B7280] leading-relaxed mb-10">
          Your intake has been submitted. A board-certified physician will review it within 48 hours.
        </p>

        {/* What happens next */}
        <div className="mb-6 px-4 py-3 rounded-xl bg-white border border-[#E5E7EB]" id="main-content">
          <p className="text-xs uppercase tracking-widest text-center text-[#9CA3AF] mb-4">
            What happens next
          </p>
          <div className="space-y-3">
            <NextStep
              accentClass="bg-[#D4A574]/15 text-[#D4A574]"
              title="Physician Review"
              subtitle="24-48 hours -- a licensed provider reviews your intake and health history."
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                  <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                  <path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
                  <path d="M12 13v4M10 15h4" />
                </svg>
              }
            />
            <NextStep
              accentClass="bg-[#B8864A]/15 text-[#B8864A]"
              title="Prescription Issued"
              subtitle="If approved, your Rx is written and sent to our compounding pharmacy partner."
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                  <path d="M9 12l2 2 4-4" />
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                </svg>
              }
            />
            <NextStep
              accentClass="bg-[#D4A574]/15 text-[#D4A574]"
              title="Shipped to Your Door"
              subtitle="Free discreet shipping. Most orders arrive within 3-5 business days."
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                  <path d="M1 3h15v13H1z" />
                  <path d="M16 8h4l3 3v5h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              }
            />
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-semibold bg-[#D4A574] text-white shadow-[0_0_24px_rgba(212,165,116,0.3)] hover:bg-[#B8864A] transition-colors no-underline cursor-pointer"
          >
            View Your Dashboard
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/dashboard/messages"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm text-[#6B7280] bg-transparent border border-[#E5E7EB] hover:bg-[#F6F8F6] transition-colors no-underline cursor-pointer"
          >
            Questions? Message your provider
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Legal footnote */}
        <p className="text-center text-xs text-[#9CA3AF] mt-8 leading-relaxed">
          If your prescription is denied, you will receive a full refund.
        </p>
      </div>
    </div>
  )
}
