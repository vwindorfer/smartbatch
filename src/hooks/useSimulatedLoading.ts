import { useState, useEffect, useCallback } from 'react'

export function useSimulatedLoading(delayMs = 500) {
  const [loading, setLoading] = useState(true)

  const reload = useCallback(() => {
    setLoading(true)
    setTimeout(() => setLoading(false), delayMs)
  }, [delayMs])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delayMs)
    return () => clearTimeout(timer)
  }, [delayMs])

  return { loading, reload }
}
