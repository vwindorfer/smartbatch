# SmartBatch Documentation & Usage Guide

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Getting Started](#2-getting-started)
3. [Architecture](#3-architecture)
4. [Application Pages & Usage](#4-application-pages--usage)
5. [Data Model Reference](#5-data-model-reference)
6. [State Management](#6-state-management)
7. [Backend Integration Guide](#7-backend-integration-guide)
8. [Machine Learning Integration Guide](#8-machine-learning-integration-guide)
9. [Component Library](#9-component-library)
10. [Design System](#10-design-system)

---

## 1. Project Overview

### What is SmartBatch?

SmartBatch is a tablet-first web application designed for institutional cafeteria kitchens. It helps kitchen staff predict meal demand, plan cooking schedules in trays and batches, track food waste, and measure sustainability impact aligned with SDG 12.3.

### Target Users

- **Cooks** in university, corporate, and hospital cafeterias
- **Kitchen managers** overseeing daily operations and reporting
- Staff working in fast-paced, hands-busy environments (wet/gloved hands, time pressure)

### Demo Context

The app is pre-configured with demo data for **TU Munich Mensa Garching**:
- ~1,200 meals served per day
- Operating hours: 11:00 - 14:00
- 3 service lines (Main, Veggie, Soup/Salad)
- 8 cooks + 4 prep assistants on duty
- Demo date: Thursday, March 19, 2026

### Key Features

| Feature | Description |
|---------|-------------|
| Demand Forecasting | ML-predicted portion counts per dish with confidence scores |
| Cook Plan | Tray-level batch scheduling on a visual timeline (07:00-14:00) |
| Prep List | Time-blocked checklist for kitchen preparation tasks |
| Waste Tracking | Quick-log form with reason categorization and daily summaries |
| Impact Reporting | KPI dashboard (kg saved, money saved, CO2 avoided, meals redirected) |
| Meal Redirect | Surplus food redistribution to partner organizations |
| History | Calendar view comparing planned vs. actual tray usage and accuracy |

---

## 2. Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20 LTS)
- npm 9+ or yarn/pnpm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd smartbatch

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

### Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.x | UI framework |
| TypeScript | 5.9 | Type safety |
| Vite | 8.x | Build tool and dev server |
| Tailwind CSS | 4.x | Utility-first styling |
| React Router | 7.x | Client-side routing |
| Zustand | 5.x | Lightweight state management |
| Recharts | 3.x | Data visualization (charts) |
| Lucide React | 0.577 | Icon library |

---

## 3. Architecture

### Project Structure

```
smartbatch/
├── docs/
│   └── DOCUMENTATION.md        # This file
├── public/
│   └── favicon.svg
├── src/
│   ├── main.tsx                 # App entry point
│   ├── App.tsx                  # Router configuration
│   ├── index.css                # Tailwind imports, CSS variables, animations
│   ├── types/
│   │   └── index.ts             # All TypeScript interfaces
│   ├── data/                    # Dummy data (to be replaced by API calls)
│   │   ├── dishes.ts            # Menu items and cafeteria config
│   │   ├── forecasts.ts         # ML prediction data
│   │   ├── cookPlans.ts         # Batch schedules
│   │   ├── wasteLog.ts          # Waste entries and summaries
│   │   ├── impact.ts            # Impact metrics and redirect items
│   │   └── prepList.ts          # Preparation task list
│   ├── store/
│   │   └── useStore.ts          # Zustand global store
│   ├── hooks/
│   │   ├── useSimulatedLoading.ts
│   │   ├── usePullToRefresh.ts
│   │   └── useToast.ts
│   ├── components/
│   │   ├── layout/              # App shell, navigation, headers
│   │   ├── shared/              # Reusable UI components
│   │   ├── dashboard/           # Dashboard-specific components
│   │   ├── cookplan/            # Cook plan components
│   │   ├── waste/               # Waste tracking components
│   │   └── impact/              # Impact report components
│   └── pages/                   # 10 page components
├── CLAUDE.md                    # AI development instructions
├── package.json
├── tsconfig.json
├── vite.config.ts
└── index.html
```

### Routing

All routes are defined in `src/App.tsx`:

| Route | Page | Parent Tab | Description |
|-------|------|------------|-------------|
| `/login` | LoginPage | — | Authentication (demo: auto-login) |
| `/dashboard` | DashboardPage | Dashboard | Morning briefing overview |
| `/forecast` | ForecastPage | Dashboard | Demand predictions per dish |
| `/settings` | SettingsPage | Dashboard | Kitchen configuration |
| `/cook-plan` | CookPlanPage | Cook Plan | Timeline + batch management |
| `/cook-plan/prep` | PrepListPage | Cook Plan | Preparation checklist |
| `/cook-plan/history` | HistoryPage | Cook Plan | Plan vs. actual comparison |
| `/waste` | WasteTrackerPage | Waste | Waste logging and analytics |
| `/waste/redirect` | MealRedirectPage | Waste | Surplus food redistribution |
| `/impact` | ImpactPage | Impact | Sustainability KPIs |
| `*` | — | — | Redirects to `/login` |

### Navigation Flow

```
Bottom Nav (4 tabs)
├── Dashboard
│   ├── → Forecast (via link, card tap, or alert)
│   └── → Settings (via gear icon)
├── Cook Plan
│   ├── → Prep List (via header button)
│   └── → History (via header button)
├── Waste Tracker
│   └── → Meal Redirect (via CTA button)
└── Impact Report
```

All secondary pages have a back arrow button to return to their parent.

---

## 4. Application Pages & Usage

### 4.1 Login Page

**Path:** `/login`

The login page displays a simple email/password form with the SmartBatch logo. For the demo, two entry points exist:
- **"Sign In" button** — logs in with a demo user (Maria Schmidt, Kitchen Manager)
- **"Skip to Demo Mode" link** — same behavior, quicker access

Both bypass authentication and navigate directly to the Dashboard. The SSO button is a placeholder for future university identity provider integration.

### 4.2 Dashboard

**Path:** `/dashboard`

The "morning briefing" screen. A cook opens this at 7 AM and immediately knows their day.

**Sections:**
1. **Today's Overview** — Current date, weather (18°C, partly cloudy), event status ("No events today")
2. **Alert Banner** — Amber warning for any dish with forecast confidence below 70% (e.g., Mixed Salad Plate at 68%). Tapping navigates to the Forecast page.
3. **Today's Dishes** — 5 large dish cards showing:
   - Dish name and service line
   - Tray progress (e.g., "3 / 6 Trays")
   - Confidence badge (green/amber/red)
   - Prep status chip (Not Started / In Prep / Ready)
   - Tapping any card navigates to the Forecast page
4. **At a Glance** — 3 metric cards:
   - Yesterday's waste (kg with trend)
   - Forecast accuracy (%)
   - Meals redirected this month (count with trend)

**Pull-to-refresh** is supported (pull down to reload).

### 4.3 Forecast Page

**Path:** `/forecast`

Detailed demand predictions for each dish.

**Sections:**
1. **Day Picker** — Mon-Fri buttons to select which day's forecast to view. Thursday (today) is highlighted.
2. **Dish Forecast Cards** — One expandable card per dish showing:
   - Dish name, line, recommended trays, backup count
   - Predicted portion count (large number)
   - Confidence badge
   - Factor chips (Weekday, Weather, Events, Semester, etc.)
   - 7-day sparkline showing demand history
   - **Expanded view** (tap to expand):
     - Factor contributions with directional indicators (e.g., "Weekday +12%", "Weather -3%")
     - Larger 7-day history sparkline with data points

### 4.4 Cook Plan Page

**Path:** `/cook-plan`

The central feature. Answers: "What do I cook, when, how much?"

**Sections:**
1. **Daily Overview** — Horizontal scrollable Gantt-style timeline from 07:00 to 14:00 showing prep/cook/hold phases per dish with a red "now" marker.
2. **Dishes & Trays** — One section per dish containing:
   - Dish name with confidence badge
   - Line info, portions per tray, shelf life
   - **Tray counter** — Shows completed vs. total (e.g., "3 / 8 done") with large +/- buttons for live adjustments
   - **Batch card grid** — 2-column grid of individual batch cards, each showing:
     - Tray number (e.g., "Tray 3 / 8")
     - Time range (e.g., "09:00 – 10:30")
     - Color-coded left border: green (done), amber (in progress), gray (upcoming)
     - Status chip
   - **Backup indicator** — Shows count of backup trays prepped (if any)

**Live Adjustment Panel:**
Tapping the +/- buttons or a batch card opens a slide-up panel where you can:
1. Adjust the tray count with large +/- buttons
2. Select a reason (Sold out faster, Event cancelled, Weather change, Higher demand than expected, Other)
3. Save the adjustment

**Navigation:** Header buttons link to Prep List and History.

### 4.5 Prep List Page

**Path:** `/cook-plan/prep`

A time-blocked preparation checklist.

**Sections:**
1. **Progress Bar** — Shows completed/total count (e.g., "4/12") with a visual bar and time estimates (Total and Remaining minutes).
2. **Time Blocks** — Three sections with completion badges:
   - **Early AM (6:00-8:00):** Peel potatoes, dice onions, marinate pork, prepare dumpling dough
   - **Mid AM (8:00-10:00):** Cut vegetables, cook curry sauce, wash rice, béchamel sauce
   - **Before Service (10:00-11:00):** Wash salad, mix dressings, season soup, check tray setup
3. **Checklist Items** — Each item shows:
   - Checkbox with check-mark animation on toggle
   - Ingredient name (strikethrough when completed)
   - Quantity, estimated time
   - "Shared" badge if the ingredient is used in multiple dishes
   - Associated dish names

When all items are completed, a celebration empty state appears ("All done! All prep tasks are complete. Ready for service.")

### 4.6 Waste Tracker Page

**Path:** `/waste`

Quick waste logging and analysis.

**Sections:**
1. **Log Waste** — 4-step form:
   - Step 1: Select dish (2-column grid of dish buttons)
   - Step 2: Enter weight with presets (1kg, 2kg, 5kg) or custom +/- stepper
   - Step 3: Select reason (Overproduction, Spoiled, Plate Waste, Other)
   - Step 4: Save button (disabled until all fields are filled)
2. **Today** — Summary section with:
   - 3 metric cards: Today's waste (kg), Cost (€), CO2 (kg)
   - Entry list with swipe-to-delete (or X button on desktop)
   - Empty state when no entries exist
3. **Weekly Overview** — Bar chart showing waste per day, color-coded by severity (green ≤18kg, amber ≤25kg, red >25kg)
4. **Breakdown by Reason** — Donut chart with legend showing percentage breakdown by waste reason
5. **Redirect Meal CTA** — Link to the Meal Redirect page

### 4.7 Impact Report Page

**Path:** `/impact`

Sustainability KPIs and trend visualization.

**Sections:**
1. **Hero Metrics** — 2x2 grid of large metric cards:
   - Waste Avoided: 342 kg (-23% vs. last month)
   - Money Saved: €1,197 (+18%)
   - CO2 Avoided: 513 kg (+15%)
   - Meals Redirected: 89 (+12 this week)
2. **Period Comparison** — Green banner: "23% less waste than last month (February: 445 kg → March: 342 kg)"
3. **Trend Charts** — Two area charts with gradient fills:
   - Waste Avoided (kg/week) — 8-week trend
   - Money Saved (€/week) — 8-week trend
4. **SDG 12.3 Alignment** — Progress card showing:
   - Goal explanation ("SDG 12.3 calls for halving food waste by 2030")
   - Progress bar (34% of 50% target = 68% of the way)
   - Projection text ("At the current pace, the target is expected to be reached by end of 2028")
5. **Share Report** — Button placeholder (shows "Coming soon" toast)

### 4.8 History Page

**Path:** `/cook-plan/history`

Calendar-based historical view of cook plan performance.

**Sections:**
1. **Calendar Week View** — 4 weeks displayed as rows. Each day shows:
   - Weekday abbreviation
   - Date number
   - Accuracy dot (green >85%, amber 70-85%, red <70%)
   - Tap to expand day detail
2. **Legend** — Color key for accuracy dots
3. **Day Detail** (when a day is selected):
   - Date and accuracy percentage (color-coded)
   - Total waste for the day
   - Per-dish breakdown: Planned vs. Actual tray counts, color-coded match/mismatch
4. **Accuracy Trend** — Line chart of accuracy over ~20 working days with reference lines at 85% and 70%

### 4.9 Settings Page

**Path:** `/settings`

Kitchen configuration and preferences.

**Sections:**
1. **Kitchen Profile** — Name, daily capacity (portions), opening/closing times
2. **Equipment** — List of kitchen equipment:
   - 3 Combi Ovens (20/20/10 GN 1/1 capacity)
   - 2 Holding Cabinets (8 GN 1/1 each)
   - 1 Salamander (4 GN 1/1)
3. **Staff per Shift** — Number of cooks and prep helpers
4. **Tray Sizes (Default)** — Portions per tray for each dish
5. **Notifications** — Toggle switches for:
   - Low Confidence Warning (forecasts below 70%)
   - Prep Reminders (30 min before each time block)
   - Daily Report (summary at 3:00 PM)
6. **Save Button** — Shows success toast on tap

### 4.10 Meal Redirect Page

**Path:** `/waste/redirect`

Surplus food redistribution management.

**Sections:**
1. **Available Surplus** — List of surplus items with:
   - Dish name and portion/tray count
   - Status badge (Available / Claimed / Expired)
   - Time remaining countdown
   - "Report Redirect" button for available items (marks as Claimed)
   - Expired items shown with reduced opacity
2. **Partner Organizations** — Contact cards:
   - Münchner Tafel (phone + email)
   - TU Social Fund (phone + email)

---

## 5. Data Model Reference

All TypeScript interfaces are defined in `src/types/index.ts`. This section covers each domain model in detail.

### 5.1 Core Entities

#### Dish

```typescript
interface Dish {
  id: string              // URL-safe slug (e.g., 'schweinebraten')
  name: string            // Display name (e.g., 'Roast Pork with Dumplings')
  line: DishLine          // Service line: 'Main' | 'Veggie' | 'Soup' | 'Salad'
  traySize: number        // Portions per tray (e.g., 40)
  maxTrays: number        // Maximum trays per day (e.g., 12)
  shelfLife: string       // Display string (e.g., '2h hot-hold')
  image?: string          // Optional image URL (not used in demo)
}
```

#### Cafeteria

```typescript
interface Cafeteria {
  name: string
  dailyCapacity: number           // Total portions per day
  operatingHours: { start: string; end: string }  // 'HH:mm' format
  lines: CafeteriaLine[]
  staffOnDuty: { cooks: number; prepAssistants: number }
}
```

### 5.2 Forecast Models

#### DishForecast

```typescript
interface DishForecast {
  dishId: string
  date: string                    // 'YYYY-MM-DD'
  predictedDemand: number         // Predicted portions
  confidence: number              // 0-100 percentage
  confidenceLevel: ConfidenceLevel  // 'high' | 'medium' | 'low'
  recommendedTrays: number        // ML-recommended tray count
  backupTrays: number             // Additional backup trays
  factors: ForecastFactor[]       // Contributing factors
  historicalDemand: number[]      // Last 7 days demand array
}

interface ForecastFactor {
  label: string                   // e.g., 'Weather', 'Weekday'
  impact: 'positive' | 'negative' | 'neutral'
}
```

**Confidence thresholds:**
- High: ≥ 80%
- Medium: 70-79%
- Low: < 70%

### 5.3 Cook Plan Models

#### Batch

```typescript
interface Batch {
  id: string
  dishId: string
  trayNumber: number              // Position in sequence (1-based)
  totalTrays: number              // Total regular trays for this dish
  startTime: string               // 'HH:mm'
  endTime: string                 // 'HH:mm'
  status: BatchStatus             // 'upcoming' | 'in-progress' | 'done'
  isBackup: boolean               // Backup trays shown separately
}

interface CookPlanAdjustment {
  id: string
  dishId: string
  previousTrays: number
  newTrays: number
  reason: string
  timestamp: string               // ISO 8601
}
```

### 5.4 Prep List Model

```typescript
interface PrepItem {
  id: string
  ingredient: string              // Task description
  quantity: string                 // Amount with unit (e.g., '25 kg', '20 L')
  associatedDishes: string[]      // Array of dish IDs
  timeBlock: TimeBlock            // 'early-am' | 'mid-am' | 'before-service'
  estimatedMinutes: number
  completed: boolean
  isShared: boolean               // Used in multiple dishes
}
```

### 5.5 Waste Models

```typescript
interface WasteEntry {
  id: string
  dishId: string
  date: string                    // 'YYYY-MM-DD'
  kg: number
  reason: WasteReason             // 'overproduction' | 'spoiled' | 'plate-waste' | 'other'
  timestamp: string               // ISO 8601
}

interface DailyWasteSummary {
  date: string
  totalKg: number
  costEur: number                 // Calculated: kg × €3.50/kg
  co2AvoidedKg: number            // Calculated: kg × 1.5 kg CO2/kg food
}
```

### 5.6 Impact Models

```typescript
interface ImpactMetrics {
  period: string                  // e.g., 'March 2026'
  wasteAvoidedKg: number
  moneySavedEur: number
  co2AvoidedKg: number
  mealsRedirected: number
  forecastAccuracy: number        // 0-100%
}

interface WeeklyImpact {
  weekLabel: string               // e.g., 'W1 Mar'
  wasteAvoidedKg: number
  moneySavedEur: number
  co2AvoidedKg: number
}
```

### 5.7 User & Auth

```typescript
interface User {
  id: string
  name: string
  email: string
  role: 'cook' | 'kitchen-manager' | 'admin'
  cafeteriaId: string
}
```

---

## 6. State Management

The app uses a single Zustand store defined in `src/store/useStore.ts`.

### Store Shape

```typescript
interface AppState {
  // Authentication
  user: User | null
  isLoggedIn: boolean

  // Cook Plan
  batches: Batch[]
  adjustments: CookPlanAdjustment[]

  // Prep List
  prepItems: PrepItem[]

  // Waste Tracking
  wasteEntries: WasteEntry[]

  // App
  currentDate: string             // '2026-03-19' (demo)
}
```

### Store Actions

| Action | Signature | Description |
|--------|-----------|-------------|
| `login` | `(user: User) => void` | Set user and isLoggedIn flag |
| `logout` | `() => void` | Clear user, reset to logged out |
| `updateBatchStatus` | `(batchId: string, status: BatchStatus) => void` | Update a batch's status |
| `adjustTrays` | `(dishId: string, newTotal: number, reason: string) => void` | Add/remove batches and log adjustment |
| `togglePrepItem` | `(itemId: string) => void` | Toggle prep item completion |
| `addWasteEntry` | `(dishId: string, kg: number, reason: WasteReason) => void` | Create new waste entry with auto-generated ID and timestamp |
| `removeWasteEntry` | `(entryId: string) => void` | Delete a waste entry |

### Initial State

On app load, the store is initialized with:
- `batches`: 40 batch objects from `src/data/cookPlans.ts` (today's cook plan)
- `prepItems`: 12 items from `src/data/prepList.ts` (4 completed, 8 pending)
- `wasteEntries`: 10 historical entries from `src/data/wasteLog.ts`
- `currentDate`: `'2026-03-19'`

**Important:** All state is in-memory only. It resets on page reload. There is no persistence layer.

---

## 7. Backend Integration Guide

This section is for the team member(s) building the API backend. The frontend currently uses static dummy data files in `src/data/`. Each file maps to one or more API endpoints that need to be created.

### 7.1 Files to Replace with API Calls

| Current File | Suggested API Endpoint | HTTP Method | Description |
|-------------|----------------------|-------------|-------------|
| `dishes.ts` | `GET /api/cafeterias/:id/dishes` | GET | Menu items for a cafeteria |
| `forecasts.ts` | `GET /api/forecasts?date=YYYY-MM-DD` | GET | Predictions for a given date |
| `cookPlans.ts` | `GET /api/cook-plans?date=YYYY-MM-DD` | GET | Batch schedule for a date |
| `cookPlans.ts` | `PUT /api/cook-plans/:id/batches/:batchId` | PUT | Update batch status |
| `cookPlans.ts` | `POST /api/cook-plans/:id/adjustments` | POST | Log a tray adjustment |
| `prepList.ts` | `GET /api/prep-lists?date=YYYY-MM-DD` | GET | Prep items for a date |
| `prepList.ts` | `PATCH /api/prep-items/:id` | PATCH | Toggle prep item completion |
| `wasteLog.ts` | `GET /api/waste?date=YYYY-MM-DD` | GET | Waste entries for a date |
| `wasteLog.ts` | `POST /api/waste` | POST | Log new waste entry |
| `wasteLog.ts` | `DELETE /api/waste/:id` | DELETE | Delete waste entry |
| `wasteLog.ts` | `GET /api/waste/summary?from=&to=` | GET | Aggregated waste summaries |
| `impact.ts` | `GET /api/impact?period=YYYY-MM` | GET | Monthly impact metrics |
| `impact.ts` | `GET /api/impact/weekly?weeks=8` | GET | Weekly impact trend data |
| `impact.ts` | `GET /api/redirects` | GET | Surplus items for redirect |
| `impact.ts` | `POST /api/redirects/:id/claim` | POST | Claim a redirect item |

### 7.2 Authentication

The current login is cosmetic. To integrate real auth:

1. Replace `LoginPage` demo login with actual API call:
   ```typescript
   POST /api/auth/login
   Body: { email: string, password: string }
   Response: { user: User, token: string }
   ```
2. Add SSO integration (university identity provider)
3. Store JWT/session token and include in API headers
4. Add route guards in `App.tsx` (currently all routes are accessible)

### 7.3 Real-Time Updates

The app currently simulates updates with pull-to-refresh (500ms delay). For production:

- **WebSocket** or **Server-Sent Events** for live batch status updates during service
- Batch status changes should be broadcast to all connected kitchen tablets
- Consider polling as a simpler fallback (every 30-60 seconds during operating hours)

### 7.4 Persistence

All state is currently in-memory via Zustand. For production:

- Replace `useStore` actions with API calls + optimistic UI updates
- Consider offline-first with local storage + background sync (kitchen WiFi may be unreliable)
- Service worker for caching static assets and enabling offline access

### 7.5 Calculation Constants

The frontend uses these hardcoded conversion factors. They should eventually come from the backend/settings:

| Constant | Value | Location |
|----------|-------|----------|
| Cost per kg waste | €3.50 | `WasteSummary.tsx` |
| CO2 per kg waste | 1.5 kg CO2e | `WasteSummary.tsx` |

---

## 8. Machine Learning Integration Guide

This section is for the team member(s) building the demand forecasting ML model.

### 8.1 What the Frontend Expects

The forecast page consumes a `DishForecast` object per dish per day. Your ML model needs to produce:

```typescript
{
  dishId: string,                 // Must match dish IDs in the system
  date: string,                   // 'YYYY-MM-DD'
  predictedDemand: number,        // Integer, total portions
  confidence: number,             // 0-100, continuous
  confidenceLevel: 'high' | 'medium' | 'low',  // Derived from confidence
  recommendedTrays: number,       // = ceil(predictedDemand / dish.traySize)
  backupTrays: number,            // Extra trays for safety (based on confidence)
  factors: [
    { label: string, impact: 'positive' | 'negative' | 'neutral' }
  ],
  historicalDemand: number[]      // Last 7 days actual demand
}
```

### 8.2 Confidence Level Mapping

The frontend maps continuous confidence scores to discrete levels:

| Score Range | Level | UI Color | Behavior |
|-------------|-------|----------|----------|
| ≥ 80 | `high` | Green (#16A34A) | Normal display |
| 70-79 | `medium` | Amber (#E5A100) | Shown in alerts |
| < 70 | `low` | Red (#DC2626) | Alert banner on Dashboard, suggests checking inputs |

### 8.3 Tray Calculation

The recommended tray count is what the ML model or a business rule layer should produce:

```
recommendedTrays = ceil(predictedDemand / dish.traySize)
```

Backup trays follow a suggested heuristic based on confidence:
- High confidence (≥80%): 0 backup trays
- Medium confidence (70-79%): +1-2 backup trays
- Low confidence (<70%): +2 backup trays

### 8.4 Factor Attribution

The `factors` array describes what influenced the prediction. The frontend displays these as colored chips. Each factor should include:

- `label`: Human-readable name (e.g., "Weather", "Weekday", "Events", "Semester")
- `impact`: Direction of influence on demand

For the expanded forecast view, the frontend also displays **factor contributions** with percentage values. This data is currently hardcoded in `ForecastPage.tsx` as `FACTOR_CONTRIBUTIONS`. Your model should provide:

```typescript
{
  label: string,       // e.g., 'Weekday'
  value: string,       // e.g., '+12%'
  positive: boolean | null  // true = increases demand, false = decreases, null = neutral
}
```

### 8.5 Input Features (Suggested)

Based on the current dummy data, the model should consider:

| Feature | Type | Description |
|---------|------|-------------|
| Day of week | Categorical | Strong weekday patterns in cafeteria demand |
| Weather | Continuous/Cat | Temperature, conditions (affects soup/salad demand) |
| Academic calendar | Boolean | Semester in session, exam period, holidays |
| Events | Boolean/Text | Campus events, conferences, sports games |
| Historical demand | Time series | Past 7-30 days of actual demand per dish |
| Menu composition | Categorical | What other dishes compete that day |
| Trending preferences | Continuous | Long-term shifts (e.g., growing veggie demand) |

### 8.6 API Contract

Suggested endpoint for the ML service:

```
GET /api/forecasts?date=2026-03-19&cafeteriaId=mensa-garching

Response: {
  date: "2026-03-19",
  cafeteriaId: "mensa-garching",
  forecasts: [
    {
      dishId: "schweinebraten",
      predictedDemand: 320,
      confidence: 87,
      confidenceLevel: "high",
      recommendedTrays: 8,
      backupTrays: 2,
      factors: [...],
      historicalDemand: [290, 310, 305, 330, 315, 325, 320],
      factorContributions: [
        { label: "Weekday", value: "+12%", positive: true },
        { label: "Weather", value: "-3%", positive: false }
      ]
    },
    // ... one per dish
  ]
}
```

### 8.7 Evaluation Metrics

The app tracks **Forecast Accuracy** on the Impact page (currently 84%). This should be computed as:

```
accuracy = 1 - |actual - predicted| / actual
```

The History page shows per-day accuracy and a 20-day trend. The ML team should provide or the backend should compute:
- Per-dish daily accuracy
- Aggregated daily accuracy
- Rolling accuracy trend

---

## 9. Component Library

### Shared Components

| Component | File | Props | Description |
|-----------|------|-------|-------------|
| `TrayCounter` | `shared/TrayCounter.tsx` | `count, onChange, min, max` | Large +/- stepper (64px buttons) |
| `ConfidenceBadge` | `shared/ConfidenceBadge.tsx` | `confidence, level, size` | Color-coded confidence score pill |
| `MetricCard` | `shared/MetricCard.tsx` | `icon, label, value, trend?` | KPI display card |
| `DishCard` | `shared/DishCard.tsx` | `name, line, trayCount, totalTrays, confidence, ...` | Dish summary card |
| `StatusChip` | `shared/StatusChip.tsx` | `status, size` | Small colored status pill |
| `EmptyState` | `shared/EmptyState.tsx` | `icon, title, description, action?` | Friendly empty state message |
| `LoadingSkeleton` | `shared/LoadingSkeleton.tsx` | `variant, count` | Skeleton loading placeholder |
| `Toast` | `shared/Toast.tsx` | `visible, exiting, message, variant` | Success/info toast notification |
| `PullRefreshIndicator` | `shared/PullRefreshIndicator.tsx` | `pulling, pullDistance, refreshing` | Pull-to-refresh spinner |

### Layout Components

| Component | File | Description |
|-----------|------|-------------|
| `AppShell` | `layout/AppShell.tsx` | Page wrapper with bottom nav and page transitions |
| `BottomNav` | `layout/BottomNav.tsx` | 4-tab bottom navigation (Dashboard, Cook Plan, Waste, Impact) |
| `PageHeader` | `layout/PageHeader.tsx` | Sticky header with title, subtitle, and action buttons |

### Feature Components

| Component | File | Description |
|-----------|------|-------------|
| `TodayOverview` | `dashboard/TodayOverview.tsx` | Date, weather, event status |
| `AlertBanner` | `dashboard/AlertBanner.tsx` | Low-confidence warning banner |
| `CookPlanTimeline` | `cookplan/CookPlanTimeline.tsx` | Horizontal Gantt timeline |
| `BatchCard` | `cookplan/BatchCard.tsx` | Individual tray batch card |
| `LiveAdjustment` | `cookplan/LiveAdjustment.tsx` | Slide-up tray adjustment panel |
| `WasteLogForm` | `waste/WasteLogForm.tsx` | 4-step waste entry form |
| `WasteSummary` | `waste/WasteSummary.tsx` | Today's waste metrics + entry list |
| `WeeklyChart` | `waste/WasteHistory.tsx` | Weekly waste bar chart |
| `ReasonBreakdown` | `waste/WasteHistory.tsx` | Waste reasons donut chart |
| `ImpactDashboard` | `impact/ImpactDashboard.tsx` | 2x2 hero metric cards |
| `ImpactChart` | `impact/ImpactChart.tsx` | Reusable area chart with gradient |

### Custom Hooks

| Hook | File | Returns | Description |
|------|------|---------|-------------|
| `useSimulatedLoading` | `hooks/useSimulatedLoading.ts` | `{ loading, reload }` | 500ms simulated loading delay |
| `usePullToRefresh` | `hooks/usePullToRefresh.ts` | `{ pulling, pullDistance, refreshing }` | Touch-based pull-to-refresh |
| `useToast` | `hooks/useToast.ts` | `{ visible, exiting, show }` | Toast notification controller |

---

## 10. Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#1B6B4A` | Main actions, active states, brand (forest green) |
| Primary Light | `#E8F5EE` | Backgrounds, tray counter display |
| Accent | `#E5A100` | Warnings, medium confidence, amber alerts |
| Danger | `#DC2626` | Errors, waste, low confidence, delete actions |
| Success | `#16A34A` | Completed, saved, high confidence |
| Neutral 900 | `#1A1A2E` | Body text (near-black) |
| Neutral 100 | `#F5F5F7` | Page backgrounds |
| White | `#FFFFFF` | Card surfaces |

### Typography

- System font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Minimum body text: 16px (`text-base`)
- Minimum label text: 14px (`text-sm`)
- Headers: 20-28px
- All number displays use `tabular-nums` for alignment

### Touch Targets

- Minimum interactive element: 48x48px
- Primary action buttons: 56px height (`h-14`)
- TrayCounter buttons: 64x64px (`w-16 h-16`)
- Bottom nav items: full width, 56px minimum height
- Spacing between touch targets: minimum 8px

### Animations (CSS-only, no JS libraries)

| Animation | CSS Class | Duration | Usage |
|-----------|-----------|----------|-------|
| Page fade | `animate-fade-in` | 200ms | Tab switches |
| Page slide right | `animate-slide-in-right` | 250ms | Deeper navigation |
| Page slide left | `animate-slide-in-left` | 250ms | Back navigation |
| Stagger in | `stagger-container` | 250ms + 50ms delay | Card list entrance |
| Toast enter/exit | `toast-enter` / `toast-exit` | 300ms / 200ms | Notifications |
| Count pop | `count-pop` | 200ms | Number changes |
| Check draw | `check-draw` | 300ms | SVG checkmark |
| Row flash | `row-flash` | 400ms | Item toggle feedback |
| Form flash | `form-flash` | 400ms | Form save feedback |
| Slide up | `animate-slide-up` | 300ms | Modal/panel entrance |
| Pull refresh spin | `animate-spin` | 1000ms | Refresh indicator |

### Responsive Layout

- **Primary viewport:** Landscape tablet 1024x768
- **Secondary viewport:** Portrait tablet 768x1024
- Grid layouts adapt: 3-column metrics → 2-column on narrower screens
- Bottom navigation divides equally across full width
- No horizontal scroll at any viewport size
- Safe-area support for iPad (`viewport-fit=cover`, `safe-area-bottom` padding)

---

## Appendix: Current Dish Data

| Dish ID | Name | Line | Tray Size | Max Trays | Shelf Life |
|---------|------|------|-----------|-----------|------------|
| `schweinebraten` | Roast Pork with Dumplings | Main | 40 | 12 | 2h hot-hold |
| `haehnchen-curry` | Chicken Curry with Rice | Main | 35 | 10 | 3h hot-hold |
| `gemuese-lasagne` | Vegetable Lasagna | Veggie | 30 | 8 | 2.5h hot-hold |
| `kartoffelsuppe` | Potato Soup | Soup | 50 | 6 | 4h hot-hold |
| `salatteller` | Mixed Salad Plate | Salad | 25 | 10 | 6h cold |

## Appendix: Demo Forecast Data (March 19, 2026)

| Dish | Predicted | Confidence | Rec. Trays | Backup | Key Factors |
|------|-----------|------------|------------|--------|-------------|
| Roast Pork | 320 | 87% (high) | 8 | +2 | Thursday +, Semester + |
| Chicken Curry | 245 | 82% (high) | 7 | +1 | Popularity +, Semester + |
| Vegetable Lasagna | 180 | 74% (medium) | 6 | +2 | Veggie trend +, Thursday - |
| Potato Soup | 290 | 91% (high) | 6 | 0 | Weather +, Stability + |
| Mixed Salad | 150 | 68% (low) | 6 | +2 | Volatility -, Thursday - |
