import { useRef, useEffect } from 'react'
import { getDishById } from '../../data/dishes'

interface DishPhase {
  label: string
  start: number // minutes from 07:00
  end: number
  type: 'prep' | 'cook' | 'hold'
}

interface DishTimeline {
  dishId: string
  phases: DishPhase[]
}

const TIMELINE_START = 7 * 60 // 07:00 in minutes
const TIMELINE_END = 14 * 60 // 14:00 in minutes
const PX_PER_MINUTE = 2.2
const TIMELINE_WIDTH = (TIMELINE_END - TIMELINE_START) * PX_PER_MINUTE
const ROW_HEIGHT = 40
const ROW_GAP = 6
const HEADER_HEIGHT = 32
const CURRENT_TIME = 9 * 60 + 45 // 09:45 for demo

const DISH_TIMELINES: DishTimeline[] = [
  {
    dishId: 'schweinebraten',
    phases: [
      { label: 'Prep', start: 0, end: 90, type: 'prep' },
      { label: 'Cook', start: 90, end: 210, type: 'cook' },
      { label: 'Hold', start: 210, end: 420, type: 'hold' },
    ],
  },
  {
    dishId: 'haehnchen-curry',
    phases: [
      { label: 'Prep', start: 30, end: 120, type: 'prep' },
      { label: 'Cook', start: 120, end: 240, type: 'cook' },
      { label: 'Hold', start: 240, end: 420, type: 'hold' },
    ],
  },
  {
    dishId: 'gemuese-lasagne',
    phases: [
      { label: 'Prep', start: 0, end: 90, type: 'prep' },
      { label: 'Cook', start: 90, end: 210, type: 'cook' },
      { label: 'Hold', start: 210, end: 420, type: 'hold' },
    ],
  },
  {
    dishId: 'kartoffelsuppe',
    phases: [
      { label: 'Prep', start: 30, end: 120, type: 'prep' },
      { label: 'Cook', start: 120, end: 210, type: 'cook' },
      { label: 'Hold', start: 210, end: 420, type: 'hold' },
    ],
  },
  {
    dishId: 'salatteller',
    phases: [
      { label: 'Prep', start: 30, end: 120, type: 'prep' },
      { label: 'Assembly', start: 120, end: 180, type: 'cook' },
      { label: 'Hold', start: 180, end: 420, type: 'hold' },
    ],
  },
]

const PHASE_COLORS: Record<string, string> = {
  prep: 'bg-accent/70',
  cook: 'bg-primary',
  hold: 'bg-primary/30',
}

const HOURS = [7, 8, 9, 10, 11, 12, 13, 14]

export default function CookPlanTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll to current time on mount
  useEffect(() => {
    if (scrollRef.current) {
      const currentOffset = (CURRENT_TIME - TIMELINE_START) * PX_PER_MINUTE
      scrollRef.current.scrollLeft = Math.max(0, currentOffset - 120)
    }
  }, [])

  const nowOffset = (CURRENT_TIME - TIMELINE_START) * PX_PER_MINUTE
  const totalHeight =
    HEADER_HEIGHT + DISH_TIMELINES.length * (ROW_HEIGHT + ROW_GAP) + 8

  return (
    <div className="bg-surface rounded-2xl shadow-sm overflow-hidden">
      <div className="flex">
        {/* Dish labels - fixed column */}
        <div className="shrink-0 w-28 border-r border-neutral-100">
          <div style={{ height: HEADER_HEIGHT }} className="border-b border-neutral-100" />
          {DISH_TIMELINES.map((dt) => {
            const dish = getDishById(dt.dishId)
            return (
              <div
                key={dt.dishId}
                style={{ height: ROW_HEIGHT + ROW_GAP }}
                className="flex items-center px-3"
              >
                <span className="text-sm font-semibold text-neutral-900 truncate">
                  {dish?.name.split(' ')[0] ?? dt.dishId}
                </span>
              </div>
            )
          })}
        </div>

        {/* Scrollable timeline */}
        <div ref={scrollRef} className="overflow-x-auto flex-1">
          <div style={{ width: TIMELINE_WIDTH, height: totalHeight }} className="relative">
            {/* Hour markers */}
            {HOURS.map((hour) => {
              const x = (hour * 60 - TIMELINE_START) * PX_PER_MINUTE
              return (
                <div key={hour} className="absolute top-0" style={{ left: x }}>
                  <div
                    style={{ height: HEADER_HEIGHT }}
                    className="flex items-center border-b border-neutral-100"
                  >
                    <span className="text-sm text-neutral-900/40 font-medium tabular-nums pl-1">
                      {String(hour).padStart(2, '0')}:00
                    </span>
                  </div>
                  <div
                    className="w-px bg-neutral-900/5"
                    style={{ height: totalHeight - HEADER_HEIGHT }}
                  />
                </div>
              )
            })}

            {/* Dish phase bars */}
            {DISH_TIMELINES.map((dt, rowIdx) => (
              <div key={dt.dishId}>
                {dt.phases.map((phase) => {
                  const left = phase.start * PX_PER_MINUTE
                  const width = (phase.end - phase.start) * PX_PER_MINUTE
                  const top =
                    HEADER_HEIGHT +
                    rowIdx * (ROW_HEIGHT + ROW_GAP) +
                    ROW_GAP / 2

                  return (
                    <div
                      key={`${dt.dishId}-${phase.type}`}
                      className={`absolute rounded-md ${PHASE_COLORS[phase.type]} flex items-center justify-center`}
                      style={{ left, width, top, height: ROW_HEIGHT }}
                    >
                      <span className="text-sm font-semibold text-white/90 truncate px-1">
                        {phase.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            ))}

            {/* Current time indicator */}
            <div
              className="absolute top-0 w-0.5 bg-danger z-10"
              style={{ left: nowOffset, height: totalHeight }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-danger -translate-x-[4px] -translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-2.5 border-t border-neutral-100">
        <LegendDot color="bg-accent/70" label="Prep" />
        <LegendDot color="bg-primary" label="Cook" />
        <LegendDot color="bg-primary/30" label="Hold" />
        <div className="flex items-center gap-1.5 ml-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-danger" />
          <span className="text-sm text-neutral-900/40 tabular-nums">Jetzt (09:45)</span>
        </div>
      </div>
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-3 h-3 rounded ${color}`} />
      <span className="text-sm text-neutral-900/50 font-medium">{label}</span>
    </div>
  )
}
