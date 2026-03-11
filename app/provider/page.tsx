import Link from 'next/link'

export default function ProviderPage() {
  return (
    <div className="min-h-screen bg-[#F6F8F6] text-[#131811]">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F6F8F6]/80 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 no-underline cursor-pointer">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#131811" strokeWidth="1.5" aria-hidden="true">
              <path d="M16 2L28 9v14l-12 7L4 23V9l12-7z" />
              <circle cx="16" cy="16" r="4" />
              <path d="M16 12v-4M20 14l3.5-2M20 18l3.5 2M16 20v4M12 18l-3.5 2M12 14l-3.5-2" />
            </svg>
            <span className="font-semibold text-lg text-[#131811]">PeptidePortal</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/provider/demo" className="text-sm font-medium text-[#6B7280] hover:text-[#131811] transition-colors no-underline cursor-pointer hidden sm:block">
              Request Demo
            </Link>
            <Link href="/provider/login" className="text-sm font-medium text-[#6B7280] hover:text-[#131811] transition-colors no-underline cursor-pointer hidden sm:block">
              Log in
            </Link>
            <Link
              href="/provider/signup"
              className="px-5 py-2.5 rounded-full bg-[#D4A574] text-white text-sm font-semibold hover:bg-[#B8864A] transition-colors duration-200 no-underline cursor-pointer"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-20 md:pb-28 bg-gradient-to-b from-[#F6F8F6] to-[#F5F0E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[#F5F0E8] px-4 py-1.5 rounded-full text-xs font-semibold text-[#B8864A] mb-6">
            For Healthcare Providers
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-[#131811] mb-6">
            Scale your peptide practice without the administrative burden.
          </h1>
          <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-10">
            Automated patient intake, recurring revenue subscriptions, and full compliance —
            all in one platform built for peptide therapy providers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/provider/signup"
              className="px-8 py-4 rounded-full bg-[#D4A574] text-white font-semibold hover:bg-[#B8864A] transition-colors duration-200 no-underline cursor-pointer"
            >
              Start Free Pilot
            </Link>
            <Link
              href="/provider/login"
              className="px-8 py-4 rounded-full border border-[#E5E7EB] text-[#131811] font-semibold hover:border-[#D4A574] transition-colors duration-200 no-underline cursor-pointer"
            >
              Provider Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight text-[#131811] text-center mb-14">
            Everything you need to grow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                    <rect x="9" y="3" width="6" height="4" rx="1" />
                    <path d="M9 14l2 2 4-4" />
                  </svg>
                ),
                title: 'Automated Intake',
                desc: 'Patients complete health assessments online. You review and approve — no phone calls, no paperwork.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                ),
                title: 'Recurring Revenue',
                desc: 'Subscription-based model means predictable monthly income. Patients stay on protocol longer.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                title: 'HIPAA Compliant',
                desc: 'Built with security in mind. BAA available. All data encrypted at rest and in transit.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                ),
                title: 'Patient Messaging',
                desc: 'Secure in-app messaging between you and patients. No WhatsApp, no Signal — compliant.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                ),
                title: 'Pharmacy Network',
                desc: 'We work with PCAB-accredited compounding pharmacies. Shipments tracked automatically.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M18 20V10M12 20V4M6 20v-6" />
                  </svg>
                ),
                title: 'Dashboard & Analytics',
                desc: 'See patient volumes, revenue, and retention at a glance. Make data-driven decisions.'
              },
            ].map((feature) => (
              <div key={feature.title} className="bg-[#F6F8F6] rounded-2xl p-8">
                <div className="text-[#D4A574] mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-[#131811] mb-3">{feature.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 md:py-28 bg-[#F6F8F6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight text-[#131811] mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-[#6B7280] mb-14">
            No per-patient fees. No setup costs. Cancel anytime.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-10 border border-[#E5E7EB]">
              <h3 className="text-xl font-semibold text-[#131811] mb-2">Starter</h3>
              <div className="mb-2">
                <span className="font-display text-5xl font-normal text-[#131811]">$199</span>
                <span className="text-lg text-[#6B7280]">/mo</span>
              </div>
              <p className="text-sm text-[#6B7280] mb-6">Up to 25 patients</p>
              <ul className="text-left space-y-3">
                {['Automated intake', 'Patient dashboard', 'Basic messaging', 'Email support'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-10 border-2 border-[#D4A574] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4A574] text-white px-4 py-1 rounded-full text-xs font-semibold">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold text-[#131811] mb-2">Growth</h3>
              <div className="mb-2">
                <span className="font-display text-5xl font-normal text-[#131811]">$399</span>
                <span className="text-lg text-[#6B7280]">/mo</span>
              </div>
              <p className="text-sm text-[#6B7280] mb-6">Up to 100 patients</p>
              <ul className="text-left space-y-3">
                {['Everything in Starter', 'Advanced analytics', 'Priority support', 'Custom branding', 'API access'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#152111]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-normal text-white mb-4">
            Ready to grow your practice?
          </h2>
          <p className="text-lg text-white/70 mb-8">
            Join Utah providers who are scaling their peptide therapy practices with Peptide Portal.
          </p>
          <Link
            href="/provider/signup"
            className="px-8 py-4 rounded-full bg-[#D4A574] text-white font-semibold hover:bg-[#B8864A] transition-colors duration-200 no-underline inline-block cursor-pointer text-lg"
          >
            Request a Demo
          </Link>
          <p className="text-xs text-white/50 mt-4">
            10 minutes. No pressure. See it in action.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#152111] text-white pt-6 pb-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-white/40">
            &copy; 2026 Peptide Portal. For healthcare providers. Not for patient use.
          </p>
        </div>
      </footer>
    </div>
  )
}
