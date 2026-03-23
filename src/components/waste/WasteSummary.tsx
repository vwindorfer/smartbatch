import { useRef } from 'react'
import { Trash2, X, Scale, Euro, Cloud } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { getDishById } from '../../data/dishes'
import MetricCard from '../shared/MetricCard'
import EmptyState from '../shared/EmptyState'

const COST_PER_KG = 3.5
const CO2_PER_KG = 1.5

const REASON_LABELS: Record<string, string> = {
  overproduction: 'Overproduction',
  spoiled: 'Spoiled',
  'plate-waste': 'Plate Waste',
  other: 'Other',
}

export default function WasteSummary() {
  const wasteEntries = useStore((s) => s.wasteEntries)
  const removeWasteEntry = useStore((s) => s.removeWasteEntry)
  const currentDate = useStore((s) => s.currentDate)

  const todayEntries = wasteEntries.filter((e) => e.date === currentDate)
  const totalKg = todayEntries.reduce((sum, e) => sum + e.kg, 0)
  const totalCost = totalKg * COST_PER_KG
  const totalCo2 = totalKg * CO2_PER_KG

  if (todayEntries.length === 0) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <MetricCard icon={<Scale size={16} />} label="Today (kg)" value="0.0" />
          <MetricCard icon={<Euro size={16} />} label="Cost" value="€0" />
          <MetricCard icon={<Cloud size={16} />} label="CO₂" value="0.0 kg" />
        </div>
        <EmptyState
          icon={<Trash2 size={40} />}
          title="No entries yet"
          description="Log your first waste entry above."
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Summary metrics */}
      <div className="grid grid-cols-3 gap-3">
        <MetricCard
          icon={<Scale size={16} />}
          label="Today (kg)"
          value={`${totalKg.toFixed(1)}`}
        />
        <MetricCard
          icon={<Euro size={16} />}
          label="Cost"
          value={`€${totalCost.toFixed(0)}`}
        />
        <MetricCard
          icon={<Cloud size={16} />}
          label="CO₂"
          value={`${totalCo2.toFixed(1)} kg`}
        />
      </div>

      {/* Entry list */}
      {todayEntries.length > 0 && (
        <div className="bg-surface rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-100">
            <h3 className="text-base font-bold text-neutral-900">
              Today's Entries ({todayEntries.length})
            </h3>
          </div>
          <div className="divide-y divide-neutral-100">
            {todayEntries.map((entry) => (
              <SwipeableEntry
                key={entry.id}
                dishName={getDishById(entry.dishId)?.name ?? entry.dishId}
                kg={entry.kg}
                reason={REASON_LABELS[entry.reason] ?? entry.reason}
                time={formatTime(entry.timestamp)}
                onDelete={() => removeWasteEntry(entry.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SwipeableEntry({
  dishName,
  kg,
  reason,
  time,
  onDelete,
}: {
  dishName: string
  kg: number
  reason: string
  time: string
  onDelete: () => void
}) {
  const startX = useRef(0)
  const currentX = useRef(0)
  const rowRef = useRef<HTMLDivElement>(null)
  const swiping = useRef(false)

  function handleTouchStart(e: React.TouchEvent) {
    startX.current = e.touches[0].clientX
    swiping.current = true
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!swiping.current || !rowRef.current) return
    const dx = e.touches[0].clientX - startX.current
    currentX.current = dx
    if (dx < 0) {
      rowRef.current.style.transform = `translateX(${Math.max(dx, -100)}px)`
    }
  }

  function handleTouchEnd() {
    if (!rowRef.current) return
    swiping.current = false
    if (currentX.current < -60) {
      rowRef.current.style.transform = 'translateX(-100px)'
    } else {
      rowRef.current.style.transform = 'translateX(0)'
    }
    currentX.current = 0
  }

  return (
    <div className="relative overflow-hidden">
      {/* Delete background */}
      <div className="absolute inset-y-0 right-0 w-[100px] bg-danger flex items-center justify-center">
        <button
          onClick={onDelete}
          className="w-full h-full flex items-center justify-center tap-feedback"
          aria-label="Delete entry"
        >
          <Trash2 size={20} className="text-white" />
        </button>
      </div>

      {/* Swipeable row */}
      <div
        ref={rowRef}
        className="relative bg-surface px-4 py-3 transition-transform duration-150 ease-out"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <span className="text-base font-semibold text-neutral-900 truncate block">
              {dishName}
            </span>
            <span className="text-sm text-neutral-900/40">
              {reason} · {time}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-base font-bold text-danger tabular-nums">
              {kg} kg
            </span>
            {/* Delete button for non-touch devices */}
            <button
              onClick={onDelete}
              className="w-12 h-12 rounded-lg flex items-center justify-center tap-feedback text-neutral-900/20 hover:text-danger hover:bg-danger/5 sm:flex hidden"
              aria-label="Delete entry"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatTime(timestamp: string): string {
  const date = new Date(timestamp)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}
