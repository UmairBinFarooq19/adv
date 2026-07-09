import { Link } from 'react-router-dom'
import { MapPin, Mountain, ArrowRight } from 'lucide-react'
import Media from '@/components/ui/Media'
import { cn } from '@/lib/cn'

// DestinationCard — an interactive, image-forward card. The name sits over the
// photo; hovering (or focusing) lifts the card and reveals the blurb and a
// prompt. Fully data-driven from one `destination`. Reuses the blur-up Media
// loader and the shared card motion. Used in grids and the Nearby section.
export default function DestinationCard({ destination, className }) {
  const to = `/destinations/${destination.slug}`
  return (
    <article className={cn('group relative isolate flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-3xl text-white shadow-soft ring-1 ring-line/20 transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift', className)}>
      <Media src={destination.image} alt={destination.name} className="absolute inset-0 -z-10 h-full w-full" imgClassName="transition-transform duration-[900ms] ease-premium group-hover:scale-110" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-pine-950 via-pine-950/45 to-pine-900/10" />

      <div className="p-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
          <MapPin className="h-3.5 w-3.5 text-saffron-300" aria-hidden="true" /> {destination.region}
        </span>
        <h3 className="mt-3 font-display text-2xl font-semibold">
          <Link to={to} className="after:absolute after:inset-0" aria-label={`${destination.name} — view guide`}>{destination.name}</Link>
        </h3>
        <p className="mt-1 text-sm font-medium text-saffron-200">{destination.tagline}</p>

        {/* Revealed on hover / focus-within */}
        <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-premium group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100">
          <div className="overflow-hidden">
            <p className="pt-2 text-sm leading-relaxed text-pine-100">{destination.blurb}</p>
            <span className="mt-3 inline-flex items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1 text-pine-100"><Mountain className="h-4 w-4" aria-hidden="true" />{destination.elevation}</span>
              <span className="ml-auto inline-flex items-center gap-1.5 font-semibold text-white">Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
