import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, intakeId, prescriptionId, dosage, frequency, notes } = body

    const supabase = createClient()

    // Check auth
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check provider role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'provider') {
      return NextResponse.json({ error: 'Provider access required' }, { status: 403 })
    }

    if (action === 'approve') {
      // Get intake to get patient and peptide info
      const { data: intake } = await supabase
        .from('intake_submissions')
        .select('*, profiles:user_id(*)')
        .eq('id', intakeId)
        .single()

      if (!intake) {
        return NextResponse.json({ error: 'Intake not found' }, { status: 404 })
      }

      // Create prescription
      const { data: prescription, error } = await supabase
        .from('prescriptions')
        .insert({
          patient_id: intake.user_id,
          provider_id: user.id,
          peptide_id: intake.recommended_protocols?.[0] || null,
          intake_submission_id: intakeId,
          dosage: dosage || 'Standard',
          frequency: frequency || 'As directed',
          notes: notes || '',
          status: 'approved',
          approved_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
      }

      // Update intake status
      await supabase
        .from('intake_submissions')
        .update({ status: 'reviewed' })
        .eq('id', intakeId)

      // Create initial order status
      await supabase
        .from('order_status')
        .insert({
          prescription_id: prescription.id,
          status: 'processing',
        })

      return NextResponse.json({ success: true, prescription })
    }

    if (action === 'deny') {
      await supabase
        .from('intake_submissions')
        .update({ status: 'reviewed' })
        .eq('id', intakeId)

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
