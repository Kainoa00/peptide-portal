import Link from 'next/link'
import SignOutButton from './SignOutButton'
import UserName from './UserName'

/* ── SVG icons ───────────────────────────────────────────────────── */
function IconProtocol() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="11" width="18" height="4" rx="2" />
      <path d="M9 11V7a3 3 0 016 0v4" />
      <path d="M9 15v2a3 3 0 006 0v-2" />
    </svg>
  )
}

function IconMessages() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}

function IconSubscription() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <path d="M1 10h22" />
    </svg>
  )
}

function IconHistory() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}

const NAV_ITEMS = [
  { href: '/dashboard',              label: 'My Protocol',   Icon: IconProtocol },
  { href: '/dashboard/messages',     label: 'Messages',      Icon: IconMessages },
  { href: '/dashboard/subscription', label: 'Subscription',  Icon: IconSubscription },
  { href: '/dashboard/history',      label: 'History',       Icon: IconHistory },
]

/* ── Sidebar nav link (server-renderable, uses CSS :hover) ────────── */
function SidebarLink({ href, label, Icon }: { href: string; label: string; Icon: () => React.JSX.Element }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all relative"
      style={{
        color: 'var(--text-2)',
      }}
    >
      {/* Left accent bar (shown via CSS in globals — we use a hover pseudo class below) */}
      <span
        className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'var(--teal)' }}
        aria-hidden
      />
      <span
        className="transition-colors group-hover:text-[color:var(--teal)]"
        style={{ color: 'inherit' }}
      >
        <Icon />
      </span>
      <span className="transition-colors group-hover:text-[color:var(--text)]">{label}</span>
    </Link>
  )
}

/* ── Bottom tab link ────────────────────────────────────────────────── */
function TabLink({ href, label, Icon }: { href: string; label: string; Icon: () => React.JSX.Element }) {
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
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>

      {/* ── Navbar ──────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 flex items-center justify-between px-6 h-16"
        style={{
          background: 'rgba(246,248,246,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <Link
          href="/"
          className="font-display text-xl"
          style={{ color: 'var(--text)', fontStyle: 'italic', fontWeight: 400 }}
        >
          peptide
          <span style={{ color: 'var(--teal)', fontStyle: 'normal', fontWeight: 300 }}>
            portal
          </span>
        </Link>

        <SignOutButton />
      </header>

      {/* ── Body (sidebar + content) ─────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar (desktop only) ───────────────────────────────── */}
        <aside
          className="hidden md:flex flex-col py-6 px-3 shrink-0"
          style={{
            width: 240,
            borderRight: '1px solid var(--border)',
            background: 'var(--surface)',
          }}
        >
          <nav className="space-y-1">
            {NAV_ITEMS.map(({ href, label, Icon }) => (
              <SidebarLink key={href} href={href} label={label} Icon={Icon} />
            ))}
          </nav>

          {/* ── User identity (bottom of sidebar) ──────────────────── */}
          <div
            className="mt-auto px-4 pt-4"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                style={{ color: 'var(--text-3)', flexShrink: 0 }}
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <UserName />
            </div>
          </div>
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
          borderTop: '1px solid var(--border)',
        }}
      >
        {NAV_ITEMS.map(({ href, label, Icon }) => (
          <TabLink key={href} href={href} label={label} Icon={Icon} />
        ))}
      </nav>
    </div>
  )
}
