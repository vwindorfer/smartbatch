import { useState, useCallback } from 'react'
import { Minus, Plus, Check } from 'lucide-react'
import { DISHES } from '../../data/dishes'
import { useStore } from '../../store/useStore'
import type { WasteReason } from '../../types'

const REASON_OPTIONS: Array<{ value: WasteReason; label: string }> = [
  { value: 'overproduction', label: 'Overproduction' },
  { value: 'spoiled', label: 'Spoiled' },
  { value: 'plate-waste', label: 'Plate Waste' },
  { value: 'other', label: 'Other' },
]

const PRESET_KG = [1, 2, 5]

interface WasteLogFormProps {
  onSaved: () => void
}

export default function WasteLogForm({ onSaved }: WasteLogFormProps) {
  const [selectedDish, setSelectedDish] = useState<string | null>(null)
  const [kg, setKg] = useState(1)
  const [reason, setReason] = useState<WasteReason | null>(null)
  const [flash, setFlash] = useState(false)
  const addWasteEntry = useStore((s) => s.addWasteEntry)

  const canSave = selectedDish !== null && kg > 0 && reason !== null

  const adjustKg = useCallback((delta: number) => {
    setKg((prev) => Math.max(0.5, Math.round((prev + delta) * 10) / 10))
  }, [])

  function handleSave() {
    if (!canSave) return
    addWasteEntry(selectedDish, kg, reason)
    setSelectedDish(null)
    setKg(1)
    setReason(null)
    setFlash(true)
    setTimeout(() => setFlash(false), 400)
    onSaved()
  }

  return (
    <div className={`bg-surface rounded-2xl shadow-sm p-4 space-y-5 ${flash ? 'form-flash' : ''}`}>
      <h2 className="text-base font-bold text-neutral-900">
        Log Waste
      </h2>

      {/* Step 1: Select dish */}
      <div>
        <label className="block text-sm font-medium text-neutral-900/60 mb-2">
          Select dish
        </label>
        <div className="grid grid-cols-2 gap-2">
          {DISHES.map((dish) => (
            <button
              key={dish.id}
              onClick={() => setSelectedDish(dish.id)}
              className={`
                p-3 rounded-xl text-left tap-feedback transition-colors min-h-[52px]
                ${selectedDish === dish.id
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-900/5'
                }
              `}
            >
              <span className="text-sm font-semibold block truncate">
                {dish.name}
              </span>
              <span className={`text-sm ${selectedDish === dish.id ? 'text-white/70' : 'text-neutral-900/40'}`}>
                {dish.line}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Enter weight */}
      <div>
        <label className="block text-sm font-medium text-neutral-900/60 mb-2">
          Amount (kg)
        </label>
        <div className="flex items-center gap-3">
          {/* Presets */}
          <div className="flex gap-2">
            {PRESET_KG.map((preset) => (
              <button
                key={preset}
                onClick={() => setKg(preset)}
                className={`
                  w-14 h-14 rounded-xl text-sm font-bold tap-feedback transition-colors
                  ${kg === preset
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-900/5'
                  }
                `}
              >
                {preset} kg
              </button>
            ))}
          </div>

          {/* Custom stepper */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => adjustKg(-0.5)}
              disabled={kg <= 0.5}
              className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center tap-feedback disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Minus size={20} />
            </button>
            <div className="w-16 h-14 flex items-center justify-center rounded-xl bg-primary-light">
              <span className="text-xl font-bold text-primary tabular-nums">
                {kg}
              </span>
            </div>
            <button
              onClick={() => adjustKg(0.5)}
              className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center tap-feedback"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Step 3: Select reason */}
      <div>
        <label className="block text-sm font-medium text-neutral-900/60 mb-2">
          Reason
        </label>
        <div className="grid grid-cols-2 gap-2">
          {REASON_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setReason(opt.value)}
              className={`
                p-3 rounded-xl text-sm font-semibold tap-feedback transition-colors min-h-[52px]
                ${reason === opt.value
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-900/5'
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step 4: Save */}
      <button
        onClick={handleSave}
        disabled={!canSave}
        className={`
          w-full h-14 rounded-xl text-base font-semibold tap-feedback transition-colors
          flex items-center justify-center gap-2
          ${canSave
            ? 'bg-success text-white hover:bg-success/90'
            : 'bg-neutral-100 text-neutral-900/30 cursor-not-allowed'
          }
        `}
      >
        <Check size={20} />
        Save
      </button>
    </div>
  )
}
