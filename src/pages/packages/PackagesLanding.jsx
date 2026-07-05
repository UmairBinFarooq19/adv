import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHeading } from '@/components/ui'
import FAQAccordion from '@/components/ui/FAQAccordion'
import PackageHero from '@/components/packages/PackageHero'
import CategoryCard from '@/components/packages/CategoryCard'
import PackageGrid from '@/components/packages/PackageGrid'
import PackageFilter from '@/components/packages/PackageFilter'
import TopDestinations from '@/components/sections/home/TopDestinations'
import Reviews from '@/components/sections/home/Reviews'
import ContactCTA from '@/components/sections/home/ContactCTA'
import {
  categories, allPackages, featuredPackages, applyFilters,
} from '@/data/catalog'
import { scene } from '@/data/catalog/_shared'
import { useSeo } from '@/lib/seo'
import { fadeScale, stagger, revealOnScroll } from '@/lib/motion'

const landingFaqs = [
  { q: 'How far in advance should I book?', a: 'For summer and the winter ski season, 4–8 weeks is ideal for the best stays. We do take last-minute trips whenever we can arrange them well.' },
  { q: 'Are your prices per person or per group?', a: 'Listed prices are “from” per person on twin-sharing. Your exact quote depends on group size, season and room category.' },
  { q: 'Can I combine regions in one trip?', a: 'Absolutely — many guests pair Kashmir with Leh–Ladakh, or add a trek to a valley tour. Use the custom builder or just ask.' },
  { q: 'Do you arrange flights?', a: 'We arrange everything on the ground from your arrival at Srinagar or Leh. Flights are easy to add on request.' },
  { q: 'Is Kashmir safe to travel?', a: 'The tourist regions we operate in are well-established and welcoming. Our local guides monitor conditions and adjust plans for your comfort and safety.' },
]

const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Packages' }]

export default function PackagesLanding() {
  const [selected, setSelected] = useState({})
  const [query, setQuery] = useState('')

  const results = useMemo(() => applyFilters(allPackages, selected, query), [selected, query])

  const toggle = (groupId, value) =>
    setSelected((prev) => {
      const cur = new Set(prev[groupId] ?? [])
      cur.has(value) ? cur.delete(value) : cur.add(value)
      return { ...prev, [groupId]: [...cur] }
    })
  const reset = () => { setSelected({}); setQuery('') }

  useSeo({
    title: 'Kashmir Tour Packages',
    description: 'Curated Kashmir, skiing, trekking and Leh–Ladakh packages — privately guided and fully arranged. Filter by season, duration, destination and style.',
    image: scene('glacier', 1),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.label })),
    },
  })

  return (
    <>
      <PackageHero
        image={scene('glacier', 1)}
        eyebrow="Packages"
        title="Curated Himalayan journeys"
        intro="Ski, snow, trek and valley escapes across Kashmir and Ladakh — each privately guided, fully arranged, and shaped around how you like to travel."
        breadcrumbs={breadcrumbs}
      />

      {/* Category cards */}
      <Section>
        <SectionHeading eyebrow="Browse by type" title="Find your kind of trip" lead="Five ways in — pick a style and dive into the journeys within." />
        <motion.ul variants={stagger} {...revealOnScroll} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {categories.map((c) => (
            <motion.li key={c.slug} variants={fadeScale}><CategoryCard category={c} /></motion.li>
          ))}
        </motion.ul>
      </Section>

      {/* Featured */}
      <Section tone="surface">
        <SectionHeading eyebrow="Most loved" title="Featured packages" lead="A hand-picked cross-section of our most-booked journeys this season." />
        <div className="mt-12"><PackageGrid packages={featuredPackages} /></div>
      </Section>

      {/* Filter + browse all */}
      <Section id="browse">
        <SectionHeading eyebrow="Browse everything" title="All packages" lead="Filter by season, duration, destination or style — or search by name." />
        <div className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <PackageFilter
              selected={selected}
              query={query}
              onToggle={toggle}
              onQuery={setQuery}
              onReset={reset}
              resultCount={results.length}
            />
          </div>
          <PackageGrid packages={results} onReset={reset} columns={2} />
        </div>
      </Section>

      {/* Reused home sections for consistency */}
      <TopDestinations />
      <Reviews />

      {/* FAQ */}
      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionHeading eyebrow="Good to know" title="Frequently asked questions" lead="Everything you need before you book. Still unsure? We’re a message away." />
          <FAQAccordion items={landingFaqs} />
        </div>
      </Section>

      <ContactCTA />
    </>
  )
}
