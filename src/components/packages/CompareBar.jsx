import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GitCompareArrows, X } from 'lucide-react'
import Media from '@/components/ui/Media'
import Button from '@/components/ui/Button'
import { useCompare } from '@/store/CompareContext'
import { getPackage } from '@/data/catalog'
import CompareModal from '@/components/packages/CompareModal'

// Appears at the bottom once the user adds packages to compare. Positioned to
// leave the bottom-right corner free for the floating actions. "Compare" needs
// at least two picks. Rendered once in the layout.
export default function CompareBar() {
  const { compare, removeCompare, count } = useCompare()
  const [open, setOpen] = useState(false)
  const packages = compare.map(getPackage).filter(Boolean)

  return (
    <>
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="fixed bottom-4 left-4 right-[4.5rem] z-[70] sm:left-1/2 sm:right-auto sm:w-full sm:max-w-2xl sm:-translate-x-1/2"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface/95 p-2.5 shadow-lift backdrop-blur sm:gap-4 sm:p-3">
              <span className="hidden shrink-0 pl-2 text-sm font-semibold text-pine-900 sm:block">Compare ({count})</span>
              <ul className="flex flex-1 items-center gap-2 overflow-x-auto">
                {packages.map((p) => (
                  <li key={p.slug} className="relative shrink-0">
                    <Media src={p.image} alt={p.title} className="h-11 w-14 rounded-lg" />
                    <button type="button" onClick={() => removeCompare(p.slug)} aria-label={`Remove ${p.title}`} className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-pine-950 text-white shadow-soft">
                      <X className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
              <Button variant="primary" size="sm" className="shrink-0" onClick={() => setOpen(true)} disabled={count < 2}>
                <GitCompareArrows className="h-4 w-4" />
                <span className="hidden sm:inline">Compare</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <CompareModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
