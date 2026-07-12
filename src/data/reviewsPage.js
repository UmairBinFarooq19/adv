import { Star, MapPin, Camera, Users, Snowflake, Mountain, Heart, Utensils } from 'lucide-react'
import { asset } from '@/lib/asset'

// ─────────────────────────────────────────────────────────────────────────────
// Reviews page content.
//
// ⚠ ALL REVIEW CONTENT AND PLATFORM RATINGS BELOW ARE PLACEHOLDER SAMPLES.
//   Replace every entry with real, attributable reviews before publishing.
//   Publishing invented "verified" testimonials or invented Google/TripAdvisor
//   ratings is deceptive advertising (FTC Act §5 in the US; the Consumer
//   Protection Act 2019 and BIS IS 19000:2022 in India) and breaches Google's
//   and TripAdvisor's terms. `aggregateSchemaEnabled` below keeps the
//   AggregateRating structured data switched OFF until the numbers are real.
//
// Note: the lighter `reviews.js` powers the Home testimonial strip and is left
// untouched — this file is the standalone source of truth for the Reviews page.
//
// Every review carries a real package `slug`, resolved at render time against the
// catalog, so the "Package booked" link can never point at a trip that no longer
// exists. Overall rating and the star distribution are COMPUTED from the reviews
// array — never hand-typed — so they cannot drift.
// ─────────────────────────────────────────────────────────────────────────────

const img = (theme, n) => asset(`images/scenes/s-${theme}-${n}.svg`)

// Flip to true ONLY when `platforms` holds real, verifiable numbers. Emitting
// AggregateRating schema with invented figures risks a manual action from Google.
export const aggregateSchemaEnabled = false

// External review platforms. `url: null` renders the CTA in a disabled
// "link coming soon" state rather than sending visitors to a dead page — add the
// real profile URL and the button activates with no code change.
export const platforms = [
  {
    id: 'google',
    name: 'Google Reviews',
    icon: Star,
    rating: 4.9,          // PLACEHOLDER
    count: 214,           // PLACEHOLDER
    blurb: 'Guests rate our guiding, safety and the little touches that make a trip.',
    url: null,            // e.g. 'https://g.page/r/…'
  },
  {
    id: 'tripadvisor',
    name: 'TripAdvisor',
    icon: MapPin,
    rating: 4.8,          // PLACEHOLDER
    count: 168,           // PLACEHOLDER
    blurb: 'Ranked among the valley’s recommended adventure operators.',
    url: null,            // e.g. 'https://www.tripadvisor.com/…'
  },
]

// Review categories used by the filter bar.
export const categories = [
  { id: 'skiing', label: 'Skiing', icon: Snowflake },
  { id: 'trekking', label: 'Trekking', icon: Mountain },
  { id: 'family', label: 'Family', icon: Users },
  { id: 'honeymoon', label: 'Honeymoon', icon: Heart },
  { id: 'ladakh', label: 'Ladakh', icon: Mountain },
  { id: 'culture', label: 'Food & Culture', icon: Utensils },
  { id: 'photography', label: 'Photography', icon: Camera },
]

