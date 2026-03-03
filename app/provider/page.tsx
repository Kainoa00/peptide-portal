import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'For Providers | Peptide Portal',
  description: 'Partner with Peptide Portal to streamline your peptide therapy practice.',
}

export default function ProviderPage() {
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
          <Link href="/login" style={{ textDecoration: 'none', fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>
            Provider Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: '80px 24px', background: '#1A1A1A', color: '#fff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: '24px' }}>
            Scale Your Peptide Practice
          </h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px', lineHeight: 1.6 }}>
            The all-in-one platform for peptide therapy. Automated patient intake, 
            physician review, prescription management, and recurring revenue — all in one place.
          </p>
          <Link href="/provider/signup" style={{
            display: 'inline-block',
            background: '#D4A574',
            color: '#fff',
            padding: '16px 32px',
            borderRadius: '32px',
            fontSize: '16px',
            fontWeight: 600,
            textDecoration: 'none',
          }}>
            Start Your Pilot — Free for 30 Days
          </Link>
        </div>
      </section>

      {/* Value Props */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', marginBottom: '60px', color: '#1A1A1A' }}>
            Why Providers Choose Peptide Portal
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {[
              {
                title: 'Automated Patient Intake',
                desc: 'Patients complete a comprehensive health assessment online. You review their info and prescribe — no more phone calls or paperwork.',
                icon: '📋',
              },
              {
                title: 'HIPAA-Compliant',
                desc: 'Built from the ground up for healthcare. End-to-end encryption, secure messaging, and full HIPAA compliance.',
                icon: '🔒',
              },
              {
                title: 'Recurring Revenue',
                desc: 'Subscription-based model means predictable monthly income. Patients stay on protocol, you get recurring payments.',
                icon: '💰',
              },
              {
                title: 'Compounding Pharmacy Network',
                desc: 'We coordinate with PCAB-accredited pharmacies for fulfillment. Just prescribe — we handle the rest.',
                icon: '🏥',
              },
              {
                title: 'Provider Dashboard',
                desc: 'Review patient intake, manage prescriptions, track compliance, and message patients — all from one dashboard.',
                icon: '📊',
              },
              {
                title: 'White-Label Available',
                desc: 'Want your own branded platform? We offer white-label solutions for clinics and distributors.',
                icon: '✨',
              },
            ].map((item) => (
              <div key={item.title} style={{
                background: '#FAFAF8',
                borderRadius: '16px',
                padding: '32px',
              }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px', color: '#1A1A1A' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 24px', background: '#FAFAF8' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', marginBottom: '60px', color: '#1A1A1A' }}>
            How It Works
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              { step: '1', title: 'Patients Take Your Quiz', desc: 'They complete an online health assessment — takes about 2 minutes.' },
              { step: '2', title: 'You Review & Prescribe', desc: 'Review their intake in your dashboard. Approve or deny with one click.' },
              { step: '3', title: 'We Handle Fulfillment', desc: 'Prescription goes to our partner pharmacy. Patient receives medication at home.' },
              { step: '4', title: 'Get Paid Monthly', desc: 'Subscriptions auto-renew. You get recurring revenue without lifting a finger.' },
            ].map((item, i) => (
              <div key={item.step} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '24px',
                background: '#fff',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#D4A574',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {item.step}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#1A1A1A' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '15px', color: '#666' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, textAlign: 'center', marginBottom: '16px', color: '#1A1A1A' }}>
            Simple, Transparent Pricing
          </h2>
          <p style={{ fontSize: '18px', color: '#666', textAlign: 'center', marginBottom: '48px' }}>
            No hidden fees. No per-patient charges. Flat monthly rate.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {/* Starter */}
            <div style={{
              background: '#FAFAF8',
              borderRadius: '20px',
              padding: '32px',
              border: '2px solid #E5E5E5',
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px', color: '#1A1A1A' }}>Starter</h3>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '48px', fontWeight: 700, color: '#1A1A1A' }}>$199</span>
                <span style={{ fontSize: '16px', color: '#666' }}>/month</span>
              </div>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>For individual providers getting started.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Up to 25 patients', 'Automated intake quiz', 'Provider dashboard', 'Email support'].map((f) => (
                  <li key={f} style={{ padding: '8px 0', fontSize: '14px', color: '#666', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#D4A574' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Growth - Featured */}
            <div style={{
              background: '#1A1A1A',
              borderRadius: '20px',
              padding: '32px',
              color: '#fff',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                right: '24px',
                background: '#D4A574',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
              }}>Most Popular</div>
              <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>Growth</h3>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '48px', fontWeight: 700 }}>$399</span>
                <span style={{ fontSize: '16px', opacity: 0.7 }}>/month</span>
              </div>
              <p style={{ fontSize: '14px', opacity: 0.7, marginBottom: '24px' }}>For growing practices.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Up to 100 patients', 'Everything in Starter', 'Priority support', 'Analytics dashboard', 'Custom branding'].map((f) => (
                  <li key={f} style={{ padding: '8px 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#D4A574' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Enterprise */}
            <div style={{
              background: '#FAFAF8',
              borderRadius: '20px',
              padding: '32px',
              border: '2px solid #E5E5E5',
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px', color: '#1A1A1A' }}>Enterprise</h3>
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '48px', fontWeight: 700, color: '#1A1A1A' }}>Custom</span>
              </div>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>For clinics and distributors.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Unlimited patients', 'Everything in Growth', 'White-label', 'API access', 'Dedicated account manager'].map((f) => (
                  <li key={f} style={{ padding: '8px 0', fontSize: '14px', color: '#666', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#D4A574' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: '#D4A574', color: '#fff' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px' }}>
            Ready to Scale?
          </h2>
          <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '32px' }}>
            Start your 30-day free pilot. No credit card required.
          </p>
          <Link href="/provider/signup" style={{
            display: 'inline-block',
            background: '#1A1A1A',
            color: '#fff',
            padding: '16px 40px',
            borderRadius: '32px',
            fontSize: '16px',
            fontWeight: 600,
            textDecoration: 'none',
          }}>
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', background: '#1A1A1A', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', opacity: 0.6 }}>
            © 2026 Peptide Portal. All rights reserved. | HIPAA Compliant
          </p>
        </div>
      </footer>
    </div>
  )
}
