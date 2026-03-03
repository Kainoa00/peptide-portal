import { createAdminClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    
    // Get user from auth header
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch latest intake submission
    const { data: intake, error: intakeError } = await supabase
      .from('intake_submissions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (intakeError || !intake) {
      return NextResponse.json({ intake: null, peptide: null })
    }

    // Fetch recommended peptide
    let peptide = null
    if (intake.recommended_protocols && intake.recommended_protocols.length > 0) {
      const { data: peptideData } = await supabase
        .from('peptides')
        .select('*')
        .eq('id', intake.recommended_protocols[0])
        .single()
      
      peptide = peptideData
    }

    return NextResponse.json({ intake, peptide })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
