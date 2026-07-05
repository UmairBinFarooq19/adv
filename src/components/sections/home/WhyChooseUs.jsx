import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui'
import Container from '@/components/ui/Container'
import { features } from '@/data/features'
import { fadeUp, stagger, revealOnScroll } from '@/lib/motion'

// Value-proposition icon cards on a dark band, so the section grounds the page
// and contrasts the lighter sections around it.
export default function WhyChooseUs() {
  return (
    <section className="bg-pine-900 py-section text-white">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Why AdventuresKashmir"
          title="Guided by people who live here"
          lead="Local expertise, uncompromising safety and a standard of comfort you’d expect from the finest lodges."
          className="[&_h2]:text-white [&_p]:text-pine-100"
        />

        <motion.ul
          variants={stagger}
          {...revealOnScroll}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map(({ id, icon: Icon, title, desc }) => (
            <motion.li
              key={id}
              variants={fadeUp}
              className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition-colors duration-300 hover:bg-white/10"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-saffron-400/15 text-saffron-300 transition-colors duration-300 group-hover:bg-saffron-400 group-hover:text-pine-950">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-pine-100">{desc}</p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}
