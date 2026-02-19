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
  accent: string
}

function NextStep({ icon, title, subtitle, accent }: StepProps) {
  return (
    <div
      className="flex items-start gap-4 p-5 rounded-2xl"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: `${accent}18`, color: accent }}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium mb-0.5" style={{ color: 'var(--text)' }}>
          {title}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
          {subtitle}
        </p>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ background: 'var(--bg)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: CHECK_STYLES }} />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="flex items-center justify-center gap-2" style={{ textDecoration: 'none' }}>
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
        </div>

        {/* Animated checkmark */}
        <div className="flex justify-center mb-8">
          <div
            className="check-circle w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(37,87,54,0.12)', border: '2px solid rgba(37,87,54,0.35)' }}
          >
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <path
                className="check-path"
                d="M10 25l10 10 18-20"
                stroke="var(--teal)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-3">
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 6vw, 52px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--text)',
              lineHeight: 1.15,
            }}
          >
            You&apos;re in the queue.
          </h1>
        </div>

        {/* Subheading */}
        <p
          className="text-center text-sm leading-relaxed mb-10"
          style={{ color: 'var(--text-2)' }}
        >
          Your intake has been submitted. A board-certified physician will review it within 48 hours.
        </p>

        {/* What happens next */}
        <div
          className="mb-6 px-4 py-3 rounded-xl"
          style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
        >
          <p
            className="text-xs uppercase tracking-widest text-center mb-4"
            style={{ color: 'var(--text-3)' }}
          >
            What happens next
          </p>
          <div className="space-y-3">
            <NextStep
              accent="var(--teal)"
              title="Physician Review"
              subtitle="24–48 hours — a licensed provider reviews your intake and health history."
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                  <path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" />
                  <path d="M12 13v4M10 15h4" />
                </svg>
              }
            />
            <NextStep
              accent="var(--amber)"
              title="Prescription Issued"
              subtitle="If approved, your Rx is written and sent to our compounding pharmacy partner."
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M9 12l2 2 4-4" />
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                </svg>
              }
            />
            <NextStep
              accent="var(--teal)"
              title="Shipped to Your Door"
              subtitle="Free discreet shipping. Most orders arrive within 3–5 business days."
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
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
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-medium transition-all"
            style={{
              background: 'var(--teal)',
              color: '#FFFFFF',
              boxShadow: '0 0 24px rgba(37,87,54,0.2)',
            }}
          >
            View Your Dashboard
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/dashboard/messages"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm transition-all"
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-2)',
            }}
          >
            Questions? Message your provider
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Legal footnote */}
        <p
          className="text-center text-xs mt-8 leading-relaxed"
          style={{ color: 'var(--text-3)' }}
        >
          If your prescription is denied, you will receive a full refund.
        </p>
      </div>
    </div>
  )
}
