import { useParams } from 'react-router-dom'
import AdventureDetails from '@/components/adventures/AdventureDetails'
import NotFound from '@/pages/NotFound'
import { getActivity } from '@/data/adventures'
import { useSeo, breadcrumbLd } from '@/lib/seo'

// Route: /adventures/:slug. Validates the slug against the data and renders the
// shared AdventureDetails template, or the 404 page for an unknown activity.
export default function AdventureDetail() {
  const { slug } = useParams()
  const activity = getActivity(slug)

  useSeo({
    title: activity ? `${activity.name} · Adventures` : 'Adventure not found',
    description: activity?.overview,
    image: activity?.image,
    type: 'article',
    jsonLd: activity && {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Adventures', path: '/adventures' },
          { name: activity.name },
        ]),
      ],
    },
  })

  if (!activity) return <NotFound />
  return <AdventureDetails activity={activity} />
}
