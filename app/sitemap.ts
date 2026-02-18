import type { MetadataRoute } from 'next'
import { PEPTIDES } from '@/lib/peptide-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://peptideportal.com'

  const peptideUrls = PEPTIDES.map((p) => ({
    url: `${base}/catalog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/catalog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/quiz`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ...peptideUrls,
  ]
}
