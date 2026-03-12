import { createAdminClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/crm/leads — fetch all leads ordered by tier, then created_at
export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await (supabase as any)
      .from('crm_leads')
      .select('*')
      .order('tier', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch (err) {
    console.error('CRM GET error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/crm/leads — create a new lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      clinic_name, contact_name, title, phone, email, city,
      tier, status, services_offered, why_good_fit, objections,
      website_url, source, deal_value, next_followup_at,
    } = body

    if (!clinic_name?.trim()) {
      return NextResponse.json({ error: 'clinic_name is required' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data, error } = await (supabase as any)
      .from('crm_leads')
      .insert({
        clinic_name: clinic_name.trim(),
        contact_name: contact_name || null,
        title: title || null,
        phone: phone || null,
        email: email || null,
        city: city || null,
        tier: tier ?? 1,
        status: status ?? 'new',
        services_offered: services_offered ?? [],
        why_good_fit: why_good_fit || null,
        objections: objections || null,
        website_url: website_url || null,
        source: source ?? 'google',
        deal_value: deal_value ?? 19900,
        next_followup_at: next_followup_at || null,
        notes: [],
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data })
  } catch (err) {
    console.error('CRM POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
