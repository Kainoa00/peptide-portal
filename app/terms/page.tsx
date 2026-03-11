import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Peptide Portal',
  description: 'Review the Terms of Service for Peptide Portal, including service description, medical disclaimer, prescription policy, and user obligations.',
}

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-sm text-[#6B7280]">
            Effective date: January 1, 2026 &middot; Last updated: February 1, 2026
          </p>
        </div>

        <div className="flex flex-col gap-12">

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-semibold text-[#131811] mb-4">
              1. Service Description
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-3">
              Peptide Portal, Inc. (&quot;Peptide Portal,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates a telehealth platform that facilitates connections between patients and independent, licensed physicians who may evaluate, diagnose, and prescribe treatments including peptide therapy protocols. Peptide Portal itself is not a pharmacy or prescriber. Prescriptions are issued solely by licensed physicians on our platform.
            </p>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-3">
              Our services include:
            </p>
            <ul className="pl-5 flex flex-col gap-2.5">
              {[
                'Online intake assessment and health questionnaire tools',
                'Secure communication platform connecting patients and physicians',
                'Coordination with PCAB-accredited compounding pharmacies for prescription fulfillment',
                'Patient portal for tracking protocol status and physician communications',
                'Educational content about peptide therapy (for informational purposes only)',
              ].map((item) => (
                <li key={item} className="text-[15px] text-[#6B7280] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Medical Disclaimer */}
          <section className="px-8 py-7 rounded-2xl bg-[#F5F0E8] border border-[#D4A574]/30">
            <div className="flex items-center gap-3 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="1.5" aria-hidden="true">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <h2 className="text-2xl font-semibold text-[#131811] m-0">
                2. Medical Disclaimer
              </h2>
            </div>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-3">
              <strong className="text-[#B8864A]">Peptide Portal is not an emergency medical service.</strong> If you are experiencing a medical emergency, call 911 or your local emergency number immediately, or go to your nearest emergency room.
            </p>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-3">
              The content on our platform, including educational articles, protocol descriptions, and any AI-generated guidance, is for informational purposes only and does not constitute medical advice. A licensed physician&#39;s evaluation is required before any prescription is issued.
            </p>
            <p className="text-[15px] text-[#6B7280] leading-relaxed">
              Telehealth services may not be appropriate for all medical conditions. Our physicians may determine that in-person evaluation is required and may decline to prescribe based on their clinical judgment.
            </p>
          </section>

          {/* Prescription and Medication Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-[#131811] mb-4">
              3. Prescription and Medication Policy
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-4">
              All prescriptions issued through Peptide Portal are subject to the following terms:
            </p>
            <div className="flex flex-col gap-4">
              {[
                {
                  title: 'Physician Discretion',
                  body: 'Prescription issuance is at the sole discretion of the licensed physician reviewing your case. Payment of a consultation fee does not guarantee a prescription.',
                },
                {
                  title: 'Accurate Information',
                  body: 'You must provide complete and accurate health information. Providing false information to obtain a prescription is illegal and may result in immediate account termination and referral to appropriate authorities.',
                },
                {
                  title: 'Compounded Medications',
                  body: 'Medications dispensed through our partner pharmacies are compounded preparations. Compounded medications are not FDA-approved, though they are prepared in compliance with USP standards at PCAB-accredited facilities.',
                },
                {
                  title: 'Proper Use',
                  body: 'You agree to use prescribed medications only as directed by your physician. Medications are for your personal use only and may not be shared, resold, or transferred.',
                },
                {
                  title: 'Controlled Substances',
                  body: 'Peptide Portal does not prescribe controlled substances (DEA Schedule I\u2013V).',
                },
              ].map((item) => (
                <div key={item.title} className="pl-4 border-l-2 border-[#D4A574]">
                  <div className="text-sm font-semibold text-[#131811] mb-1">{item.title}</div>
                  <p className="text-sm text-[#6B7280] leading-relaxed m-0">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-[#131811] mb-4">
              4. Payment Terms
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-3">
              By subscribing to a protocol, you agree to the following payment terms:
            </p>
            <ul className="pl-5 flex flex-col gap-2.5">
              {[
                'Subscriptions are billed monthly on the date of your initial purchase.',
                'You may cancel your subscription at any time through your account dashboard. Cancellation takes effect at the end of your current billing period.',
                'If a physician denies your prescription after payment, you are entitled to a full refund of the subscription fee for that billing period.',
                'Refunds are not available for fulfilled and shipped orders, except as required by applicable law.',
                'We reserve the right to adjust pricing with 30 days\' written notice to active subscribers.',
                'All prices are in U.S. dollars. We do not currently serve patients outside the United States.',
              ].map((item) => (
                <li key={item} className="text-[15px] text-[#6B7280] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Account Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-[#131811] mb-4">
              5. Account Termination
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-3">
              We reserve the right to suspend or terminate your account immediately and without prior notice if we determine, in our sole discretion, that you have:
            </p>
            <ul className="pl-5 flex flex-col gap-2.5">
              {[
                'Provided false or misleading health information',
                'Attempted to obtain prescriptions for distribution or resale',
                'Violated any applicable federal or state law',
                'Engaged in abusive, harassing, or threatening conduct toward staff or physicians',
                'Breached any material provision of these Terms',
              ].map((item) => (
                <li key={item} className="text-[15px] text-[#6B7280] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mt-3">
              Upon termination, your right to use the platform ceases immediately. Sections of these Terms that by their nature should survive termination (including limitation of liability, governing law, and dispute resolution) will remain in effect.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="px-8 py-7 rounded-2xl bg-white border border-[#E5E7EB]">
            <h2 className="text-2xl font-semibold text-[#131811] mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-3">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PEPTIDE PORTAL, ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OUR SERVICES.
            </p>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-3">
              OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING OUT OF THESE TERMS OR YOUR USE OF THE SERVICES SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO PEPTIDE PORTAL IN THE THREE (3) MONTHS PRECEDING THE CLAIM.
            </p>
            <p className="text-[15px] text-[#6B7280] leading-relaxed">
              Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability. In such jurisdictions, our liability shall be limited to the maximum extent permitted by law.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold text-[#131811] mb-4">
              7. Governing Law &amp; Dispute Resolution
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-3">
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
            </p>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-3">
              Any dispute arising out of or relating to these Terms or our services shall be resolved by binding arbitration administered by the American Arbitration Association (AAA) in accordance with its Commercial Arbitration Rules. The arbitration shall be conducted in English and the arbitrator&#39;s decision shall be final and binding.
            </p>
            <p className="text-[15px] text-[#6B7280] leading-relaxed">
              You waive any right to a jury trial or to participate in a class action lawsuit with respect to any claim related to these Terms or our services.
            </p>
          </section>

          {/* Contact */}
          <section className="px-8 py-7 rounded-2xl bg-white border border-[#E5E7EB]">
            <h2 className="text-2xl font-semibold text-[#131811] mb-4">
              Contact Us
            </h2>
            <p className="text-[15px] text-[#6B7280] leading-relaxed mb-3">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="flex flex-col gap-1.5">
              <p className="text-sm text-[#6B7280] m-0">
                <strong className="text-[#131811]">Peptide Portal, Inc.</strong>
              </p>
              <a href="mailto:legal@peptideportal.com" className="text-sm text-[#D4A574] hover:text-[#B8864A] transition-colors">
                legal@peptideportal.com
              </a>
            </div>
            <p className="text-[13px] text-[#9CA3AF] mt-4 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will provide notice of material changes by email or through the platform. Continued use of our services after such changes constitutes acceptance of the revised Terms.
            </p>
          </section>

        </div>
      </main>
    </div>
  )
}
