import { useParams } from 'react-router-dom'
import { ArrowRight, MessageCircle, Phone, Check, Utensils, MapPin, Compass, Sparkles } from 'lucide-react'
import { Section, SectionHeading, Eyebrow } from '@/components/ui'
import Button from '@/components/ui/Button'
import FAQAccordion from '@/components/ui/FAQAccordion'
import PackageCard from '@/components/packages/PackageCard'
import ContactCTA from '@/components/sections/home/ContactCTA'
import NotFound from '@/pages/NotFound'

import DestinationHero from '@/components/destinations/DestinationHero'
import DestinationHighlights from '@/components/destinations/DestinationHighlights'
import DestinationActivities from '@/components/destinations/DestinationActivities'
import DestinationWeather from '@/components/destinations/DestinationWeather'
import DestinationGallery from '@/components/destinations/DestinationGallery'
import DestinationMap from '@/components/destinations/DestinationMap'
import DestinationNearby from '@/components/destinations/DestinationNearby'

import { getDestination } from '@/data/destinationGuides'
import { allPackages, getByCategory } from '@/data/catalog'
import { useInquiry } from '@/store/InquiryContext'
import { useSeo, breadcrumbLd } from '@/lib/seo'
import { waLink } from '@/lib/whatsapp'
import { site } from '@/data/site'

// Resolves bookable packages for a destination: prefer real name matches against
// the existing catalog (title/location), else fall back to its category. The
// catalog stays the single source of truth — new packages surface automatically.
function packagesFor(dest) {
  const terms = dest.packageMatch.map((t) => t.toLowerCase())
  const matched = allPackages.filter((p) => {
    const hay = `${p.title} ${p.location ?? ''}`.toLowerCase()
    return terms.some((t) => hay.includes(t))
  })
  return (matched.length ? matched : getByCategory(dest.category)).slice(0, 3)
}

