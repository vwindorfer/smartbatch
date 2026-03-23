import type { ConfidenceLevel } from '../../types'

interface ConfidenceBadgeProps {
  confidence: number
  level: ConfidenceLevel
  size?: 'sm' | 'md'
}

const LEVEL_STYLES: Record<ConfidenceLevel, string> = {
  high: 'bg-confidence-high/10 text-confidence-high',
  medium: 'bg-confidence-medium/10 text-confidence-medium',
  low: 'bg-confidence-low/10 text-confidence-low',
}

export default function ConfidenceBadge({
  confidence,
  level,
  size = 'md',
}: ConfidenceBadgeProps) {
  const sizeClasses = size === 'sm' ? 'text-sm px-2.5 py-0.5' : 'text-base px-3 py-1'

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-semibold tabular-nums
        ${LEVEL_STYLES[level]}
        ${sizeClasses}
      `}
    >
      {confidence}%
    </span>
  )
}
