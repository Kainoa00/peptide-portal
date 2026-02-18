'use client'

import Link from 'next/link'
import { useState } from 'react'

/* ─── Molecular hero visualization (pure SVG + CSS) ─────────────── */
function MolecularOrb() {
  const R = 180
  const OUTER_R = 130
  const INNER_R = 66
  const cx = R
  const cy = R

  const outer = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2
    return { x: cx + OUTER_R * Math.cos(a), y: cy + OUTER_R * Math.sin(a), i }
  })

  const inner = Array.from({ length: 4 }, (_, i) => {
    const a = (i / 4) * Math.PI * 2 - Math.PI / 4
    return { x: cx + INNER_R * Math.cos(a), y: cy + INNER_R * Math.sin(a), i }
  })

  return (
    <div
      className="relative anim-float"
      style={{ width: R * 2, height: R * 2 }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(37,87,54,0.09) 0%, transparent 68%)',
        }}
      />
      {/* Outer spinning ring */}
      <div
        className="absolute inset-0 rounded-full anim-spin-slow"
        style={{
          border: '1px solid rgba(37,87,54,0.08)',
          boxShadow: '0 0 0 1px rgba(37,87,54,0.04)',
        }}
      />

      <svg
        width={R * 2}
        height={R * 2}
        viewBox={`0 0 ${R * 2} ${R * 2}`}
        className="absolute inset-0"
      >
        {/* Outer polygon connections */}
        {outer.map((n, idx) => {
          const next = outer[(idx + 1) % outer.length]
          return (
            <line
              key={idx}
              x1={n.x} y1={n.y}
              x2={next.x} y2={next.y}
              stroke="rgba(37,87,54,0.18)"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
          )
        })}

        {/* Radial spokes outer→inner */}
        {inner.map((inn, idx) => (
          <line
            key={idx + 100}
            x1={outer[idx * 2].x} y1={outer[idx * 2].y}
            x2={inn.x} y2={inn.y}
            stroke="rgba(212,151,90,0.18)"
            strokeWidth="1"
          />
        ))}

        {/* Inner→center */}
        {inner.map((inn, idx) => (
          <line
            key={idx + 200}
            x1={inn.x} y1={inn.y}
            x2={cx} y2={cy}
            stroke="rgba(37,87,54,0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Outer nodes */}
        {outer.map((n) => (
          <g key={n.i}>
            <circle
              cx={n.x} cy={n.y} r={7}
              fill="rgba(37,87,54,0.06)"
              stroke="rgba(37,87,54,0.35)"
              strokeWidth="1"
            />
            <circle
              cx={n.x} cy={n.y} r={2.5}
              fill="#255736"
              className="anim-glow-pulse"
              style={{ animationDelay: `${n.i * 350}ms` }}
            />
          </g>
        ))}

        {/* Inner nodes */}
        {inner.map((n) => (
          <g key={n.i + 100}>
            <circle
              cx={n.x} cy={n.y} r={5}
              fill="rgba(212,151,90,0.08)"
              stroke="rgba(212,151,90,0.45)"
              strokeWidth="1"
            />
            <circle cx={n.x} cy={n.y} r={2} fill="#D4975A" />
          </g>
        ))}

        {/* Center node */}
        <circle
          cx={cx} cy={cy} r={9}
          fill="rgba(37,87,54,0.08)"
          stroke="rgba(37,87,54,0.5)"
          strokeWidth="1.5"
        />
        <circle cx={cx} cy={cy} r={4} fill="#255736" className="anim-glow-pulse" />
      </svg>
    </div>
  )
}

/* ─── Category chip colors ───────────────────────────────────────── */
const CATEGORIES = [
  {
    label: 'Weight Loss',
    tag: 'Fat Metabolism',
    accent: '#E87070',
    dim: 'rgba(232,112,112,0.1)',
    border: 'rgba(232,112,112,0.25)',
    peptides: 'Tirzepatide · Semaglutide',
    desc: 'GLP-1 receptor agonists clinically proven to reduce body weight and improve metabolic markers.',
    href: '/catalog?cat=weight_loss',
  },
  {
    label: 'Recovery',
    tag: 'Tissue Repair',
    accent: '#255736',
    dim: 'rgba(37,87,54,0.1)',
    border: 'rgba(37,87,54,0.25)',
    peptides: 'BPC-157 · TB-500',
    desc: 'Accelerate healing of tendons, muscles, and soft tissue with body-protective compounds.',
    href: '/catalog?cat=recovery',
  },
  {
    label: 'Longevity',
    tag: 'Anti-Aging',
    accent: '#D4975A',
    dim: 'rgba(212,151,90,0.1)',
    border: 'rgba(212,151,90,0.25)',
    peptides: 'CJC-1295 · Epitalon',
    desc: 'Stimulate growth hormone secretion and telomerase activation to slow cellular aging.',
    href: '/catalog?cat=longevity',
  },
  {
    label: 'Cognitive',
    tag: 'Neuroprotection',
    accent: '#9B8EE8',
    dim: 'rgba(155,142,232,0.1)',
    border: 'rgba(155,142,232,0.25)',
    peptides: 'Semax · Dihexa',
    desc: 'Upregulate BDNF expression and drive synaptogenesis for sharper focus and memory.',
    href: '/catalog?cat=cognitive',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Complete the Assessment',
    body: 'A 5-minute intake quiz screens for goals, medical history, and contraindications.',
  },
  {
    n: '02',
    title: 'Physician Review',
    body: 'A board-certified physician reviews your intake within 24–48 hours and issues your prescription.',
  },
  {
    n: '03',
    title: 'Delivered to Your Door',
    body: 'Your compounded protocol ships from a PCAB-accredited pharmacy in discreet, temperature-controlled packaging.',
  },
]

const TRUST = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    label: 'HIPAA Compliant',
    sub: 'End-to-end encrypted PHI storage with BAA-covered infrastructure.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    label: 'Licensed Physicians',
    sub: 'Board-certified MDs credentialed in all 50 states review every intake.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    label: 'PCAB-Accredited Pharmacy',
    sub: 'Domestic compounding labs meeting the highest purity and potency standards.',
  },
]

