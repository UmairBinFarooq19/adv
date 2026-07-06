import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import { Section } from '@/components/ui'
import FAQAccordion from '@/components/ui/FAQAccordion'
import ContactCTA from '@/components/sections/home/ContactCTA'
import { faqs, faqTopics } from '@/data/faqs'
import { useSeo } from '@/lib/seo'

// Global FAQ with instant search + topic filter. Reuses the shared accordion.
export default function Faq() {
  const [query, setQuery] = useState('')
  const [topic, setTopic] = useState('All')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return faqs.filter((f) => {
      if (topic !== 'All' && f.topic !== topic) return false
      if (!q) return true
      return `${f.q} ${f.a} ${f.topic}`.toLowerCase().includes(q)
    })
  }, [query, topic])

  useSeo({
    title: 'FAQ',
    description: 'Answers about booking, payments, cancellations, safety, permits and custom trips for Kashmir and Ladakh travel.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  })

  return (
    <>
      <PageHeader eyebrow="Help centre" title="Frequently asked questions" lead="Search our most common questions, or filter by topic. Still stuck? We’re a message away." />
      <Section>
        <div className="mx-auto max-w-3xl">
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              aria-label="Search FAQs"
              className="w-full rounded-full border border-line bg-surface py-4 pl-12 pr-4 text-body shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
            />
          </div>

          {/* Topic chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {['All', ...faqTopics].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                aria-pressed={topic === t}
                className={
                  'rounded-full border px-3.5 py-1.5 text-sm transition-colors ' +
                  (topic === t ? 'border-pine-800 bg-pine-800 text-white' : 'border-line bg-background text-pine-800 hover:border-pine-300')
                }
              >
                {t}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="mt-8">
            {results.length > 0 ? (
              <FAQAccordion items={results} />
            ) : (
              <p className="rounded-3xl border border-dashed border-line bg-surface/60 p-10 text-center text-muted">
                No matches for “{query}”. Try another word, or ask us directly.
              </p>
            )}
          </div>
        </div>
      </Section>
      <ContactCTA />
    </>
  )
}
