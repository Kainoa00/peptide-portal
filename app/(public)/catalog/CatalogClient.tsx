'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { PEPTIDES, getPeptidesByCategory, type Category, type Peptide } from '@/lib/peptide-data'

const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'weight_loss', label: 'Weight Loss' },
  { value: 'recovery', label: 'Recovery' },
  { value: 'longevity', label: 'Longevity' },
  { value: 'cognitive', label: 'Cognitive' },
]

const CARD_IMG: Record<string, string> = {
  'tirzepatide': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
  'semaglutide': 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
  'bpc-157': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
  'tb-500': 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80',
  'bpc-157-tb-500': 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80',
  'cjc-1295-ipamorelin': 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
  'epitalon': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
  'ss-31': 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&q=80',
  'ghk-cu': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
  'mk-677': 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
  'semax': 'https://images.unsplash.com/photo-1557682260-96773eb01377?w=800&q=80',
  'selank': 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=800&q=80',
  'dihexa': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
}

function PeptideCard({ peptide }: { peptide: Peptide }) {
  const imgSrc = CARD_IMG[peptide.slug] || `https://picsum.photos/seed/${peptide.slug}/800/450`

  return (
    <Link href={`/catalog/${peptide.slug}`} className="no-underline group cursor-pointer">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
        <div className="h-[180px] overflow-hidden bg-[#F6F8F6]">
          <Image
            src={imgSrc}
            alt={`${peptide.name} — ${peptide.category.replace('_', ' ')} peptide therapy`}
            width={800}
            height={450}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4A574] mb-2">
            {peptide.category.replace('_', ' ')}
          </span>
          <h3 className="text-lg font-semibold text-[#131811] mb-2">
            {peptide.name}
          </h3>
          <p className="text-sm text-[#6B7280] leading-relaxed mb-3 flex-1">
            {peptide.description?.slice(0, 100)}...
          </p>
          <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
            <span className="text-xl font-bold text-[#131811]">
              ${Math.floor(peptide.priceMonthly)}
              <span className="text-sm font-normal text-[#6B7280]">/mo</span>
            </span>
            <span className="text-sm text-[#D4A574] font-semibold flex items-center gap-1">
              View
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function CatalogClient() {
  const searchParams = useSearchParams()
  const initialCat = (searchParams.get('cat') as Category) || 'all'
  const [category, setCategory] = useState<Category | 'all'>(initialCat)

  const peptides = getPeptidesByCategory(category)

  return (
    <div className="min-h-screen bg-[#F6F8F6] text-[#131811]">

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F6F8F6]/80 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 no-underline cursor-pointer">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#131811" strokeWidth="1.5" aria-hidden="true">
              <path d="M16 2L28 9v14l-12 7L4 23V9l12-7z" />
              <circle cx="16" cy="16" r="4" />
              <path d="M16 12v-4M20 14l3.5-2M20 18l3.5 2M16 20v4M12 18l-3.5 2M12 14l-3.5-2" />
            </svg>
            <span className="font-semibold text-lg text-[#131811]">PeptidePortal</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-[#131811] no-underline cursor-pointer hidden sm:block">
              Log in
            </Link>
            <Link
              href="/quiz"
              className="px-5 py-2.5 rounded-full bg-[#D4A574] text-white text-sm font-semibold hover:bg-[#B8864A] transition-colors duration-200 no-underline cursor-pointer"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-normal tracking-tight text-[#131811] mb-4">
            Our Protocols
          </h1>
          <p className="text-lg text-[#6B7280] max-w-lg mx-auto leading-relaxed">
            Browse our physician-prescribed peptide treatments. Every protocol is reviewed by a licensed doctor.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-20 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex gap-3 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                category === cat.value
                  ? 'bg-[#D4A574] text-white'
                  : 'bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#D4A574] hover:text-[#131811]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <main id="main-content" className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {peptides.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-[#F5F0E8] flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="1.5" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#131811] mb-2">No protocols found</h2>
              <p className="text-sm text-[#6B7280] mb-6">Try selecting a different category above.</p>
              <button
                onClick={() => setCategory('all')}
                className="px-6 py-3 rounded-full border border-[#E5E7EB] text-[#131811] font-semibold hover:border-[#D4A574] transition-colors duration-200 cursor-pointer"
              >
                View all protocols
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {peptides.map((peptide) => (
                <PeptideCard key={peptide.slug} peptide={peptide} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#152111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-normal text-white mb-4">
            Not sure which is right for you?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-md mx-auto leading-relaxed">
            Take our free consultation. A physician will help you find the perfect protocol.
          </p>
          <Link
            href="/quiz"
            className="px-8 py-4 rounded-full bg-[#D4A574] text-white font-semibold hover:bg-[#B8864A] transition-colors duration-200 no-underline inline-block cursor-pointer"
          >
            Start Free Consultation
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#152111] text-white pt-10 pb-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-white/40">
            &copy; 2026 Peptide Portal. All rights reserved. This site does not provide medical advice.
          </p>
        </div>
      </footer>
    </div>
  )
}
