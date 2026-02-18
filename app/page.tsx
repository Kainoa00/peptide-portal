'use client'

import Link from 'next/link'
import { useState } from 'react'

/* ─── Category data ─────────────────────────────────────────────── */
const CATEGORIES = [
  {
    label: 'Weight Loss',
    tag: 'Metabolism',
    desc: 'Advanced metabolic support protocols designed to optimize blood sugar and support healthy fat loss while maintaining muscle mass.',
    href: '/catalog?cat=weight_loss',
    accent: '#C0514A',
    gradient: 'from-rose-50 to-orange-50',
  },
  {
    label: 'Longevity',
    tag: 'Vitality',
    desc: 'Targeted cellular repair and anti-aging protocols focusing on mitochondrial health, cognitive function, and cellular resilience.',
    href: '/catalog?cat=longevity',
    accent: '#B87333',
    gradient: 'from-amber-50 to-yellow-50',
  },
  {
    label: 'Recovery',
    tag: 'Strength',
    desc: 'Optimizing physical recovery, lean muscle growth, and injury repair for high-performing individuals and athletes.',
    href: '/catalog?cat=recovery',
    accent: '#255736',
    gradient: 'from-green-50 to-emerald-50',
  },
  {
    label: 'Cognitive',
    tag: 'Performance',
    desc: 'Upregulate BDNF expression and drive synaptogenesis for sharper focus, memory, and mental performance.',
    href: '/catalog?cat=cognitive',
    accent: '#6B6FA8',
    gradient: 'from-purple-50 to-indigo-50',
  },
]

const STEPS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
    n: '01',
    title: 'Digital Consultation',
    body: 'Tell us about your health goals and history through our secure HIPAA-compliant platform.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        <path d="M16 11l2 2 4-4" />
      </svg>
    ),
    n: '02',
    title: 'Physician Review',
    body: 'A board-certified physician reviews your intake within 24–48 hours and issues your prescription.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    n: '03',
    title: 'Direct Delivery',
    body: 'Your compounded protocol ships from a PCAB-accredited pharmacy in discreet, temperature-controlled packaging.',
  },
]

const TRUST = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    label: 'HIPAA Compliant',
    sub: 'End-to-end encrypted PHI storage.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    label: 'Licensed Physicians',
    sub: 'Board-certified MDs in all 50 states.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0H5a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2v-4a2 2 0 00-2-2h-4" />
      </svg>
    ),
    label: 'Lab Tested',
    sub: 'PCAB-accredited compounding pharmacies.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Are peptides safe?',
    a: 'Yes, our protocols are physician-supervised and use peptides with established safety profiles. Each prescription is reviewed by a board-certified MD.',
  },
  {
    q: 'How is this different from buying peptides online?',
    a: 'Peptide Portal provides licensed physician oversight, pharmaceutical-grade compounding pharmacy partners, and ongoing medical support — not research-grade products.',
  },
  {
    q: 'How long until I see results?',
    a: 'Most patients notice improvements within 4–8 weeks. Longevity and recovery protocols typically show measurable results in 6–12 weeks.',
  },
  {
    q: 'What states do you operate in?',
    a: 'We currently serve patients in 42 states. Enter your state during the intake assessment to confirm eligibility.',
  },
  {
    q: 'Can I cancel my subscription?',
    a: 'Yes, cancel anytime from your patient dashboard with no cancellation fees.',
  },
]

const TESTIMONIALS = [
  {
    quote: "I've tried everything for recovery. Six weeks on CJC-1295 and my joint pain is down 80%. I sleep like I did in my 20s.",
    name: 'Marcus T.',
    protocol: 'Recovery Protocol',
    protocolColor: '#255736',
    protocolDim: 'rgba(37,87,54,0.08)',
    protocolBorder: 'rgba(37,87,54,0.2)',
  },
  {
    quote: 'Lost 22 lbs in 3 months. The physician check-ins made me feel safe and supported throughout.',
    name: 'Jennifer R.',
    protocol: 'Weight Loss',
    protocolColor: '#C0514A',
    protocolDim: 'rgba(192,81,74,0.08)',
    protocolBorder: 'rgba(192,81,74,0.2)',
  },
  {
    quote: "My mental clarity improved within 2 weeks of starting Semax. I'm sharper at work than I've been in years.",
    name: 'David K.',
    protocol: 'Cognitive Protocol',
    protocolColor: '#6B6FA8',
    protocolDim: 'rgba(107,111,168,0.08)',
    protocolBorder: 'rgba(107,111,168,0.2)',
  },
]

