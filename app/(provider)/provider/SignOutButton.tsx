'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function ProviderSignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm px-4 py-2 rounded-full transition-colors"
      style={{
        border: '1px solid rgba(212,151,90,0.25)',
        color: 'var(--amber)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(212,151,90,0.08)'
        e.currentTarget.style.borderColor = 'rgba(212,151,90,0.45)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.borderColor = 'rgba(212,151,90,0.25)'
      }}
    >
      Sign Out
    </button>
  )
}
