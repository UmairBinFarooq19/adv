import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, MapPin, ArrowRight } from 'lucide-react'
import Media from '@/components/ui/Media'
import { allPackages, categories, formatPrice } from '@/data/catalog'
import { EASE } from '@/lib/motion'

// Global search across the catalog: name, destination, activity, duration and
// season. Controlled by the navbar (button + "/" shortcut). Results link into
// the detail pages; category shortcuts help when the query is broad.
export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (!open) return
    setQuery('')
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => inputRef.current?.focus(), 60)
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; clearTimeout(t) }
  }, [open, onClose])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return allPackages
      .filter((p) => {
        const hay = [p.title, p.location, p.duration, ...(p.activities || []), ...(p.tags || []), ...(p.seasons || [])].join(' ').toLowerCase()
        return q.split(/\s+/).every((term) => hay.includes(term))
      })
      .slice(0, 8)
  }, [query])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[95] flex items-start justify-center p-4 pt-[10vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-pine-950/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            role="dialog" aria-modal="true" aria-label="Search packages"
            initial={{ y: -16, opacity: 0, scale: 0.98 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-surface shadow-lift"
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations, activities, packages…"
                aria-label="Search"
                className="w-full bg-transparent py-4 text-body focus:outline-none"
              />
              <button type="button" onClick={onClose} aria-label="Close search" className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-pine-700 hover:bg-pine-800/5">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-3">
              {!query.trim() ? (
                <div className="p-3">
                  <p className="px-2 text-xs font-semibold uppercase tracking-wider text-muted">Browse by type</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {categories.map((c) => (
                      <Link key={c.slug} to={c.to ?? `/packages/${c.slug}`} onClick={onClose} className="flex items-center gap-2 rounded-2xl border border-line px-3 py-2.5 text-sm font-medium text-pine-900 hover:border-pine-300 hover:bg-background">
                        <c.icon className="h-4 w-4 text-saffron-600" aria-hidden="true" />
                        {c.short}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : results.length > 0 ? (
                <ul>
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link to={`/packages/${p.category}/${p.slug}`} onClick={onClose} className="flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-background">
                        <Media src={p.image} alt="" className="h-12 w-16 shrink-0 rounded-lg" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-semibold text-pine-900">{p.title}</span>
                          <span className="flex items-center gap-1 text-xs text-muted"><MapPin className="h-3 w-3" />{p.location}</span>
                        </span>
                        <span className="shrink-0 text-sm font-semibold text-pine-900">{formatPrice(p.priceFrom)}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-8 text-center text-muted">No packages match “{query}”.</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
