import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Media from '@/components/ui/Media'
import { useCompare } from '@/store/CompareContext'
import { getPackage, formatPrice } from '@/data/catalog'
import { EASE } from '@/lib/motion'

// Side-by-side comparison table. Rows are declared once; adding a comparison
// dimension is a one-line change. Horizontally scrollable on small screens.
const ROWS = [
  { label: 'Price from', get: (p) => formatPrice(p.priceFrom) },
  { label: 'Duration', get: (p) => p.duration },
  { label: 'Destination', get: (p) => p.location },
  { label: 'Difficulty', get: (p) => p.difficulty },
  { label: 'Activities', get: (p) => [...(p.activities || []), ...(p.tags || [])].join(', ') },
  { label: 'Hotel category', get: (p) => p.hotelCategory },
  { label: 'Meals', get: (p) => p.meals },
  { label: 'Transportation', get: (p) => p.transportation },
]

export default function CompareModal({ open, onClose }) {
  const { compare, removeCompare, clearCompare } = useCompare()
  const packages = compare.map(getPackage).filter(Boolean)

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[95] grid place-items-center p-3 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-pine-950/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            role="dialog" aria-modal="true" aria-label="Compare packages"
            initial={{ y: 20, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative flex max-h-[90dvh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-surface shadow-lift"
          >
            <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
              <h2 className="font-display text-xl font-semibold text-pine-900">Compare packages</h2>
              <div className="flex items-center gap-2">
                {packages.length > 0 && (
                  <button type="button" onClick={clearCompare} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-pine-700 hover:bg-pine-800/5">
                    <Trash2 className="h-4 w-4" /> Clear
                  </button>
                )}
                <button type="button" onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full text-pine-700 hover:bg-pine-800/5">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="overflow-auto">
              {packages.length === 0 ? (
                <p className="p-12 text-center text-muted">No packages selected yet. Add a few from any package card to compare.</p>
              ) : (
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-10 w-32 bg-surface p-4" />
                      {packages.map((p) => (
                        <th key={p.slug} className="min-w-[180px] border-l border-line p-4 text-left align-top">
                          <Media src={p.image} alt={p.title} className="mb-3 aspect-[4/3] w-full rounded-xl" />
                          <Link to={`/packages/${p.category}/${p.slug}`} className="font-display text-base font-semibold text-pine-900 hover:text-pine-700">{p.title}</Link>
                          <button type="button" onClick={() => removeCompare(p.slug)} className="mt-1 block text-xs text-muted hover:text-red-600">Remove</button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((row, i) => (
                      <tr key={row.label} className={i % 2 ? 'bg-background/60' : ''}>
                        <th scope="row" className="sticky left-0 z-10 whitespace-nowrap bg-inherit p-4 text-left align-top text-xs font-semibold uppercase tracking-wider text-muted" style={{ backgroundColor: i % 2 ? 'rgb(247 249 248)' : 'white' }}>
                          {row.label}
                        </th>
                        {packages.map((p) => (
                          <td key={p.slug} className="border-l border-line p-4 align-top capitalize text-pine-800">{row.get(p)}</td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <th scope="row" className="sticky left-0 z-10 bg-surface p-4" />
                      {packages.map((p) => (
                        <td key={p.slug} className="border-l border-line p-4 align-top">
                          <Button to={`/packages/${p.category}/${p.slug}`} variant="outline" size="sm" onClick={onClose}>
                            View <ArrowRight className="h-4 w-4" />
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
