import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Clock, CalendarDays, ArrowRight, MessageCircle, Lightbulb,
  TriangleAlert, Info, Quote as QuoteIcon, MapPin, Mountain, Package,
} from 'lucide-react'
import { Section, SectionHeading, Eyebrow } from '@/components/ui'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Media from '@/components/ui/Media'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ContourDivider from '@/components/ui/ContourDivider'
import FAQAccordion from '@/components/ui/FAQAccordion'
import ContactCTA from '@/components/sections/home/ContactCTA'

import TableOfContents from './TableOfContents'
import ReadingProgress from './ReadingProgress'
import ArticleAuthor from './ArticleAuthor'
import ArticleGallery from './ArticleGallery'
import RelatedPosts from './RelatedPosts'
import NewsletterSignup from './NewsletterSignup'

import { getAuthor, getBlogCategory, readingTime, tableOfContents } from '@/data/blog'
import { getDestination } from '@/data/destinationGuides'
import { getActivity } from '@/data/adventures'
import { getPackage } from '@/data/catalog'
import { useInquiry } from '@/store/InquiryContext'
import { formatDate } from '@/lib/date'
import { fadeUp, stagger } from '@/lib/motion'
import { cn } from '@/lib/cn'

// ── Block renderers ──────────────────────────────────────────────────────────
// The article body is an array of typed blocks (see src/data/blog.js). Each type
// maps to one renderer here, so content stays structured data and no article
// markup is ever injected as raw HTML.
const calloutTones = {
  tip: { icon: Lightbulb, ring: 'ring-saffron-200', bg: 'bg-saffron-50', iconColor: 'text-saffron-600' },
  warning: { icon: TriangleAlert, ring: 'ring-line', bg: 'bg-glacier-50', iconColor: 'text-pine-700' },
  note: { icon: Info, ring: 'ring-line', bg: 'bg-glacier-50', iconColor: 'text-pine-700' },
}

function Callout({ tone = 'note', title, text }) {
  const t = calloutTones[tone] ?? calloutTones.note
  const Icon = t.icon
  return (
    <aside className={cn('my-8 flex gap-4 rounded-3xl p-6 ring-1', t.bg, t.ring)}>
      <span className={cn('mt-0.5 shrink-0', t.iconColor)}><Icon className="h-5 w-5" aria-hidden="true" /></span>
      <div>
        <p className="font-display text-base font-semibold text-pine-900">{title}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-pine-800">{text}</p>
      </div>
    </aside>
  )
}

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 id={block.id} className="mt-12 scroll-mt-28 font-display text-2xl font-semibold tracking-tight text-pine-900">{block.text}</h2>
    case 'p':
      return <p className="mt-5 text-lg leading-relaxed text-muted">{block.text}</p>
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <Tag className={cn('mt-5 space-y-2.5 pl-5 text-lg leading-relaxed text-muted', block.ordered ? 'list-decimal' : 'list-disc')}>
          {block.items.map((item) => <li key={item} className="pl-1.5 marker:text-saffron-500">{item}</li>)}
        </Tag>
      )
    }
    case 'callout':
      return <Callout tone={block.tone} title={block.title} text={block.text} />
    case 'quote':
      return (
        <figure className="my-10 border-l-2 border-saffron-500 pl-6">
          <QuoteIcon className="h-6 w-6 text-saffron-500" aria-hidden="true" />
          <blockquote className="mt-3 font-display text-xl italic leading-relaxed text-pine-900">{block.text}</blockquote>
          {block.cite && <figcaption className="mt-3 text-sm font-medium text-muted">— {block.cite}</figcaption>}
        </figure>
      )
    case 'image':
      return (
        <figure className="my-10">
          <Media src={block.src} alt={block.alt} className="w-full rounded-3xl" />
          {block.caption && <figcaption className="mt-3 text-center text-sm text-muted">{block.caption}</figcaption>}
        </figure>
      )
    default:
      return null
  }
}

