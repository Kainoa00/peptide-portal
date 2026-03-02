import { PEPTIDES, type Peptide, type Category } from './peptide-data'

export type ExperienceLevel = 'beginner' | 'intermediate' | 'expert'
export type PeptideCategory = 'weight_loss' | 'recovery' | 'longevity' | 'cognitive' | 'other'

export interface QuizAnswers {
  // Step 1: Goals (multi-select)
  goals: string[]
  
  // Step 2: Experience level
  experienceLevel: ExperienceLevel
  
  // Step 3: Age
  age: number
  
  // Step 4: Medical history (conditions user has)
  medicalHistory: Record<string, boolean>
  
  // Step 5: Current medications
  currentMedications: string[]
  
  // Step 6: Lifestyle
  weight?: number
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  sleepQuality: 'poor' | 'fair' | 'good'
  stressLevel: 'low' | 'moderate' | 'high'
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTRAINDICATIONS — Hard disqualifiers (cannot use this peptide)
// ─────────────────────────────────────────────────────────────────────────────

interface ContraindicationRule {
  condition: string
  peptides: string[] // peptide slugs that are contraindicated
  severity: 'absolute' | 'relative' // absolute = must disqualify, relative = flag for review
}

const CONTRAINDICATION_RULES: ContraindicationRule[] = [
  // Cancer history - many peptides are growth factors
  { condition: 'cancer', peptides: ['cjc-1295-ipamorelin', 'tb-500', 'bpc-157', 'bpc-157-tb-500', 'epitalon', 'mk-677', 'ss-31', 'dihexa'], severity: 'absolute' },
  { condition: 'cancer_history', peptides: ['cjc-1295-ipamorelin', 'tb-500', 'bpc-157', 'bpc-157-tb-500', 'epitalon', 'mk-677', 'ss-31', 'dihexa'], severity: 'absolute' },
  
  // Diabetes - GLP-1s need monitoring
  { condition: 'diabetes', peptides: ['tirzepatide', 'semaglutide'], severity: 'absolute' },
  { condition: 'diabetes_type_1', peptides: ['tirzepatide', 'semaglutide'], severity: 'absolute' },
  { condition: 'diabetes_type_2', peptides: ['tirzepatide', 'semaglutide'], severity: 'relative' },
  
  // Thyroid - GH can affect thyroid function
  { condition: 'thyroid', peptides: ['cjc-1295-ipamorelin', 'mk-677'], severity: 'relative' },
  { condition: 'hypothyroidism', peptides: ['cjc-1295-ipamorelin', 'mk-677'], severity: 'relative' },
  { condition: 'hyperthyroidism', peptides: ['cjc-1295-ipamorelin', 'mk-677'], severity: 'relative' },
  
  // Cardiovascular
  { condition: 'heart_disease', peptides: ['tirzepatide', 'semaglutide'], severity: 'relative' },
  { condition: 'high_blood_pressure', peptides: ['tirzepatide', 'semaglutide'], severity: 'relative' },
  { condition: 'arrhythmia', peptides: ['cjc-1295-ipamorelin'], severity: 'relative' },
  
  // Pregnancy
  { condition: 'pregnant', peptides: ['*'], severity: 'absolute' },
  { condition: 'breastfeeding', peptides: ['*'], severity: 'absolute' },
  
  // Mental health
  { condition: 'bipolar', peptides: ['semax'], severity: 'relative' },
  { condition: 'schizophrenia', peptides: ['semax'], severity: 'relative' },
  
  // Kidney/Liver
  { condition: 'kidney_disease', peptides: ['tirzepatide', 'semaglutide'], severity: 'absolute' },
  { condition: 'liver_disease', peptides: ['tirzepatide', 'semaglutide'], severity: 'absolute' },
  
  // Pancreas
  { condition: 'pancreatitis', peptides: ['tirzepatide', 'semaglutide'], severity: 'absolute' },
  { condition: 'gallbladder_disease', peptides: ['tirzepatide', 'semaglutide'], severity: 'absolute' },
]

// ─────────────────────────────────────────────────────────────────────────────
// SCORING WEIGHTS — How much each factor contributes to peptide match
// ─────────────────────────────────────────────────────────────────────────────

interface ScoringWeight {
  factor: string
  weight: number // 0-100
  peptides: Record<string, number> // peptide slug -> score modifier
}

const SCORING_WEIGHTS: ScoringWeight[] = [
  // Goal alignment (highest weight - primary factor)
  {
    factor: 'goal',
    weight: 40,
    peptides: {
      // Weight loss
      'tirzepatide': 100,
      'semaglutide': 95,
      
      // Recovery
      'bpc-157': 80,
      'tb-500': 80,
      'bpc-157-tb-500': 90,
      
      // Longevity
      'cjc-1295-ipamorelin': 75,
      'epitalon': 70,
      'ss-31': 65,
      'ghk-cu': 60,
      'mk-677': 70,
      
      // Cognitive
      'semax': 85,
      'selank': 80,
      'dihexa': 75,
    },
  },
  
  // Experience level
  {
    factor: 'experience',
    weight: 15,
    peptides: {
      // Beginners - simpler protocols
      'semaglutide': 80,
      'mk-677': 75,
      'ghk-cu': 70,
      'semax': 65,
      
      // Intermediate - moderate complexity
      'tirzepatide': 70,
      'cjc-1295-ipamorelin': 70,
      'selank': 70,
      
      // Expert - more involved
      'bpc-157': 60,
      'tb-500': 60,
      'bpc-157-tb-500': 50,
      'epitalon': 60,
      'ss-31': 55,
      'dihexa': 50,
    },
  },
  
  // Age considerations
  {
    factor: 'age',
    weight: 10,
    peptides: {
      // Older adults - longevity focus
      'epitalon': 80,
      'ss-31': 75,
      'ghk-cu': 70,
      'cjc-1295-ipamorelin': 65,
      
      // Younger - recovery/cognitive
      'bpc-157': 75,
      'tb-500': 75,
      'semax': 70,
      'dihexa': 65,
    },
  },
  
  // Activity level
  {
    factor: 'activity',
    weight: 15,
    peptides: {
      // Very active/athlete - recovery focus
      'bpc-157-tb-500': 95,
      'bpc-157': 90,
      'tb-500': 90,
      'cjc-1295-ipamorelin': 80,
      
      // Moderate/Sedentary - weight loss focus
      'tirzepatide': 85,
      'semaglutide': 85,
      'mk-677': 70,
      'ghk-cu': 65,
    },
  },
  
  // Sleep quality
  {
    factor: 'sleep',
    weight: 10,
    peptides: {
      // Poor sleep - prioritize sleep-enhancing
      'mk-677': 95,
      'cjc-1295-ipamorelin': 90,
      'semax': 70,
      'selank': 75,
      
      // Good sleep - maintenance
      'epitalon': 80,
      'ss-31': 70,
    },
  },
  
  // Stress level
  {
    factor: 'stress',
    weight: 10,
    peptides: {
      // High stress - calming/cognitive
      'selank': 95,
      'semax': 80,
      'ghk-cu': 70,
      
      // Moderate - balanced
      'cjc-1295-ipamorelin': 70,
      'mk-677': 65,
    },
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// MAIN SCORING FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

export interface PeptideScore {
  peptide: Peptide
  score: number
  reasons: string[]
  contraindications: string[]
  isAbsoluteContraindicated: boolean
  isRelativeContraindicated: boolean
}

export function scorePeptides(answers: QuizAnswers): PeptideScore[] {
  const scores: PeptideScore[] = []
  
  // Get contraindications first
  const { absolute, relative } = getContraindications(answers.medicalHistory)
  
  for (const peptide of PEPTIDES) {
    if (!peptide.is_available) continue
    
    let score = 0
    const reasons: string[] = []
    const peptideContraindications: string[] = []
    
    // Check absolute contraindications
    const isAbsoluteContraindicated = absolute.some(c => 
      c.peptides.includes(peptide.slug) || c.peptides.includes('*')
    )
    
    // Check relative contraindications  
    const isRelativeContraindicated = relative.some(c =>
      c.peptides.includes(peptide.slug) || c.peptides.includes('*')
    )
    
    // Get applicable contraindications for this peptide
    for (const rule of [...absolute, ...relative]) {
      if (rule.peptides.includes(peptide.slug) || rule.peptides.includes('*')) {
        peptideContraindications.push(rule.condition)
      }
    }
    
    // If absolutely contraindicated, skip
    if (isAbsoluteContraindicated) {
      scores.push({
        peptide,
        score: 0,
        reasons: ['Contraindicated based on medical history'],
        contraindications: peptideContraindications,
        isAbsoluteContraindicated: true,
        isRelativeContraindicated: false,
      })
      continue
    }
    
    // ── Score each factor ──
    
    // 1. Goal alignment (40%)
    const goalScore = scoreGoalMatch(answers.goals, peptide.category)
    score += goalScore.score
    if (goalScore.reason) reasons.push(goalScore.reason)
    
    // 2. Experience level (15%)
    const expScore = scoreExperience(answers.experienceLevel, peptide)
    score += expScore
    if (answers.experienceLevel === 'beginner' && ['bpc-157-tb-500', 'dihexa', 'epitalon'].includes(peptide.slug)) {
      // Lower score for beginners on complex peptides
    } else if (expScore > 60) {
      reasons.push(`Appropriate for ${answers.experienceLevel} experience level`)
    }
    
    // 3. Age (10%)
    const ageScore = scoreAge(answers.age, peptide)
    score += ageScore
    
    // 4. Activity level (15%)
    const activityScore = scoreActivity(answers.activityLevel, peptide)
    score += activityScore
    if (activityScore > 60) {
      reasons.push(`Good match for ${answers.activityLevel} activity level`)
    }
    
    // 5. Sleep quality (10%)
    const sleepScore = scoreSleep(answers.sleepQuality, peptide)
    score += sleepScore
    
    // 6. Stress level (10%)
    const stressScore = scoreStress(answers.stressLevel, peptide)
    score += stressScore
    
    scores.push({
      peptide,
      score: Math.round(score),
      reasons,
      contraindications: peptideContraindications,
      isAbsoluteContraindicated: false,
      isRelativeContraindicated,
    })
  }
  
  // Sort by score descending
  return scores.sort((a, b) => b.score - a.score)
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER SCORING FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

function scoreGoalMatch(goals: string[], category: Category): { score: number; reason?: string } {
  const categoryGoals: Record<Category, string[]> = {
    weight_loss: ['weight_loss', 'fat_loss', 'metabolism'],
    recovery: ['recovery', 'healing', 'injury', 'muscle'],
    longevity: ['longevity', 'anti_aging', 'vitality', 'health'],
    cognitive: ['cognitive', 'focus', 'memory', 'mental'],
  }
  
  const matchingGoals = goals.filter(g => categoryGoals[category]?.includes(g))
  
  if (matchingGoals.length === 0) {
    return { score: 0 }
  }
  
  // More goals = higher score
  const score = Math.min(100, 40 + (matchingGoals.length - 1) * 20)
  return { 
    score, 
    reason: `Matches ${matchingGoals.join(', ')} goals` 
  }
}

function scoreExperience(level: ExperienceLevel, peptide: Peptide): number {
  const expScores: Record<ExperienceLevel, Record<string, number>> = {
    beginner: {
      // Easy protocols
      'semaglutide': 85,
      'mk-677': 80,
      'ghk-cu': 75,
      'selank': 70,
      'semax': 65,
      // Avoid complex
      'bpc-157-tb-500': 30,
      'dihexa': 35,
      'epitalon': 45,
    },
    intermediate: {
      'tirzepatide': 75,
      'cjc-1295-ipamorelin': 75,
      'semax': 75,
      'selank': 75,
      'bpc-157': 65,
      'tb-500': 65,
      'mk-677': 70,
    },
    expert: {
      // All options open
      'bpc-157-tb-500': 90,
      'dihexa': 85,
      'epitalon': 80,
      'ss-31': 75,
      'cjc-1295-ipamorelin': 75,
    },
  }
  
  return expScores[level]?.[peptide.slug] ?? 50
}

function scoreAge(age: number, peptide: Peptide): number {
  if (age < 25) {
    // Younger - recovery, cognitive
    if (['bpc-157', 'tb-500', 'bpc-157-tb-500', 'semax', 'dihexa'].includes(peptide.slug)) return 75
    if (peptide.category === 'recovery') return 70
    if (peptide.category === 'cognitive') return 70
  } else if (age < 40) {
    // Prime years - balanced
    if (peptide.category === 'weight_loss') return 70
    if (peptide.category === 'recovery') return 70
    if (peptide.category === 'cognitive') return 65
  } else if (age < 55) {
    // Mid-life - longevity, weight
    if (peptide.category === 'longevity') return 75
    if (peptide.category === 'weight_loss') return 70
    if (peptide.category === 'cognitive') return 65
  } else {
    // 55+ - longevity focus
    if (peptide.category === 'longevity') return 85
    if (peptide.category === 'weight_loss') return 65
    if (peptide.slug === 'epitalon') return 95
    if (peptide.slug === 'ss-31') return 90
  }
  
  return 50
}

function scoreActivity(activity: string, peptide: Peptide): number {
  const activityScores: Record<string, Record<string, number>> = {
    sedentary: {
      'tirzepatide': 90,
      'semaglutide': 90,
      'ghk-cu': 65,
      'mk-677': 55,
    },
    light: {
      'tirzepatide': 80,
      'semaglutide': 80,
      'mk-677': 65,
      'ghk-cu': 70,
      'semax': 60,
    },
    moderate: {
      'tirzepatide': 75,
      'semaglutide': 75,
      'cjc-1295-ipamorelin': 70,
      'mk-677': 70,
      'bpc-157': 60,
      'tb-500': 60,
    },
    active: {
      'bpc-157-tb-500': 90,
      'bpc-157': 85,
      'tb-500': 85,
      'cjc-1295-ipamorelin': 80,
      'mk-677': 70,
    },
    very_active: {
      'bpc-157-tb-500': 100,
      'bpc-157': 95,
      'tb-500': 95,
      'cjc-1295-ipamorelin': 85,
    },
  }
  
  return activityScores[activity]?.[peptide.slug] ?? 50
}

function scoreSleep(sleep: string, peptide: Peptide): number {
  const sleepScores: Record<string, Record<string, number>> = {
    poor: {
      'mk-677': 95,
      'cjc-1295-ipamorelin': 90,
      'selank': 80,
      'semax': 70,
      'epitalon': 65,
    },
    fair: {
      'mk-677': 75,
      'cjc-1295-ipamorelin': 70,
      'semax': 65,
      'selank': 65,
    },
    good: {
      // Sleep is fine, other factors matter more
      'epitalon': 70,
      'ss-31': 65,
      'ghk-cu': 60,
    },
  }
  
  return sleepScores[sleep]?.[peptide.slug] ?? 50
}

function scoreStress(stress: string, peptide: Peptide): number {
  const stressScores: Record<string, Record<string, number>> = {
    low: {
      // Low stress - maintenance mode
      'epitalon': 70,
      'ss-31': 65,
      'ghk-cu': 60,
    },
    moderate: {
      'cjc-1295-ipamorelin': 70,
      'mk-677': 65,
      'ghk-cu': 60,
    },
    high: {
      'selank': 95,
      'semax': 85,
      'ghk-cu': 70,
      'cjc-1295-ipamorelin': 60,
    },
  }
  
  return stressScores[stress]?.[peptide.slug] ?? 50
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTRAINDICATION CHECKING
// ─────────────────────────────────────────────────────────────────────────────

export function getContraindications(medicalHistory: Record<string, boolean>): {
  absolute: ContraindicationRule[]
  relative: ContraindicationRule[]
} {
  const activeConditions = Object.entries(medicalHistory)
    .filter(([, hasCondition]) => hasCondition)
    .map(([condition]) => condition)
  
  const absolute: ContraindicationRule[] = []
  const relative: ContraindicationRule[] = []
  
  for (const rule of CONTRAINDICATION_RULES) {
    if (activeConditions.includes(rule.condition)) {
      if (rule.severity === 'absolute') {
        absolute.push(rule)
      } else {
        relative.push(rule)
      }
    }
  }
  
  return { absolute, relative }
}

export function getRecommendedPeptides(answers: QuizAnswers, topN: number = 3): PeptideScore[] {
  const scored = scorePeptides(answers)
  
  // Filter out absolutely contraindicated, then return top N
  return scored
    .filter(s => !s.isAbsoluteContraindicated)
    .slice(0, topN)
}

export function getCategoryRecommendations(answers: QuizAnswers): Category[] {
  const categories: Category[] = []
  
  const goalToCategory: Record<string, Category> = {
    weight_loss: 'weight_loss',
    fat_loss: 'weight_loss',
    metabolism: 'weight_loss',
    recovery: 'recovery',
    healing: 'recovery',
    injury: 'recovery',
    muscle: 'recovery',
    longevity: 'longevity',
    anti_aging: 'longevity',
    vitality: 'longevity',
    health: 'longevity',
    cognitive: 'cognitive',
    focus: 'cognitive',
    memory: 'cognitive',
    mental: 'cognitive',
  }
  
  for (const goal of answers.goals) {
    if (goalToCategory[goal] && !categories.includes(goalToCategory[goal])) {
      categories.push(goalToCategory[goal])
    }
  }
  
  return categories.length > 0 ? categories : ['longevity']
}
