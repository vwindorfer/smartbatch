import { Share2, Target, TrendingDown } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import ImpactDashboard from '../components/impact/ImpactDashboard'
import ImpactChart from '../components/impact/ImpactChart'
import LoadingSkeleton from '../components/shared/LoadingSkeleton'
import Toast from '../components/shared/Toast'
import { useSimulatedLoading } from '../hooks/useSimulatedLoading'
import { useToast } from '../hooks/useToast'

export default function ImpactPage() {
  const { loading } = useSimulatedLoading()
  const toast = useToast()

  return (
    <div>
      <PageHeader title="Impact Report" subtitle="March 2026" />

      <div className="p-4 space-y-5">
        {loading ? (
          <>
            <LoadingSkeleton variant="metric" count={4} />
            <LoadingSkeleton variant="card" count={2} />
          </>
        ) : (
          <div className="stagger-container space-y-5">
            {/* Hero metrics */}
            <ImpactDashboard />

            {/* Comparison to previous period */}
            <div className="bg-success/10 rounded-2xl p-4 flex items-center gap-3">
              <TrendingDown size={20} className="text-success shrink-0" />
              <p className="text-sm font-medium text-neutral-900">
                <span className="font-bold text-success">23% less waste</span>{' '}
                than last month (February: 445 kg → March: 342 kg)
              </p>
            </div>

            {/* Trend charts */}
            <ImpactChart
              title="Waste Avoided (kg/week)"
              dataKey="wasteAvoidedKg"
              color="#16A34A"
              unit="kg"
            />

            <ImpactChart
              title="Money Saved (€/week)"
              dataKey="moneySavedEur"
              color="#1B6B4A"
              unit="€"
            />

            {/* SDG 12.3 alignment */}
            <div className="bg-surface rounded-2xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-3">
                <Target size={18} className="text-primary" />
                <h3 className="text-sm font-bold text-neutral-900">
                  SDG 12.3 Alignment
                </h3>
              </div>
              <p className="text-base text-neutral-900/60 mb-4">
                SDG 12.3 calls for halving food waste by 2030.
              </p>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-neutral-900/50">
                    Goal: 50% reduction by 2030
                  </span>
                  <span className="text-sm font-bold text-primary tabular-nums">
                    34%
                  </span>
                </div>
                <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: '68%' }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-neutral-900/40 tabular-nums">0%</span>
                  <span className="text-sm text-neutral-900/40">50% Goal</span>
                </div>
              </div>

              <div className="mt-3 bg-primary-light rounded-xl p-3">
                <p className="text-sm text-primary font-medium">
                  Current: 34% reduction achieved. 16 percentage points remaining to the 2030 goal.
                  At the current pace, the target is expected to be reached by end of 2028.
                </p>
              </div>
            </div>

            {/* Share button */}
            <button
              onClick={toast.show}
              className="w-full h-14 bg-primary text-white rounded-xl text-base font-semibold tap-feedback hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Share2 size={18} />
              Share Report
            </button>
          </div>
        )}
      </div>

      <Toast
        visible={toast.visible}
        exiting={toast.exiting}
        message="Coming soon"
        variant="info"
      />
    </div>
  )
}
