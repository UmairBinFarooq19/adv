import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ContourDivider from '@/components/ui/ContourDivider'
import { fadeUp, stagger } from '@/lib/motion'

// Reusable banner for the Packages landing and every collection page. Full-bleed
// background image + pine scrim (readable, on-brand), breadcrumb, title and
// intro. `children` slots in below the intro (e.g. quick stats or CTAs).
export default function PackageHero({ image, eyebrow, title, intro, breadcrumbs, children }) {
  return (
    <section className="relative isolate overflow-hidden bg-pine-950 text-white">
      {image && (
        <img src={image} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-pine-950 via-pine-950/85 to-pine-900/70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 text-saffron-400/20">
        <ContourDivider className="h-32" opacity={0.6} />
      </div>

      <Container className="relative py-14 sm:py-20 lg:py-24">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-6" />}
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
          {eyebrow && (
            <motion.div variants={fadeUp}>
              <Eyebrow className="text-saffron-300">{eyebrow}</Eyebrow>
            </motion.div>
          )}
          <motion.h1 variants={fadeUp} className="mt-4 text-display-md font-semibold text-white">
            {title}
          </motion.h1>
          {intro && (
            <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-pine-100">
              {intro}
            </motion.p>
          )}
          {children && <motion.div variants={fadeUp} className="mt-8">{children}</motion.div>}
        </motion.div>
      </Container>
    </section>
  )
}
