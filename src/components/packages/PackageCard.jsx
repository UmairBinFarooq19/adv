import { Link } from 'react-router-dom'
import { MapPin, Clock, Gauge, ArrowRight, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import StarRating from '@/components/ui/StarRating'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/data/catalog'

// The core package card, reused on the landing, every collection page and the
// "related" strip. Driven entirely by a package object from the catalog — no
// per-package markup. Hover lifts the card and gently zooms the image.
export default function PackageCard({ pkg, className }) {
  const detailUrl = `/packages/${pkg.category}/${pkg.slug}`
  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-3xl bg-surface shadow-soft ring-1 ring-line/80',
        'transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift hover:ring-line',
        className,
      )}
    >
      {/* Image + badges */}
      <Link to={detailUrl} className="relative block aspect-[4/3] overflow-hidden" aria-label={`${pkg.title} — view details`}>
        <img
          src={pkg.image}
          alt={pkg.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pine-950/45 via-transparent to-transparent" />
        {pkg.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-saffron-400 px-3 py-1 text-xs font-semibold text-pine-950 shadow-soft">
            {pkg.badge}
          </span>
        )}
        {pkg.difficulty && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-pine-950/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            <Gauge className="h-3 w-3" aria-hidden="true" />
            {pkg.difficulty}
          </span>
        )}
        <span className="absolute bottom-4 left-4 flex items-center gap-1.5 text-sm font-medium text-white">
          <MapPin className="h-4 w-4 text-saffron-300" aria-hidden="true" />
          {pkg.location}
        </span>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-sm text-muted">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {pkg.duration}
          </span>
          <StarRating value={pkg.rating} count={pkg.reviews} size="sm" />
        </div>

        <h3 className="mt-2 font-display text-xl font-semibold text-pine-900">
          <Link to={detailUrl} className="transition-colors hover:text-pine-700">
            {pkg.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{pkg.summary}</p>

        {/* Highlights */}
        {pkg.highlights?.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {pkg.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-pine-800">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-saffron-500" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Price + actions */}
        <div className="mt-auto">
          <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
            <span>
              <span className="block text-xs text-muted">from</span>
              <span className="font-display text-2xl font-semibold text-pine-900">{formatPrice(pkg.priceFrom)}</span>
              <span className="text-xs text-muted"> / person</span>
            </span>
          </div>
          <div className="mt-4 flex gap-2">
            <Button to="/contact" variant="primary" size="md" className="flex-1">
              Book now
            </Button>
            <Button to={detailUrl} variant="outline" size="md" className="flex-1">
              Details
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}
