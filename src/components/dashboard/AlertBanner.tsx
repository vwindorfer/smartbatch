import { AlertTriangle, ChevronRight } from 'lucide-react'
import type { DishForecast } from '../../types'

interface AlertBannerProps {
  alerts: Array<{ dish: string; forecast: DishForecast }>
  onTap?: () => void
}

export default function AlertBanner({ alerts, onTap }: AlertBannerProps) {
  if (alerts.length === 0) return null

  return (
    <button
      onClick={onTap}
      className="w-full bg-accent/10 border border-accent/20 rounded-2xl p-4 tap-feedback text-left"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-accent shrink-0">
          <AlertTriangle size={20} />
        </div>
        <div className="flex-1 min-w-0">
          {alerts.map(({ dish, forecast }) => (
            <p key={forecast.dishId} className="text-base font-medium text-neutral-900">
              <span className="font-bold">{dish}:</span>{' '}
              Low confidence forecast ({forecast.confidence}%). Check inputs?
            </p>
          ))}
        </div>
        <ChevronRight size={20} className="text-accent shrink-0 mt-0.5" />
      </div>
    </button>
  )
}
