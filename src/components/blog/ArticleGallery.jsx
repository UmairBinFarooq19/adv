import AdventureGallery from '@/components/adventures/AdventureGallery'
import { cn } from '@/lib/cn'

// ArticleGallery — the in-article photo set. It reuses AdventureGallery (masonry
// + blur-up Media + keyboard-accessible lightbox) rather than reimplementing any
// of it, and adds an optional caption list beneath. Data-driven from the
// article's `gallery` array of { src, alt, caption }.
export default function ArticleGallery({ images = [], className }) {
  if (!images.length) return null
  return (
    <figure className={cn('not-prose', className)}>
      <AdventureGallery images={images} />
      <figcaption className="mt-4 text-sm text-muted">
        {images.filter((i) => i.caption).map((i) => i.caption).join(' · ')}
      </figcaption>
    </figure>
  )
}
