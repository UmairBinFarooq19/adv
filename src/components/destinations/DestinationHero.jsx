import { motion } from 'framer-motion'
import { Mountain, CalendarDays } from 'lucide-react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ContourDivider from '@/components/ui/ContourDivider'
import Media from '@/components/ui/Media'
import { cn } from '@/lib/cn'
import { fadeUp, stagger } from '@/lib/motion'

// DestinationHero — the immersive header for the Destinations landing and every
// destination page. Reuses the shared brand treatment (pine gradient, saffron
// eyebrow, contour divider, blur-up Media) and Breadcrumbs, and adds optional
// meta chips (elevation, best season) for a guide-like feel. `children` is a CTA
// slot. Reusable by any place-based page.
export default function DestinationHero({ eyebrow, title, subtitle, image, breadcrumbs, meta, size = 'lg', children }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-pine text-white">
      {image && (
        <>
          <Media src={image} alt="" eager className="absolute inset-0 -z-10 h-full w-full" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-pine-950 via-pine-950/85 to-pine-900/75" />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 text-saffron-400/20">
        <ContourDivider className="h-40" opacity={0.7} />
      </div>
      <Container className={cn('relative', size === 'lg' ? 'py-24 lg:py-32' : 'py-20 lg:py-24')}>
        {breadcrumbs?.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </motion.div>
        )}
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
          {eyebrow && <motion.div variants={fadeUp}><Eyebrow className="text-saffron-300">{eyebrow}</Eyebrow></motion.div>}
          <motion.h1 variants={fadeUp} className="mt-4 text-display-md font-semibold text-white">{title}</motion.h1>
          {subtitle && <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg leading-relaxed text-pine-100">{subtitle}</motion.p>}
          {meta && (
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2.5">
              {meta.elevation && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium backdrop-blur">
                  <Mountain className="h-4 w-4 text-saffron-300" aria-hidden="true" /> {meta.elevation}
                </span>
              )}
              {meta.bestSeason && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium backdrop-blur">
                  <CalendarDays className="h-4 w-4 text-saffron-300" aria-hidden="true" /> Best: {meta.bestSeason}
                </span>
              )}
            </motion.div>
          )}
          {children && <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">{children}</motion.div>}
        </motion.div>
      </Container>
    </section>
  )
}
