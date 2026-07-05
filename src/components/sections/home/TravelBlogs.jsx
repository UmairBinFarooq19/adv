import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { Section, SectionHeading, Card, Button } from '@/components/ui'
import { blogPosts } from '@/data/blogs'
import { fadeUp, stagger, revealOnScroll } from '@/lib/motion'

// Three featured journal posts, reusing the shared Card exactly like the
// packages grid — proof the primitive scales across content types.
export default function TravelBlogs() {
  return (
    <Section tone="surface">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Journal"
          title="Travel notes &amp; guides"
          lead="Seasonal advice, packing lists and stories from the valley."
        />
        <Button to="/blogs" variant="outline" size="md" className="hidden sm:inline-flex">
          Read the journal
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <motion.ul
        variants={stagger}
        {...revealOnScroll}
        className="mt-12 grid gap-6 md:grid-cols-3"
      >
        {blogPosts.map((post) => (
          <motion.li key={post.id} variants={fadeUp}>
            <Card className="h-full">
              <Card.Image src={post.image} alt={post.title} ratio="aspect-[16/10]" />
              <Card.Body>
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="rounded-full bg-glacier-50 px-2.5 py-1 font-semibold uppercase tracking-wider text-glacier-700">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {post.readTime}
                  </span>
                </div>
                <Card.Title className="mt-3 text-lg">{post.title}</Card.Title>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-sm">
                  <span className="text-muted">{post.date}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-pine-800">
                    Read <ArrowRight className="h-4 w-4" />
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
