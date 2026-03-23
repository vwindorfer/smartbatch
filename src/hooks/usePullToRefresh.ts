import { useRef, useState, useCallback, useEffect } from 'react'

const PULL_THRESHOLD = 80

export function usePullToRefresh(onRefresh: () => void) {
  const [pulling, setPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const startY = useRef(0)
  const active = useRef(false)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY
      active.current = true
    }
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!active.current) return
    const dy = e.touches[0].clientY - startY.current
    if (dy > 0) {
      setPulling(true)
      setPullDistance(Math.min(dy * 0.5, 120))
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!active.current) return
    active.current = false
    if (pullDistance >= PULL_THRESHOLD) {
      setRefreshing(true)
      onRefresh()
      setTimeout(() => setRefreshing(false), 600)
    }
    setPulling(false)
    setPullDistance(0)
  }, [pullDistance, onRefresh])

  useEffect(() => {
    const opts: AddEventListenerOptions = { passive: true }
    window.addEventListener('touchstart', handleTouchStart, opts)
    window.addEventListener('touchmove', handleTouchMove, opts)
    window.addEventListener('touchend', handleTouchEnd, opts)
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  return { pulling, pullDistance, refreshing }
}
