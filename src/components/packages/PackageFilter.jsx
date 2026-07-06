import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { filterGroups } from '@/data/catalog'
import { cn } from '@/lib/cn'

// Faceted filter + search. Fully controlled: the page owns `selected`
// ({ groupId: string[] }) and `query`, and passes handlers. Options come from
// the catalog's filterGroups, so adding a facet is a data change, not a UI one.
export default function PackageFilter({
  selected = {},
  query = '',
  onToggle,
  onQuery,
  onReset,
  resultCount,
}) {
  const [openMobile, setOpenMobile] = useState(false)
  const activeCount = Object.values(selected).reduce((n, arr) => n + (arr?.length ?? 0), 0)

  // Flatten the current selection into removable chips (with human labels).
  const activeChips = filterGroups.flatMap((group) =>
    (selected[group.id] ?? []).map((value) => ({
      groupId: group.id,
      value,
      label: group.options.find((o) => o.value === value)?.label ?? value,
    })),
  )

  return (
    <div className="rounded-3xl border border-line bg-surface p-5 shadow-soft sm:p-6">
      {/* Search + mobile toggle */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search packages, destinations…"
            aria-label="Search packages"
            className="w-full rounded-full border border-line bg-background py-3 pl-11 pr-4 text-sm text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
          />
        </div>
        <button
          type="button"
          onClick={() => setOpenMobile((v) => !v)}
          aria-expanded={openMobile}
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-3 text-sm font-semibold text-pine-900 lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters{activeCount > 0 && <span className="ml-0.5 rounded-full bg-saffron-400 px-1.5 text-xs text-pine-950">{activeCount}</span>}
        </button>
      </div>

      {/* Active filters */}
      {activeChips.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">Active:</span>
          {activeChips.map((chip) => (
            <button
              key={`${chip.groupId}:${chip.value}`}
              type="button"
              onClick={() => onToggle(chip.groupId, chip.value)}
              className="inline-flex items-center gap-1 rounded-full bg-pine-800 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-pine-700"
              aria-label={`Remove filter ${chip.label}`}
            >
              {chip.label}
              <X className="h-3 w-3" />
            </button>
          ))}
        </div>
      )}

      {/* Facets */}
      <div className={cn('mt-5 space-y-5', openMobile ? 'block' : 'hidden lg:block')}>
        {filterGroups.map((group) => (
          <fieldset key={group.id}>
            <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">{group.label}</legend>
            <div className="flex flex-wrap gap-2">
              {group.options.map((opt) => {
                const active = (selected[group.id] ?? []).includes(opt.value)
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onToggle(group.id, opt.value)}
                    className={cn(
                      'rounded-full border px-3.5 py-1.5 text-sm transition-all duration-200 ease-premium',
                      active
                        ? 'border-pine-800 bg-pine-800 text-white shadow-soft'
                        : 'border-line bg-background text-pine-800 hover:border-pine-300 hover:bg-white',
                    )}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {/* Footer: count + clear */}
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="text-sm text-muted">
          <span className="font-semibold text-pine-900">{resultCount}</span> package{resultCount === 1 ? '' : 's'}
        </span>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-pine-700 transition-colors hover:text-pine-900"
          >
            <X className="h-4 w-4" />
            Clear all
          </button>
        )}
      </div>
    </div>
  )
}
