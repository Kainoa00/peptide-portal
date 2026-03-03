import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'HIPAA Compliance | Peptide Portal',
  description: 'How Peptide Portal protects patient data and maintains HIPAA compliance.',
}

export default function HIPAAPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #E5E5E5',
        padding: '20px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#D4A574', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>P</span>
            </div>
            <span style={{ fontWeight: '600', fontSize: '18px', color: '#1A1A1A' }}>Peptide Portal</span>
          </Link>
          <Link href="/provider" style={{ textDecoration: 'none', fontSize: '14px', fontWeight: '600', color: '#D4A574' }}>
            For Providers →
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '24px', color: '#1A1A1A' }}>
          HIPAA Compliance
        </h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '48px', lineHeight: 1.6 }}>
          Peptide Portal is built from the ground up to protect patient health information (PHI). 
          We maintain full HIPAA compliance to protect your patients and your practice.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
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
            <div key={item.title} style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #E5E5E5',
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: '#1A1A1A' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '48px',
          background: '#D4A574',
          borderRadius: '16px',
          padding: '32px',
          color: '#fff',
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>
            Questions about compliance?
          </h3>
          <p style={{ fontSize: '15px', opacity: 0.9, marginBottom: '20px' }}>
            Our compliance team is here to answer any questions about our security practices and HIPAA compliance.
          </p>
          <a href="mailto:compliance@peptideportal.com" style={{
            color: '#fff',
            fontWeight: 600,
            textDecoration: 'underline',
          }}>
            compliance@peptideportal.com
          </a>
        </div>
      </main>
    </div>
  )
}
