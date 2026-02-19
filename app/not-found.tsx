import Link from 'next/link'

const NOT_FOUND_STYLES = `
@keyframes glow-pulse {
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 0.85; }
}
.glow-404 {
  animation: glow-pulse 4s ease-in-out infinite;
}
`

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: NOT_FOUND_STYLES }} />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(37,87,54,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Teal radial glow behind 404 */}
      <div
        className="glow-404 absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,87,54,0.07) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Logo */}
        <div className="mb-12">
          <Link href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#255736' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11" />
                <circle cx="12" cy="17" r="4" />
              </svg>
            </div>
            <span className="text-lg font-extrabold tracking-tight" style={{ color: '#131811' }}>
              Peptide Portal
            </span>
          </Link>
        </div>

        {/* 404 watermark */}
        <div className="relative mb-4">
          <span
            className="font-display select-none leading-none block"
            style={{
              fontSize: 'clamp(120px, 20vw, 200px)',
              fontWeight: 300,
              color: 'var(--text-3)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
            }}
          >
            404
          </span>

          {/* "Page not found." overlaid */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ paddingTop: '0.25em' }}
          >
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--text)',
                lineHeight: 1.2,
              }}
            >
              Page not found.
            </h1>
          </div>
        </div>

        {/* Subtext */}
        <p
          className="text-sm leading-relaxed mb-10 mx-auto"
          style={{ color: 'var(--text-2)', maxWidth: '340px' }}
        >
          The protocol you&apos;re looking for doesn&apos;t exist — or may have moved.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/catalog"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Catalog
          </Link>

          <Link
            href="/quiz"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all"
            style={{
              background: 'var(--teal)',
              color: '#FFFFFF',
              boxShadow: '0 0 20px rgba(37,87,54,0.2)',
            }}
          >
            Take the Quiz
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
