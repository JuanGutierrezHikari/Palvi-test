interface FunnelStep {
  label: string
  value: number
  color: string
}

interface Props {
  steps: FunnelStep[]
}

export default function FunnelChart({ steps }: Props) {
  // Escala logarítmica para que pasos pequeños sean visibles
  const logVal = (v: number) => Math.log10(Math.max(v, 1))
  const maxLog = logVal(steps[0]?.value || 1)

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h2 className="text-sm uppercase tracking-wide text-gray-400 mb-4">
        Embudo de conversión — últimos 7 días
      </h2>
      <div className="flex flex-col gap-3">
        {steps.map((step, i) => {
          const pct = Math.max((logVal(step.value) / maxLog) * 100, 8)
          const convRate = i > 0 && steps[i - 1].value > 0
            ? ((step.value / steps[i - 1].value) * 100).toFixed(1)
            : null

          return (
            <div key={step.label}>
              {convRate && (
                <div className="text-xs text-gray-500 ml-36 mb-1">
                  ↓ {convRate}% conversión
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="w-32 text-xs text-gray-300 text-right shrink-0">
                  {step.label}
                </div>
                <div className="flex-1 bg-gray-800 rounded-full h-8 overflow-hidden">
                  <div
                    className={`h-full rounded-full flex items-center px-3 ${step.color}`}
                    style={{ width: `${pct}%`, transition: 'width 0.5s ease' }}
                  >
                    <span className="text-xs font-semibold text-white whitespace-nowrap">
                      {step.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}