import { useMemo, useState, lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { Section, SectionHeading } from '@/components/ui'
import PackageHero from '@/components/packages/PackageHero'
import PackageFilter from '@/components/packages/PackageFilter'
import PackageGrid from '@/components/packages/PackageGrid'
import ContactCTA from '@/components/sections/home/ContactCTA'
import { getCategory, getByCategory, applyFilters } from '@/data/catalog'
import { useSeo } from '@/lib/seo'
import { Award, Mountain, Snowflake, Thermometer, Wrench, Gauge } from 'lucide-react'

const NotFound = lazy(() => import('@/pages/NotFound'))

// Per-category intro copy. Adding a category = add its data file + a line here.
const intros = {
  kashmir: 'Lakes, Mughal gardens and alpine meadows — the classic valley in every season, always privately guided.',
  skiing: 'Certified instruction, avalanche-trained guides and premium gear on some of Asia’s finest powder.',
  trekking: 'Glacial lakes, high passes and meadow camps on the Himalaya’s most beautiful trails.',
  'leh-ladakh': 'High-desert passes, cobalt lakes and ancient monasteries — by comfortable SUV or on two wheels.',
}

// ── Category-specific extra content (rendered below the grid) ────────────────
function SkiingExtras({ packages }) {
  const levels = [
    { icon: Snowflake, name: 'Beginner', desc: 'Never skied? Start on gentle nursery slopes with patient coaches and all gear provided.' },
    { icon: Gauge, name: 'Intermediate', desc: 'Comfortable on blues — progress to longer descents and your first off-piste lines.' },
    { icon: Mountain, name: 'Advanced', desc: 'Confident all-mountain — guided backcountry bowls with avalanche-trained leaders.' },
  ]
  const gear = ['Skis or snowboard', 'Boots & bindings', 'Helmet & poles', 'Avalanche transceiver, probe & shovel (backcountry)']
  const instructors = [...new Map(
    packages.filter((p) => p.instructor?.name && !/assigned|rotating/i.test(p.instructor.name))
      .map((p) => [p.instructor.name, p.instructor]),
  ).values()]

  return (
    <Section tone="surface">
      <SectionHeading align="center" eyebrow="Know before you go" title="Skill levels, gear & instructors" lead="Every program is matched to your level, with certified instruction and premium equipment included." />
      <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
        {levels.map(({ icon: Icon, name, desc }) => (
          <div key={name} className="rounded-3xl border border-line bg-background p-7 shadow-soft">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-glacier-50 text-pine-700"><Icon className="h-5 w-5" /></span>
            <h3 className="mt-4 font-display text-lg font-semibold text-pine-900">{name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="rounded-3xl border border-line bg-background p-7 shadow-soft">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-pine-900"><Wrench className="h-5 w-5 text-saffron-600" /> Equipment included</h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {gear.map((g) => <li key={g} className="text-sm text-pine-800">• {g}</li>)}
          </ul>
        </div>
        <div className="rounded-3xl border border-line bg-background p-7 shadow-soft">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-pine-900"><Award className="h-5 w-5 text-saffron-600" /> Your instructors</h3>
          <ul className="mt-4 space-y-3">
            {instructors.map((ins) => (
              <li key={ins.name} className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-pine-700 to-glacier-600 text-xs font-semibold text-white">
                  {ins.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </span>
                <span>
                  <span className="block font-semibold text-pine-900">{ins.name}</span>
                  <span className="block text-xs text-muted">{ins.creds} — {ins.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

function TrekkingExtras({ packages }) {
  return (
    <Section tone="surface">
      <SectionHeading eyebrow="Grades & seasons" title="Choose the right trek" lead="Difficulty, maximum altitude and the best months for each trail, at a glance." />
      <div className="mt-10 overflow-hidden rounded-3xl border border-line shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="bg-pine-900 text-white">
            <tr>
              <th className="px-5 py-4 font-semibold">Trek</th>
              <th className="px-5 py-4 font-semibold">Difficulty</th>
              <th className="hidden px-5 py-4 font-semibold sm:table-cell">Max altitude</th>
              <th className="px-5 py-4 font-semibold">Best season</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-surface">
            {packages.map((p) => (
              <tr key={p.slug}>
                <td className="px-5 py-4 font-medium text-pine-900">{p.title}</td>
                <td className="px-5 py-4 text-muted">{p.difficulty}</td>
                <td className="hidden px-5 py-4 text-muted sm:table-cell">{p.altitude}</td>
                <td className="px-5 py-4 text-muted">{p.bestSeason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  )
}

function LadakhExtras() {
  const notes = [
    { icon: Thermometer, title: 'Acclimatise first', desc: 'Leh sits at 3,500 m. Every itinerary builds in a full rest day before higher passes — altitude is respected, never rushed.' },
    { icon: Mountain, title: 'Legendary passes', desc: 'Khardung La and Chang La are among the world’s highest motorable roads. We time crossings for the safest conditions.' },
    { icon: Award, title: 'Permits handled', desc: 'Inner Line Permits for Nubra, Pangong and Tso Moriri are all arranged for you before arrival.' },
  ]
  return (
    <Section tone="surface">
      <SectionHeading align="center" eyebrow="High-altitude travel" title="Ladakh, done responsibly" lead="Big altitude deserves care. Here’s how we keep the high desert safe and comfortable." />
      <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
        {notes.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-3xl border border-line bg-background p-7 shadow-soft">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-glacier-50 text-pine-700"><Icon className="h-5 w-5" /></span>
            <h3 className="mt-4 font-display text-lg font-semibold text-pine-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

const extrasByCategory = { skiing: SkiingExtras, trekking: TrekkingExtras, 'leh-ladakh': LadakhExtras }

export default function PackageCollection() {
  const { category: slug } = useParams()
  const category = getCategory(slug)
  const packages = useMemo(() => getByCategory(slug), [slug])

  const [selected, setSelected] = useState({})
  const [query, setQuery] = useState('')
  const results = useMemo(() => applyFilters(packages, selected, query), [packages, selected, query])

  const toggle = (groupId, value) =>
    setSelected((prev) => {
      const cur = new Set(prev[groupId] ?? [])
      cur.has(value) ? cur.delete(value) : cur.add(value)
      return { ...prev, [groupId]: [...cur] }
    })
  const reset = () => { setSelected({}); setQuery('') }

  const valid = category && category.slug !== 'custom'
  useSeo(
    valid
      ? {
          title: category.title,
          description: intros[slug],
          image: category.image,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home' },
              { '@type': 'ListItem', position: 2, name: 'Packages' },
              { '@type': 'ListItem', position: 3, name: category.title },
            ],
          },
        }
      : { title: 'Not found' },
  )

  if (!valid) {
    return <Suspense fallback={null}><NotFound /></Suspense>
  }

  const Extras = extrasByCategory[slug]
  const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Packages', to: '/packages' }, { label: category.short }]

  return (
    <>
      <PackageHero image={category.image} eyebrow="Packages" title={category.title} intro={intros[slug]} breadcrumbs={breadcrumbs} />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <PackageFilter selected={selected} query={query} onToggle={toggle} onQuery={setQuery} onReset={reset} resultCount={results.length} />
          </div>
          <PackageGrid packages={results} onReset={reset} columns={2} />
        </div>
      </Section>

      {Extras && <Extras packages={packages} />}

      <ContactCTA />
    </>
  )
}
