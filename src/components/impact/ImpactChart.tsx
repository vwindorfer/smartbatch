import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { WEEKLY_IMPACT } from '../../data/impact'

// Reverse to chronological order (oldest first)
const CHART_DATA = [...WEEKLY_IMPACT].reverse()

interface TrendChartProps {
  title: string
  dataKey: keyof (typeof CHART_DATA)[0]
  color: string
  unit: string
}

export default function ImpactChart({ title, dataKey, color, unit }: TrendChartProps) {
  return (
    <div className="bg-surface rounded-2xl shadow-sm p-4">
      <h3 className="text-base font-bold text-neutral-900 mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={CHART_DATA}>
          <defs>
            <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.2} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F5F5F7" />
          <XAxis
            dataKey="weekLabel"
            tick={{ fontSize: 14, fill: '#1A1A2E80' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 14, fill: '#1A1A2E80' }}
            axisLine={false}
            tickLine={false}
            width={50}
          />
          <Tooltip
            formatter={(value: number) => [`${value} ${unit}`, title]}
            contentStyle={{
              borderRadius: 12,
              border: 'none',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontSize: 16,
            }}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2.5}
            fill={`url(#grad-${dataKey})`}
            dot={{ r: 4, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: color, strokeWidth: 2, stroke: '#fff' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
