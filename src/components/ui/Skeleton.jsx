import { cn } from '@/lib/cn'

// Shimmer placeholders for perceived performance while route chunks or data load.
export function Skeleton({ className }) {
  return <span className={cn('block animate-pulse rounded-2xl bg-gradient-to-br from-glacier-100 via-glacier-50 to-pine-100/50', className)} />
}

// A card-shaped skeleton that mirrors PackageCard's footprint.
export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-surface shadow-soft ring-1 ring-line/80">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="space-y-3 p-6">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 pt-3">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </div>
  )
}

// Full-page skeleton used as the lazy-route fallback.
export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="mt-6 h-12 w-3/4" />
      <Skeleton className="mt-4 h-5 w-full" />
      <Skeleton className="mt-2 h-5 w-2/3" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    </div>
  )
}
