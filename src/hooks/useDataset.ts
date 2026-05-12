import { useState, useMemo } from 'react'
import rawData from '../data/metrics.json'
import type { MetricsData, DatasetKey, Day, MetricMeta } from '../types'

const data = rawData as MetricsData

export function useDataset() {
  const [activeKey, setActiveKey] = useState<DatasetKey>('A')
  const dataset = data[activeKey]

  const last7 = useMemo(() =>
    dataset.days.slice(-7), [dataset])

  const prev7 = useMemo(() =>
    dataset.days.slice(-14, -7), [dataset])

  function getTrend(key: keyof Day['metrics']) {
    const avg = (days: Day[]) => {
      const vals = days.map(d => d.metrics[key]).filter((v): v is number => v !== null)
      return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null
    }
    const current = avg(last7)
    const previous = avg(prev7)
    if (current === null || previous === null || previous === 0) return null
    return ((current - previous) / previous) * 100
  }

  function getAvg(key: keyof Day['metrics'], days: Day[] = last7) {
    const vals = days.map(d => d.metrics[key]).filter((v): v is number => v !== null)
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null
  }

  const metricsMeta: MetricMeta[] = dataset.metadata.metrics

  return {
    activeKey,
    setActiveKey,
    dataset,
    last7,
    prev7,
    getTrend,
    getAvg,
    metricsMeta,
  }
}