'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

const ACCENT = '#D4A574'
const ACCENT_DARK = '#8B7355'
const ACCENT_LIGHT = '#F5F0E8'

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
    name: 'Tirzepatide', category: 'Weight Loss', accent: ACCENT,
    desc: 'Dual GIP/GLP-1 receptor agonist with the strongest clinical evidence for fat loss.',
    price: 299, slug: 'tirzepatide',
  },
  recovery: {
    name: 'BPC-157 + TB-500', category: 'Recovery', accent: ACCENT,
    desc: 'Synergistic blend targeting both local tissue repair and systemic healing.',
    price: 249, slug: 'bpc-157-tb-500',
  },
  longevity: {
    name: 'CJC-1295 / Ipamorelin', category: 'Longevity', accent: ACCENT,
    desc: 'Gold-standard GH secretagogue stack. Amplified GH pulse with no cortisol spike.',
    price: 169, slug: 'cjc-1295-ipamorelin',
  },
  cognitive: {
    name: 'Semax', category: 'Cognitive', accent: ACCENT,
    desc: 'BDNF upregulation and dopaminergic enhancement for sharper focus and memory.',
    price: 119, slug: 'semax',
  },
  sleep: {
    name: 'MK-677 (Ibutamoren)', category: 'Longevity', accent: ACCENT,
    desc: 'Oral GH secretagogue that extends deep sleep and elevates IGF-1.',
    price: 139, slug: 'mk-677',
  },
  hormones: {
    name: 'CJC-1295 / Ipamorelin', category: 'Hormone Optimization', accent: ACCENT,
    desc: 'Restores youthful GH pulsatility for improved body composition and vitality.',
    price: 169, slug: 'cjc-1295-ipamorelin',
  },
}

const TOTAL_STEPS = 7

/* ─── Radio Option Card ─────────────────────────────────────────── */
function RadioCard({ selected, onClick, label, sub }: { selected: boolean; onClick: () => void; label: string; sub: string }) {
  return (
    <button onClick={onClick} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px',
        background: '#fff',
        border: `2px solid ${selected ? ACCENT : '#E5E5E5'}`,
        borderRadius: '12px',
        transition: 'all 0.2s',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingRight: '16px' }}>
          <span style={{ fontSize: '16px', fontWeight: '600', color: '#1A1A1A' }}>{label}</span>
          <span style={{ fontSize: '14px', color: '#666' }}>{sub}</span>
        </div>
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: `2px solid ${selected ? ACCENT : '#E5E5E5'}`,
          background: selected ? ACCENT : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {selected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fff' }} />}
        </div>
      </div>
    </button>
  )
}

/* ─── Checkbox Option Card ──────────────────────────────────────── */
function CheckCard({ selected, onClick, label, sub }: { selected: boolean; onClick: () => void; label: string; sub: string }) {
  return (
    <button onClick={onClick} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 24px',
        background: '#fff',
        border: `2px solid ${selected ? ACCENT : '#E5E5E5'}`,
        borderRadius: '12px',
        transition: 'all 0.2s',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingRight: '16px' }}>
          <span style={{ fontSize: '16px', fontWeight: '600', color: '#1A1A1A' }}>{label}</span>
          <span style={{ fontSize: '14px', color: '#666' }}>{sub}</span>
        </div>
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '6px',
          border: `2px solid ${selected ? ACCENT : '#E5E5E5'}`,
          background: selected ? ACCENT : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {selected && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>
    </button>
  )
}

