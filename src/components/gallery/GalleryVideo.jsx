import { useState } from 'react'
import { Play, MapPin, Clock, X } from 'lucide-react'
import Media from '@/components/ui/Media'
import { cn } from '@/lib/cn'

// GalleryVideo — the reusable video gallery. Videos are grouped by `kind`
// (Drone footage / Adventure videos / Skiing videos / Travel reels) and rendered
// as poster cards with the blur-up Media loader.
//
// A card is only playable when its data carries an `href`. With `href: null`
// (the current placeholder data) the card renders as a non-interactive "coming
// soon" poster rather than a play button wired to a dead player. Add a real URL
// to the data and the same card becomes a working, keyboard-accessible player —
// no component change needed.
export default function GalleryVideo({ videos = [], kinds = [], className }) {
  const [playing, setPlaying] = useState(null)
  const groups = kinds
    .map((kind) => ({ kind, items: videos.filter((v) => v.kind === kind) }))
    .filter((g) => g.items.length > 0)

  return (
    <div className={cn('space-y-12', className)}>
      {groups.map(({ kind, items }) => (
        <section key={kind} aria-label={kind}>
          <h3 className="font-display text-xl font-semibold text-pine-900">{kind}</h3>
          <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {items.map((v) => {
              const playable = Boolean(v.href)
              return (
                <li key={v.id}>
                  <article className={cn('group relative isolate overflow-hidden rounded-3xl shadow-soft ring-1 ring-line/40 transition-all duration-500 ease-premium', playable && 'hover:-translate-y-1.5 hover:shadow-lift')}>
                    <div className="relative aspect-video">
                      <Media src={v.poster} alt="" className="h-full w-full" imgClassName={cn('transition-transform duration-[900ms] ease-premium', playable && 'group-hover:scale-105')} />
                      <div className="absolute inset-0 bg-gradient-to-t from-pine-950/90 via-pine-950/25 to-transparent" />

                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-pine-950/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                        <Clock className="h-3 w-3" aria-hidden="true" /> {v.duration}
                      </span>

                      {playable ? (
                        <button
                          type="button"
                          onClick={() => setPlaying(v)}
                          aria-label={`Play ${v.title}`}
                          className="absolute inset-0 grid place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-saffron-400"
                        >
                          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-transform duration-500 ease-premium group-hover:scale-110">
                            <Play className="ml-0.5 h-7 w-7 fill-current" aria-hidden="true" />
                          </span>
                        </button>
                      ) : (
                        <span className="absolute inset-0 grid place-items-center">
                          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/10 text-white/60 backdrop-blur">
                            <Play className="ml-0.5 h-7 w-7" aria-hidden="true" />
                          </span>
                        </span>
                      )}

                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <h4 className="font-display text-lg font-semibold leading-snug">{v.title}</h4>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-pine-100">
                          <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />{v.location}
                          {!playable && <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 font-medium">Coming soon</span>}
                        </p>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </section>
      ))}

      {/* Player modal — only reachable when a video has a real href */}
      {playing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Playing ${playing.title}`}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-pine-950/95 p-4 backdrop-blur"
          onClick={() => setPlaying(null)}
        >
          <button type="button" onClick={() => setPlaying(null)} aria-label="Close video" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400">
            <X className="h-5 w-5" />
          </button>
          <video
            src={playing.href}
            poster={playing.poster}
            controls
            autoPlay
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-5xl rounded-2xl shadow-lift"
          >
            <track kind="captions" />
          </video>
        </div>
      )}
    </div>
  )
}