export default function DestinationDetail() {
  const { slug } = useParams()
  const dest = getDestination(slug)
  const { openInquiry } = useInquiry()

  useSeo({
    title: dest ? `${dest.name} · Destinations` : 'Destination not found',
    description: dest?.blurb,
    image: dest?.image,
    type: 'article',
    jsonLd: dest && {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TouristDestination',
          name: dest.name,
          description: dest.blurb,
          geo: { '@type': 'GeoCoordinates', latitude: dest.coords.lat, longitude: dest.coords.lng },
        },
        breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Destinations', path: '/destinations' },
          { name: dest.name },
        ]),
        {
          '@type': 'FAQPage',
          mainEntity: dest.faqs.map((f) => ({
            '@type': 'Question', name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
      ],
    },
  })

  if (!dest) return <NotFound />

  const packages = packagesFor(dest)
  const tel = `tel:${site.contact.phone.replace(/\s/g, '')}`
  const wa = waLink(`Hello AdventuresKashmir, I would like to plan a trip to ${dest.name}. Could you share options?`)
  const book = () => openInquiry({ title: `${dest.name} trip`, priceFrom: packages[0]?.priceFrom })

  return (
    <>
      {/* Hero */}
      <DestinationHero
        size="sm"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Destinations', to: '/destinations' }, { label: dest.name }]}
        eyebrow={dest.region}
        title={dest.name}
        subtitle={dest.tagline}
        image={dest.image}
        meta={{ elevation: dest.elevation, bestSeason: dest.bestSeason }}
      >
        <Button variant="primary" size="lg" onClick={book}>Book now <ArrowRight className="h-4 w-4" /></Button>
        <Button href={wa} variant="glass" size="lg"><MessageCircle className="h-4 w-4" /> WhatsApp</Button>
        <Button href={tel} variant="glass" size="lg"><Phone className="h-4 w-4" /> Call now</Button>
      </DestinationHero>

      {/* Overview + Things to do */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div>
            <Eyebrow>Overview</Eyebrow>
            <h2 className="mt-4 text-display-sm font-semibold tracking-tight">About {dest.name}</h2>
            {dest.overview.map((p) => <p key={p.slice(0, 24)} className="mt-6 text-lg leading-relaxed text-muted">{p}</p>)}
          </div>
          <div className="rounded-4xl border border-line bg-surface p-7 shadow-soft">
            <h3 className="font-display text-lg font-semibold text-pine-900">Things to do</h3>
            <ul className="mt-4 space-y-3">
              {dest.thingsToDo.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-pine-800">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-saffron-500" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Highlights */}
      <Section tone="surface">
        <SectionHeading align="center" eyebrow="Highlights" title={`What makes ${dest.name} special`} />
        <DestinationHighlights highlights={dest.highlights} className="mt-12" />
      </Section>

      {/* Adventure activities */}
      {dest.activitySlugs.length > 0 && (
        <Section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Adventures here" title="Activities in this destination" />
            <Button to="/adventures" variant="outline" size="md">All adventures <ArrowRight className="h-4 w-4" /></Button>
          </div>
          <DestinationActivities activitySlugs={dest.activitySlugs} className="mt-10" />
        </Section>
      )}

      {/* Available packages */}
      {packages.length > 0 && (
        <Section tone="glacier">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Make it a trip" title={`Packages featuring ${dest.name}`} />
            <Button to="/packages" variant="outline" size="md">All packages <ArrowRight className="h-4 w-4" /></Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {packages.map((p) => <PackageCard key={p.slug} pkg={p} />)}
          </div>
        </Section>
      )}

      {/* Best time to visit + Weather by season */}
      <Section>
        <SectionHeading align="center" eyebrow="Best time to visit" title={dest.bestSeason} lead={dest.bestSeasonNote} />
        <DestinationWeather weather={dest.weather} className="mt-12" />
      </Section>

      {/* Photo gallery */}
      <Section tone="surface">
        <SectionHeading align="center" eyebrow="Gallery" title={`${dest.name} in pictures`} />
        <DestinationGallery images={dest.gallery.map((im) => ({ ...im, alt: im.alt || `${dest.name} landscape` }))} className="mt-12" />
      </Section>

      {/* Local culture + Food */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <Eyebrow>Local culture</Eyebrow>
            <h2 className="mt-4 text-display-sm font-semibold tracking-tight">The people and traditions</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{dest.culture}</p>
            <div className="mt-8 rounded-3xl border border-line bg-surface p-6 shadow-soft">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-pine-900">
                <Compass className="h-5 w-5 text-saffron-500" aria-hidden="true" /> Travel tips
              </h3>
              <ul className="mt-4 space-y-3">
                {dest.travelTips.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-pine-800">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-saffron-500" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <Eyebrow>What to eat</Eyebrow>
            <h2 className="mt-4 text-display-sm font-semibold tracking-tight">Food recommendations</h2>
            <ul className="mt-6 space-y-4">
              {dest.food.map((f) => (
                <li key={f.name} className="flex gap-4 rounded-3xl border border-line bg-surface p-5 shadow-soft">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-glacier-100 text-pine-700">
                    <Utensils className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-pine-900">{f.name}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{f.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-3xl border border-line bg-surface p-6 shadow-soft">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-pine-900">
                <Sparkles className="h-5 w-5 text-saffron-500" aria-hidden="true" /> Nearby attractions
              </h3>
              <ul className="mt-4 space-y-3">
                {dest.nearbyAttractions.map((n) => (
                  <li key={n} className="flex items-start gap-2.5 text-sm text-pine-800">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron-500" aria-hidden="true" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Where it sits */}
      <Section tone="surface">
        <SectionHeading align="center" eyebrow="On the map" title={`Where ${dest.name} sits`} lead="Its place in the region — and the destinations around it." />
        <DestinationMap activeSlug={dest.slug} className="mt-12" />
      </Section>

      {/* FAQs */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading align="center" eyebrow="Good to know" title={`${dest.name} FAQs`} />
          <div className="mt-10"><FAQAccordion items={dest.faqs} /></div>
        </div>
      </Section>

      {/* Related destinations */}
      <Section tone="glacier">
        <SectionHeading eyebrow="Keep exploring" title="Related destinations" lead="Places that pair beautifully with this one." />
        <DestinationNearby slugs={dest.nearbySlugs} className="mt-10" />
      </Section>

      {/* Book Now CTA */}
      <ContactCTA />
    </>
  )
}
