import { useLocation, useNavigate } from 'react-router-dom'
import { Home, ChefHat, Trash2, Leaf } from 'lucide-react'

const TABS = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/cook-plan', label: 'Cook Plan', icon: ChefHat },
  { path: '/waste', label: 'Waste', icon: Trash2 },
  { path: '/impact', label: 'Impact', icon: Leaf },
] as const

const SECONDARY_TAB_MAP: Record<string, string> = {
  '/forecast': '/dashboard',
  '/settings': '/dashboard',
}

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  function isActive(tabPath: string) {
    const mapped = SECONDARY_TAB_MAP[location.pathname]
    if (mapped) return mapped === tabPath
    return location.pathname.startsWith(tabPath)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-neutral-100 safe-area-bottom">
      <div className="flex">
        {TABS.map((tab) => {
          const active = isActive(tab.path)
          const Icon = tab.icon
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`
                flex-1 flex flex-col items-center justify-center
                min-h-[56px] py-2 gap-0.5
                tap-nav transition-colors
                ${active
                  ? 'text-primary'
                  : 'text-neutral-900/40 hover:text-neutral-900/60'
                }
              `}
            >
              <span className="nav-icon inline-block transition-transform">
                <Icon size={24} strokeWidth={active ? 2.5 : 2} />
              </span>
              <span className={`text-xs ${active ? 'font-semibold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
