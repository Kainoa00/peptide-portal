import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPeptideBySlug, CATEGORY_META, type Peptide } from '@/lib/peptide-data'

/* ─── Sticky prescription panel (client island) ──────────────────── */
import PrescriptionPanel from './PrescriptionPanel'

/* ─── FDA badge ──────────────────────────────────────────────────── */
function FdaBadge({ status, label }: { status: Peptide['fdaStatus']; label: string }) {
  const s = {
    approved: { bg: 'rgba(37,87,54,0.1)', color: '#255736', border: 'rgba(37,87,54,0.25)' },
    research:  { bg: 'rgba(212,151,90,0.1)', color: '#D4975A', border: 'rgba(212,151,90,0.25)' },
    flagged:   { bg: 'rgba(232,112,112,0.1)', color: '#E87070', border: 'rgba(232,112,112,0.25)' },
  }[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium"
      style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}

/* ─── Section heading ─────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-3)' }}>
      {children}
    </p>
  )
}

/* ─── Bullet list ─────────────────────────────────────────────────── */
function BulletList({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: accent }}
          />
          <span className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default async function PeptideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const peptide = getPeptideBySlug(slug)
  if (!peptide) notFound()

  const meta = CATEGORY_META[peptide.category]

  const fdaLabel =
    peptide.fdaStatus === 'approved' ? 'FDA Approved' :
    peptide.fdaStatus === 'flagged'  ? 'Research Compound (Category 2)' :
    'Research Compound'

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

          <nav className="flex items-center gap-6">
            <Link
              href="/catalog"
              className="text-sm flex items-center gap-1.5 transition-colors"
              style={{ color: 'var(--text-2)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Catalog
            </Link>
            <Link
              href="/quiz"
              className="text-sm font-medium px-5 py-2.5 rounded-full"
              style={{ background: 'var(--teal)', color: '#FFFFFF' }}
            >
              Take the Quiz →
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero header ──────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 60% 100% at 50% 0%, ${meta.dim} 0%, transparent 60%),
            var(--bg)
          `,
          borderBottom: '1px solid var(--border)',
        }}
      >
        {/* Catalog number watermark */}
        <div
          className="absolute right-12 top-0 bottom-0 flex items-center font-display select-none pointer-events-none"
          style={{
            fontSize: 'clamp(160px, 18vw, 240px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(19,24,17,0.05)',
            lineHeight: 1,
          }}
        >
          {String(peptide.num).padStart(2, '0')}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-8" style={{ color: 'var(--text-3)' }}>
            <Link href="/catalog" style={{ color: 'var(--text-2)' }}>Catalog</Link>
            <span>/</span>
            <span
              style={{ color: meta.accent }}
            >
              {meta.label}
            </span>
            <span>/</span>
            <span>{peptide.name}</span>
          </div>

          <div className="max-w-2xl">
            {/* Category + FDA */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="text-xs font-medium tracking-widest uppercase px-3 py-1.5 rounded-full"
                style={{ background: meta.dim, color: meta.accent, border: `1px solid ${meta.border}` }}
              >
                {meta.label}
              </span>
              <FdaBadge status={peptide.fdaStatus} label={fdaLabel} />
            </div>

            {/* Name */}
            <h1
              className="font-display mb-2 leading-none"
              style={{ fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 300, color: 'var(--text)' }}
            >
              {peptide.name}
            </h1>

            {/* Tag */}
            <p className="text-sm uppercase tracking-widest mb-6" style={{ color: meta.accent }}>
              {peptide.tag}
            </p>

            <p className="text-base leading-relaxed" style={{ color: 'var(--text-2)' }}>
              {peptide.description}
            </p>
          </div>
        </div>
      </div>

      {/* ── Body: content + sticky panel ─────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid lg:grid-cols-[1fr_360px] gap-14 items-start">

          {/* ── Left: science content ─────────────────────────────── */}
          <div className="space-y-14">

            {/* At a Glance */}
            <section>
              <SectionLabel>At a Glance</SectionLabel>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: 'Dosage', value: peptide.dosageRange },
                  { label: 'Route', value: peptide.deliveryMethod },
                  { label: 'Cycle', value: peptide.cycleLength },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="p-5 rounded-xl"
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <p className="text-xs uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-3)' }}>
                      {spec.label}
                    </p>
                    <p className="text-sm font-medium leading-snug" style={{ color: 'var(--text)' }}>
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Mechanism of Action */}
            <section>
              <SectionLabel>Mechanism of Action</SectionLabel>
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'var(--surface)',
                  border: `1px solid ${meta.border}`,
                  borderLeft: `3px solid ${meta.accent}`,
                }}
              >
                <p className="text-sm leading-loose" style={{ color: 'var(--text-2)', lineHeight: 1.9 }}>
                  {peptide.mechanism}
                </p>
              </div>
            </section>

            {/* Expected Benefits */}
            <section>
              <SectionLabel>Expected Benefits</SectionLabel>
              <div
                className="p-6 rounded-xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <BulletList items={peptide.benefits} accent={meta.accent} />
              </div>
            </section>

            {/* Considerations */}
            <section>
              <SectionLabel>Clinical Considerations</SectionLabel>
              <div
                className="p-6 rounded-xl"
                style={{
                  background: 'rgba(232,112,112,0.04)',
                  border: '1px solid rgba(232,112,112,0.15)',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E87070" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#E87070' }}>
                    Important — reviewed by your physician
                  </span>
                </div>
                <BulletList items={peptide.considerations} accent="#E87070" />
              </div>
            </section>

            {/* Related protocols */}
            <section>
              <SectionLabel>Other Protocols</SectionLabel>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'var(--text-2)' }}
              >
                ← Back to full catalog
              </Link>
            </section>
          </div>

          {/* ── Right: sticky prescription panel ─────────────────── */}
          <div className="lg:sticky lg:top-24">
            <PrescriptionPanel peptide={peptide} />
          </div>
        </div>
      </div>
    </div>
  )
}
