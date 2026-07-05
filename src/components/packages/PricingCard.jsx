import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/data/catalog'

// Reusable pricing block: headline price + a short inclusions list + CTA.
// Used in the details "Pricing" section; BookingSidebar reuses the price header.
export default function PricingCard({ pkg, className }) {
  return (
    <div className={cn('rounded-3xl border border-line bg-surface p-7 shadow-soft', className)}>
      <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
        <div>
          <span className="text-sm text-muted">Starting from</span>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-4xl font-semibold text-pine-900">{formatPrice(pkg.priceFrom)}</span>
            <span className="text-sm text-muted">/ person</span>
          </div>
        </div>
        <span className="rounded-full bg-glacier-50 px-3 py-1 text-xs font-semibold text-glacier-700">
          {pkg.duration}
        </span>
      </div>

      <ul className="mt-5 space-y-2.5">
        {pkg.included.slice(0, 5).map((inc) => (
          <li key={inc} className="flex items-start gap-2.5 text-sm text-pine-800">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-saffron-500" aria-hidden="true" />
            {inc}
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs leading-relaxed text-muted">
        Final price depends on group size, season and room category. Share your
        dates for an exact, all-in quote — usually within a few hours.
      </p>

      <Button to="/contact" variant="primary" size="lg" className="mt-6 w-full">
        Request exact quote
      </Button>
    </div>
  )
}
