import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface Props {
  label: string
  value: number | null
  unit: string
  trend: number | null
  direction: 'higher_is_better' | 'lower_is_better'
}

export default function KPICard({ label, value, unit, trend, direction }: Props) {
  const isGood = trend === null ? null
    : direction === 'higher_is_better' ? trend > 0 : trend < 0

  const trendColor = isGood === null ? 'text-gray-400'
    : isGood ? 'text-emerald-400' : 'text-red-400'

  const TrendIcon = trend === null ? Minus
    : trend > 0 ? TrendingUp : TrendingDown

  const formattedValue = value === null ? '—'
    : value >= 1000 ? `${(value / 1000).toFixed(1)}k`
    : value % 1 === 0 ? value.toString()
    : value.toFixed(1)

  return (
    <div className="bg-gray-900 rounded-xl p-4 flex flex-col gap-2 border border-gray-800">
      <span className="text-gray-400 text-xs uppercase tracking-wide">{label}</span>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-white">{formattedValue}</span>
        <span className="text-gray-500 text-sm mb-0.5">{unit}</span>
      </div>
      {trend !== null && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
          <TrendIcon size={13} />
          <span>{Math.abs(trend).toFixed(1)}% vs semana anterior</span>
        </div>
      )}
    </div>
  )
}