import { ArrowRight, MessageCircle, Phone, Check } from 'lucide-react'
import AdventureHero from './AdventureHero'
import AdventureStats from './AdventureStats'
import AdventureGallery from './AdventureGallery'
import { Section, SectionHeading, Eyebrow } from '@/components/ui'
import Button from '@/components/ui/Button'
import PackageCard from '@/components/packages/PackageCard'
import ContactCTA from '@/components/sections/home/ContactCTA'
import { getByCategory } from '@/data/catalog'
import { useInquiry } from '@/store/InquiryContext'
import { waLink } from '@/lib/whatsapp'
import { site } from '@/data/site'

// AdventureDetails — the one template every activity detail page renders through.
// Composes AdventureHero, AdventureStats, AdventureGallery, reuses PackageCard for
// related trips and ContactCTA to close. Booking reuses the existing global
// inquiry modal by passing a package-shaped object, so no booking logic is
// duplicated. Data-driven from one `activity`.
export default function AdventureDetails({ activity }) {
  const { openInquiry } = useInquiry()
  const related = getByCategory(activity.relatedCategory).slice(0, 3)
  const tel = `tel:${site.contact.phone.replace(/\s/g, '')}`
  const wa = waLink(`Hello AdventuresKashmir, I am interested in the ${activity.name} adventure. Could you share details and availability?`)
  const book = () => openInquiry({ title: `${activity.name} (Adventure)`, priceFrom: activity.priceFrom })

  const crumbs = [
    { label: 'Home', to: '/' },
    { label: 'Adventures', to: '/adventures' },
    { label: activity.name },
  ]

  return (
    <>
      <AdventureHero
        size="sm"
        breadcrumbs={crumbs}
        eyebrow={`${activity.season} adventure`}
        title={activity.name}
        image={activity.image}
        subtitle={`${activity.tagline} · ${activity.location}`}
      >
        <Button variant="primary" size="lg" onClick={book}>Book now <ArrowRight className="h-4 w-4" /></Button>
        <Button href={wa} variant="glass" size="lg"><MessageCircle className="h-4 w-4" /> WhatsApp</Button>
        <Button href={tel} variant="glass" size="lg"><Phone className="h-4 w-4" /> Call now</Button>
      </AdventureHero>

      {/* Overview + highlights, then the facts strip */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div>
            <Eyebrow>Overview</Eyebrow>
            <h2 className="mt-4 text-display-sm font-semibold tracking-tight">About this adventure</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{activity.overview}</p>
          </div>
          <div className="rounded-4xl border border-line bg-surface p-7 shadow-soft">
            <h3 className="font-display text-lg font-semibold text-pine-900">Highlights</h3>
            <ul className="mt-4 space-y-3">
              {activity.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-pine-800">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-saffron-500" aria-hidden="true" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <AdventureStats activity={activity} className="mt-10" />
      </Section>

      {/* Gallery */}
      <Section tone="surface">
        <SectionHeading align="center" eyebrow="Gallery" title={`${activity.name} in the wild`} />
        <div className="mt-10"><AdventureGallery images={activity.gallery} /></div>
      </Section>

      {/* Related packages */}
      {related.length > 0 && (
        <Section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Make it a trip" title="Packages featuring this adventure" />
            <Button to={`/packages/${activity.relatedCategory}`} variant="outline" size="md">View all <ArrowRight className="h-4 w-4" /></Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {related.map((p) => <PackageCard key={p.slug} pkg={p} />)}
          </div>
        </Section>
      )}

      <ContactCTA />
    </>
  )
}
