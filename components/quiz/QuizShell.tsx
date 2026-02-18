'use client'

import { useState } from 'react'
import { QuizAnswers } from '@/lib/quiz-logic'

const TOTAL_STEPS = 8

export default function QuizShell() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({})

  function next() { setStep((s) => Math.min(s + 1, TOTAL_STEPS)) }
  function back() { setStep((s) => Math.max(s - 1, 1)) }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Step content rendered here */}
      <p className="text-sm text-gray-500">Step {step} of {TOTAL_STEPS}</p>

      <div className="flex gap-4 mt-8">
        {step > 1 && (
          <button onClick={back} className="px-4 py-2 border rounded">Back</button>
        )}
        <button onClick={next} className="px-4 py-2 bg-blue-600 text-white rounded">
          {step === TOTAL_STEPS ? 'See My Protocol' : 'Continue'}
        </button>
      </div>
    </div>
  )
}
