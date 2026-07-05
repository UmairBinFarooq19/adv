import { Star } from 'lucide-react'
import { cn } from '@/lib/cn'

// Compact star rating. Renders 5 stars, filling to the nearest half via a
// clipped overlay, plus an optional numeric label. Decorative stars are hidden
// from screen readers; the accessible value lives in aria-label.
export default function StarRating({ value = 5, count, size = 'sm', className }) {
  const px = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  return (
    <span
      className={cn('inline-flex items-center gap-1.5', className)}
      aria-label={`${value} out of 5 stars${count ? `, ${count} reviews` : ''}`}
    >
      <span className="relative inline-flex" aria-hidden="true">
        {/* empty track */}
        <span className="flex text-pine-200">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={px} fill="currentColor" strokeWidth={0} />
          ))}
        </span>
        {/* filled overlay clipped to the value */}
        <span
          className="absolute inset-0 flex overflow-hidden text-saffron-400"
          style={{ width: `${(value / 5) * 100}%` }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={cn(px, 'shrink-0')} fill="currentColor" strokeWidth={0} />
          ))}
        </span>
      </span>
      {count != null && <span className="text-sm text-muted">{value.toFixed(1)} ({count})</span>}
    </span>
  )
}
