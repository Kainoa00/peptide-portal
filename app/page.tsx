'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import Image from 'next/image'

/* ─── Design: Warm Cream + Gold Accents ───────────────────────────────── */

const ACCENT = '#D4A574' // Gold/terracotta
const ACCENT_DARK = '#8B7355'
const ACCENT_LIGHT = '#F5F0E8'

const CATEGORIES = [
  {
    label: 'Weight Loss',
    tag: 'Metabolism',
    desc: 'Doctor-prescribed GLP-1 treatments to help you reach your goals.',
    href: '/catalog?cat=weight_loss',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Longevity',
    tag: 'Vitality',
    desc: 'Science-backed protocols designed to help you feel your best at any age.',
    href: '/catalog?cat=longevity',
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Recovery',
    tag: 'Performance',
    desc: 'Advanced peptide therapies to help you bounce back faster.',
    href: '/catalog?cat=recovery',
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Cognitive',
    tag: 'Focus',
    desc: 'Nootropic protocols to sharpen your mind and boost mental clarity.',
    href: '/catalog?cat=cognitive',
    img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop&q=80',
  },
]

const BENEFITS = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Licensed Providers',
    desc: 'Every prescription is reviewed by a board-certified physician.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'HIPAA Compliant',
    desc: 'Your health data is encrypted and securely stored.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
        <path d="M16 8h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H7" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: 'Free Shipping',
    desc: 'Discreet delivery to your door, always free.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Cancel Anytime',
    desc: 'No contracts, no commitments. Pause or cancel anytime.',
  },
]

const TESTIMONIALS = [
  {
    quote: "I've tried everything for weight loss. Tirzepatide changed everything. Down 28 lbs and feeling better than I have in years.",
    name: 'Sarah M.',
    protocol: 'Weight Loss',
    rating: 5,
  },
  {
    quote: "The recovery stack has been game-changing for my training. Joint pain is gone, energy is up.",
    name: 'Marcus T.',
    protocol: 'Recovery',
    rating: 5,
  },
  {
    quote: "Cognitive focus is on another level. My work productivity has skyrocketed since starting Semax.",
    name: 'David K.',
    protocol: 'Cognitive',
    rating: 5,
  },
]

const FAQ_ITEMS = [
  {
    q: 'How does this work?',
    a: 'Start with a free consultation. Answer a few questions about your health goals, and a licensed physician will review and prescribe if appropriate. Your treatment ships free to your door.',
  },
  {
    q: 'Are peptides safe?',
    a: 'Our peptides are prescribed by licensed physicians and compounded by FDA-regulated pharmacies. Every treatment plan is physician-supervised.',
  },
  {
    q: 'How much does it cost?',
    a: 'Treatments start at $119/month. No hidden fees, cancel anytime. You\'ll see the exact price before checkout.',
  },
  {
    q: 'What if I need to cancel?',
    a: 'No problem. Cancel anytime from your dashboard with one click. No fees, no hassle.',
  },
]

/* ─── Components ─────────────────────────────────────────────────── */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? ACCENT : 'none'}
          stroke={ACCENT}
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

