import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import ContourDivider from '@/components/ui/ContourDivider'
import Eyebrow from '@/components/ui/Eyebrow'
import { fadeUp, stagger } from '@/lib/motion'

// Compact dark header for secondary pages (About, Packages, …). Gives every
// inner page a consistent, branded entry without each one rebuilding a hero.
export default function PageHeader({ eyebrow, title, lead }) {
  return (
    <section className="relative overflow-hidden bg-gradient-pine text-white">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 text-saffron-400/20">
        <ContourDivider className="h-40" opacity={0.7} />
      </div>
      <Container className="relative py-20 lg:py-28">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
          {eyebrow && (
            <motion.div variants={fadeUp}>
              <Eyebrow className="text-saffron-300">{eyebrow}</Eyebrow>
            </motion.div>
          )}
          <motion.h1 variants={fadeUp} className="mt-4 text-display-md font-semibold text-white">
            {title}
          </motion.h1>
          {lead && (
            <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg leading-relaxed text-pine-100">
              {lead}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
