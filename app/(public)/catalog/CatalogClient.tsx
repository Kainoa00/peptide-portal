'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { PEPTIDES, getPeptidesByCategory, type Category, type Peptide } from '@/lib/peptide-data'

const ACCENT = '#D4A574'
const ACCENT_DARK = '#8B7355'

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
    <Link href={`/catalog/${peptide.slug}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(42, 157, 110, 0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)'
      }}
      >
        <div style={{ height: '180px', overflow: 'hidden', background: '#f0f0f0' }}>
          <img src={imgSrc} alt={peptide.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ padding: '20px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: ACCENT,
          }}>
            {peptide.category.replace('_', ' ')}
          </span>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1A1A1A', margin: '8px 0' }}>
            {peptide.name}
          </h3>
          <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.5, marginBottom: '12px' }}>
            {peptide.description?.slice(0, 100)}...
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '20px', fontWeight: '700', color: '#1A1A1A' }}>
              ${Math.floor(peptide.priceMonthly)}
            </span>
            <span style={{ fontSize: '13px', color: ACCENT, fontWeight: '600' }}>
              View →
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
    <div style={{ minHeight: '100vh', background: '#FAFAF8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Navbar */}
      <header style={{ background: '#fff', borderBottom: '1px solid #E5E5E5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>P</span>
            </div>
            <span style={{ fontWeight: '600', fontSize: '18px', color: '#1A1A1A' }}>Peptide Portal</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/login" style={{ textDecoration: 'none', fontSize: '14px', fontWeight: '500', color: '#666' }}>Log in</Link>
            <Link href="/quiz" style={{ textDecoration: 'none', background: ACCENT, color: '#fff', padding: '10px 20px', borderRadius: '24px', fontSize: '14px', fontWeight: '600' }}>
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: '#fff', padding: '60px 24px', textAlign: 'center', borderBottom: '1px solid #E5E5E5' }}>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '700', color: '#1A1A1A', marginBottom: '12px' }}>
          Our Protocols
        </h1>
        <p style={{ fontSize: '16px', color: '#666', maxWidth: '500px', margin: '0 auto' }}>
          Browse our physician-prescribed peptide treatments. Every protocol is reviewed by a licensed doctor.
        </p>
      </section>

      {/* Category Tabs */}
      <div style={{ background: '#fff', padding: '20px 0', borderBottom: '1px solid #E5E5E5', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '12px', overflowX: 'auto' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              style={{
                padding: '10px 20px',
                borderRadius: '24px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                background: category === cat.value ? ACCENT : '#f5f5f5',
                color: category === cat.value ? '#fff' : '#666',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <main style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {peptides.map((peptide) => (
              <PeptideCard key={peptide.slug} peptide={peptide} />
            ))}
          </div>
        </div>
      </main>

      {/* CTA */}
      <section style={{ background: ACCENT_DARK, padding: '80px 24px', textAlign: 'center', color: '#fff' }}>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: '700', marginBottom: '16px' }}>
          Not sure which is right for you?
        </h2>
        <p style={{ fontSize: '16px', opacity: 0.8, marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
          Take our free consultation. A physician will help you find the perfect protocol.
        </p>
        <Link href="/quiz" style={{
          display: 'inline-block',
          background: '#fff',
          color: ACCENT_DARK,
          padding: '14px 32px',
          borderRadius: '32px',
          fontSize: '15px',
          fontWeight: '600',
          textDecoration: 'none',
        }}>
          Start Free Consultation
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1A1A1A', color: '#fff', padding: '40px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', opacity: 0.6 }}>© 2026 Peptide Portal. All rights reserved.</p>
      </footer>
    </div>
  )
}
