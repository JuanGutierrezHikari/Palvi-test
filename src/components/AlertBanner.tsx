import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react'

interface Alert {
  message: string
  type: 'warning' | 'danger' | 'good'
}

interface Props {
  alerts: Alert[]
}

export default function AlertBanner({ alerts }: Props) {
  if (alerts.length === 0) return null

  const styles = {
    danger: 'bg-red-950 border-red-700 text-red-300',
    warning: 'bg-yellow-950 border-yellow-700 text-yellow-300',
    good: 'bg-emerald-950 border-emerald-700 text-emerald-300',
  }

  const icons = {
    danger: <AlertTriangle size={15} />,
    warning: <TrendingDown size={15} />,
    good: <TrendingUp size={15} />,
  }

  return (
    <div className="flex flex-col gap-2 mb-6">
      {alerts.map((alert, i) => (
        <div
          key={i}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium ${styles[alert.type]}`}
        >
          {icons[alert.type]}
          {alert.message}
        </div>
      ))}
    </div>
  )
}