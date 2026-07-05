import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { fadeUp, revealOnScroll } from '@/lib/motion'
import Eyebrow from './Eyebrow'

// Consistent heading block for every section: eyebrow → title → optional lead.
// `align` centers it for full-width sections; left-aligns for asymmetric ones.
export default function SectionHeading({ eyebrow, title, lead, align = 'left', className }) {
  return (
    <motion.div
      variants={fadeUp}
      {...revealOnScroll}
      className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && <Eyebrow className={align === 'center' ? 'justify-center' : ''}>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-display-sm font-semibold">{title}</h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-muted">{lead}</p>}
    </motion.div>
  )
}
