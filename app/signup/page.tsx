import type { Metadata } from 'next'
import SignupClient from './SignupClient'

export const metadata: Metadata = {
  title: 'Create Account | Peptide Portal',
  robots: { index: false, follow: false },
}

export default function SignupPage() {
  return <SignupClient />
}
