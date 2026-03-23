import type { Batch } from '../../types'
import StatusChip from '../shared/StatusChip'

interface BatchCardProps {
  batch: Batch
  onTap: () => void
}

const STATUS_BORDER: Record<string, string> = {
  done: 'border-l-success',
  'in-progress': 'border-l-accent',
  upcoming: 'border-l-neutral-900/10',
}

export default function BatchCard({ batch, onTap }: BatchCardProps) {
  return (
    <button
      onClick={onTap}
      className={`
        w-full bg-surface rounded-xl p-4 shadow-sm tap-feedback text-left min-h-[48px]
        border-l-4 ${STATUS_BORDER[batch.status]}
        transition-shadow hover:shadow-md
      `}
    >
      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-neutral-900 tabular-nums">
          Tray {batch.trayNumber}
          {!batch.isBackup && (
            <span className="text-neutral-900/40 font-normal"> / {batch.totalTrays}</span>
          )}
          {batch.isBackup && (
            <span className="text-accent font-normal text-sm ml-1">(Backup)</span>
          )}
        </span>
        <StatusChip status={batch.status} />
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm text-neutral-900/50 tabular-nums">
          {batch.startTime} – {batch.endTime}
        </span>
      </div>
    </button>
  )
}
