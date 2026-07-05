import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

// Responsive gallery grid with a keyboard-accessible lightbox. First image spans
// two columns for an editorial feel. Lightbox: Esc closes, ←/→ navigate, focus
// is sent to the dialog. `images`: string[].
export default function PackageGallery({ images = [] }) {
  const [active, setActive] = useState(null) // index or null
  const isOpen = active !== null

  const close = useCallback(() => setActive(null), [])
  const step = useCallback(
    (dir) => setActive((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  )

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close, step])

  if (images.length === 0) return null

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {images.map((src, i) => (
          <li key={src + i} className={cn(i === 0 && 'col-span-2 row-span-2')}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group block h-full w-full overflow-hidden rounded-2xl ring-1 ring-line/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
              aria-label={`Open image ${i + 1} of ${images.length}`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className={cn(
                  'h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105',
                  i === 0 ? 'aspect-square md:aspect-[4/3]' : 'aspect-square',
                )}
              />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-pine-950/90 p-4 backdrop-blur"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(-1) }}
              aria-label="Previous image"
              className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.img
              key={active}
              src={images[active]}
              alt={`Image ${active + 1} of ${images.length}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82vh] w-auto max-w-[92vw] rounded-2xl object-contain shadow-lift"
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); step(1) }}
              aria-label="Next image"
              className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
              {active + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
