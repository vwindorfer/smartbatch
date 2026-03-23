# CLAUDE.md - SmartBatch Project

## Project Identity

SmartBatch is a tablet-first web application for cafeteria kitchens. It predicts meal demand, converts predictions into actionable cook plans (in trays/batches, not abstract numbers), and tracks food waste. The app runs on tablets in chaotic, messy kitchen environments. Usability is everything.

**Target users:** Cooks and kitchen managers in institutional cafeterias (universities, corporate canteens, hospitals). They are busy, often stressed, and their hands may be wet or gloved. They are NOT tech people.

**Tech stack:** React 18 + TypeScript, Vite, TailwindCSS, React Router v6, Zustand for state, Recharts for charts. No backend needed yet (dummy data only). The ML backend will be integrated later by a teammate.

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Self-Improvement Loop
- After ANY correction from the user: update tasks/lessons.md with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 3. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 4. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes. Don't over-engineer
- Challenge your own work before presenting it

### 5. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests, then resolve them
- Zero context switching required from the user

## Task Management

1. **Plan First:** Write plan to tasks/todo.md with checkable items
2. **Verify Plan:** Check in before starting implementation
3. **Track Progress:** Mark items complete as you go
4. **Explain Changes:** High-level summary at each step
5. **Document Results:** Add review section to tasks/todo.md
6. **Capture Lessons:** Update tasks/lessons.md after corrections

## Core Principles

- **Simplicity First:** Make every change as simple as possible. Impact minimal code.
- **No Laziness:** Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact:** Only touch what's necessary. No side effects with new bugs.
- **Kitchen-First Design:** Every UI decision must pass the "wet hands, crowded kitchen, 2 seconds to understand" test.

## Design System Rules

## Kitchen UX Rules (Project-Specific, Override External Skill)

These rules are specific to kitchen/cafeteria environments and take priority over any generic design recommendations from the ui-ux-pro-max-skill.

### Touch Targets
- Minimum touch target: 48x48px (Google Material guidelines)
- Preferred touch target for primary actions: 56x56px or larger
- Spacing between touch targets: minimum 8px gap
- Bottom navigation bar items: full width divided equally

### Typography
- Use system font stack for maximum performance: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Minimum body text: 16px (never smaller on tablet)
- Headers: 20-28px range
- Numbers/data: use tabular-nums for alignment
- High contrast: minimum 4.5:1 ratio for all text

### Color Palette
- Primary: `#1B6B4A` (forest green, sustainability, calm)
- Primary Light: `#E8F5EE`
- Accent/Warning: `#E5A100` (amber, attention without alarm)
- Danger: `#DC2626` (red, waste, alerts)
- Success: `#16A34A` (bright green, completed, saved)
- Neutral 900: `#1A1A2E` (near-black for text)
- Neutral 100: `#F5F5F7` (light background)
- White: `#FFFFFF` (cards, surfaces)
- Confidence High: `#16A34A` (green)
- Confidence Medium: `#E5A100` (amber)
- Confidence Low: `#DC2626` (red)

### Layout
- Optimized for landscape tablet (1024x768 primary breakpoint)
- Also support portrait tablet (768x1024)
- Bottom tab navigation (thumb-friendly, not top navbar)
- Cards as primary content containers
- No deep nesting. Max 2 levels of navigation depth
- Generous whitespace. Content breathes.
- Sticky headers for context (always know what screen you're on)

### Interaction Patterns
- Swipe gestures for common actions (mark complete, adjust quantity)
- Pull-to-refresh where data updates make sense
- Haptic-style visual feedback on tap (scale animation)
- Loading skeletons, never spinners
- Optimistic UI updates
- Large, clear confirmation for destructive actions
- Toasts for success, modals only for critical decisions

### Component Library
Build these as reusable components from day one:
- `TrayCounter` - increment/decrement with large +/- buttons
- `ConfidenceBadge` - color-coded confidence score display
- `DishCard` - dish name, tray count, confidence, prep status
- `MetricCard` - single KPI with icon, value, trend
- `TimelineBar` - prep schedule visualization
- `WasteEntry` - quick-log form for waste tracking
- `StatusChip` - small colored status indicator
- `BottomNav` - 4-tab navigation bar
- `PageHeader` - sticky header with title and optional actions
- `EmptyState` - friendly illustration + message when no data

## External Skills

This project uses the [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) for design intelligence. It is installed via CLI into `.claude/skills/ui-ux-pro-max/` and activates automatically for UI/UX tasks.

At the start of each session, generate a design system for SmartBatch:
```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "institutional cafeteria kitchen management dashboard tablet" --design-system -p "SmartBatch"
```

The generated design system supplements the kitchen-specific rules below. If the skill's recommendations conflict with the Kitchen UX Rules in this file, the kitchen-specific rules win (the skill doesn't know about wet hands and tray counters).

## File Structure

