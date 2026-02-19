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

/* ─── Radio Option Card (stitch 3 style) ─────────────────────────── */
function RadioCard({
  selected,
  onClick,
  label,
  sub,
}: {
  selected: boolean
  onClick: () => void
  label: string
  sub: string
}) {
  return (
    <button
      onClick={onClick}
      className="relative group w-full text-left"
      style={{ outline: 'none' }}
    >
      <div
        className="flex items-center justify-between rounded-xl p-6 transition-all duration-150"
        style={{
          background: selected ? 'rgba(37,87,54,0.05)' : 'var(--surface)',
          border: `2px solid ${selected ? '#255736' : 'rgba(19,24,17,0.12)'}`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        <div className="flex flex-col gap-1 pr-4">
          <span className="text-lg font-bold" style={{ color: 'var(--text)' }}>{label}</span>
          <span className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{sub}</span>
        </div>
        {/* Radio dot */}
        <div
          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
          style={{
            border: `2px solid ${selected ? '#255736' : 'rgba(19,24,17,0.2)'}`,
            background: selected ? '#255736' : 'transparent',
          }}
        >
          {selected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
        </div>
      </div>
    </button>
  )
}

/* ─── Checkbox Option Card ───────────────────────────────────────── */
function CheckCard({
  selected,
  onClick,
  label,
  sub,
}: {
  selected: boolean
  onClick: () => void
  label: string
  sub: string
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left"
      style={{ outline: 'none' }}
    >
      <div
        className="flex items-center justify-between rounded-xl p-6 transition-all duration-150"
        style={{
          background: selected ? 'rgba(37,87,54,0.05)' : 'var(--surface)',
          border: `2px solid ${selected ? '#255736' : 'rgba(19,24,17,0.12)'}`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        <div className="flex flex-col gap-1 pr-4">
          <span className="text-base font-bold" style={{ color: 'var(--text)' }}>{label}</span>
          <span className="text-sm" style={{ color: 'var(--text-2)' }}>{sub}</span>
        </div>
        <div
          className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center transition-colors"
          style={{
            border: `2px solid ${selected ? '#255736' : 'rgba(19,24,17,0.2)'}`,
            background: selected ? '#255736' : 'transparent',
          }}
        >
          {selected && (
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>
    </button>
  )
}

/* ─── Pill button ────────────────────────────────────────────────── */
function Pill({
  selected, onClick, accent, children,
}: {
  selected: boolean; onClick: () => void; accent?: string; children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
      style={{
        background: selected ? (accent ? `${accent}18` : 'rgba(37,87,54,0.1)') : 'var(--surface)',
        border: `2px solid ${selected ? (accent ?? '#255736') : 'rgba(19,24,17,0.12)'}`,
        color: selected ? (accent ?? '#255736') : 'var(--text-2)',
      }}
    >
      {children}
    </button>
  )
}

/* ─── Steps ──────────────────────────────────────────────────────── */
function StepExperience({ value, onChange }: { value: Experience | null; onChange: (v: Experience) => void }) {
  const opts: { value: Experience; label: string; sub: string }[] = [
    { value: 'beginner',     label: 'New to peptides',   sub: "I've heard about it but haven't used peptides before." },
    { value: 'intermediate', label: 'Some experience',   sub: "I've tried 1–2 peptides or done some independent research." },
    { value: 'expert',       label: 'Experienced user',  sub: "I understand peptide therapy and know what I'm looking for." },
  ]
  return (
    <div className="space-y-4">
      {opts.map(o => (
        <RadioCard key={o.value} selected={value === o.value} onClick={() => onChange(o.value)} label={o.label} sub={o.sub} />
      ))}
    </div>
  )
}

function StepGoals({ value, onChange }: { value: Goal[]; onChange: (v: Goal[]) => void }) {
  const opts: { value: Goal; label: string; icon: string; accent: string }[] = [
    { value: 'weight_loss', label: 'Weight Loss',           icon: '⚡', accent: '#E87070' },
    { value: 'recovery',    label: 'Recovery & Repair',     icon: '🔩', accent: '#255736' },
    { value: 'longevity',   label: 'Longevity',             icon: '⏳', accent: '#D4975A' },
    { value: 'cognitive',   label: 'Cognitive Performance', icon: '🧠', accent: '#9B8EE8' },
    { value: 'sleep',       label: 'Sleep & Stress',        icon: '🌙', accent: '#D4975A' },
    { value: 'hormones',    label: 'Hormone Optimization',  icon: '⚗️', accent: '#D4975A' },
  ]
  function toggle(v: Goal) {
    if (value.includes(v)) onChange(value.filter(g => g !== v))
    else if (value.length < 2) onChange([...value, v])
  }
  return (
    <div>
      <p className="text-base mb-6" style={{ color: 'var(--text-2)' }}>Select up to 2</p>
      <div className="flex flex-wrap gap-3">
        {opts.map(o => (
          <Pill key={o.value} selected={value.includes(o.value)} onClick={() => toggle(o.value)} accent={o.accent}>
            <span className="mr-1.5">{o.icon}</span>{o.label}
          </Pill>
        ))}
      </div>
    </div>
  )
}

function StepAge({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-3">
      {['18–29', '30–39', '40–49', '50–59', '60+'].map(a => (
        <Pill key={a} selected={value === a} onClick={() => onChange(a)}>{a}</Pill>
      ))}
    </div>
  )
}

function StepConditions({ value, onChange }: { value: Condition[]; onChange: (v: Condition[]) => void }) {
  const opts: { value: Condition; label: string; note: string }[] = [
    { value: 'cancer',         label: 'Active or historical cancer',     note: 'May contraindicate growth-promoting peptides' },
    { value: 'diabetes',       label: 'Diabetes or blood sugar issues',  note: 'Relevant for GLP-1 agonists' },
    { value: 'thyroid',        label: 'Thyroid disorder',                note: 'May affect GH secretagogue protocols' },
    { value: 'cardiovascular', label: 'Cardiovascular disease',          note: 'Important for physician review' },
    { value: 'pregnancy',      label: 'Pregnant or planning pregnancy',  note: 'Most peptides are contraindicated' },
    { value: 'none',           label: 'None of the above',               note: 'No known conditions' },
  ]
  function toggle(v: Condition) {
    if (v === 'none') { onChange(['none']); return }
    const next = value.filter(c => c !== 'none')
    onChange(next.includes(v) ? next.filter(c => c !== v) : [...next, v])
  }
  return (
    <div className="space-y-3">
      <p className="text-base mb-6" style={{ color: 'var(--text-2)' }}>Select all that apply</p>
      {opts.map(o => (
        <CheckCard key={o.value} selected={value.includes(o.value)} onClick={() => toggle(o.value)} label={o.label} sub={o.note} />
      ))}
    </div>
  )
}

function StepLifestyle({ activity, sleep, onActivity, onSleep }: {
  activity: Activity | null; sleep: Sleep | null
  onActivity: (v: Activity) => void; onSleep: (v: Sleep) => void
}) {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-base font-semibold mb-5" style={{ color: 'var(--text)' }}>Activity level</p>
        <div className="flex flex-wrap gap-3">
          {([
            { value: 'sedentary' as Activity,  label: 'Sedentary' },
            { value: 'light' as Activity,      label: 'Light (1–2x/wk)' },
            { value: 'moderate' as Activity,   label: 'Moderate (3–4x/wk)' },
            { value: 'active' as Activity,     label: 'Active (5–6x/wk)' },
            { value: 'very_active' as Activity,label: 'Very active (daily)' },
          ]).map(o => <Pill key={o.value} selected={activity === o.value} onClick={() => onActivity(o.value)}>{o.label}</Pill>)}
        </div>
      </div>
      <div>
        <p className="text-base font-semibold mb-5" style={{ color: 'var(--text)' }}>Sleep quality</p>
        <div className="flex flex-wrap gap-3">
          {([
            { value: 'poor' as Sleep, label: 'Poor (< 6 hrs)' },
            { value: 'fair' as Sleep, label: 'Fair (6–7 hrs)' },
            { value: 'good' as Sleep, label: 'Good (7–9 hrs)' },
          ]).map(o => <Pill key={o.value} selected={sleep === o.value} onClick={() => onSleep(o.value)}>{o.label}</Pill>)}
        </div>
      </div>
    </div>
  )
}

function StepPhysical({ weight, height, onWeight, onHeight }: {
  weight: string; height: string; onWeight: (v: string) => void; onHeight: (v: string) => void
}) {
  const inputStyle = {
    background: 'var(--surface)',
    border: '2px solid rgba(19,24,17,0.12)',
    color: 'var(--text)',
    borderRadius: 12,
    padding: '12px 16px',
    fontSize: 14,
    outline: 'none',
    width: 144,
  }
  return (
    <div className="space-y-8">
      <div>
        <label className="text-base font-semibold block mb-3" style={{ color: 'var(--text)' }}>Weight</label>
        <div className="flex items-center gap-3">
          <input type="number" placeholder="185" value={weight} onChange={e => onWeight(e.target.value)} style={inputStyle} />
          <span className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>lbs</span>
        </div>
      </div>
      <div>
        <label className="text-base font-semibold block mb-3" style={{ color: 'var(--text)' }}>Height</label>
        <div className="flex items-center gap-3">
          <input type="text" placeholder="5'10&quot;" value={height} onChange={e => onHeight(e.target.value)} style={inputStyle} />
          <span className="text-sm font-medium" style={{ color: 'var(--text-2)' }}>ft / in</span>
        </div>
      </div>
      <p className="text-xs" style={{ color: 'var(--text-3)' }}>Used by your physician for dosing calculations only. Never shared.</p>
    </div>
  )
}

function StepRecommendation({ answers }: { answers: Answers }) {
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [saveConfirm, setSaveConfirm] = useState(false)

  const recs = answers.goals
    .filter(g => g in PEPTIDE_RECS).map(g => PEPTIDE_RECS[g])
    .filter((r, i, arr) => arr.findIndex(x => x.slug === r.slug) === i).slice(0, 2)
  if (recs.length === 0) recs.push(PEPTIDE_RECS['longevity'])

  const hasContraindications = answers.conditions.length > 0 && !answers.conditions.includes('none')

  async function handleCheckout(rec: typeof recs[0]) {
    setLoadingSlug(rec.slug); setCheckoutError(null)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: 'price_placeholder', userId: 'guest', intakeSubmissionId: 'pending' }),
      })
      const data = await res.json() as { url?: string; error?: string; demo?: boolean }
      if (data.demo) { setCheckoutError('Checkout unavailable in demo mode.'); return }
      if (!res.ok || data.error) { setCheckoutError(data.error ?? 'Something went wrong.'); return }
      if (data.url) window.location.href = data.url
    } catch { setCheckoutError('Network error. Please try again.') }
    finally { setLoadingSlug(null) }
  }

  return (
    <div className="space-y-6">
      {hasContraindications && (
        <div className="flex items-start gap-3 p-4 rounded-xl text-sm"
          style={{ background: 'rgba(212,151,90,0.08)', border: '1px solid rgba(212,151,90,0.25)', color: 'var(--amber)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>You indicated one or more medical conditions. Your intake will be flagged for careful physician review.</span>
        </div>
      )}
      <p className="text-sm" style={{ color: 'var(--text-2)' }}>
        Based on your profile, here{recs.length > 1 ? ' are your' : ' is your'} recommended protocol{recs.length > 1 ? 's' : ''}.
      </p>
      {recs.map((rec, i) => (
        <div key={rec.slug} className="p-6 rounded-2xl"
          style={{ background: 'var(--surface)', border: `1px solid ${i === 0 ? rec.accent + '30' : 'var(--border)'}` }}>
          {i === 0 && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-4"
              style={{ background: rec.accent + '18', color: rec.accent }}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" />Top recommendation
            </div>
          )}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-display text-2xl mb-1" style={{ fontWeight: 400, color: 'var(--text)' }}>{rec.name}</h3>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: rec.accent }}>{rec.category}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>{rec.desc}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-display text-3xl" style={{ fontWeight: 300, color: 'var(--text)' }}>${rec.price}</div>
              <div className="text-xs" style={{ color: 'var(--text-2)' }}>/month</div>
            </div>
          </div>
          {i === 0 && (
            <div className="mt-5 space-y-3">
              <button onClick={() => handleCheckout(rec)} disabled={loadingSlug === rec.slug}
                className="w-full py-4 rounded-xl text-sm font-extrabold transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                style={{ background: rec.accent, color: '#fff', boxShadow: `0 4px 20px ${rec.accent}30` }}>
                {loadingSlug === rec.slug ? 'Redirecting…' : `Start Consultation — $${rec.price}/mo`}
              </button>
              {checkoutError && <p className="text-xs text-center" style={{ color: 'var(--rose)' }}>{checkoutError}</p>}
              <button onClick={() => { setSaveConfirm(true); setTimeout(() => setSaveConfirm(false), 5000) }}
                className="w-full py-3 rounded-xl text-sm font-medium transition-all"
                style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-2)' }}>
                Save &amp; Continue Later
              </button>
              {saveConfirm && (
                <p className="text-xs text-center py-2 rounded-lg"
                  style={{ background: 'rgba(37,87,54,0.08)', border: '1px solid rgba(37,87,54,0.2)', color: 'var(--teal)' }}>
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

function canProceed(step: number, answers: Answers): boolean {
  switch (step) {
    case 1: return answers.experience !== null
    case 2: return answers.goals.length > 0
    case 3: return answers.age !== ''
    case 4: return answers.conditions.length > 0
    case 5: return answers.activity !== null && answers.sleep !== null
    case 6: return true
    case 7: return false
    default: return false
  }
}

/* ─── Main ───────────────────────────────────────────────────────── */
export default function QuizClient() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState<'forward' | 'back'>('forward')
  const [animKey, setAnimKey] = useState(0)
  const [answers, setAnswers] = useState<Answers>({
    experience: null, goals: [], age: '', conditions: [],
    activity: null, sleep: null, weight: '', height: '',
  })

  const update = useCallback(<K extends keyof Answers>(key: K, val: Answers[K]) => {
    setAnswers(a => ({ ...a, [key]: val }))
  }, [])

  function goNext() {
    if (step === 1 && answers.experience === 'expert') { router.push('/catalog'); return }
    setDir('forward'); setAnimKey(k => k + 1); setStep(s => Math.min(s + 1, TOTAL_STEPS))
  }
  function goBack() {
    if (step === 1) return
    setDir('back'); setAnimKey(k => k + 1); setStep(s => Math.max(s - 1, 1))
  }

  const proceed = canProceed(step, answers)

  return (
    <div className="relative flex min-h-screen w-full flex-col" style={{ background: '#fdfcf8' }}>

      {/* ── Header ───────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background: 'rgba(253,252,248,0.88)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(19,24,17,0.08)',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#255736' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11" />
                <circle cx="12" cy="17" r="4" />
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight" style={{ color: '#131811' }}>Peptide Portal</span>
          </Link>
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--text-2)' }}>
            Step {step} of {TOTAL_STEPS}
          </span>
        </div>

        {/* Thin progress bar */}
        <div className="w-full h-1" style={{ background: '#e9f0e9' }}>
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%`, background: '#255736' }}
          />
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────────── */}
      <main className="flex-grow flex flex-col items-center justify-start px-6 py-12 md:py-20">
        <div className="w-full max-w-2xl">

          {/* Question heading — centered, large serif */}
          {step < TOTAL_STEPS && (
            <div className="text-center mb-12">
              <h2
                className="font-display"
                style={{
                  fontSize: 'clamp(36px, 5.5vw, 60px)',
                  fontWeight: 400,
                  color: 'var(--text)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                }}
              >
                {STEP_QUESTIONS[step - 1]}
              </h2>
              {step === 1 && (
                <p className="mt-4 text-lg max-w-md mx-auto" style={{ color: 'var(--text-2)' }}>
                  Select the option that best describes your current knowledge level.
                </p>
              )}
            </div>
          )}

          {step === TOTAL_STEPS && (
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: '#255736' }}>
                Assessment Complete
              </p>
              <h2
                className="font-display"
                style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, color: 'var(--text)', lineHeight: 1.15 }}
              >
                {STEP_QUESTIONS[step - 1]}
              </h2>
            </div>
          )}

          {/* Step body */}
          <div key={animKey} className={dir === 'forward' ? 'step-enter-right' : 'step-enter-left'}>
            {step === 1 && <StepExperience value={answers.experience} onChange={v => update('experience', v)} />}
            {step === 2 && <StepGoals value={answers.goals} onChange={v => update('goals', v)} />}
            {step === 3 && <StepAge value={answers.age} onChange={v => update('age', v)} />}
            {step === 4 && <StepConditions value={answers.conditions} onChange={v => update('conditions', v)} />}
            {step === 5 && (
              <StepLifestyle activity={answers.activity} sleep={answers.sleep}
                onActivity={v => update('activity', v)} onSleep={v => update('sleep', v)} />
            )}
            {step === 6 && (
              <StepPhysical weight={answers.weight} height={answers.height}
                onWeight={v => update('weight', v)} onHeight={v => update('height', v)} />
            )}
            {step === 7 && <StepRecommendation answers={answers} />}
          </div>

          {step === 1 && answers.experience === 'expert' && (
            <p className="mt-4 text-sm text-center" style={{ color: 'var(--text-2)' }}>
              As an experienced user, Continue will take you directly to the catalog.
            </p>
          )}
        </div>
      </main>

      {/* ── Sticky footer nav ────────────────────────────────────── */}
      <footer
        className="sticky bottom-0 z-50 w-full"
        style={{
          background: 'rgba(255,255,255,0.88)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(19,24,17,0.08)',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <button
            onClick={goBack}
            disabled={step === 1}
            className="flex items-center gap-2 font-bold transition-colors disabled:opacity-30"
            style={{ color: 'var(--text-2)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {step < TOTAL_STEPS && (
            <button
              onClick={goNext}
              disabled={!proceed}
              className="flex items-center justify-center gap-2 rounded-xl font-extrabold transition-all disabled:opacity-40"
              style={{
                minWidth: 160,
                padding: '14px 32px',
                fontSize: '0.95rem',
                background: proceed ? '#255736' : 'var(--surface-2)',
                color: proceed ? '#FFFFFF' : 'var(--text-2)',
                boxShadow: proceed ? '0 8px 24px rgba(37,87,54,0.3)' : 'none',
                transform: proceed ? 'translateY(0)' : undefined,
              }}
            >
              {step === TOTAL_STEPS - 1 ? 'See My Protocol' : 'Continue'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {step === TOTAL_STEPS && (
            <button onClick={goBack} className="flex items-center gap-2 font-bold transition-colors" style={{ color: 'var(--text-2)' }}>
              Edit answers
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}
