import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Peptide Portal',
  description: 'Review the Terms of Service for Peptide Portal, including service description, medical disclaimer, prescription policy, and user obligations.',
}

export default function TermsPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <header
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '20px 24px',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            href="/"
            className="font-display text-xl"
            style={{ color: 'var(--text)', fontStyle: 'italic', fontWeight: 400, textDecoration: 'none' }}
          >
            peptide<span style={{ color: 'var(--teal)', fontStyle: 'normal', fontWeight: 300 }}>portal</span>
          </Link>
          <Link
            href="/"
            style={{ fontSize: 13, color: 'var(--text-2)', textDecoration: 'none' }}
          >
            ← Back to home
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main id="main-content" style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px 96px' }}>
        {/* Title */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 12 }}>
            Legal
          </p>
          <h1
            className="font-display"
            style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 300, color: 'var(--text)', lineHeight: 1.1, marginBottom: 16 }}
          >
            Terms of Service
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-2)' }}>
            Effective date: January 1, 2026 &nbsp;·&nbsp; Last updated: February 1, 2026
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

          {/* Service Description */}
          <section>
            <h2
              className="font-display"
              style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)', marginBottom: 16 }}
            >
              1. Service Description
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 12 }}>
              Peptide Portal, Inc. (&quot;Peptide Portal,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates a telehealth platform that facilitates connections between patients and independent, licensed physicians who may evaluate, diagnose, and prescribe treatments including peptide therapy protocols. Peptide Portal itself is not a pharmacy or prescriber. Prescriptions are issued solely by licensed physicians on our platform.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 12 }}>
              Our services include:
            </p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Online intake assessment and health questionnaire tools',
                'Secure communication platform connecting patients and physicians',
                'Coordination with PCAB-accredited compounding pharmacies for prescription fulfillment',
                'Patient portal for tracking protocol status and physician communications',
                'Educational content about peptide therapy (for informational purposes only)',
              ].map((item) => (
                <li key={item} style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7 }}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Medical Disclaimer */}
          <section
            style={{
              padding: '28px 32px',
              borderRadius: 16,
              background: 'rgba(212,151,90,0.05)',
              border: '1px solid rgba(212,151,90,0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <h2
                className="font-display"
                style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)', margin: 0 }}
              >
                2. Medical Disclaimer
              </h2>
            </div>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 12 }}>
              <strong style={{ color: 'var(--amber)' }}>Peptide Portal is not an emergency medical service.</strong> If you are experiencing a medical emergency, call 911 or your local emergency number immediately, or go to your nearest emergency room.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 12 }}>
              The content on our platform, including educational articles, protocol descriptions, and any AI-generated guidance, is for informational purposes only and does not constitute medical advice. A licensed physician&#39;s evaluation is required before any prescription is issued.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8 }}>
              Telehealth services may not be appropriate for all medical conditions. Our physicians may determine that in-person evaluation is required and may decline to prescribe based on their clinical judgment.
            </p>
          </section>

          {/* Prescription and Medication Policy */}
          <section>
            <h2
              className="font-display"
              style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)', marginBottom: 16 }}
            >
              3. Prescription and Medication Policy
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 16 }}>
              All prescriptions issued through Peptide Portal are subject to the following terms:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                  body: 'Peptide Portal does not prescribe controlled substances (DEA Schedule I–V).',
                },
              ].map((item) => (
                <div key={item.title} style={{ paddingLeft: 16, borderLeft: '2px solid var(--border)' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{item.title}</div>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Payment Terms */}
          <section>
            <h2
              className="font-display"
              style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)', marginBottom: 16 }}
            >
              4. Payment Terms
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 12 }}>
              By subscribing to a protocol, you agree to the following payment terms:
            </p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Subscriptions are billed monthly on the date of your initial purchase.',
                'You may cancel your subscription at any time through your account dashboard. Cancellation takes effect at the end of your current billing period.',
                'If a physician denies your prescription after payment, you are entitled to a full refund of the subscription fee for that billing period.',
                'Refunds are not available for fulfilled and shipped orders, except as required by applicable law.',
                'We reserve the right to adjust pricing with 30 days\' written notice to active subscribers.',
                'All prices are in U.S. dollars. We do not currently serve patients outside the United States.',
              ].map((item) => (
                <li key={item} style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7 }}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Account Termination */}
          <section>
            <h2
              className="font-display"
              style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)', marginBottom: 16 }}
            >
              5. Account Termination
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 12 }}>
              We reserve the right to suspend or terminate your account immediately and without prior notice if we determine, in our sole discretion, that you have:
            </p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Provided false or misleading health information',
                'Attempted to obtain prescriptions for distribution or resale',
                'Violated any applicable federal or state law',
                'Engaged in abusive, harassing, or threatening conduct toward staff or physicians',
                'Breached any material provision of these Terms',
              ].map((item) => (
                <li key={item} style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7 }}>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginTop: 12 }}>
              Upon termination, your right to use the platform ceases immediately. Sections of these Terms that by their nature should survive termination (including limitation of liability, governing law, and dispute resolution) will remain in effect.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section
            style={{
              padding: '28px 32px',
              borderRadius: 16,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <h2
              className="font-display"
              style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)', marginBottom: 16 }}
            >
              6. Limitation of Liability
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 12 }}>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PEPTIDE PORTAL, ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OUR SERVICES.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 12 }}>
              OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING OUT OF THESE TERMS OR YOUR USE OF THE SERVICES SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO PEPTIDE PORTAL IN THE THREE (3) MONTHS PRECEDING THE CLAIM.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8 }}>
              Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability. In such jurisdictions, our liability shall be limited to the maximum extent permitted by law.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2
              className="font-display"
              style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)', marginBottom: 16 }}
            >
              7. Governing Law &amp; Dispute Resolution
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 12 }}>
              These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 12 }}>
              Any dispute arising out of or relating to these Terms or our services shall be resolved by binding arbitration administered by the American Arbitration Association (AAA) in accordance with its Commercial Arbitration Rules. The arbitration shall be conducted in English and the arbitrator&#39;s decision shall be final and binding.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8 }}>
              You waive any right to a jury trial or to participate in a class action lawsuit with respect to any claim related to these Terms or our services.
            </p>
          </section>

          {/* Contact */}
          <section
            style={{
              padding: '28px 32px',
              borderRadius: 16,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
            }}
          >
            <h2
              className="font-display"
              style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)', marginBottom: 16 }}
            >
              Contact Us
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 12 }}>
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <p style={{ fontSize: 14, color: 'var(--text-2)', margin: 0 }}>
                <strong style={{ color: 'var(--text)' }}>Peptide Portal, Inc.</strong>
              </p>
              <a href="mailto:legal@peptideportal.com" style={{ fontSize: 14, color: 'var(--teal)' }}>
                legal@peptideportal.com
              </a>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 16, lineHeight: 1.7 }}>
              We reserve the right to modify these Terms at any time. We will provide notice of material changes by email or through the platform. Continued use of our services after such changes constitutes acceptance of the revised Terms.
            </p>
          </section>

        </div>
      </main>
    </div>
  )
}
