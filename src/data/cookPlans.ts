import type { CookPlan } from '../types'

export const TODAY_COOK_PLAN: CookPlan = {
  date: '2026-03-19',
  batches: [
    // Schweinebraten - 8 trays + 2 backup
    { id: 'sb-1', dishId: 'schweinebraten', trayNumber: 1, totalTrays: 8, startTime: '07:30', endTime: '09:00', status: 'done', isBackup: false },
    { id: 'sb-2', dishId: 'schweinebraten', trayNumber: 2, totalTrays: 8, startTime: '07:30', endTime: '09:00', status: 'done', isBackup: false },
    { id: 'sb-3', dishId: 'schweinebraten', trayNumber: 3, totalTrays: 8, startTime: '08:00', endTime: '09:30', status: 'done', isBackup: false },
    { id: 'sb-4', dishId: 'schweinebraten', trayNumber: 4, totalTrays: 8, startTime: '08:00', endTime: '09:30', status: 'done', isBackup: false },
    { id: 'sb-5', dishId: 'schweinebraten', trayNumber: 5, totalTrays: 8, startTime: '09:00', endTime: '10:30', status: 'in-progress', isBackup: false },
    { id: 'sb-6', dishId: 'schweinebraten', trayNumber: 6, totalTrays: 8, startTime: '09:00', endTime: '10:30', status: 'in-progress', isBackup: false },
    { id: 'sb-7', dishId: 'schweinebraten', trayNumber: 7, totalTrays: 8, startTime: '10:00', endTime: '11:30', status: 'upcoming', isBackup: false },
    { id: 'sb-8', dishId: 'schweinebraten', trayNumber: 8, totalTrays: 8, startTime: '10:00', endTime: '11:30', status: 'upcoming', isBackup: false },
    { id: 'sb-b1', dishId: 'schweinebraten', trayNumber: 9, totalTrays: 10, startTime: '12:00', endTime: '13:00', status: 'upcoming', isBackup: true },
    { id: 'sb-b2', dishId: 'schweinebraten', trayNumber: 10, totalTrays: 10, startTime: '12:00', endTime: '13:00', status: 'upcoming', isBackup: true },

    // Hähnchen Curry - 7 trays + 1 backup
    { id: 'hc-1', dishId: 'haehnchen-curry', trayNumber: 1, totalTrays: 7, startTime: '08:00', endTime: '09:30', status: 'done', isBackup: false },
    { id: 'hc-2', dishId: 'haehnchen-curry', trayNumber: 2, totalTrays: 7, startTime: '08:00', endTime: '09:30', status: 'done', isBackup: false },
    { id: 'hc-3', dishId: 'haehnchen-curry', trayNumber: 3, totalTrays: 7, startTime: '08:30', endTime: '10:00', status: 'done', isBackup: false },
    { id: 'hc-4', dishId: 'haehnchen-curry', trayNumber: 4, totalTrays: 7, startTime: '09:00', endTime: '10:30', status: 'in-progress', isBackup: false },
    { id: 'hc-5', dishId: 'haehnchen-curry', trayNumber: 5, totalTrays: 7, startTime: '09:30', endTime: '11:00', status: 'upcoming', isBackup: false },
    { id: 'hc-6', dishId: 'haehnchen-curry', trayNumber: 6, totalTrays: 7, startTime: '10:00', endTime: '11:30', status: 'upcoming', isBackup: false },
    { id: 'hc-7', dishId: 'haehnchen-curry', trayNumber: 7, totalTrays: 7, startTime: '10:30', endTime: '12:00', status: 'upcoming', isBackup: false },
    { id: 'hc-b1', dishId: 'haehnchen-curry', trayNumber: 8, totalTrays: 8, startTime: '12:00', endTime: '13:00', status: 'upcoming', isBackup: true },

    // Gemüse-Lasagne - 6 trays + 2 backup
    { id: 'gl-1', dishId: 'gemuese-lasagne', trayNumber: 1, totalTrays: 6, startTime: '07:30', endTime: '09:00', status: 'done', isBackup: false },
    { id: 'gl-2', dishId: 'gemuese-lasagne', trayNumber: 2, totalTrays: 6, startTime: '07:30', endTime: '09:00', status: 'done', isBackup: false },
    { id: 'gl-3', dishId: 'gemuese-lasagne', trayNumber: 3, totalTrays: 6, startTime: '08:30', endTime: '10:00', status: 'in-progress', isBackup: false },
    { id: 'gl-4', dishId: 'gemuese-lasagne', trayNumber: 4, totalTrays: 6, startTime: '09:30', endTime: '11:00', status: 'upcoming', isBackup: false },
    { id: 'gl-5', dishId: 'gemuese-lasagne', trayNumber: 5, totalTrays: 6, startTime: '10:00', endTime: '11:30', status: 'upcoming', isBackup: false },
    { id: 'gl-6', dishId: 'gemuese-lasagne', trayNumber: 6, totalTrays: 6, startTime: '10:30', endTime: '12:00', status: 'upcoming', isBackup: false },
    { id: 'gl-b1', dishId: 'gemuese-lasagne', trayNumber: 7, totalTrays: 8, startTime: '12:00', endTime: '13:00', status: 'upcoming', isBackup: true },
    { id: 'gl-b2', dishId: 'gemuese-lasagne', trayNumber: 8, totalTrays: 8, startTime: '12:00', endTime: '13:00', status: 'upcoming', isBackup: true },

    // Kartoffelsuppe - 6 trays, no backup
    { id: 'ks-1', dishId: 'kartoffelsuppe', trayNumber: 1, totalTrays: 6, startTime: '08:00', endTime: '09:00', status: 'done', isBackup: false },
    { id: 'ks-2', dishId: 'kartoffelsuppe', trayNumber: 2, totalTrays: 6, startTime: '08:00', endTime: '09:00', status: 'done', isBackup: false },
    { id: 'ks-3', dishId: 'kartoffelsuppe', trayNumber: 3, totalTrays: 6, startTime: '09:00', endTime: '10:00', status: 'done', isBackup: false },
    { id: 'ks-4', dishId: 'kartoffelsuppe', trayNumber: 4, totalTrays: 6, startTime: '09:30', endTime: '10:30', status: 'in-progress', isBackup: false },
    { id: 'ks-5', dishId: 'kartoffelsuppe', trayNumber: 5, totalTrays: 6, startTime: '10:00', endTime: '11:00', status: 'upcoming', isBackup: false },
    { id: 'ks-6', dishId: 'kartoffelsuppe', trayNumber: 6, totalTrays: 6, startTime: '10:30', endTime: '11:30', status: 'upcoming', isBackup: false },

    // Bunter Salatteller - 6 trays + 2 backup
    { id: 'st-1', dishId: 'salatteller', trayNumber: 1, totalTrays: 6, startTime: '08:00', endTime: '08:30', status: 'done', isBackup: false },
    { id: 'st-2', dishId: 'salatteller', trayNumber: 2, totalTrays: 6, startTime: '08:00', endTime: '08:30', status: 'done', isBackup: false },
    { id: 'st-3', dishId: 'salatteller', trayNumber: 3, totalTrays: 6, startTime: '09:00', endTime: '09:30', status: 'done', isBackup: false },
    { id: 'st-4', dishId: 'salatteller', trayNumber: 4, totalTrays: 6, startTime: '09:30', endTime: '10:00', status: 'in-progress', isBackup: false },
    { id: 'st-5', dishId: 'salatteller', trayNumber: 5, totalTrays: 6, startTime: '10:00', endTime: '10:30', status: 'upcoming', isBackup: false },
    { id: 'st-6', dishId: 'salatteller', trayNumber: 6, totalTrays: 6, startTime: '10:30', endTime: '11:00', status: 'upcoming', isBackup: false },
    { id: 'st-b1', dishId: 'salatteller', trayNumber: 7, totalTrays: 8, startTime: '11:30', endTime: '12:00', status: 'upcoming', isBackup: true },
    { id: 'st-b2', dishId: 'salatteller', trayNumber: 8, totalTrays: 8, startTime: '11:30', endTime: '12:00', status: 'upcoming', isBackup: true },
  ],
  adjustments: [],
}
