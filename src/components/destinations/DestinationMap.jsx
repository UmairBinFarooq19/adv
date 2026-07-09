import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { destinations as allDestinations } from '@/data/destinationGuides'
import ContourDivider from '@/components/ui/ContourDivider'
import { cn } from '@/lib/cn'

// DestinationMap — a stylized, data-driven overview map. Each destination's
// `mapPos` ({ x, y } as percentages) places a real <Link> pin, so the map is
// keyboard-navigable and every pin is a crawlable internal link — no map library,
// API key or bundle cost. `activeSlug` highlights the current place; pass a
// subset via `items` to map only nearby destinations. Add a destination to the
// data and its pin appears automatically.
export default function DestinationMap({ items = allDestinations, activeSlug, className }) {
  return (
    <div className={cn('relative overflow-hidden rounded-4xl bg-gradient-pine text-white shadow-lift ring-1 ring-line/20', className)}>
      {/* Decorative contour "terrain" backdrop — reuses the brand divider motif */}
      <div className="pointer-events-none absolute inset-0 text-saffron-400/10" aria-hidden="true">
        <ContourDivider className="absolute inset-x-0 top-1/4 h-40" opacity={0.6} />
        <ContourDivider className="absolute inset-x-0 top-2/3 h-40" opacity={0.4} />
      </div>

      <div className="relative aspect-[16/10] w-full sm:aspect-[16/8]">
        {/* Region labels */}
        <span className="absolute left-[6%] top-[6%] text-xs font-semibold uppercase tracking-[0.2em] text-pine-100/70">Kashmir Valley</span>
        <span className="absolute right-[6%] top-[6%] text-xs font-semibold uppercase tracking-[0.2em] text-pine-100/70">Ladakh</span>

        {items.map((d) => {
          const active = d.slug === activeSlug
          return (
            <Link
              key={d.slug}
              to={`/destinations/${d.slug}`}
              style={{ left: `${d.mapPos.x}%`, top: `${d.mapPos.y}%` }}
              className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
              aria-label={`${d.name}, ${d.region} — view guide`}
              aria-current={active ? 'page' : undefined}
            >
              <span className="flex flex-col items-center">
                <span
                  className={cn(
                    'grid h-8 w-8 place-items-center rounded-full ring-2 transition-all duration-300 ease-premium group-hover:scale-125',
                    active ? 'bg-saffron-400 text-pine-950 ring-white' : 'bg-pine-950/70 text-saffron-300 ring-white/40 group-hover:bg-saffron-400 group-hover:text-pine-950',
                  )}
                >
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </span>
                <span
                  className={cn(
                    'mt-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold backdrop-blur transition-colors',
                    active ? 'bg-white text-pine-900' : 'bg-pine-950/60 text-pine-100 group-hover:bg-white group-hover:text-pine-900',
                  )}
                >
                  {d.name}
                </span>
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
