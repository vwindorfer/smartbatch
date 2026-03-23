import type { WasteEntry, DailyWasteSummary } from '../types'

export const WASTE_ENTRIES: WasteEntry[] = [
  { id: 'w1', dishId: 'schweinebraten', date: '2026-03-18', kg: 4.2, reason: 'overproduction', timestamp: '2026-03-18T14:30:00' },
  { id: 'w2', dishId: 'haehnchen-curry', date: '2026-03-18', kg: 2.1, reason: 'plate-waste', timestamp: '2026-03-18T14:30:00' },
  { id: 'w3', dishId: 'gemuese-lasagne', date: '2026-03-18', kg: 5.8, reason: 'overproduction', timestamp: '2026-03-18T14:45:00' },
  { id: 'w4', dishId: 'kartoffelsuppe', date: '2026-03-18', kg: 1.5, reason: 'plate-waste', timestamp: '2026-03-18T14:30:00' },
  { id: 'w5', dishId: 'salatteller', date: '2026-03-18', kg: 4.6, reason: 'spoiled', timestamp: '2026-03-18T15:00:00' },
  { id: 'w6', dishId: 'schweinebraten', date: '2026-03-17', kg: 3.5, reason: 'overproduction', timestamp: '2026-03-17T14:30:00' },
  { id: 'w7', dishId: 'haehnchen-curry', date: '2026-03-17', kg: 6.2, reason: 'overproduction', timestamp: '2026-03-17T14:45:00' },
  { id: 'w8', dishId: 'salatteller', date: '2026-03-17', kg: 8.5, reason: 'spoiled', timestamp: '2026-03-17T15:00:00' },
  { id: 'w9', dishId: 'gemuese-lasagne', date: '2026-03-16', kg: 2.3, reason: 'plate-waste', timestamp: '2026-03-16T14:30:00' },
  { id: 'w10', dishId: 'kartoffelsuppe', date: '2026-03-16', kg: 7.0, reason: 'overproduction', timestamp: '2026-03-16T14:30:00' },
]

export const WEEKLY_WASTE_SUMMARY: DailyWasteSummary[] = [
  { date: '2026-03-13', totalKg: 23.5, costEur: 82.25, co2AvoidedKg: 35.25 },
  { date: '2026-03-14', totalKg: 18.2, costEur: 63.70, co2AvoidedKg: 27.30 },
  { date: '2026-03-15', totalKg: 31.0, costEur: 108.50, co2AvoidedKg: 46.50 },
  { date: '2026-03-16', totalKg: 15.8, costEur: 55.30, co2AvoidedKg: 23.70 },
  { date: '2026-03-17', totalKg: 27.3, costEur: 95.55, co2AvoidedKg: 40.95 },
  { date: '2026-03-18', totalKg: 18.2, costEur: 63.70, co2AvoidedKg: 27.30 },
  { date: '2026-03-19', totalKg: 0, costEur: 0, co2AvoidedKg: 0 },
]

export const WASTE_REASONS_LABELS: Record<string, string> = {
  overproduction: 'Overproduction',
  spoiled: 'Spoiled',
  'plate-waste': 'Plate Waste',
  other: 'Other',
}
