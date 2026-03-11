import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
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

    // Check user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    // Get user's prescription to find messages
    const { data: prescriptions } = await supabase
      .from('prescriptions')
      .select('id')
      .eq('patient_id', user.id)
      .in('status', ['approved', 'active'])

    if (!prescriptions || prescriptions.length === 0) {
      // No prescription yet - return mock messages for demo
      return NextResponse.json({ 
        messages: [],
        isDemo: true 
      })
    }

    const prescriptionIds = prescriptions.map(p => p.id)

    // Fetch messages for user's prescriptions
    const { data: messages, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:profiles(full_name, role)
      `)
      .in('prescription_id', prescriptionIds)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching messages:', error)
      return NextResponse.json({ messages: [], error: error.message })
    }

    // Format messages
    const formattedMessages = messages?.map(m => ({
      id: m.id,
      senderId: m.sender_id,
      senderName: m.sender?.full_name || (m.sender?.role === 'provider' ? 'Provider' : 'Patient'),
      body: m.body,
      createdAt: m.created_at,
      isProvider: m.sender?.role === 'provider',
    })) || []

    return NextResponse.json({ messages: formattedMessages })
  } catch (error) {
    console.error('Messages API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, prescriptionId } = body

    if (!message || !prescriptionId) {
      return NextResponse.json({ error: 'Message and prescriptionId required' }, { status: 400 })
    }

    const supabase = createClient()
    
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

    // Insert message
    const { data: newMessage, error } = await supabase
      .from('messages')
      .insert({
        prescription_id: prescriptionId,
        sender_id: user.id,
        body: message,
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving message:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Get sender info
    const { data: sender } = await supabase
      .from('profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .single()

    return NextResponse.json({ 
      success: true, 
      message: {
        id: newMessage.id,
        senderId: user.id,
        senderName: sender?.full_name || 'You',
        body: newMessage.body,
        createdAt: newMessage.created_at,
        isProvider: sender?.role === 'provider',
      }
    })
  } catch (error) {
    console.error('Messages POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