```
smartbatch/
├── CLAUDE.md                    # This file
├── .claude/
│   └── skills/
│       └── ui-ux-pro-max/       # Installed via: uipro init --ai claude
│           ├── instructions.md
│           ├── scripts/
│           └── data/
├── tasks/
│   ├── todo.md                  # Current task tracking
│   └── lessons.md               # Learnings from corrections
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.tsx
│   ├── App.tsx                  # Router setup
│   ├── index.css                # Tailwind imports + CSS variables
│   ├── types/
│   │   └── index.ts             # All TypeScript interfaces
│   ├── data/
│   │   ├── dishes.ts            # Dummy menu/dish data
│   │   ├── forecasts.ts         # Dummy prediction data
│   │   ├── cookPlans.ts         # Dummy cook plan data
│   │   ├── wasteLog.ts          # Dummy waste tracking data
│   │   └── impact.ts            # Dummy impact metrics
│   ├── store/
│   │   └── useStore.ts          # Zustand global store
│   ├── hooks/
│   │   ├── useCurrentDate.ts
│   │   └── useCookPlan.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BottomNav.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   └── AppShell.tsx
│   │   ├── shared/
│   │   │   ├── TrayCounter.tsx
│   │   │   ├── ConfidenceBadge.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   ├── StatusChip.tsx
│   │   │   ├── DishCard.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── LoadingSkeleton.tsx
│   │   ├── dashboard/
│   │   │   ├── TodayOverview.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   └── AlertBanner.tsx
│   │   ├── forecast/
│   │   │   ├── ForecastList.tsx
│   │   │   └── ForecastDetail.tsx
│   │   ├── cookplan/
│   │   │   ├── CookPlanTimeline.tsx
│   │   │   ├── BatchCard.tsx
│   │   │   └── LiveAdjustment.tsx
│   │   ├── waste/
│   │   │   ├── WasteLogForm.tsx
│   │   │   ├── WasteHistory.tsx
│   │   │   └── WasteSummary.tsx
│   │   ├── prep/
│   │   │   └── PrepList.tsx
│   │   └── impact/
│   │       ├── ImpactDashboard.tsx
│   │       └── ImpactChart.tsx
│   └── pages/
│       ├── LoginPage.tsx
│       ├── DashboardPage.tsx
│       ├── ForecastPage.tsx
│       ├── CookPlanPage.tsx
│       ├── WasteTrackerPage.tsx
│       ├── PrepListPage.tsx
│       ├── ImpactPage.tsx
│       ├── HistoryPage.tsx
│       ├── SettingsPage.tsx
│       └── MealRedirectPage.tsx
```

## Dummy Data Specifications

### Cafeteria Context
- Name: "TU Munich Mensa Garching"
- Serves: ~1,200 meals per day
- Operating hours: 11:00 - 14:00
- Lines: 3 (Main, Veggie, Soup/Salad)
- Staff on duty: 8 cooks + 4 prep assistants

### Menu for Today (Thursday)
| Dish | Line | Tray Size | Max Trays | Shelf Life |
|------|------|-----------|-----------|------------|
| Schweinebraten mit Knödel | Main | 40 portions | 12 | 2h hot-hold |
| Hähnchen Curry mit Reis | Main | 35 portions | 10 | 3h hot-hold |
| Gemüse-Lasagne | Veggie | 30 portions | 8 | 2.5h hot-hold |
| Kartoffelsuppe | Soup | 50 portions | 6 | 4h hot-hold |
| Bunter Salatteller | Salad | 25 portions | 10 | 6h cold |

### Forecast for Today
| Dish | Predicted Demand | Confidence | Recommended Trays | Backup Prep |
|------|-----------------|------------|-------------------|-------------|
| Schweinebraten | 320 portions | 87% | 8 trays | +2 prepped |
| Hähnchen Curry | 245 portions | 82% | 7 trays | +1 prepped |
| Gemüse-Lasagne | 180 portions | 74% | 6 trays | +2 prepped |
| Kartoffelsuppe | 290 portions | 91% | 6 trays | none |
| Bunter Salatteller | 150 portions | 68% | 6 trays | +2 prepped |

Factors: Thursday, 18°C partly cloudy, no special events, semester in session.

### Waste Log (Past Week Averages)
| Day | Total Waste (kg) | Cost (€) | CO2 Avoided (kg) |
|-----|-----------------|----------|-------------------|
| Mon | 23.5 | 82.25 | 35.25 |
| Tue | 18.2 | 63.70 | 27.30 |
| Wed | 31.0 | 108.50 | 46.50 |
| Thu | 15.8 | 55.30 | 23.70 |
| Fri | 27.3 | 95.55 | 40.95 |

### Impact Metrics (This Month)
- Total waste avoided: 342 kg
- Money saved: €1,197
- CO2 avoided: 513 kg CO2e
- Meals redirected: 89
- Forecast accuracy: 84%

## Page Specifications

### 1. Login Page
- Simple, clean login screen
- University/organization logo placeholder
- Email + password fields (large inputs)
- "Remember me" toggle
- SSO button placeholder
- Skip straight to Dashboard on demo mode (auto-login with dummy user)

