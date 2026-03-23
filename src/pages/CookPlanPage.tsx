import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardList, History } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import CookPlanTimeline from '../components/cookplan/CookPlanTimeline'
import BatchCard from '../components/cookplan/BatchCard'
import LiveAdjustment from '../components/cookplan/LiveAdjustment'
import TrayCounter from '../components/shared/TrayCounter'
import ConfidenceBadge from '../components/shared/ConfidenceBadge'
import LoadingSkeleton from '../components/shared/LoadingSkeleton'
import PullRefreshIndicator from '../components/shared/PullRefreshIndicator'
import { DISHES, getDishById } from '../data/dishes'
import { FORECASTS } from '../data/forecasts'
import { useStore } from '../store/useStore'
import { useSimulatedLoading } from '../hooks/useSimulatedLoading'
import { usePullToRefresh } from '../hooks/usePullToRefresh'

export default function CookPlanPage() {
  const navigate = useNavigate()
  const batches = useStore((s) => s.batches)
  const [adjustingDish, setAdjustingDish] = useState<string | null>(null)
  const { loading, reload } = useSimulatedLoading()
  const { pulling, pullDistance, refreshing } = usePullToRefresh(reload)

  return (
    <div>
      <PullRefreshIndicator pulling={pulling} pullDistance={pullDistance} refreshing={refreshing} />
      <PageHeader
        title="Cook Plan"
        subtitle="Thursday, March 19, 2026"
        actions={
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate('/cook-plan/prep')}
              className="h-12 px-3 flex items-center gap-1.5 rounded-xl tap-feedback text-sm font-semibold text-primary"
            >
              <ClipboardList size={18} />
              <span className="hidden sm:inline">Prep List</span>
            </button>
            <button
              onClick={() => navigate('/cook-plan/history')}
              className="h-12 px-3 flex items-center gap-1.5 rounded-xl tap-feedback text-sm font-semibold text-neutral-900/50"
            >
              <History size={18} />
              <span className="hidden sm:inline">History</span>
            </button>
          </div>
        }
      />

      <div className="p-4 space-y-5">
        {loading ? (
          <>
            <LoadingSkeleton variant="text" count={1} />
            <LoadingSkeleton variant="card" count={5} />
          </>
        ) : (
          <div className="stagger-container space-y-5">
            {/* Timeline */}
            <section>
              <h2 className="text-base font-bold text-neutral-900 mb-3">
                Daily Overview
              </h2>
              <CookPlanTimeline />
            </section>

            {/* Batch overview per dish */}
            <section className="space-y-5">
              <h2 className="text-base font-bold text-neutral-900">
                Dishes & Trays
              </h2>

              {DISHES.map((dish) => (
                <DishBatchSection
                  key={dish.id}
                  dishId={dish.id}
                  onAdjust={() => setAdjustingDish(dish.id)}
                />
              ))}
            </section>
          </div>
        )}
      </div>

      {/* Live adjustment panel */}
      {adjustingDish && (
        <LiveAdjustmentWrapper
          dishId={adjustingDish}
          batches={batches}
          onClose={() => setAdjustingDish(null)}
        />
      )}
    </div>
  )
}

function DishBatchSection({
  dishId,
  onAdjust,
}: {
  dishId: string
  onAdjust: () => void
}) {
  const batches = useStore((s) => s.batches)
  const dish = getDishById(dishId)
  const forecast = FORECASTS.find((f) => f.dishId === dishId)

  if (!dish || !forecast) return null

  const regularBatches = batches.filter(
    (b) => b.dishId === dishId && !b.isBackup
  )
  const backupBatches = batches.filter(
    (b) => b.dishId === dishId && b.isBackup
  )
  const doneCount = regularBatches.filter((b) => b.status === 'done').length

  return (
    <div className="bg-surface rounded-2xl shadow-sm overflow-hidden">
      {/* Dish header */}
      <div className="p-4 border-b border-neutral-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-neutral-900 truncate">
                {dish.name}
              </h3>
              <ConfidenceBadge
                confidence={forecast.confidence}
                level={forecast.confidenceLevel}
                size="sm"
              />
            </div>
            <p className="text-sm text-neutral-900/40 mt-0.5">
              {dish.line} · {dish.traySize} portions/tray · {dish.shelfLife}
            </p>
          </div>
        </div>

        {/* Tray counter */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-neutral-900/50 font-medium">Trays</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-bold text-primary tabular-nums">
                {doneCount}
              </span>
              <span className="text-sm text-neutral-900/40">
                / {regularBatches.length} done
              </span>
            </div>
          </div>
          <TrayCounter
            count={regularBatches.length}
            onChange={() => onAdjust()}
            min={1}
            max={dish.maxTrays}
          />
        </div>
      </div>

      {/* Batch cards grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {regularBatches.map((batch) => (
          <BatchCard key={batch.id} batch={batch} onTap={onAdjust} />
        ))}
      </div>

      {/* Backup indicator */}
      {backupBatches.length > 0 && (
        <div className="px-4 py-2.5 bg-accent/5 border-t border-accent/10 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-sm font-medium text-accent">
            {backupBatches.length} tray{backupBatches.length > 1 ? 's' : ''} prepped as backup
          </span>
        </div>
      )}
    </div>
  )
}

function LiveAdjustmentWrapper({
  dishId,
  batches,
  onClose,
}: {
  dishId: string
  batches: ReturnType<typeof useStore.getState>['batches']
  onClose: () => void
}) {
  const dish = getDishById(dishId)
  const currentTrays = batches.filter(
    (b) => b.dishId === dishId && !b.isBackup
  ).length

  return (
    <LiveAdjustment
      dishId={dishId}
      currentTrays={currentTrays}
      maxTrays={dish?.maxTrays ?? 12}
      onClose={onClose}
    />
  )
}
