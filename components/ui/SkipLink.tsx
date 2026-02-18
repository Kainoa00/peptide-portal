'use client'

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        top: -40,
        left: 0,
        zIndex: 100,
        background: 'var(--teal)',
        color: '#06060F',
        padding: '8px 16px',
        fontSize: 14,
        fontWeight: 600,
        borderRadius: '0 0 8px 0',
        transition: 'top 0.2s',
      }}
      onFocus={(e) => { e.currentTarget.style.top = '0' }}
      onBlur={(e) => { e.currentTarget.style.top = '-40px' }}
    >
      Skip to content
    </a>
  )
}
