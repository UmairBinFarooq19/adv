import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { stagger, fadeUp, revealOnScroll } from '@/lib/motion'

// DestinationWeather — a four-season weather panel driven by a destination's
// `weather` array ({ season, months, temp, icon, desc }). Rendered as a semantic
// definition list so each season reads as a term with its conditions. Because the
// data file shares season templates (valley / alpine / ladakh / high-lake), this
// stays consistent everywhere. Reusable for any place with seasonal data.
export default function DestinationWeather({ weather = [], className }) {
  if (!weather.length) return null
  return (
    <motion.dl variants={stagger} {...revealOnScroll} className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {weather.map(({ season, months, temp, icon: Icon, desc }) => (
        <motion.div key={season} variants={fadeUp} className="rounded-3xl border border-line bg-surface p-6 shadow-soft">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-glacier-100 text-pine-700">
            {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
          </span>
          <dt className="mt-4 font-display text-lg font-semibold text-pine-900">
            {season} <span className="block text-xs font-medium uppercase tracking-wider text-muted">{months}</span>
          </dt>
          <dd>
            <span className="mt-3 inline-block rounded-full bg-pine-50 px-3 py-1 text-sm font-semibold text-pine-800">{temp}</span>
            <p className="mt-3 text-sm leading-relaxed text-muted">{desc}</p>
          </dd>
        </motion.div>
      ))}
    </motion.dl>
  )
}
