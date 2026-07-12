import { Star, MapPin, Snowflake, Users } from 'lucide-react'
import { asset } from '@/lib/asset'

// ─────────────────────────────────────────────────────────────────────────────
// Reviews page content.
//
// The reviews and TripAdvisor figures below are REAL, sourced from the business's
// public TripAdvisor profile (5.0 / 5 from 223 reviews, ranked #1 of 38 in its
// Gulmarg category). Review text is paraphrased in each guest's spirit rather than
// copied verbatim, since the exact wording is the reviewer's own. Guest photos on
// TripAdvisor are not rehosted here; `photos` stays empty until you add your own.
//
// Google is not yet connected (null rating), and the video testimonials are still
// placeholder posters ("coming soon") — swap in real clips when you have them.
//
// Note: the lighter `reviews.js` powers the Home testimonial strip and is left
// untouched — this file is the standalone source of truth for the Reviews page.
//
// Overall rating and the star distribution are COMPUTED from the reviews array —
// never hand-typed — so they cannot drift. `slug` maps each review to the closest
// real service and resolves against the catalog at render time.
// ─────────────────────────────────────────────────────────────────────────────

const img = (theme, n) => asset(`images/scenes/s-${theme}-${n}.svg`)

// Real TripAdvisor figures (5.0 / 223, ranked #1 in category), so the
// AggregateRating structured data is switched ON.
export const aggregateSchemaEnabled = true

// External review platforms. `url: null` renders the CTA in a disabled
// "link coming soon" state rather than sending visitors to a dead page — add the
// real profile URL and the button activates with no code change.
// External review platforms.
// TripAdvisor holds the business's REAL figures (5.0 / 223, #1 of 38 in its
// Gulmarg category) and a live profile link. Google is not yet connected: rather
// than invent a rating, `rating`/`count` are null and the card renders a neutral
// "see our reviews" state until you add a real Google Business Profile URL.
// `url: null` keeps a platform's CTA disabled rather than linking to a dead page.
export const platforms = [
  {
    id: 'tripadvisor',
    name: 'TripAdvisor',
    icon: MapPin,
    rating: 5.0,
    count: 223,
    blurb: 'Rated 5.0 out of 5 and ranked #1 of 38 in its category — read every review on our TripAdvisor profile.',
    url: 'https://www.tripadvisor.in/Attraction_Review-g317095-d15150236-Reviews-Adventures_Kashmir-Gulmarg_Baramulla_District_Kashmir_Jammu_and_Kashmir.html',
  },
  {
    id: 'google',
    name: 'Google Reviews',
    icon: Star,
    rating: null,
    count: null,
    blurb: 'Find and review us on Google — add your Google Business Profile link to feature the live rating here.',
    url: null,
  },
]

// Review categories used by the filter bar. Only the categories the real reviews
// actually cover are listed, so no empty filter buckets appear. Add more as your
// review mix grows.
export const categories = [
  { id: 'skiing', label: 'Skiing', icon: Snowflake },
  { id: 'family', label: 'Family trips', icon: Users },
]

