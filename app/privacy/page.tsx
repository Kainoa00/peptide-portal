import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Peptide Portal',
  description: 'Learn how Peptide Portal collects, uses, and protects your personal health information in compliance with HIPAA.',
}

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-2)' }}>
            Effective date: January 1, 2026 &nbsp;·&nbsp; Last updated: February 1, 2026
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

          {/* Introduction */}
          <section>
            <h2
              className="font-display"
              style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)', marginBottom: 16 }}
            >
              Introduction
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 12 }}>
              Peptide Portal, Inc. (&quot;Peptide Portal,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates a telehealth platform that connects patients with licensed physicians for evaluation and prescription of peptide therapy protocols. We are committed to protecting your privacy and handling your personal and health information with the highest standards of care.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8 }}>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services. Please read this policy carefully. By using Peptide Portal, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2
              className="font-display"
              style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)', marginBottom: 16 }}
            >
              Information We Collect
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 16 }}>
              We collect information you provide directly to us, information collected automatically, and information from third-party services.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
                  style={{
                    padding: '20px 24px',
                    borderRadius: 12,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{item.title}</div>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2
              className="font-display"
              style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)', marginBottom: 16 }}
            >
              How We Use Your Information
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 16 }}>
              We use the information we collect to:
            </p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
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
                <li key={item} style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.7 }}>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginTop: 16 }}>
              We do not sell your personal information or PHI to third parties for marketing purposes.
            </p>
          </section>

          {/* HIPAA Compliance */}
          <section
            style={{
              padding: '28px 32px',
              borderRadius: 16,
              background: 'rgba(45,214,168,0.04)',
              border: '1px solid rgba(45,214,168,0.15)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <h2
                className="font-display"
                style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)', margin: 0 }}
              >
                HIPAA Compliance
              </h2>
            </div>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 12 }}>
              Peptide Portal is a Covered Entity and Business Associate under the Health Insurance Portability and Accountability Act (HIPAA). We maintain administrative, physical, and technical safeguards to protect your PHI in accordance with the HIPAA Privacy Rule and Security Rule.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 12 }}>
              Key HIPAA protections we implement include:
            </p>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'End-to-end encryption of all PHI at rest and in transit (AES-256 and TLS 1.3)',
                'Business Associate Agreements (BAAs) with all vendors who access PHI',
                'Role-based access controls limiting PHI access to authorized personnel only',
                'Audit logs for all PHI access and modifications',
                'Annual HIPAA training for all staff with access to PHI',
                'Breach notification procedures in compliance with the HIPAA Breach Notification Rule',
              ].map((item) => (
                <li key={item} style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7 }}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Data Sharing */}
          <section>
            <h2
              className="font-display"
              style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)', marginBottom: 16 }}
            >
              Data Sharing
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 16 }}>
              We share your information only in the following circumstances:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                <div key={item.title} style={{ paddingLeft: 16, borderLeft: '2px solid var(--border-teal)' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{item.title}</div>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2
              className="font-display"
              style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)', marginBottom: 16 }}
            >
              Data Security
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8 }}>
              We use industry-standard security measures to protect your information, including AES-256 encryption at rest, TLS 1.3 encryption in transit, SOC 2 Type II compliant infrastructure, multi-factor authentication for provider and admin accounts, and regular third-party security audits. However, no method of electronic transmission or storage is 100% secure. While we strive to protect your PHI, we cannot guarantee absolute security.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2
              className="font-display"
              style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)', marginBottom: 16 }}
            >
              Data Retention
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 12 }}>
              We retain your account information and PHI for a minimum of 7 years from your last interaction, as required by applicable state and federal regulations governing medical records. Payment records are retained for 7 years for tax and accounting purposes. You may request deletion of non-medical account data; however, medical records must be retained per legal requirements.
            </p>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8 }}>
              After the retention period, data is securely destroyed using industry-standard data destruction methods.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2
              className="font-display"
              style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)', marginBottom: 16 }}
            >
              Your Rights
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 16 }}>
              Under HIPAA and applicable privacy laws, you have the following rights regarding your information:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { right: 'Right of Access', desc: 'Request a copy of your PHI and medical records we hold.' },
                { right: 'Right to Correct', desc: 'Request correction of inaccurate or incomplete PHI.' },
                { right: 'Right to an Accounting', desc: 'Request a list of disclosures of your PHI we have made.' },
                { right: 'Right to Restrict', desc: 'Request restrictions on certain uses and disclosures of your PHI.' },
                { right: 'Right to Confidential Communications', desc: 'Request that we communicate with you in a specific way or at a specific location.' },
                { right: 'Right to Complain', desc: 'File a complaint with us or the U.S. Department of Health and Human Services if you believe your privacy rights have been violated.' },
              ].map((item) => (
                <div key={item.right} style={{ display: 'flex', gap: 16, padding: '16px 20px', background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--teal)', whiteSpace: 'nowrap', minWidth: 160 }}>{item.right}</div>
                  <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.8, marginTop: 16 }}>
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:privacy@peptideportal.com" style={{ color: 'var(--teal)' }}>privacy@peptideportal.com</a>.
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
              If you have questions about this Privacy Policy or our data practices, please contact our Privacy Officer:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <p style={{ fontSize: 14, color: 'var(--text-2)', margin: 0 }}>
                <strong style={{ color: 'var(--text)' }}>Peptide Portal, Inc.</strong>
              </p>
              <p style={{ fontSize: 14, color: 'var(--text-2)', margin: 0 }}>
                Attn: Privacy Officer
              </p>
              <a href="mailto:privacy@peptideportal.com" style={{ fontSize: 14, color: 'var(--teal)' }}>
                privacy@peptideportal.com
              </a>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 16, lineHeight: 1.7 }}>
              We reserve the right to update this Privacy Policy at any time. We will notify you of material changes by email or by posting a prominent notice on our platform. Your continued use of our services after such modifications constitutes acceptance of the updated policy.
            </p>
          </section>

        </div>
      </main>
    </div>
  )
}
