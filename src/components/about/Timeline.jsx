import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { fadeUp, revealOnScroll } from '@/lib/motion'

// Timeline — a vertical milestone rail with a connector line and saffron nodes,
// each entry revealing on scroll. Data-driven: pass items of { year, title, desc }.
// Styling comes entirely from existing brand tokens. Reusable for any history or
// process; here it powers the company timeline.
export default function Timeline({ items = [], className }) {
  return (
    <ol className={cn('relative mx-auto max-w-3xl', className)}>
      <span className="absolute bottom-2 left-[15px] top-2 w-px bg-line" aria-hidden="true" />
      {items.map((it) => (
        <motion.li
          key={it.year + it.title}
          variants={fadeUp}
          {...revealOnScroll}
          className="relative pb-10 pl-12 last:pb-0"
        >
          <span className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full bg-pine-900 ring-4 ring-background" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-saffron-400" />
          </span>
          <span className="text-sm font-semibold text-saffron-600">{it.year}</span>
          <h3 className="mt-1 font-display text-xl font-semibold text-pine-900">{it.title}</h3>
          <p className="mt-2 leading-relaxed text-muted">{it.desc}</p>
        </motion.li>
      ))}
    </ol>
  )
}
