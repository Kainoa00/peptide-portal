'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

/* ─── Types ──────────────────────────────────────────────────────── */
type Experience = 'beginner' | 'intermediate' | 'expert'
type Goal = 'weight_loss' | 'recovery' | 'longevity' | 'cognitive' | 'sleep' | 'hormones'
type Condition = 'cancer' | 'diabetes' | 'thyroid' | 'cardiovascular' | 'pregnancy' | 'none'
type Activity = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
type Sleep = 'poor' | 'fair' | 'good'

interface Answers {
  experience: Experience | null
  goals: Goal[]
  age: string
  conditions: Condition[]
  activity: Activity | null
  sleep: Sleep | null
  weight: string
  height: string
}

/* ─── Peptide Recommendation Data ───────────────────────────────── */
const PEPTIDE_RECS: Record<Goal, { name: string; category: string; accent: string; desc: string; price: number; slug: string }> = {
  weight_loss: {
    name: 'Tirzepatide', category: 'Weight Loss', accent: '#E87070',
    desc: 'Dual GIP/GLP-1 receptor agonist with the strongest clinical evidence for fat loss.',
    price: 299, slug: 'tirzepatide',
  },
  recovery: {
    name: 'BPC-157 + TB-500', category: 'Recovery', accent: '#255736',
    desc: 'Synergistic blend targeting both local tissue repair and systemic healing.',
    price: 249, slug: 'bpc-157-tb-500',
  },
  longevity: {
    name: 'CJC-1295 / Ipamorelin', category: 'Longevity', accent: '#D4975A',
    desc: 'Gold-standard GH secretagogue stack. Amplified GH pulse with no cortisol spike.',
    price: 169, slug: 'cjc-1295-ipamorelin',
  },
  cognitive: {
    name: 'Semax', category: 'Cognitive', accent: '#9B8EE8',
    desc: 'BDNF upregulation and dopaminergic enhancement for sharper focus and memory.',
    price: 119, slug: 'semax',
  },
  sleep: {
    name: 'MK-677 (Ibutamoren)', category: 'Longevity', accent: '#D4975A',
    desc: 'Oral GH secretagogue that extends deep sleep and elevates IGF-1.',
    price: 139, slug: 'mk-677',
  },
  hormones: {
    name: 'CJC-1295 / Ipamorelin', category: 'Hormone Optimization', accent: '#D4975A',
    desc: 'Restores youthful GH pulsatility for improved body composition and vitality.',
    price: 169, slug: 'cjc-1295-ipamorelin',
  },
}

const TOTAL_STEPS = 7

/* ─── Sub-components ─────────────────────────────────────────────── */

function OptionCard({
  selected, onClick, children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-5 rounded-xl transition-all"
      style={{
        background: selected ? 'rgba(37,87,54,0.08)' : 'var(--surface)',
        border: `1px solid ${selected ? 'rgba(37,87,54,0.4)' : 'var(--border)'}`,
        outline: 'none',
      }}
    >
      {children}
    </button>
  )
}

function PillOption({
  selected, onClick, accent, children,
}: {
  selected: boolean
  onClick: () => void
  accent?: string
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2.5 rounded-full text-sm font-medium transition-all"
      style={{
        background: selected ? (accent ? `${accent}20` : 'var(--teal-dim)') : 'var(--surface)',
        border: `1px solid ${selected ? (accent ?? 'var(--teal)') : 'var(--border)'}`,
        color: selected ? (accent ?? 'var(--teal)') : 'var(--text-2)',
      }}
    >
      {children}
    </button>
  )
}

