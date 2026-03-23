import { useState } from 'react'
import { X } from 'lucide-react'
import TrayCounter from '../shared/TrayCounter'
import { getDishById } from '../../data/dishes'
import { useStore } from '../../store/useStore'

interface LiveAdjustmentProps {
  dishId: string
  currentTrays: number
  maxTrays: number
  onClose: () => void
}

const ADJUSTMENT_REASONS = [
  'Sold out faster',
  'Event cancelled',
  'Weather change',
  'Higher demand than expected',
  'Other',
] as const

export default function LiveAdjustment({
  dishId,
  currentTrays,
  maxTrays,
  onClose,
}: LiveAdjustmentProps) {
  const [newCount, setNewCount] = useState(currentTrays)
  const [reason, setReason] = useState('')
  const adjustTrays = useStore((s) => s.adjustTrays)
  const dish = getDishById(dishId)

  const hasChanged = newCount !== currentTrays
  const canSave = hasChanged && reason !== ''

  function handleSave() {
    if (!canSave) return
    adjustTrays(dishId, newCount, reason)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-neutral-900/40" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-surface rounded-3xl p-6 pb-8 animate-slide-up my-auto">
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-neutral-900/10 mx-auto mb-4" />

        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">
              Adjustment
            </h3>
            <p className="text-sm text-neutral-900/50 mt-0.5">
              {dish?.name ?? dishId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-xl tap-feedback text-neutral-900/40 -mr-2 -mt-1"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        {/* Tray counter */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <span className="text-sm font-medium text-neutral-900/50">
            Trays (current: {currentTrays})
          </span>
          <TrayCounter
            count={newCount}
            onChange={setNewCount}
            min={1}
            max={maxTrays}
          />
          {hasChanged && (
            <span className="text-sm font-semibold text-primary">
              {newCount > currentTrays ? '+' : ''}
              {newCount - currentTrays} Trays
            </span>
          )}
        </div>

        {/* Reason selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-900/70 mb-2">
            Reason for adjustment
          </label>
          <div className="flex flex-wrap gap-3">
            {ADJUSTMENT_REASONS.map((r) => (
              <button
                key={r}
                onClick={() => setReason(r)}
                className={`
                  px-4 py-2.5 rounded-xl text-base font-medium tap-feedback transition-colors
                  min-h-[48px]
                  ${reason === r
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-900/70 hover:bg-neutral-900/5'
                  }
                `}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={!canSave}
          className={`
            w-full h-14 rounded-xl text-base font-semibold tap-feedback transition-colors
            ${canSave
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-neutral-100 text-neutral-900/30 cursor-not-allowed'
            }
          `}
        >
          Save adjustment
        </button>
      </div>
    </div>
  )
}
