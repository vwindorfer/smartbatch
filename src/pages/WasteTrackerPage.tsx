import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import WasteLogForm from '../components/waste/WasteLogForm'
import WasteSummary from '../components/waste/WasteSummary'
import { WeeklyChart, ReasonBreakdown } from '../components/waste/WasteHistory'
import Toast from '../components/shared/Toast'
import { useToast } from '../hooks/useToast'

export default function WasteTrackerPage() {
  const navigate = useNavigate()
  const toast = useToast()

  return (
    <div>
      <PageHeader title="Waste Tracker" subtitle="Thursday, March 19, 2026" />

      <div className="p-4 space-y-5">
        {/* Quick log form */}
        <WasteLogForm onSaved={toast.show} />

        {/* Today's summary */}
        <section>
          <h2 className="text-base font-bold text-neutral-900 mb-3">
            Today
          </h2>
          <WasteSummary />
        </section>

        {/* Weekly chart */}
        <section>
          <WeeklyChart />
        </section>

        {/* Reason breakdown */}
        <section>
          <ReasonBreakdown />
        </section>

        {/* Redirect CTA */}
        <button
          onClick={() => navigate('/waste/redirect')}
          className="w-full bg-primary-light text-primary rounded-2xl p-4 tap-feedback text-left flex items-center justify-between"
        >
          <div>
            <span className="text-sm font-bold block">Redirect Meal</span>
            <span className="text-sm text-primary/70">
              Pass surplus to partner organizations
            </span>
          </div>
          <ArrowRight size={20} />
        </button>
      </div>

      <Toast
        visible={toast.visible}
        exiting={toast.exiting}
        message="Entry saved"
        variant="success"
      />
    </div>
  )
}
