import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

// Accessible, SEO-friendly breadcrumb. Renders a semantic <nav><ol> with
// aria-current on the last crumb. Pair with a BreadcrumbList JSON-LD (see
// useSeo) for rich results. `items`: [{ label, to? }] — last item is current.
export default function Breadcrumbs({ items = [], className, tone = 'light' }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          'flex flex-wrap items-center gap-1.5 text-sm',
          tone === 'light' ? 'text-pine-100' : 'text-muted',
        )}
      >
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.to && !last ? (
                <Link
                  to={item.to}
                  className={cn(
                    'transition-colors',
                    tone === 'light' ? 'hover:text-white' : 'hover:text-pine-900',
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'font-medium opacity-90' : ''}>
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
