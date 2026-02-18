const LOADING_STYLES = `
@keyframes dot-pulse {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
  40%            { transform: scale(1);   opacity: 1; }
}
@keyframes shimmer-bar {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
.pulse-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--teal);
  animation: dot-pulse 1.2s ease-in-out infinite;
}
.pulse-dot:nth-child(1) { animation-delay: 0ms; }
.pulse-dot:nth-child(2) { animation-delay: 150ms; }
.pulse-dot:nth-child(3) { animation-delay: 300ms; }
.shimmer-track {
  width: 180px;
  height: 2px;
  background: var(--surface-3);
  border-radius: 1px;
  overflow: hidden;
  position: relative;
}
.shimmer-track::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--teal), transparent);
  animation: shimmer-bar 1.6s ease-in-out infinite;
}
`

export default function Loading() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: 'var(--bg)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: LOADING_STYLES }} />

      {/* Three pulsing dots */}
      <div className="flex items-center gap-2.5 mb-5">
        <span className="pulse-dot" />
        <span className="pulse-dot" />
        <span className="pulse-dot" />
      </div>

      {/* Shimmer bar */}
      <div className="shimmer-track mb-6" />

      {/* Wordmark */}
      <span
        className="font-display text-sm select-none"
        style={{
          color: 'var(--text-3)',
          fontStyle: 'italic',
          fontWeight: 400,
          letterSpacing: '0.12em',
        }}
      >
        peptide<span style={{ color: 'var(--teal)', fontStyle: 'normal', fontWeight: 300 }}>portal</span>
      </span>
    </div>
  )
}
