import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Media from '@/components/ui/Media'
import { cn } from '@/lib/cn'

// AdventureGallery — an editorial masonry gallery (CSS columns + varied ratios)
// with a keyboard-accessible lightbox. Reuses the blur-up <Media> loader and the
// shared motion feel. Accepts images as strings or { src, alt }. Reusable for the
// landing showcase and every activity's gallery.
const ratios = ['aspect-[4/5]', 'aspect-[4/3]', 'aspect-square', 'aspect-[3/4]', 'aspect-[5/4]', 'aspect-[4/3]']

export default function AdventureGallery({ images = [], className }) {
  const imgs = images.map((x) => (typeof x === 'string' ? { src: x, alt: '' } : x))
  const [active, setActive] = useState(null)
  const isOpen = active !== null

  const close = useCallback(() => setActive(null), [])
  const step = useCallback((dir) => setActive((i) => (i === null ? i : (i + dir + imgs.length) % imgs.length)), [imgs.length])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [isOpen, close, step])

  if (imgs.length === 0) return null
  const ctrl = 'grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400'

  return (
    <>
      <div className={cn('columns-2 gap-4 md:columns-3 [&>*]:mb-4', className)}>
        {imgs.map((im, i) => (
          <button
            key={im.src + i}
            type="button"
            onClick={() => setActive(i)}
            className="group block w-full overflow-hidden rounded-2xl ring-1 ring-line/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
            aria-label={im.alt ? `Open image: ${im.alt}` : `Open image ${i + 1} of ${imgs.length}`}
          >
            <Media src={im.src} alt={im.alt} className={cn('w-full', ratios[i % ratios.length])} imgClassName="transition-transform duration-700 ease-premium group-hover:scale-105" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog" aria-modal="true" aria-label="Adventure gallery"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-pine-950/95 p-4 backdrop-blur"
            onClick={close}
          >
            <button type="button" onClick={close} aria-label="Close gallery" className={cn(ctrl, 'absolute right-4 top-4')}>
              <X className="h-5 w-5" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous image" className={cn(ctrl, 'absolute left-3 h-12 w-12 sm:left-6')}>
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.img
              key={active}
              src={imgs[active].src}
              alt={imgs[active].alt || `Image ${active + 1} of ${imgs.length}`}
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[86vh] w-auto max-w-[92vw] rounded-2xl object-contain shadow-lift"
            />
            <button type="button" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next image" className={cn(ctrl, 'absolute right-3 h-12 w-12 sm:right-6')}>
              <ChevronRight className="h-6 w-6" />
            </button>
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">{active + 1} / {imgs.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
