import { TrendingDown, Euro, Leaf, Heart } from 'lucide-react'
import MetricCard from '../shared/MetricCard'
import { CURRENT_MONTH_IMPACT } from '../../data/impact'

export default function ImpactDashboard() {
  const m = CURRENT_MONTH_IMPACT

  return (
    <div className="grid grid-cols-2 gap-3">
      <MetricCard
        icon={<TrendingDown size={16} className="text-success" />}
        label="Waste Avoided"
        value={`${m.wasteAvoidedKg} kg`}
        trend={{ value: '-23% vs. last month', positive: true }}
      />
      <MetricCard
        icon={<Euro size={16} className="text-success" />}
        label="Money Saved"
        value={`€${m.moneySavedEur.toLocaleString('de-DE')}`}
        trend={{ value: '+18%', positive: true }}
      />
      <MetricCard
        icon={<Leaf size={16} className="text-success" />}
        label="CO₂ Avoided"
        value={`${m.co2AvoidedKg} kg`}
        trend={{ value: '+15%', positive: true }}
      />
      <MetricCard
        icon={<Heart size={16} className="text-success" />}
        label="Meals Redirected"
        value={`${m.mealsRedirected}`}
        trend={{ value: '+12 this week', positive: true }}
      />
    </div>
  )
}
