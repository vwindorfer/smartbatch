import { Check } from 'lucide-react'
import type { ReactNode } from 'react'

interface ToastProps {
  visible: boolean
  exiting: boolean
  message: string
  icon?: ReactNode
  variant?: 'success' | 'info'
}

export default function Toast({
  visible,
  exiting,
  message,
  icon,
  variant = 'success',
}: ToastProps) {
  if (!visible) return null

  const bg = variant === 'success' ? 'bg-success' : 'bg-neutral-900'

  return (
    <div
      className={`
        fixed bottom-24 left-1/2 z-50
        ${bg} text-white px-5 py-3 rounded-xl shadow-lg
        flex items-center gap-2
        ${exiting ? 'toast-exit' : 'toast-enter'}
      `}
    >
      {icon ?? <Check size={18} />}
      <span className="text-base font-semibold">{message}</span>
    </div>
  )
}