// PLACEHOLDER reviews. `slug` must match a real package slug in the catalog.
export const reviews = [
  { id: 'r01', name: 'Ananya Rao', country: 'India', slug: '7-days-kashmir', travelDate: '2026-01', rating: 5, verified: true, categories: ['family', 'culture'], title: 'The most seamless trip we have ever taken', quote: 'Our guide read the mountain like a book and the lodge was pure comfort. Everything was handled before we thought to ask — we simply enjoyed the valley.', photos: [img('dawn', 1), img('meadow', 1)] },
  { id: 'r02', name: 'James Whitfield', country: 'United Kingdom', slug: 'kashmir-luxury', travelDate: '2025-12', rating: 5, verified: true, categories: ['culture'], title: 'Understated luxury, done properly', quote: 'The houseboat was extraordinary and the wazwan they arranged is something I still talk about. Not a single detail out of place.', photos: [] },
  { id: 'r03', name: 'Mei Lin', country: 'Singapore', slug: 'ski-advanced', travelDate: '2026-01', rating: 5, verified: true, categories: ['skiing'], title: 'Safe on serious terrain', quote: 'I felt genuinely safe the entire time on some committing lines. The avalanche briefing was thorough and never patronising. Professional and warm.', photos: [img('snow', 1), img('snow', 2), img('glacier', 1)] },
  { id: 'r04', name: 'Rohan & Priya', country: 'India', slug: 'great-lakes-trek', travelDate: '2025-08', rating: 5, verified: true, categories: ['trekking'], title: 'Seven days of alpine lakes', quote: 'The crew carried the load and the memories are ours forever. Camps were pitched before we arrived each evening, and the food was absurdly good for 3,800 m.', photos: [img('glacier', 2)] },
  { id: 'r05', name: 'Daniel Meyer', country: 'Germany', slug: 'leh-explorer', travelDate: '2025-07', rating: 5, verified: true, categories: ['ladakh'], title: 'Acclimatisation handled properly', quote: 'They refused to rush us to Pangong, and they were right. Two easy days in Leh and the rest of the trip was flawless. Pangong at dawn was worth every kilometre.', photos: [img('desert', 1), img('glacier', 3)] },
  { id: 'r06', name: 'Sofia Alvarez', country: 'Spain', slug: 'ski-beginner', travelDate: '2026-02', rating: 5, verified: true, categories: ['skiing'], title: 'Patient instructors, real progress', quote: 'I had never clicked into skis. By day four I was linking turns down the nursery slopes and grinning like a child. Fireside evenings were the perfect end.', photos: [] },
  { id: 'r07', name: 'Thomas Nguyen', country: 'Australia', slug: 'pangong-lake', travelDate: '2025-09', rating: 4, verified: true, categories: ['ladakh', 'photography'], title: 'Unforgettable, if you respect the altitude', quote: 'The lakeside camp was freezing and utterly worth it for the stars. Only note: the drive is long — take their advice and give it two days, not one.', photos: [img('glacier', 3)] },
  { id: 'r08', name: 'Aisha Rahman', country: 'United Arab Emirates', slug: 'kashmir-honeymoon', travelDate: '2025-10', rating: 5, verified: true, categories: ['honeymoon'], title: 'Quietly romantic, never staged', quote: 'The shikara at dawn, the chinars turning gold, a private dinner on the deck. They understood exactly the trip we wanted without us explaining it twice.', photos: [img('dawn', 2)] },
  { id: 'r09', name: 'Marco Rossi', country: 'Italy', slug: 'tarsar-marsar', travelDate: '2025-08', rating: 4, verified: true, categories: ['trekking', 'photography'], title: 'Wild, remote and well run', quote: 'Fewer people than the Great Lakes and the light in the evenings was extraordinary. One tough day over the pass; the guide paced it perfectly.', photos: [img('meadow', 3), img('dusk', 1)] },
  { id: 'r10', name: 'Grace Okoro', country: 'Nigeria', slug: '5-days-kashmir', travelDate: '2025-04', rating: 5, verified: true, categories: ['family', 'culture'], title: 'The tulips, and everything after', quote: 'We came for the tulip garden and stayed for the craft workshops. Our children were welcomed everywhere. Genuinely warm, well-organised travel.', photos: [img('meadow', 2)] },
  { id: 'r11', name: 'Kenji Watanabe', country: 'Japan', slug: 'ski-intermediate', travelDate: '2026-01', rating: 5, verified: true, categories: ['skiing', 'photography'], title: 'The snow lives up to it', quote: 'Dry, deep and empty. The guide knew exactly which aspect the wind had loaded and steered us to the good stuff every morning.', photos: [img('snow', 3), img('snow', 4)] },
  { id: 'r12', name: 'Elena Petrova', country: 'Poland', slug: 'nubra-valley', travelDate: '2025-06', rating: 4, verified: true, categories: ['ladakh'], title: 'Dunes, camels and a giant Buddha', quote: 'Khardung La is a serious road and they drove it calmly. Hunder at sunset is unreal. Would have liked one more night in the valley.', photos: [] },
  { id: 'r13', name: 'Liam O’Connor', country: 'Ireland', slug: 'kolahoi-glacier', travelDate: '2025-09', rating: 5, verified: true, categories: ['trekking'], title: 'A proper mountain day', quote: 'Steep, long and beautiful. Their kit was in good condition and the guide turned us around at the right moment when the weather closed in. That is what you pay for.', photos: [img('glacier', 4)] },
  { id: 'r14', name: 'Fatima Zahra', country: 'Morocco', slug: 'kashmir-family', travelDate: '2025-05', rating: 5, verified: true, categories: ['family'], title: 'Three generations, one happy trip', quote: 'They planned around my mother’s pace without ever making her feel like a burden. The gondola, the gardens, and a houseboat night the kids still describe to strangers.', photos: [img('dawn', 4)] },
]

// Video testimonials — placeholder posters. `href: null` renders a non-playable
// "coming soon" card rather than a play button wired to a dead player. Add a real
// URL and the same card becomes a working player.
export const videoTestimonials = [
  { id: 'vt1', title: 'A first ski week in Gulmarg', kind: 'Guest stories', duration: '2:10', poster: img('snow', 1), location: 'Gulmarg', href: null },
  { id: 'vt2', title: 'Walking the Great Lakes', kind: 'Guest stories', duration: '3:24', poster: img('glacier', 2), location: 'Sonamarg', href: null },
  { id: 'vt3', title: 'Ten days across Ladakh', kind: 'Guest stories', duration: '4:02', poster: img('desert', 1), location: 'Leh · Nubra · Pangong', href: null },
]

export const videoKinds = ['Guest stories']

// ── Derived helpers (computed, never hand-typed) ─────────────────────────────
export const totalReviews = reviews.length

export const overallRating =
  Math.round((reviews.reduce((n, r) => n + r.rating, 0) / (reviews.length || 1)) * 10) / 10

// [{ stars: 5, count, pct }, … 1] — the distribution bars.
export const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => {
  const count = reviews.filter((r) => r.rating === stars).length
  return { stars, count, pct: totalReviews ? Math.round((count / totalReviews) * 100) : 0 }
})

export const verifiedCount = reviews.filter((r) => r.verified).length
export const photoReviews = reviews.filter((r) => r.photos.length > 0)
export const countries = [...new Set(reviews.map((r) => r.country))].sort()
export const activeCategories = categories.filter((c) => reviews.some((r) => r.categories.includes(c.id)))
export const categoryCounts = () =>
  activeCategories.reduce((acc, c) => ({ ...acc, [c.id]: reviews.filter((r) => r.categories.includes(c.id)).length }), { all: totalReviews })
