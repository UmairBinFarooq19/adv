import { motion } from 'framer-motion'
import { ArrowRight, Phone, MessageCircle } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { site } from '@/data/site'
import { asset } from '@/lib/asset'
import { fadeUp, revealOnScroll } from '@/lib/motion'

// Closing CTA on a full-bleed background image with a pine scrim. Three ways to
// convert: book (route), WhatsApp and call (device links).
export default function ContactCTA() {
  const tel = `tel:${site.contact.phone.replace(/\s/g, '')}`
  const wa = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}`

  return (
    <section className="bg-background py-section">
      <Container>
        <motion.div
          variants={fadeUp}
          {...revealOnScroll}
          className="relative isolate overflow-hidden rounded-4xl px-6 py-20 text-center text-white sm:px-12 lg:py-28"
        >
          <img
            src={asset('images/contact-bg.svg')}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-pine-950 via-pine-950/80 to-pine-900/70" />

          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow justify-center text-saffron-300">Ready when you are</span>
            <h2 className="mt-4 text-display-md font-semibold text-white">
              Book your adventure today
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-pine-100">
              Tell us how you like to travel and we’ll shape an itinerary around
              you — no templates, no pressure.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button to="/contact" variant="primary" size="lg">
                Book now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={wa} variant="glass" size="lg">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button href={tel} variant="glass" size="lg">
                <Phone className="h-4 w-4" />
                Call now
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
