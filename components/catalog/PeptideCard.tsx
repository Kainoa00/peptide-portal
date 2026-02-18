import Link from 'next/link'

interface Props {
  peptide: {
    slug: string
    name: string
    category: string
    description: string
    price_monthly: number
  }
}

export default function PeptideCard({ peptide }: Props) {
  return (
    <Link href={`/catalog/${peptide.slug}`} className="block border rounded-xl p-5 hover:shadow-md transition-shadow">
      <span className="text-xs uppercase tracking-wide text-gray-500">{peptide.category.replace('_', ' ')}</span>
      <h3 className="text-lg font-semibold mt-1">{peptide.name}</h3>
      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{peptide.description}</p>
      <p className="mt-4 font-bold">${(peptide.price_monthly / 100).toFixed(0)}<span className="text-sm font-normal text-gray-500">/mo</span></p>
    </Link>
  )
}
