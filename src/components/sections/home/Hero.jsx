import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Snowflake, ArrowRight, ChevronDown } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { heroSlides } from '@/data/heroSlides'
import { fadeUp, stagger } from '@/lib/motion'

// Full-viewport hero. A background slider cross-fades between frames while the
// headline, subtitle and CTAs stay fixed on top of a dark gradient scrim.
// Autoplay pauses for users who prefer reduced motion.
export default function Hero() {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 6000)
    return () => clearInterval(t)
  }, [reduce])

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-pine-950 text-white">
      {/* Background slider */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="sync">
          <motion.img
            key={heroSlides[index].id}
            src={heroSlides[index].image}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: 7, ease: 'linear' } }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        {/* Dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-pine-950 via-pine-950/70 to-pine-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-pine-950/80 to-transparent" />
      </div>

      <Container className="relative py-32">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
          <motion.span
            variants={fadeUp}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-white"
          >
            <Snowflake className="h-4 w-4 text-saffron-300" />
            Winter 2026 ski season — booking now
          </motion.span>

          <motion.h1 variants={fadeUp} className="mt-6 text-display-lg font-semibold text-white">
            The Himalayas,
            <br />
            <span className="text-saffron-300">unhurried.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-pine-100">
            Handcrafted ski, snow and adventure journeys across Kashmir — guided
            by locals, staged in heritage lodges, paced for people who travel well.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <Button to="/packages" variant="primary" size="lg">
              Explore packages
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/contact" variant="glass" size="lg">
              Book now
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Slide indicators — kept above the overlapping inquiry card */}
      <div className="absolute bottom-36 left-0 right-0 z-10">
        <Container className="flex items-center gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Show ${s.place}`}
              className={
                'h-1 rounded-full transition-all duration-500 ' +
                (i === index ? 'w-10 bg-saffron-400' : 'w-4 bg-white/40 hover:bg-white/70')
              }
            />
          ))}
        </Container>
      </div>

      {/* Scroll-down indicator */}
      <motion.a
        href="#featured"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-36 right-6 z-10 hidden text-white/70 transition-colors hover:text-white sm:right-10 sm:block"
      >
        <motion.span
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-xs uppercase tracking-widest"
        >
          Scroll
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  )
}
