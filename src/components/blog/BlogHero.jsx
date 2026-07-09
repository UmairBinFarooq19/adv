import { motion } from 'framer-motion'
import { BookOpen, Newspaper } from 'lucide-react'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ContourDivider from '@/components/ui/ContourDivider'
import Media from '@/components/ui/Media'
import { fadeUp, stagger } from '@/lib/motion'

// BlogHero — the magazine masthead. Same brand treatment as every other hero
// (pine gradient, saffron eyebrow, ContourDivider, blur-up Media, shared
// Breadcrumbs), with article/category counts as meta chips. `children` is a slot
// for the search field or CTAs.
export default function BlogHero({ eyebrow, title, subtitle, image, breadcrumbs, postCount, categoryCount, children }) {
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
        {breadcrumbs?.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </motion.div>
        )}
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
          <motion.div variants={fadeUp}><Eyebrow className="text-saffron-300">{eyebrow}</Eyebrow></motion.div>
          <motion.h1 variants={fadeUp} className="mt-4 text-display-md font-semibold text-white">{title}</motion.h1>
          {subtitle && <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg leading-relaxed text-pine-100">{subtitle}</motion.p>}
          {(postCount != null) && (
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium backdrop-blur">
                <Newspaper className="h-4 w-4 text-saffron-300" aria-hidden="true" /> {postCount} articles
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium backdrop-blur">
                <BookOpen className="h-4 w-4 text-saffron-300" aria-hidden="true" /> {categoryCount} categories
              </span>
            </motion.div>
          )}
          {children && <motion.div variants={fadeUp} className="mt-9">{children}</motion.div>}
        </motion.div>
      </Container>
    </section>
  )
}