function FAQItem({ item, isOpen, onToggle }: { item: typeof FAQ_ITEMS[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid #E5E5E5' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span className="text-base font-medium" style={{ color: '#1A1A1A' }}>
          {item.q}
        </span>
        <span style={{ color: ACCENT, fontSize: '20px', lineHeight: 1 }}>
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div style={{ maxHeight: isOpen ? '200px' : '0px', overflow: 'hidden', transition: 'all 0.3s ease' }}>
        <p className="text-sm pb-5" style={{ color: '#666', lineHeight: 1.7 }}>
          {item.a}
        </p>
      </div>
    </div>
  )
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ background: '#FAFAF8', color: '#1A1A1A', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* ── Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(250,250,248,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #E5E5E5' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>P</span>
            </div>
            <span style={{ fontWeight: '600', fontSize: '18px', color: '#1A1A1A' }}>Peptide Portal</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Protocols', href: '/catalog' },
              { label: 'How it Works', href: '#how-it-works' },
              { label: 'Pricing', href: '#faq' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{ textDecoration: 'none', fontSize: '14px', color: '#666', fontWeight: '500' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" style={{ textDecoration: 'none', fontSize: '14px', fontWeight: '500', color: '#1A1A1A' }}>
              Log in
            </Link>
            <Link
              href="/quiz"
              style={{
                textDecoration: 'none',
                background: ACCENT,
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '24px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section style={{ paddingTop: '100px', paddingBottom: '80px', background: 'linear-gradient(to bottom, #FAFAF8 0%, #F5F0E8 100%)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            
            {/* Left: Copy */}
            <div style={{ maxWidth: '520px' }}>
              <div style={{ 
                display: 'inline-block', 
                background: ACCENT_LIGHT, 
                padding: '6px 14px', 
                borderRadius: '20px', 
                fontSize: '12px', 
                fontWeight: '600',
                color: ACCENT_DARK,
                marginBottom: '20px'
              }}>
                Physician-prescribed peptide therapy
              </div>
              
              <h1 style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: '700', lineHeight: 1.1, marginBottom: '20px', color: '#1A1A1A' }}>
                Health care that
                <br />
                actually works.
              </h1>
              
              <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#666', marginBottom: '32px' }}>
                Personalized peptide protocols, prescribed by licensed doctors and delivered to your door. Start your journey today.
              </p>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
                <Link
                  href="/quiz"
                  style={{
                    textDecoration: 'none',
                    background: ACCENT,
                    color: '#fff',
                    padding: '14px 28px',
                    borderRadius: '28px',
                    fontSize: '15px',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  Start free consultation
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/catalog"
                  style={{
                    textDecoration: 'none',
                    background: 'transparent',
                    color: '#1A1A1A',
                    padding: '14px 28px',
                    borderRadius: '28px',
                    fontSize: '15px',
                    fontWeight: '600',
                    border: '1px solid #E5E5E5',
                  }}
                >
                  View protocols
                </Link>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '13px', color: '#888' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>Licensed physicians</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div style={{ position: 'relative' }}>
              <div style={{ 
                borderRadius: '24px', 
                overflow: 'hidden',
                boxShadow: '0 40px 80px rgba(212, 165, 116, 0.2)',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80"
                  alt="Wellness"
                  style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                />
              </div>
              {/* Floating card */}
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                background: '#fff',
                padding: '20px 24px',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(212, 165, 116, 0.2)',
              }}>
                <div style={{ fontSize: '13px', color: '#888', marginBottom: '4px' }}>Patients served</div>
                <div style={{ fontSize: '28px', fontWeight: '700', color: ACCENT_DARK }}>4,200+</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits Bar ── */}
      <section style={{ background: '#fff', padding: '40px 0', borderTop: '1px solid #E5E5E5', borderBottom: '1px solid #E5E5E5' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ color: ACCENT }}>{benefit.icon}</div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '15px', marginBottom: '4px' }}>{benefit.title}</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>{benefit.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Protocol Categories ── */}
      <section style={{ padding: '100px 0', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: '700', marginBottom: '16px' }}>
              Treatments for every goal
            </h2>
            <p style={{ fontSize: '18px', color: '#666', maxWidth: '500px', margin: '0 auto' }}>
              Browse our physician-prescribed protocols tailored to your health goals.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  background: '#fff',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={cat.img}
                    alt={cat.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ 
                    fontSize: '11px', 
                    fontWeight: '700', 
                    textTransform: 'uppercase', 
                    letterSpacing: '1px',
                    color: ACCENT,
                    marginBottom: '8px'
                  }}>
                    {cat.tag}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px', color: '#1A1A1A' }}>
                    {cat.label}
                  </div>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.5 }}>
                    {cat.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── App Preview Scroll Animation ── */}
      <section style={{ padding: '100px 0', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: '700', marginBottom: '16px', color: '#1A1A1A' }}>
              Your health journey, simplified
            </h2>
            <p style={{ fontSize: '18px', color: '#666', maxWidth: '500px', margin: '0 auto' }}>
              Track your protocol, message your physician, and manage everything from your personalized dashboard.
            </p>
          </div>
        </div>
        
        <AppPreviewScroll />
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" style={{ padding: '100px 0', background: '#1A1A1A', color: '#fff' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: '700', marginBottom: '16px' }}>
              How it works
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto' }}>
              Get started in minutes. No hidden fees, no commitment.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {[
              { n: '1', title: 'Free consultation', desc: 'Answer a few questions about your health goals. Takes 2 minutes.' },
              { n: '2', title: 'Doctor review', desc: 'A licensed physician reviews your info and prescribes if appropriate.' },
              { n: '3', title: 'Free delivery', desc: 'Your treatment arrives at your door in discreet packaging.' },
            ].map((step) => (
              <div key={step.n} style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.15)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: '700',
                  margin: '0 auto 20px',
                  border: `2px solid ${ACCENT}`,
                  color: '#fff'
                }}>
                  {step.n}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>{step.title}</h3>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link
              href="/quiz"
              style={{
                textDecoration: 'none',
                background: ACCENT,
                color: '#fff',
                padding: '16px 32px',
                borderRadius: '32px',
                fontSize: '16px',
                fontWeight: '600',
                display: 'inline-block',
              }}
            >
              Start your consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: '100px 0', background: '#FAFAF8' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: '700', marginBottom: '16px' }}>
              Real people, real results
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  padding: '32px',
                  borderRadius: '20px',
                  boxShadow: '0 4px 20px rgba(212, 165, 116, 0.1)',
                }}
              >
                <StarRating rating={t.rating} />
                <p style={{ fontSize: '16px', lineHeight: 1.6, margin: '20px 0', color: '#1A1A1A' }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '600', color: '#1A1A1A' }}>{t.name}</span>
                  <span style={{ fontSize: '13px', color: ACCENT, fontWeight: '600' }}>{t.protocol}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: '100px 0', background: '#fff' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: '700' }}>
              Frequently asked questions
            </h2>
          </div>

          <div style={{ background: '#FAFAF8', borderRadius: '20px', padding: '8px 32px' }}>
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '100px 0', background: ACCENT_LIGHT }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: '700', marginBottom: '20px', color: ACCENT_DARK }}>
            Ready to feel your best?
          </h2>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '32px' }}>
            Join thousands who've transformed their health with peptide therapy.
          </p>
          <Link
            href="/quiz"
            style={{
              textDecoration: 'none',
              background: ACCENT,
              color: '#fff',
              padding: '18px 40px',
              borderRadius: '36px',
              fontSize: '17px',
              fontWeight: '600',
              display: 'inline-block',
            }}
          >
            Start free consultation
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: '#1A1A1A', color: '#fff', padding: '60px 0 40px' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '60px', marginBottom: '60px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>P</span>
                </div>
                <span style={{ fontWeight: '600', fontSize: '18px' }}>Peptide Portal</span>
              </div>
              <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.6, maxWidth: '280px' }}>
                Physician-prescribed peptide therapy, delivered to your door.
              </p>
            </div>
            
            {[
              { heading: 'Treatments', links: [
                { label: 'Weight Loss', href: '/catalog?cat=weight_loss' },
                { label: 'Longevity', href: '/catalog?cat=longevity' },
                { label: 'Recovery', href: '/catalog?cat=recovery' },
                { label: 'Cognitive', href: '/catalog?cat=cognitive' },
              ]},
              { heading: 'Company', links: [
                { label: 'About', href: '#' },
                { label: 'Careers', href: '#' },
                { label: 'Press', href: '#' },
                { label: 'Contact', href: '#' },
              ]},
              { heading: 'Legal', links: [
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
                { label: 'Accessibility', href: '#' },
              ]},
            ].map((col) => (
              <div key={col.heading}>
                <div style={{ fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#666', marginBottom: '20px' }}>
                  {col.heading}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {col.links.map((link) => (
                    <li key={link.label} style={{ marginBottom: '12px' }}>
                      <Link href={link.href} style={{ textDecoration: 'none', fontSize: '14px', color: '#999' }}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #333', paddingTop: '24px', fontSize: '13px', color: '#666' }}>
            © 2026 Peptide Portal. All rights reserved. This site does not provide medical advice.
          </div>
        </div>
      </footer>

    </div>
  )
}

/* ─── App Preview Scroll Component ─────────────────────────────────── */
function AppPreviewScroll() {
  return (
    <ContainerScroll
      titleComponent={
        <div className="text-4xl md:text-6xl font-bold text-[#1A1A1A]">
          Your Personal <span className="text-[#D4A574]">Health Dashboard</span>
        </div>
      }
    >
      <div style={{ 
        width: '100%', 
        height: '100%', 
        background: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Dashboard Preview */}
        <div style={{ padding: '24px', background: '#FAFAF8', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#D4A574', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: '700', fontSize: '16px' }}>P</span>
            </div>
            <span style={{ fontWeight: '600', color: '#1A1A1A' }}>My Protocol</span>
          </div>
          
          <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', marginBottom: '16px', border: '1px solid #D4A574' }}>
            <div style={{ fontSize: '12px', color: '#D4A574', fontWeight: '600', marginBottom: '8px' }}>ACTIVE PROTOCOL</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#1A1A1A', marginBottom: '4px' }}>Tirzepatide</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Weight Loss • $299/month</div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', border: '1px solid #E5E5E5' }}>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Next Shipment</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>Mar 15, 2026</div>
            </div>
            <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', border: '1px solid #E5E5E5' }}>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Messages</div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1A1A1A' }}>1 unread</div>
            </div>
          </div>
        </div>
      </div>
    </ContainerScroll>
  )
}
