import type { ReactNode } from 'react'

interface MetricCardProps {
  icon: ReactNode
  label: string
  value: string
  trend?: { value: string; positive: boolean }
}

export default function MetricCard({ icon, label, value, trend }: MetricCardProps) {
  return (
    <div className="bg-surface rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
      <div className="flex items-center gap-2 text-neutral-900/50">
        {icon}
        <span className="text-base font-medium">{label}</span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-neutral-900 tabular-nums">
          {value}
        </span>
        {trend && (
          <span
            className={`text-sm font-semibold mb-1 ${
              trend.positive ? 'text-success' : 'text-danger'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>
    </div>
  )
}
