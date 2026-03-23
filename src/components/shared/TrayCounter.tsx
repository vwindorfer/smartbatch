import { useState, useEffect, useRef } from 'react'
import { Minus, Plus } from 'lucide-react'

interface TrayCounterProps {
  count: number
  onChange: (count: number) => void
  min?: number
  max?: number
  label?: string
}

export default function TrayCounter({
  count,
  onChange,
  min = 0,
  max = 20,
  label,
}: TrayCounterProps) {
  const canDecrement = count > min
  const canIncrement = count < max
  const [animKey, setAnimKey] = useState(0)
  const prevCount = useRef(count)

  useEffect(() => {
    if (count !== prevCount.current) {
      setAnimKey((k) => k + 1)
      prevCount.current = count
    }
  }, [count])

  return (
    <div className="flex items-center gap-3">
      {label && (
        <span className="text-sm font-medium text-neutral-900/70 mr-1">
          {label}
        </span>
      )}
      <button
        onClick={() => canDecrement && onChange(count - 1)}
        disabled={!canDecrement}
        className={`
          w-16 h-16 rounded-xl flex items-center justify-center
          tap-stepper transition-colors font-bold text-lg
          ${canDecrement
            ? 'bg-neutral-100 text-neutral-900 active:bg-neutral-900/10'
            : 'bg-neutral-100/50 text-neutral-900/20 cursor-not-allowed'
          }
        `}
        aria-label="Decrease tray count"
      >
        <Minus size={24} />
      </button>

      <div className="min-w-[64px] h-16 flex items-center justify-center rounded-xl bg-primary-light">
        <span key={animKey} className="text-2xl font-bold text-primary tabular-nums count-pop">
          {count}
        </span>
      </div>

      <button
        onClick={() => canIncrement && onChange(count + 1)}
        disabled={!canIncrement}
        className={`
          w-16 h-16 rounded-xl flex items-center justify-center
          tap-stepper transition-colors font-bold text-lg
          ${canIncrement
            ? 'bg-primary text-white active:bg-primary/90'
            : 'bg-neutral-100/50 text-neutral-900/20 cursor-not-allowed'
          }
        `}
        aria-label="Increase tray count"
      >
        <Plus size={24} />
      </button>
    </div>
  )
}
