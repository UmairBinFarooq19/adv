// Featured package content. In production this comes from a CMS/API; the
// consuming component (sections/home/FeaturedPackages) stays unchanged.
import { asset } from '@/lib/asset'

export const featuredPackages = [
  {
    id: 'gulmarg-ski-expedition',
    region: 'Gulmarg, Kashmir',
    title: '7-Day Ski Expedition',
    summary: 'Powder mornings on the Apharwat bowls, evenings by the fire in a heritage lodge.',
    duration: '7 days',
    price: '89,000',
    rating: 4.9,
    reviews: 128,
    badge: 'Bestseller',
    image: asset('images/pkg-gulmarg.svg'),
  },
  {
    id: 'sonamarg-snow-trek',
    region: 'Sonamarg, Kashmir',
    title: 'Alpine Snow Trek',
    summary: 'Guided high-altitude trekking through the Meadow of Gold and Thajiwas glacier.',
    duration: '5 days',
    price: '62,000',
    rating: 4.8,
    reviews: 74,
    badge: null,
    image: asset('images/pkg-sonamarg.svg'),
  },
  {
    id: 'pahalgam-luxury-escape',
    region: 'Pahalgam, Kashmir',
    title: 'Valley Luxury Escape',
    summary: 'Slow days along the Lidder, private riverside dining and curated spa evenings.',
    duration: '4 days',
    price: '74,000',
    rating: 5.0,
    reviews: 96,
    badge: 'New',
    image: asset('images/pkg-pahalgam.svg'),
  },
]
