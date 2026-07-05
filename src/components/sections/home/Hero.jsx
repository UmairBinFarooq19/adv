import { motion } from 'framer-motion'
import { Snowflake, ArrowRight, Play } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import ContourDivider from '@/components/ui/ContourDivider'
import { fadeUp, stagger } from '@/lib/motion'

// The hero is the thesis of the whole site: snow, altitude, quiet luxury.
// Fully built here so the design system is visible end-to-end. Swap the
// gradient for a full-bleed <img>/<video> of Gulmarg once assets are ready —
// the overlay + contour layers are designed to sit on top of photography.
const stats = [
  { value: '12+', label: 'Years guiding' },
  { value: '40+', label: 'Curated journeys' },
  { value: '4.9', label: 'Guest rating' },
]

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-pine text-white">
      {/* Warm glow + signature contour texture layered over the background. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-glow" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-1/4 text-white/10"
        aria-hidden="true"
      >
        <ContourDivider className="h-[420px]" opacity={0.6} />
      </div>

      <Container className="relative flex min-h-[calc(100dvh-104px)] flex-col justify-center py-24">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
          <motion.span
            variants={fadeUp}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-white"
          >
            <Snowflake className="h-4 w-4 text-saffron-300" />
            Winter 2026 ski season — booking now
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-display-lg font-semibold text-white"
          >
            The Himalayas,
            <br />
            <span className="text-saffron-300">unhurried.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-pine-100"
          >
            Handcrafted ski, snow and adventure journeys across Kashmir — guided
            by locals, staged in heritage lodges, paced for people who travel well.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <Button to="/packages" variant="primary" size="lg">
              Explore packages
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#story" variant="glass" size="lg">
              <Play className="h-4 w-4" />
              Watch the film
            </Button>
          </motion.div>

          <motion.dl variants={fadeUp} className="mt-14 flex flex-wrap gap-x-10 gap-y-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-semibold text-white">{s.value}</dt>
                <dd className="mt-1 text-sm text-pine-200">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </Container>
    </section>
  )
}
