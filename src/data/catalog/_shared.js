import { asset } from '@/lib/asset'

// ─────────────────────────────────────────────────────────────────────────────
// Catalog schema helpers.
//
// Every package is a plain object. `pkg()` fills in the fields most packages
// share (inclusions, cancellation policy, common FAQs, meals/transport) so each
// entry only declares what makes it distinct. To add a package you copy an entry
// and change its data — no component ever needs editing.
// ─────────────────────────────────────────────────────────────────────────────

// Map a theme + variant to a generated scene image (see scripts/gen_scenes.py).
export const scene = (theme, n = 1) => asset(`images/scenes/s-${theme}-${n}.svg`)

// A small gallery drawn from a theme's variants — enough to feel real.
export const galleryFrom = (theme, extra = []) => [
  scene(theme, 1), scene(theme, 2), scene(theme, 3), scene(theme, 4), ...extra,
]

export const commonIncluded = [
  'Airport / railway transfers',
  'Private air-conditioned vehicle with driver',
  'English-speaking local guide',
  'All applicable taxes & permits',
  '24/7 on-trip support',
]

export const commonNotIncluded = [
  'Airfare to/from Srinagar',
  'Travel insurance',
  'Personal expenses & tips',
  'Anything not listed under inclusions',
]

export const commonFaqs = [
  { q: 'How do I confirm my booking?', a: 'A 25% deposit confirms your dates; the balance is due 15 days before arrival. You can pay by card or bank transfer.' },
  { q: 'Is this trip suitable for children?', a: 'Yes — most itineraries are family-friendly and can be paced down. Tell us your group and we will tailor it.' },
  { q: 'What happens if the weather changes?', a: 'Our guides adjust the day-to-day plan for safety and keep the experience intact. Mountain weather is part of the adventure.' },
  { q: 'Can this package be customised?', a: 'Every package is a starting point. Add nights, upgrade stays or combine regions — just ask.' },
]

export const cancellation =
  'Free changes up to 15 days before arrival. Cancellations 15–7 days before arrival forfeit the deposit; within 7 days, 50% of the total is charged. No-shows are non-refundable. Weather-related changes are always rebooked at no cost.'

// Fills defaults, then lets the entry override anything.
export function pkg(data) {
  // A concise hotel band for the comparison table, derived from style tags
  // (the descriptive `accommodation` string stays as-is). Override by passing
  // `hotelCategory` explicitly.
  const hotelCategory = data.tags?.includes('luxury')
    ? 'Luxury (4–5★)'
    : data.tags?.includes('budget')
      ? 'Comfort (2–3★)'
      : 'Premium (3–4★)'
  return {
    rating: 4.8,
    reviews: 40,
    hotelCategory,
    accommodation: 'Handpicked 3–4★ hotels, resorts & Dal Lake houseboats',
    meals: 'Daily breakfast and dinner (half-board)',
    transportation: 'Private vehicle with a professional local driver',
    included: commonIncluded,
    notIncluded: commonNotIncluded,
    faqs: commonFaqs,
    cancellation,
    ...data,
    gallery: data.gallery ?? galleryFrom(data.theme ?? 'glacier'),
  }
}
