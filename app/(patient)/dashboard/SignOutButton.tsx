'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function SignOutButton() {
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
        border: '1px solid var(--border-hover)',
        color: 'var(--text-2)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--text)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--text-2)'
        e.currentTarget.style.borderColor = 'var(--border-hover)'
      }}
    >
      Sign Out
    </button>
  )
}
