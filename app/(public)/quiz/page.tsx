import type { Metadata } from 'next'
import QuizClient from './QuizClient'

export const metadata: Metadata = {
  title: 'Health Assessment | Peptide Portal',
  robots: { index: false, follow: false },
}

export default function QuizPage() {
  return <QuizClient />
}
