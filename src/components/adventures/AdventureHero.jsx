import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ContourDivider from '@/components/ui/ContourDivider'
import Media from '@/components/ui/Media'
import { cn } from '@/lib/cn'
import { fadeUp, stagger } from '@/lib/motion'

// AdventureHero — an immersive, full-bleed hero used by both the Adventures
// landing and every activity detail page. Reuses the exact brand treatment
// (pine gradient, saffron eyebrow, contour divider, blur-up Media) and the
// shared Breadcrumbs. `size` tightens padding for detail pages; `children` is a
// slot for CTAs. Reusable by any section that wants a photographic header.
export default function AdventureHero({ eyebrow, title, subtitle, image, breadcrumbs, size = 'lg', children }) {
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
          {eyebrow && (
            <motion.div variants={fadeUp}>
              <Eyebrow className="text-saffron-300">{eyebrow}</Eyebrow>
            </motion.div>
          )}
          <motion.h1 variants={fadeUp} className="mt-4 text-display-md font-semibold text-white">{title}</motion.h1>
          {subtitle && <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg leading-relaxed text-pine-100">{subtitle}</motion.p>}
          {children && <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">{children}</motion.div>}
        </motion.div>
      </Container>
    </section>
  )
}