/* ─── Stats bar data ─────────────────────────────────────────────── */
const STATS_BAR = [
  { label: 'Patients Treated', value: '4,200+' },
  { label: 'Board-Certified Physicians', value: null },
  { label: 'HIPAA Compliant', value: null },
  { label: 'Review Time', value: '48-hour' },
]

/* ─── Testimonials data ──────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote:
      "I've tried everything for recovery. Six weeks on CJC-1295 and my joint pain is down 80%. I sleep like I did in my 20s.",
    name: 'Marcus T.',
    protocol: 'Recovery Protocol',
    protocolColor: '#255736',
    protocolDim: 'rgba(37,87,54,0.1)',
    protocolBorder: 'rgba(37,87,54,0.25)',
  },
  {
    quote:
      'Lost 22 lbs in 3 months. The physician check-ins made me feel safe and supported throughout.',
    name: 'Jennifer R.',
    protocol: 'Weight Loss Protocol',
    protocolColor: '#E87070',
    protocolDim: 'rgba(232,112,112,0.1)',
    protocolBorder: 'rgba(232,112,112,0.25)',
  },
  {
    quote:
      "My mental clarity improved within 2 weeks of starting Semax. I'm sharper at work than I've been in years.",
    name: 'David K.',
    protocol: 'Cognitive Protocol',
    protocolColor: '#9B8EE8',
    protocolDim: 'rgba(155,142,232,0.1)',
    protocolBorder: 'rgba(155,142,232,0.25)',
  },
]

/* ─── FAQ data ───────────────────────────────────────────────────── */
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

/* ─── Star rating component ─────────────────────────────────────── */
function StarRating() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ color: 'var(--teal)' }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

