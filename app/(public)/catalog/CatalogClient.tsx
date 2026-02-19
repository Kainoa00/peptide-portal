'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { PEPTIDES, CATEGORY_META, getPeptidesByCategory, type Category, type Peptide } from '@/lib/peptide-data'

/* ─── Science-themed Unsplash images per slug ────────────────────── */
const CARD_IMG: Record<string, string> = {
  'tirzepatide':
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
  'semaglutide':
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
  'bpc-157':
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
  'tb-500':
    'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80',
  'bpc-157-tb-500':
    'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=800&q=80',
  'cjc-1295-ipamorelin':
    'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
  'epitalon':
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80',
  'ss-31':
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
  'ghk-cu':
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
  'mk-677':
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
  'semax':
    'https://images.unsplash.com/photo-1557682260-96773eb01377?auto=format&fit=crop&w=800&q=80',
  'selank':
    'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=800&q=80',
  'dihexa':
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
}

/* ─── Peptide card ── exact stitch 2 card structure ─────────────── */
function PeptideCard({ peptide }: { peptide: Peptide }) {
  const meta = CATEGORY_META[peptide.category]
  const imgSrc = CARD_IMG[peptide.slug] ?? `https://picsum.photos/seed/${peptide.slug}/800/450`

  return (
    <Link
      href={`/catalog/${peptide.slug}`}
      className="group flex flex-col rounded-xl transition-all duration-300 hover:shadow-xl"
      style={{
        background: '#FFFFFF',
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
          style={{ background: '#e9f0e9', color: '#4a6741' }}
        >
          {meta.label}
        </span>
      </div>

      {/* Photo */}
      <div
        className="mb-6 rounded-lg overflow-hidden"
        style={{ aspectRatio: '16/9', background: '#e9f0e9' }}
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
        style={{ fontSize: 24, fontWeight: 700, color: '#131811', lineHeight: 1.2 }}
      >
        {peptide.name}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-6 flex-grow"
        style={{
          color: 'rgba(19,24,17,0.65)',
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
        style={{ color: '#131811' }}
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
    router.replace(cat === 'all' ? '/catalog' : `/catalog?cat=${cat}`, { scroll: false })
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
    /* ── Warm cream bg — matches stitch 2 #fdfcf8 ───────────────── */
    <div style={{ background: '#fdfcf8', minHeight: '100vh' }}>

      {/* ── Sticky navbar ────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'rgba(253,252,248,0.88)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(19,24,17,0.08)',
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
            <Link href="/quiz" className="text-sm font-medium" style={{ color: 'rgba(19,24,17,0.6)' }}>
              Take the Quiz
            </Link>
            <Link href="/login" className="text-sm font-medium" style={{ color: 'rgba(19,24,17,0.6)' }}>
              My Portal
            </Link>
          </nav>

          <Link
            href="/quiz"
            className="text-sm font-bold px-6 py-2.5 rounded-full"
            style={{ background: '#255736', color: '#FFFFFF' }}
          >
            Get Started →
          </Link>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-16 px-6">
        {/* Very subtle warm glows — not green-tinted */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: 600, height: 600, borderRadius: '50%',
            background: 'rgba(37,87,54,0.05)',
            filter: 'blur(120px)',
            transform: 'translate(30%, -50%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 pointer-events-none"
          style={{
            width: 600, height: 600, borderRadius: '50%',
            background: 'rgba(180,200,180,0.08)',
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

          {/* Bold serif heading — matches stitch 2 font-bold */}
          <h1
            className="font-display leading-tight"
            style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 700, color: '#131811' }}
          >
            {PEPTIDES.length} protocols.{' '}
            <br />
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>One platform.</span>
          </h1>

          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'rgba(19,24,17,0.65)', fontWeight: 300 }}
          >
            Explore our physician-vetted catalog of advanced peptide treatments designed
            for holistic wellness, longevity, and peak performance.
          </p>
        </div>
      </section>

      {/* ── Filter bar ───────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8"
          style={{ borderBottom: '1px solid rgba(19,24,17,0.08)' }}
        >
          <div className="flex gap-3 overflow-x-auto pb-1">
            {CATS.map((cat) => {
              const isActive = activeCategory === cat.value
              return (
                <button
                  key={cat.value}
                  onClick={() => selectCategory(cat.value)}
                  className="whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all"
                  style={{
                    background: isActive ? '#255736' : '#e9f0e9',
                    color: isActive ? '#FFFFFF' : 'rgba(19,24,17,0.65)',
                  }}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2 text-sm" style={{ color: 'rgba(19,24,17,0.5)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            <span className="font-medium">Sort by: Popular</span>
          </div>
        </div>
      </section>

      {/* ── Protocol grid ────────────────────────────────────────── */}
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
            className="inline-block px-10 py-4 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
            style={{ background: '#131811', color: '#FFFFFF' }}
          >
            Show All Protocols
          </Link>
          <p className="mt-4 text-sm" style={{ color: 'rgba(19,24,17,0.5)' }}>
            Discover all {PEPTIDES.length} clinical treatments
          </p>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer
        className="py-12"
        style={{ background: '#f4f7f4', borderTop: '1px solid rgba(19,24,17,0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#255736' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11" />
                <circle cx="12" cy="17" r="4" />
              </svg>
            </div>
            <p className="text-sm font-bold" style={{ color: '#131811' }}>Peptide Portal © 2025</p>
          </div>
          <div className="flex gap-8 text-sm" style={{ color: 'rgba(19,24,17,0.55)' }}>
            <Link href="/privacy" style={{ color: 'rgba(19,24,17,0.55)' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: 'rgba(19,24,17,0.55)' }}>Terms of Service</Link>
            <span>Medical Disclaimer</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
