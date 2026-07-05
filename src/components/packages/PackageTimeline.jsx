import { motion } from 'framer-motion'
import { fadeUp, stagger, revealOnScroll } from '@/lib/motion'

// Day-wise itinerary as a vertical timeline. `items`: [{ day, title, desc }].
// Purely presentational and driven by data, so any package's itinerary renders
// without changes here.
export default function PackageTimeline({ items = [] }) {
  return (
    <motion.ol variants={stagger} {...revealOnScroll} className="relative space-y-8">
      {/* vertical rail */}
      <span className="absolute left-[19px] top-2 bottom-2 w-px bg-line" aria-hidden="true" />
      {items.map((item) => (
        <motion.li key={item.day} variants={fadeUp} className="relative flex gap-5">
          <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-pine-800 text-sm font-semibold text-white ring-4 ring-background">
            {item.day > 0 ? item.day : '★'}
          </span>
          <div className="pt-1">
            <h3 className="font-display text-lg font-semibold text-pine-900">
              {item.day > 0 && <span className="mr-2 text-saffron-600">Day {item.day}</span>}
              {item.title}
            </h3>
            <p className="mt-1 leading-relaxed text-muted">{item.desc}</p>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  )
}