function FAQItem({ item, isOpen, onToggle }: { item: typeof FAQ_ITEMS[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold pr-4" style={{ color: 'var(--text)' }}>
          {item.q}
        </span>
        <span className="flex-shrink-0 text-xl font-light" style={{ color: 'var(--teal)', lineHeight: 1 }}>
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        style={{
          maxHeight: isOpen ? '200px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <p className="text-sm leading-relaxed pb-5" style={{ color: 'var(--text-2)' }}>
          {item.a}
        </p>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)' }}>

      {/* ── Navbar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--teal)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11" />
                <circle cx="12" cy="17" r="4" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--text)' }}>
              Peptide Portal
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: 'Protocols', href: '/catalog' },
              { label: 'How it Works', href: '#how-it-works' },
              { label: 'About', href: '#' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-semibold transition-colors"
                style={{ color: 'rgba(19,24,17,0.60)', textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#255736' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(19,24,17,0.60)' }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:block text-sm font-bold px-5 py-2.5 rounded-full transition-all"
              style={{ color: 'var(--text)', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--neutral-soft, #F1F4F0)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              Log In
            </Link>
            <Link
              href="/quiz"
              className="text-sm font-bold px-7 py-3 rounded-full transition-all"
              style={{
                background: 'var(--teal)',
                color: '#FFFFFF',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(37,87,54,0.25)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section
        className="relative flex items-center overflow-hidden"
        style={{
          minHeight: '90vh',
          paddingTop: 80,
          background: 'linear-gradient(135deg, #F6F8F6 0%, #EFF5F0 50%, #F6F8F6 100%)',
        }}
      >
        {/* Subtle bg pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(37,87,54,0.04) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Radial soft glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            right: '-10%',
            top: '10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37,87,54,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 w-full py-24">
          <div className="max-w-2xl space-y-8">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border anim-fade-up"
              style={{
                background: 'rgba(37,87,54,0.06)',
                border: '1px solid rgba(37,87,54,0.15)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full anim-glow-pulse"
                style={{ background: 'var(--teal)' }}
              />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#255736' }}>
                Medical Excellence
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display anim-fade-up d-100 leading-none"
              style={{
                fontSize: 'clamp(48px, 7vw, 80px)',
                fontWeight: 400,
                color: 'var(--text)',
                lineHeight: 1.1,
              }}
            >
              Your biology,
              <br />
              <em style={{ fontStyle: 'italic', color: '#255736' }}>optimized</em> for life.
            </h1>

            {/* Sub */}
            <p
              className="text-lg leading-relaxed anim-fade-up d-200"
              style={{ color: 'rgba(19,24,17,0.65)', maxWidth: '520px' }}
            >
              Personalized peptide protocols overseen by licensed physicians. Science-backed solutions designed to help you reach your peak performance.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 anim-fade-up d-300">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl text-lg font-bold transition-all"
                style={{
                  background: 'var(--teal)',
                  color: '#FFFFFF',
                  boxShadow: '0 8px 28px rgba(37,87,54,0.25)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Find Your Protocol
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl text-lg font-bold transition-all"
                style={{
                  background: 'rgba(255,255,255,0.8)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  textDecoration: 'none',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#FFFFFF' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.8)' }}
              >
                Browse Catalog
              </Link>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-3 anim-fade-up d-400">
              {TRUST.map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.65)',
                    border: '1px solid var(--border)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span style={{ color: '#255736' }}>{t.icon}</span>
                  <span className="text-xs font-bold tracking-wide" style={{ color: 'var(--text)' }}>
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        style={{
          background: '#FFFFFF',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { n: '4,200+', l: 'Patients Optimized' },
              { n: '48 hr', l: 'Physician Review Time' },
              { n: '13', l: 'Clinical Protocols' },
            ].map((s, i) => (
              <div
                key={s.l}
                className="space-y-2"
                style={{
                  ...(i === 1 ? { borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', paddingLeft: '2rem', paddingRight: '2rem' } : {}),
                }}
              >
                <p className="text-5xl font-extrabold" style={{ color: 'var(--text)' }}>{s.n}</p>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(19,24,17,0.40)' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Protocol Categories ── */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl space-y-4">
              <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: '#255736' }}>
                Our Offerings
              </span>
              <h2
                className="font-display"
                style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 400, color: 'var(--text)', lineHeight: 1.1 }}
              >
                Featured Pathways
              </h2>
              <p style={{ color: 'rgba(19,24,17,0.60)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Every body is unique. We provide the pathways to unlock your specific biological potential.
              </p>
            </div>
            <Link
              href="/catalog"
              className="flex items-center gap-2 font-bold transition-colors"
              style={{ color: '#255736', textDecoration: 'none' }}
            >
              View all protocols
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group block rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.10)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {/* Category color header */}
                <div
                  className="h-3 w-full"
                  style={{ background: cat.accent }}
                />

                <div className="p-8 space-y-4">
                  <div
                    className="inline-block text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: `${cat.accent}15`, color: cat.accent }}
                  >
                    {cat.tag}
                  </div>
                  <h3
                    className="font-display text-2xl"
                    style={{ fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}
                  >
                    {cat.label}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(19,24,17,0.60)' }}>
                    {cat.desc}
                  </p>
                  <div className="pt-4">
                    <div
                      className="w-full py-3 rounded-xl text-center font-bold text-sm transition-all"
                      style={{
                        border: `2px solid var(--border)`,
                        color: 'var(--text)',
                        background: 'transparent',
                      }}
                    >
                      Explore Protocol
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        id="how-it-works"
        className="py-32"
        style={{ background: '#F1F4F0' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: 'var(--text)' }}
            >
              Seamless Healthcare
            </h2>
            <p style={{ color: 'rgba(19,24,17,0.60)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Accessing advanced biotechnology should be simple. Our three-step process is physician-led from start to finish.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {STEPS.map((step) => (
              <div key={step.n} className="text-center space-y-5">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                  style={{
                    background: '#FFFFFF',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    color: '#255736',
                  }}
                >
                  {step.icon}
                </div>
                <h4 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
                  {step.n}. {step.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(19,24,17,0.60)' }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-32" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: '#255736' }}>
              Patient Stories
            </span>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, fontStyle: 'italic', color: 'var(--text)' }}
            >
              Real results, real people.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#255736">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(19,24,17,0.65)' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                    — {t.name}
                  </span>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: t.protocolDim,
                      color: t.protocolColor,
                      border: `1px solid ${t.protocolBorder}`,
                    }}
                  >
                    {t.protocol}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-32" style={{ background: '#F1F4F0' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: '#255736' }}>
              Common Questions
            </span>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: 'var(--text)' }}
            >
              Everything you need to know.
            </h2>
          </div>
          <div
            className="rounded-2xl p-8"
            style={{ background: '#FFFFFF', border: '1px solid var(--border)' }}
          >
            <div style={{ borderTop: '1px solid var(--border)' }}>
              {FAQ_ITEMS.map((item, i) => (
                <FAQItem
                  key={i}
                  item={item}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-32 px-6" style={{ background: '#F6F8F6' }}>
        <div
          className="max-w-5xl mx-auto relative overflow-hidden text-center"
          style={{
            background: '#131811',
            borderRadius: '3rem',
            padding: 'clamp(48px, 8vw, 96px) clamp(32px, 6vw, 96px)',
          }}
        >
          {/* Subtle pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(37,87,54,0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative z-10 space-y-8">
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 400, color: '#FFFFFF', lineHeight: 1.1 }}
            >
              Ready to optimize
              <br />
              your human potential?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.1rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              Join thousands of high-performers who are taking control of their biology with science-backed peptide therapy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center px-12 py-5 rounded-2xl font-extrabold text-xl transition-all"
                style={{
                  background: '#255736',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  boxShadow: '0 0 40px rgba(37,87,54,0.4)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
              >
                Get Your Protocol
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          background: '#FFFFFF',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1 space-y-5">
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{ background: '#255736' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <circle cx="12" cy="17" r="4" />
                    <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11" />
                  </svg>
                </div>
                <span className="text-lg font-extrabold tracking-tight" style={{ color: 'var(--text)' }}>
                  Peptide Portal
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(19,24,17,0.45)' }}>
                Science-led protocols for the modern world. Precision medicine, personalized for you.
              </p>
            </div>

            {/* Protocols */}
            <div>
              <h4 className="font-bold mb-6" style={{ color: 'var(--text)' }}>Protocols</h4>
              <ul className="space-y-4 text-sm" style={{ color: 'rgba(19,24,17,0.55)' }}>
                {['Weight Loss', 'Longevity', 'Recovery', 'Cognitive'].map((l) => (
                  <li key={l}>
                    <Link
                      href="/catalog"
                      style={{ color: 'inherit', textDecoration: 'none' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#255736' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(19,24,17,0.55)' }}
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-6" style={{ color: 'var(--text)' }}>Company</h4>
              <ul className="space-y-4 text-sm" style={{ color: 'rgba(19,24,17,0.55)' }}>
                {['About Us', 'Our Doctors', 'Science', 'Contact'].map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      style={{ color: 'inherit', textDecoration: 'none' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#255736' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(19,24,17,0.55)' }}
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-bold mb-6" style={{ color: 'var(--text)' }}>Legal</h4>
              <ul className="space-y-4 text-sm" style={{ color: 'rgba(19,24,17,0.55)' }}>
                {['Privacy Policy', 'Terms of Service', 'Medical Disclaimer', 'HIPAA Policy'].map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      style={{ color: 'inherit', textDecoration: 'none' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#255736' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(19,24,17,0.55)' }}
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <p className="text-xs" style={{ color: 'rgba(19,24,17,0.35)' }}>
              © 2026 Peptide Portal. All rights reserved. · Not medical advice.
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
