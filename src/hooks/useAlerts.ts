import type { Day } from '../types'

export function useAlerts(last7: Day[], prev7: Day[]) {
  const alerts = []

  const avg = (days: Day[], key: keyof Day['metrics']) => {
    const vals = days.map(d => d.metrics[key]).filter((v): v is number => v !== null)
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null
  }

  const sum = (days: Day[], key: keyof Day['metrics']) =>
    days.reduce((acc, d) => {
      const v = d.metrics[key]
      return acc + (v ?? 0)
    }, 0)

  const pctChange = (curr: number | null, prev: number | null) => {
    if (curr === null || prev === null || prev === 0) return null
    return ((curr - prev) / prev) * 100
  }

  // Bajo timeresponse
  const responseNow = avg(last7, 'avg_response_time_min')
  const responsePrev = avg(prev7, 'avg_response_time_min')
  const responseDelta = pctChange(responseNow, responsePrev)
  if (responseNow !== null && responseNow > 60) {
    alerts.push({ message: `Tiempo de respuesta crítico: ${responseNow.toFixed(0)} min promedio esta semana`, type: 'danger' as const })
  } else if (responseDelta !== null && responseDelta > 20) {
    alerts.push({ message: `Tiempo de respuesta subió ${responseDelta.toFixed(0)}% vs semana anterior`, type: 'warning' as const })
  }

  // bajo winratio
  const wonNow = sum(last7, 'deals_won')
  const lostNow = sum(last7, 'deals_lost')
  const totalNow = wonNow + lostNow
  if (totalNow > 0) {
    const winRate = (wonNow / totalNow) * 100
    if (winRate < 30) {
      alerts.push({ message: `Win rate bajo: ${winRate.toFixed(0)}% esta semana (${wonNow} ganados / ${totalNow} cerrados)`, type: 'danger' as const })
    }
  }

  // Stale deals alza
  const staleNow = avg(last7, 'stale_deals')
  const stalePrev = avg(prev7, 'stale_deals')
  const staleDelta = pctChange(staleNow, stalePrev)
  if (staleDelta !== null && staleDelta > 15) {
    alerts.push({ message: `Deals estancados aumentaron ${staleDelta.toFixed(0)}% vs semana anterior`, type: 'warning' as const })
  }

  // Leads en decadencia
  const leadsNow = sum(last7, 'leads_created')
  const leadsPrev = sum(prev7, 'leads_created')
  const leadsDelta = pctChange(leadsNow, leadsPrev)
  if (leadsDelta !== null && leadsDelta < -20) {
    alerts.push({ message: `Leads cayeron ${Math.abs(leadsDelta).toFixed(0)}% vs semana anterior`, type: 'warning' as const })
  }

  if (alerts.length === 0) {
    alerts.push({ message: 'Todas las métricas clave dentro de rango normal', type: 'good' as const })
  }

  return alerts
}