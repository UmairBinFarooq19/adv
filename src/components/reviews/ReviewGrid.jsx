import { motion } from 'framer-motion'
import ReviewCard from './ReviewCard'
import { cn } from '@/lib/cn'
import { stagger, fadeUp, revealOnScroll } from '@/lib/motion'

// ReviewGrid — a responsive masonry-ish grid of ReviewCards with an honest empty
// state. Uses CSS columns so varying-length testimonials pack tightly; cards keep
// their reading order within each column. Data-driven; owns no review content.
export default function ReviewGrid({ reviews = [], onPhoto, emptyMessage = 'No reviews match these filters yet.', className }) {
  if (!reviews.length) {
    return <p className="rounded-3xl border border-dashed border-line py-16 text-center text-muted">{emptyMessage}</p>
  }
  return (
    <motion.div variants={stagger} {...revealOnScroll} className={cn('gap-6 [column-fill:_balance] sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid', className)}>
      {reviews.map((review) => (
        <motion.div key={review.id} variants={fadeUp}>
          <ReviewCard review={review} onPhoto={onPhoto} />
        </motion.div>
      ))}
    </motion.div>
  )
}
