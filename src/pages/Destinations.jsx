import { ArrowRight, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Section, SectionHeading } from '@/components/ui'
import Button from '@/components/ui/Button'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { useSeo, absoluteUrl, breadcrumbLd } from '@/lib/seo'
import { generalWhatsApp } from '@/lib/whatsapp'
import { asset } from '@/lib/asset'
import { stagger, fadeUp, revealOnScroll } from '@/lib/motion'

import DestinationHero from '@/components/destinations/DestinationHero'
import DestinationCard from '@/components/destinations/DestinationCard'
import DestinationMap from '@/components/destinations/DestinationMap'
import FeatureCards from '@/components/about/FeatureCards'
import AdventureCard from '@/components/adventures/AdventureCard'
import Reviews from '@/components/sections/home/Reviews'
import ContactCTA from '@/components/sections/home/ContactCTA'

import {
  destinations, featuredDestinations, kashmirDestinations, ladakhDestinations,
  popularExperienceSlugs, seasonGuide, whyVisit, faqs,
} from '@/data/destinationGuides'
import { getActivity } from '@/data/adventures'

export default function Destinations() {
  useSeo({
    title: 'Destinations',
    description: 'A premium travel guide to Kashmir and Ladakh — Gulmarg, Srinagar, Pahalgam, Leh, Pangong and beyond. Overviews, seasons, weather, things to do and bookable trips.',
    image: asset('images/scenes/s-dawn-1.svg'),
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Destinations' }]),
        {
          '@type': 'ItemList',
          name: 'Kashmir & Ladakh destinations',
          itemListElement: destinations.map((d, i) => ({
            '@type': 'ListItem', position: i + 1, name: d.name, url: absoluteUrl(`/destinations/${d.slug}`),
          })),
        },
      ],
    },
  })

  const experiences = popularExperienceSlugs.map(getActivity).filter(Boolean)

  return (
    <>
      {/* 1 — Hero */}
      <DestinationHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Destinations' }]}
        eyebrow="Destinations"
        title="Where the Himalaya opens up"
        subtitle="From the lake city of Srinagar to the cobalt shores of Pangong — a considered guide to the fourteen places that make Kashmir and Ladakh unforgettable."
        image={asset('images/scenes/s-dawn-1.svg')}
      >
        <Button href="#explore" variant="primary" size="lg">Explore destinations <ArrowRight className="h-4 w-4" /></Button>
        <Button href={generalWhatsApp()} variant="glass" size="lg"><MessageCircle className="h-4 w-4" /> Plan with us</Button>
      </DestinationHero>

      {/* 2 — Featured destinations */}
      <Section>
        <SectionHeading align="center" eyebrow="Start here" title="Featured destinations" lead="The places we're asked about most — and the ones we never tire of showing." />
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featuredDestinations.map((d) => <DestinationCard key={d.slug} destination={d} />)}
        </div>
      </Section>

      {/* 3 — Interactive destination cards, grouped by region */}
      <Section id="explore" tone="surface" className="scroll-mt-24">
        <SectionHeading eyebrow="Every destination" title="The full guide" lead="Fourteen destinations across two very different worlds. Hover a card to look closer." />
        {[{ label: 'Kashmir Valley', list: kashmirDestinations }, { label: 'Ladakh', list: ladakhDestinations }].map((group) => (
          <div key={group.label} className="mt-12">
            <h3 className="font-display text-xl font-semibold text-pine-900">{group.label}</h3>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {group.list.map((d) => <DestinationCard key={d.slug} destination={d} />)}
            </div>
          </div>
        ))}
      </Section>

      {/* 4 — Popular experiences (cross-links into Adventures) */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Things to do" title="Popular experiences" />
          <Button to="/adventures" variant="outline" size="md">All adventures <ArrowRight className="h-4 w-4" /></Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {experiences.map((a) => <AdventureCard key={a.slug} activity={a} />)}
        </div>
      </Section>

      {/* 5 — Season guide */}
      <Section tone="glacier">
        <SectionHeading align="center" eyebrow="When to come" title="A season for every traveller" lead="Kashmir reinvents itself four times a year. Here's what each season offers." />
        <motion.ul variants={stagger} {...revealOnScroll} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {seasonGuide.map(({ season, months, icon: Icon, desc, bestFor }) => (
            <motion.li key={season} variants={fadeUp} className="rounded-3xl border border-line bg-surface p-6 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-glacier-100 text-pine-700">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-pine-900">{season}</h3>
              <p className="text-xs font-medium uppercase tracking-wider text-muted">{months}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{desc}</p>
              <p className="mt-4 border-t border-line pt-3 text-xs font-semibold text-pine-800">{bestFor}</p>
            </motion.li>
          ))}
        </motion.ul>
      </Section>

      {/* 6 — Map overview */}
      <Section>
        <SectionHeading align="center" eyebrow="Get your bearings" title="Map overview" lead="Every destination, placed. Select a pin to open its guide." />
        <DestinationMap className="mt-12" />
      </Section>

      {/* 7 — Why visit Kashmir */}
      <Section tone="pine">
        <SectionHeading align="center" eyebrow="Why Kashmir & Ladakh" title="Reasons to make the journey" lead="Few places on earth pack this much variety, culture and sheer beauty into one trip." className="[&_h2]:text-white [&_p]:text-pine-100" />
        <div className="mt-12"><FeatureCards items={whyVisit} tone="dark" columns={3} /></div>
      </Section>

      {/* 8 — Customer testimonials (reused from Home) */}
      <Reviews />

      {/* 9 — FAQs */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading align="center" eyebrow="Good to know" title="Destination FAQs" />
          <div className="mt-10"><FAQAccordion items={faqs} /></div>
          <div className="mt-8 text-center">
            <Button to="/faq" variant="outline" size="md">See all FAQs <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </Section>

      {/* 10 — Book Now CTA */}
      <ContactCTA />
    </>
  )
}
