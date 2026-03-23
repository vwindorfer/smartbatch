import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import CookPlanPage from './pages/CookPlanPage'
import WasteTrackerPage from './pages/WasteTrackerPage'
import ImpactPage from './pages/ImpactPage'
import ForecastPage from './pages/ForecastPage'
import PrepListPage from './pages/PrepListPage'
import HistoryPage from './pages/HistoryPage'
import SettingsPage from './pages/SettingsPage'
import MealRedirectPage from './pages/MealRedirectPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/forecast" element={<ForecastPage />} />
          <Route path="/cook-plan" element={<CookPlanPage />} />
          <Route path="/cook-plan/prep" element={<PrepListPage />} />
          <Route path="/cook-plan/history" element={<HistoryPage />} />
          <Route path="/waste" element={<WasteTrackerPage />} />
          <Route path="/waste/redirect" element={<MealRedirectPage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
