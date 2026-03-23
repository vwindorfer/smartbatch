import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  actions?: ReactNode
}

export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm border-b border-neutral-100 px-4 py-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-neutral-900 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-neutral-900/50 mt-0.5">{subtitle}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  )
}
