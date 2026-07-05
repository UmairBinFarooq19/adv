import SectionShell from './SectionShell'

// TODO: swap for an activity grid (skiing, gondola, trekking, shikara,
// snowshoeing…) — smaller square tiles with an icon + label work well here.
export default function PopularActivities() {
  return (
    <SectionShell
      eyebrow="Things to do"
      title="Popular adventure activities"
      lead="From powder descents to lakeside mornings — the experiences guests remember most."
      columns={4}
      items={4}
      aspect="aspect-square"
    />
  )
}
