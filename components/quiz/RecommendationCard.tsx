interface Props {
  peptideName: string
  category: string
  priceMonthly: number
  onStartConsultation: () => void
}

export default function RecommendationCard({ peptideName, category, priceMonthly, onStartConsultation }: Props) {
  return (
    <div className="border rounded-xl p-6 shadow-sm">
      <p className="text-sm uppercase tracking-wide text-gray-500">{category.replace('_', ' ')}</p>
      <h2 className="text-2xl font-semibold mt-1">{peptideName}</h2>
      <p className="text-3xl font-bold mt-4">${(priceMonthly / 100).toFixed(0)}<span className="text-base font-normal text-gray-500">/mo</span></p>
      <button
        onClick={onStartConsultation}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Start Consultation
      </button>
    </div>
  )
}
