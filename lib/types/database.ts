export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: 'patient' | 'provider' | 'admin'
  stripe_customer_id: string | null
  created_at: string
}

export interface Prescription {
  id: string
  patient_id: string
  provider_id: string | null
  peptide_id: string
  status: 'pending' | 'approved' | 'active' | 'paused' | 'cancelled'
  dosage: string | null
  frequency: string | null
  notes: string | null
  approved_at: string | null
  created_at: string
}

export interface IntakeSubmission {
  id: string
  patient_id: string
  goals: string[]
  experience_level: string
  age: string
  weight: string
  height: string
  medical_history: Record<string, boolean>
  current_medications: string
  recommended_peptide_id: string | null
  status: 'pending' | 'reviewed' | 'approved' | 'denied'
  submitted_at: string
}

export interface Message {
  id: string
  patient_id: string
  provider_id: string | null
  sender_id: string
  body: string
  is_provider: boolean
  created_at: string
}

export interface OrderStatus {
  id: string
  prescription_id: string
  patient_id: string
  status: 'processing' | 'compounding' | 'shipped' | 'delivered'
  tracking_number: string | null
  updated_at: string
}

export interface Subscription {
  id: string
  patient_id: string
  stripe_subscription_id: string
  stripe_customer_id: string
  price_id: string
  status: 'active' | 'cancelled' | 'past_due' | 'trialing'
  current_period_end: string
  created_at: string
}