### 2. Dashboard (Home)
The "morning briefing" screen. A cook opens this at 7am and knows their day.
- **Top:** Date, weather icon, special notes ("No events today")
- **Center:** Today's dishes as large cards showing: dish name, recommended trays, confidence badge, prep status (Not Started / In Prep / Ready)
- **Bottom quick-stats:** 3 metric cards: yesterday's waste, this week's forecast accuracy, meals redirected this month
- **Alert banner** if any dish has low confidence (<70%) suggesting checking inputs

### 3. Demand Forecast Page
- List of all dishes for today/selected date
- Each dish shows: predicted demand (portions), confidence score, factors influencing prediction (weather, day, events), historical comparison chart (small sparkline)
- Tap a dish to see detailed forecast breakdown
- Date picker to look at future days
- Link to "Data Inputs" to adjust factors

### 4. Cook Plan Page (Central Feature)
This is the hero screen. It answers: "What do I cook, when, how much?"
- **Timeline view:** Horizontal timeline from 7:00 to 14:00
- **Batch cards** placed on timeline showing: dish, tray number ("Tray 3 of 8"), start time, status
- **Large tray counters** with +/- buttons for live adjustments
- **Color coding:** Green = done, Amber = in progress, Gray = upcoming
- **Backup indicator:** "2 trays prepped as backup" shown separately
- **Tap to adjust:** Opens quick-edit with reason field (sold out faster, event cancelled, etc.)

### 5. Prep List Page
- Checklist format, grouped by time blocks (Early AM, Mid AM, Before Service)
- Each item: ingredient, quantity, associated dishes, estimated time
- Tap to mark complete (large checkbox, satisfying animation)
- Progress bar at top showing overall prep completion
- Shared ingredients highlighted ("Onions: needed for Curry AND Soup")

### 6. Waste Tracker Page
- **Quick log form** at top: select dish, enter kg wasted, select reason (overproduction, spoiled, plate waste, other)
- **Today's waste** summary below
- **Weekly chart** (bar chart, waste per day)
- **Breakdown by reason** (pie/donut chart)
- Button to "Redirect Meal" if surplus is still safe

### 7. Impact Report Page
- Big hero numbers: kg saved, € saved, CO2 avoided, meals redirected
- Trend charts (line charts over weeks/months)
- Comparison to previous period
- SDG 12.3 alignment badge/progress indicator
- "Share Report" button (placeholder)

### 8. History Page
- Calendar view of past cook plans
- Tap a day to see: what was planned vs. actual, accuracy percentage, waste for that day
- Trend line of accuracy over time

### 9. Settings Page
- Kitchen profile (name, capacity, hours)
- Equipment list (ovens, holding cabinets, with capacity)
- Staff count per shift
- Tray size defaults per dish
- Notification preferences
- All form fields: large, clear labels, obvious save button

### 10. Meal Redirect Page
- List of surplus items available for redistribution
- Each item: dish, quantity, time remaining (shelf life countdown)
- Status: Available / Claimed / Expired
- Contact info for partner organizations (placeholder)
- Log redirect action

## Navigation Structure

Bottom tab bar with 4 tabs:
1. **Dashboard** (home icon) - DashboardPage
2. **Cook Plan** (chef hat / pot icon) - CookPlanPage
3. **Waste** (trash/recycle icon) - WasteTrackerPage
4. **Impact** (leaf/chart icon) - ImpactPage

Secondary pages accessible from within tabs (push navigation):
- Forecast: from Dashboard
- Prep List: from Cook Plan
- History: from Cook Plan
- Settings: from Dashboard (gear icon in header)
- Meal Redirect: from Waste Tracker
- Live Adjustments: from Cook Plan

## Development Order

Build in this exact sequence:
1. Project scaffolding (Vite + React + TS + Tailwind + Router + Zustand)
2. Types and dummy data files
3. Layout components (AppShell, BottomNav, PageHeader)
4. Shared components (TrayCounter, ConfidenceBadge, MetricCard, DishCard, StatusChip)
5. Login Page (with auto-skip for demo)
6. Dashboard Page
7. Cook Plan Page (most complex, take time here)
8. Prep List Page
9. Waste Tracker Page
10. Impact Report Page
11. Forecast Page
12. History Page
13. Settings Page
14. Meal Redirect Page
15. Polish: animations, transitions, empty states, edge cases

## Code Style

- Functional components only, no class components
- Use TypeScript strictly (no `any` types)
- Tailwind for all styling, no separate CSS files except index.css
- Component files: PascalCase (e.g., `DishCard.tsx`)
- Hooks: camelCase with `use` prefix
- Constants: UPPER_SNAKE_CASE
- Keep components under 150 lines. Extract sub-components if longer
- Comments only for "why", never "what"
- German dish names and labels where appropriate (this is a German university mensa)
- UI text in English (international student body), dish names in German

## Testing Checklist (Manual)

After each page is built, verify:
- [ ] All touch targets >= 48px
- [ ] Readable on 1024x768 (landscape tablet)
- [ ] Readable on 768x1024 (portrait tablet)
- [ ] No horizontal scroll
- [ ] Text contrast meets 4.5:1
- [ ] Loading states present
- [ ] Empty states present
- [ ] Navigation works (can get there and back)
- [ ] Numbers are formatted correctly (€, kg, %)