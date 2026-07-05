import SectionShell from './SectionShell'

// TODO: tall editorial destination cards (Gulmarg, Sonamarg, Pahalgam, Srinagar)
// with an image, name overlay and short line. Reuse <Card ratio="aspect-[3/4]">.
export default function TopDestinations() {
  return (
    <SectionShell
      tone="surface"
      eyebrow="Where we go"
      title="Top destinations"
      lead="Four valleys, four moods — pick a base and we'll build the days around it."
      columns={4}
      items={4}
      aspect="aspect-[3/4]"
    />
  )
}
