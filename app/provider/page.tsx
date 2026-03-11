import Link from 'next/link'

const ACCENT = '#D4A574'
const ACCENT_DARK = '#8B7355'
const ACCENT_LIGHT = '#F5F0E8'

export default function ProviderPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #E5E5E5', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>P</span>
            </div>
            <span style={{ fontWeight: '600', fontSize: '18px', color: '#1A1A1A' }}>Peptide Portal</span>
          </Link>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link href="/login" style={{ fontSize: '14px', color: '#666', textDecoration: 'none' }}>Log in</Link>
            <Link href="/provider/signup" style={{ 
              fontSize: '14px', 
              background: ACCENT, 
              color: '#fff', 
              padding: '8px 20px', 
              borderRadius: '20px',
              textDecoration: 'none',
              fontWeight: 600,
            }}>Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: '80px 24px', textAlign: 'center', background: 'linear-gradient(to bottom, #FAFAF8 0%, #F5F0E8 100%)' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <span style={{ 
            display: 'inline-block', 
            background: ACCENT_LIGHT, 
            padding: '6px 16px', 
            borderRadius: '20px', 
            fontSize: '12px', 
            fontWeight: '600',
            color: ACCENT_DARK,
            marginBottom: '24px'
          }}>
            For Healthcare Providers
          </span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: '700', lineHeight: 1.1, marginBottom: '24px', color: '#1A1A1A' }}>
            Scale your peptide practice without the administrative burden.
          </h1>
          <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#666', marginBottom: '40px' }}>
            Automated patient intake, recurring revenue subscriptions, and full compliance — 
            all in one platform built for peptide therapy providers.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/provider/signup" style={{
              background: ACCENT,
              color: '#fff',
              padding: '16px 32px',
              borderRadius: '32px',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
            }}>
              Start Free Pilot
            </Link>
            <Link href="/provider/login" style={{
              background: '#fff',
              color: '#1A1A1A',
              padding: '16px 32px',
              borderRadius: '32px',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              border: '1px solid #E5E5E5',
            }}>
              Provider Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', textAlign: 'center', marginBottom: '48px', color: '#1A1A1A' }}>
            Everything you need to grow
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {[
              {
                icon: '📋',
                title: 'Automated Intake',
                desc: 'Patients complete health assessments online. You review and approve — no phone calls, no paperwork.'
              },
              {
                icon: '💰',
                title: 'Recurring Revenue',
                desc: 'Subscription-based model means predictable monthly income. Patients stay on protocol longer.'
              },
              {
                icon: '🔒',
                title: 'HIPAA Compliant',
                desc: 'Built with security in mind. BAA available. All data encrypted at rest and in transit.'
              },
              {
                icon: '📱',
                title: 'Patient Messaging',
                desc: 'Secure in-app messaging between you and patients. No WhatsApp, no Signal — compliant.'
              },
              {
                icon: '🏥',
                title: 'Pharmacy Network',
                desc: 'We work with PCAB-accredited compounding pharmacies. Shipments tracked automatically.'
              },
              {
                icon: '📊',
                title: 'Dashboard & Analytics',
                desc: 'See patient volumes, revenue, and retention at a glance. Make data-driven decisions.'
              },
            ].map((feature) => (
              <div key={feature.title} style={{
                padding: '32px',
                background: '#FAFAF8',
                borderRadius: '16px',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#1A1A1A' }}>{feature.title}</h3>
                <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '80px 24px', background: '#FAFAF8' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: '#1A1A1A' }}>
            Simple, transparent pricing
          </h2>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '48px' }}>
            No per-patient fees. No setup costs. Cancel anytime.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '40px',
              border: '1px solid #E5E5E5',
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Starter</h3>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#1A1A1A', marginBottom: '8px' }}>$199<span style={{ fontSize: '18px', fontWeight: 400, color: '#666' }}>/mo</span></div>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>Up to 25 patients</p>
              <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, margin: 0 }}>
                {['Automated intake', 'Patient dashboard', 'Basic messaging', 'Email support'].map((item) => (
                  <li key={item} style={{ padding: '8px 0', fontSize: '14px', color: '#666', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: ACCENT }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              background: '#fff',
              borderRadius: '20px',
              padding: '40px',
              border: `2px solid ${ACCENT}`,
              position: 'relative',
            }}>
              <div style={{ 
                position: 'absolute', 
                top: '-12px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                background: ACCENT,
                color: '#fff',
                padding: '4px 16px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '600',
              }}>
                Most Popular
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Growth</h3>
              <div style={{ fontSize: '48px', fontWeight: '700', color: '#1A1A1A', marginBottom: '8px' }}>$399<span style={{ fontSize: '18px', fontWeight: 400, color: '#666' }}>/mo</span></div>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>Up to 100 patients</p>
              <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0, margin: 0 }}>
                {['Everything in Starter', 'Advanced analytics', 'Priority support', 'Custom branding', 'API access'].map((item) => (
                  <li key={item} style={{ padding: '8px 0', fontSize: '14px', color: '#666', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: ACCENT }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', background: '#1A1A1A', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
            Ready to grow your practice?
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
            Join Utah providers who are scaling their peptide therapy practices with Peptide Portal.
          </p>
          <Link href="/provider/signup" style={{
            background: ACCENT,
            color: '#fff',
            padding: '18px 40px',
            borderRadius: '36px',
            fontSize: '17px',
            fontWeight: '600',
            textDecoration: 'none',
            display: 'inline-block',
          }}>
            Start 30-Day Free Pilot
          </Link>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '16px' }}>
            No credit card required. No setup fees.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#1A1A1A', color: '#fff', padding: '40px 24px 24px', borderTop: '1px solid #333' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#666' }}>
            © 2026 Peptide Portal. For healthcare providers. Not for patient use.
          </p>
        </div>
      </footer>
    </div>
  )
}
