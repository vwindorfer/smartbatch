import { CloudSun } from 'lucide-react'

export default function TodayOverview() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-lg font-bold text-neutral-900">
          Thursday, March 19, 2026
        </h2>
        <p className="text-base text-neutral-900/50 mt-0.5">
          No events today
        </p>
      </div>
      <div className="flex items-center gap-2 text-neutral-900/60 shrink-0">
        <CloudSun size={24} />
        <span className="text-base font-semibold tabular-nums">18°C</span>
      </div>
    </div>
  )
}
