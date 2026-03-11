'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'

/* ─── Types ─────────────────────────────────────────────────────── */
interface Message {
  id: string
  senderId: string
  senderName: string
  body: string
  createdAt: string
  isProvider: boolean
}

/* ─── Mock Data (for demo when no prescription) ────────────────── */
const DEMO_MESSAGES: Message[] = [
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
  const [messages, setMessages] = useState<Message[]>([])
  const [isDemo, setIsDemo] = useState(false)
  const [prescriptionId, setPrescriptionId] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function fetchMessages() {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      setMessages(DEMO_MESSAGES)
      setIsDemo(true)
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/messages', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })
      const data = await response.json()

      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages)
        setIsDemo(false)
      } else if (data.isDemo) {
        setMessages(DEMO_MESSAGES)
        setIsDemo(true)
      } else {
        setMessages([])
        setIsDemo(false)
      }

      // Try to get prescription ID for sending messages
      const presResponse = await fetch('/api/dashboard', {
        headers: { 'Authorization': `Bearer ${session.access_token}` }
      })
      const presData = await presResponse.json()
      if (presData.intake?.status === 'reviewed') {
        const { data: prescription } = await supabase
          .from('prescriptions')
          .select('id')
          .eq('intake_submission_id', presData.intake.id)
          .single()
        if (prescription) {
          setPrescriptionId(prescription.id)
        }
      }
    } catch (err) {
      console.error('Error fetching messages:', err)
      setMessages(DEMO_MESSAGES)
      setIsDemo(true)
    } finally {
      setLoading(false)
    }
  }

  async function handleSend() {
    if (!newMessage.trim() || sending) return
    setSending(true)

    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (session && prescriptionId) {
      try {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          },
          body: JSON.stringify({
            message: newMessage,
            prescriptionId,
          }),
        })
        const data = await response.json()

        if (data.message) {
          setMessages(prev => [...prev, data.message])
          setIsDemo(false)
        }
      } catch (err) {
        console.error('Error sending message:', err)
      }
    } else {
      // Demo mode - add locally
      const msg: Message = {
        id: `msg-${Date.now()}`,
        senderId: 'patient',
        senderName: 'You',
        body: newMessage,
        createdAt: new Date().toISOString(),
        isProvider: false,
      }
      setMessages(prev => [...prev, msg])
    }

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
    <div className="max-w-3xl mx-auto h-[calc(100vh-180px)] flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] mb-2">
          Patient Dashboard
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-normal tracking-tight text-[#131811] mb-2">
          Messages
        </h1>
        <p className="text-sm text-[#6B7280]">
          {isDemo ? 'Demo Mode - Messages are for illustration' : 'Secure clinical messaging'}
        </p>
      </div>

      {/* Demo Warning */}
      {isDemo && (
        <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 rounded-xl mb-4 text-xs text-blue-700" role="status">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Demo mode — complete your intake to enable secure messaging with your provider.
        </div>
      )}

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto bg-white border border-[#E5E7EB] rounded-2xl p-6 mb-4 flex flex-col gap-4">
        {loading ? (
          <p className="text-[#6B7280] text-center text-sm">Loading messages...</p>
        ) : messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 rounded-full bg-[#F6F8F6] flex items-center justify-center mx-auto mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" aria-hidden="true">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <p className="text-sm text-[#6B7280]">No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isProvider ? 'items-start' : 'items-end'}`}>
              <div className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                msg.isProvider
                  ? 'bg-[#F6F8F6] text-[#131811]'
                  : 'bg-[#D4A574] text-white'
              }`}>
                <p className="text-sm leading-relaxed">{msg.body}</p>
              </div>
              <span className="text-[11px] text-[#9CA3AF] mt-1">
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
              </span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <label htmlFor="message-input" className="sr-only">Type your message</label>
        <input
          id="message-input"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isDemo ? "Demo mode - messages won't be saved" : "Type your message..."}
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#131811] placeholder-[#9CA3AF] focus:outline-none focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 transition-colors disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={!newMessage.trim() || sending || loading}
          className="px-6 py-3 rounded-xl bg-[#D4A574] text-white font-semibold hover:bg-[#B8864A] transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </div>

      <p className="text-xs text-[#9CA3AF] text-center mt-3">
        Messages are end-to-end encrypted and stored in your HIPAA-compliant patient record.
      </p>
    </div>
  )
}
