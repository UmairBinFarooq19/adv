import { cn } from '@/lib/cn'

// GalleryFilter — the category chip bar. Data-driven from `categories`; it renders
// a real radio group so arrow keys move between filters and screen readers
// announce the active one. Purely presentational: the parent owns the state.
export default function GalleryFilter({ categories = [], active = 'all', onChange, counts = {}, className }) {
  const chips = [{ id: 'all', label: 'All' }, ...categories]
  return (
    <div role="radiogroup" aria-label="Filter photographs by category" className={cn('flex flex-wrap gap-2', className)}>
      {chips.map((c) => {
        const Icon = c.icon
        const selected = active === c.id
        const n = c.id === 'all' ? counts.all : counts[c.id]
        return (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(c.id)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400',
              selected
                ? 'border-pine-800 bg-pine-800 text-white shadow-soft'
                : 'border-line bg-surface text-pine-800 hover:-translate-y-0.5 hover:border-pine-300 hover:shadow-soft',
            )}
          >
            {Icon && <Icon className={cn('h-4 w-4', selected ? 'text-saffron-300' : 'text-saffron-600')} aria-hidden="true" />}
            {c.label}
            {n != null && <span className={cn('text-xs', selected ? 'text-pine-100' : 'text-muted')}>{n}</span>}
          </button>
        )
      })}
    </div>
  )
}
