import AdventureGallery from '@/components/adventures/AdventureGallery'

// DestinationGallery — the destination photo gallery. Rather than reimplement a
// masonry + lightbox, it reuses the existing AdventureGallery (which already
// handles masonry layout, the blur-up Media loader and a keyboard-accessible
// lightbox), presenting a destination-specific name. Add richer behaviour here
// later without changing call sites.
export default function DestinationGallery({ images = [], className }) {
  return <AdventureGallery images={images} className={className} />
}
