'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

export function usePatientData(userId: string) {
  const [prescription, setPrescription] = useState<any>(null)
  const [orderStatus, setOrderStatus] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function load() {
      const [prescriptionRes, subscriptionRes] = await Promise.all([
        supabase
          .from('prescriptions')
          .select('*, peptides(*), order_status(*)')
          .eq('patient_id', userId)
          .eq('status', 'active')
          .maybeSingle(),
        supabase
          .from('subscriptions')
          .select('*')
          .eq('patient_id', userId)
          .maybeSingle(),
      ])

      setPrescription(prescriptionRes.data)
      setOrderStatus(prescriptionRes.data?.order_status ?? null)
      setSubscription(subscriptionRes.data)
      setLoading(false)
    }

    load()
  }, [userId])

  return { prescription, orderStatus, messages, subscription, loading }
}
