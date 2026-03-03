import { createAdminClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, goals, experienceLevel, age, medicalHistory, activityLevel, sleepQuality, weight, height, recommendedPeptideSlug } = body

    if (!userId || userId === 'guest') {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    // Use admin client to bypass RLS
    const supabase = createAdminClient()

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    // Map goals to array
    const goalsArray = Array.isArray(goals) ? goals : []

    // Map conditions to contraindications
    const contraindications: string[] = []
    if (medicalHistory) {
      Object.entries(medicalHistory).forEach(([key, value]) => {
        if (value === true) contraindications.push(key)
      })
    }

    // Get peptide ID from slug
    let peptideId = null
    if (recommendedPeptideSlug) {
      const { data: peptide } = await supabase
        .from('peptides')
        .select('id')
        .eq('slug', recommendedPeptideSlug)
        .single()
      peptideId = peptide?.id
    }

    // Create intake submission
    const { data: submission, error } = await supabase
      .from('intake_submissions')
      .insert({
        user_id: profile.id,
        goals: goalsArray,
        experience_level: experienceLevel,
        medical_history: medicalHistory || {},
        contraindications,
        recommended_protocols: peptideId ? [peptideId] : [],
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, submissionId: submission.id })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
