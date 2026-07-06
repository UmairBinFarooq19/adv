import { AnimatePresence, motion } from 'framer-motion'
import { Phone, ArrowUp } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'
import { generalWhatsApp } from '@/lib/whatsapp'
import { site } from '@/data/site'

// Site-wide floating actions: WhatsApp, Call, and Back-to-top (which appears
// once scrolled). Fixed bottom-right, above content but below modals. Rendered
// once in the layout so it's present on every page.
const tel = `tel:${site.contact.phone.replace(/\s/g, '')}`

// Inline WhatsApp glyph so we don't depend on a brand icon set.
function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.15-1.7-.84-2-.94-.26-.1-.45-.14-.64.15-.19.28-.73.93-.9 1.12-.16.19-.33.21-.61.07-1.67-.83-2.76-1.49-3.86-3.38-.29-.5.29-.46.83-1.54.09-.19.05-.35-.02-.49-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.49.07-.75.35-.26.28-.98.96-.98 2.35s1.01 2.73 1.15 2.92c.14.19 1.98 3.03 4.8 4.25 1.79.77 2.49.84 3.38.71.55-.08 1.7-.69 1.94-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34z" />
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l5.06-1.35A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.2c-1.62 0-3.13-.44-4.43-1.2l-.32-.19-3 .8.8-2.92-.2-.33A8.16 8.16 0 0 1 3.8 12 8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  )
}

export default function FloatingActions() {
  const scrolled = useScrolled(500)

  const fabBase =
    'grid h-12 w-12 place-items-center rounded-full text-white shadow-lift transition-transform duration-200 ease-premium hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-saffron-400'

  return (
    <div className="fixed bottom-5 right-4 z-[70] flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {scrolled && (
          <motion.button
            key="top"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className={`${fabBase} bg-pine-800 hover:bg-pine-700`}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <a href={tel} aria-label="Call us" className={`${fabBase} bg-glacier-600 hover:bg-glacier-500`}>
        <Phone className="h-5 w-5" />
      </a>
      <a
        href={generalWhatsApp()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`${fabBase} h-14 w-14 bg-[#25D366] hover:brightness-105`}
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  )
}
