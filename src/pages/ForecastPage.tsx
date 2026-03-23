import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import {
  LineChart,
  Line,
  ResponsiveContainer,
  YAxis,
} from 'recharts'
import PageHeader from '../components/layout/PageHeader'
import ConfidenceBadge from '../components/shared/ConfidenceBadge'
import { DISHES, getDishById } from '../data/dishes'
import { FORECASTS } from '../data/forecasts'
import type { DishForecast, ForecastFactor } from '../types'

const WEEKDAYS = [
  { key: 'mo', label: 'Mo', date: '16' },
  { key: 'di', label: 'Di', date: '17' },
  { key: 'mi', label: 'Mi', date: '18' },
  { key: 'do', label: 'Do', date: '19', isToday: true },
  { key: 'fr', label: 'Fr', date: '20' },
]

const FACTOR_CONTRIBUTIONS: Record<string, Array<{ label: string; value: string; positive: boolean | null }>> = {
  schweinebraten: [
    { label: 'Weekday', value: '+12%', positive: true },
    { label: 'Weather', value: '-3%', positive: false },
    { label: 'Events', value: '0%', positive: null },
    { label: 'Semester', value: '+8%', positive: true },
  ],
  'haehnchen-curry': [
    { label: 'Weekday', value: '+5%', positive: true },
    { label: 'Popularity', value: '+10%', positive: true },
    { label: 'Semester', value: '+6%', positive: true },
  ],
  'gemuese-lasagne': [
    { label: 'Weekday', value: '-8%', positive: false },
    { label: 'Veggie Trend', value: '+15%', positive: true },
    { label: 'Competition', value: '-5%', positive: false },
  ],
  kartoffelsuppe: [
    { label: 'Weekday', value: '+3%', positive: true },
    { label: 'Weather', value: '+10%', positive: true },
    { label: 'Stability', value: '+5%', positive: true },
  ],
  salatteller: [
    { label: 'Weekday', value: '-10%', positive: false },
    { label: 'Weather', value: '+2%', positive: true },
    { label: 'Volatility', value: '-15%', positive: false },
  ],
}

export default function ForecastPage() {
  const navigate = useNavigate()
  const [selectedDay, setSelectedDay] = useState('do')
  const [expandedDish, setExpandedDish] = useState<string | null>(null)

  return (
    <div>
      <PageHeader
        title="Forecast"
        subtitle="Demand Prediction"
        actions={
          <button
            onClick={() => navigate('/dashboard')}
            className="w-12 h-12 flex items-center justify-center rounded-xl tap-feedback text-neutral-900/40"
            aria-label="Back"
          >
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="p-4 space-y-5">
        {/* Day picker */}
        <div className="flex gap-2">
          {WEEKDAYS.map((day) => (
            <button
              key={day.key}
              onClick={() => setSelectedDay(day.key)}
              className={`
                flex-1 flex flex-col items-center py-2.5 rounded-xl tap-feedback transition-colors min-h-[56px]
                ${selectedDay === day.key
                  ? 'bg-primary text-white'
                  : day.isToday
                    ? 'bg-primary-light text-primary'
                    : 'bg-surface text-neutral-900/60 shadow-sm'
                }
              `}
            >
              <span className="text-sm font-medium">{day.label}</span>
              <span className="text-base font-bold tabular-nums">{day.date}</span>
            </button>
          ))}
        </div>

        {/* Dish forecasts */}
        <div className="space-y-4">
          {FORECASTS.map((forecast) => {
            const dish = getDishById(forecast.dishId)
            if (!dish) return null
            const isExpanded = expandedDish === forecast.dishId

            return (
              <div key={forecast.dishId} className="bg-surface rounded-2xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpandedDish(isExpanded ? null : forecast.dishId)}
                  className="w-full p-4 text-left tap-feedback"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-neutral-900 truncate">
                        {dish.name}
                      </h3>
                      <p className="text-sm text-neutral-900/40 mt-0.5">
                        {dish.line} · {forecast.recommendedTrays} trays recommended
                        {forecast.backupTrays > 0 && ` (+${forecast.backupTrays} Backup)`}
                      </p>
                    </div>
                    <ConfidenceBadge
                      confidence={forecast.confidence}
                      level={forecast.confidenceLevel}
                      size="sm"
                    />
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-2xl font-bold text-primary tabular-nums">
                        {forecast.predictedDemand}
                      </span>
                      <span className="text-base text-neutral-900/40 ml-1">portions</span>
                    </div>

                    {/* Sparkline */}
                    <div className="w-24 h-10">
                      <Sparkline data={forecast.historicalDemand} />
                    </div>

                    <div className="shrink-0 text-neutral-900/30">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>

                  {/* Factor chips */}
                  <div className="flex flex-wrap gap-2.5 mt-3">
                    {forecast.factors.map((factor) => (
                      <FactorChip key={factor.label} factor={factor} />
                    ))}
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-neutral-100 pt-3">
                    <h4 className="text-sm font-bold text-neutral-900/50 uppercase tracking-wide mb-2">
                      Factor Contributions
                    </h4>
                    <div className="space-y-2">
                      {(FACTOR_CONTRIBUTIONS[forecast.dishId] ?? []).map((contrib) => (
                        <div key={contrib.label} className="flex items-center justify-between">
                          <span className="text-base text-neutral-900/70">{contrib.label}</span>
                          <div className="flex items-center gap-1.5">
                            {contrib.positive === true && <TrendingUp size={16} className="text-success" />}
                            {contrib.positive === false && <TrendingDown size={16} className="text-danger" />}
                            {contrib.positive === null && <Minus size={16} className="text-neutral-900/30" />}
                            <span
                              className={`text-base font-semibold tabular-nums ${
                                contrib.positive === true
                                  ? 'text-success'
                                  : contrib.positive === false
                                    ? 'text-danger'
                                    : 'text-neutral-900/40'
                              }`}
                            >
                              {contrib.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 7-day history label */}
                    <h4 className="text-sm font-bold text-neutral-900/50 uppercase tracking-wide mt-4 mb-2">
                      Last 7 Days
                    </h4>
                    <div className="h-16">
                      <Sparkline data={forecast.historicalDemand} large />
                    </div>
                    <div className="flex justify-between text-sm text-neutral-900/30 mt-1">
                      <span>7 days ago</span>
                      <span>Today</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Sparkline({ data, large }: { data: number[]; large?: boolean }) {
  const chartData = data.map((v, i) => ({ idx: i, value: v }))
  const height = large ? 64 : 40

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData}>
        <YAxis hide domain={['dataMin - 20', 'dataMax + 20']} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#1B6B4A"
          strokeWidth={2}
          dot={large ? { r: 3, fill: '#1B6B4A', strokeWidth: 0 } : false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

function FactorChip({ factor }: { factor: ForecastFactor }) {
  const colors: Record<string, string> = {
    positive: 'bg-success/10 text-success',
    negative: 'bg-danger/10 text-danger',
    neutral: 'bg-neutral-900/5 text-neutral-900/50',
  }

  return (
    <span className={`text-sm font-medium px-2.5 py-1 rounded-lg ${colors[factor.impact]}`}>
      {factor.label}
    </span>
  )
}