// ── Related links (resolved at render time; unknown slugs render nothing) ─────
function RelatedLinks({ post }) {
  const groups = [
    { kind: 'Destination', icon: MapPin, items: post.destinations.map(getDestination).filter(Boolean).map((d) => ({ to: `/destinations/${d.slug}`, label: d.name })) },
    { kind: 'Adventure', icon: Mountain, items: post.adventures.map(getActivity).filter(Boolean).map((a) => ({ to: `/adventures/${a.slug}`, label: a.name })) },
    { kind: 'Package', icon: Package, items: post.packages.map(getPackage).filter(Boolean).map((p) => ({ to: `/packages/${p.category}/${p.slug}`, label: p.title })) },
  ].filter((g) => g.items.length)

  if (!groups.length) return null

  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-3">
      {groups.map(({ kind, icon: Icon, items }) => (
        <div key={kind} className="rounded-3xl border border-line bg-surface p-6 shadow-soft">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
            <Icon className="h-3.5 w-3.5 text-saffron-600" aria-hidden="true" /> {kind}s
          </p>
          <ul className="mt-3 space-y-2">
            {items.map((i) => (
              <li key={i.to}>
                <Link to={i.to} className="group inline-flex items-center gap-1.5 text-sm font-medium text-pine-900 transition-colors hover:text-pine-700">
                  {i.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

// ── The template ─────────────────────────────────────────────────────────────
// ArticleLayout — the single reusable template every article renders through.
// It composes the hero, breadcrumbs, byline, ToC, body blocks, gallery, related
// destinations/adventures/packages, author card, FAQs, related articles,
// newsletter and the shared ContactCTA. Booking reuses the global inquiry modal.
export default function ArticleLayout({ post }) {
  const author = getAuthor(post.author)
  const category = getBlogCategory(post.category)
  const toc = tableOfContents(post)
  const mins = readingTime(post)
  const { openInquiry } = useInquiry()
  const book = () => openInquiry({ title: `${post.title} — trip enquiry` })

  return (
    <>
      <ReadingProgress />

      {/* Hero */}
      <header className="relative isolate overflow-hidden bg-gradient-pine text-white">
        <Media src={post.cover} alt="" eager className="absolute inset-0 -z-10 h-full w-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-pine-950 via-pine-950/85 to-pine-900/75" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 text-saffron-400/20">
          <ContourDivider className="h-40" opacity={0.7} />
        </div>
        <Container className="relative py-20 lg:py-24">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mb-6">
            <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Blogs', to: '/blogs' }, { label: post.title }]} />
          </motion.div>
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
            <motion.div variants={fadeUp}>
              <Eyebrow className="text-saffron-300">{category?.label}</Eyebrow>
            </motion.div>
            <motion.h1 variants={fadeUp} className="mt-4 text-display-md font-semibold text-white">{post.title}</motion.h1>
            <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg leading-relaxed text-pine-100">{post.subtitle}</motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-pine-100">
              <span className="flex items-center gap-2.5">
                <Media src={author.avatar} alt="" className="h-9 w-9 shrink-0 rounded-full" />
                <span className="font-semibold text-white">{author.name}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-saffron-300" aria-hidden="true" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-saffron-300" aria-hidden="true" /> {mins} min read
              </span>
            </motion.div>
          </motion.div>
        </Container>
      </header>

      {/* Body + sticky ToC */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <article className="min-w-0">
            <p className="border-l-2 border-saffron-500 pl-5 font-display text-xl leading-relaxed text-pine-900">{post.excerpt}</p>
            {post.body.map((block, i) => <Block key={`${block.type}-${block.id ?? i}`} block={block} />)}

            {post.gallery.length > 0 && (
              <>
                <h2 className="mt-12 font-display text-2xl font-semibold tracking-tight text-pine-900">From the trip</h2>
                <ArticleGallery images={post.gallery} className="mt-6" />
              </>
            )}

            <RelatedLinks post={post} />

            <div className="mt-12 flex flex-wrap gap-3 rounded-4xl border border-line bg-surface p-7 shadow-soft">
              <div className="w-full">
                <p className="font-display text-lg font-semibold text-pine-900">Ready to see it for yourself?</p>
                <p className="mt-1 text-sm text-muted">We plan every trip around what you actually want to do.</p>
              </div>
              <Button variant="primary" size="md" onClick={book}>Book this trip <ArrowRight className="h-4 w-4" /></Button>
              <Button to="/contact" variant="outline" size="md"><MessageCircle className="h-4 w-4" /> Ask a question</Button>
            </div>

            <ArticleAuthor author={author} variant="card" className="mt-8" />
          </article>

          {/* Sticky rail */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents items={toc} />
            </div>
          </div>
        </div>
      </Section>

      {/* Article FAQs */}
      {post.faqs?.length > 0 && (
        <Section tone="surface">
          <div className="mx-auto max-w-3xl">
            <SectionHeading align="center" eyebrow="Good to know" title="Questions about this" />
            <div className="mt-10"><FAQAccordion items={post.faqs} /></div>
          </div>
        </Section>
      )}

      {/* Newsletter */}
      <Section tone="pine">
        <NewsletterSignup tone="dark" />
      </Section>

      {/* Related articles */}
      <Section>
        <SectionHeading eyebrow="Keep reading" title="Related articles" lead="More from the same corner of the mountains." />
        <RelatedPosts post={post} className="mt-10" />
      </Section>

      <ContactCTA />
    </>
  )
}
