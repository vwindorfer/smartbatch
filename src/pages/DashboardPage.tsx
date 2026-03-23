import { useNavigate } from 'react-router-dom'
import { Settings, Trash2, Target, Utensils, ChevronRight } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import TodayOverview from '../components/dashboard/TodayOverview'
import AlertBanner from '../components/dashboard/AlertBanner'
import DishCard from '../components/shared/DishCard'
import MetricCard from '../components/shared/MetricCard'
import LoadingSkeleton from '../components/shared/LoadingSkeleton'
import PullRefreshIndicator from '../components/shared/PullRefreshIndicator'
import { DISHES, getDishById } from '../data/dishes'
import { FORECASTS } from '../data/forecasts'
import { WEEKLY_WASTE_SUMMARY } from '../data/wasteLog'
import { CURRENT_MONTH_IMPACT } from '../data/impact'
import { useStore } from '../store/useStore'
import { useSimulatedLoading } from '../hooks/useSimulatedLoading'
import { usePullToRefresh } from '../hooks/usePullToRefresh'
import type { PrepStatus } from '../types'

function useDishPrepStatus(dishId: string): { prepStatus: PrepStatus; doneTrays: number; totalTrays: number } {
  const batches = useStore((s) => s.batches)
  const dishBatches = batches.filter((b) => b.dishId === dishId && !b.isBackup)
  const doneTrays = dishBatches.filter((b) => b.status === 'done').length
  const totalTrays = dishBatches.length
  const hasInProgress = dishBatches.some((b) => b.status === 'in-progress')

  let prepStatus: PrepStatus = 'not-started'
  if (doneTrays === totalTrays && totalTrays > 0) {
    prepStatus = 'ready'
  } else if (doneTrays > 0 || hasInProgress) {
    prepStatus = 'in-prep'
  }

  return { prepStatus, doneTrays, totalTrays }
}

function DishCardWithStatus({ dishId, onTap }: { dishId: string; onTap: () => void }) {
  const dish = getDishById(dishId)
  const forecast = FORECASTS.find((f) => f.dishId === dishId)
  const { prepStatus, doneTrays, totalTrays } = useDishPrepStatus(dishId)

  if (!dish || !forecast) return null

  return (
    <DishCard
      name={dish.name}
      line={dish.line}
      trayCount={doneTrays}
      totalTrays={totalTrays}
      confidence={forecast.confidence}
      confidenceLevel={forecast.confidenceLevel}
      prepStatus={prepStatus}
      onTap={onTap}
    />
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const { loading, reload } = useSimulatedLoading()
  const { pulling, pullDistance, refreshing } = usePullToRefresh(reload)

  const lowConfidenceAlerts = FORECASTS
    .filter((f) => f.confidence < 70)
    .map((f) => ({
      dish: getDishById(f.dishId)?.name ?? f.dishId,
      forecast: f,
    }))

  const yesterdayWaste = WEEKLY_WASTE_SUMMARY.find((w) => w.date === '2026-03-18')
  const yesterdayWasteKg = yesterdayWaste?.totalKg ?? 0

  return (
    <div>
      <PullRefreshIndicator pulling={pulling} pullDistance={pullDistance} refreshing={refreshing} />
      <PageHeader
        title="Good Morning"
        subtitle="TU Munich Mensa Garching"
        actions={
          <button
            onClick={() => navigate('/settings')}
            className="w-12 h-12 flex items-center justify-center rounded-xl tap-feedback text-neutral-900/40 hover:text-neutral-900/60"
            aria-label="Settings"
          >
            <Settings size={22} />
          </button>
        }
      />

      <div className="p-4 space-y-5">
        {loading ? (
          <>
            <LoadingSkeleton variant="text" count={1} />
            <LoadingSkeleton variant="card" count={5} />
            <LoadingSkeleton variant="metric" count={3} />
          </>
        ) : (
          <div className="stagger-container space-y-5">
            {/* Date, weather, event note */}
            <TodayOverview />

            {/* Low confidence alert */}
            <AlertBanner
              alerts={lowConfidenceAlerts}
              onTap={() => navigate('/forecast')}
            />

            {/* Today's dishes */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-neutral-900">
                  Today's Dishes
                </h2>
                <button
                  onClick={() => navigate('/forecast')}
                  className="flex items-center gap-1 text-sm font-semibold text-primary tap-feedback"
                >
                  View Forecast
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="space-y-3">
                {DISHES.map((dish) => (
                  <DishCardWithStatus
                    key={dish.id}
                    dishId={dish.id}
                    onTap={() => navigate('/forecast')}
                  />
                ))}
              </div>
            </section>

            {/* Quick stats */}
            <section>
              <h2 className="text-base font-bold text-neutral-900 mb-3">
                At a Glance
              </h2>
              <div className="grid grid-cols-3 gap-3">
                <MetricCard
                  icon={<Trash2 size={16} />}
                  label="Yesterday's Waste"
                  value={`${yesterdayWasteKg} kg`}
                  trend={{ value: '-15%', positive: true }}
                />
                <MetricCard
                  icon={<Target size={16} />}
                  label="Forecast Accuracy"
                  value={`${CURRENT_MONTH_IMPACT.forecastAccuracy}%`}
                />
                <MetricCard
                  icon={<Utensils size={16} />}
                  label="Redirected"
                  value={`${CURRENT_MONTH_IMPACT.mealsRedirected}`}
                  trend={{ value: '+12', positive: true }}
                />
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
