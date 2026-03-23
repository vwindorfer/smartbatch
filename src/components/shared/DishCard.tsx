import type { PrepStatus } from '../../types'
import ConfidenceBadge from './ConfidenceBadge'
import StatusChip from './StatusChip'
import type { ConfidenceLevel } from '../../types'

interface DishCardProps {
  name: string
  line: string
  trayCount: number
  totalTrays: number
  confidence: number
  confidenceLevel: ConfidenceLevel
  prepStatus: PrepStatus
  onTap?: () => void
}

export default function DishCard({
  name,
  line,
  trayCount,
  totalTrays,
  confidence,
  confidenceLevel,
  prepStatus,
  onTap,
}: DishCardProps) {
  return (
    <button
      onClick={onTap}
      className="w-full bg-surface rounded-2xl p-4 shadow-sm tap-feedback text-left transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-neutral-900 truncate">
            {name}
          </h3>
          <p className="text-base text-neutral-900/50 mt-0.5">{line}</p>
        </div>
        <ConfidenceBadge confidence={confidence} level={confidenceLevel} size="sm" />
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1.5">
          <span className="text-2xl font-bold text-primary tabular-nums">
            {trayCount}
          </span>
          <span className="text-base text-neutral-900/50">/ {totalTrays} Trays</span>
        </div>
        <StatusChip status={prepStatus} />
      </div>
    </button>
  )
}
