'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { PEPTIDES, CATEGORY_META, getPeptidesByCategory, type Category, type Peptide } from '@/lib/peptide-data'

/* ─── FDA Status badge ───────────────────────────────────────────── */
function FdaBadge({ status, label }: { status: Peptide['fdaStatus']; label: string }) {
  const styles = {
    approved: { bg: 'rgba(37,87,54,0.1)', color: '#255736', border: 'rgba(37,87,54,0.25)' },
    research:  { bg: 'rgba(212,151,90,0.1)', color: '#D4975A', border: 'rgba(212,151,90,0.25)' },
    flagged:   { bg: 'rgba(232,112,112,0.1)', color: '#E87070', border: 'rgba(232,112,112,0.25)' },
  }[status]

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
      style={{ background: styles.bg, color: styles.color, border: `1px solid ${styles.border}` }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  )
}

/* ─── Peptide card ───────────────────────────────────────────────── */
function PeptideCard({ peptide }: { peptide: Peptide }) {
  const meta = CATEGORY_META[peptide.category]

  return (
    <Link
      href={`/catalog/${peptide.slug}`}
      className="group relative block overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${meta.border}, 0 0 48px ${meta.dim}` }}
      />

      {/* Category left border accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
        style={{ background: meta.accent }}
      />

      {/* Faint catalog number */}
      <div
        className="absolute right-5 top-3 font-display select-none pointer-events-none"
        style={{
          fontSize: 96,
          fontWeight: 300,
          lineHeight: 1,
          color: 'rgba(19,24,17,0.05)',
          fontStyle: 'italic',
        }}
      >
        {String(peptide.num).padStart(2, '0')}
      </div>

      <div className="relative p-7">
        {/* Top row: category + arrow */}
        <div className="flex items-start justify-between mb-5">
          <span
            className="text-xs font-medium tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{ background: meta.dim, color: meta.accent, border: `1px solid ${meta.border}` }}
          >
            {meta.label}
          </span>
          <svg
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2"
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 mt-0.5"
            style={{ color: 'var(--text-3)' }}
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>

        {/* Name */}
        <h3
          className="font-display mb-1 leading-none"
          style={{ fontSize: 32, fontWeight: 400, color: 'var(--text)' }}
        >
          {peptide.name}
        </h3>

        {/* Tag */}
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: meta.accent }}>
          {peptide.tag}
        </p>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-6"
          style={{
            color: 'var(--text-2)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {peptide.description}
        </p>

        {/* Specs row */}
        <div
          className="flex items-center gap-4 py-4 mb-5"
          style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
        >
          <div>
            <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-3)' }}>
              Dosage
            </p>
            <p className="text-xs font-medium" style={{ color: 'var(--text-2)' }}>
              {peptide.dosageRange}
            </p>
          </div>
          <div className="w-px h-8 self-center" style={{ background: 'var(--border)' }} />
          <div>
            <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-3)' }}>
              Route
            </p>
            <p className="text-xs font-medium" style={{ color: 'var(--text-2)' }}>
              {peptide.deliveryMethod.split('(')[0].trim()}
            </p>
          </div>
        </div>

        {/* Bottom row: FDA status + price */}
        <div className="flex items-center justify-between">
          <FdaBadge status={peptide.fdaStatus} label={
            peptide.fdaStatus === 'approved' ? 'FDA Approved' :
            peptide.fdaStatus === 'flagged'  ? 'Category 2' :
            'Research Compound'
          } />
          <div className="text-right">
            <span
              className="font-display text-2xl"
              style={{ fontWeight: 300, color: 'var(--text)' }}
            >
              ${peptide.priceMonthly}
            </span>
            <span className="text-xs ml-1" style={{ color: 'var(--text-2)' }}>/mo</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ─── Catalog Client Component ───────────────────────────────────── */
