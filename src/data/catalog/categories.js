import { Mountain, Snowflake, Footprints, Bike, SlidersHorizontal } from 'lucide-react'
import { scene } from './_shared'

// Package categories — power the landing category cards and each collection
// page header. `to` overrides the default /packages/:slug for special routes.
export const categories = [
  {
    slug: 'kashmir',
    icon: Mountain,
    title: 'Kashmir Tour Packages',
    short: 'Kashmir Tours',
    blurb: 'Lakes, gardens and alpine meadows — the classic valley, privately guided.',
    image: scene('glacier', 1),
  },
  {
    slug: 'skiing',
    icon: Snowflake,
    title: 'Skiing & Snowboarding',
    short: 'Skiing',
    blurb: 'Certified instruction and backcountry powder on some of Asia’s finest snow.',
    image: scene('snow', 3),
  },
  {
    slug: 'trekking',
    icon: Footprints,
    title: 'Trekking Expeditions',
    short: 'Trekking',
    blurb: 'Glacial lakes, high passes and meadow camps on the Himalaya’s great trails.',
    image: scene('forest', 1),
  },
  {
    slug: 'leh-ladakh',
    icon: Bike,
    title: 'Leh–Ladakh Adventures',
    short: 'Leh–Ladakh',
    blurb: 'High-desert passes, cobalt lakes and monasteries — by SUV or motorcycle.',
    image: scene('desert', 1),
  },
  {
    slug: 'custom',
    icon: SlidersHorizontal,
    title: 'Custom Packages',
    short: 'Build your own',
    blurb: 'Tell us your dates, pace and dreams — we’ll craft a private itinerary.',
    image: scene('dawn', 3),
    to: '/packages/custom',
  },
]

export const getCategory = (slug) => categories.find((c) => c.slug === slug)
