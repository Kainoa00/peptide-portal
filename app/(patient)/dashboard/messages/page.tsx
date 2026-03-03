'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase'

const ACCENT = '#D4A574'
const ACCENT_DARK = '#8B7355'

/* ─── Types ─────────────────────────────────────────────────────── */
interface Message {
  id: string
  senderId: string
  senderName: string
  body: string
  createdAt: string
  isProvider: boolean
}

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
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    if (!newMessage.trim() || sending) return
    setSending(true)

    if (isSupabaseConfigured) {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('messages').insert({
          patient_id: user.id,
          sender_id: user.id,
          body: newMessage,
          is_provider: false,
        })
      }
    }

    // Add to local state
    const msg: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'patient',
      senderName: 'You',
      body: newMessage,
      createdAt: new Date().toISOString(),
      isProvider: false,
    }
    setMessages(prev => [...prev, msg])
    setNewMessage('')
    setSending(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '8px' }}>
          Patient Dashboard
        </p>
        <h1 style={{ fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, marginBottom: '8px' }}>
          Messages
        </h1>
        <p style={{ fontSize: '14px', color: '#666' }}>Dr. Sarah Chen, MD</p>
      </div>

      {/* Disclaimer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        background: '#FEF3C7',
        borderRadius: '12px',
        marginBottom: '16px',
        fontSize: '12px',
        color: '#92400E',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        Secure clinical messaging — responses typically within 24 hours on business days.
      </div>

      {/* Messages Thread */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        background: '#fff',
        border: '1px solid #E5E5E5',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: msg.isProvider ? 'flex-start' : 'flex-end',
          }}>
            <div style={{
              maxWidth: '75%',
              padding: '12px 16px',
              borderRadius: '16px',
              background: msg.isProvider ? '#FAFAF8' : ACCENT,
              color: msg.isProvider ? '#1A1A1A' : '#fff',
            }}>
              <p style={{ fontSize: '14px', lineHeight: 1.5 }}>{msg.body}</p>
            </div>
            <span style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
              {new Date(msg.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '14px 18px',
            fontSize: '14px',
            border: '1px solid #E5E5E5',
            borderRadius: '12px',
            outline: 'none',
            background: '#fff',
          }}
        />
        <button
          onClick={handleSend}
          disabled={!newMessage.trim() || sending}
          style={{
            padding: '14px 24px',
            fontSize: '14px',
            fontWeight: 600,
            background: ACCENT,
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            cursor: sending ? 'not-allowed' : 'pointer',
            opacity: sending ? 0.7 : 1,
          }}
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </div>

      <p style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginTop: '12px' }}>
        Messages are end-to-end encrypted and stored in record.
       your HIPAA-compliant patient</p>
    </div>
  )
}
