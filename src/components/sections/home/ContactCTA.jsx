import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import ContourDivider from '@/components/ui/ContourDivider'
import { site } from '@/data/site'
import { fadeUp, revealOnScroll } from '@/lib/motion'

// Fully built closing CTA — the last thing a visitor sees before the footer.
export default function ContactCTA() {
  return (
    <section className="bg-background py-section">
      <Container>
        <motion.div
          variants={fadeUp}
          {...revealOnScroll}
          className="relative isolate overflow-hidden rounded-4xl bg-gradient-pine px-6 py-16 text-center text-white sm:px-12 lg:py-20"
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-0 text-saffron-400/20" aria-hidden="true">
            <ContourDivider className="h-48" opacity={0.8} />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-display-sm font-semibold text-white">
              Let's plan your Kashmir
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-pine-100">
              Tell us how you like to travel and we'll shape an itinerary around
              you — no templates, no pressure.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button to="/contact" variant="primary" size="lg">
                Start planning
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={`tel:${site.contact.phone.replace(/\s/g, '')}`} variant="glass" size="lg">
                <Phone className="h-4 w-4" />
                {site.contact.phone}
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
