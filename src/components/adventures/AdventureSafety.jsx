import { Section, SectionHeading } from '@/components/ui'
import FeatureCards from '@/components/about/FeatureCards'
import { safety as defaultSafety } from '@/data/adventures'

// AdventureSafety — the safety-standards band for the Adventures section. Rather
// than reinventing card markup, it composes the existing (reusable) FeatureCards
// with adventure-specific data, wrapped in the shared Section + SectionHeading.
// `items` and `tone` are overridable, so it drops into any page.
export default function AdventureSafety({ items = defaultSafety, tone = 'surface' }) {
  return (
    <Section tone={tone}>
      <SectionHeading
        align="center"
        eyebrow="Adventure safety"
        title="Thrills, handled responsibly"
        lead="The excitement is the whole point — the risk is carefully managed. Here's how we keep every single outing safe."
      />
      <div className="mt-12">
        <FeatureCards items={items} tone="light" columns={3} />
      </div>
    </Section>
  )
}
