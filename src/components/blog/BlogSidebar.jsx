import { Search, TrendingUp, Tag, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Media from '@/components/ui/Media'
import { cn } from '@/lib/cn'
import { readingTime } from '@/data/blog'

// BlogSidebar — the magazine rail: a search field, category filters with counts,
// destination and season filters, and a popular-articles list. It is fully
// controlled (the page owns filter state), so the same sidebar can drive the
// landing listing or any future archive view without change.
export default function BlogSidebar({
  query, onQuery,
  categories = [], activeCategory, onCategory, counts = {},
  destinations = [], activeDestination, onDestination,
  seasons = [], activeSeason, onSeason,
  popular = [],
  onReset, hasFilters,
  className,
}) {
  const selectBase = 'mt-2 w-full rounded-2xl border border-line bg-surface px-3.5 py-2.5 text-sm text-pine-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400'

  return (
    <aside className={cn('space-y-8', className)} aria-label="Article filters">
      {/* Search */}
      <div>
        <label htmlFor="blog-search" className="text-xs font-semibold uppercase tracking-wider text-muted">Search articles</label>
        <div className="relative mt-2">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Skiing, wazwan, permits…"
            className="w-full rounded-2xl border border-line bg-surface py-2.5 pl-10 pr-3.5 text-sm text-pine-900 placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
          />
        </div>
      </div>

      {/* Destination + season filters */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <div>
          <label htmlFor="blog-destination" className="text-xs font-semibold uppercase tracking-wider text-muted">Destination</label>
          <select id="blog-destination" value={activeDestination} onChange={(e) => onDestination(e.target.value)} className={selectBase}>
            <option value="all">All destinations</option>
            {destinations.map((d) => <option key={d.slug} value={d.slug}>{d.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="blog-season" className="text-xs font-semibold uppercase tracking-wider text-muted">Season</label>
          <select id="blog-season" value={activeSeason} onChange={(e) => onSeason(e.target.value)} className={selectBase}>
            <option value="all">All seasons</option>
            {seasons.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Categories */}
      <div>
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
          <Tag className="h-3.5 w-3.5" aria-hidden="true" /> Categories
        </p>
        <ul className="mt-3 space-y-1">
          {[{ id: 'all', label: 'All articles' }, ...categories].map((c) => {
            const selected = activeCategory === c.id
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => onCategory(c.id)}
                  aria-pressed={selected}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-2xl px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400',
                    selected ? 'bg-pine-800 font-semibold text-white' : 'text-pine-800 hover:bg-glacier-100',
                  )}
                >
                  {c.icon && <c.icon className={cn('h-4 w-4', selected ? 'text-saffron-300' : 'text-saffron-600')} aria-hidden="true" />}
                  <span className="flex-1">{c.label}</span>
                  <span className={cn('text-xs', selected ? 'text-pine-100' : 'text-muted')}>{counts[c.id] ?? 0}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {hasFilters && (
        <button type="button" onClick={onReset} className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-sm font-medium text-pine-800 transition-colors hover:border-pine-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400">
          <X className="h-3.5 w-3.5" aria-hidden="true" /> Clear filters
        </button>
      )}

      {/* Popular */}
      {popular.length > 0 && (
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" /> Popular articles
          </p>
          <ul className="mt-4 space-y-4">
            {popular.map((p) => (
              <li key={p.slug}>
                <Link to={`/blogs/${p.slug}`} className="group flex gap-3">
                  <Media src={p.cover} alt="" className="h-14 w-16 shrink-0 rounded-xl" />
                  <span className="min-w-0">
                    <span className="line-clamp-2 text-sm font-semibold leading-snug text-pine-900 transition-colors group-hover:text-pine-700">{p.title}</span>
                    <span className="mt-1 block text-xs text-muted">{readingTime(p)} min read</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}
