import type { BatchStatus, PrepStatus, RedirectStatus } from '../../types'

type ChipStatus = BatchStatus | PrepStatus | RedirectStatus

interface StatusChipProps {
  status: ChipStatus
  size?: 'sm' | 'md'
}

const STATUS_CONFIG: Record<ChipStatus, { label: string; classes: string }> = {
  'done': { label: 'Done', classes: 'bg-success/10 text-success' },
  'in-progress': { label: 'In Progress', classes: 'bg-accent/10 text-accent' },
  'upcoming': { label: 'Upcoming', classes: 'bg-neutral-900/5 text-neutral-900/50' },
  'not-started': { label: 'Not Started', classes: 'bg-neutral-900/5 text-neutral-900/50' },
  'in-prep': { label: 'In Prep', classes: 'bg-accent/10 text-accent' },
  'ready': { label: 'Ready', classes: 'bg-success/10 text-success' },
  'available': { label: 'Available', classes: 'bg-success/10 text-success' },
  'claimed': { label: 'Claimed', classes: 'bg-accent/10 text-accent' },
  'expired': { label: 'Expired', classes: 'bg-danger/10 text-danger' },
}

export default function StatusChip({ status, size = 'sm' }: StatusChipProps) {
  const config = STATUS_CONFIG[status]
  const sizeClasses = size === 'sm' ? 'text-sm px-2.5 py-0.5' : 'text-base px-3 py-1'

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-semibold whitespace-nowrap
        ${config.classes}
        ${sizeClasses}
      `}
    >
      {config.label}
    </span>
  )
}
