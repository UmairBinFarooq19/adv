import { ArrowRight, MessageCircle } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui'
import Button from '@/components/ui/Button'
import Media from '@/components/ui/Media'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { useSeo, absoluteUrl, breadcrumbLd } from '@/lib/seo'
import { generalWhatsApp } from '@/lib/whatsapp'
import { asset } from '@/lib/asset'

import AdventureHero from '@/components/adventures/AdventureHero'
import AdventureCard from '@/components/adventures/AdventureCard'
import AdventureSafety from '@/components/adventures/AdventureSafety'
import AdventureGallery from '@/components/adventures/AdventureGallery'
import FeatureCards from '@/components/about/FeatureCards'

import PackageCard from '@/components/packages/PackageCard'
import ContactCTA from '@/components/sections/home/ContactCTA'

import {
  adventureCategories, summerActivities, winterActivities,
  galleryImages, whyReasons, faqs,
} from '@/data/adventures'
import { featuredPackages } from '@/data/catalog'

export default function Adventures() {
  useSeo({
    title: 'Adventures',
    description: 'A premium catalogue of Kashmir adventures — skiing, snowboarding, rafting, paragliding, camping and more — each guided, equipped and safety-first.',
    image: asset('images/scenes/s-snow-2.svg'),
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Adventures' }]),
        {
          '@type': 'ItemList',
          name: 'Kashmir adventure activities',
          itemListElement: [...summerActivities, ...winterActivities].map((a, i) => ({
            '@type': 'ListItem', position: i + 1, name: a.name, url: absoluteUrl(`/adventures/${a.slug}`),
          })),
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

  return (
    <>
      {/* 1 — Hero */}
      <AdventureHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Adventures' }]}
        eyebrow="Adventures"
        title="Chase the extraordinary"
        subtitle="From powder days in Gulmarg to whitewater on the Lidder — a curated catalogue of Himalayan adventures, every one guided, equipped and handled with care."
        image={asset('images/scenes/s-snow-2.svg')}
      >
        <Button href="#summer" variant="primary" size="lg">Explore adventures <ArrowRight className="h-4 w-4" /></Button>
        <Button href={generalWhatsApp()} variant="glass" size="lg"><MessageCircle className="h-4 w-4" /> Talk to us</Button>
      </AdventureHero>

      {/* 2 — Adventure Categories */}
      <Section>
        <SectionHeading align="center" eyebrow="Two seasons, endless options" title="Choose your season" lead="Kashmir reinvents itself twice a year. Pick a season and dive in." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {adventureCategories.map((c) => {
            const Icon = c.icon
            return (
              <a key={c.id} href={c.to} className="group relative isolate flex min-h-[16rem] flex-col justify-end overflow-hidden rounded-4xl p-8 text-white shadow-soft transition-all duration-500 ease-premium hover:-translate-y-1.5 hover:shadow-lift">
                <Media src={c.image} alt="" className="absolute inset-0 -z-10 h-full w-full" imgClassName="transition-transform duration-[900ms] ease-premium group-hover:scale-110" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-pine-950 via-pine-950/60 to-pine-900/30" />
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-saffron-300 backdrop-blur">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm font-medium text-saffron-200">{c.tagline}</p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-pine-100">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                  Explore {c.title.split(' ')[0].toLowerCase()} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            )
          })}
        </div>
      </Section>

      {/* 3 — Summer Adventures */}
      <Section id="summer" tone="surface" className="scroll-mt-24">
        <SectionHeading eyebrow="Summer adventures" title="Warm-season thrills" lead="Meadows, rivers and alpine air from spring through early autumn." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {summerActivities.map((a) => <AdventureCard key={a.slug} activity={a} />)}
        </div>
      </Section>

      {/* 4 — Winter Adventures */}
      <Section id="winter" tone="glacier" className="scroll-mt-24">
        <SectionHeading eyebrow="Winter adventures" title="Snow-season classics" lead="World-class powder and snow play across the Gulmarg winter." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {winterActivities.map((a) => <AdventureCard key={a.slug} activity={a} />)}
        </div>
      </Section>

      {/* 5 — Why adventure with us */}
      <Section tone="pine">
        <SectionHeading align="center" eyebrow="Why AdventuresKashmir" title="Adventure, done properly" lead="The gear, the guides and the local knowledge that turn a good day out into a great one." className="[&_h2]:text-white [&_p]:text-pine-100" />
        <div className="mt-12"><FeatureCards items={whyReasons} tone="dark" columns={3} /></div>
      </Section>

      {/* 6 — Adventure safety */}
      <AdventureSafety tone="default" />

      {/* 7 — Adventure gallery */}
      <Section tone="surface">
        <SectionHeading align="center" eyebrow="The gallery" title="Moments from the mountains" lead="A glimpse of the terrain, the snow and the smiles. Real guest photography drops in here." />
        <div className="mt-12"><AdventureGallery images={galleryImages} /></div>
      </Section>

      {/* 8 — FAQs */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading align="center" eyebrow="Good to know" title="Adventure FAQs" />
          <div className="mt-10"><FAQAccordion items={faqs} /></div>
          <div className="mt-8 text-center">
            <Button to="/faq" variant="outline" size="md">See all FAQs <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </Section>

      {/* 9 — Related packages */}
      <Section tone="glacier">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Make it a trip" title="Packages built around adventure" />
          <Button to="/packages" variant="outline" size="md">All packages <ArrowRight className="h-4 w-4" /></Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featuredPackages.slice(0, 3).map((p) => <PackageCard key={p.slug} pkg={p} />)}
        </div>
      </Section>

      {/* 10 — CTA */}
      <ContactCTA />
    </>
  )
}