/* ─── Pill Button ───────────────────────────────────────────────── */
function Pill({ selected, onClick, children, accent = ACCENT }: { selected: boolean; onClick: () => void; children: React.ReactNode; accent?: string }) {
  return (
    <button onClick={onClick} style={{
      padding: '12px 24px',
      borderRadius: '24px',
      fontSize: '14px',
      fontWeight: '600',
      background: selected ? accent : '#fff',
      color: selected ? '#fff' : '#666',
      border: `2px solid ${selected ? accent : '#E5E5E5'}`,
      cursor: 'pointer',
      transition: 'all 0.2s',
    }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {opts.map(o => (
        <RadioCard key={o.value} selected={value === o.value} onClick={() => onChange(o.value as Experience)} label={o.label} sub={o.sub} />
      ))}
    </div>
  )
}

function StepGoals({ value, onChange }: { value: Goal[]; onChange: (v: Goal[]) => void }) {
  const opts = [
    { value: 'weight_loss', label: '⚡ Weight Loss' },
    { value: 'recovery', label: '💪 Recovery' },
    { value: 'longevity', label: '⏳ Longevity' },
    { value: 'cognitive', label: '🧠 Cognitive' },
    { value: 'sleep', label: '😴 Sleep' },
    { value: 'hormones', label: '⚗️ Hormone Optimization' },
  ]
  function toggle(v: Goal) {
    if (value.includes(v)) onChange(value.filter(g => g !== v))
    else if (value.length < 2) onChange([...value, v])
  }
  return (
    <div>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>Select up to 2</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
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
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Select all that apply</p>
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ fontSize: '15px', fontWeight: '600', color: '#1A1A1A', marginBottom: '12px' }}>Activity level</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
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
        <p style={{ fontSize: '15px', fontWeight: '600', color: '#1A1A1A', marginBottom: '12px' }}>Sleep quality</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
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
  const inputStyle = {
    padding: '14px 18px',
    fontSize: '15px',
    border: '1px solid #E5E5E5',
    borderRadius: '10px',
    outline: 'none',
    background: '#fff',
    color: '#1A1A1A',
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1A1A1A', marginBottom: '8px' }}>Weight</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input type="number" placeholder="185" value={weight} onChange={e => onWeight(e.target.value)} style={inputStyle} />
          <span style={{ fontSize: '14px', color: '#666' }}>lbs</span>
        </div>
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#1A1A1A', marginBottom: '8px' }}>Height</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input type="text" placeholder="5'10&quot;" value={height} onChange={e => onHeight(e.target.value)} style={{ ...inputStyle, width: '120px' }} />
        </div>
      </div>
      <p style={{ fontSize: '12px', color: '#999' }}>Used by your physician for dosing calculations only.</p>
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
        // Not logged in - redirect to signup
        alert('Please create an account first.')
        window.location.href = '/signup'
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
        // Demo mode - would redirect to Stripe
        alert('Intake submitted! In production, this would redirect to Stripe checkout.')
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {hasContraindications && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '12px', 
          padding: '16px', 
          background: '#FEF3C7', 
          borderRadius: '12px',
          fontSize: '14px',
          color: '#92400E'
        }}>
          <span style={{ fontSize: '18px' }}>⚠️</span>
          <span>You indicated a medical condition. Your intake will be flagged for physician review.</span>
        </div>
      )}
      
      <p style={{ fontSize: '15px', color: '#666' }}>
        Based on your profile, here {recs.length > 1 ? 'are your' : 'is your'} recommended protocol{recs.length > 1 ? 's' : ''}.
      </p>

      {recs.map((rec, i) => (
        <div key={rec.slug} style={{
          padding: '24px',
          background: '#fff',
          border: `2px solid ${i === 0 ? ACCENT : '#E5E5E5'}`,
          borderRadius: '16px',
        }}>
          {i === 0 && (
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '6px 12px', 
              background: ACCENT_LIGHT, 
              borderRadius: '20px', 
              fontSize: '12px', 
              fontWeight: '600', 
              color: ACCENT_DARK,
              marginBottom: '16px'
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: ACCENT }} />
              Top recommendation
            </div>
          )}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1A1A1A', marginBottom: '4px' }}>{rec.name}</h3>
              <p style={{ fontSize: '12px', fontWeight: '600', color: ACCENT, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>{rec.category}</p>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.6 }}>{rec.desc}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#1A1A1A' }}>${rec.price}</div>
              <div style={{ fontSize: '12px', color: '#999' }}>/month</div>
            </div>
          </div>

          {i === 0 && (
            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={() => handleCheckout(rec)}
                disabled={loadingSlug === rec.slug}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: ACCENT,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: loadingSlug === rec.slug ? 'not-allowed' : 'pointer',
                  opacity: loadingSlug === rec.slug ? 0.7 : 1,
                }}
              >
                {loadingSlug === rec.slug ? 'Processing...' : `Start Consultation — $${rec.price}/mo`}
              </button>
              <p style={{ textAlign: 'center', fontSize: '12px', color: '#999', marginTop: '12px' }}>
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
    <div style={{ minHeight: '100vh', background: '#FAFAF8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #E5E5E5', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: '700', fontSize: '14px' }}>P</span>
            </div>
            <span style={{ fontWeight: '600', fontSize: '18px', color: '#1A1A1A' }}>Peptide Portal</span>
          </Link>
          <span style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>
            Step {step} of {TOTAL_STEPS}
          </span>
        </div>
        {/* Progress bar */}
        <div style={{ width: '100%', height: '4px', background: '#E5E5E5' }}>
          <div style={{ width: `${(step / TOTAL_STEPS) * 100}%`, height: '100%', background: ACCENT, transition: 'width 0.3s' }} />
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          
          {/* Question */}
          {step < TOTAL_STEPS && (
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: '700', color: '#1A1A1A', lineHeight: 1.2, marginBottom: '12px' }}>
                {STEP_QUESTIONS[step - 1]}
              </h2>
              {step === 1 && (
                <p style={{ fontSize: '16px', color: '#666' }}>Select the option that best describes you.</p>
              )}
            </div>
          )}

          {step === TOTAL_STEPS && (
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <p style={{ fontSize: '12px', fontWeight: '600', color: ACCENT, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                Assessment Complete
              </p>
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1A1A1A' }}>
                {STEP_QUESTIONS[step - 1]}
              </h2>
            </div>
          )}

          {/* Step Content */}
          <div style={{ marginBottom: '40px' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={goBack}
                disabled={step === 1}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: 'none',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: step === 1 ? '#CCC' : '#666',
                  cursor: step === 1 ? 'not-allowed' : 'pointer',
                }}
              >
                ← Back
              </button>

              <button
                onClick={goNext}
                disabled={!proceed}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 32px',
                  background: proceed ? ACCENT : '#E5E5E5',
                  color: proceed ? '#fff' : '#999',
                  border: 'none',
                  borderRadius: '28px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: proceed ? 'pointer' : 'not-allowed',
                }}
              >
                {step === TOTAL_STEPS - 1 ? 'See My Protocol' : 'Continue'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {step === TOTAL_STEPS && (
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={goBack}
                style={{
                  padding: '12px 24px',
                  background: 'none',
                  border: '1px solid #E5E5E5',
                  borderRadius: '24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#666',
                  cursor: 'pointer',
                }}
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
