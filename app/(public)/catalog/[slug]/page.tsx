import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPeptideBySlug, CATEGORY_META, type Peptide } from '@/lib/peptide-data'

/* ─── Sticky prescription panel (client island) ──────────────────── */
import PrescriptionPanel from './PrescriptionPanel'

/* ─── FDA badge ──────────────────────────────────────────────────── */
function FdaBadge({ status, label }: { status: Peptide['fdaStatus']; label: string }) {
  const s = {
    approved: { bg: 'bg-green-100/60', text: 'text-green-800', border: 'border-green-300/40' },
    research: { bg: 'bg-[#D4A574]/10', text: 'text-[#D4A574]', border: 'border-[#D4A574]/25' },
    flagged: { bg: 'bg-red-100/60', text: 'text-red-500', border: 'border-red-300/40' },
  }[status]
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium ${s.bg} ${s.text} border ${s.border}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}

/* ─── Section heading ─────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-widest text-[#9CA3AF] mb-4">
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
            className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: accent }}
          />
          <span className="text-sm leading-relaxed text-[#6B7280]">
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
    <div className="bg-[#F6F8F6] min-h-screen" id="main-content">

      {/* ── Navbar ───────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 no-underline cursor-pointer">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#131811" strokeWidth="1.5" aria-hidden="true">
              <path d="M16 2L28 9v14l-12 7L4 23V9l12-7z" />
              <circle cx="16" cy="16" r="4" />
              <path d="M16 12v-4M20 14l3.5-2M20 18l3.5 2M16 20v4M12 18l-3.5 2M12 14l-3.5-2" />
            </svg>
            <span className="text-xl font-semibold tracking-tight text-[#131811]">
              PeptidePortal
            </span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/catalog"
              className="text-sm flex items-center gap-1.5 text-[#6B7280] hover:text-[#131811] transition-colors no-underline cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Catalog
            </Link>
            <Link
              href="/quiz"
              className="text-sm font-medium px-5 py-2.5 rounded-full bg-[#D4A574] text-white hover:bg-[#B8864A] transition-colors no-underline cursor-pointer"
            >
              Take the Quiz
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero header ──────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden border-b border-[#E5E7EB]"
        style={{
          background: `radial-gradient(ellipse 60% 100% at 50% 0%, ${meta.dim} 0%, transparent 60%), #F6F8F6`,
        }}
      >
        {/* Catalog number watermark */}
        <div
          className="absolute right-12 top-0 bottom-0 flex items-center font-display select-none pointer-events-none text-[#131811]/5 leading-none font-light italic"
          style={{ fontSize: 'clamp(160px, 18vw, 240px)' }}
        >
          {String(peptide.num).padStart(2, '0')}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF] mb-8">
            <Link href="/catalog" className="text-[#6B7280] hover:text-[#131811] transition-colors no-underline cursor-pointer">Catalog</Link>
            <span>/</span>
            <span style={{ color: meta.accent }}>
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
              className="font-display mb-2 leading-none text-[#131811] font-light"
              style={{ fontSize: 'clamp(48px, 6vw, 80px)' }}
            >
              {peptide.name}
            </h1>

            {/* Tag */}
            <p className="text-sm uppercase tracking-widest mb-6" style={{ color: meta.accent }}>
              {peptide.tag}
            </p>

            <p className="text-base text-[#6B7280] leading-relaxed">
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
                    className="p-5 rounded-xl bg-white border border-[#E5E7EB]"
                  >
                    <p className="text-xs uppercase tracking-wider text-[#9CA3AF] mb-1.5">
                      {spec.label}
                    </p>
                    <p className="text-sm font-medium text-[#131811] leading-snug">
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
                className="p-6 rounded-xl bg-white"
                style={{
                  border: `1px solid ${meta.border}`,
                  borderLeft: `3px solid ${meta.accent}`,
                }}
              >
                <p className="text-sm text-[#6B7280] leading-loose">
                  {peptide.mechanism}
                </p>
              </div>
            </section>

            {/* Expected Benefits */}
            <section>
              <SectionLabel>Expected Benefits</SectionLabel>
              <div className="p-6 rounded-xl bg-white border border-[#E5E7EB]">
                <BulletList items={peptide.benefits} accent={meta.accent} />
              </div>
            </section>

            {/* Considerations */}
            <section>
              <SectionLabel>Clinical Considerations</SectionLabel>
              <div className="p-6 rounded-xl bg-red-50/50 border border-red-200/30">
                <div className="flex items-center gap-2 mb-4">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E87070" strokeWidth="2" aria-hidden="true">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span className="text-xs font-medium uppercase tracking-wider text-red-400">
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
                className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#131811] transition-colors no-underline cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to full catalog
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
