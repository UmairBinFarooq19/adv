import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { Section, SectionHeading, Card, Button } from '@/components/ui'
import { featuredPackages } from '@/data/packages'
import { fadeUp, stagger, revealOnScroll } from '@/lib/motion'

// Fully built to demonstrate the canonical pattern: map real data → <Card>,
// animate the grid with a scroll-triggered stagger. Every other card grid on
// the site (destinations, blogs, activities) follows this exact shape.
export default function FeaturedPackages() {
  return (
    <Section tone="surface">
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
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {featuredPackages.map((pkg) => (
          <motion.li key={pkg.id} variants={fadeUp}>
            <Card className="h-full">
              <Card.Image src={pkg.image} alt={pkg.title} badge={pkg.badge} />
              <Card.Body>
                <Card.Eyebrow>{pkg.region}</Card.Eyebrow>
                <Card.Title>{pkg.title}</Card.Title>
                <Card.Text>{pkg.summary}</Card.Text>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="flex items-center gap-1.5 text-sm text-muted">
                    <Clock className="h-4 w-4" />
                    {pkg.duration}
                  </span>
                  <span className="font-display text-lg font-semibold text-pine-900">
                    {pkg.price}
                  </span>
                </div>
              </Card.Body>
            </Card>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  )
}
