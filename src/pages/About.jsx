import { Compass, Telescope, ArrowRight, MessageCircle } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui'
import Button from '@/components/ui/Button'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { useSeo } from '@/lib/seo'
import { generalWhatsApp } from '@/lib/whatsapp'

// New reusable About building blocks
import PageHero from '@/components/about/PageHero'
import SplitSection from '@/components/about/SplitSection'
import Stat from '@/components/about/Stat'
import TeamCard from '@/components/about/TeamCard'
import Timeline from '@/components/about/Timeline'
import FeatureCards from '@/components/about/FeatureCards'

// Reused, unchanged home sections
import WhyChooseUs from '@/components/sections/home/WhyChooseUs'
import Reviews from '@/components/sections/home/Reviews'
import ContactCTA from '@/components/sections/home/ContactCTA'

import { about } from '@/data/about'
import { faqs } from '@/data/faqs'

// A short, About-relevant slice of the global FAQ set (the full list lives on /faq).
const aboutFaqs = faqs.filter((f) => ['Travel', 'Booking', 'Cancellations', 'Custom trips'].includes(f.topic)).slice(0, 5)

const purpose = [
  { label: 'Our Mission', icon: Compass, text: about.mission },
  { label: 'Our Vision', icon: Telescope, text: about.vision },
]

export default function About() {
  useSeo({
    title: 'About us',
    description: 'Meet the Kashmiri guides, ski instructors and planners behind AdventuresKashmir — a small team crafting premium, safety-first Himalayan journeys since 2013.',
    image: about.hero.image,
  })

  return (
    <>
      {/* 1 — Hero */}
      <PageHero eyebrow={about.hero.eyebrow} title={about.hero.title} lead={about.hero.lead} image={about.hero.image}>
        <div className="flex flex-wrap gap-3">
          <Button to="/packages" variant="primary" size="lg">Explore packages <ArrowRight className="h-4 w-4" /></Button>
          <Button href={generalWhatsApp()} variant="glass" size="lg"><MessageCircle className="h-4 w-4" /> Talk to us</Button>
        </div>
      </PageHero>

      {/* 2 — Our Story */}
      <SplitSection eyebrow={about.story.eyebrow} title={about.story.title} image={about.story.image}>
        {about.story.paragraphs.map((p) => <p key={p}>{p}</p>)}
      </SplitSection>

      {/* 3 — Who We Are */}
      <SplitSection eyebrow={about.whoWeAre.eyebrow} title={about.whoWeAre.title} image={about.whoWeAre.image} tone="surface" reverse>
        {about.whoWeAre.paragraphs.map((p) => <p key={p}>{p}</p>)}
      </SplitSection>

      {/* 4 — Meet the Team */}
      <Section tone="glacier">
        <SectionHeading align="center" eyebrow="Meet the team" title="The people on the trail" lead="Small on purpose — the people who plan your trip are close to the people who lead it." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {about.team.map((m) => <TeamCard key={m.name} member={m} />)}
        </div>
      </Section>

      {/* 5 — Our Mission & Our Vision */}
      <Section tone="default">
        <SectionHeading align="center" eyebrow="Our purpose" title="What drives every journey" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {purpose.map(({ label, icon: Icon, text }) => (
            <div key={label} className="rounded-4xl border border-line bg-surface p-8 shadow-soft sm:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-glacier-100 text-pine-700">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-pine-900">{label}</h3>
              <p className="mt-3 text-lg leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 6 — Why Choose AdventuresKashmir (reused home section) */}
      <WhyChooseUs />

      {/* 7 — Safety & Professional Standards */}
      <Section tone="surface">
        <SectionHeading align="center" eyebrow="Safety & standards" title="Adventure, professionally handled" lead="The thrill is the point — the risk is not. Here's how we keep our guests safe on serious ground." />
        <div className="mt-12">
          <FeatureCards items={about.safety} tone="light" columns={3} />
        </div>
      </Section>

      {/* 8 — Customer Statistics */}
      <Section tone="pine">
        <SectionHeading align="center" eyebrow="By the numbers" title="A decade, well travelled" className="[&_h2]:text-white [&_p]:text-pine-100" />
        <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {about.stats.map((s) => <Stat key={s.label} {...s} tone="dark" />)}
        </div>
      </Section>

      {/* 9 — Timeline */}
      <Section tone="default">
        <SectionHeading align="center" eyebrow="Our journey" title="How we got here" />
        <div className="mt-14"><Timeline items={about.timeline} /></div>
      </Section>

      {/* 10 — Testimonials (reused home section) */}
      <Reviews />

      {/* 11 — FAQ */}
      <Section tone="default">
        <div className="mx-auto max-w-3xl">
          <SectionHeading align="center" eyebrow="Good to know" title="Frequently asked questions" />
          <div className="mt-10"><FAQAccordion items={aboutFaqs} /></div>
          <div className="mt-8 text-center">
            <Button to="/faq" variant="outline" size="md">See all FAQs <ArrowRight className="h-4 w-4" /></Button>
          </div>
        </div>
      </Section>

      {/* 12 — Book Your Adventure CTA (reused home section) */}
      <ContactCTA />
    </>
  )
}
