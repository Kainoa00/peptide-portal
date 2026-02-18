'use client'

import { useEffect } from 'react'

const TOAST_STYLES = `
@keyframes toast-in {
  from { transform: translateY(-16px) translateX(-50%); opacity: 0; }
  to   { transform: translateY(0)      translateX(-50%); opacity: 1; }
}
.toast-enter {
  animation: toast-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
`

const TYPE_STYLES = {
  success: {
    bg: 'rgba(45,214,168,0.1)',
    border: 'rgba(45,214,168,0.3)',
    color: 'var(--teal)',
  },
  error: {
    bg: 'rgba(232,112,112,0.1)',
    border: 'rgba(232,112,112,0.3)',
    color: 'var(--rose)',
  },
  info: {
    bg: 'rgba(212,151,90,0.1)',
    border: 'rgba(212,151,90,0.3)',
    color: 'var(--amber)',
  },
} as const

interface Props {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
}

export default function Toast({ message, type, onClose }: Props) {
  const styles = TYPE_STYLES[type]

  // Auto-dismiss after 4 seconds
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: TOAST_STYLES }} />
      <div
        role="alert"
        aria-live="assertive"
        className="toast-enter fixed top-5 left-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl text-sm shadow-lg"
        style={{
          background: styles.bg,
          border: `1px solid ${styles.border}`,
          color: styles.color,
          maxWidth: '360px',
          width: 'calc(100vw - 32px)',
          /* translateX(-50%) is handled in animation; set initial transform to keep it centered */
          transform: 'translateX(-50%)',
        }}
      >
        {/* Icon */}
        {type === 'success' && (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {type === 'error' && (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        )}
        {type === 'info' && (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="flex-shrink-0">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
          </svg>
        )}

        <span className="flex-1 leading-snug">{message}</span>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Dismiss"
          className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </>
  )
}
