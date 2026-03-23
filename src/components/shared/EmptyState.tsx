import { Inbox } from 'lucide-react'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-neutral-900/20 mb-4">
        {icon ?? <Inbox size={48} />}
      </div>
      <h3 className="text-lg font-semibold text-neutral-900/60">{title}</h3>
      {description && (
        <p className="text-base text-neutral-900/40 mt-1 max-w-xs">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
