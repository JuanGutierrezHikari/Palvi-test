import type { DatasetKey } from '../types'

interface Props {
  active: DatasetKey
  onChange: (key: DatasetKey) => void
}

const DATASETS: DatasetKey[] = ['A', 'B', 'C', 'D']

export default function DatasetSelector({ active, onChange }: Props) {
  return (
    <div className="flex gap-2">
      {DATASETS.map((key) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
            active === key
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Dataset {key}
        </button>
      ))}
    </div>
  )
}