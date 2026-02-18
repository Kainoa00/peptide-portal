export type ExperienceLevel = 'beginner' | 'intermediate' | 'expert'
export type PeptideCategory = 'weight_loss' | 'recovery' | 'longevity' | 'cognitive' | 'other'

export interface QuizAnswers {
  goals: string[]
  experienceLevel: ExperienceLevel
  medicalHistory: Record<string, boolean>
  currentMedications: string[]
  weight: number
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  sleepQuality: 'poor' | 'fair' | 'good'
  stressLevel: 'low' | 'moderate' | 'high'
}

// Hard contraindications — quiz flags these for provider review
export const CONTRAINDICATION_FLAGS: Record<string, string[]> = {
  cancer: ['BPC-157', 'CJC-1295', 'TB-500'],
  diabetes: ['Tirzepatide'],
  pregnancy: ['all'],
  thyroid_disorder: ['CJC-1295', 'Ipamorelin'],
}

export function scoreProtocols(answers: QuizAnswers): PeptideCategory[] {
  const categories: PeptideCategory[] = []

  if (answers.goals.includes('weight_loss') || answers.goals.includes('fat_loss')) {
    categories.push('weight_loss')
  }
  if (answers.goals.includes('recovery') || answers.goals.includes('injury')) {
    categories.push('recovery')
  }
  if (answers.goals.includes('longevity') || answers.goals.includes('anti_aging')) {
    categories.push('longevity')
  }
  if (answers.goals.includes('focus') || answers.goals.includes('cognitive')) {
    categories.push('cognitive')
  }

  return categories.length > 0 ? categories : ['longevity']
}

export function getContraindications(medicalHistory: Record<string, boolean>): string[] {
  return Object.entries(medicalHistory)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .filter((condition) => condition in CONTRAINDICATION_FLAGS)
}
