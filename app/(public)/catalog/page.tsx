import type { Metadata } from 'next'
import { Suspense } from 'react'
import CatalogClient from './CatalogClient'

export const metadata: Metadata = {
  title: 'Peptide Protocol Catalog | Peptide Portal',
  description:
    'Browse physician-reviewed peptide protocols for weight loss, recovery, longevity, and cognitive performance. Find your protocol and start a consultation today.',
}

export default function CatalogPage() {
  return (
    <Suspense>
      <CatalogClient />
    </Suspense>
  )
}
