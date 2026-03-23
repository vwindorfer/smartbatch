import { useState, useCallback, useRef } from 'react'

export function useToast(duration = 3000) {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const show = useCallback(() => {
    setExiting(false)
    setVisible(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setExiting(true)
      setTimeout(() => {
        setVisible(false)
        setExiting(false)
      }, 200)
    }, duration)
  }, [duration])

  return { visible, exiting, show }
}
