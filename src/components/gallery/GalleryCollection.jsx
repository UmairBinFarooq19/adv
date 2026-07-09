import { ArrowRight, Images } from 'lucide-react'
import Media from '@/components/ui/Media'
import { cn } from '@/lib/cn'

// GalleryCollection — a curated set presented as an editorial cover card. Clicking
// one applies its category filter to the grid (the parent owns that state), so
// collections are a curated doorway into the same data rather than a separate
// copy of it. Data-driven from one `collection`.
export default function GalleryCollection({ collection, onSelect, className }) {
  return (
    <article className={cn('group relative isolate flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-3xl text-white shadow-soft transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift', className)}>
      <Media src={collection.cover} alt="" className="absolute inset-0 -z-10 h-full w-full" imgClassName="transition-transform duration-[900ms] ease-premium group-hover:scale-110" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-pine-950 via-pine-950/50 to-pine-900/10" />
      <div className="p-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
          <Images className="h-3.5 w-3.5 text-saffron-300" aria-hidden="true" /> {collection.count} photographs
        </span>
        <h3 className="mt-3 font-display text-2xl font-semibold">
          <button type="button" onClick={() => onSelect(collection.filter)} className="text-left after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400">
            {collection.title}
          </button>
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-pine-100">{collection.desc}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
          View collection <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </article>
  )
}
