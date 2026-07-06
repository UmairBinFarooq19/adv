import { memo } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, Gauge, ArrowRight, Check, Heart, Scale, MessageCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import Media from '@/components/ui/Media'
import StarRating from '@/components/ui/StarRating'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/data/catalog'
import { useFavorites } from '@/store/FavoritesContext'
import { useCompare } from '@/store/CompareContext'
import { useInquiry } from '@/store/InquiryContext'
import { packageWhatsApp } from '@/lib/whatsapp'

// The core package card. Content is fully data-driven; the actions (book,
// WhatsApp, favorite, compare) are wired to the global state layer. Memoised so
// grids of cards don't re-render when unrelated state changes.
function PackageCard({ pkg, className }) {
  const detailUrl = `/packages/${pkg.category}/${pkg.slug}`
  const { isFavorite, toggleFavorite } = useFavorites()
  const { isComparing, toggleCompare, canAdd } = useCompare()
  const { openInquiry } = useInquiry()

  const faved = isFavorite(pkg.slug)
  const comparing = isComparing(pkg.slug)
  const iconBtn = 'grid h-9 w-9 place-items-center rounded-full bg-pine-950/55 text-white backdrop-blur transition-colors hover:bg-pine-950/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400'

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-3xl bg-surface shadow-soft ring-1 ring-line/80',
        'transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift hover:ring-line',
        className,
      )}
    >
      {/* Image + overlays */}
      <div className="relative">
        <Link to={detailUrl} className="block aspect-[4/3] overflow-hidden" aria-label={`${pkg.title} — view details`}>
          <Media src={pkg.image} alt={pkg.title} imgClassName="transition-transform duration-700 ease-premium group-hover:scale-105" className="h-full w-full" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pine-950/45 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 flex items-center gap-1.5 text-sm font-medium text-white">
            <MapPin className="h-4 w-4 text-saffron-300" aria-hidden="true" />
            {pkg.location}
          </span>
        </Link>

        {pkg.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-saffron-400 px-3 py-1 text-xs font-semibold text-pine-950 shadow-soft">{pkg.badge}</span>
        )}

        {/* Favorite + compare */}
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => toggleFavorite(pkg.slug)}
            aria-pressed={faved}
            aria-label={faved ? 'Remove from favorites' : 'Save to favorites'}
            className={iconBtn}
          >
            <Heart className={cn('h-4 w-4', faved && 'fill-saffron-400 text-saffron-400')} />
          </button>
          <button
            type="button"
            onClick={() => toggleCompare(pkg.slug)}
            aria-pressed={comparing}
            disabled={!comparing && !canAdd}
            aria-label={comparing ? 'Remove from compare' : 'Add to compare'}
            className={cn(iconBtn, comparing && 'bg-saffron-400 text-pine-950 hover:bg-saffron-300', !comparing && !canAdd && 'cursor-not-allowed opacity-40')}
          >
            <Scale className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" />{pkg.duration}</span>
          <span className="inline-flex items-center gap-1.5"><Gauge className="h-4 w-4" aria-hidden="true" />{pkg.difficulty}</span>
        </span>
        <div className="mt-2"><StarRating value={pkg.rating} count={pkg.reviews} size="sm" /></div>

        <h3 className="mt-2 font-display text-xl font-semibold text-pine-900">
          <Link to={detailUrl} className="transition-colors hover:text-pine-700">{pkg.title}</Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{pkg.summary}</p>

        {pkg.highlights?.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {pkg.highlights.slice(0, 3).map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-pine-800">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-saffron-500" aria-hidden="true" />{h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto">
          <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
            <span>
              <span className="block text-xs text-muted">from</span>
              <span className="font-display text-2xl font-semibold text-pine-900">{formatPrice(pkg.priceFrom)}</span>
              <span className="text-xs text-muted"> / person</span>
            </span>
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="primary" size="md" className="flex-1" onClick={() => openInquiry(pkg)}>Book now</Button>
            <Button href={packageWhatsApp(pkg)} variant="outline" size="md" aria-label="Enquire on WhatsApp" className="px-3">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button to={detailUrl} variant="ghost" size="md" aria-label="View details" className="px-3">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default memo(PackageCard)
