import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useInquiry } from '@/store/InquiryContext'
import InquiryForm from './InquiryForm'
import { EASE } from '@/lib/motion'

// Mounted once (in RootLayout). Opens whenever anything calls openInquiry().
// Accessible dialog: Escape closes, background scroll locks, focus moves in and
// a basic focus trap keeps Tab inside while open.
export default function InquiryModal() {
  const { open, pkg, mode, closeInquiry } = useInquiry()
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeInquiry()
      if (e.key === 'Tab') {
        const nodes = panelRef.current?.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')
        if (!nodes || nodes.length === 0) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => panelRef.current?.querySelector('input, select, textarea')?.focus(), 50)
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; clearTimeout(t) }
  }, [open, closeInquiry])

  const title = mode === 'callback' ? 'Request a callback' : pkg ? 'Book this trip' : 'Send an inquiry'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-end sm:place-items-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-pine-950/60 backdrop-blur-sm" onClick={closeInquiry} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            role="dialog" aria-modal="true" aria-label={title}
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-4xl bg-surface p-6 shadow-lift sm:max-w-lg sm:rounded-4xl sm:p-8"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-semibold text-pine-900">{title}</h2>
                <p className="mt-1 text-sm text-muted">Tell us a little and we’ll do the rest.</p>
              </div>
              <button type="button" onClick={closeInquiry} aria-label="Close" className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-pine-700 hover:bg-pine-800/5">
                <X className="h-5 w-5" />
              </button>
            </div>
            <InquiryForm pkg={pkg} mode={mode} compact />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
