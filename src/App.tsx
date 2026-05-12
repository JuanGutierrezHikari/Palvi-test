import { useDataset } from './hooks/useDataset'
import { useAlerts } from './hooks/useAlerts'
import DatasetSelector from './components/DatasetSelector'
import KPICard from './components/KPICard'
import FunnelChart from './components/FunnelChart'
import AlertBanner from './components/AlertBanner'
import TrendChart from './components/TrendChart'

const KPI_KEYS = [
  'leads_created',
  'deals_won',
  'avg_response_time_min',
  'stale_deals',
  'support_tickets_opened',
  'support_avg_resolution_hours',
] as const

export default function App() {
  const { activeKey, setActiveKey, dataset, last7, prev7, getTrend, getAvg, metricsMeta } = useDataset()
  const alerts = useAlerts(last7, prev7)

  const getMeta = (key: string) => metricsMeta.find(m => m.key === key)!

  const sum = (key: keyof typeof last7[0]['metrics']) =>
    last7.reduce((acc, d) => {
      const v = d.metrics[key]
      return acc + (v ?? 0)
    }, 0)

  const funnelSteps = [
    { label: 'Tráfico', value: sum('traffic'), color: 'bg-blue-600' },
    { label: 'Leads', value: sum('leads_created'), color: 'bg-indigo-500' },
    { label: 'Calificados', value: sum('leads_qualified'), color: 'bg-violet-500' },
    { label: 'Deals', value: sum('deals_created'), color: 'bg-purple-500' },
    { label: 'Ganados', value: sum('deals_won'), color: 'bg-emerald-500' },
  ]

  // Últimos 30 días para los gráficos
  const last30 = dataset.days.slice(-30)

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">Reporte Ejecutivo</h1>
          <p className="text-gray-400 text-sm">Últimos 7 días</p>
        </div>
        <DatasetSelector active={activeKey} onChange={setActiveKey} />
      </div>

      {/* Alertas */}
      <AlertBanner alerts={alerts} />

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {KPI_KEYS.map((key) => {
          const meta = getMeta(key)
          return (
            <KPICard
              key={key}
              label={meta.label}
              value={getAvg(key)}
              unit={meta.unit}
              trend={getTrend(key)}
              direction={meta.direction}
            />
          )
        })}
      </div>

      {/* Funnel */}
      <div className="mb-6">
        <FunnelChart steps={funnelSteps} />
      </div>

      {/* Tendencias */}
      <h2 className="text-sm uppercase tracking-wide text-gray-400 mb-3">Tendencias — últimos 30 días</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TrendChart days={last30} metricKey="leads_created" label="Leads creados" color="#6366f1" />
        <TrendChart days={last30} metricKey="deals_won" label="Deals ganados" color="#10b981" />
        <TrendChart days={last30} metricKey="avg_response_time_min" label="Tiempo de respuesta (min)" color="#f59e0b" />
        <TrendChart days={last30} metricKey="support_tickets_opened" label="Tickets de soporte" color="#ef4444" />
      </div>

    </div>
  )
}