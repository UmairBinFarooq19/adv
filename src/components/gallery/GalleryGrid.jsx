import { Heart, MapPin, Expand } from 'lucide-react'
import Media from '@/components/ui/Media'
import { cn } from '@/lib/cn'

// GalleryGrid — the masonry layout. Uses a CSS grid with row spanning rather than
// CSS columns, so photos keep their reading order (columns would run top-to-bottom
// per column, which scrambles keyboard/tab order). `span` from the data drives the
// variable sizing: tall / wide / big / regular.
//
// Each tile is a button that opens the lightbox, plus an independent favourite
// toggle. Images come through the shared Media component, so lazy loading and
// blur-up placeholders are inherited. Download is disabled on the tiles too.
const spans = {
  tall: 'row-span-2',
  wide: 'sm:col-span-2',
  big: 'sm:col-span-2 row-span-2',
}

export default function GalleryGrid({ photos = [], onOpen, isSaved, onToggleSave, className }) {
  if (!photos.length) {
    return <p className="py-16 text-center text-muted">No photographs match this filter yet.</p>
  }

  return (
    <ul className={cn('grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:grid-cols-3 sm:gap-4 lg:grid-cols-4', className)}>
      {photos.map((photo, i) => (
        <li key={photo.id} className={cn('group relative', spans[photo.span])}>
          <button
            type="button"
            onClick={() => onOpen(i)}
            aria-label={`Open photograph: ${photo.caption}`}
            className="h-full w-full overflow-hidden rounded-2xl ring-1 ring-line/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
            onContextMenu={(e) => e.preventDefault()}
          >
            <Media
              src={photo.src}
              alt={photo.caption}
              className="h-full w-full"
              imgClassName="select-none transition-transform duration-[900ms] ease-premium group-hover:scale-110"
              draggable={false}
            />
            {/* Caption + location scrim, revealed on hover / focus */}
            <span className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-pine-950/90 via-pine-950/20 to-transparent p-4 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
              <span className="line-clamp-2 text-sm font-medium leading-snug text-white">{photo.caption}</span>
              <span className="mt-1 flex items-center gap-1 text-xs text-pine-100">
                <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />{photo.location}
              </span>
            </span>
            <span className="pointer-events-none absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-pine-950/50 text-white opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
              <Expand className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>

          {/* Favourite toggle sits outside the open-button so both stay reachable */}
          <button
            type="button"
            onClick={() => onToggleSave(photo.id)}
            aria-pressed={isSaved(photo.id)}
            aria-label={`${isSaved(photo.id) ? 'Remove' : 'Save'} “${photo.caption}”`}
            className={cn(
              'absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-pine-950/50 text-white backdrop-blur transition-all duration-300 hover:bg-pine-950/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400',
              !isSaved(photo.id) && 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100',
            )}
          >
            <Heart className={cn('h-4 w-4', isSaved(photo.id) && 'fill-saffron-400 text-saffron-400')} aria-hidden="true" />
          </button>
        </li>
      ))}
    </ul>
  )
}
