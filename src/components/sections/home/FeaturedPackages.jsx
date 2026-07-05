import { motion } from 'framer-motion'
import { ArrowRight, Clock, MapPin } from 'lucide-react'
import { Section, SectionHeading, Card, Button, StarRating } from '@/components/ui'
import { featuredPackages } from '@/data/packages'
import { fadeScale, stagger, revealOnScroll } from '@/lib/motion'

// Premium package cards: image, badge, location, title, rating, description,
// price + Book Now. The grid reveals with a scroll-triggered stagger.
export default function FeaturedPackages() {
  return (
    <Section tone="surface" id="featured">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Signature journeys"
          title="Featured packages"
          lead="A short list of our most-loved escapes — each one privately guided and fully arranged, door to door."
        />
        <Button to="/packages" variant="outline" size="md" className="hidden sm:inline-flex">
          View all packages
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <motion.ul
        variants={stagger}
        {...revealOnScroll}
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {featuredPackages.map((pkg) => (
          <motion.li key={pkg.id} variants={fadeScale}>
            <Card className="flex h-full flex-col">
              <Card.Image src={pkg.image} alt={pkg.title} badge={pkg.badge} />
              <Card.Body className="flex flex-1 flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-1.5 text-sm text-muted">
                    <MapPin className="h-4 w-4 text-saffron-500" />
                    {pkg.region}
                  </span>
                  <StarRating value={pkg.rating} size="sm" />
                </div>
                <Card.Title>{pkg.title}</Card.Title>
                <Card.Text className="flex-1">{pkg.summary}</Card.Text>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="flex items-center gap-1.5 text-sm text-muted">
                    <Clock className="h-4 w-4" />
                    {pkg.duration}
                  </span>
                  <span className="text-right">
                    <span className="block text-xs text-muted">from</span>
                    <span className="font-display text-lg font-semibold text-pine-900">
                      ₹{pkg.price}
                    </span>
                  </span>
                </div>

                <Button to="/contact" variant="solid" size="md" className="mt-5 w-full">
                  Book now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Card.Body>
            </Card>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}
