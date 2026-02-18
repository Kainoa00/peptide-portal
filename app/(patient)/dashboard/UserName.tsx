'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function UserName() {
  const [displayName, setDisplayName] = useState<string>('My Account')

  useEffect(() => {
    async function fetchUser() {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const fullName = user.user_metadata?.full_name as string | undefined
        if (fullName) {
          setDisplayName(fullName)
        } else if (user.email) {
          setDisplayName(user.email)
        }
      } catch {
        // No session or Supabase not configured — keep default
      }
    }
    fetchUser()
  }, [])

  return (
    <span
      className="text-xs truncate max-w-[160px]"
      style={{ color: 'var(--text-2)' }}
      title={displayName}
    >
      {displayName}
    </span>
  )
}