export default function CatalogClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialCat = (searchParams.get('cat') ?? 'all') as Category | 'all'
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(initialCat)
  const [sortBy, setSortBy] = useState<'default' | 'price_asc' | 'price_desc'>('default')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  function selectCategory(cat: Category | 'all') {
    setActiveCategory(cat)
    const url = cat === 'all' ? '/catalog' : `/catalog?cat=${cat}`
    router.replace(url, { scroll: false })
  }

  const filtered = getPeptidesByCategory(activeCategory)
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price_asc')  return a.priceMonthly - b.priceMonthly
    if (sortBy === 'price_desc') return b.priceMonthly - a.priceMonthly
    return 0
  })

  const CATS: { value: Category | 'all'; label: string }[] = [
    { value: 'all',         label: `All (${PEPTIDES.length})` },
    { value: 'weight_loss', label: 'Weight Loss' },
    { value: 'recovery',    label: 'Recovery' },
    { value: 'longevity',   label: 'Longevity' },
    { value: 'cognitive',   label: 'Cognitive' },
  ]

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Navbar ───────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#255736' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11" />
                <circle cx="12" cy="17" r="4" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight" style={{ color: '#131811' }}>
              Peptide Portal
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/quiz"
              className="text-sm font-medium px-5 py-2.5 rounded-full transition-all"
              style={{ background: 'var(--teal)', color: '#FFFFFF' }}
            >
              Take the Quiz →
            </Link>
          </div>
        </div>
      </header>

      {/* ── Page hero ────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 70% 80% at 50% -20%, rgba(37,87,54,0.05) 0%, transparent 60%),
            var(--bg)
          `,
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-xs uppercase tracking-widest mb-3 anim-fade-up" style={{ color: 'var(--text-3)' }}>
            Protocol Library
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h1
              className="font-display anim-fade-up d-100"
              style={{
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 300,
                color: 'var(--text)',
                lineHeight: 1.05,
              }}
            >
              {PEPTIDES.length} protocols.
              <br />
              <em style={{ fontStyle: 'italic' }}>One platform.</em>
            </h1>
            <p
              className="max-w-sm text-sm leading-relaxed anim-fade-up d-200"
              style={{ color: 'var(--text-2)' }}
            >
              Each protocol is reviewed by a board-certified physician before fulfillment.
              Not sure where to start?{' '}
              <Link href="/quiz" style={{ color: 'var(--teal)' }}>
                Take the 5-minute quiz →
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ── Filter + sort bar ─────────────────────────────────────── */}
      <div
        className="sticky top-16 z-40"
        style={{
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATS.map((cat) => {
              const isActive = activeCategory === cat.value
              const meta = cat.value !== 'all' ? CATEGORY_META[cat.value] : null
              return (
                <button
                  key={cat.value}
                  onClick={() => selectCategory(cat.value)}
                  className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                  style={{
                    background: isActive
                      ? (meta ? meta.dim : 'var(--teal-dim)')
                      : 'transparent',
                    border: `1px solid ${isActive
                      ? (meta ? meta.border : 'rgba(37,87,54,0.3)')
                      : 'var(--border)'}`,
                    color: isActive
                      ? (meta ? meta.accent : 'var(--teal)')
                      : 'var(--text-2)',
                  }}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--text-3)' }}>Sort:</span>
            {(['default', 'price_asc', 'price_desc'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className="text-xs px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: sortBy === s ? 'var(--surface-2)' : 'transparent',
                  border: `1px solid ${sortBy === s ? 'var(--border-hover)' : 'transparent'}`,
                  color: sortBy === s ? 'var(--text)' : 'var(--text-2)',
                }}
              >
                {s === 'default' ? 'Default' : s === 'price_asc' ? 'Price ↑' : 'Price ↓'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Result count */}
        <p className="text-xs mb-8" style={{ color: 'var(--text-3)' }}>
          Showing {sorted.length} protocol{sorted.length !== 1 ? 's' : ''}
          {activeCategory !== 'all' && ` in ${CATEGORY_META[activeCategory].label}`}
        </p>

        {mounted ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {sorted.map((peptide) => (
              <PeptideCard key={peptide.slug} peptide={peptide} />
            ))}
          </div>
        ) : (
          /* Skeleton on SSR to avoid hydration mismatch */
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-2xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div
          className="mt-20 p-10 rounded-3xl text-center"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            backgroundImage: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(37,87,54,0.04), transparent)',
          }}
        >
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-3)' }}>
            Not sure what you need?
          </p>
          <h2
            className="font-display mb-3"
            style={{ fontSize: 36, fontWeight: 300, color: 'var(--text)' }}
          >
            Let us build your protocol.
          </h2>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--text-2)' }}>
            A 5-minute intake assessment gives our physicians everything they need to recommend the right protocol for your goals.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium"
            style={{
              background: 'var(--teal)',
              color: '#FFFFFF',
              boxShadow: '0 0 32px rgba(37,87,54,0.2)',
            }}
          >
            Start Assessment
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  )
}
