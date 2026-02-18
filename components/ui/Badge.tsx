interface Props {
  children: React.ReactNode
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray'
}

const COLOR_CLASSES = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  red: 'bg-red-100 text-red-700',
  gray: 'bg-gray-100 text-gray-600',
}

export default function Badge({ children, color = 'gray' }: Props) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${COLOR_CLASSES[color]}`}>
      {children}
    </span>
  )
}
