import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { Day } from '../types'

interface Props {
  days: Day[]
  metricKey: keyof Day['metrics']
  label: string
  color?: string
}

export default function TrendChart({ days, metricKey, label, color = '#6366f1' }: Props) {
  const data = days.map(d => ({
    date: d.date.slice(5),
    value: d.metrics[metricKey] ?? null,
  }))

  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
      <h3 className="text-xs uppercase tracking-wide text-gray-400 mb-4">{label}</h3>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#6b7280' }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis hide />
          <Tooltip
            contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: '#9ca3af' }}
            itemStyle={{ color: '#fff' }}
          />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}