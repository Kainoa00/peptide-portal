'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import Image from 'next/image'

/* ─── Data ──────────────────────────────────────────────────────── */

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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Licensed Providers',
    desc: 'Every prescription is reviewed by a board-certified physician.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'HIPAA Compliant',
    desc: 'Your health data is encrypted and securely stored.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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

const HOW_IT_WORKS_STEPS = [
  { n: '1', title: 'Free consultation', desc: 'Answer a few questions about your health goals. Takes 2 minutes.' },
  { n: '2', title: 'Doctor review', desc: 'A licensed physician reviews your info and prescribes if appropriate.' },
  { n: '3', title: 'Free delivery', desc: 'Your treatment arrives at your door in discreet packaging.' },
]

/* ─── Sub-components ─────────────────────────────────────────────── */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? '#D4A574' : 'none'}
          stroke="#D4A574"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

function FAQItem({ item, isOpen, onToggle, index }: { item: typeof FAQ_ITEMS[0]; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <div className="border-b border-[#E5E7EB]">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className="w-full flex items-center justify-between py-5 text-left font-medium text-[#131811] hover:text-[#D4A574] transition-colors duration-200 cursor-pointer"
      >
        <span className="text-base">{item.q}</span>
        <span className="ml-4 flex-shrink-0 text-[#D4A574]">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-[#6B7280] leading-relaxed">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Animation wrapper ──────────────────────────────────────────── */

function ScrollReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Main Page ─────────────────────────────────────────────────── */

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="bg-[#F6F8F6] text-[#131811]">

      {/* ── Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F6F8F6]/80 backdrop-blur-md border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 no-underline cursor-pointer">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#131811" strokeWidth="1.5" aria-hidden="true">
              <path d="M16 2L28 9v14l-12 7L4 23V9l12-7z" />
              <circle cx="16" cy="16" r="4" />
              <path d="M16 12v-4M20 14l3.5-2M20 18l3.5 2M16 20v4M12 18l-3.5 2M12 14l-3.5-2" />
            </svg>
            <span className="font-semibold text-lg text-[#131811]">PeptidePortal</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Protocols', href: '/catalog' },
              { label: 'How it Works', href: '#how-it-works' },
              { label: 'Pricing', href: '#faq' },
              { label: 'For Providers', href: '/provider' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[#6B7280] hover:text-[#131811] transition-colors duration-200 cursor-pointer no-underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-[#131811] no-underline cursor-pointer hidden sm:block"
            >
              Log in
            </Link>
            <Link
              href="/quiz"
              className="px-5 py-2.5 rounded-full bg-[#D4A574] text-white text-sm font-semibold hover:bg-[#B8864A] transition-colors duration-200 no-underline cursor-pointer"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero Section (50/50 split) ── */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-[#F6F8F6]" id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-xl"
            >
              <div className="inline-block bg-[#F5F0E8] text-[#B8864A] text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                Physician-prescribed peptide therapy
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-normal leading-tight tracking-tight text-[#131811] mb-6">
                Health care that{' '}
                <em className="font-display italic">actually works.</em>
              </h1>

              <p className="text-lg text-[#6B7280] leading-relaxed max-w-lg mb-8">
                Personalized peptide protocols, prescribed by licensed doctors and delivered to your door. Start your journey today.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href="/quiz"
                  className="px-8 py-4 rounded-full bg-[#D4A574] text-white font-semibold hover:bg-[#B8864A] transition-colors duration-200 no-underline inline-flex items-center gap-2 cursor-pointer"
                >
                  Start free consultation
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/catalog"
                  className="px-8 py-4 rounded-full border border-[#E5E7EB] text-[#131811] font-semibold hover:border-[#D4A574] transition-colors duration-200 no-underline cursor-pointer"
                >
                  View protocols
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-5 text-sm text-[#6B7280]">
                {['Licensed physicians', 'HIPAA compliant', 'Cancel anytime'].map((chip) => (
                  <div key={chip} className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A574" strokeWidth="2" aria-hidden="true">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>{chip}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden h-[400px] md:h-[520px]">
                <Image
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80"
                  alt="Person exercising outdoors, representing wellness and vitality"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute bottom-[-20px] left-[-20px] bg-white rounded-2xl px-6 py-4 shadow-[0_20px_40px_rgba(212,165,116,0.15)]">
                <div className="text-xs text-[#6B7280] mb-1">Patients served</div>
                <div className="text-2xl font-bold text-[#B8864A]">4,200+</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Benefits Bar ── */}
      <section className="bg-white border-y border-[#E5E7EB] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {BENEFITS.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 0.08}>
                <div className="flex items-start gap-4">
                  <div className="text-[#D4A574] flex-shrink-0">{benefit.icon}</div>
                  <div>
                    <div className="font-semibold text-[#131811] mb-1">{benefit.title}</div>
                    <div className="text-sm text-[#6B7280] leading-relaxed">{benefit.desc}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Protocol Categories ── */}
      <section className="py-16 md:py-24 bg-[#F6F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4A574] mb-3">Our Offerings</div>
            <h2 className="font-display text-4xl md:text-5xl font-normal text-[#131811] mb-4">
              Treatments for every goal
            </h2>
            <p className="text-lg text-[#6B7280] max-w-md mx-auto leading-relaxed">
              Browse our physician-prescribed protocols tailored to your health goals.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, index) => (
              <ScrollReveal key={cat.label} delay={index * 0.1}>
                <Link
                  href={cat.href}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 no-underline cursor-pointer"
                >
                  <div className="h-52 overflow-hidden">
                    <Image
                      src={cat.img}
                      alt={cat.label}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4A574] mb-2">
                      {cat.tag}
                    </div>
                    <div className="text-xl font-semibold text-[#131811] mb-2">
                      {cat.label}
                    </div>
                    <p className="text-sm text-[#6B7280] leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── App Preview Scroll Animation ── */}
      <section className="py-16 md:py-24 bg-[#F6F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-normal text-[#131811] mb-4">
              Your health journey, simplified
            </h2>
            <p className="text-lg text-[#6B7280] max-w-md mx-auto leading-relaxed">
              Track your protocol, message your physician, and manage everything from your personalized dashboard.
            </p>
          </ScrollReveal>
        </div>

        <AppPreviewScroll />
      </section>

      {/* ── How It Works (dark section) ── */}
      <section id="how-it-works" className="py-16 md:py-24 bg-[#152111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-normal text-white mb-4">
              How it works
            </h2>
            <p className="text-lg text-white/70 max-w-md mx-auto leading-relaxed">
              Get started in minutes. No hidden fees, no commitment.
            </p>
          </ScrollReveal>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] border-t border-white/10" aria-hidden="true" />

            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <ScrollReveal key={step.n} delay={index * 0.12} className="text-center relative">
                <div className="w-16 h-16 rounded-full border-2 border-[#D4A574] flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5 bg-[#152111] relative z-10">
                  {step.n}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-[15px] text-white/70 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4} className="text-center mt-12">
            <Link
              href="/quiz"
              className="px-8 py-4 rounded-full bg-[#D4A574] text-white font-semibold hover:bg-[#B8864A] transition-colors duration-200 no-underline inline-block cursor-pointer"
            >
              Start your consultation
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 md:py-24 bg-[#F6F8F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-normal text-[#131811] mb-4">
              Real people, real results
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-sm h-full flex flex-col">
                  <StarRating rating={t.rating} />
                  <p className="font-display italic text-[#131811] text-base leading-relaxed mt-5 mb-6 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#131811]">{t.name}</span>
                    <span className="text-sm text-[#D4A574] font-medium">{t.protocol}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-normal text-[#131811]">
              Frequently asked questions
            </h2>
          </ScrollReveal>

          <div>
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                index={i}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-16 md:py-24 bg-[#F5F0E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-[#131811] mb-5">
              Ready to feel your best?
            </h2>
            <p className="text-lg text-[#6B7280] mb-8 max-w-lg mx-auto leading-relaxed">
              Join thousands who&apos;ve transformed their health with peptide therapy.
            </p>
            <Link
              href="/quiz"
              className="px-8 py-4 rounded-full bg-[#D4A574] text-white font-semibold hover:bg-[#B8864A] transition-colors duration-200 no-underline inline-block cursor-pointer text-lg"
            >
              Start free consultation
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#152111] text-white pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-16 mb-16">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="white" strokeWidth="1.5" aria-hidden="true">
                  <path d="M16 2L28 9v14l-12 7L4 23V9l12-7z" />
                  <circle cx="16" cy="16" r="4" />
                  <path d="M16 12v-4M20 14l3.5-2M20 18l3.5 2M16 20v4M12 18l-3.5 2M12 14l-3.5-2" />
                </svg>
                <span className="font-semibold text-lg">PeptidePortal</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed max-w-[280px]">
                Physician-prescribed peptide therapy, delivered to your door.
              </p>
            </div>

            {[
              {
                heading: 'Treatments',
                links: [
                  { label: 'Weight Loss', href: '/catalog?cat=weight_loss' },
                  { label: 'Longevity', href: '/catalog?cat=longevity' },
                  { label: 'Recovery', href: '/catalog?cat=recovery' },
                  { label: 'Cognitive', href: '/catalog?cat=cognitive' },
                ],
              },
              {
                heading: 'Company',
                links: [
                  { label: 'About', href: '#' },
                  { label: 'For Providers', href: '/provider' },
                  { label: 'Contact', href: '#' },
                ],
              },
              {
                heading: 'Legal',
                links: [
                  { label: 'Privacy', href: '/privacy' },
                  { label: 'Terms', href: '/terms' },
                  { label: 'HIPAA', href: '/hipaa' },
                ],
              },
            ].map((col) => (
              <div key={col.heading}>
                <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">
                  {col.heading}
                </div>
                <ul className="list-none p-0 m-0 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 hover:text-[#D4A574] transition-colors duration-200 no-underline cursor-pointer"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 text-xs text-white/40">
            &copy; 2026 Peptide Portal. All rights reserved. This site does not provide medical advice.
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
        <div className="font-display text-4xl md:text-6xl font-normal text-[#131811]">
          Your Personal <span className="text-[#D4A574]">Health Dashboard</span>
        </div>
      }
    >
      <div className="w-full h-full bg-white rounded-xl overflow-hidden relative">
        <div className="p-6 bg-[#F6F8F6] h-full">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-[#D4A574] flex items-center justify-center">
              <span className="text-white font-bold text-base">P</span>
            </div>
            <span className="font-semibold text-[#131811]">My Protocol</span>
          </div>

          <div className="bg-white rounded-xl p-5 mb-4 border border-[#D4A574]">
            <div className="text-xs text-[#D4A574] font-semibold mb-2 uppercase tracking-wide">Active Protocol</div>
            <div className="text-xl font-bold text-[#131811] mb-1">Tirzepatide</div>
            <div className="text-sm text-[#6B7280]">Weight Loss &middot; $299/month</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
              <div className="text-xs text-[#9CA3AF] mb-1">Next Shipment</div>
              <div className="text-sm font-semibold text-[#131811]">Mar 15, 2026</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-[#E5E7EB]">
              <div className="text-xs text-[#9CA3AF] mb-1">Messages</div>
              <div className="text-sm font-semibold text-[#131811]">1 unread</div>
            </div>
          </div>
        </div>
      </div>
    </ContainerScroll>
  )
}
