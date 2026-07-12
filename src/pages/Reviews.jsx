import { useMemo, useState } from 'react'
import { ArrowRight, MessageCircle, MapPin, Camera, Star } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui'
import Button from '@/components/ui/Button'
import ContactCTA from '@/components/sections/home/ContactCTA'
import AdventureGallery from '@/components/adventures/AdventureGallery'
import GalleryVideo from '@/components/gallery/GalleryVideo'

import ReviewsHero from '@/components/reviews/ReviewsHero'
import RatingSummary from '@/components/reviews/RatingSummary'
import PlatformSummary from '@/components/reviews/PlatformSummary'
import ReviewFilters from '@/components/reviews/ReviewFilters'
import ReviewGrid from '@/components/reviews/ReviewGrid'

import {
  reviews, platforms, activeCategories, categoryCounts, countries,
  overallRating, totalReviews, ratingDistribution, verifiedCount,
  headlineRating, headlineCount,
  photoReviews, videoTestimonials, videoKinds, aggregateSchemaEnabled,
} from '@/data/reviewsPage'
import { useSeo, breadcrumbLd, absoluteUrl } from '@/lib/seo'
import { generalWhatsApp } from '@/lib/whatsapp'
import { asset } from '@/lib/asset'

export default function Reviews() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [minRating, setMinRating] = useState(0)
  const [country, setCountry] = useState('all')
  const [sort, setSort] = useState('recent')

  useSeo({
    title: 'Reviews',
    description: `Read verified guest reviews of AdventuresKashmir — rated ${(headlineRating ?? overallRating).toFixed(1)}/5 from ${headlineCount ?? totalReviews} reviews on TripAdvisor, ranked #1 in its Gulmarg category.`,
    image: asset('images/scenes/s-dawn-1.svg'),
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Reviews' }]),
        // AggregateRating is emitted ONLY when the data is marked real. It uses
        // the primary platform's true figures (5.0 / 223), not the on-page sample.
        ...(aggregateSchemaEnabled && headlineRating != null
          ? [{
              '@type': 'Organization',
              name: 'AdventuresKashmir',
              url: absoluteUrl('/'),
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: headlineRating,
                reviewCount: headlineCount,
                bestRating: 5,
                worstRating: 1,
              },
            }]
          : []),
      ],
    },
  })

  const counts = useMemo(categoryCounts, [])
  const allPhotos = useMemo(
    () => photoReviews.flatMap((r) => r.photos.map((src) => ({ src, alt: `Guest photo from ${r.name}'s review` }))),
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const out = reviews
      .filter((r) => (category === 'all' ? true : r.categories.includes(category)))
      .filter((r) => r.rating >= minRating)
      .filter((r) => (country === 'all' ? true : r.country === country))
      .filter((r) => {
        if (!q) return true
        const hay = [r.name, r.title, r.quote, r.country, r.slug].join(' ').toLowerCase()
        return q.split(/\s+/).every((t) => hay.includes(t))
      })
    const sorted = [...out]
    if (sort === 'recent') sorted.sort((a, b) => b.travelDate.localeCompare(a.travelDate))
    else if (sort === 'highest') sorted.sort((a, b) => b.rating - a.rating || b.travelDate.localeCompare(a.travelDate))
    else if (sort === 'photos') sorted.sort((a, b) => b.photos.length - a.photos.length)
    return sorted
  }, [query, category, minRating, country, sort])

  const hasFilters = Boolean(query) || category !== 'all' || minRating !== 0 || country !== 'all'
  const reset = () => { setQuery(''); setCategory('all'); setMinRating(0); setCountry('all') }
  const scrollToPhotos = () => document.getElementById('photo-reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <>
      {/* 1 — Hero */}
      <ReviewsHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Reviews' }]}
        eyebrow="Guest reviews"
        title="What our travellers say"
        subtitle="Every review here is from a real guest on our TripAdvisor profile, where we’re rated 5.0 out of 5 and ranked #1 in our Gulmarg category. Honest accounts, in their own words."
        image={asset('images/scenes/s-dawn-1.svg')}
        rating={headlineRating ?? overallRating}
        verifiedCount={verifiedCount}
      >
        <Button href="#reviews" variant="primary" size="lg">Read reviews <ArrowRight className="h-4 w-4" /></Button>
        <Button href={generalWhatsApp()} variant="glass" size="lg"><MessageCircle className="h-4 w-4" /> Plan your trip</Button>
      </ReviewsHero>

      {/* 2 + 3 + 4 — Overall rating & platform summaries */}
      <Section>
        <SectionHeading align="center" eyebrow="The verdict" title="Rated by the people who travelled" lead="Our headline score reflects our verified TripAdvisor profile; the breakdown below covers the reviews featured on this page." />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:gap-8">
          <RatingSummary rating={headlineRating ?? overallRating} total={headlineCount ?? totalReviews} distribution={ratingDistribution} verifiedCount={verifiedCount} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {platforms.map((p) => (
              <PlatformSummary
                key={p.id}
                platform={p}
                ctaLabel={p.id === 'tripadvisor' ? 'View all TripAdvisor reviews' : `View on ${p.name}`}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* 5 + review filters + search + categories — Verified testimonials */}
      <Section id="reviews" tone="surface" className="scroll-mt-24">
        <SectionHeading eyebrow="Verified testimonials" title="Guest reviews" lead="Filter by trip type, rating or country, or search for what matters to you." />
        <ReviewFilters
          className="mt-10"
          query={query} onQuery={setQuery}
          categories={activeCategories} activeCategory={category} onCategory={setCategory} counts={counts}
          minRating={minRating} onMinRating={setMinRating}
          countries={countries} activeCountry={country} onCountry={setCountry}
          sort={sort} onSort={setSort}
          onReset={reset} hasFilters={hasFilters}
        />
        <p className="mt-6 text-sm text-muted" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'review' : 'reviews'}{hasFilters ? ' match your filters' : ''}
        </p>
        <ReviewGrid reviews={filtered} onPhoto={scrollToPhotos} className="mt-6" />
      </Section>

      {/* 6 — Customer photos */}
      {allPhotos.length > 0 && (
        <Section id="photo-reviews" className="scroll-mt-24">
          <SectionHeading align="center" eyebrow="From our guests" title="Customer photos" lead="Real photographs, shared by travellers in their reviews." />
          <div className="mt-12"><AdventureGallery images={allPhotos} /></div>
        </Section>
      )}

      {/* 7 — Video testimonials (placeholder) */}
      <Section tone="surface">
        <SectionHeading eyebrow="In their words" title="Video testimonials" lead="Guest films are on the way — a few of our travellers are sharing their stories on camera." />
        <div className="mt-12"><GalleryVideo videos={videoTestimonials} kinds={videoKinds} /></div>
      </Section>

      {/* 8 — TripAdvisor CTA band */}
      <Section tone="pine">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-saffron-300">
            <MapPin className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white">See us on TripAdvisor</h2>
          <p className="mt-3 text-lg leading-relaxed text-pine-100">Read the full set of independent reviews and ratings on our TripAdvisor profile.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {platforms.find((p) => p.id === 'tripadvisor')?.url ? (
              <Button href={platforms.find((p) => p.id === 'tripadvisor').url} variant="solid" size="lg">
                View all TripAdvisor reviews <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/30 px-5 py-3 text-sm text-pine-100">
                <Star className="h-4 w-4 text-saffron-300" aria-hidden="true" /> TripAdvisor profile link coming soon
              </span>
            )}
            <Button href="#photo-reviews" variant="glass" size="lg"><Camera className="h-4 w-4" /> See guest photos</Button>
          </div>
        </div>
      </Section>

      {/* 9 — Book Now CTA */}
      <ContactCTA />
    </>
  )
}
