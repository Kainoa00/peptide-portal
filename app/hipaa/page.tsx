import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'HIPAA Compliance | Peptide Portal',
  description: 'How Peptide Portal protects patient data and maintains HIPAA compliance.',
}

export default function HIPAAPage() {
  return (
    <div className="min-h-screen bg-[#F6F8F6]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 no-underline cursor-pointer">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#131811" strokeWidth="1.5" aria-hidden="true">
              <path d="M16 2L28 9v14l-12 7L4 23V9l12-7z" />
              <circle cx="16" cy="16" r="4" />
              <path d="M16 12v-4M20 14l3.5-2M20 18l3.5 2M16 20v4M12 18l-3.5 2M12 14l-3.5-2" />
            </svg>
            <span className="font-semibold text-lg text-[#131811]">PeptidePortal</span>
          </Link>
          <Link href="/" className="text-sm text-[#6B7280] no-underline hover:text-[#131811] transition-colors cursor-pointer">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline mr-1" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>
      </header>

      <main id="main-content" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-3">Legal</p>
        <h1 className="font-display text-4xl md:text-5xl font-normal tracking-tight text-[#131811] mb-6">
          HIPAA Compliance
        </h1>
        <p className="text-lg text-[#6B7280] leading-relaxed mb-12">
          Peptide Portal is built from the ground up to protect patient health information (PHI).
          We maintain full HIPAA compliance to protect your patients and your practice.
        </p>

        <div className="flex flex-col gap-6">
          {[
            {
              title: 'End-to-End Encryption',
              desc: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Patient information is never transmitted or stored in plain text.',
            },
            {
              title: 'Access Controls',
              desc: 'Role-based access ensures only authorized personnel can view patient data. All access is logged and auditable.',
            },
            {
              title: 'Secure Infrastructure',
              desc: 'Hosted on SOC 2 Type II certified infrastructure with 99.9% uptime. Data centers are US-based.',
            },
            {
              title: 'Business Associate Agreement (BAA)',
              desc: 'We sign BAAs with all healthcare providers, establishing our legal responsibility to protect PHI.',
            },
            {
              title: 'Audit Logging',
              desc: 'Comprehensive logging of all data access, modifications, and system events. Available for compliance audits.',
            },
            {
              title: 'Data Retention & Deletion',
              desc: 'Patient data can be automatically deleted after a configurable period, or on demand. Patients can request their data be deleted.',
            },
            {
              title: 'Incident Response',
              desc: 'In the unlikely event of a breach, we have documented procedures to notify affected parties within 72 hours as required by HIPAA.',
            },
            {
              title: 'Regular Security Audits',
              desc: 'Third-party security audits conducted quarterly. Annual penetration testing by certified security firms.',
            },
          ].map((item) => (
            <section key={item.title} className="bg-white rounded-2xl p-6 border border-[#E5E7EB]">
              <h2 className="text-xl font-semibold text-[#131811] mb-3 border-b border-[#E5E7EB] pb-2">
                {item.title}
              </h2>
              <p className="text-[#6B7280] leading-relaxed">
                {item.desc}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-12 bg-[#D4A574] rounded-2xl p-8 text-white">
          <h3 className="text-xl font-semibold mb-3">
            Questions about compliance?
          </h3>
          <p className="text-white/90 leading-relaxed mb-5">
            Our compliance team is here to answer any questions about our security practices and HIPAA compliance.
          </p>
          <a href="mailto:compliance@peptideportal.com" className="text-white font-semibold underline hover:text-white/80 transition-colors">
            compliance@peptideportal.com
          </a>
        </div>
      </main>
    </div>
  )
}
