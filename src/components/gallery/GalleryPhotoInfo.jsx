import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Camera, Share2, Check, ArrowRight, Heart, Tag } from 'lucide-react'
import { getDestination } from '@/data/destinationGuides'
import { getActivity } from '@/data/adventures'
import { getPackage } from '@/data/catalog'
import { getCategory } from '@/data/gallery'
import { cn } from '@/lib/cn'

// GalleryPhotoInfo — the detail panel shown beside a photo in the lightbox:
// caption, location, photographer, category tags, a favourite toggle, a share
// button and links to the related destination / adventure / package.
//
// Cross-links are resolved at render time against the live data (destinationGuides,
// adventures, catalog). An unknown slug simply renders nothing, so a link here can
// never 404. Reusable anywhere a photo's metadata needs presenting.
export default function GalleryPhotoInfo({ photo, isSaved, onToggleSave, onNavigate, className }) {
  const [copied, setCopied] = useState(false)
  if (!photo) return null

  const destination = photo.destination ? getDestination(photo.destination) : null
  const activity = photo.activity ? getActivity(photo.activity) : null
  const pkg = photo.package ? getPackage(photo.package) : null

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}?photo=${photo.id}`
    const data = { title: photo.caption, text: `${photo.caption} — ${photo.location}`, url }
    try {
      if (navigator.share) await navigator.share(data)
      else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      /* user dismissed the share sheet — nothing to do */
    }
  }

  const links = [
    destination && { to: `/destinations/${destination.slug}`, label: destination.name, kind: 'Destination' },
    activity && { to: `/adventures/${activity.slug}`, label: activity.name, kind: 'Adventure' },
    pkg && { to: `/packages/${pkg.category}/${pkg.slug}`, label: pkg.title, kind: 'Package' },
  ].filter(Boolean)

  return (
    <aside className={cn('flex w-full flex-col gap-5 text-white lg:max-w-sm', className)} aria-label="Photo details">
      <div>
        <p className="font-display text-lg leading-snug">{photo.caption}</p>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-pine-100">
          <MapPin className="h-4 w-4 shrink-0 text-saffron-300" aria-hidden="true" /> {photo.location}
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-pine-100">
          <Camera className="h-4 w-4 shrink-0 text-saffron-300" aria-hidden="true" /> Photograph by {photo.photographer}
        </p>
      </div>

      {/* Category tags */}
      <div>
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-pine-100/70">
          <Tag className="h-3.5 w-3.5" aria-hidden="true" /> Tags
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {photo.categories.map((id) => (
            <li key={id} className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium backdrop-blur">
              {getCategory(id)?.label ?? id}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onToggleSave(photo.id)}
          aria-pressed={isSaved}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
        >
          <Heart className={cn('h-4 w-4', isSaved ? 'fill-saffron-400 text-saffron-400' : '')} aria-hidden="true" />
          {isSaved ? 'Saved' : 'Save'}
        </button>
        <button
          type="button"
          onClick={share}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
        >
          {copied ? <Check className="h-4 w-4 text-saffron-300" aria-hidden="true" /> : <Share2 className="h-4 w-4" aria-hidden="true" />}
          {copied ? 'Link copied' : 'Share'}
        </button>
      </div>

      {/* Related links */}
      {links.length > 0 && (
        <div className="border-t border-white/15 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-pine-100/70">Seen on</p>
          <ul className="mt-3 space-y-2">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={onNavigate}
                  className="group flex items-center gap-3 rounded-2xl bg-white/5 px-3.5 py-2.5 transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-saffron-300">{l.kind}</span>
                    <span className="block truncate text-sm font-medium">{l.label}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}
