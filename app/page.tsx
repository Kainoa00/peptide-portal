'use client'

import Link from 'next/link'
import { useState } from 'react'

/* ─── Data ──────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    label: 'Weight Loss',
    tag: 'Metabolism',
    desc: 'Advanced metabolic support protocols designed to optimize blood sugar and support healthy fat loss while maintaining muscle mass.',
    href: '/catalog?cat=weight_loss',
    img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&auto=format&fit=crop&q=80',
  },
  {
    label: 'Longevity',
    tag: 'Vitality',
    desc: 'Targeted cellular repair and anti-aging protocols focusing on mitochondrial health, cognitive function, and cellular resilience.',
    href: '/catalog?cat=longevity',
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&auto=format&fit=crop&q=80',
  },
  {
    label: 'Recovery',
    tag: 'Strength',
    desc: 'Optimizing physical recovery, lean muscle growth, and injury repair for high-performing individuals and athletes.',
    href: '/catalog?cat=recovery',
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=700&auto=format&fit=crop&q=80',
  },
  {
    label: 'Cognitive',
    tag: 'Performance',
    desc: 'Upregulate BDNF expression and drive synaptogenesis for sharper focus, memory, and mental performance.',
    href: '/catalog?cat=cognitive',
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&auto=format&fit=crop&q=80',
  },
]

/* Molecular-inspired SVG icons matching the reference icon pack */
const STEPS = [
  {
    icon: (
      /* Peptide chain — circles linked by bonds */
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="4" cy="12" r="3" />
        <line x1="7" y1="12" x2="10" y2="12" />
        <circle cx="12" cy="8" r="2.5" />
        <line x1="12" y1="10.5" x2="12" y2="13.5" />
        <circle cx="12" cy="16" r="2.5" />
        <line x1="14" y1="12" x2="17" y2="12" />
        <circle cx="20" cy="12" r="3" />
      </svg>
    ),
    n: '01',
    title: 'Digital Consultation',
    body: 'Tell us about your health goals and history through our secure HIPAA-compliant platform.',
  },
  {
    icon: (
      /* Hexagonal molecule — benzene ring */
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12,2 20,7 20,17 12,22 4,17 4,7" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="9" />
        <line x1="20" y1="7" x2="14.2" y2="10.5" />
        <line x1="20" y1="17" x2="14.2" y2="13.5" />
      </svg>
    ),
    n: '02',
    title: 'Physician Review',
    body: 'A board-certified physician reviews your intake within 24–48 hours and issues your prescription.',
  },
  {
    icon: (
      /* DNA double helix — simplified */
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M5 3c3.5 1.5 10.5 1.5 14 0" />
        <path d="M5 21c3.5-1.5 10.5-1.5 14 0" />
        <path d="M5 3c0 4.5 4 6.5 7 9-3 2.5-7 4.5-7 9" />
        <path d="M19 3c0 4.5-4 6.5-7 9 3 2.5 7 4.5 7 9" />
        <line x1="7.5" y1="9" x2="16.5" y2="9" />
        <line x1="7.5" y1="15" x2="16.5" y2="15" />
      </svg>
    ),
    n: '03',
    title: 'Direct Delivery',
    body: 'Your compounded protocol ships from a PCAB-accredited pharmacy in discreet, temperature-controlled packaging.',
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
    protocolBorder: 'rgba(37,87,54,0.20)',
  },
  {
    quote: 'Lost 22 lbs in 3 months. The physician check-ins made me feel safe and supported throughout.',
    name: 'Jennifer R.',
    protocol: 'Weight Loss',
    protocolColor: '#C0514A',
    protocolDim: 'rgba(192,81,74,0.08)',
    protocolBorder: 'rgba(192,81,74,0.20)',
  },
  {
    quote: "My mental clarity improved within 2 weeks of starting Semax. I'm sharper at work than I've been in years.",
    name: 'David K.',
    protocol: 'Cognitive Protocol',
    protocolColor: '#6B6FA8',
    protocolDim: 'rgba(107,111,168,0.08)',
    protocolBorder: 'rgba(107,111,168,0.20)',
  },
]

