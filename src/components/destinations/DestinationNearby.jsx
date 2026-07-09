import DestinationCard from './DestinationCard'
import { getDestination } from '@/data/destinationGuides'
import { cn } from '@/lib/cn'

// DestinationNearby — "related destinations". Resolves a destination's
// `nearbySlugs` against the data at render time and reuses DestinationCard, so
// related places look and behave exactly like every other card. Unknown slugs are
// filtered out, which means cross-links can never 404.
export default function DestinationNearby({ slugs = [], className }) {
  const nearby = slugs.map(getDestination).filter(Boolean)
  if (!nearby.length) return null
  return (
    <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8', className)}>
      {nearby.map((d) => <DestinationCard key={d.slug} destination={d} />)}
    </div>
  )
}
