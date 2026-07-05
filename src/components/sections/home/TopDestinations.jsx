import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui'
import { destinations } from '@/data/destinations'
import { fadeScale, stagger, revealOnScroll } from '@/lib/motion'

// Large destination cards with image zoom on hover and a gradient overlay that
// deepens to reveal the blurb. The first card spans two columns on desktop for
// an editorial, non-uniform grid.
export default function TopDestinations() {
  return (
    <Section tone="surface">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Where we go"
          title="Top destinations"
          lead="Six landscapes, six moods — pick a base and we’ll build the days around it."
        />
      </div>

      <motion.ul
        variants={stagger}
        {...revealOnScroll}
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {destinations.map((d, i) => (
          <motion.li
            key={d.id}
            variants={fadeScale}
            className={i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}
          >
            <a
              href="#"
              className="group relative block h-72 overflow-hidden rounded-3xl shadow-soft sm:h-80"
            >
              <img
                src={d.image}
                alt={d.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pine-950/85 via-pine-950/25 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-saffron-300">
                  <MapPin className="h-3.5 w-3.5" />
                  {d.tag}
                </span>
                <h3 className="mt-1 font-display text-2xl font-semibold text-white">{d.name}</h3>
                <p className="mt-1 max-w-sm text-sm text-pine-100 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {d.blurb}
                </p>
              </div>

              <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-all duration-300 group-hover:bg-saffron-400 group-hover:text-pine-950">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}
