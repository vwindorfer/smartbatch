import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts'
import { WEEKLY_WASTE_SUMMARY } from '../../data/wasteLog'
import { useStore } from '../../store/useStore'
import type { WasteReason } from '../../types'

const DAY_LABELS: Record<string, string> = {
  '2026-03-13': 'Thu',
  '2026-03-14': 'Fri',
  '2026-03-15': 'Sat',
  '2026-03-16': 'Sun',
  '2026-03-17': 'Mon',
  '2026-03-18': 'Tue',
  '2026-03-19': 'Wed',
}

const REASON_LABELS: Record<WasteReason, string> = {
  overproduction: 'Overproduction',
  spoiled: 'Spoiled',
  'plate-waste': 'Plate Waste',
  other: 'Other',
}

const REASON_COLORS: Record<WasteReason, string> = {
  overproduction: '#E5A100',
  spoiled: '#DC2626',
  'plate-waste': '#1B6B4A',
  other: '#9CA3AF',
}

function getBarColor(kg: number): string {
  if (kg <= 18) return '#16A34A'
  if (kg <= 25) return '#E5A100'
  return '#DC2626'
}

export function WeeklyChart() {
  const chartData = WEEKLY_WASTE_SUMMARY.map((d) => ({
    day: DAY_LABELS[d.date] ?? d.date.slice(-2),
    kg: d.totalKg,
  }))

  return (
    <div className="bg-surface rounded-2xl shadow-sm p-4">
      <h3 className="text-base font-bold text-neutral-900 mb-3">
        Weekly Overview
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={chartData} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F7" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 14, fill: '#1A1A2E80' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 14, fill: '#1A1A2E80' }}
            axisLine={false}
            tickLine={false}
            unit=" kg"
            width={55}
          />
          <Tooltip
            formatter={(value: number) => [`${value} kg`, 'Waste']}
            contentStyle={{
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontSize: 16,
            }}
          />
          <Bar dataKey="kg" radius={[6, 6, 0, 0]}>
            {chartData.map((entry, idx) => (
              <Cell key={idx} fill={getBarColor(entry.kg)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ReasonBreakdown() {
  const wasteEntries = useStore((s) => s.wasteEntries)

  const reasonTotals = wasteEntries.reduce<Record<WasteReason, number>>(
    (acc, entry) => {
      acc[entry.reason] = (acc[entry.reason] || 0) + entry.kg
      return acc
    },
    { overproduction: 0, spoiled: 0, 'plate-waste': 0, other: 0 }
  )

  const totalKg = Object.values(reasonTotals).reduce((a, b) => a + b, 0)

  const chartData = (Object.entries(reasonTotals) as Array<[WasteReason, number]>)
    .filter(([, kg]) => kg > 0)
    .map(([reason, kg]) => ({
      name: REASON_LABELS[reason],
      value: Math.round((kg / totalKg) * 100),
      kg,
      fill: REASON_COLORS[reason],
    }))

  return (
    <div className="bg-surface rounded-2xl shadow-sm p-4">
      <h3 className="text-base font-bold text-neutral-900 mb-3">
        Breakdown by Reason
      </h3>
      <div className="flex items-center gap-4">
        <div className="w-32 h-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={55}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-3">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm shrink-0"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-base text-neutral-900/70">{item.name}</span>
              </div>
              <span className="text-base font-semibold text-neutral-900 tabular-nums">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
