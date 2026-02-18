'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export function useProviderQueue() {
  const [pending, setPending] = useState<any[]>([])
  const [flagged, setFlagged] = useState<any[]>([])
  const [active, setActive] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function load() {
      const [pendingRes, activeRes] = await Promise.all([
        supabase
          .from('intake_submissions')
          .select('*, profiles(full_name, state)')
          .eq('status', 'pending')
          .order('created_at', { ascending: true }),
        supabase
          .from('prescriptions')
          .select('*, profiles(full_name), peptides(name), order_status(*)')
          .eq('status', 'active'),
      ])

      const allPending = pendingRes.data ?? []
      setPending(allPending.filter((s) => !s.contraindications?.length))
      setFlagged(allPending.filter((s) => s.contraindications?.length > 0))
      setActive(activeRes.data ?? [])
      setLoading(false)
    }

    load()
  }, [])

  return { pending, flagged, active, loading }
}
