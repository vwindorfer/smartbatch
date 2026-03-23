import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import PageHeader from '../components/layout/PageHeader'
import { getDishById } from '../data/dishes'

// Generate 28 days of dummy history (4 weeks)
interface DayHistory {
  date: string
  dayLabel: string
  weekday: string
  accuracy: number
  totalWasteKg: number
  dishes: Array<{
    dishId: string
    plannedTrays: number
    actualTrays: number
  }>
}

function generateHistory(): DayHistory[] {
  const dishes = ['schweinebraten', 'haehnchen-curry', 'gemuese-lasagne', 'kartoffelsuppe', 'salatteller']
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const history: DayHistory[] = []

  for (let i = 27; i >= 0; i--) {
    const d = new Date(2026, 2, 19 - i)
    const dow = d.getDay()
    // Skip weekends
    if (dow === 0 || dow === 6) continue

    const accuracy = 70 + Math.round(Math.random() * 22)
    const waste = 10 + Math.round(Math.random() * 25 * 10) / 10

    history.push({
      date: d.toISOString().slice(0, 10),
      dayLabel: `${d.getDate()}.${d.getMonth() + 1}`,
      weekday: weekdays[dow],
      accuracy,
      totalWasteKg: waste,
      dishes: dishes.map((dishId) => {
        const planned = 5 + Math.floor(Math.random() * 5)
        const diff = Math.random() > 0.7 ? Math.floor(Math.random() * 3) - 1 : 0
        return { dishId, plannedTrays: planned, actualTrays: planned + diff }
      }),
    })
  }
  return history
}

const HISTORY = generateHistory()

function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 85) return 'bg-success'
  if (accuracy >= 70) return 'bg-accent'
  return 'bg-danger'
}

function getAccuracyTextColor(accuracy: number): string {
  if (accuracy >= 85) return 'text-success'
  if (accuracy >= 70) return 'text-accent'
  return 'text-danger'
}

// Group into weeks
function groupByWeek(days: DayHistory[]): Array<{ label: string; days: DayHistory[] }> {
  const weeks: Array<{ label: string; days: DayHistory[] }> = []
  let current: DayHistory[] = []
  let weekStart = ''

  for (const day of days) {
    const d = new Date(day.date)
    const dow = d.getDay()
    if (dow === 1 && current.length > 0) {
      weeks.push({ label: weekStart, days: current })
      current = []
    }
    if (current.length === 0) weekStart = day.dayLabel
    current.push(day)
  }
  if (current.length > 0) {
    weeks.push({ label: weekStart, days: current })
  }
  return weeks
}

export default function HistoryPage() {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const weeks = groupByWeek(HISTORY)
  const selectedDay = HISTORY.find((d) => d.date === selectedDate)

  const trendData = HISTORY.map((d) => ({
    day: d.dayLabel,
    accuracy: d.accuracy,
  }))

  return (
    <div>
      <PageHeader
        title="History"
        subtitle="Cook Plan History"
        actions={
          <button
            onClick={() => navigate('/cook-plan')}
            className="w-12 h-12 flex items-center justify-center rounded-xl tap-feedback text-neutral-900/40"
            aria-label="Back"
          >
            <ArrowLeft size={22} />
          </button>
        }
      />

      <div className="p-4 space-y-5">
        {/* Calendar week view */}
        <div className="space-y-3">
          {weeks.map((week) => (
            <div key={week.label} className="bg-surface rounded-2xl shadow-sm p-3">
              <div className="flex items-center gap-1">
                <span className="text-sm text-neutral-900/40 font-medium w-14 shrink-0">
                  KW {week.label}
                </span>
                <div className="flex flex-1 gap-1">
                  {week.days.map((day) => (
                    <button
                      key={day.date}
                      onClick={() => setSelectedDate(selectedDate === day.date ? null : day.date)}
                      className={`
                        flex-1 flex flex-col items-center py-2 rounded-xl tap-feedback min-h-[52px]
                        ${selectedDate === day.date
                          ? 'bg-primary text-white'
                          : 'hover:bg-neutral-100'
                        }
                      `}
                    >
                      <span className={`text-sm font-medium ${selectedDate === day.date ? 'text-white/70' : 'text-neutral-900/40'}`}>
                        {day.weekday}
                      </span>
                      <span className={`text-base font-bold tabular-nums ${selectedDate === day.date ? 'text-white' : 'text-neutral-900'}`}>
                        {day.dayLabel.split('.')[0]}
                      </span>
                      <div className={`w-2.5 h-2.5 rounded-full mt-1 ${
                        selectedDate === day.date ? 'bg-white' : getAccuracyColor(day.accuracy)
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 px-1">
          <DotLegend color="bg-success" label="> 85%" />
          <DotLegend color="bg-accent" label="70–85%" />
          <DotLegend color="bg-danger" label="< 70%" />
        </div>

        {/* Selected day detail */}
        {selectedDay && (
          <div className="bg-surface rounded-2xl shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-neutral-900">
                {selectedDay.weekday}, {selectedDay.dayLabel}
              </h3>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold tabular-nums ${getAccuracyTextColor(selectedDay.accuracy)}`}>
                  {selectedDay.accuracy}%
                </span>
                <span className="text-sm text-neutral-900/40">Accuracy</span>
              </div>
            </div>

            <div className="text-sm text-neutral-900/50 font-medium tabular-nums">
              Waste: {selectedDay.totalWasteKg} kg
            </div>

            {/* Dish breakdown */}
            <div className="divide-y divide-neutral-100">
              {selectedDay.dishes.map((d) => {
                const dish = getDishById(d.dishId)
                const match = d.plannedTrays === d.actualTrays
                return (
                  <div key={d.dishId} className="flex items-center justify-between py-2">
                    <span className="text-base text-neutral-900 truncate flex-1 min-w-0">
                      {dish?.name ?? d.dishId}
                    </span>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm text-neutral-900/40">
                        Planned: <span className="font-semibold text-neutral-900 tabular-nums">{d.plannedTrays}</span>
                      </span>
                      <span className="text-sm text-neutral-900/40">
                        Actual: <span className={`font-semibold tabular-nums ${match ? 'text-success' : 'text-accent'}`}>
                          {d.actualTrays}
                        </span>
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Accuracy trend */}
        <div className="bg-surface rounded-2xl shadow-sm p-4">
          <h3 className="text-base font-bold text-neutral-900 mb-3">
            Accuracy (last 20 days)
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F7" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 14, fill: '#1A1A2E60' }}
                axisLine={false}
                tickLine={false}
                interval={2}
              />
              <YAxis
                domain={[60, 100]}
                tick={{ fontSize: 14, fill: '#1A1A2E80' }}
                axisLine={false}
                tickLine={false}
                width={40}
                unit="%"
              />
              <Tooltip
                formatter={(value: number) => [`${value}%`, 'Accuracy']}
                contentStyle={{
                  borderRadius: 12,
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  fontSize: 16,
                }}
              />
              <ReferenceLine y={85} stroke="#16A34A" strokeDasharray="4 4" strokeOpacity={0.5} />
              <ReferenceLine y={70} stroke="#E5A100" strokeDasharray="4 4" strokeOpacity={0.5} />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#1B6B4A"
                strokeWidth={2}
                dot={{ r: 3, fill: '#1B6B4A', strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function DotLegend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
      <span className="text-sm text-neutral-900/40 font-medium">{label}</span>
    </div>
  )
}
