'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { PEPTIDES, CATEGORY_META, getPeptidesByCategory, type Category, type Peptide } from '@/lib/peptide-data'

/* ─── Category gradient map for image placeholders ───────────────── */
const CARD_GRADIENTS: Record<Category, string> = {
  weight_loss: 'linear-gradient(135deg, rgba(232,112,112,0.14) 0%, rgba(232,112,112,0.04) 100%)',
  recovery:    'linear-gradient(135deg, rgba(37,87,54,0.14) 0%, rgba(37,87,54,0.04) 100%)',
  longevity:   'linear-gradient(135deg, rgba(212,151,90,0.16) 0%, rgba(212,151,90,0.05) 100%)',
  cognitive:   'linear-gradient(135deg, rgba(155,142,232,0.16) 0%, rgba(155,142,232,0.05) 100%)',
}

/* ─── Peptide card ───────────────────────────────────────────────── */
function PeptideCard({ peptide }: { peptide: Peptide }) {
  const meta = CATEGORY_META[peptide.category]
  const gradient = CARD_GRADIENTS[peptide.category]

  return (
    <Link
      href={`/catalog/${peptide.slug}`}
      className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        textDecoration: 'none',
      }}
    >
      {/* Image / thumbnail area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <div
          className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
          style={{ background: gradient }}
        >
          {/* Faint peptide name as visual texture */}
          <span
            className="font-display select-none pointer-events-none text-center px-4"
            style={{
              fontSize: 'clamp(18px, 4vw, 32px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: meta.accent,
              opacity: 0.28,
              lineHeight: 1.1,
            }}
          >
            {peptide.name}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6">
        {/* Category badge */}
        <div className="mb-4">
          <span
            className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded"
            style={{ background: meta.dim, color: meta.accent }}
          >
            {meta.label}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-display mb-2 leading-tight"
          style={{ fontSize: 22, fontWeight: 500, color: 'var(--text)' }}
        >
          {peptide.name}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed flex-grow mb-5"
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

        {/* Bottom row */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <div>
            <span
              className="font-display text-xl"
              style={{ fontWeight: 300, color: 'var(--text)' }}
            >
              ${peptide.priceMonthly}
            </span>
            <span className="text-xs ml-1" style={{ color: 'var(--text-2)' }}>/mo</span>
          </div>
          <div
            className="flex items-center gap-1 text-sm font-bold transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: 'var(--text-2)' }}
          >
            Learn More
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
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
    { value: 'all',         label: `All Protocols` },
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
      <section
        className="relative overflow-hidden pt-20 pb-16 px-6"
        style={{
          background: `
            radial-gradient(ellipse 70% 80% at 50% -20%, rgba(37,87,54,0.05) 0%, transparent 60%),
            var(--bg)
          `,
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Glows */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(37,87,54,0.06)',
            filter: 'blur(100px)',
            transform: 'translate(30%, -40%)',
          }}
        />

        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ background: 'rgba(37,87,54,0.08)', color: 'var(--teal)' }}
          >
            Protocol Catalog
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(40px, 7vw, 72px)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--text)',
              lineHeight: 1.05,
            }}
          >
            {PEPTIDES.length} protocols.{' '}
            <em style={{ fontWeight: 300 }}>One platform.</em>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-2)', fontWeight: 300 }}
          >
            Physician-vetted peptide protocols designed for performance, longevity, and wellness.
            Not sure where to start?{' '}
            <Link href="/quiz" style={{ color: 'var(--teal)' }}>
              Take the quiz →
            </Link>
          </p>
        </div>
      </section>

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
                  className="px-5 py-1.5 rounded-full text-sm font-medium transition-all"
                  style={{
                    background: isActive
                      ? (meta ? meta.dim : 'rgba(37,87,54,0.1)')
                      : 'transparent',
                    border: `1px solid ${isActive
                      ? (meta ? meta.border : 'rgba(37,87,54,0.3)')
                      : 'var(--border)'}`,
                    color: isActive
                      ? (meta ? meta.accent : 'var(--teal)')
                      : 'var(--text-2)',
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--text-3)' }}>Sort by:</span>
            {(['default', 'price_asc', 'price_desc'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className="text-xs px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: sortBy === s ? 'var(--surface-2)' : 'transparent',
                  border: `1px solid ${sortBy === s ? 'var(--border-hover)' : 'transparent'}`,
                  color: sortBy === s ? 'var(--text)' : 'var(--text-2)',
                  fontWeight: sortBy === s ? 600 : 400,
                }}
              >
                {s === 'default' ? 'Popular' : s === 'price_asc' ? 'Price ↑' : 'Price ↓'}
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sorted.map((peptide) => (
              <PeptideCard key={peptide.slug} peptide={peptide} />
            ))}
          </div>
        ) : (
          /* Skeleton on SSR */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-72 rounded-xl"
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
            style={{ fontSize: 36, fontWeight: 300, fontStyle: 'italic', color: 'var(--text)' }}
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
