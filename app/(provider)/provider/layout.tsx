import Link from 'next/link'
import ProviderSignOutButton from './SignOutButton'

/* ── SVG icons ───────────────────────────────────────────────────── */
function IconInbox() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
    </svg>
  )
}

function IconBox() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
}

const NAV_ITEMS = [
  { href: '/provider/dashboard', label: 'Review Queue',     Icon: IconInbox },
  { href: '/provider/orders',    label: 'Order Management', Icon: IconBox },
]

/* ── Sidebar nav link ────────────────────────────────────────────── */
function SidebarLink({
  href,
  label,
  Icon,
}: {
  href: string
  label: string
  Icon: () => React.JSX.Element
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all relative"
      style={{ color: 'var(--text-2)' }}
    >
      <span
        className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'var(--amber)' }}
        aria-hidden
      />
      <span
        className="transition-colors"
        style={{ color: 'inherit' }}
      >
        <Icon />
      </span>
      <span className="transition-colors group-hover:text-[color:var(--text)]">{label}</span>
    </Link>
  )
}

/* ── Bottom tab link ─────────────────────────────────────────────── */
function TabLink({
  href,
  label,
  Icon,
}: {
  href: string
  label: string
  Icon: () => React.JSX.Element
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1 py-2 px-3 text-xs transition-colors"
      style={{ color: 'var(--text-2)' }}
    >
      <Icon />
      <span>{label}</span>
    </Link>
  )
}

/* ── Layout ──────────────────────────────────────────────────────── */
export default function ProviderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>

      {/* ── Navbar ──────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 h-16"
        style={{
          background: 'rgba(246,248,246,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(212,151,90,0.15)',
        }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-display text-xl"
            style={{ color: 'var(--text)', fontStyle: 'italic', fontWeight: 400 }}
          >
            peptide
            <span style={{ color: 'var(--amber)', fontStyle: 'normal', fontWeight: 300 }}>
              portal
            </span>
          </Link>

          {/* Provider badge */}
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full tracking-wide"
            style={{
              background: 'rgba(212,151,90,0.12)',
              border: '1px solid rgba(212,151,90,0.25)',
              color: 'var(--amber)',
            }}
          >
            Provider Portal
          </span>
        </div>

        <ProviderSignOutButton />
      </header>

      {/* ── Body (sidebar + content) ─────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar (desktop only) ───────────────────────────────── */}
        <aside
          className="hidden md:flex flex-col py-6 px-3 shrink-0"
          style={{
            width: 240,
            borderRight: '1px solid rgba(212,151,90,0.1)',
            background: 'var(--surface)',
          }}
        >
          <p
            className="px-4 mb-4 text-xs font-medium uppercase tracking-widest"
            style={{ color: 'var(--text-3)' }}
          >
            Navigation
          </p>

          <nav className="space-y-1">
            {NAV_ITEMS.map(({ href, label, Icon }) => (
              <SidebarLink key={href} href={href} label={label} Icon={Icon} />
            ))}
          </nav>
        </aside>

        {/* ── Main content ─────────────────────────────────────────── */}
        <main
          className="flex-1 overflow-y-auto p-6 md:p-10"
          style={{ background: 'var(--bg)' }}
        >
          {children}
        </main>
      </div>

      {/* ── Bottom tab bar (mobile only) ─────────────────────────────── */}
      <nav
        className="md:hidden flex items-center justify-around"
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid rgba(212,151,90,0.15)',
        }}
      >
        {NAV_ITEMS.map(({ href, label, Icon }) => (
          <TabLink key={href} href={href} label={label} Icon={Icon} />
        ))}
      </nav>
    </div>
  )
}
