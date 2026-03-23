interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'metric'
  count?: number
}

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-neutral-900/5 ${className ?? ''}`}
    />
  )
}

function CardSkeleton() {
  return (
    <div className="bg-surface rounded-2xl p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <SkeletonPulse className="h-5 w-40" />
          <SkeletonPulse className="h-4 w-20 mt-2" />
        </div>
        <SkeletonPulse className="h-6 w-14 rounded-full" />
      </div>
      <div className="flex items-center justify-between mt-3">
        <SkeletonPulse className="h-8 w-24" />
        <SkeletonPulse className="h-6 w-20 rounded-full" />
      </div>
    </div>
  )
}

function TextSkeleton() {
  return (
    <div className="space-y-2">
      <SkeletonPulse className="h-4 w-full" />
      <SkeletonPulse className="h-4 w-3/4" />
    </div>
  )
}

function MetricSkeleton() {
  return (
    <div className="bg-surface rounded-2xl p-4 shadow-sm">
      <SkeletonPulse className="h-4 w-24 mb-2" />
      <SkeletonPulse className="h-8 w-16" />
    </div>
  )
}

export default function LoadingSkeleton({
  variant = 'card',
  count = 3,
}: LoadingSkeletonProps) {
  const Component =
    variant === 'card'
      ? CardSkeleton
      : variant === 'metric'
        ? MetricSkeleton
        : TextSkeleton

  return (
    <div className="space-y-3">
      {Array.from({ length: count }, (_, i) => (
        <Component key={i} />
      ))}
    </div>
  )
}
