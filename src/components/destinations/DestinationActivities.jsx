import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getActivity } from '@/data/adventures'
import { cn } from '@/lib/cn'

// DestinationActivities — cross-links a destination to the Adventures section.
// It resolves the destination's `activitySlugs` against the adventures data at
// render time (getActivity), so an activity's name and icon stay in sync with a
// single source of truth. Unknown slugs are skipped, so a link can never break.
export default function DestinationActivities({ activitySlugs = [], className }) {
  const items = activitySlugs.map(getActivity).filter(Boolean)
  if (!items.length) return null

  return (
    <ul className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {items.map((a) => {
        const Icon = a.icon
        return (
          <li key={a.slug}>
            <Link
              to={`/adventures/${a.slug}`}
              className="group flex h-full items-center gap-4 rounded-3xl border border-line bg-surface p-5 shadow-soft transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-glacier-100 text-pine-700 transition-colors group-hover:bg-pine-800 group-hover:text-saffron-300">
                {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-semibold text-pine-900">{a.name}</span>
                <span className="mt-0.5 block text-xs text-muted">{a.duration} · {a.difficulty}</span>
              </span>
              <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-pine-700" aria-hidden="true" />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
