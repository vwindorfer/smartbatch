// === Cafeteria & Kitchen ===

export interface Cafeteria {
  name: string
  dailyCapacity: number
  operatingHours: { start: string; end: string }
  lines: CafeteriaLine[]
  staffOnDuty: { cooks: number; prepAssistants: number }
}

export interface CafeteriaLine {
  id: string
  name: string
}

// === Dishes ===

export type DishLine = 'Main' | 'Veggie' | 'Soup' | 'Salad'

export interface Dish {
  id: string
  name: string
  line: DishLine
  traySize: number // portions per tray
  maxTrays: number
  shelfLife: string
  imageUrl?: string
}

// === Forecasts ===

export type ConfidenceLevel = 'high' | 'medium' | 'low'

export interface ForecastFactor {
  label: string
  impact: 'positive' | 'negative' | 'neutral'
}

export interface DishForecast {
  dishId: string
  date: string
  predictedDemand: number
  confidence: number
  confidenceLevel: ConfidenceLevel
  recommendedTrays: number
  backupTrays: number
  factors: ForecastFactor[]
  historicalDemand: number[] // last 7 days for sparkline
}

// === Cook Plans ===

export type BatchStatus = 'upcoming' | 'in-progress' | 'done'
export type PrepStatus = 'not-started' | 'in-prep' | 'ready'

export interface Batch {
  id: string
  dishId: string
  trayNumber: number
  totalTrays: number
  startTime: string
  endTime: string
  status: BatchStatus
  isBackup: boolean
}

export interface CookPlan {
  date: string
  batches: Batch[]
  adjustments: CookPlanAdjustment[]
}

export interface CookPlanAdjustment {
  id: string
  dishId: string
  previousTrays: number
  newTrays: number
  reason: string
  timestamp: string
}

// === Prep List ===

export type TimeBlock = 'early-am' | 'mid-am' | 'before-service'

export interface PrepItem {
  id: string
  ingredient: string
  quantity: string
  associatedDishes: string[] // dish IDs
  timeBlock: TimeBlock
  estimatedMinutes: number
  completed: boolean
  isShared: boolean // used by multiple dishes
}

// === Waste Tracking ===

export type WasteReason = 'overproduction' | 'spoiled' | 'plate-waste' | 'other'

export interface WasteEntry {
  id: string
  dishId: string
  date: string
  kg: number
  reason: WasteReason
  timestamp: string
}

export interface DailyWasteSummary {
  date: string
  totalKg: number
  costEur: number
  co2AvoidedKg: number
}

// === Impact Metrics ===

export interface ImpactMetrics {
  period: string
  wasteAvoidedKg: number
  moneySavedEur: number
  co2AvoidedKg: number
  mealsRedirected: number
  forecastAccuracy: number
}

export interface WeeklyImpact {
  weekLabel: string
  wasteAvoidedKg: number
  moneySavedEur: number
  co2AvoidedKg: number
}

// === Meal Redirect ===

export type RedirectStatus = 'available' | 'claimed' | 'expired'

export interface RedirectItem {
  id: string
  dishId: string
  quantity: number
  timeRemaining: string
  status: RedirectStatus
  partnerOrg?: string
}

// === Settings ===

export interface KitchenSettings {
  name: string
  capacity: number
  operatingHours: { start: string; end: string }
  equipment: Equipment[]
  staffPerShift: number
  trayDefaults: Record<string, number>
  notifications: NotificationPreferences
}

export interface Equipment {
  id: string
  name: string
  type: 'oven' | 'holding-cabinet' | 'fryer' | 'steamer' | 'other'
  capacity: string
}

export interface NotificationPreferences {
  lowConfidenceAlerts: boolean
  prepReminders: boolean
  wasteThresholdAlerts: boolean
  wasteThresholdKg: number
}

// === User ===

export interface User {
  id: string
  name: string
  email: string
  role: 'cook' | 'kitchen-manager' | 'admin'
  cafeteriaId: string
}
