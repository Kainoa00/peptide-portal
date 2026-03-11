'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

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
const PEPTIDE_RECS: Record<Goal, { name: string; category: string; desc: string; price: number; slug: string }> = {
  weight_loss: {
    name: 'Tirzepatide', category: 'Weight Loss',
    desc: 'Dual GIP/GLP-1 receptor agonist with the strongest clinical evidence for fat loss.',
    price: 299, slug: 'tirzepatide',
  },
  recovery: {
    name: 'BPC-157 + TB-500', category: 'Recovery',
    desc: 'Synergistic blend targeting both local tissue repair and systemic healing.',
    price: 249, slug: 'bpc-157-tb-500',
  },
  longevity: {
    name: 'CJC-1295 / Ipamorelin', category: 'Longevity',
    desc: 'Gold-standard GH secretagogue stack. Amplified GH pulse with no cortisol spike.',
    price: 169, slug: 'cjc-1295-ipamorelin',
  },
  cognitive: {
    name: 'Semax', category: 'Cognitive',
    desc: 'BDNF upregulation and dopaminergic enhancement for sharper focus and memory.',
    price: 119, slug: 'semax',
  },
  sleep: {
    name: 'MK-677 (Ibutamoren)', category: 'Longevity',
    desc: 'Oral GH secretagogue that extends deep sleep and elevates IGF-1.',
    price: 139, slug: 'mk-677',
  },
  hormones: {
    name: 'CJC-1295 / Ipamorelin', category: 'Hormone Optimization',
    desc: 'Restores youthful GH pulsatility for improved body composition and vitality.',
    price: 169, slug: 'cjc-1295-ipamorelin',
  },
}

const TOTAL_STEPS = 7

/* ─── Radio Option Card ─────────────────────────────────────────── */
function RadioCard({ selected, onClick, label, sub }: { selected: boolean; onClick: () => void; label: string; sub: string }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-transparent border-none cursor-pointer p-0"
    >
      <div className={`flex items-center justify-between px-6 py-5 bg-white rounded-xl transition-all duration-200 border-2 ${selected ? 'border-[#D4A574]' : 'border-[#E5E7EB]'}`}>
        <div className="flex flex-col gap-1 pr-4">
          <span className="text-base font-semibold text-[#131811]">{label}</span>
          <span className="text-sm text-[#6B7280]">{sub}</span>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? 'border-[#D4A574] bg-[#D4A574]' : 'border-[#E5E7EB] bg-transparent'}`}>
          {selected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
        </div>
      </div>
    </button>
  )
}

/* ─── Checkbox Option Card ──────────────────────────────────────── */
function CheckCard({ selected, onClick, label, sub }: { selected: boolean; onClick: () => void; label: string; sub: string }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-transparent border-none cursor-pointer p-0"
    >
      <div className={`flex items-center justify-between px-6 py-5 bg-white rounded-xl transition-all duration-200 border-2 ${selected ? 'border-[#D4A574]' : 'border-[#E5E7EB]'}`}>
        <div className="flex flex-col gap-1 pr-4">
          <span className="text-base font-semibold text-[#131811]">{label}</span>
          <span className="text-sm text-[#6B7280]">{sub}</span>
        </div>
        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 ${selected ? 'border-[#D4A574] bg-[#D4A574]' : 'border-[#E5E7EB] bg-transparent'}`}>
          {selected && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>
    </button>
  )
}

