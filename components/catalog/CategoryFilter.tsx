'use client'

const CATEGORIES = ['all', 'weight_loss', 'recovery', 'longevity', 'cognitive', 'other']

interface Props {
  active: string
  onChange: (cat: string) => void
}

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            active === cat ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 text-gray-600 hover:border-blue-400'
          }`}
        >
          {cat === 'all' ? 'All' : cat.replace('_', ' ')}
        </button>
      ))}
    </div>
  )
}
