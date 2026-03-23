import type { Dish, Cafeteria } from '../types'

export const CAFETERIA: Cafeteria = {
  name: 'TU Munich Mensa Garching',
  dailyCapacity: 1200,
  operatingHours: { start: '11:00', end: '14:00' },
  lines: [
    { id: 'main', name: 'Main' },
    { id: 'veggie', name: 'Veggie' },
    { id: 'soup', name: 'Soup/Salad' },
  ],
  staffOnDuty: { cooks: 8, prepAssistants: 4 },
}

export const DISHES: Dish[] = [
  {
    id: 'schweinebraten',
    name: 'Roast Pork with Dumplings',
    line: 'Main',
    traySize: 40,
    maxTrays: 12,
    shelfLife: '2h hot-hold',
  },
  {
    id: 'haehnchen-curry',
    name: 'Chicken Curry with Rice',
    line: 'Main',
    traySize: 35,
    maxTrays: 10,
    shelfLife: '3h hot-hold',
  },
  {
    id: 'gemuese-lasagne',
    name: 'Vegetable Lasagna',
    line: 'Veggie',
    traySize: 30,
    maxTrays: 8,
    shelfLife: '2.5h hot-hold',
  },
  {
    id: 'kartoffelsuppe',
    name: 'Potato Soup',
    line: 'Soup',
    traySize: 50,
    maxTrays: 6,
    shelfLife: '4h hot-hold',
  },
  {
    id: 'salatteller',
    name: 'Mixed Salad Plate',
    line: 'Salad',
    traySize: 25,
    maxTrays: 10,
    shelfLife: '6h cold',
  },
]

export function getDishById(id: string): Dish | undefined {
  return DISHES.find((d) => d.id === id)
}
