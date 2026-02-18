import PeptideCard from './PeptideCard'

interface Peptide {
  id: string
  name: string
  slug: string
  category: string
  description: string
  price_monthly: number
  image_url: string | null
}

interface Props {
  peptides: Peptide[]
}

export default function PeptideGrid({ peptides }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {peptides.map((p) => (
        <PeptideCard key={p.id} peptide={p} />
      ))}
    </div>
  )
}
