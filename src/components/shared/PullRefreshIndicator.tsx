import { RefreshCw } from 'lucide-react'

interface PullRefreshIndicatorProps {
  pulling: boolean
  pullDistance: number
  refreshing: boolean
}

export default function PullRefreshIndicator({
  pulling,
  pullDistance,
  refreshing,
}: PullRefreshIndicatorProps) {
  if (!pulling && !refreshing) return null

  const opacity = Math.min(pullDistance / 80, 1)
  const translateY = refreshing ? 40 : pullDistance * 0.5

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none"
      style={{ transform: `translateY(${translateY}px)`, opacity }}
    >
      <div className="bg-surface rounded-full p-2.5 shadow-lg">
        <RefreshCw
          size={20}
          className={`text-primary ${refreshing ? 'refresh-spin' : ''}`}
          style={{ transform: !refreshing ? `rotate(${pullDistance * 2}deg)` : undefined }}
        />
      </div>
    </div>
  )
}
