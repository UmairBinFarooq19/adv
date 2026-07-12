import { ExternalLink } from 'lucide-react'
import StarRating from '@/components/ui/StarRating'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'

// PlatformSummary — a summary card per external review platform (Google,
// TripAdvisor). Data-driven from one `platform`.
//
// When `platform.url` is null the CTA renders disabled rather than linking to a
// dead page — add the real profile URL to the data and the button activates with
// no code change. Reuses StarRating and Button.
export default function PlatformSummary({ platform, ctaLabel, className }) {
  const Icon = platform.icon
  const live = Boolean(platform.url)

  return (
    <article className={cn('flex h-full flex-col rounded-3xl border border-line bg-surface p-7 shadow-soft', className)}>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-glacier-100 text-pine-700">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="font-display text-lg font-semibold text-pine-900">{platform.name}</h3>
      </div>

      {platform.rating != null ? (
        <>
          <p className="mt-5 flex items-baseline gap-2">
            <span className="font-display text-4xl font-semibold text-pine-900">{platform.rating.toFixed(1)}</span>
            <span className="text-sm text-muted">/ 5</span>
          </p>
          <StarRating value={platform.rating} className="mt-2" />
          <p className="mt-2 text-sm text-muted">{platform.count} reviews</p>
        </>
      ) : (
        <p className="mt-5 text-sm font-medium text-muted">Reviews coming soon</p>
      )}
      <p className="mt-4 text-sm leading-relaxed text-muted">{platform.blurb}</p>

      <div className="mt-auto pt-6">
        {live ? (
          <Button href={platform.url} variant="outline" size="md" className="w-full">
            {ctaLabel} <ExternalLink className="h-4 w-4" />
          </Button>
        ) : (
          <span className="flex w-full items-center justify-center gap-2 rounded-full border border-dashed border-line px-4 py-2.5 text-sm text-muted">
            Profile link coming soon
          </span>
        )}
      </div>
    </article>
  )
}
