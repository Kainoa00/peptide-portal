'use client'

import { useEffect, useRef, useState } from 'react'

export interface Message {
  id: string
  senderId: string
  senderName: string
  body: string
  createdAt: string
  isProvider: boolean
}

interface Props {
  messages: Message[]
  onSend: (body: string) => Promise<void>
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

function formatDateLabel(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function MessageThread({ messages, onSend }: Props) {
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    const trimmed = draft.trim()
    if (!trimmed || sending) return
    setSending(true)
    try {
      await onSend(trimmed)
      setDraft('')
    } finally {
      setSending(false)
      textareaRef.current?.focus()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Group messages to show date separators
  let lastDateLabel = ''

  return (
    <div
      className="flex flex-col"
      style={{
        height: '100%',
        minHeight: 0,
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        overflow: 'hidden',
      }}
    >
      {/* Message list */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        {messages.map((msg) => {
          const dateLabel = formatDateLabel(msg.createdAt)
          const showDate = dateLabel !== lastDateLabel
          lastDateLabel = dateLabel

          return (
            <div key={msg.id}>
              {/* Date separator */}
              {showDate && (
                <div className="flex items-center gap-3 my-4">
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  <span className="text-xs" style={{ color: 'var(--text-3)', whiteSpace: 'nowrap' }}>
                    {dateLabel}
                  </span>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>
              )}

              {/* Message bubble */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.isProvider ? 'flex-start' : 'flex-end',
                  gap: 4,
                }}
              >
                {/* Sender name */}
                <span
                  className="text-xs px-1"
                  style={{ color: 'var(--text-3)' }}
                >
                  {msg.senderName} · {formatTime(msg.createdAt)}
                </span>

                {/* Bubble */}
                <div
                  style={{
                    maxWidth: '72%',
                    padding: '10px 14px',
                    borderRadius: msg.isProvider ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'var(--text)',
                    ...(msg.isProvider
                      ? {
                          background: 'var(--surface-2)',
                          border: '1px solid var(--border)',
                        }
                      : {
                          background: 'var(--teal-dim)',
                          border: '1px solid var(--border-teal)',
                        }),
                  }}
                >
                  {msg.body}
                </div>
              </div>
            </div>
          )
        })}

        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          padding: '12px 16px',
          display: 'flex',
          gap: 10,
          alignItems: 'flex-end',
          background: 'var(--surface-2)',
        }}
      >
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message... (Enter to send)"
          rows={1}
          disabled={sending}
          style={{
            flex: 1,
            resize: 'none',
            background: 'var(--surface-3)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '9px 14px',
            fontSize: 14,
            color: 'var(--text)',
            outline: 'none',
            lineHeight: 1.5,
            transition: 'border-color 0.2s ease',
            fontFamily: 'inherit',
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--teal)' }}
          onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
        />

        <button
          onClick={handleSend}
          disabled={!draft.trim() || sending}
          style={{
            flexShrink: 0,
            width: 38,
            height: 38,
            borderRadius: 10,
            background: draft.trim() ? 'var(--teal)' : 'var(--surface-3)',
            color: draft.trim() ? '#06060F' : 'var(--text-3)',
            border: 'none',
            cursor: draft.trim() ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
            boxShadow: draft.trim() ? '0 0 12px rgba(45,214,168,0.25)' : 'none',
          }}
          aria-label="Send message"
        >
          {sending ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
