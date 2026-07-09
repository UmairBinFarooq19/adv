import { lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Clock, Gauge, MapPin, Star, Check, X, BedDouble, UtensilsCrossed, Car,
  Mountain, CalendarRange, Wrench, Award, ShieldCheck,
} from 'lucide-react'
import Container from '@/components/ui/Container'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ContourDivider from '@/components/ui/ContourDivider'
import Button from '@/components/ui/Button'
import Media from '@/components/ui/Media'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { Section, SectionHeading } from '@/components/ui'
import PackageTimeline from '@/components/packages/PackageTimeline'
import PackageGallery from '@/components/packages/PackageGallery'
import PricingCard from '@/components/packages/PricingCard'
import BookingSidebar from '@/components/packages/BookingSidebar'
import PackageGrid from '@/components/packages/PackageGrid'
import { getPackage, getRelated, getCategory, formatPrice } from '@/data/catalog'
import { useSeo, breadcrumbLd } from '@/lib/seo'
import { useInquiry } from '@/store/InquiryContext'
import { fadeUp, stagger, revealOnScroll } from '@/lib/motion'

const NotFound = lazy(() => import('@/pages/NotFound'))

// Small titled block used for each content section on the page.
function Block({ id, title, children, className = '' }) {
  return (
    <motion.section id={id} variants={fadeUp} className={`scroll-mt-28 ${className}`}>
      <h2 className="font-display text-2xl font-semibold text-pine-900">{title}</h2>
      <div className="mt-5">{children}</div>
    </motion.section>
  )
}

