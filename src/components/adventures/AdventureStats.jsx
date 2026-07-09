import { Clock, Gauge, CalendarDays, Users } from 'lucide-react'
import { cn } from '@/lib/cn'

// AdventureStats — the at-a-glance facts for an activity: Duration, Difficulty,
// Best season and Suitable for. Rendered as a semantic definition list (dl/dt/dd)
// for accessibility. Data-driven from one `activity`; reusable anywhere the four
// facts need showing (detail pages, comparisons, etc.).
const rows = (a) => [
  { icon: Clock, label: 'Duration', value: a.duration },
  { icon: Gauge, label: 'Difficulty', value: a.difficulty },
  { icon: CalendarDays, label: 'Best season', value: a.bestSeason },
  { icon: Users, label: 'Suitable for', value: a.suitableFor },
]

export default function AdventureStats({ activity, className }) {
  return (
    <dl className={cn('grid grid-cols-2 gap-4 sm:grid-cols-4', className)}>
      {rows(activity).map(({ icon: Icon, label, value }) => (
        <div key={label} className="rounded-3xl border border-line bg-surface p-5 shadow-soft">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-glacier-100 text-pine-700">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <dt className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted">{label}</dt>
          <dd className="mt-1 font-semibold text-pine-900">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
