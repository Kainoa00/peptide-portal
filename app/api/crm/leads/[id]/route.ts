import { createAdminClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// PATCH /api/crm/leads/[id] — update a lead
// Supports `add_note: { date, content, type }` to append to notes array
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { add_note, ...fields } = body

    const supabase = createAdminClient()

    if (add_note) {
      // Append note to existing notes array
      const { data: current, error: fetchErr } = await (supabase as any)
        .from('crm_leads')
        .select('notes')
        .eq('id', id)
        .single()

      if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 500 })

      const existing = Array.isArray(current?.notes) ? current.notes : []
      const { data, error } = await (supabase as any)
        .from('crm_leads')
        .update({ notes: [...existing, add_note] })
        .eq('id', id)
        .select()
        .single()

      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ data })
    }

    // Regular field update
    const { data, error } = await (supabase as any)
      .from('crm_leads')
      .update(fields)
      .eq('id', id)
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch (err) {
    console.error('CRM PATCH error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/crm/leads/[id] — remove a lead
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createAdminClient()
    const { error } = await (supabase as any)
      .from('crm_leads')
      .delete()
      .eq('id', id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('CRM DELETE error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
