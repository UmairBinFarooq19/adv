import { motion } from 'framer-motion'
import { BadgeCheck } from 'lucide-react'
import StarRating from '@/components/ui/StarRating'
import { cn } from '@/lib/cn'
import { revealOnScroll, stagger, fadeUp } from '@/lib/motion'

// RatingSummary — the overall score plus a 5→1 star distribution. Every number is
// computed from the reviews array (see data helpers), so the headline rating can
// never contradict the reviews listed below it. Reuses the shared StarRating.
// The bars are a semantic definition list, and each carries its own aria-label.
export default function RatingSummary({ rating, total, distribution = [], verifiedCount, className }) {
  return (
    <motion.div variants={stagger} {...revealOnScroll} className={cn('grid gap-8 rounded-4xl border border-line bg-surface p-8 shadow-soft lg:grid-cols-[auto_1fr] lg:gap-14 lg:p-10', className)}>
      <motion.div variants={fadeUp} className="text-center lg:text-left">
        <p className="font-display text-6xl font-semibold leading-none text-pine-900">{rating.toFixed(1)}</p>
        <StarRating value={rating} size="md" className="mt-3 justify-center lg:justify-start" />
        <p className="mt-3 text-sm text-muted">Based on {total} reviews</p>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-pine-800">
          <BadgeCheck className="h-4 w-4 text-saffron-600" aria-hidden="true" /> {verifiedCount} verified
        </p>
      </motion.div>

      <motion.dl variants={fadeUp} className="space-y-2.5">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted">Featured reviews breakdown</p>
        {distribution.map(({ stars, count, pct }) => (
          <div key={stars} className="flex items-center gap-3">
            <dt className="w-16 shrink-0 text-sm text-muted">{stars} star{stars === 1 ? '' : 's'}</dt>
            <dd className="flex flex-1 items-center gap-3">
              <span
                className="h-2 flex-1 overflow-hidden rounded-full bg-glacier-100"
                role="img"
                aria-label={`${stars} star: ${count} review${count === 1 ? '' : 's'}, ${pct} percent`}
              >
                <span className="block h-full rounded-full bg-saffron-400 transition-[width] duration-700 ease-premium" style={{ width: `${pct}%` }} />
              </span>
              <span className="w-10 shrink-0 text-right text-sm tabular-nums text-muted">{count}</span>
            </dd>
          </div>
        ))}
      </motion.dl>
    </motion.div>
  )
}
