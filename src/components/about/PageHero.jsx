import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import ContourDivider from '@/components/ui/ContourDivider'
import Media from '@/components/ui/Media'
import { fadeUp, stagger } from '@/lib/motion'

// PageHero — a richer, full-bleed hero for content pages that want more presence
// than the compact PageHeader. Reuses the exact brand treatment (pine gradient,
// saffron eyebrow, contour divider) and the blur-up <Media> loader. The optional
// `children` slot lets a page drop stats or a CTA under the lead. Reusable by any
// secondary page; here it powers the About hero.
export default function PageHero({ eyebrow, title, lead, image, children }) {
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
      <Container className="relative py-24 lg:py-32">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
          {eyebrow && (
            <motion.div variants={fadeUp}>
              <Eyebrow className="text-saffron-300">{eyebrow}</Eyebrow>
            </motion.div>
          )}
          <motion.h1 variants={fadeUp} className="mt-4 text-display-md font-semibold text-white">{title}</motion.h1>
          {lead && <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg leading-relaxed text-pine-100">{lead}</motion.p>}
          {children && <motion.div variants={fadeUp} className="mt-10">{children}</motion.div>}
        </motion.div>
      </Container>
    </section>
  )
}
