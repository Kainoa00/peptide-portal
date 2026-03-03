'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase'

const ACCENT = '#D4A574'
const ACCENT_DARK = '#8B7355'
const ACCENT_LIGHT = '#F5F0E8'

/* ─── Icons ─────────────────────────────────────────────────────── */
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
  { href: '/dashboard', label: 'My Protocol', Icon: IconProtocol },
  { href: '/dashboard/messages', label: 'Messages', Icon: IconMessages },
  { href: '/dashboard/subscription', label: 'Subscription', Icon: IconSubscription },
  { href: '/dashboard/history', label: 'History', Icon: IconHistory },
]

function SidebarLink({ href, label, Icon, isActive }: { href: string; label: string; Icon: () => React.JSX.Element; isActive: boolean }) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '12px',
        fontSize: '14px',
        textDecoration: 'none',
        color: isActive ? '#1A1A1A' : '#666',
        background: isActive ? ACCENT_LIGHT : 'transparent',
        fontWeight: isActive ? 600 : 500,
        transition: 'all 0.2s',
      }}
    >
      <span style={{ color: isActive ? ACCENT : '#666' }}>
        <Icon />
      </span>
      {label}
    </Link>
  )
}

function TabLink({ href, label, Icon, isActive }: { href: string; label: string; Icon: () => React.JSX.Element; isActive: boolean }) {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        padding: '8px 12px',
        fontSize: '12px',
        textDecoration: 'none',
        color: isActive ? ACCENT : '#666',
      }}
    >
      <Icon />
      <span>{label}</span>
    </Link>
  )
}

function SignOutButton() {
  const [loading, setLoading] = useState(false)

  async function handleSignOut() {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      style={{
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 500,
        color: '#666',
        background: 'transparent',
        border: '1px solid #E5E5E5',
        borderRadius: '8px',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1,
      }}
    >
      {loading ? 'Signing out...' : 'Sign out'}
    </button>
  )
}

function UserName() {
  const [name, setName] = useState('User')

  useEffect(() => {
    if (!isSupabaseConfigured) return
    async function fetchName() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user?.user_metadata?.full_name) {
        setName(user.user_metadata.full_name)
      } else if (user?.email) {
        setName(user.email.split('@')[0])
      }
    }
    fetchName()
  }, [])

  return (
    <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}>{name}</span>
  )
}

/* ─── Layout ─────────────────────────────────────────────────────── */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = useState('/dashboard')

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FAFAF8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: '64px',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E5E5E5',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '14px' }}>P</span>
          </div>
          <span style={{ fontSize: '20px', fontWeight: 600, color: '#1A1A1A' }}>Peptide Portal</span>
        </Link>
        <SignOutButton />
      </header>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Sidebar (desktop) */}
        <aside style={{
          display: 'none',
          flexDirection: 'column',
          width: '240px',
          padding: '24px 12px',
          borderRight: '1px solid #E5E5E5',
          background: '#fff',
        }} className="md:flex">
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {NAV_ITEMS.map(({ href, label, Icon }) => (
              <SidebarLink key={href} href={href} label={label} Icon={Icon} isActive={currentPath === href || (href !== '/dashboard' && currentPath.startsWith(href))} />
            ))}
          </nav>

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #E5E5E5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.6">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <UserName />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }} className="md:p-10">
          {children}
        </main>
      </div>

      {/* Bottom tabs (mobile) */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '8px 0',
        borderTop: '1px solid #E5E5E5',
        background: '#fff',
      }} className="md:hidden">
        {NAV_ITEMS.map(({ href, label, Icon }) => (
          <TabLink key={href} href={href} label={label} Icon={Icon} isActive={currentPath === href || (href !== '/dashboard' && currentPath.startsWith(href))} />
        ))}
      </nav>
    </div>
  )
}
