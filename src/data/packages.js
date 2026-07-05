// Sample content used to demonstrate the data → component pattern.
// Real projects would fetch this from a CMS/API; the component code that
// consumes it (see sections/home/FeaturedPackages) won't need to change —
// only the source of this array.

export const featuredPackages = [
  {
    id: 'gulmarg-ski-expedition',
    region: 'Gulmarg',
    title: '7-Day Ski Expedition',
    summary: 'Powder mornings on the Apharwat bowls, evenings by the fire in a heritage lodge.',
    duration: '7 days',
    price: 'from ₹89,000',
    badge: 'Bestseller',
    image: null, // drop /src/assets/images/... or a public/ path here
  },
  {
    id: 'sonamarg-snow-trek',
    region: 'Sonamarg',
    title: 'Alpine Snow Trek',
    summary: 'Guided high-altitude trekking through the Meadow of Gold and Thajiwas glacier.',
    duration: '5 days',
    price: 'from ₹62,000',
    badge: null,
    image: null,
  },
  {
    id: 'pahalgam-luxury-escape',
    region: 'Pahalgam',
    title: 'Valley Luxury Escape',
    summary: 'Slow days along the Lidder, private riverside dining and curated spa evenings.',
    duration: '4 days',
    price: 'from ₹74,000',
    badge: 'New',
    image: null,
  },
]
