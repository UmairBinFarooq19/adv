import { motion } from 'framer-motion'
import { ArrowRight, Snowflake } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'
import { cn } from '@/lib/cn'
import { asset } from '@/lib/asset'
import { skiingPrograms } from '@/data/skiing'
import { fadeUp, fadeScale, stagger, revealOnScroll } from '@/lib/motion'

// The homepage's hero product. A full-bleed banner sets the scene, then a grid
// of program cards (with two "featured" cards highlighted in saffron) covers
// every offering from first-timers to slope-side bundles.
export default function SkiingPackages() {
  return (
    <section className="bg-gradient-pine py-section text-white">
      {/* Banner */}
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-4xl"
        >
          <img
            src={asset('images/ski-banner.svg')}
            alt="Snow-covered slopes of Gulmarg"
            className="h-64 w-full object-cover sm:h-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine-950 via-pine-950/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
            <Eyebrow className="text-saffron-300">
              <Snowflake className="h-4 w-4" /> Winter flagship
            </Eyebrow>
            <h2 className="mt-3 max-w-xl text-display-sm font-semibold text-white">
              Skiing &amp; snowboarding, done properly
            </h2>
            <p className="mt-2 max-w-lg text-pine-100">
              Certified instruction, avalanche-trained guides and premium gear —
              on some of Asia’s finest powder.
            </p>
          </div>
        </motion.div>
      </Container>

      {/* Program cards */}
      <Container>
        <motion.ul
          variants={stagger}
          {...revealOnScroll}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {skiingPrograms.map(({ id, icon: Icon, level, title, desc, price, unit, featured }) => (
            <motion.li key={id} variants={fadeScale}>
              <div
                className={cn(
                  'group flex h-full flex-col rounded-3xl border p-6 transition-all duration-500 ease-premium hover:-translate-y-1',
                  featured
                    ? 'border-saffron-400/50 bg-saffron-400/10 hover:bg-saffron-400/15'
                    : 'border-white/10 bg-white/5 hover:bg-white/10',
                )}
              >
                <span
                  className={cn(
                    'grid h-11 w-11 place-items-center rounded-xl',
                    featured ? 'bg-saffron-400 text-pine-950' : 'bg-white/10 text-saffron-300',
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="mt-4 text-xs font-semibold uppercase tracking-widest text-saffron-300">
                  {level}
                </span>
                <h3 className="mt-1 font-display text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-pine-100">{desc}</p>
                <div className="mt-5 flex items-baseline gap-1 border-t border-white/10 pt-4">
                  <span className="font-display text-xl font-semibold text-white">₹{price}</span>
                  <span className="text-sm text-pine-200">{unit}</span>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-10 text-center">
          <Button to="/adventures" variant="primary" size="lg">
            View all ski programs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  )
}
