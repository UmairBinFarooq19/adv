import SectionShell from './SectionShell'

// TODO: blog preview cards (cover, category, title, date, read time).
// Reuse <Card> exactly as FeaturedPackages does.
export default function TravelBlogs() {
  return (
    <SectionShell
      tone="surface"
      eyebrow="Journal"
      title="Travel notes & guides"
      lead="Seasonal advice, packing lists and stories from the valley."
      columns={3}
    />
  )
}
