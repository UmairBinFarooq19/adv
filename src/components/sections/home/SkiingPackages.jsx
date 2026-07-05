import SectionShell from './SectionShell'

// TODO: replace SectionShell with a group-package layout (departure dates,
// group size, difficulty). Reuse <Card> like FeaturedPackages does.
export default function SkiingPackages() {
  return (
    <SectionShell
      tone="glacier"
      eyebrow="Group departures"
      title="Skiing & snowboarding group packages"
      lead="Fixed-date small-group trips to Gulmarg's slopes — instruction, gear and lift passes included."
      columns={3}
    />
  )
}
