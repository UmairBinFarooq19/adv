import { useId, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/motion'

// Accessible FAQ accordion. Each row is a real <button> with aria-expanded and
// aria-controls pointing at its answer region. Keyboard and screen-reader
// friendly; the icon rotates and the panel height animates. `items`: [{q,a}].
export default function FAQAccordion({ items = [], className, tone = 'light' }) {
  const [open, setOpen] = useState(0)
  const base = useId()

  return (
    <div className={cn('divide-y', tone === 'dark' ? 'divide-white/10' : 'divide-line', className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${base}-b-${i}`
        const panelId = `${base}-p-${i}`
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={cn(
                  'flex w-full items-center justify-between gap-4 py-5 text-left',
                  tone === 'dark' ? 'text-white' : 'text-pine-900',
                )}
              >
                <span className="font-display text-lg font-semibold">{item.q}</span>
                <span
                  className={cn(
                    'grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform duration-300 ease-premium',
                    isOpen && 'rotate-45',
                    tone === 'dark' ? 'bg-white/10 text-saffron-300' : 'bg-glacier-50 text-pine-700',
                  )}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className={cn('pb-5 pr-12 leading-relaxed', tone === 'dark' ? 'text-pine-100' : 'text-muted')}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
