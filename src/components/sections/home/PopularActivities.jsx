import { motion } from 'framer-motion'
import { Section, SectionHeading } from '@/components/ui'
import { activities } from '@/data/activities'
import { fadeScale, stagger, revealOnScroll } from '@/lib/motion'

// Icon tiles for the ten headline activities. Compact, tappable, and reveals
// with a stagger. Hover lifts the tile and warms the icon to saffron.
export default function PopularActivities() {
  return (
    <Section>
      <SectionHeading
        align="center"
        eyebrow="Things to do"
        title="Popular adventure activities"
        lead="From powder descents to lakeside mornings — the experiences guests remember most."
      />

      <motion.ul
        variants={stagger}
        {...revealOnScroll}
        className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5"
      >
        {activities.map(({ id, label, icon: Icon }) => (
          <motion.li key={id} variants={fadeScale}>
            <button
              type="button"
              className="group flex w-full flex-col items-center gap-3 rounded-3xl border border-line bg-surface p-6 text-center shadow-soft transition-all duration-300 ease-premium hover:-translate-y-1 hover:border-saffron-300 hover:shadow-lift"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-glacier-50 text-pine-700 transition-colors duration-300 group-hover:bg-saffron-400 group-hover:text-pine-950">
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold text-pine-900">{label}</span>
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}
