import { create } from 'zustand'
import type {
  User,
  Batch,
  PrepItem,
  WasteEntry,
  CookPlanAdjustment,
  BatchStatus,
  WasteReason,
} from '../types'
import { TODAY_COOK_PLAN } from '../data/cookPlans'
import { PREP_ITEMS } from '../data/prepList'
import { WASTE_ENTRIES } from '../data/wasteLog'

interface AppState {
  // Auth
  user: User | null
  isLoggedIn: boolean
  login: (user: User) => void
  logout: () => void

  // Cook Plan
  batches: Batch[]
  adjustments: CookPlanAdjustment[]
  updateBatchStatus: (batchId: string, status: BatchStatus) => void
  adjustTrays: (dishId: string, newTotal: number, reason: string) => void

  // Prep List
  prepItems: PrepItem[]
  togglePrepItem: (itemId: string) => void

  // Waste
  wasteEntries: WasteEntry[]
  addWasteEntry: (dishId: string, kg: number, reason: WasteReason) => void
  removeWasteEntry: (entryId: string) => void

  // Current date for the app
  currentDate: string
}

export const useStore = create<AppState>((set) => ({
  // Auth
  user: null,
  isLoggedIn: false,
  login: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),

  // Cook Plan
  batches: TODAY_COOK_PLAN.batches,
  adjustments: TODAY_COOK_PLAN.adjustments,
  updateBatchStatus: (batchId, status) =>
    set((state) => ({
      batches: state.batches.map((b) =>
        b.id === batchId ? { ...b, status } : b
      ),
    })),
  adjustTrays: (dishId, newTotal, reason) =>
    set((state) => {
      const currentTrays = state.batches.filter(
        (b) => b.dishId === dishId && !b.isBackup
      ).length
      const adjustment: CookPlanAdjustment = {
        id: `adj-${Date.now()}`,
        dishId,
        previousTrays: currentTrays,
        newTrays: newTotal,
        reason,
        timestamp: new Date().toISOString(),
      }
      return {
        adjustments: [...state.adjustments, adjustment],
      }
    }),

  // Prep List
  prepItems: PREP_ITEMS,
  togglePrepItem: (itemId) =>
    set((state) => ({
      prepItems: state.prepItems.map((p) =>
        p.id === itemId ? { ...p, completed: !p.completed } : p
      ),
    })),

  // Waste
  wasteEntries: WASTE_ENTRIES,
  addWasteEntry: (dishId, kg, reason) =>
    set((state) => ({
      wasteEntries: [
        ...state.wasteEntries,
        {
          id: `w-${Date.now()}`,
          dishId,
          date: state.currentDate,
          kg,
          reason,
          timestamp: new Date().toISOString(),
        },
      ],
    })),
  removeWasteEntry: (entryId) =>
    set((state) => ({
      wasteEntries: state.wasteEntries.filter((e) => e.id !== entryId),
    })),

  // Current date
  currentDate: '2026-03-19',
}))
