import { motion } from 'framer-motion'
import { SearchX } from 'lucide-react'
import PackageCard from './PackageCard'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { fadeScale, stagger, revealOnScroll } from '@/lib/motion'

// Renders a responsive, staggered grid of PackageCards with a friendly empty
// state. `onReset` (optional) shows a "clear filters" button when nothing matches.
export default function PackageGrid({ packages = [], columns = 3, onReset, className }) {
  if (packages.length === 0) {
    return (
      <div className="grid place-items-center rounded-3xl border border-dashed border-line bg-surface/60 px-6 py-20 text-center">
        <SearchX className="h-10 w-10 text-pine-300" aria-hidden="true" />
        <h3 className="mt-4 font-display text-xl font-semibold text-pine-900">No packages match those filters</h3>
        <p className="mt-2 max-w-sm text-muted">Try widening your search — or tell us what you have in mind and we’ll build it.</p>
        <div className="mt-6 flex gap-3">
          {onReset && <Button variant="outline" size="md" onClick={onReset}>Clear filters</Button>}
          <Button to="/packages/custom" variant="primary" size="md">Build a custom trip</Button>
        </div>
      </div>
    )
  }

  return (
    <motion.ul
      variants={stagger}
      {...revealOnScroll}
      className={cn(
        'grid gap-6 sm:grid-cols-2 lg:gap-8',
        columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2',
        className,
      )}
    >
      {packages.map((pkg) => (
        <motion.li key={pkg.slug} variants={fadeScale} className="h-full">
          <PackageCard pkg={pkg} />
        </motion.li>
      ))}
    </motion.ul>
  )
}
