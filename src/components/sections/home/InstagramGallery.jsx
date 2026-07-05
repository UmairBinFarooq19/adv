import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui'
import { instagramPosts } from '@/data/instagram'
import { fadeUp, stagger, revealOnScroll } from '@/lib/motion'
import { cn } from '@/lib/cn'

// Masonry-style photo grid via CSS columns. "tall" tiles break the uniform
// rhythm. Hovering dims the image and reveals the Instagram glyph.
export default function InstagramGallery() {
  return (
    <Section>
      <SectionHeading
        align="center"
        eyebrow="@adventureskashmir"
        title="From the mountains, lately"
        lead="A window into recent trips — tag us to be featured."
      />

      <motion.div
        variants={stagger}
        {...revealOnScroll}
        className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4"
      >
        {instagramPosts.map((post) => (
          <motion.a
            key={post.id}
            href="#"
            variants={fadeUp}
            aria-label="View on Instagram"
            className={cn(
              'group relative block break-inside-avoid overflow-hidden rounded-2xl shadow-soft',
              post.span === 'tall' ? 'aspect-[3/4]' : 'aspect-square',
            )}
          >
            <img
              src={post.image}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
            />
            <span className="absolute inset-0 grid place-items-center bg-pine-950/0 text-white opacity-0 transition-all duration-300 group-hover:bg-pine-950/40 group-hover:opacity-100">
              <Instagram className="h-7 w-7" />
            </span>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  )
}
