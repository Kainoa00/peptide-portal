'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { PEPTIDES, CATEGORY_META, getPeptidesByCategory, type Category, type Peptide } from '@/lib/peptide-data'

/* ─── Picsum seed per slug (deterministic, always loads) ─────────── */
const CARD_IMG: Record<string, string> = {
  'tirzepatide':         'https://picsum.photos/seed/fitness1/800/450',
  'semaglutide':         'https://picsum.photos/seed/science2/800/450',
  'bpc-157':             'https://picsum.photos/seed/athletic3/800/450',
  'tb-500':              'https://picsum.photos/seed/healing4/800/450',
  'bpc-157-tb-500':      'https://picsum.photos/seed/recovery5/800/450',
  'cjc-1295-ipamorelin': 'https://picsum.photos/seed/forest6/800/450',
  'epitalon':            'https://picsum.photos/seed/longevity7/800/450',
  'ss-31':               'https://picsum.photos/seed/cellular8/800/450',
  'ghk-cu':              'https://picsum.photos/seed/copper9/800/450',
  'mk-677':              'https://picsum.photos/seed/sleep10/800/450',
  'semax':               'https://picsum.photos/seed/neural11/800/450',
  'selank':              'https://picsum.photos/seed/calm12/800/450',
  'dihexa':              'https://picsum.photos/seed/synapse13/800/450',
}

/* ─── Peptide card ─── matches stitch 2 card structure exactly ───── */
function PeptideCard({ peptide }: { peptide: Peptide }) {
  const meta = CATEGORY_META[peptide.category]
  const imgSrc = CARD_IMG[peptide.slug] ?? `https://picsum.photos/seed/${peptide.slug}/800/450`

  return (
    <Link
      href={`/catalog/${peptide.slug}`}
      className="group flex flex-col rounded-xl transition-all duration-300 hover:shadow-xl"
      style={{
        background: 'var(--surface)',
        border: '1px solid rgba(19,24,17,0.07)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        padding: '1.5rem',
        textDecoration: 'none',
      }}
    >
      {/* Category badge */}
      <div className="mb-4">
        <span
          className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded"
          style={{ background: 'var(--surface-2)', color: 'var(--text-2)' }}
        >
          {meta.label}
        </span>
      </div>

      {/* Image */}
      <div
        className="mb-6 rounded-lg overflow-hidden"
        style={{ aspectRatio: '16/9', background: 'var(--surface-2)' }}
      >
        <Image
          src={imgSrc}
          alt={peptide.name}
          width={800}
          height={450}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
      </div>

      {/* Name */}
      <h3
        className="font-display mb-2"
        style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}
      >
        {peptide.name}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-6 flex-grow"
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

      {/* Learn More */}
      <div
        className="flex items-center justify-between text-sm font-bold"
        style={{ color: 'var(--text)' }}
      >
        <span>Learn More</span>
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2"
          className="transform group-hover:translate-x-1 transition-transform duration-200"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}

/* ─── Catalog Client ─────────────────────────────────────────────── */
export default function CatalogClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const initialCat = (searchParams.get('cat') ?? 'all') as Category | 'all'
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(initialCat)

  function selectCategory(cat: Category | 'all') {
    setActiveCategory(cat)
    const url = cat === 'all' ? '/catalog' : `/catalog?cat=${cat}`
    router.replace(url, { scroll: false })
  }

  const filtered = getPeptidesByCategory(activeCategory)

  const CATS: { value: Category | 'all'; label: string }[] = [
    { value: 'all',         label: 'All Protocols' },
    { value: 'weight_loss', label: 'Weight Loss' },
    { value: 'recovery',    label: 'Recovery' },
    { value: 'longevity',   label: 'Longevity' },
    { value: 'cognitive',   label: 'Cognitive Health' },
  ]

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ── Sticky navbar ────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(246,248,246,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#255736' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11" />
                <circle cx="12" cy="17" r="4" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ color: '#131811' }}>
              Peptide<span style={{ color: '#255736' }}>Portal</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <span className="text-sm font-semibold" style={{ color: '#255736', borderBottom: '2px solid #255736', paddingBottom: 4 }}>
              Library
            </span>
            <Link href="/quiz" className="text-sm font-medium transition-colors" style={{ color: 'var(--text-2)' }}>
              Take the Quiz
            </Link>
            <Link href="/login" className="text-sm font-medium transition-colors" style={{ color: 'var(--text-2)' }}>
              My Portal
            </Link>
          </nav>

          <Link
            href="/quiz"
            className="text-sm font-bold px-6 py-2.5 rounded-full transition-all"
            style={{ background: '#255736', color: '#FFFFFF' }}
          >
            Get Started →
          </Link>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-16 px-6">
        {/* Glow orbs */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: 600, height: 600, borderRadius: '50%',
            background: 'rgba(37,87,54,0.08)',
            filter: 'blur(120px)',
            transform: 'translate(30%, -50%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 pointer-events-none"
          style={{
            width: 600, height: 600, borderRadius: '50%',
            background: 'rgba(37,87,54,0.05)',
            filter: 'blur(120px)',
            transform: 'translate(-30%, 50%)',
          }}
        />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{ background: 'rgba(37,87,54,0.1)', color: '#131811' }}
          >
            Protocol Catalog
          </div>

          {/* Heading */}
          <h1
            className="font-display leading-tight"
            style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 700, color: 'var(--text)' }}
          >
            {PEPTIDES.length} protocols.{' '}
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>One platform.</span>
          </h1>

          {/* Subtext */}
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-2)', fontWeight: 300 }}
          >
            Explore our physician-vetted catalog of advanced peptide protocols designed for
            holistic wellness, longevity, and peak performance.
          </p>
        </div>
      </section>

      {/* ── Filter bar ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          {/* Category pills */}
          <div className="flex gap-3 overflow-x-auto pb-1">
            {CATS.map((cat) => {
              const isActive = activeCategory === cat.value
              return (
                <button
                  key={cat.value}
                  onClick={() => selectCategory(cat.value)}
                  className="whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all"
                  style={{
                    background: isActive ? '#255736' : 'var(--surface-2)',
                    color: isActive ? '#FFFFFF' : 'var(--text-2)',
                  }}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Sort label */}
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            <span className="font-medium">Sort by: Popular</span>
          </div>
        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((peptide) => (
            <PeptideCard key={peptide.slug} peptide={peptide} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/quiz"
            className="inline-block px-10 py-4 rounded-xl text-sm font-bold transition-all hover:opacity-90"
            style={{ background: '#131811', color: '#FFFFFF' }}
          >
            Not sure where to start? Take the quiz
          </Link>
          <p className="mt-4 text-sm" style={{ color: 'var(--text-2)' }}>
            Discover all {PEPTIDES.length} clinical protocols
          </p>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer
        className="py-12"
        style={{ background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#255736' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11" />
                <circle cx="12" cy="17" r="4" />
              </svg>
            </div>
            <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>Peptide Portal © 2025</p>
          </div>
          <div className="flex gap-8 text-sm" style={{ color: 'var(--text-2)' }}>
            <Link href="/privacy" style={{ color: 'var(--text-2)' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: 'var(--text-2)' }}>Terms of Service</Link>
            <span>Medical Disclaimer</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
