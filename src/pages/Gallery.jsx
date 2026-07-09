import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight, MessageCircle, Instagram, Plane } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui'
import Button from '@/components/ui/Button'
import Media from '@/components/ui/Media'
import FAQAccordion from '@/components/ui/FAQAccordion'
import Reviews from '@/components/sections/home/Reviews'
import ContactCTA from '@/components/sections/home/ContactCTA'

import GalleryHero from '@/components/gallery/GalleryHero'
import GalleryFilter from '@/components/gallery/GalleryFilter'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import GalleryLightbox from '@/components/gallery/GalleryLightbox'
import GalleryCollection from '@/components/gallery/GalleryCollection'
import GalleryVideo from '@/components/gallery/GalleryVideo'

import {
  photos, activeCategories, collections, popularPhotos, dronePhotos,
  videos, videoKinds, instagram, faqs, photosByCategory,
} from '@/data/gallery'
import { useGalleryFavorites } from '@/lib/galleryFavorites'
import { useSeo, breadcrumbLd } from '@/lib/seo'
import { generalWhatsApp } from '@/lib/whatsapp'
import { asset } from '@/lib/asset'

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)
  const [params, setParams] = useSearchParams()
  const { isSaved, toggleSaved, count } = useGalleryFavorites()

  useSeo({
    title: 'Gallery',
    description: 'A luxury photography journal of Kashmir and Ladakh — powder days, high lakes, drone frames and the people who make the valley what it is.',
    image: asset('images/scenes/s-dusk-4.svg'),
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Gallery' }]),
        {
          '@type': 'ImageGallery',
          name: 'AdventuresKashmir photography',
          numberOfItems: photos.length,
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question', name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
      ],
    },
  })

  const visible = useMemo(() => photosByCategory(filter), [filter])
  const counts = useMemo(() => {
    const c = { all: photos.length }
    activeCategories.forEach((cat) => { c[cat.id] = photosByCategory(cat.id).length })
    return c
  }, [])

  // Shared links (?photo=p05) open that photograph directly.
  useEffect(() => {
    const id = params.get('photo')
    if (!id) return
    const i = visible.findIndex((p) => p.id === id)
    if (i >= 0) setLightbox(i)
  }, [params, visible])

  const closeLightbox = () => {
    setLightbox(null)
    if (params.get('photo')) { params.delete('photo'); setParams(params, { replace: true }) }
  }

  const chooseCollection = (f) => {
    setFilter(f)
    document.getElementById('collection-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* 1 — Hero */}
      <GalleryHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]}
        eyebrow="Gallery"
        title="The valley, in frames"
        subtitle="Photographs from trips we actually ran — first light on Apharwat, the Dal before it wakes, and the long blue silence of the high lakes."
        image={asset('images/scenes/s-dusk-4.svg')}
        photoCount={photos.length}
        videoCount={videos.length}
      >
        <Button href="#collection-grid" variant="primary" size="lg">Browse photographs <ArrowRight className="h-4 w-4" /></Button>
        <Button href={generalWhatsApp()} variant="glass" size="lg"><MessageCircle className="h-4 w-4" /> Plan your trip</Button>
      </GalleryHero>

      {/* 2 + 3 — Photography categories & the filtered grid */}
      <Section id="collection-grid" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Photography categories"
          title="Browse the archive"
          lead="Nineteen categories, forty photographs. Select any image for the full frame, its location and the trip it came from."
        />
        <GalleryFilter categories={activeCategories} active={filter} onChange={setFilter} counts={counts} className="mt-8" />
        <p className="mt-4 text-sm text-muted" aria-live="polite">
          Showing {visible.length} {visible.length === 1 ? 'photograph' : 'photographs'}
          {count > 0 && ` · ${count} saved`}
        </p>
        <GalleryGrid photos={visible} onOpen={setLightbox} isSaved={isSaved} onToggleSave={toggleSaved} className="mt-8" />
      </Section>

      {/* 4 — Featured collections */}
      <Section tone="surface">
        <SectionHeading align="center" eyebrow="Featured collections" title="Curated sets" lead="Four ways into the archive, each a doorway to the frames that belong together." />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {collections.map((c) => <GalleryCollection key={c.id} collection={c} onSelect={chooseCollection} />)}
        </div>
      </Section>

      {/* 5 — Popular moments */}
      <Section>
        <SectionHeading eyebrow="Popular moments" title="The frames guests ask about" lead="The shots that end up framed, printed and sent to us months later." />
        <GalleryGrid photos={popularPhotos} onOpen={(i) => { setFilter('all'); setLightbox(photos.findIndex((p) => p.id === popularPhotos[i].id)) }} isSaved={isSaved} onToggleSave={toggleSaved} className="mt-10" />
      </Section>

      {/* 6 — Customer experiences (reused from Home) */}
      <Reviews />

      {/* 7 — Drone photography */}
      <Section tone="pine">
        <SectionHeading
          align="center"
          eyebrow="Drone photography"
          title="The valley from above"
          lead="Flown only where permitted — never near airports, military zones or monasteries."
          className="[&_h2]:text-white [&_p]:text-pine-100"
        />
        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {dronePhotos.slice(0, 6).map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => { setFilter('drone'); setLightbox(photosByCategory('drone').findIndex((x) => x.id === p.id)) }}
                aria-label={`Open photograph: ${p.caption}`}
                onContextMenu={(e) => e.preventDefault()}
                className="group relative block w-full overflow-hidden rounded-3xl shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
              >
                <Media src={p.src} alt={p.caption} className="aspect-[4/3] w-full" imgClassName="select-none transition-transform duration-[900ms] ease-premium group-hover:scale-110" draggable={false} />
                <span className="absolute inset-0 bg-gradient-to-t from-pine-950/85 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-5 text-left">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-saffron-300"><Plane className="h-3.5 w-3.5" aria-hidden="true" /> {p.location}</span>
                  <span className="mt-1 line-clamp-2 block text-sm text-white">{p.caption}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Section>

      {/* 8 — Video highlights */}
      <Section tone="surface">
        <SectionHeading eyebrow="Video highlights" title="Films from the mountains" lead="Drone footage, adventure films, ski edits and travel reels." />
        <GalleryVideo videos={videos} kinds={videoKinds} className="mt-12" />
      </Section>

      {/* 9 — Instagram */}
      <Section>
        <SectionHeading align="center" eyebrow="Follow along" title={instagram.handle} lead="New frames from the field, most weeks." />
        <ul className="mt-12 grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-6">
          {instagram.posts.map((post) => (
            <li key={post.id}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${post.alt} — open Instagram in a new tab`}
                className="group relative block overflow-hidden rounded-2xl ring-1 ring-line/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
              >
                <Media src={post.src} alt="" className="aspect-square w-full" imgClassName="transition-transform duration-700 ease-premium group-hover:scale-110" />
                <span className="absolute inset-0 grid place-items-center bg-pine-950/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Instagram className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <Button href="https://instagram.com" variant="outline" size="md"><Instagram className="h-4 w-4" /> Follow {instagram.handle}</Button>
        </div>
      </Section>

      {/* 10 — FAQs */}
      <Section tone="glacier">
        <div className="mx-auto max-w-3xl">
          <SectionHeading align="center" eyebrow="Good to know" title="Gallery FAQs" />
          <div className="mt-10"><FAQAccordion items={faqs} /></div>
        </div>
      </Section>

      {/* 11 — Book Now CTA */}
      <ContactCTA />

      {/* Fullscreen photo viewer */}
      <GalleryLightbox
        photos={filter === 'all' ? photos : visible}
        index={lightbox}
        onClose={closeLightbox}
        onIndex={setLightbox}
        isSaved={isSaved}
        onToggleSave={toggleSaved}
      />
    </>
  )
}