/* ─── Pill Button ───────────────────────────────────────────────── */
function Pill({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full text-sm font-semibold border-2 cursor-pointer transition-all duration-200 ${
        selected
          ? 'bg-[#D4A574] text-white border-[#D4A574]'
          : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#D4A574]/40'
      }`}
    >
      {children}
    </button>
  )
}

/* ─── Steps ──────────────────────────────────────────────────────── */
function StepExperience({ value, onChange }: { value: Experience | null; onChange: (v: Experience) => void }) {
  const opts = [
    { value: 'beginner', label: "I'm new to peptides", sub: "I haven't tried peptide therapy before" },
    { value: 'intermediate', label: 'Some experience', sub: "I've tried 1-2 peptides before" },
    { value: 'expert', label: 'Experienced user', sub: "I know what I'm looking for" },
  ]
  return (
    <div className="flex flex-col gap-3">
      {opts.map(o => (
        <RadioCard key={o.value} selected={value === o.value} onClick={() => onChange(o.value as Experience)} label={o.label} sub={o.sub} />
      ))}
    </div>
  )
}

function StepGoals({ value, onChange }: { value: Goal[]; onChange: (v: Goal[]) => void }) {
  const opts = [
    { value: 'weight_loss', label: 'Weight Loss' },
    { value: 'recovery', label: 'Recovery' },
    { value: 'longevity', label: 'Longevity' },
    { value: 'cognitive', label: 'Cognitive' },
    { value: 'sleep', label: 'Sleep' },
    { value: 'hormones', label: 'Hormone Optimization' },
  ]
  function toggle(v: Goal) {
    if (value.includes(v)) onChange(value.filter(g => g !== v))
    else if (value.length < 2) onChange([...value, v])
  }
  return (
    <div>
      <p className="text-sm text-[#6B7280] mb-4">Select up to 2</p>
      <div className="flex flex-wrap gap-3">
        {opts.map(o => (
          <Pill key={o.value} selected={value.includes(o.value as Goal)} onClick={() => toggle(o.value as Goal)}>
            {o.label}
          </Pill>
        ))}
      </div>
    </div>
  )
}

function StepAge({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ages = ['18-29', '30-39', '40-49', '50-59', '60+']
  return (
    <div className="flex flex-wrap gap-3">
      {ages.map(a => (
        <Pill key={a} selected={value === a} onClick={() => onChange(a)}>{a}</Pill>
      ))}
    </div>
  )
}

function StepConditions({ value, onChange }: { value: Condition[]; onChange: (v: Condition[]) => void }) {
  const opts = [
    { value: 'cancer', label: 'Active or historical cancer', note: 'May contraindicate growth-promoting peptides' },
    { value: 'diabetes', label: 'Diabetes or blood sugar issues', note: 'Relevant for GLP-1 agonists' },
    { value: 'thyroid', label: 'Thyroid disorder', note: 'May affect GH secretagogue protocols' },
    { value: 'cardiovascular', label: 'Cardiovascular disease', note: 'Important for physician review' },
    { value: 'pregnancy', label: 'Pregnant or planning pregnancy', note: 'Most peptides are contraindicated' },
    { value: 'none', label: 'None of the above', note: 'No known conditions' },
  ]
  function toggle(v: Condition) {
    if (v === 'none') { onChange(['none']); return }
    const next = value.filter(c => c !== 'none')
    onChange(next.includes(v) ? next.filter(c => c !== v) : [...next, v])
  }
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-[#6B7280] mb-2">Select all that apply</p>
      {opts.map(o => (
        <CheckCard key={o.value} selected={value.includes(o.value as Condition)} onClick={() => toggle(o.value as Condition)} label={o.label} sub={o.note} />
      ))}
    </div>
  )
}

function StepLifestyle({ activity, sleep, onActivity, onSleep }: {
  activity: Activity | null; sleep: Sleep | null
  onActivity: (v: Activity) => void; onSleep: (v: Sleep) => void
}) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-[15px] font-semibold text-[#131811] mb-3">Activity level</p>
        <div className="flex flex-wrap gap-3">
          {[
            { value: 'sedentary', label: 'Sedentary' },
            { value: 'light', label: 'Light (1-2x/week)' },
            { value: 'moderate', label: 'Moderate (3-4x/week)' },
            { value: 'active', label: 'Active (5-6x/week)' },
            { value: 'very_active', label: 'Very active (daily)' },
          ].map(o => <Pill key={o.value} selected={activity === o.value} onClick={() => onActivity(o.value as Activity)}>{o.label}</Pill>)}
        </div>
      </div>
      <div>
        <p className="text-[15px] font-semibold text-[#131811] mb-3">Sleep quality</p>
        <div className="flex flex-wrap gap-3">
          {[
            { value: 'poor', label: 'Poor (< 6 hrs)' },
            { value: 'fair', label: 'Fair (6-7 hrs)' },
            { value: 'good', label: 'Good (7-9 hrs)' },
          ].map(o => <Pill key={o.value} selected={sleep === o.value} onClick={() => onSleep(o.value as Sleep)}>{o.label}</Pill>)}
        </div>
      </div>
    </div>
  )
}

function StepPhysical({ weight, height, onWeight, onHeight }: {
  weight: string; height: string; onWeight: (v: string) => void; onHeight: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <label htmlFor="weight-input" className="block text-sm font-semibold text-[#131811] mb-2">Weight</label>
        <div className="flex items-center gap-3">
          <input
            id="weight-input"
            type="number"
            placeholder="185"
            value={weight}
            onChange={e => onWeight(e.target.value)}
            className="px-4 py-3.5 text-[15px] border border-[#E5E7EB] rounded-xl bg-white text-[#131811] outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors"
          />
          <span className="text-sm text-[#6B7280]">lbs</span>
        </div>
      </div>
      <div>
        <label htmlFor="height-input" className="block text-sm font-semibold text-[#131811] mb-2">Height</label>
        <div className="flex items-center gap-3">
          <input
            id="height-input"
            type="text"
            placeholder="5'10&quot;"
            value={height}
            onChange={e => onHeight(e.target.value)}
            className="w-[120px] px-4 py-3.5 text-[15px] border border-[#E5E7EB] rounded-xl bg-white text-[#131811] outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors"
          />
        </div>
      </div>
      <p className="text-xs text-[#9CA3AF]">Used by your physician for dosing calculations only.</p>
    </div>
  )
}

function StepRecommendation({ answers }: { answers: Answers }) {
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null)

  const recs = answers.goals
    .filter(g => g in PEPTIDE_RECS).map(g => PEPTIDE_RECS[g])
    .filter((r, i, arr) => arr.findIndex(x => x.slug === r.slug) === i).slice(0, 2)
  if (recs.length === 0) recs.push(PEPTIDE_RECS['longevity'])

  const hasContraindications = answers.conditions.length > 0 && !answers.conditions.includes('none')

  async function handleCheckout(rec: typeof recs[0]) {
    setLoadingSlug(rec.slug)

    try {
      // Get current user
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Not logged in - redirect to login
        window.location.href = '/login'
        return
      }

      // Map conditions to medical history
      const medicalHistory: Record<string, boolean> = {}
      answers.conditions.forEach((c: Condition) => {
        if (c !== 'none') medicalHistory[c] = true
      })

      // Save intake submission
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          goals: answers.goals,
          experienceLevel: answers.experience,
          age: answers.age,
          medicalHistory,
          activityLevel: answers.activity,
          sleepQuality: answers.sleep,
          weight: answers.weight,
          height: answers.height,
          recommendedPeptideSlug: rec.slug,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Demo mode - redirect to dashboard
        window.location.href = '/dashboard'
        return
      } else {
        alert('Error: ' + (result.error || 'Failed to submit'))
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoadingSlug(null)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      {hasContraindications && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl text-sm text-amber-800">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 mt-0.5" aria-hidden="true">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>You indicated a medical condition. Your intake will be flagged for physician review.</span>
        </div>
      )}

      <p className="text-[15px] text-[#6B7280]">
        Based on your profile, here {recs.length > 1 ? 'are your' : 'is your'} recommended protocol{recs.length > 1 ? 's' : ''}.
      </p>

      {recs.map((rec, i) => (
        <div key={rec.slug} className={`p-6 bg-white rounded-2xl border-2 ${i === 0 ? 'border-[#D4A574]' : 'border-[#E5E7EB]'}`}>
          {i === 0 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F0E8] rounded-full text-xs font-semibold text-[#B8864A] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A574]" />
              Top recommendation
            </div>
          )}

          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h3 className="text-[22px] font-bold text-[#131811] mb-1">{rec.name}</h3>
              <p className="text-xs font-semibold text-[#D4A574] uppercase tracking-widest mb-3">{rec.category}</p>
              <p className="text-sm text-[#6B7280] leading-relaxed">{rec.desc}</p>
            </div>
            <div className="text-right">
              <div className="text-[28px] font-bold text-[#131811]">${rec.price}</div>
              <div className="text-xs text-[#9CA3AF]">/month</div>
            </div>
          </div>

          {i === 0 && (
            <div className="mt-5">
              <button
                onClick={() => handleCheckout(rec)}
                disabled={loadingSlug === rec.slug}
                className="w-full py-4 bg-[#D4A574] text-white rounded-full text-[15px] font-semibold cursor-pointer hover:bg-[#B8864A] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loadingSlug === rec.slug ? 'Processing...' : `Start Consultation — $${rec.price}/mo`}
              </button>
              <p className="text-center text-xs text-[#9CA3AF] mt-3">
                Cancel anytime. Refund available if prescription denied.
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Step Questions ─────────────────────────────────────────────── */
const STEP_QUESTIONS = [
  'How familiar are you with peptide therapy?',
  'What are your primary goals?',
  'What is your age range?',
  'Do you have any medical conditions?',
  'Tell us about your lifestyle.',
  'A few quick details.',
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
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Answers>({
    experience: null, goals: [], age: '', conditions: [],
    activity: null, sleep: null, weight: '', height: '',
  })

  const update = useCallback(<K extends keyof Answers>(key: K, val: Answers[K]) => {
    setAnswers(a => ({ ...a, [key]: val }))
  }, [])

  function goNext() {
    if (step === 1 && answers.experience === 'expert') { window.location.href = '/catalog'; return }
    setStep(s => Math.min(s + 1, TOTAL_STEPS))
  }
  function goBack() {
    if (step === 1) return
    setStep(s => Math.max(s - 1, 1))
  }

  const proceed = canProceed(step, answers)

  return (
    <div className="min-h-screen bg-[#F6F8F6]">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 no-underline cursor-pointer">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#131811" strokeWidth="1.5" aria-hidden="true">
              <path d="M16 2L28 9v14l-12 7L4 23V9l12-7z" />
              <circle cx="16" cy="16" r="4" />
              <path d="M16 12v-4M20 14l3.5-2M20 18l3.5 2M16 20v4M12 18l-3.5 2M12 14l-3.5-2" />
            </svg>
            <span className="font-semibold text-lg text-[#131811]">PeptidePortal</span>
          </Link>
          <span className="text-sm text-[#6B7280] font-medium">
            Step {step} of {TOTAL_STEPS}
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-1 bg-[#E5E7EB]">
          <div
            className="h-full bg-[#D4A574] transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            role="progressbar"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={TOTAL_STEPS}
            aria-label={`Step ${step} of ${TOTAL_STEPS}`}
          />
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-[600px] mx-auto">

          {/* Question */}
          {step < TOTAL_STEPS && (
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#131811] leading-tight mb-3">
                {STEP_QUESTIONS[step - 1]}
              </h2>
              {step === 1 && (
                <p className="text-base text-[#6B7280]">Select the option that best describes you.</p>
              )}
            </div>
          )}

          {step === TOTAL_STEPS && (
            <div className="text-center mb-8">
              <p className="text-xs font-semibold text-[#D4A574] uppercase tracking-widest mb-2">
                Assessment Complete
              </p>
              <h2 className="text-[28px] font-bold text-[#131811]">
                {STEP_QUESTIONS[step - 1]}
              </h2>
            </div>
          )}

          {/* Step Content */}
          <div className="mb-10">
            {step === 1 && <StepExperience value={answers.experience} onChange={v => update('experience', v)} />}
            {step === 2 && <StepGoals value={answers.goals} onChange={v => update('goals', v)} />}
            {step === 3 && <StepAge value={answers.age} onChange={v => update('age', v)} />}
            {step === 4 && <StepConditions value={answers.conditions} onChange={v => update('conditions', v)} />}
            {step === 5 && <StepLifestyle activity={answers.activity} sleep={answers.sleep} onActivity={v => update('activity', v)} onSleep={v => update('sleep', v)} />}
            {step === 6 && <StepPhysical weight={answers.weight} height={answers.height} onWeight={v => update('weight', v)} onHeight={v => update('height', v)} />}
            {step === 7 && <StepRecommendation answers={answers} />}
          </div>

          {/* Navigation */}
          {step < TOTAL_STEPS && (
            <div className="flex justify-between items-center">
              <button
                onClick={goBack}
                disabled={step === 1}
                className={`flex items-center gap-2 px-5 py-3 bg-transparent border-none text-sm font-semibold cursor-pointer ${
                  step === 1 ? 'text-[#D1D5DB] cursor-not-allowed' : 'text-[#6B7280] hover:text-[#131811]'
                } transition-colors`}
                aria-label="Go to previous step"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <button
                onClick={goNext}
                disabled={!proceed}
                className={`flex items-center gap-2 px-8 py-3.5 rounded-full text-[15px] font-semibold transition-colors duration-200 ${
                  proceed
                    ? 'bg-[#D4A574] text-white cursor-pointer hover:bg-[#B8864A]'
                    : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                }`}
                aria-label={step === TOTAL_STEPS - 1 ? 'See my protocol' : 'Continue to next step'}
              >
                {step === TOTAL_STEPS - 1 ? 'See My Protocol' : 'Continue'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {step === TOTAL_STEPS && (
            <div className="text-center">
              <button
                onClick={goBack}
                className="px-6 py-3 bg-transparent border border-[#E5E7EB] rounded-full text-sm font-semibold text-[#6B7280] cursor-pointer hover:bg-[#F6F8F6] transition-colors"
              >
                Edit answers
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
