import SectionShell from './SectionShell'

// TODO: a square photo grid pulling from an Instagram feed (or static assets).
export default function InstagramGallery() {
  return (
    <SectionShell
      eyebrow="@adventureskashmir"
      title="From the mountains, lately"
      lead="A window into recent trips — tag us to be featured."
      columns={4}
      items={4}
      aspect="aspect-square"
    />
  )
}
