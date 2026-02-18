'use client'

import { useState, useEffect } from 'react'
import MessageThread, { type Message } from '@/components/dashboard/MessageThread'
import { createClient, isSupabaseConfigured } from '@/lib/supabase'

/* ─── Mock Data ──────────────────────────────────────────────────── */
const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    senderId: 'provider',
    senderName: 'Dr. Sarah Chen',
    body: 'Your intake has been reviewed and your prescription is approved. Please inject 5 nights per week before sleep for best results.',
    createdAt: '2026-01-15T14:22:00Z',
    isProvider: true,
  },
  {
    id: '2',
    senderId: 'patient',
    senderName: 'You',
    body: 'Thank you! Should I refrigerate the vials?',
    createdAt: '2026-01-15T15:10:00Z',
    isProvider: false,
  },
  {
    id: '3',
    senderId: 'provider',
    senderName: 'Dr. Sarah Chen',
    body: 'Yes — store at 4°C (standard refrigerator temp). Reconstituted vials last 30 days refrigerated. Let me know if you have any other questions.',
    createdAt: '2026-01-15T15:45:00Z',
    isProvider: true,
  },
]

/* ─── Page ───────────────────────────────────────────────────────── */
export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)

  /* ── Real-time Supabase subscription (soft enhancement) ── */
  useEffect(() => {
    if (!isSupabaseConfigured) return // no-op if Supabase not set up

    const supabase = createClient()
    let userId: string | null = null

    async function setup() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      userId = user.id

      // Load existing messages from DB
      const { data: rows } = await supabase
        .from('messages')
        .select('*')
        .eq('patient_id', userId)
        .order('created_at', { ascending: true })

      if (rows && rows.length > 0) {
        setMessages(
          rows.map((row) => ({
            id: row.id as string,
            senderId: row.sender_id as string,
            senderName: (row.is_provider ? 'Dr. Sarah Chen' : 'You') as string,
            body: row.body as string,
            createdAt: row.created_at as string,
            isProvider: row.is_provider as boolean,
          }))
        )
      }

      // Subscribe to new messages for this patient
      supabase
        .channel(`messages:patient:${userId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `patient_id=eq.${userId}`,
          },
          (payload) => {
            const row = payload.new as {
              id: string
              sender_id: string
              body: string
              created_at: string
              is_provider: boolean
            }
            setMessages((prev) => [
              ...prev,
              {
                id: row.id,
                senderId: row.sender_id,
                senderName: row.is_provider ? 'Dr. Sarah Chen' : 'You',
                body: row.body,
                createdAt: row.created_at,
                isProvider: row.is_provider,
              },
            ])
          }
        )
        .subscribe()
    }

    setup()

    return () => {
      if (userId) {
        supabase.channel(`messages:patient:${userId}`).unsubscribe()
      }
    }
  }, [])

  async function handleSend(body: string) {
    if (isSupabaseConfigured) {
      // Write to Supabase — the real-time subscription will update local state
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('messages').insert({
          patient_id: user.id,
          sender_id: user.id,
          body,
          is_provider: false,
        })
        return
      }
    }

    // Fallback: local state only (mock mode)
    await new Promise((resolve) => setTimeout(resolve, 200))
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'patient',
      senderName: 'You',
      body,
      createdAt: new Date().toISOString(),
      isProvider: false,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  return (
    <main
      style={{
        background: 'var(--bg)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '48px 24px 32px',
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: '0 auto',
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4 mb-8 anim-fade-up flex-wrap">
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: 'var(--text-3)' }}
            >
              Patient Dashboard
            </p>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(32px, 4vw, 46px)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.1,
                marginBottom: 6,
              }}
            >
              Messages
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-2)' }}>
              Dr. Sarah Chen, MD
            </p>
          </div>

          {/* Provider info + online badge */}
          <div
            className="flex items-center gap-3"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r)',
              padding: '10px 16px',
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'var(--teal-dim)',
                border: '1px solid var(--border-teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--teal)',
                letterSpacing: '0.02em',
                flexShrink: 0,
              }}
            >
              SC
            </div>

            <div>
              <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                Dr. Sarah Chen
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#4ade80',
                    display: 'inline-block',
                    boxShadow: '0 0 6px rgba(74,222,128,0.6)',
                  }}
                />
                <span className="text-xs" style={{ color: '#4ade80' }}>
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer strip */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl mb-5 anim-fade-up d-100"
          style={{
            background: 'var(--amber-dim)',
            border: '1px solid rgba(212,151,90,0.2)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--amber)', flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span className="text-xs" style={{ color: 'var(--amber)' }}>
            Secure clinical messaging — responses typically within 24 hours on business days.
          </span>
        </div>

        {/* ── Thread ── */}
        <div
          className="anim-fade-up d-200"
          style={{ flex: 1, minHeight: 480 }}
        >
          <MessageThread messages={messages} onSend={handleSend} />
        </div>

        {/* Footer note */}
        <p className="text-xs text-center mt-5" style={{ color: 'var(--text-3)' }}>
          Messages are end-to-end encrypted and stored in your HIPAA-compliant patient record.
        </p>
      </div>
    </main>
  )
}
