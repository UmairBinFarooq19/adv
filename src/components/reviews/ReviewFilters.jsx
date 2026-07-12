import { Search, X } from 'lucide-react'
import { cn } from '@/lib/cn'

// ReviewFilters — search + category chips + rating/country/sort selects. Fully
// controlled (the page owns state), so the same bar can drive any review list.
// Category chips are a radiogroup for arrow-key navigation; the rest are native
// selects, which are the most accessible control for single choice on mobile.
export default function ReviewFilters({
  query, onQuery,
  categories = [], activeCategory, onCategory, counts = {},
  minRating, onMinRating,
  countries = [], activeCountry, onCountry,
  sort, onSort,
  onReset, hasFilters,
  className,
}) {
  const chips = [{ id: 'all', label: 'All' }, ...categories]
  const selectBase = 'rounded-2xl border border-line bg-surface px-3.5 py-2.5 text-sm text-pine-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400'

  return (
    <div className={cn('space-y-5', className)}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <label htmlFor="review-search" className="sr-only">Search reviews</label>
          <input
            id="review-search"
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search reviews by name, trip or words…"
            className="w-full rounded-2xl border border-line bg-surface py-2.5 pl-10 pr-3.5 text-sm text-pine-900 placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <label htmlFor="review-rating" className="sr-only">Minimum rating</label>
          <select id="review-rating" value={minRating} onChange={(e) => onMinRating(Number(e.target.value))} className={selectBase}>
            <option value={0}>All ratings</option>
            <option value={5}>5 stars only</option>
            <option value={4}>4 stars & up</option>
            <option value={3}>3 stars & up</option>
          </select>
          <label htmlFor="review-country" className="sr-only">Country</label>
          <select id="review-country" value={activeCountry} onChange={(e) => onCountry(e.target.value)} className={selectBase}>
            <option value="all">All countries</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <label htmlFor="review-sort" className="sr-only">Sort reviews</label>
          <select id="review-sort" value={sort} onChange={(e) => onSort(e.target.value)} className={selectBase}>
            <option value="recent">Most recent</option>
            <option value="highest">Highest rated</option>
            <option value="photos">With photos</option>
          </select>
        </div>
      </div>

      <div role="radiogroup" aria-label="Filter reviews by category" className="flex flex-wrap gap-2">
        {chips.map((c) => {
          const Icon = c.icon
          const selected = activeCategory === c.id
          const n = c.id === 'all' ? counts.all : counts[c.id]
          return (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onCategory(c.id)}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400',
                selected ? 'border-pine-800 bg-pine-800 text-white' : 'border-line bg-surface text-pine-800 hover:-translate-y-0.5 hover:border-pine-300',
              )}
            >
              {Icon && <Icon className={cn('h-4 w-4', selected ? 'text-saffron-300' : 'text-saffron-600')} aria-hidden="true" />}
              {c.label}
              {n != null && <span className={cn('text-xs', selected ? 'text-pine-100' : 'text-muted')}>{n}</span>}
            </button>
          )
        })}
        {hasFilters && (
          <button type="button" onClick={onReset} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-pine-800 transition-colors hover:border-pine-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400">
            <X className="h-3.5 w-3.5" aria-hidden="true" /> Clear
          </button>
        )}
      </div>
    </div>
  )
}
