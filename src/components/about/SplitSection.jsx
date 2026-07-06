import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'
import Eyebrow from '@/components/ui/Eyebrow'
import Media from '@/components/ui/Media'
import { cn } from '@/lib/cn'
import { fadeUp, revealOnScroll } from '@/lib/motion'

// SplitSection — the workhorse editorial block: an image on one side, prose on
// the other, with an optional `reverse` to alternate the layout down the page.
// Uses the shared Section (for tone + rhythm), Eyebrow and blur-up Media, so it
// inherits the site's spacing, colours and animation for free. `children` is the
// body copy. Reusable anywhere; here it powers Our Story and Who We Are.
export default function SplitSection({ eyebrow, title, image, imageAlt = '', reverse = false, tone = 'default', children }) {
  return (
    <Section tone={tone}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div variants={fadeUp} {...revealOnScroll} className={cn(reverse && 'lg:order-2')}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h2 className="mt-4 text-display-sm font-semibold tracking-tight">{title}</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">{children}</div>
        </motion.div>
        <motion.div variants={fadeUp} {...revealOnScroll} className={cn(reverse && 'lg:order-1')}>
          <Media src={image} alt={imageAlt} className="aspect-[4/3] w-full rounded-4xl shadow-lift ring-1 ring-line/60" />
        </motion.div>
      </div>
    </Section>
  )
}