/* ─── Step 1: Experience ────────────────────────────────────────── */
function StepExperience({
  value, onChange,
}: {
  value: Experience | null
  onChange: (v: Experience) => void
}) {
  const opts: { value: Experience; label: string; sub: string }[] = [
    { value: 'beginner', label: 'New to peptides', sub: "I've heard about it but haven't used peptides before." },
    { value: 'intermediate', label: 'Some experience', sub: "I've tried 1–2 peptides or done some independent research." },
    { value: 'expert', label: 'Experienced user', sub: "I understand peptide therapy and know what I'm looking for." },
  ]
  return (
    <div className="space-y-3">
      {opts.map((o) => (
        <OptionCard key={o.value} selected={value === o.value} onClick={() => onChange(o.value)}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm mb-0.5" style={{ color: 'var(--text)' }}>{o.label}</div>
              <div className="text-xs leading-relaxed" style={{ color: 'var(--text-2)' }}>{o.sub}</div>
            </div>
            <div
              className="w-5 h-5 rounded-full flex-shrink-0 ml-4 flex items-center justify-center"
              style={{
                border: `2px solid ${value === o.value ? 'var(--teal)' : 'var(--border-hover)'}`,
                background: value === o.value ? 'var(--teal)' : 'transparent',
              }}
            >
              {value === o.value && (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </div>
          </div>
        </OptionCard>
      ))}
    </div>
  )
}

/* ─── Step 2: Goals ─────────────────────────────────────────────── */
function StepGoals({
  value, onChange,
}: {
  value: Goal[]
  onChange: (v: Goal[]) => void
}) {
  const opts: { value: Goal; label: string; icon: string; accent: string }[] = [
    { value: 'weight_loss', label: 'Weight Loss', icon: '⚡', accent: '#E87070' },
    { value: 'recovery', label: 'Recovery & Repair', icon: '🔩', accent: '#255736' },
    { value: 'longevity', label: 'Longevity', icon: '⏳', accent: '#D4975A' },
    { value: 'cognitive', label: 'Cognitive Performance', icon: '🧠', accent: '#9B8EE8' },
    { value: 'sleep', label: 'Sleep & Stress', icon: '🌙', accent: '#D4975A' },
    { value: 'hormones', label: 'Hormone Optimization', icon: '⚗️', accent: '#D4975A' },
  ]
  function toggle(v: Goal) {
    if (value.includes(v)) {
      onChange(value.filter((g) => g !== v))
    } else if (value.length < 2) {
      onChange([...value, v])
    }
  }
  return (
    <div>
      <p className="text-xs mb-4" style={{ color: 'var(--text-2)' }}>Select up to 2</p>
      <div className="flex flex-wrap gap-2.5">
        {opts.map((o) => (
          <PillOption
            key={o.value}
            selected={value.includes(o.value)}
            onClick={() => toggle(o.value)}
            accent={o.accent}
          >
            <span className="mr-1.5">{o.icon}</span>
            {o.label}
          </PillOption>
        ))}
      </div>
    </div>
  )
}

/* ─── Step 3: Age ───────────────────────────────────────────────── */
function StepAge({
  value, onChange,
}: {
  value: string
  onChange: (v: string) => void
}) {
  const ages = ['18–29', '30–39', '40–49', '50–59', '60+']
  return (
    <div className="flex flex-wrap gap-3">
      {ages.map((a) => (
        <PillOption key={a} selected={value === a} onClick={() => onChange(a)}>
          {a}
        </PillOption>
      ))}
    </div>
  )
}

/* ─── Step 4: Medical Conditions ─────────────────────────────────── */
function StepConditions({
  value, onChange,
}: {
  value: Condition[]
  onChange: (v: Condition[]) => void
}) {
  const opts: { value: Condition; label: string; note: string }[] = [
    { value: 'cancer', label: 'Active or historical cancer', note: 'May contraindicate growth-promoting peptides' },
    { value: 'diabetes', label: 'Diabetes or blood sugar issues', note: 'Relevant for GLP-1 agonists' },
    { value: 'thyroid', label: 'Thyroid disorder', note: 'May affect GH secretagogue protocols' },
    { value: 'cardiovascular', label: 'Cardiovascular disease', note: 'Important for physician review' },
    { value: 'pregnancy', label: 'Pregnant or planning pregnancy', note: 'Most peptides are contraindicated' },
    { value: 'none', label: 'None of the above', note: 'No known conditions' },
  ]

  function toggle(v: Condition) {
    if (v === 'none') {
      onChange(['none'])
      return
    }
    const next = value.filter((c) => c !== 'none')
    if (next.includes(v)) {
      onChange(next.filter((c) => c !== v))
    } else {
      onChange([...next, v])
    }
  }

  return (
    <div className="space-y-2.5">
      <p className="text-xs mb-4" style={{ color: 'var(--text-2)' }}>Select all that apply</p>
      {opts.map((o) => (
        <OptionCard key={o.value} selected={value.includes(o.value)} onClick={() => toggle(o.value)}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>{o.label}</div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>{o.note}</div>
            </div>
            <div
              className="w-4 h-4 rounded flex-shrink-0 ml-4 flex items-center justify-center"
              style={{
                border: `2px solid ${value.includes(o.value) ? 'var(--teal)' : 'var(--border-hover)'}`,
                background: value.includes(o.value) ? 'var(--teal)' : 'transparent',
              }}
            >
              {value.includes(o.value) && (
                <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              )}
            </div>
          </div>
        </OptionCard>
      ))}
    </div>
  )
}

/* ─── Step 5: Activity & Sleep ────────────────────────────────────── */
function StepLifestyle({
  activity, sleep, onActivity, onSleep,
}: {
  activity: Activity | null
  sleep: Sleep | null
  onActivity: (v: Activity) => void
  onSleep: (v: Sleep) => void
}) {
  const activityOpts: { value: Activity; label: string }[] = [
    { value: 'sedentary', label: 'Sedentary' },
    { value: 'light', label: 'Light (1–2x/wk)' },
    { value: 'moderate', label: 'Moderate (3–4x/wk)' },
    { value: 'active', label: 'Active (5–6x/wk)' },
    { value: 'very_active', label: 'Very active (daily)' },
  ]
  const sleepOpts: { value: Sleep; label: string }[] = [
    { value: 'poor', label: 'Poor (< 6 hrs or broken)' },
    { value: 'fair', label: 'Fair (6–7 hrs)' },
    { value: 'good', label: 'Good (7–9 hrs)' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text)' }}>
          Activity level
        </p>
        <div className="flex flex-wrap gap-2.5">
          {activityOpts.map((o) => (
            <PillOption key={o.value} selected={activity === o.value} onClick={() => onActivity(o.value)}>
              {o.label}
            </PillOption>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text)' }}>
          Sleep quality
        </p>
        <div className="flex flex-wrap gap-2.5">
          {sleepOpts.map((o) => (
            <PillOption key={o.value} selected={sleep === o.value} onClick={() => onSleep(o.value)}>
              {o.label}
            </PillOption>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Step 6: Physical Stats ──────────────────────────────────────── */
function StepPhysical({
  weight, height, onWeight, onHeight,
}: {
  weight: string
  height: string
  onWeight: (v: string) => void
  onHeight: (v: string) => void
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>
          Weight
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="185"
            value={weight}
            onChange={(e) => onWeight(e.target.value)}
            aria-required="true"
            className="w-32 px-4 py-3 rounded-xl text-sm outline-none transition-colors"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              colorScheme: 'dark',
            }}
          />
          <span className="text-sm" style={{ color: 'var(--text-2)' }}>lbs</span>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>
          Height
        </label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="5'10&quot;"
            value={height}
            onChange={(e) => onHeight(e.target.value)}
            aria-required="true"
            className="w-32 px-4 py-3 rounded-xl text-sm outline-none transition-colors"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              colorScheme: 'dark',
            }}
          />
          <span className="text-sm" style={{ color: 'var(--text-2)' }}>ft / in</span>
        </div>
      </div>

      <p className="text-xs" style={{ color: 'var(--text-3)' }}>
        Used by your physician for dosing calculations only. Never shared.
      </p>
    </div>
  )
}

/* ─── Step 7: Recommendation ──────────────────────────────────────── */
function StepRecommendation({ answers }: { answers: Answers }) {
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [saveConfirm, setSaveConfirm] = useState(false)

  const recs = answers.goals
    .filter((g) => g in PEPTIDE_RECS)
    .map((g) => PEPTIDE_RECS[g])
    .filter((r, i, arr) => arr.findIndex((x) => x.slug === r.slug) === i)
    .slice(0, 2)

  if (recs.length === 0) {
    recs.push(PEPTIDE_RECS['longevity'])
  }

  const hasContraindications = answers.conditions.length > 0 && !answers.conditions.includes('none')

  async function handleCheckout(rec: typeof recs[0]) {
    setLoadingSlug(rec.slug)
    setCheckoutError(null)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: 'price_placeholder',
          userId: 'guest',
          intakeSubmissionId: 'pending',
        }),
      })
      const data = await res.json() as { url?: string; error?: string; demo?: boolean }
      if (data.demo) {
        setCheckoutError('Checkout unavailable in demo mode.')
        return
      }
      if (!res.ok || data.error) {
        setCheckoutError(data.error ?? 'Something went wrong. Please try again.')
        return
      }
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setCheckoutError('Network error. Please check your connection and try again.')
    } finally {
      setLoadingSlug(null)
    }
  }

  function handleSaveLater() {
    setSaveConfirm(true)
    setTimeout(() => setSaveConfirm(false), 5000)
  }

  return (
    <div className="space-y-6">
      {hasContraindications && (
        <div
          className="flex items-start gap-3 p-4 rounded-xl text-sm"
          style={{
            background: 'rgba(212,151,90,0.08)',
            border: '1px solid rgba(212,151,90,0.25)',
            color: 'var(--amber)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>
            You indicated one or more medical conditions. Your intake will be flagged for careful physician review. A provider will reach out if additional screening is needed before approval.
          </span>
        </div>
      )}

      <p className="text-sm" style={{ color: 'var(--text-2)' }}>
        Based on your profile, here{recs.length > 1 ? ' are your' : ' is your'} recommended{' '}
        protocol{recs.length > 1 ? 's' : ''}.
      </p>

      {recs.map((rec, i) => (
        <div
          key={rec.slug}
          className="p-6 rounded-2xl"
          style={{
            background: 'var(--surface)',
            border: `1px solid ${i === 0 ? rec.accent + '30' : 'var(--border)'}`,
          }}
        >
          {i === 0 && (
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-4"
              style={{ background: rec.accent + '18', color: rec.accent }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              Top recommendation
            </div>
          )}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3
                className="font-display text-2xl mb-1"
                style={{ fontWeight: 400, color: 'var(--text)' }}
              >
                {rec.name}
              </h3>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: rec.accent }}>
                {rec.category}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
                {rec.desc}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <div
                className="font-display text-3xl"
                style={{ fontWeight: 300, color: 'var(--text)' }}
              >
                ${rec.price}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-2)' }}>/month</div>
            </div>
          </div>

          {i === 0 && (
            <div className="mt-5 space-y-3">
              {/* Primary CTA */}
              <button
                onClick={() => handleCheckout(rec)}
                disabled={loadingSlug === rec.slug}
                className="w-full py-3.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                style={{
                  background: rec.accent,
                  color: '#FFFFFF',
                  boxShadow: `0 0 24px ${rec.accent}30`,
                }}
              >
                {loadingSlug === rec.slug ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 12a9 9 0 11-6.219-8.56" />
                    </svg>
                    Redirecting to checkout…
                  </>
                ) : (
                  <>Start Consultation — ${rec.price}/mo</>
                )}
              </button>

              {/* Inline error */}
              {checkoutError && (
                <p className="text-xs text-center" style={{ color: 'var(--rose)' }}>
                  {checkoutError}
                </p>
              )}

              {/* Secondary CTA */}
              <button
                onClick={handleSaveLater}
                className="w-full py-2.5 rounded-xl text-sm transition-all"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text-2)',
                }}
              >
                Save &amp; Continue Later
              </button>

              {/* Save confirmation inline toast */}
              {saveConfirm && (
                <p
                  className="text-xs text-center py-2 rounded-lg"
                  style={{
                    background: 'rgba(37,87,54,0.08)',
                    border: '1px solid rgba(37,87,54,0.2)',
                    color: 'var(--teal)',
                  }}
                >
                  We&apos;ll email you your protocol summary.
                </p>
              )}
            </div>
          )}
        </div>
      ))}

      <p className="text-xs text-center" style={{ color: 'var(--text-3)' }}>
        Billed monthly. Cancel anytime. Refund available if prescription is denied.
      </p>
    </div>
  )
}

