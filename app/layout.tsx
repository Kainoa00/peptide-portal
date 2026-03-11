import type { Metadata } from 'next'
import { Playfair_Display, Manrope } from 'next/font/google'
import './globals.css'
import SkipLink from '@/components/ui/SkipLink'

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const manrope = Manrope({
  variable: '--font-body',
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
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`} data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
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
