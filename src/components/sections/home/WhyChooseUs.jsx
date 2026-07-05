import SectionShell from './SectionShell'

// TODO: a feature row of value props (local guides, safety, luxury lodging,
// tailored itineraries) — icon + heading + one line each, no images needed.
export default function WhyChooseUs() {
  return (
    <SectionShell
      tone="pine"
      eyebrow="Why AdventuresKashmir"
      title="Guided by people who live here"
      lead="Local expertise, uncompromising safety and a standard of comfort you'd expect from the finest lodges."
      columns={3}
      aspect="aspect-video"
    />
  )
}
