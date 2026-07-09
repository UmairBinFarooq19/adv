import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react'
import GalleryPhotoInfo from './GalleryPhotoInfo'
import { cn } from '@/lib/cn'

// GalleryLightbox — the fullscreen photo viewer.
//
// Keyboard: ← / → step, +/− zoom, 0 resets, F toggles fullscreen, Esc closes.
// Focus is trapped while open and returned to the trigger on close; the panel is
// a labelled modal dialog. Zoom pans by dragging when zoomed in.
// Download is disabled (no context menu, no drag, no long-press save), which
// deters casual copying without pretending to be true DRM.
// Data-driven: it renders whatever photo objects it is handed.
export default function GalleryLightbox({ photos = [], index, onClose, onIndex, isSaved, onToggleSave }) {
  const open = index !== null && index >= 0
  const photo = open ? photos[index] : null
  const [zoom, setZoom] = useState(1)
  const [fs, setFs] = useState(false)
  const shellRef = useRef(null)
  const closeRef = useRef(null)
  const restoreRef = useRef(null)

  const step = useCallback((dir) => { setZoom(1); onIndex((index + dir + photos.length) % photos.length) }, [index, photos.length, onIndex])
  const zoomIn = useCallback(() => setZoom((z) => Math.min(3, +(z + 0.5).toFixed(1))), [])
  const zoomOut = useCallback(() => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(1))), [])

  const toggleFullscreen = useCallback(async () => {
    const el = shellRef.current
    if (!el) return
    try {
      if (!document.fullscreenElement) { await el.requestFullscreen(); setFs(true) }
      else { await document.exitFullscreen(); setFs(false) }
    } catch { /* fullscreen unsupported or blocked — the modal still fills the viewport */ }
  }, [])

  // Track external fullscreen exits (Esc from the browser chrome).
  useEffect(() => {
    const onFsChange = () => setFs(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  // Remember the trigger, lock scroll, focus the dialog; restore all on close.
  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => closeRef.current?.focus(), 40)
    return () => {
      document.body.style.overflow = ''
      clearTimeout(t)
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
      restoreRef.current?.focus?.()
    }
  }, [open])

  // Keyboard controls + focus trap.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      switch (e.key) {
        case 'Escape': e.preventDefault(); onClose(); break
        case 'ArrowRight': e.preventDefault(); step(1); break
        case 'ArrowLeft': e.preventDefault(); step(-1); break
        case '+': case '=': e.preventDefault(); zoomIn(); break
        case '-': e.preventDefault(); zoomOut(); break
        case '0': e.preventDefault(); setZoom(1); break
        case 'f': case 'F': e.preventDefault(); toggleFullscreen(); break
        case 'Tab': {
          const nodes = shellRef.current?.querySelectorAll('a[href],button:not([disabled])')
          if (!nodes?.length) return
          const list = [...nodes]
          const first = list[0]
          const last = list[list.length - 1]
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
          break
        }
        default: break
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose, step, zoomIn, zoomOut, toggleFullscreen])

  if (!open || !photo) return null
  const ctrl = 'grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 disabled:opacity-40'

  return (
    <AnimatePresence>
      <motion.div
        ref={shellRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Photograph: ${photo.caption}`}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[95] flex flex-col bg-pine-950/97 backdrop-blur"
      >
        {/* Toolbar */}
        <div className="flex items-center justify-end gap-2 p-4">
          <span className="mr-auto pl-2 text-sm text-pine-100" aria-live="polite">{index + 1} / {photos.length}</span>
          <button type="button" onClick={zoomOut} disabled={zoom <= 1} aria-label="Zoom out" className={ctrl}><ZoomOut className="h-5 w-5" /></button>
          <span className="w-12 text-center text-sm tabular-nums text-pine-100">{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={zoomIn} disabled={zoom >= 3} aria-label="Zoom in" className={ctrl}><ZoomIn className="h-5 w-5" /></button>
          <button type="button" onClick={toggleFullscreen} aria-label={fs ? 'Exit fullscreen' : 'Enter fullscreen'} className={ctrl}>
            {fs ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close photo viewer" className={ctrl}><X className="h-5 w-5" /></button>
        </div>

        {/* Stage + info */}
        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-4 pb-6 lg:flex-row lg:items-center lg:gap-10 lg:px-8">
          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            <button type="button" onClick={() => step(-1)} aria-label="Previous photograph" className={cn(ctrl, 'absolute left-0 z-10 h-12 w-12')}>
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className={cn('max-h-[68vh] overflow-hidden rounded-2xl', zoom > 1 && 'cursor-grab active:cursor-grabbing')}>
              <motion.img
                key={photo.id}
                src={photo.src}
                alt={photo.caption}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                style={{ transform: `scale(${zoom})` }}
                drag={zoom > 1}
                dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
                dragElastic={0.05}
                // Download disabled: no context menu, no drag-to-save, no long-press.
                onContextMenu={(e) => e.preventDefault()}
                draggable={false}
                className="max-h-[68vh] w-auto max-w-full select-none rounded-2xl object-contain transition-transform duration-300 ease-premium"
              />
            </div>

            <button type="button" onClick={() => step(1)} aria-label="Next photograph" className={cn(ctrl, 'absolute right-0 z-10 h-12 w-12')}>
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <GalleryPhotoInfo
            photo={photo}
            isSaved={isSaved(photo.id)}
            onToggleSave={onToggleSave}
            onNavigate={onClose}
            className="shrink-0"
          />
        </div>

        <p className="pb-3 text-center text-xs text-pine-100/50">
          Use ← → to browse · + − to zoom · F for fullscreen · Esc to close
        </p>
      </motion.div>
    </AnimatePresence>
  )
}