/* ─── Step config ────────────────────────────────────────────────── */
const STEP_QUESTIONS = [
  'How familiar are you with peptide therapy?',
  'What are your primary goals?',
  'What is your age range?',
  'Do you have any of the following conditions?',
  'Tell us about your lifestyle.',
  'A few quick physical details.',
  'Your personalized protocol.',
]

/* ─── Validation: can user proceed from this step? ────────────────── */
function canProceed(step: number, answers: Answers): boolean {
  switch (step) {
    case 1: return answers.experience !== null
    case 2: return answers.goals.length > 0
    case 3: return answers.age !== ''
    case 4: return answers.conditions.length > 0
    case 5: return answers.activity !== null && answers.sleep !== null
    case 6: return true // physical stats are optional
    case 7: return false // last step — no "next"
    default: return false
  }
}

/* ─── Main Quiz Client Component ─────────────────────────────────── */
export default function QuizClient() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState<'forward' | 'back'>('forward')
  const [animKey, setAnimKey] = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    experience: null,
    goals: [],
    age: '',
    conditions: [],
    activity: null,
    sleep: null,
    weight: '',
    height: '',
  })

  const update = useCallback(<K extends keyof Answers>(key: K, val: Answers[K]) => {
    setAnswers((a) => ({ ...a, [key]: val }))
  }, [])

  function goNext() {
    // Expert shortcut: send to catalog
    if (step === 1 && answers.experience === 'expert') {
      router.push('/catalog')
      return
    }
    setDir('forward')
    setAnimKey((k) => k + 1)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  function goBack() {
    if (step === 1) return
    setDir('back')
    setAnimKey((k) => k + 1)
    setStep((s) => Math.max(s - 1, 1))
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--bg)' }}
    >
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header
        className="flex-shrink-0 px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <Link
          href="/"
          className="font-display text-lg"
          style={{ color: 'var(--text)', fontStyle: 'italic', fontWeight: 400 }}
        >
          peptide<span style={{ color: 'var(--teal)', fontStyle: 'normal', fontWeight: 300 }}>portal</span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-xs" style={{ color: 'var(--text-2)' }}>
            Step {step} of {TOTAL_STEPS}
          </span>
          <Link
            href="/"
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-2)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </Link>
        </div>
      </header>

      {/* ── DNA-strand progress bar ─────────────────────────────── */}
      <div className="flex-shrink-0 px-6 py-5" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-xl mx-auto">
          {/* Segmented track */}
          <div
            className="flex items-center gap-1"
            role="progressbar"
            aria-label={`Step ${step} of ${TOTAL_STEPS}`}
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={TOTAL_STEPS}
          >
            {Array.from({ length: TOTAL_STEPS }, (_, i) => {
              const filled = i < step
              const active = i === step - 1
              return (
                <div
                  key={i}
                  className="h-1.5 flex-1 rounded-full transition-all duration-500"
                  style={{
                    background: active
                      ? 'var(--teal)'
                      : filled
                        ? 'rgba(37,87,54,0.40)'
                        : 'var(--surface-3)',
                    boxShadow: active ? '0 0 8px rgba(37,87,54,0.5)' : 'none',
                  }}
                />
              )
            })}
          </div>
          {/* Step label */}
          <p className="text-xs mt-2" style={{ color: 'var(--text-2)' }}>
            {STEP_QUESTIONS[step - 1]}
          </p>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <main className="flex-1 flex items-start justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-xl">

          {/* Question heading */}
          {step < TOTAL_STEPS && (
            <h1
              id="step-heading"
              className="font-display mb-8"
              style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 300,
                color: 'var(--text)',
                lineHeight: 1.2,
              }}
            >
              {STEP_QUESTIONS[step - 1]}
            </h1>
          )}

          {step === TOTAL_STEPS && (
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--teal)' }}>
                Assessment Complete
              </p>
              <h1
                id="step-heading"
                className="font-display"
                style={{
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  fontWeight: 300,
                  color: 'var(--text)',
                  lineHeight: 1.2,
                }}
              >
                {STEP_QUESTIONS[step - 1]}
              </h1>
            </div>
          )}

          {/* Step body — animated on step change */}
          <div
            key={animKey}
            className={dir === 'forward' ? 'step-enter-right' : 'step-enter-left'}
          >
            {step === 1 && (
              <div role="group" aria-labelledby="step-heading">
                <StepExperience
                  value={answers.experience}
                  onChange={(v) => update('experience', v)}
                />
              </div>
            )}
            {step === 2 && (
              <div role="group" aria-labelledby="step-heading">
                <StepGoals
                  value={answers.goals}
                  onChange={(v) => update('goals', v)}
                />
              </div>
            )}
            {step === 3 && (
              <div role="group" aria-labelledby="step-heading">
                <StepAge
                  value={answers.age}
                  onChange={(v) => update('age', v)}
                />
              </div>
            )}
            {step === 4 && (
              <div role="group" aria-labelledby="step-heading">
                <StepConditions
                  value={answers.conditions}
                  onChange={(v) => update('conditions', v)}
                />
              </div>
            )}
            {step === 5 && (
              <div role="group" aria-labelledby="step-heading">
                <StepLifestyle
                  activity={answers.activity}
                  sleep={answers.sleep}
                  onActivity={(v) => update('activity', v)}
                  onSleep={(v) => update('sleep', v)}
                />
              </div>
            )}
            {step === 6 && (
              <div role="group" aria-labelledby="step-heading">
                <StepPhysical
                  weight={answers.weight}
                  height={answers.height}
                  onWeight={(v) => update('weight', v)}
                  onHeight={(v) => update('height', v)}
                />
              </div>
            )}
            {step === 7 && <StepRecommendation answers={answers} />}
          </div>

          {/* Expert shortcut */}
          {step === 1 && answers.experience === 'expert' && (
            <p className="mt-4 text-xs" style={{ color: 'var(--text-2)' }}>
              As an experienced user, clicking Continue will take you directly to the catalog.
            </p>
          )}
        </div>
      </main>

      {/* ── Navigation ──────────────────────────────────────────── */}
      {step < TOTAL_STEPS && (
        <footer
          className="flex-shrink-0 px-6 py-5 flex items-center justify-between"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <button
            onClick={goBack}
            disabled={step === 1}
            className="flex items-center gap-2 text-sm transition-colors disabled:opacity-30"
            style={{ color: 'var(--text-2)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <button
            onClick={goNext}
            disabled={!canProceed(step, answers)}
            className="flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium transition-all disabled:opacity-30"
            style={{
              background: canProceed(step, answers) ? 'var(--teal)' : 'var(--surface)',
              color: canProceed(step, answers) ? '#06060F' : 'var(--text-2)',
              border: canProceed(step, answers) ? 'none' : '1px solid var(--border)',
            }}
          >
            {step === TOTAL_STEPS - 1 ? 'See My Protocol' : 'Continue'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </footer>
      )}

      {/* ── Back from results ────────────────────────────────────── */}
      {step === TOTAL_STEPS && (
        <footer
          className="flex-shrink-0 px-6 py-5 flex items-center"
          style={{ borderTop: '1px solid var(--border)' }}
        >
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'var(--text-2)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Edit answers
          </button>
        </footer>
      )}
    </div>
  )
}