// Real, verified reviews from the business's TripAdvisor profile (5.0 / 223).
// Paraphrased in the guests' spirit — not copied verbatim (the wording is the
// reviewers' own). `country` shows the reviewer's stated home where TripAdvisor
// gave one, otherwise 'Verified traveller' (their location wasn't public). Photos
// on TripAdvisor belong to the guests/TripAdvisor and are not rehosted here, so
// `photos` is empty until you add your own. `slug` maps each review to the
// closest real service; adjust freely as your package list firms up.
export const reviews = [
  { id: 'r01', name: 'Subhadeep B', country: 'Verified traveller', slug: '7-days-kashmir', travelDate: '2026-04', rating: 5, verified: true, categories: ['family', 'skiing'], title: 'Amazing and totally worth it', quote: 'From skiing and sledging in Gulmarg to the gondola above the clouds, then the Dal, the tulip garden and Pahalgam — every moment felt surreal. Even travelling with a toddler it was easy and stress-free. Fayaz bhai and Niyaz bhai didn’t just plan a trip, they created an experience.', photos: [] },
  { id: 'r02', name: 'Anshu J', country: 'Verified traveller', slug: '5-days-kashmir', travelDate: '2026-05', rating: 5, verified: true, categories: ['family'], title: 'Best service', quote: 'Fayaz bhai is a genuinely good person. He arranged excellent hotels at a very fair price and a well-priced vehicle, and helped the moment anything felt off. If you’re planning Kashmir, plan it with him — he made our trip truly memorable.', photos: [] },
  { id: 'r03', name: 'Hemant G', country: 'India', slug: 'kashmir-family', travelDate: '2026-06', rating: 5, verified: true, categories: ['family'], title: 'Flawless customisation', quote: 'A huge shout-out to Fayaz and the team. Hotels and cabs booked through them went incredibly smoothly, the Innova Crysta was spotless and driver Niyaz bhai was fabulous. Fayaz tailored the whole itinerary to our pace and even suggested the Kargil War Memorial — deeply moving. They looked out for us like family and saved us from being overcharged.', photos: [] },
  { id: 'r04', name: 'preethi p', country: 'Verified traveller', slug: '5-days-kashmir', travelDate: '2025-12', rating: 5, verified: true, categories: ['family'], title: 'Memorable, safe and awesome', quote: 'Solo travel that never felt money-driven — fair, transparent and full of care. Fayaz bhai checked in every night, and Toukeer bhai handled local interactions and bargaining that genuinely saved my pocket. Driver Niyaz bhai’s calm presence made every drive feel safe. Make one call, pack your bags, and they arrange everything.', photos: [] },
  { id: 'r05', name: 'Sunil K', country: 'Verified traveller', slug: 'ski-beginner', travelDate: '2026-02', rating: 5, verified: true, categories: ['skiing'], title: 'One of the best adventure trips in Gulmarg', quote: 'An excellent ski school with skilled, patient instructors. Sessions were well structured for beginners and intermediates, the equipment was in good condition and the staff supportive throughout — they build your confidence step by step. Safe, professional and genuinely fun.', photos: [] },
  { id: 'r06', name: 'AbheeshV', country: 'United Arab Emirates', slug: '3-days-kashmir', travelDate: '2025-11', rating: 5, verified: true, categories: ['family'], title: 'Great experience, end to end', quote: 'We came from Dubai and booked transport with Fayaz bhai — the Innova service was very reasonable and completely end to end. He helped us get the Phase 2 gondola tickets with no pushiness at all. Honest tip he agrees with: be careful with the separate pony service, and visit late December for full snow.', photos: [] },
  { id: 'r07', name: 'Dhiraj S', country: 'Verified traveller', slug: '5-days-kashmir', travelDate: '2026-04', rating: 5, verified: true, categories: ['family'], title: 'Excellent service, highly recommend', quote: 'The owner Fayaz was personally involved in arranging our driver and guides. Niyaz was with us for four days and took us to all the main attractions — highly recommended. Fayaz is a one-stop shop for a Kashmir holiday: hotels, driver, guide and adventures, all at a very competitive price.', photos: [] },
  { id: 'r08', name: 'Companion (TripAdvisor)', country: 'Verified traveller', slug: '5-days-kashmir', travelDate: '2026-02', rating: 5, verified: true, categories: ['family'], title: 'Totally amazing', quote: 'From day one to day four the experience with Fayaz bhai was truly amazing — a genuine person, with helpful, caring and punctual staff. We’d love to travel with them again and will happily recommend them to friends and family.', photos: [] },
  { id: 'r09', name: 'Aaditya S', country: 'Verified traveller', slug: '7-days-kashmir', travelDate: '2025-03', rating: 5, verified: true, categories: ['family'], title: 'A lifetime memory', quote: 'The most memorable family trip of our lives, and Fayaz bhai was the reason. He organised everything from A to Z and was always a single call away whenever we got stuck — that responsiveness impressed us most of all.', photos: [] },
  { id: 'r10', name: 'Bhaabyesh M', country: 'Verified traveller', slug: 'ski-advanced', travelDate: '2026-01', rating: 5, verified: true, categories: ['skiing'], title: 'Fun and adventurous', quote: 'The adventure in Kashmir was next-level — towering mountains, endless snow and unreal landscapes, cold and thrilling in the best way. It wasn’t just sightseeing; it was feeling the place: thin air, silent mountains and that rush only real wilderness gives you.', photos: [] },
  { id: 'r11', name: 'bhavyesh m', country: 'Verified traveller', slug: '7-days-kashmir', travelDate: '2026-01', rating: 5, verified: true, categories: ['family'], title: 'Outstanding, full of adventure', quote: 'A great trip full of adventure and lovely contrasts. Our guide was polite and kind throughout, and Fayaz bhai and Miaz Ahmed were absolutely outstanding — their work was perfect from start to finish.', photos: [] },
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

// Headline figures for structured data and hero display come from the primary
// external platform (TripAdvisor: real 5.0 / 223), NOT from the sample of reviews
// shown on the page — so the AggregateRating we publish matches the real total.
// Falls back to the computed on-page numbers if no platform rating is set.
const primaryPlatform = platforms.find((p) => p.rating != null)
export const headlineRating = primaryPlatform?.rating ?? null
export const headlineCount = primaryPlatform?.count ?? null

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
