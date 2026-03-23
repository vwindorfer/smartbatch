import { useRef, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'

const TAB_PATHS = ['/dashboard', '/cook-plan', '/waste', '/impact']

function getTransitionClass(prev: string, next: string): string {
  // Tab switches get a fade
  const prevIsTab = TAB_PATHS.some((t) => prev === t)
  const nextIsTab = TAB_PATHS.some((t) => next === t)
  if (prevIsTab && nextIsTab) return 'page-fade'

  // Deeper navigation = slide right, back = slide left
  if (next.length > prev.length || next.includes('/')) return 'page-slide-right'
  return 'page-slide-left'
}

export default function AppShell() {
  const location = useLocation()
  const prevPath = useRef(location.pathname)
  const [transitionClass, setTransitionClass] = useState('page-fade')
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      setTransitionClass(getTransitionClass(prevPath.current, location.pathname))
      setKey((k) => k + 1)
      prevPath.current = location.pathname
    }
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-neutral-100 pb-[72px]">
      <div key={key} className={transitionClass}>
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}
