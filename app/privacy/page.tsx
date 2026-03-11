import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Peptide Portal',
  description: 'Learn how Peptide Portal collects, uses, and protects your personal health information in compliance with HIPAA.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F6F8F6] text-[#131811]">
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

      {/* Main content */}
      <main id="main-content" className="max-w-[720px] mx-auto px-6 pt-16 pb-24">
        {/* Title */}
        <div className="mb-12">
          <p className="text-xs tracking-[0.1em] uppercase text-[#9CA3AF] mb-3">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#131811] leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#6B7280]">
            Effective date: January 1, 2026 &middot; Last updated: February 1, 2026
          </p>
        </div>

        <div className="flex flex-col gap-12">

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-[#131811] mb-4">
              Introduction
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-3">
              Peptide Portal, Inc. (&quot;Peptide Portal,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates a telehealth platform that connects patients with licensed physicians for evaluation and prescription of peptide therapy protocols. We are committed to protecting your privacy and handling your personal and health information with the highest standards of care.
            </p>
            <p className="text-[15px] text-[#6B7280] leading-relaxed">
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. Please read this policy carefully. By using Peptide Portal, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-[#131811] mb-4">
              Information We Collect
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-4">
              We collect information you provide directly to us, information collected automatically, and information from third-party services.
            </p>
            <div className="flex flex-col gap-5">
              {[
                {
                  title: 'Account Information',
                  body: 'Name, email address, password, and account preferences when you register for an account.',
                },
                {
                  title: 'Health & Medical Information (PHI)',
                  body: 'Medical history, current medications, conditions, symptoms, weight, height, age, activity level, sleep quality, and any other health-related information you provide during your intake assessment or consultations. This constitutes Protected Health Information (PHI) under HIPAA.',
                },
                {
                  title: 'Payment Information',
                  body: 'Billing details processed securely through our payment processor (Stripe). We do not store full credit card numbers on our servers.',
                },
                {
                  title: 'Usage Data',
                  body: 'IP address, browser type, pages visited, time spent on pages, and other diagnostic data collected automatically when you use our platform.',
                },
                {
                  title: 'Communications',
                  body: 'Messages exchanged with physicians and support staff through our secure messaging system.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="px-6 py-5 rounded-xl bg-white border border-[#E5E7EB]"
                >
                  <div className="text-sm font-semibold text-[#131811] mb-1.5">{item.title}</div>
                  <p className="text-sm text-[#6B7280] leading-relaxed m-0">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold text-[#131811] mb-4">
              How We Use Your Information
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="pl-5 flex flex-col gap-2.5">
              {[
                'Provide, operate, and improve our telehealth platform and services',
                'Facilitate physician review and prescription of your protocol',
                'Process payments and manage your subscription',
                'Send you order updates, prescription status, and important service notices',
                'Respond to your inquiries and provide customer support',
                'Ensure safety and screen for contraindications to peptide therapy',
                'Comply with applicable law, including HIPAA regulations',
                'Detect and prevent fraud and misuse of our platform',
              ].map((item) => (
                <li key={item} className="text-[15px] text-[#6B7280] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mt-4">
              We do not sell your personal information or PHI to third parties for marketing purposes.
            </p>
          </section>

          {/* HIPAA Compliance */}
          <section className="px-8 py-7 rounded-2xl bg-[#F5F0E8]/40 border border-[#D4A574]/15">
            <div className="flex items-center gap-3 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <h2 className="text-2xl font-semibold text-[#131811] m-0">
                HIPAA Compliance
              </h2>
            </div>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-3">
              Peptide Portal is a Covered Entity and Business Associate under the Health Insurance Portability and Accountability Act (HIPAA). We maintain administrative, physical, and technical safeguards to protect your PHI in accordance with the HIPAA Privacy Rule and Security Rule.
            </p>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-3">
              Key HIPAA protections we implement include:
            </p>
            <ul className="pl-5 flex flex-col gap-2">
              {[
                'End-to-end encryption of all PHI at rest and in transit (AES-256 and TLS 1.3)',
                'Business Associate Agreements (BAAs) with all vendors who access PHI',
                'Role-based access controls limiting PHI access to authorized personnel only',
                'Audit logs for all PHI access and modifications',
                'Annual HIPAA training for all staff with access to PHI',
                'Breach notification procedures in compliance with the HIPAA Breach Notification Rule',
              ].map((item) => (
                <li key={item} className="text-sm text-[#6B7280] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-[#131811] mb-4">
              Data Sharing
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-4">
              We share your information only in the following circumstances:
            </p>
            <div className="flex flex-col gap-4">
              {[
                {
                  title: 'Licensed Physicians',
                  body: 'Your PHI is shared with board-certified physicians on our platform solely for the purpose of reviewing your intake and issuing a prescription.',
                },
                {
                  title: 'Compounding Pharmacies',
                  body: 'Prescription and shipping information is shared with our PCAB-accredited partner pharmacies to fulfill your order.',
                },
                {
                  title: 'Service Providers',
                  body: 'We share data with vetted service providers (cloud hosting, payment processors, analytics) under BAAs or strict data processing agreements. These parties cannot use your data for their own purposes.',
                },
                {
                  title: 'Legal Requirements',
                  body: 'We may disclose your information if required by law, regulation, legal process, or governmental authority.',
                },
                {
                  title: 'With Your Consent',
                  body: 'We may share your information for any other purpose with your explicit consent.',
                },
              ].map((item) => (
                <div key={item.title} className="pl-4 border-l-2 border-[#D4A574]">
                  <div className="text-sm font-semibold text-[#131811] mb-1">{item.title}</div>
                  <p className="text-sm text-[#6B7280] leading-relaxed m-0">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-[#131811] mb-4">
              Data Security
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed">
              We use industry-standard security measures to protect your information, including AES-256 encryption at rest, TLS 1.3 encryption in transit, SOC 2 Type II compliant infrastructure, multi-factor authentication for provider and admin accounts, and regular third-party security audits. However, no method of electronic transmission or storage is 100% secure. While we strive to protect your PHI, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold text-[#131811] mb-4">
              Data Retention
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-3">
              We retain your account information and PHI for a minimum of 7 years from your last interaction, as required by applicable state and federal regulations governing medical records. Payment records are retained for 7 years for tax and accounting purposes. You may request deletion of non-medical account data; however, medical records must be retained per legal requirements.
            </p>
            <p className="text-[15px] text-[#6B7280] leading-relaxed">
              After the retention period, data is securely destroyed using industry-standard data destruction methods.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-[#131811] mb-4">
              Your Rights
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-4">
              Under HIPAA and applicable privacy laws, you have the following rights regarding your information:
            </p>
            <div className="flex flex-col gap-3">
              {[
                { right: 'Right of Access', desc: 'Request a copy of your PHI and medical records we hold.' },
                { right: 'Right to Correct', desc: 'Request correction of inaccurate or incomplete PHI.' },
                { right: 'Right to an Accounting', desc: 'Request a list of disclosures of your PHI we have made.' },
                { right: 'Right to Restrict', desc: 'Request restrictions on certain uses and disclosures of your PHI.' },
                { right: 'Right to Confidential Communications', desc: 'Request that we communicate with you in a specific way or at a specific location.' },
                { right: 'Right to Complain', desc: 'File a complaint with us or the U.S. Department of Health and Human Services if you believe your privacy rights have been violated.' },
              ].map((item) => (
                <div key={item.right} className="flex flex-col sm:flex-row gap-2 sm:gap-4 px-5 py-4 bg-white rounded-xl border border-[#E5E7EB]">
                  <div className="text-sm font-semibold text-[#D4A574] whitespace-nowrap sm:min-w-[160px]">{item.right}</div>
                  <p className="text-sm text-[#6B7280] leading-relaxed m-0">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-[#6B7280] leading-relaxed mt-4">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:privacy@peptideportal.com" className="text-[#D4A574] hover:text-[#B8864A] transition-colors">privacy@peptideportal.com</a>.
            </p>
          </section>

          {/* Contact */}
          <section className="px-8 py-7 rounded-2xl bg-white border border-[#E5E7EB]">
            <h2 className="text-2xl font-semibold text-[#131811] mb-4">
              Contact Us
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-3">
              If you have questions about this Privacy Policy or our data practices, please contact our Privacy Officer:
            </p>
            <div className="flex flex-col gap-1.5">
              <p className="text-sm text-[#6B7280] m-0">
                <strong className="text-[#131811]">Peptide Portal, Inc.</strong>
              </p>
              <p className="text-sm text-[#6B7280] m-0">
                Attn: Privacy Officer
              </p>
              <a href="mailto:privacy@peptideportal.com" className="text-sm text-[#D4A574] hover:text-[#B8864A] transition-colors">
                privacy@peptideportal.com
              </a>
            </div>
            <p className="text-[13px] text-[#9CA3AF] mt-4 leading-relaxed">
              We reserve the right to update this Privacy Policy at any time. We will notify you of material changes by email or by posting a prominent notice on our platform. Your continued use of our services after such modifications constitutes acceptance of the updated policy.
            </p>
          </section>

        </div>
      </main>
    </div>
  )
}