export default function PackageDetails() {
  const { slug } = useParams()
  const pkg = getPackage(slug)
  const { openInquiry } = useInquiry()

  useSeo(
    pkg
      ? {
          title: pkg.title,
          description: pkg.summary,
          image: pkg.image,
          type: 'article',
          jsonLd: {
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'TouristTrip',
                name: pkg.title,
                description: pkg.summary,
                image: pkg.image,
                touristType: pkg.tags,
                offers: { '@type': 'Offer', price: pkg.priceFrom, priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
                aggregateRating: { '@type': 'AggregateRating', ratingValue: pkg.rating, reviewCount: pkg.reviews },
              },
              breadcrumbLd([
                { name: 'Home', path: '/' },
                { name: 'Packages', path: '/packages' },
                { name: getCategory(pkg.category)?.title ?? pkg.category, path: `/packages/${pkg.category}` },
                { name: pkg.title },
              ]),
            ],
          },
        }
      : { title: 'Not found' },
  )

  if (!pkg) return <Suspense fallback={null}><NotFound /></Suspense>

  const category = getCategory(pkg.category)
  const related = getRelated(pkg, 3)
  const breadcrumbs = [
    { label: 'Home', to: '/' },
    { label: 'Packages', to: '/packages' },
    { label: category?.short ?? 'Packages', to: `/packages/${pkg.category}` },
    { label: pkg.title },
  ]

  const facts = [
    { icon: Clock, label: pkg.duration },
    { icon: Gauge, label: pkg.difficulty },
    { icon: Star, label: `${pkg.rating} (${pkg.reviews})` },
    { icon: MapPin, label: pkg.location },
  ]

  const hasSkiExtras = pkg.skillLevel || pkg.equipment || pkg.instructor
  const hasTrekExtras = pkg.altitude || pkg.bestSeason

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-pine-950 text-white">
        <Media src={pkg.image} alt="" eager className="absolute inset-0 -z-10 h-full w-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-pine-950 via-pine-950/85 to-pine-900/70" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 text-saffron-400/20"><ContourDivider className="h-32" opacity={0.6} /></div>
        <Container className="relative py-14 sm:py-20 lg:py-24">
          <Breadcrumbs items={breadcrumbs} className="mb-6" />
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
            {pkg.badge && (
              <motion.span variants={fadeUp} className="inline-block rounded-full bg-saffron-400 px-3 py-1 text-xs font-semibold text-pine-950">{pkg.badge}</motion.span>
            )}
            <motion.h1 variants={fadeUp} className="mt-4 text-display-md font-semibold text-white">{pkg.title}</motion.h1>
            <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-pine-100">{pkg.summary}</motion.p>
            <motion.ul variants={fadeUp} className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              {facts.map((f) => (
                <li key={f.label} className="inline-flex items-center gap-2 text-sm text-pine-100">
                  <f.icon className="h-4 w-4 text-saffron-300" aria-hidden="true" />{f.label}
                </li>
              ))}
            </motion.ul>
          </motion.div>
        </Container>
      </section>

      {/* Body: main + sticky sidebar */}
      <Container className="py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
          <motion.div variants={stagger} {...revealOnScroll} className="min-w-0 space-y-14">
            {/* Overview */}
            <Block title="Overview">
              <p className="leading-relaxed text-body">{pkg.summary}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-pine-800">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-saffron-500" aria-hidden="true" />{h}
                  </li>
                ))}
              </ul>
            </Block>

            {/* Ski extras */}
            {hasSkiExtras && (
              <Block title="Skill level & equipment">
                {pkg.skillLevel && (
                  <p className="flex items-start gap-2.5 leading-relaxed text-body"><Gauge className="mt-0.5 h-5 w-5 shrink-0 text-saffron-600" />{pkg.skillLevel}</p>
                )}
                {pkg.equipment && (
                  <div className="mt-5">
                    <h3 className="flex items-center gap-2 font-semibold text-pine-900"><Wrench className="h-4 w-4 text-saffron-600" /> Equipment</h3>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {pkg.equipment.map((e) => <li key={e} className="flex items-center gap-2 text-sm text-pine-800"><Check className="h-4 w-4 text-saffron-500" />{e}</li>)}
                    </ul>
                  </div>
                )}
                {pkg.instructor && (
                  <div className="mt-6 flex items-start gap-4 rounded-3xl border border-line bg-surface p-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-pine-700 to-glacier-600 font-semibold text-white">
                      <Award className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-pine-900">{pkg.instructor.name}</h3>
                      <p className="text-sm text-muted">{pkg.instructor.creds}</p>
                      <p className="mt-1 text-sm text-pine-800">{pkg.instructor.note}</p>
                    </div>
                  </div>
                )}
              </Block>
            )}

            {/* Trek facts */}
            {hasTrekExtras && (
              <Block title="Trek facts">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { icon: Gauge, label: 'Difficulty', value: pkg.difficulty },
                    { icon: Mountain, label: 'Max altitude', value: pkg.altitude },
                    { icon: CalendarRange, label: 'Best season', value: pkg.bestSeason },
                  ].map((f) => (
                    <div key={f.label} className="rounded-2xl border border-line bg-surface p-5">
                      <f.icon className="h-5 w-5 text-saffron-600" aria-hidden="true" />
                      <p className="mt-2 text-xs uppercase tracking-wider text-muted">{f.label}</p>
                      <p className="font-semibold text-pine-900">{f.value}</p>
                    </div>
                  ))}
                </div>
              </Block>
            )}

            {/* Itinerary */}
            <Block title="Day-by-day itinerary"><PackageTimeline items={pkg.itinerary} /></Block>

            {/* Included / Not included */}
            <Block title="What’s included">
              <div className="grid gap-8 sm:grid-cols-2">
                <ul className="space-y-2.5">
                  {pkg.included.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-pine-800"><Check className="mt-0.5 h-5 w-5 shrink-0 text-glacier-600" aria-hidden="true" />{i}</li>
                  ))}
                </ul>
                <ul className="space-y-2.5">
                  {pkg.notIncluded.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-muted"><X className="mt-0.5 h-5 w-5 shrink-0 text-pine-300" aria-hidden="true" />{i}</li>
                  ))}
                </ul>
              </div>
            </Block>

            {/* Stay / meals / transport */}
            <Block title="Stay, meals & transport">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { icon: BedDouble, label: 'Accommodation', value: pkg.accommodation },
                  { icon: UtensilsCrossed, label: 'Meals', value: pkg.meals },
                  { icon: Car, label: 'Transport', value: pkg.transportation },
                ].map((f) => (
                  <div key={f.label} className="rounded-2xl border border-line bg-surface p-5">
                    <f.icon className="h-5 w-5 text-saffron-600" aria-hidden="true" />
                    <p className="mt-2 text-xs uppercase tracking-wider text-muted">{f.label}</p>
                    <p className="mt-0.5 text-sm text-pine-800">{f.value}</p>
                  </div>
                ))}
              </div>
            </Block>

            {/* Gallery */}
            <Block title="Gallery"><PackageGallery images={pkg.gallery} /></Block>

            {/* Pricing */}
            <Block title="Pricing"><PricingCard pkg={pkg} /></Block>

            {/* FAQs */}
            <Block title="Frequently asked questions"><FAQAccordion items={pkg.faqs} /></Block>

            {/* Cancellation */}
            <Block title="Cancellation policy">
              <p className="flex items-start gap-2.5 leading-relaxed text-body"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-glacier-600" />{pkg.cancellation}</p>
            </Block>
          </motion.div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <BookingSidebar pkg={pkg} />
          </aside>
        </div>
      </Container>

      {/* Related */}
      {related.length > 0 && (
        <Section tone="surface">
          <SectionHeading eyebrow="You may also like" title="Related packages" lead="More journeys in the same spirit — hand-picked to pair well with this one." />
          <div className="mt-12"><PackageGrid packages={related} /></div>
        </Section>
      )}

      {/* Mobile sticky booking bar */}
      <div className="sticky bottom-0 z-40 border-t border-line bg-surface/95 p-4 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <span>
            <span className="block text-xs text-muted">from</span>
            <span className="font-display text-xl font-semibold text-pine-900">{formatPrice(pkg.priceFrom)}</span>
          </span>
          <Button variant="primary" size="md" className="flex-1 max-w-[60%]" onClick={() => openInquiry(pkg)}>Book now</Button>
        </div>
      </div>
    </>
  )
}
