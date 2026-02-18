import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import SkipLink from '@/components/ui/SkipLink'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://peptideportal.com'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: 'Peptide Portal — Precision Protocols. Prescribed by Physicians.',
  description:
    'Evidence-based peptide protocols — weight loss, recovery, longevity, and cognitive performance — reviewed by board-certified physicians and delivered to your door.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    siteName: 'Peptide Portal',
    title: 'Peptide Portal — Precision Protocols. Prescribed by Physicians.',
    description:
      'Evidence-based peptide protocols — weight loss, recovery, longevity, and cognitive performance — reviewed by board-certified physicians and delivered to your door.',
    url: APP_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peptide Portal — Precision Protocols. Prescribed by Physicians.',
    description:
      'Evidence-based peptide protocols — weight loss, recovery, longevity, and cognitive performance — reviewed by board-certified physicians and delivered to your door.',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Peptide Portal',
  description:
    'Physician-prescribed peptide protocols for longevity, recovery, weight loss, and cognitive performance',
  url: 'https://peptideportal.com',
  medicalSpecialty: 'Preventive Medicine',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <SkipLink />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  )
}
