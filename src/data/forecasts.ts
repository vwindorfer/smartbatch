import type { DishForecast } from '../types'

export const TODAY = '2026-03-19'

export const FORECASTS: DishForecast[] = [
  {
    dishId: 'schweinebraten',
    date: TODAY,
    predictedDemand: 320,
    confidence: 87,
    confidenceLevel: 'high',
    recommendedTrays: 8,
    backupTrays: 2,
    factors: [
      { label: 'Thursday — typical high demand', impact: 'positive' },
      { label: '18°C partly cloudy', impact: 'neutral' },
      { label: 'No special events', impact: 'neutral' },
      { label: 'Semester in session', impact: 'positive' },
    ],
    historicalDemand: [290, 310, 305, 330, 315, 325, 320],
  },
  {
    dishId: 'haehnchen-curry',
    date: TODAY,
    predictedDemand: 245,
    confidence: 82,
    confidenceLevel: 'high',
    recommendedTrays: 7,
    backupTrays: 1,
    factors: [
      { label: 'Curry consistently popular', impact: 'positive' },
      { label: 'Thursday — average for curry', impact: 'neutral' },
      { label: 'Semester in session', impact: 'positive' },
    ],
    historicalDemand: [230, 250, 240, 255, 235, 248, 245],
  },
  {
    dishId: 'gemuese-lasagne',
    date: TODAY,
    predictedDemand: 180,
    confidence: 74,
    confidenceLevel: 'medium',
    recommendedTrays: 6,
    backupTrays: 2,
    factors: [
      { label: 'Veggie demand growing trend', impact: 'positive' },
      { label: 'Thursday — lower veggie demand', impact: 'negative' },
      { label: 'Competing with strong main dishes', impact: 'negative' },
    ],
    historicalDemand: [160, 175, 185, 170, 190, 178, 180],
  },
  {
    dishId: 'kartoffelsuppe',
    date: TODAY,
    predictedDemand: 290,
    confidence: 91,
    confidenceLevel: 'high',
    recommendedTrays: 6,
    backupTrays: 0,
    factors: [
      { label: '18°C — good soup weather', impact: 'positive' },
      { label: 'Kartoffelsuppe is a staple', impact: 'positive' },
      { label: 'High historical consistency', impact: 'positive' },
    ],
    historicalDemand: [280, 295, 285, 300, 288, 292, 290],
  },
  {
    dishId: 'salatteller',
    date: TODAY,
    predictedDemand: 150,
    confidence: 68,
    confidenceLevel: 'low',
    recommendedTrays: 6,
    backupTrays: 2,
    factors: [
      { label: '18°C — moderate salad weather', impact: 'neutral' },
      { label: 'Thursday — variable salad demand', impact: 'negative' },
      { label: 'Salad demand is volatile', impact: 'negative' },
    ],
    historicalDemand: [120, 165, 140, 180, 130, 155, 150],
  },
]

export function getForecastByDishId(dishId: string): DishForecast | undefined {
  return FORECASTS.find((f) => f.dishId === dishId)
}
