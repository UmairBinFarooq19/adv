import { Link } from 'react-router-dom'
import { BadgeCheck, Globe, CalendarDays, Package, Quote } from 'lucide-react'
import StarRating from '@/components/ui/StarRating'
import Media from '@/components/ui/Media'
import { cn } from '@/lib/cn'
import { getPackage } from '@/data/catalog'
import { formatDate } from '@/lib/date'

const initials = (name) => name.split(/[\s&]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

// ReviewCard — one testimonial: star rating, title, quote, and the metadata that
// makes a review credible — verified badge, package booked, travel date and
// country. The package is resolved at render time from its slug against the
// catalog, so the link can never point at a trip that no longer exists (and an
// unknown slug simply renders as plain text rather than a broken link).
//
// Photos are optional; when present, each opens the shared lightbox via `onPhoto`.
// Avatars are initials on a brand gradient, so no photo assets are needed.
export default function ReviewCard({ review, onPhoto, className }) {
  const pkg = getPackage(review.slug)
  const travelled = formatDate(`${review.travelDate}-01`, { month: 'long', year: 'numeric' })

  return (
    <article className={cn('flex h-full flex-col rounded-3xl border border-line bg-surface p-7 shadow-soft transition-all duration-500 ease-premium hover:-translate-y-1 hover:shadow-lift', className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-pine text-sm font-semibold text-white">
            {initials(review.name)}
          </span>
          <span>
            <span className="flex items-center gap-1.5 font-semibold text-pine-900">
              {review.name}
              {review.verified && <BadgeCheck className="h-4 w-4 text-saffron-600" aria-label="Verified guest" />}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted">
              <Globe className="h-3 w-3" aria-hidden="true" />{review.country}
            </span>
          </span>
        </div>
        <Quote className="h-6 w-6 shrink-0 text-saffron-500/40" aria-hidden="true" />
      </div>

      <StarRating value={review.rating} className="mt-5" />
      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-pine-900">{review.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{review.quote}</p>

      {review.photos.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {review.photos.map((src, i) => (
            <li key={src + i}>
              <button
                type="button"
                onClick={() => onPhoto?.(review, i)}
                aria-label={`Open photo ${i + 1} of ${review.photos.length} from ${review.name}'s review`}
                className="block overflow-hidden rounded-xl ring-1 ring-line/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
              >
                <Media src={src} alt="" className="h-16 w-20" imgClassName="transition-transform duration-500 ease-premium hover:scale-110" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-auto space-y-2 border-t border-line pt-5 text-sm">
        <div className="flex items-center gap-2">
          <dt className="flex items-center gap-1.5 text-muted"><Package className="h-3.5 w-3.5" aria-hidden="true" />Package</dt>
          <dd className="ml-auto min-w-0 truncate text-right font-medium text-pine-900">
            {pkg ? (
              <Link to={`/packages/${pkg.category}/${pkg.slug}`} className="transition-colors hover:text-pine-700 hover:underline">{pkg.title}</Link>
            ) : (
              review.slug
            )}
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="flex items-center gap-1.5 text-muted"><CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />Travelled</dt>
          <dd className="ml-auto font-medium text-pine-900">{travelled}</dd>
        </div>
      </dl>
    </article>
  )
}
