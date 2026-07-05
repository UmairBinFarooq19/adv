import PageHeader from '@/components/layout/PageHeader'
import { Section, SectionHeading } from '@/components/ui'

// Secondary page shell. The PageHeader is branded and consistent; the body is
// a scaffold ready for real content (grids, forms, articles — see the home
// sections for finished patterns).
export default function Packages() {
  return (
    <>
      <PageHeader eyebrow="Packages" title="Curated journeys" lead="Every trip privately guided and fully arranged — browse by season, region or pace." />
      <Section>
        <SectionHeading
          eyebrow="Coming together"
          title="This page is scaffolded"
          lead="Drop the real Packages content here using the shared UI components (Card, Section, Button)."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] rounded-3xl border border-dashed border-line bg-white/60" />
          ))}
        </div>
      </Section>
    </>
  )
}
