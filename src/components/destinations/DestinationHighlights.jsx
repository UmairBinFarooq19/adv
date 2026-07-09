import FeatureCards from '@/components/about/FeatureCards'

// DestinationHighlights — the "what makes this place special" trio. It composes
// the existing, reusable FeatureCards (icon + title + description) rather than
// duplicating card markup, so highlights inherit the site's card language and
// scroll-reveal motion for free. Data-driven from a destination's `highlights`.
export default function DestinationHighlights({ highlights = [], tone = 'light', className }) {
  if (!highlights.length) return null
  return <FeatureCards items={highlights} tone={tone} columns={3} className={className} />
}
