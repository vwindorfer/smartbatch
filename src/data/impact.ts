import type { ImpactMetrics, WeeklyImpact, RedirectItem } from '../types'

export const CURRENT_MONTH_IMPACT: ImpactMetrics = {
  period: 'March 2026',
  wasteAvoidedKg: 342,
  moneySavedEur: 1197,
  co2AvoidedKg: 513,
  mealsRedirected: 89,
  forecastAccuracy: 84,
}

export const WEEKLY_IMPACT: WeeklyImpact[] = [
  { weekLabel: 'W1 Mar', wasteAvoidedKg: 78, moneySavedEur: 273, co2AvoidedKg: 117 },
  { weekLabel: 'W2 Mar', wasteAvoidedKg: 92, moneySavedEur: 322, co2AvoidedKg: 138 },
  { weekLabel: 'W3 Mar', wasteAvoidedKg: 85, moneySavedEur: 298, co2AvoidedKg: 128 },
  { weekLabel: 'W4 Feb', wasteAvoidedKg: 65, moneySavedEur: 228, co2AvoidedKg: 98 },
  { weekLabel: 'W3 Feb', wasteAvoidedKg: 71, moneySavedEur: 249, co2AvoidedKg: 107 },
  { weekLabel: 'W2 Feb', wasteAvoidedKg: 58, moneySavedEur: 203, co2AvoidedKg: 87 },
  { weekLabel: 'W1 Feb', wasteAvoidedKg: 62, moneySavedEur: 217, co2AvoidedKg: 93 },
  { weekLabel: 'W4 Jan', wasteAvoidedKg: 55, moneySavedEur: 193, co2AvoidedKg: 83 },
]

export const REDIRECT_ITEMS: RedirectItem[] = [
  {
    id: 'r1',
    dishId: 'schweinebraten',
    quantity: 15,
    timeRemaining: '1h 30m',
    status: 'available',
  },
  {
    id: 'r2',
    dishId: 'gemuese-lasagne',
    quantity: 22,
    timeRemaining: '45m',
    status: 'claimed',
    partnerOrg: 'Münchner Tafel',
  },
  {
    id: 'r3',
    dishId: 'kartoffelsuppe',
    quantity: 30,
    timeRemaining: '2h 15m',
    status: 'available',
  },
  {
    id: 'r4',
    dishId: 'salatteller',
    quantity: 8,
    timeRemaining: '0m',
    status: 'expired',
  },
]
