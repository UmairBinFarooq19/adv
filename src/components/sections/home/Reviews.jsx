import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { Section, SectionHeading, StarRating } from '@/components/ui'
import { reviews } from '@/data/reviews'
import { fadeUp, stagger, revealOnScroll } from '@/lib/motion'

// Testimonial cards. Avatars are generated from initials on a brand gradient,
// so the section needs no photo assets and never shows a broken image.
function initials(name) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('')
}

export default function Reviews() {
  return (
    <Section tone="surface">
      <SectionHeading
        align="center"
        eyebrow="Guest stories"
        title="What our travellers say"
        lead="Rated 4.9 across Google and TripAdvisor by guests from over 20 countries."
      />

      <motion.ul
        variants={stagger}
        {...revealOnScroll}
        className="mt-12 grid gap-6 md:grid-cols-3"
      >
        {reviews.map((r) => (
          <motion.li
            key={r.id}
            variants={fadeUp}
            className="flex h-full flex-col rounded-3xl border border-line bg-background p-7 shadow-soft"
          >
            <Quote className="h-8 w-8 text-saffron-400" />
            <p className="mt-4 flex-1 text-base leading-relaxed text-pine-800">“{r.quote}”</p>
            <StarRating value={r.rating} className="mt-5" />
            <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-pine-700 to-glacier-600 text-sm font-semibold text-white">
                {initials(r.name)}
              </span>
              <span>
                <span className="block font-semibold text-pine-900">{r.name}</span>
                <span className="block text-xs text-muted">{r.trip} · {r.country}</span>
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}
