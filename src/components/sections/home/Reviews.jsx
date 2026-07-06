import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { Section, SectionHeading, StarRating } from '@/components/ui'
import Media from '@/components/ui/Media'
import { reviews } from '@/data/reviews'
import { fadeScale, stagger, revealOnScroll } from '@/lib/motion'

// Testimonial cards. Photos are optional — an initials avatar on a brand
// gradient is the fallback, so the section never shows a broken image. Each card
// shows the package booked, country, rating and the date of travel.
function initials(name) {
  return name.split(/[\s&]+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join('')
}
function formatDate(d) {
  if (!d) return null
  return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
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
        className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8"
      >
        {reviews.map((r) => (
          <motion.li
            key={r.id}
            variants={fadeScale}
            className="flex h-full flex-col rounded-3xl border border-line bg-background p-7 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <Quote className="h-8 w-8 text-saffron-400" />
              {formatDate(r.date) && <span className="text-xs text-muted">{formatDate(r.date)}</span>}
            </div>
            <p className="mt-4 flex-1 text-base leading-relaxed text-pine-800">“{r.quote}”</p>
            <StarRating value={r.rating} className="mt-5" />
            <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
              {r.avatar ? (
                <Media src={r.avatar} alt={r.name} className="h-11 w-11 shrink-0 rounded-full" />
              ) : (
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-pine-700 to-glacier-600 text-sm font-semibold text-white">
                  {initials(r.name)}
                </span>
              )}
              <span className="min-w-0">
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
