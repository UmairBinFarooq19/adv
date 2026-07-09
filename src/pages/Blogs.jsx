import { useMemo, useState } from 'react'
import { ArrowRight, Lightbulb, Compass, MapPin } from 'lucide-react'
import { Section, SectionHeading } from '@/components/ui'
import Button from '@/components/ui/Button'
import FAQAccordion from '@/components/ui/FAQAccordion'
import ContactCTA from '@/components/sections/home/ContactCTA'

import BlogHero from '@/components/blog/BlogHero'
import BlogCard from '@/components/blog/BlogCard'
import BlogGrid from '@/components/blog/BlogGrid'
import BlogSidebar from '@/components/blog/BlogSidebar'
import NewsletterSignup from '@/components/blog/NewsletterSignup'
import DestinationCard from '@/components/destinations/DestinationCard'

import {
  posts, featuredPost, popularPosts, activeCategories,
  categoryCounts, seasons, faqs, referencedDestinations, postsByCategory,
} from '@/data/blog'
import { getDestination } from '@/data/destinationGuides'
import { useSeo, absoluteUrl, breadcrumbLd } from '@/lib/seo'
import { asset } from '@/lib/asset'

export default function Blogs() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [destination, setDestination] = useState('all')
  const [season, setSeason] = useState('all')

  useSeo({
    title: 'Journal',
    description: 'A travel magazine for Kashmir and Ladakh — ski guides, trek notes, food, culture and photography, written by the guides who lead the trips.',
    image: asset('images/blog-1.svg'),
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Blogs' }]),
        {
          '@type': 'Blog',
          name: 'AdventuresKashmir Journal',
          blogPost: posts.map((p) => ({
            '@type': 'BlogPosting', headline: p.title, datePublished: p.date, url: absoluteUrl(`/blogs/${p.slug}`),
          })),
        },
      ],
    },
  })

  const destinationOptions = useMemo(
    () => referencedDestinations.map(getDestination).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name)),
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return postsByCategory(category)
      .filter((p) => (destination === 'all' ? true : p.destinations.includes(destination)))
      .filter((p) => (season === 'all' ? true : p.season === season))
      .filter((p) => {
        if (!q) return true
        const hay = [p.title, p.subtitle, p.excerpt, ...p.tags].join(' ').toLowerCase()
        return q.split(/\s+/).every((t) => hay.includes(t))
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [query, category, destination, season])

  const hasFilters = Boolean(query) || category !== 'all' || destination !== 'all' || season !== 'all'
  const reset = () => { setQuery(''); setCategory('all'); setDestination('all'); setSeason('all') }

  const featuredDests = ['gulmarg', 'srinagar', 'leh'].map(getDestination).filter(Boolean)
  const tipsPosts = posts.filter((p) => ['travel-tips', 'packing-guides'].includes(p.category))
  const guidePosts = posts.filter((p) => ['skiing-guides', 'snowboarding', 'trekking', 'adventure-activities'].includes(p.category))

  return (
    <>
      {/* 1 — Hero */}
      <BlogHero
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Blogs' }]}
        eyebrow="The journal"
        title="Notes from the Himalaya"
        subtitle="Ski guides, trek notes, kitchens and craft — written by the guides who lead the trips, not by anyone who has only read about them."
        image={asset('images/blog-1.svg')}
        postCount={posts.length}
        categoryCount={activeCategories.length}
      >
        <Button href="#articles" variant="primary" size="lg">Read the archive <ArrowRight className="h-4 w-4" /></Button>
      </BlogHero>

      {/* 2 — Featured article */}
      <Section>
        <SectionHeading eyebrow="Featured" title="This month's read" />
        <BlogCard post={featuredPost} variant="feature" className="mt-10" />
      </Section>

      {/* 3 + 4 + 5 — Search, categories, latest articles (sidebar-paired listing) */}
      <Section id="articles" tone="surface" className="scroll-mt-24">
        <SectionHeading eyebrow="The archive" title="Latest articles" lead="Search the journal, or filter by category, destination and season." />
        <div className="mt-12 grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-14">
          <BlogSidebar
            query={query} onQuery={setQuery}
            categories={activeCategories} activeCategory={category} onCategory={setCategory} counts={categoryCounts()}
            destinations={destinationOptions} activeDestination={destination} onDestination={setDestination}
            seasons={seasons} activeSeason={season} onSeason={setSeason}
            popular={popularPosts.slice(0, 4)}
            onReset={reset} hasFilters={hasFilters}
          />
          <div className="min-w-0">
            <p className="text-sm text-muted" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}{hasFilters ? ' match your filters' : ''}
            </p>
            <BlogGrid posts={filtered} columns={2} className="mt-6" />
          </div>
        </div>
      </Section>

      {/* 6 — Popular articles */}
      <Section>
        <SectionHeading eyebrow="Most read" title="Popular articles" lead="The pieces our guests return to before they travel." />
        <BlogGrid posts={popularPosts.slice(0, 3)} columns={3} className="mt-10" />
      </Section>

      {/* 7 — Adventure guides */}
      <Section tone="glacier">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Adventure guides" title="Before you clip in" lead="Skiing, snowboarding, trekking and the activities in between." />
          <Button to="/adventures" variant="outline" size="md"><Compass className="h-4 w-4" /> All adventures</Button>
        </div>
        <BlogGrid posts={guidePosts.slice(0, 3)} columns={3} className="mt-10" />
      </Section>

      {/* 8 — Travel tips */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Travel tips" title="Practical, tested advice" lead="Packing, permits and the small things that make a trip work." />
          <span className="inline-flex items-center gap-1.5 text-sm text-muted"><Lightbulb className="h-4 w-4 text-saffron-600" aria-hidden="true" /> From our guides</span>
        </div>
        <BlogGrid posts={tipsPosts} columns={3} emptyMessage="Tips are on the way." className="mt-10" />
      </Section>

      {/* 9 — Featured destinations */}
      <Section tone="surface">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Featured destinations" title="Places we write about most" />
          <Button to="/destinations" variant="outline" size="md"><MapPin className="h-4 w-4" /> All destinations</Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featuredDests.map((d) => <DestinationCard key={d.slug} destination={d} />)}
        </div>
      </Section>

      {/* 10 — Newsletter */}
      <Section tone="pine">
        <NewsletterSignup tone="dark" />
      </Section>

      {/* 11 — FAQs */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading align="center" eyebrow="Good to know" title="Journal FAQs" />
          <div className="mt-10"><FAQAccordion items={faqs} /></div>
        </div>
      </Section>

      {/* 12 — Book Your Trip CTA */}
      <ContactCTA />
    </>
  )
}