/* ─── FAQ accordion item ─────────────────────────────────────────── */
function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div style={{ borderBottom: '1px solid rgba(19,24,17,0.08)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold pr-4" style={{ color: '#131811' }}>
          {item.q}
        </span>
        <span className="flex-shrink-0 text-xl font-light" style={{ color: '#255736', lineHeight: 1 }}>
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
        <p className="text-sm leading-relaxed pb-5" style={{ color: 'rgba(19,24,17,0.70)' }}>
          {item.a}
        </p>
      </div>
    </div>
  )
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ background: '#F6F8F6', color: '#131811' }}>

      {/* ── Navbar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(19,24,17,0.08)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: '#255736' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11" />
                <circle cx="12" cy="17" r="4" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight" style={{ color: '#131811' }}>
              Peptide Portal
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: 'Protocols', href: '/catalog' },
              { label: 'How it Works', href: '#how-it-works' },
              { label: 'About', href: '#' },
              { label: 'Science', href: '#' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-semibold transition-colors"
                style={{ color: 'rgba(19,24,17,0.70)', textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#255736' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(19,24,17,0.70)' }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden sm:block text-sm font-bold px-6 py-2.5 rounded-full transition-all"
              style={{ color: '#131811', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#F1F4F0' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              Log In
            </Link>
            <Link
              href="/quiz"
              className="text-sm font-bold px-8 py-3 rounded-full transition-all"
              style={{
                background: '#255736',
                color: '#FFFFFF',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37,87,54,0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
                ;(e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                ;(e.currentTarget as HTMLAnchorElement).style.filter = 'brightness(1)'
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero — image + left gradient overlay, matching stitch reference ── */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: '85vh', paddingTop: 80 }}>
        {/* Full-bleed image with left-to-right white fade */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.92) 35%, rgba(255,255,255,0.50) 65%, rgba(255,255,255,0) 100%)',
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1800&auto=format&fit=crop&q=80"
            alt="Peaceful wellness background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="max-w-2xl space-y-8">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(37,87,54,0.10)',
                border: '1px solid rgba(37,87,54,0.20)',
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: '#255736' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#255736' }}>
                Medical Excellence
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(48px, 7vw, 80px)',
                fontWeight: 400,
                color: '#131811',
                lineHeight: 1.1,
              }}
            >
              Your biology,
              <br />
              <em style={{ fontStyle: 'italic', color: '#255736' }}>optimized</em> for life.
            </h1>

            {/* Sub */}
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'rgba(19,24,17,0.70)', maxWidth: '42rem' }}
            >
              Personalized peptide protocols overseen by licensed physicians. Science-backed solutions
              designed to help you reach your peak performance.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center px-10 py-4 rounded-xl text-lg font-bold transition-all"
                style={{
                  background: '#255736',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  boxShadow: '0 8px 28px rgba(37,87,54,0.25)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Find Your Protocol
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center px-10 py-4 rounded-xl text-lg font-bold transition-all"
                style={{
                  background: 'rgba(255,255,255,0.80)',
                  border: '1px solid rgba(19,24,17,0.12)',
                  color: '#131811',
                  textDecoration: 'none',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#FFFFFF' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.80)' }}
              >
                Browse Catalog
              </Link>
            </div>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-3">
              {['HIPAA Compliant', 'Licensed Physicians', 'Lab Tested'].map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.65)',
                    border: '1px solid rgba(19,24,17,0.10)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span className="text-xs font-bold tracking-wide" style={{ color: '#131811' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        className="py-16 bg-white"
        style={{
          borderTop: '1px solid rgba(19,24,17,0.08)',
          borderBottom: '1px solid rgba(19,24,17,0.08)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { n: '4,200+', l: 'Patients Optimized' },
              { n: '48 hr', l: 'Physician Review Time' },
              { n: '13', l: 'Clinical Protocols' },
            ].map((s, i) => (
              <div
                key={s.l}
                className="space-y-2"
                style={
                  i === 1
                    ? {
                        borderLeft: '1px solid rgba(19,24,17,0.08)',
                        borderRight: '1px solid rgba(19,24,17,0.08)',
                        paddingLeft: '2rem',
                        paddingRight: '2rem',
                      }
                    : {}
                }
              >
                <p className="text-4xl font-extrabold" style={{ color: '#131811' }}>
                  {s.n}
                </p>
                <p
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: 'rgba(19,24,17,0.50)' }}
                >
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Protocol Cards — image-based, matching stitch reference ── */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl space-y-4">
              <span
                className="text-sm font-bold uppercase tracking-[0.2em]"
                style={{ color: '#255736' }}
              >
                Our Offerings
              </span>
              <h2
                className="font-display"
                style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 400, color: '#131811', lineHeight: 1.1 }}
              >
                Featured Pathways
              </h2>
              <p style={{ color: 'rgba(19,24,17,0.60)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Every body is unique. We provide the pathways to unlock your specific biological
                potential through clinical precision.
              </p>
            </div>
            <Link
              href="/catalog"
              className="flex items-center gap-2 font-bold transition-colors"
              style={{ color: '#255736', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              View all protocols
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group block bg-white rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  border: '1px solid rgba(19,24,17,0.08)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Image thumbnail */}
                <div className="h-48 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.img}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter"
                    style={{
                      background: 'rgba(255,255,255,0.92)',
                      backdropFilter: 'blur(4px)',
                      color: '#131811',
                    }}
                  >
                    {cat.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col space-y-3">
                  <h3
                    className="font-display text-2xl font-bold"
                    style={{ color: '#131811' }}
                  >
                    {cat.label}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(19,24,17,0.60)' }}>
                    {cat.desc}
                  </p>
                  <div className="pt-3">
                    <div
                      className="w-full py-3 rounded-lg text-center font-bold text-sm transition-all"
                      style={{
                        border: '2px solid #F1F4F0',
                        color: '#131811',
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

      {/* ── How It Works — with molecular icon accent ── */}
      <section
        id="how-it-works"
        className="py-24 relative overflow-hidden"
        style={{ background: '#F1F4F0' }}
      >
        {/* Molecular icons decorative — very faint */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/molecules.jpg"
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-0 h-full pointer-events-none select-none"
          style={{ width: 'auto', objectFit: 'cover', opacity: 0.05 }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: '#131811' }}
            >
              Seamless Healthcare
            </h2>
            <p style={{ color: 'rgba(19,24,17,0.60)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
              Accessing advanced biotechnology should be simple. Our three-step process is
              physician-led from start to finish.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {STEPS.map((step) => (
              <div key={step.n} className="relative p-8 text-center space-y-6">
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
                <h4 className="text-xl font-bold" style={{ color: '#131811' }}>
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
            <span
              className="text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: '#255736' }}
            >
              Patient Stories
            </span>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#131811',
              }}
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
                  border: '1px solid rgba(19,24,17,0.08)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                }}
              >
                {/* Stars */}
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#255736">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(19,24,17,0.70)' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold" style={{ color: '#131811' }}>
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
            <span
              className="text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: '#255736' }}
            >
              Common Questions
            </span>
            <h2
              className="font-display"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 400, color: '#131811' }}
            >
              Everything you need to know.
            </h2>
          </div>
          <div
            className="rounded-2xl p-8"
            style={{ background: '#FFFFFF', border: '1px solid rgba(19,24,17,0.08)' }}
          >
            <div style={{ borderTop: '1px solid rgba(19,24,17,0.08)' }}>
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
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative z-10 space-y-8">
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(36px, 5vw, 60px)',
                fontWeight: 400,
                color: '#FFFFFF',
                lineHeight: 1.1,
              }}
            >
              Ready to optimize
              <br />
              your human potential?
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.70)',
                fontSize: '1.1rem',
                maxWidth: '480px',
                margin: '0 auto',
                lineHeight: 1.7,
              }}
            >
              Join thousands of high-performers who are taking control of their biology with
              science-backed peptide therapy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center px-12 py-5 rounded-2xl font-extrabold text-xl transition-all"
                style={{
                  background: '#255736',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  boxShadow: '0 0 40px rgba(37,87,54,0.35)',
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
      <footer style={{ background: '#FFFFFF', borderTop: '1px solid rgba(19,24,17,0.08)' }}>
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
                <span className="text-lg font-extrabold tracking-tight" style={{ color: '#131811' }}>
                  Peptide Portal
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(19,24,17,0.50)' }}>
                Science-led protocols for the modern world. Precision medicine, personalized for you.
              </p>
            </div>

            {/* Link columns */}
            {[
              { heading: 'Protocols', links: ['Weight Loss', 'Longevity', 'Recovery', 'Cognitive'] },
              { heading: 'Company', links: ['About Us', 'Our Doctors', 'Science', 'Contact'] },
              { heading: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Medical Disclaimer', 'HIPAA Policy'] },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <h4 className="font-bold mb-6" style={{ color: '#131811' }}>
                  {heading}
                </h4>
                <ul className="space-y-4 text-sm">
                  {links.map((l) => (
                    <li key={l}>
                      <Link
                        href={heading === 'Protocols' ? '/catalog' : '#'}
                        style={{ color: 'rgba(19,24,17,0.60)', textDecoration: 'none' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#255736' }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(19,24,17,0.60)' }}
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderTop: '1px solid rgba(19,24,17,0.08)' }}
          >
            <p className="text-xs" style={{ color: 'rgba(19,24,17,0.40)' }}>
              © 2026 Peptide Portal. All rights reserved. · Not medical advice.
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
