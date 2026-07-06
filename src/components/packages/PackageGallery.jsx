import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import Media from '@/components/ui/Media'
import { cn } from '@/lib/cn'

// Responsive gallery grid with a keyboard-accessible lightbox that supports
// zoom and fullscreen. First image spans two columns for an editorial feel.
// Lightbox keys: Esc closes, ←/→ navigate, +/- or click toggles zoom, F fullscreen.
export default function PackageGallery({ images = [] }) {
  const [active, setActive] = useState(null)
  const [zoom, setZoom] = useState(false)
  const dialogRef = useRef(null)
  const isOpen = active !== null

  const close = useCallback(() => setActive(null), [])
  const step = useCallback(
    (dir) => { setZoom(false); setActive((i) => (i === null ? i : (i + dir + images.length) % images.length)) },
    [images.length],
  )
  const toggleFullscreen = useCallback(() => {
    const el = dialogRef.current
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen?.()
    else el.requestFullscreen?.().catch(() => {})
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === '+' || e.key === '=') setZoom(true)
      else if (e.key === '-') setZoom(false)
      else if (e.key.toLowerCase() === 'f') toggleFullscreen()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [isOpen, close, step, toggleFullscreen])

  if (images.length === 0) return null
  const ctrl = 'grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400'

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {images.map((src, i) => (
          <li key={src + i} className={cn(i === 0 && 'col-span-2 row-span-2')}>
            <button
              type="button"
              onClick={() => { setZoom(false); setActive(i) }}
              className="group block h-full w-full overflow-hidden rounded-2xl ring-1 ring-line/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
              aria-label={`Open image ${i + 1} of ${images.length}`}
            >
              <Media src={src} alt="" className={cn('h-full w-full', i === 0 ? 'aspect-square md:aspect-[4/3]' : 'aspect-square')} imgClassName="transition-transform duration-700 ease-premium group-hover:scale-105" />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dialogRef}
            role="dialog" aria-modal="true" aria-label="Image gallery"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-pine-950/95 p-4 backdrop-blur"
            onClick={close}
          >
            {/* Controls */}
            <div className="absolute right-4 top-4 z-10 flex gap-2">
              <button type="button" onClick={(e) => { e.stopPropagation(); setZoom((z) => !z) }} aria-label={zoom ? 'Zoom out' : 'Zoom in'} className={ctrl}>
                {zoom ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); toggleFullscreen() }} aria-label="Toggle fullscreen" className={ctrl}>
                <Maximize2 className="h-5 w-5" />
              </button>
              <button type="button" onClick={close} aria-label="Close gallery" className={ctrl}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <button type="button" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="Previous image" className={cn(ctrl, 'absolute left-3 h-12 w-12 sm:left-6')}>
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="max-h-[86vh] max-w-[92vw] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={active}
                src={images[active]}
                alt={`Image ${active + 1} of ${images.length}`}
                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }}
                onClick={() => setZoom((z) => !z)}
                className={cn('rounded-2xl object-contain shadow-lift transition-all duration-300', zoom ? 'w-[180%] max-w-none cursor-zoom-out sm:w-[150%]' : 'max-h-[86vh] w-auto max-w-[92vw] cursor-zoom-in')}
              />
            </div>

            <button type="button" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="Next image" className={cn(ctrl, 'absolute right-3 h-12 w-12 sm:right-6')}>
              <ChevronRight className="h-6 w-6" />
            </button>
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">{active + 1} / {images.length}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
