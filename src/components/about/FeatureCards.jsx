import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { fadeUp, stagger, revealOnScroll } from '@/lib/motion'

// FeatureCards — a data-driven grid of icon + title + description cards. It's the
// same visual language as the home "Why choose us" band, generalised with a
// `tone` prop so it works on dark (pine) and light bands, and a `columns` prop.
// Pass items of { icon, title, desc }. Reusable; here it powers Safety & Standards.
const colClasses = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
}

export default function FeatureCards({ items = [], tone = 'light', columns = 3, className }) {
  const dark = tone === 'dark'
  return (
    <motion.ul
      variants={stagger}
      {...revealOnScroll}
      className={cn('grid gap-6 lg:gap-8', colClasses[columns], className)}
    >
      {items.map(({ icon: Icon, title, desc }) => (
        <motion.li
          key={title}
          variants={fadeUp}
          className={cn(
            'group rounded-3xl p-7 transition-colors duration-300',
            dark
              ? 'border border-white/10 bg-white/5 hover:bg-white/10'
              : 'bg-surface shadow-soft ring-1 ring-line/80 hover:shadow-lift',
          )}
        >
          <span
            className={cn(
              'grid h-12 w-12 place-items-center rounded-2xl transition-colors duration-300 group-hover:bg-saffron-400 group-hover:text-pine-950',
              dark ? 'bg-saffron-400/15 text-saffron-300' : 'bg-glacier-100 text-pine-700',
            )}
          >
            <Icon className="h-6 w-6" />
          </span>
          <h3 className={cn('mt-5 font-display text-lg font-semibold', dark ? 'text-white' : 'text-pine-900')}>{title}</h3>
          <p className={cn('mt-2 text-sm leading-relaxed', dark ? 'text-pine-100' : 'text-muted')}>{desc}</p>
        </motion.li>
      ))}
    </motion.ul>
  )
}