/* ─── FAQ accordion item ─────────────────────────────────────────── */
function FAQItem({ item, isOpen, onToggle }: { item: typeof FAQ_ITEMS[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left transition-colors"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium pr-4" style={{ color: 'var(--text)' }}>
          {item.q}
        </span>
        <span
          className="flex-shrink-0 text-xl font-light transition-transform"
          style={{
            color: 'var(--teal)',
            lineHeight: 1,
            transform: isOpen ? 'rotate(0deg)' : 'rotate(0deg)',
          }}
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        style={{
          maxHeight: isOpen ? '300px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <p
          className="text-sm leading-relaxed pb-5"
          style={{ color: 'var(--text-2)' }}
        >
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
    <div style={{ background: 'var(--bg)' }}>

      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(246,248,246,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-display text-xl tracking-tight"
            style={{ color: 'var(--text)', fontStyle: 'italic', fontWeight: 400 }}
          >
            peptide<span style={{ color: 'var(--teal)', fontStyle: 'normal', fontWeight: 300 }}>portal</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {['Catalog', 'How It Works', 'Physicians'].map((label) => (
              <Link
                key={label}
                href={label === 'Catalog' ? '/catalog' : `#${label.toLowerCase().replace(/ /g, '-')}`}
                className="text-sm transition-colors"
                style={{ color: 'var(--text-2)' }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <Link
            href="/quiz"
            className="text-sm font-medium px-5 py-2.5 rounded-full transition-all"
            style={{
              background: 'var(--teal)',
              color: '#FFFFFF',
              letterSpacing: '0.01em',
            }}
          >
            Start Quiz →
          </Link>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center bg-grid"
        style={{
          paddingTop: 96,
          background: `
            radial-gradient(ellipse 80% 60% at 60% 40%, rgba(37,87,54,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 10% 80%, rgba(212,151,90,0.03) 0%, transparent 60%),
            var(--bg)
          `,
        }}
      >
        {/* Dot grid overlay */}
        <div
          className="absolute inset-0 bg-grid"
          style={{ opacity: 0.6, pointerEvents: 'none' }}
        />

        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center py-24">

            {/* Left: Copy */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="anim-fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide"
                style={{
                  background: 'var(--teal-dim)',
                  border: '1px solid rgba(37,87,54,0.2)',
                  color: 'var(--teal)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current anim-glow-pulse" />
                HIPAA Compliant · Licensed Physicians · 50 States
              </div>

              {/* Headline */}
              <div className="anim-fade-up d-100">
                <h1
                  className="font-display leading-none tracking-tight"
                  style={{
                    fontSize: 'clamp(52px, 7vw, 88px)',
                    fontWeight: 300,
                    color: 'var(--text)',
                  }}
                >
                  Your biology,
                  <br />
                  <em
                    className="text-teal"
                    style={{ fontStyle: 'italic', fontWeight: 400 }}
                  >
                    optimized.
                  </em>
                </h1>
              </div>

              {/* Sub */}
              <p
                className="anim-fade-up d-200 text-lg leading-relaxed max-w-md"
                style={{ color: 'var(--text-2)' }}
              >
                Evidence-based peptide protocols — weight loss, recovery,
                longevity, and cognitive performance — reviewed by board-certified
                physicians and shipped from PCAB-accredited compounding pharmacies.
              </p>

              {/* CTAs */}
              <div className="anim-fade-up d-300 flex flex-wrap items-center gap-4">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-medium text-sm transition-all"
                  style={{
                    background: 'var(--teal)',
                    color: '#FFFFFF',
                    boxShadow: '0 0 32px rgba(37,87,54,0.2)',
                  }}
                >
                  Find Your Protocol
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>

                <Link
                  href="/catalog"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm transition-colors"
                  style={{
                    border: '1px solid var(--border-hover)',
                    color: 'var(--text-2)',
                  }}
                >
                  Browse Catalog
                </Link>
              </div>

              {/* Stats */}
              <div className="anim-fade-up d-400 flex items-center gap-8 pt-4">
                {[
                  { n: '4,200+', l: 'Patients' },
                  { n: '48 hrs', l: 'Avg. review time' },
                  { n: '13', l: 'Protocols available' },
                ].map((s) => (
                  <div key={s.l}>
                    <div
                      className="font-display text-2xl"
                      style={{ fontWeight: 400, color: 'var(--text)' }}
                    >
                      {s.n}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Molecular orb */}
            <div className="hidden lg:flex justify-center items-center anim-fade-in d-200">
              <div className="relative">
                {/* Outer glow ring */}
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: -40,
                    background:
                      'radial-gradient(circle, rgba(37,87,54,0.04) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }}
                />
                <MolecularOrb />
                {/* Label tags floating around */}
                <div
                  className="absolute -top-4 -right-8 text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border-teal)',
                    color: 'var(--teal)',
                  }}
                >
                  BPC-157
                </div>
                <div
                  className="absolute -bottom-2 -left-10 text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid rgba(212,151,90,0.3)',
                    color: 'var(--amber)',
                  }}
                >
                  Tirzepatide
                </div>
                <div
                  className="absolute top-1/2 -right-14 text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid rgba(155,142,232,0.3)',
                    color: 'var(--lavender)',
                  }}
                >
                  Semax
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--bg))',
          }}
        />
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-0">
            {STATS_BAR.map((stat, i) => (
              <div key={stat.label} className="flex items-center">
                <div
                  className="px-5 py-2 rounded-full text-sm text-center"
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-2)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {stat.value && (
                    <span className="font-medium mr-1.5" style={{ color: 'var(--text)' }}>
                      {stat.value}
                    </span>
                  )}
                  {stat.label}
                </div>
                {i < STATS_BAR.length - 1 && (
                  <div
                    className="hidden md:block mx-3 h-4 w-px"
                    style={{ background: 'var(--border)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Protocol Categories ─────────────────────────────────────── */}
      <section className="py-32 max-w-6xl mx-auto px-6">
        <div className="mb-16 anim-fade-up">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-3)' }}>
            Protocol Library
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 4.5vw, 56px)',
              fontWeight: 300,
              color: 'var(--text)',
              lineHeight: 1.1,
            }}
          >
            Four pathways.
            <br />
            <em style={{ fontStyle: 'italic' }}>One platform.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.label}
              href={cat.href}
              className={`card-glass group block p-8 anim-fade-up d-${(i + 1) * 100}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span
                    className="text-xs font-medium tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={{
                      background: cat.dim,
                      color: cat.accent,
                      border: `1px solid ${cat.border}`,
                    }}
                  >
                    {cat.tag}
                  </span>
                </div>
                <svg
                  width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  style={{ color: 'var(--text-3)' }}
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>

              <h3
                className="font-display mb-2"
                style={{ fontSize: 36, fontWeight: 400, color: 'var(--text)', lineHeight: 1.1 }}
              >
                {cat.label}
              </h3>

              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-2)' }}>
                {cat.desc}
              </p>

              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: cat.accent }} />
                <span className="text-xs font-medium tracking-wide" style={{ color: cat.accent }}>
                  {cat.peptides}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-32"
        style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-20 anim-fade-up">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-3)' }}>
              The Process
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                fontWeight: 300,
                color: 'var(--text)',
                lineHeight: 1.1,
              }}
            >
              From assessment
              <br />
              <em style={{ fontStyle: 'italic' }}>to your door.</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            {STEPS.map((step, i) => (
              <div
                key={step.n}
                className={`relative pl-8 pr-6 pb-12 anim-fade-up d-${(i + 1) * 100}`}
                style={{
                  borderLeft: i === 0 ? '1px solid var(--border-teal)' : '1px solid var(--border)',
                }}
              >
                {/* Step number */}
                <div
                  className="font-display text-6xl font-light mb-6"
                  style={{ color: i === 0 ? 'var(--teal)' : 'var(--text-3)' }}
                >
                  {step.n}
                </div>
                <h3
                  className="text-lg font-medium mb-3"
                  style={{ color: 'var(--text)' }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  {step.body}
                </p>

                {/* Connector arrow */}
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden md:block absolute -right-3 top-6"
                    style={{ color: 'var(--text-3)' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center anim-fade-up d-400">
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium transition-all"
              style={{
                background: 'var(--teal)',
                color: '#FFFFFF',
                boxShadow: '0 0 32px rgba(37,87,54,0.2)',
              }}
            >
              Start Your Assessment
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section className="py-32 max-w-4xl mx-auto px-6">
        <div className="mb-16 anim-fade-up">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-3)' }}>
            Common Questions
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 4.5vw, 56px)',
              fontWeight: 300,
              color: 'var(--text)',
              lineHeight: 1.1,
            }}
          >
            Everything you
            <br />
            <em style={{ fontStyle: 'italic' }}>need to know.</em>
          </h2>
        </div>

        <div
          style={{ borderTop: '1px solid var(--border)' }}
        >
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────── */}
      <section
        className="py-32"
        style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 anim-fade-up">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--teal)' }}>
              Patient Stories
            </p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.1,
              }}
            >
              Real results, real people.
            </h2>
          </div>

          <div className="flex flex-wrap gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`flex-1 min-w-72 p-8 rounded-2xl anim-fade-up d-${(i + 1) * 100}`}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                {/* Opening quote mark */}
                <div
                  className="font-display mb-4 leading-none select-none"
                  style={{
                    fontSize: 72,
                    lineHeight: 0.8,
                    color: 'var(--teal-dim)',
                    fontWeight: 700,
                  }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="mb-4">
                  <StarRating />
                </div>

                {/* Quote text */}
                <p
                  className="text-sm leading-relaxed mb-6 text-pretty"
                  style={{ color: 'var(--text-2)' }}
                >
                  {t.quote}
                </p>

                {/* Patient name + protocol badge */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                    — {t.name}
                  </span>
                  <span
                    className="text-xs font-medium tracking-wide px-2.5 py-1 rounded-full"
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

      {/* ── Trust ──────────────────────────────────────────────────── */}
      <section className="py-28 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {TRUST.map((t, i) => (
            <div
              key={t.label}
              className={`flex items-start gap-4 p-6 rounded-2xl anim-fade-up d-${(i + 1) * 100}`}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <div
                className="mt-0.5 flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--teal-dim)', color: 'var(--teal)' }}
              >
                {t.icon}
              </div>
              <div>
                <div className="font-medium text-sm mb-1" style={{ color: 'var(--text)' }}>
                  {t.label}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>
                  {t.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="relative py-32 px-6 text-center"
          style={{
            background: `
              radial-gradient(ellipse 80% 100% at 50% 50%, rgba(37,87,54,0.06) 0%, transparent 70%),
              var(--surface)
            `,
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div
            className="absolute inset-0 bg-grid"
            style={{ opacity: 0.4, pointerEvents: 'none' }}
          />
          <div className="relative max-w-2xl mx-auto space-y-8">
            <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
              Get Started Today
            </p>
            <h2
              className="font-display anim-fade-up"
              style={{
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 300,
                color: 'var(--text)',
                lineHeight: 1.1,
              }}
            >
              Ready to optimize
              <br />
              <em className="text-teal" style={{ fontStyle: 'italic' }}>your biology?</em>
            </h2>
            <p className="text-base anim-fade-up d-100" style={{ color: 'var(--text-2)' }}>
              A 5-minute assessment. A physician-reviewed prescription. Results you can measure.
            </p>
            <div className="flex flex-wrap justify-center gap-4 anim-fade-up d-200">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-sm transition-all anim-teal-glow"
                style={{
                  background: 'var(--teal)',
                  color: '#FFFFFF',
                }}
              >
                Begin the Assessment
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm transition-colors"
                style={{
                  border: '1px solid var(--border-hover)',
                  color: 'var(--text-2)',
                }}
              >
                Browse Protocols
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="py-12 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Link
            href="/"
            className="font-display text-lg"
            style={{ color: 'var(--text)', fontStyle: 'italic', fontWeight: 400 }}
          >
            peptide<span style={{ color: 'var(--teal)', fontStyle: 'normal', fontWeight: 300 }}>portal</span>
          </Link>

          <div className="flex flex-wrap gap-6">
            {[
              { label: 'Catalog', href: '/catalog' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Service', href: '/terms' },
              { label: 'Provider Login', href: '/login' },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm transition-colors hover:text-[color:var(--text)]"
                style={{ color: 'var(--text-2)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <p className="text-xs" style={{ color: 'var(--text-3)' }}>
            © 2026 Peptide Portal · Not medical advice.
          </p>
        </div>
      </footer>
    </div>
  )
}
