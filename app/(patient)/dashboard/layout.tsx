'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase'

/* ─── Icons ─────────────────────────────────────────────────────── */
function IconProtocol() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="11" width="18" height="4" rx="2" />
      <path d="M9 11V7a3 3 0 016 0v4" />
      <path d="M9 15v2a3 3 0 006 0v-2" />
    </svg>
  )
}

function IconMessages() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}

function IconSubscription() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <path d="M1 10h22" />
    </svg>
  )
}

function IconHistory() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
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
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-200 cursor-pointer no-underline ${
        isActive
          ? 'bg-[#F5F0E8] text-[#B8864A] font-semibold'
          : 'text-[#6B7280] hover:bg-[#F6F8F6] hover:text-[#131811]'
      }`}
    >
      <span className={isActive ? 'text-[#D4A574]' : 'text-[#6B7280]'}>
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
      className={`flex flex-col items-center gap-1 py-2 px-3 text-xs no-underline cursor-pointer transition-colors duration-200 ${
        isActive ? 'text-[#D4A574]' : 'text-[#6B7280]'
      }`}
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
      className="px-4 py-2 text-sm font-medium text-red-600 bg-transparent border border-red-200 rounded-xl hover:bg-red-50 transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      aria-label="Sign out of your account"
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
    <span className="text-sm font-medium text-[#131811]">{name}</span>
  )
}

/* ─── Layout ─────────────────────────────────────────────────────── */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = useState('/dashboard')

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8F6]">

      {/* Navbar */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 h-16 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]">
        <Link href="/" className="flex items-center gap-2.5 no-underline cursor-pointer">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#131811" strokeWidth="1.5" aria-hidden="true">
            <path d="M16 2L28 9v14l-12 7L4 23V9l12-7z" />
            <circle cx="16" cy="16" r="4" />
            <path d="M16 12v-4M20 14l3.5-2M20 18l3.5 2M16 20v4M12 18l-3.5 2M12 14l-3.5-2" />
          </svg>
          <span className="text-lg font-semibold text-[#131811]">PeptidePortal</span>
        </Link>
        <SignOutButton />
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex flex-col w-60 p-4 border-r border-[#E5E7EB] bg-white">
          <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">
            Main
          </p>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ href, label, Icon }) => (
              <SidebarLink key={href} href={href} label={label} Icon={Icon} isActive={currentPath === href || (href !== '/dashboard' && currentPath.startsWith(href))} />
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-2 px-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.6" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              <UserName />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main id="main-content" className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#F6F8F6]">
          {children}
        </main>
      </div>

      {/* Bottom tabs (mobile) */}
      <nav className="md:hidden flex items-center justify-around py-2 border-t border-[#E5E7EB] bg-white" aria-label="Mobile navigation">
        {NAV_ITEMS.map(({ href, label, Icon }) => (
          <TabLink key={href} href={href} label={label} Icon={Icon} isActive={currentPath === href || (href !== '/dashboard' && currentPath.startsWith(href))} />
        ))}
      </nav>
    </div>
  )
}
