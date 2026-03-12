import { createAdminClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json()

    const supabase = createAdminClient()

    // Create user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // skip email confirmation
      user_metadata: { full_name: fullName },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // Wait briefly for the auth trigger to create the profile row, then update role
    await new Promise(r => setTimeout(r, 500))

    const { error: profileError } = await supabase
      .from('profiles')
      .update({ role: 'provider', full_name: fullName })
      .eq('id', authData.user.id)

    if (profileError) {
      console.error('Profile update error:', profileError)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Provider signup error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
