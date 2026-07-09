import { Link } from 'react-router-dom'
import { Clock, Gauge, ArrowRight, MessageCircle } from 'lucide-react'
import Media from '@/components/ui/Media'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/data/catalog'
import { waLink } from '@/lib/whatsapp'

// AdventureCard — a single activity in a catalogue grid, in the site's exact
// card language (rounded, soft shadow, hover-lift, blur-up Media, saffron
// accents). Fully data-driven from one `activity`. Links into the detail page
// and offers a one-tap WhatsApp enquiry. Reusable for any activity grid.
export default function AdventureCard({ activity, className }) {
  const to = `/adventures/${activity.slug}`
  const Icon = activity.icon
  const wa = waLink(`Hello AdventuresKashmir, I am interested in the ${activity.name} adventure. Could you share details and availability?`)

  return (
    <article className={cn('group flex h-full flex-col overflow-hidden rounded-3xl bg-surface shadow-soft ring-1 ring-line/80 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift hover:ring-line', className)}>
      <div className="relative">
        <Link to={to} className="block aspect-[4/3] overflow-hidden" aria-label={`${activity.name} — view details`}>
          <Media src={activity.image} alt={activity.name} className="h-full w-full" imgClassName="transition-transform duration-700 ease-premium group-hover:scale-105" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pine-950/50 via-transparent to-transparent" />
        </Link>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold capitalize text-pine-800 shadow-soft backdrop-blur">
          {activity.season}
        </span>
        {Icon && (
          <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-pine-950/55 text-saffron-300 backdrop-blur">
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" />{activity.duration}</span>
          <span className="inline-flex items-center gap-1.5"><Gauge className="h-4 w-4" aria-hidden="true" />{activity.difficulty}</span>
        </span>

        <h3 className="mt-2 font-display text-xl font-semibold text-pine-900">
          <Link to={to} className="transition-colors hover:text-pine-700">{activity.name}</Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{activity.tagline}. {activity.overview.split('. ')[0]}.</p>

        <div className="mt-auto">
          <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
            <span>
              <span className="block text-xs text-muted">from</span>
              <span className="font-display text-2xl font-semibold text-pine-900">{formatPrice(activity.priceFrom)}</span>
              <span className="text-xs text-muted"> / person</span>
            </span>
          </div>
          <div className="mt-4 flex gap-2">
            <Button to={to} variant="primary" size="md" className="flex-1">Explore <ArrowRight className="h-4 w-4" /></Button>
            <Button href={wa} variant="outline" size="md" aria-label={`Enquire about ${activity.name} on WhatsApp`} className="px-3">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
