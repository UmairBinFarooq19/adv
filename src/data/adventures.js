import {
  CarFront, Cable, Waves, Tent, Footprints, Wind, Bike, Fish,
  Snowflake, Truck, MountainSnow, Mountain, Disc, CableCar,
  ShieldCheck, Wrench, HeartPulse, ClipboardCheck, CloudSun,
  Award, Users, Route, Compass, PersonStanding, Sun,
} from 'lucide-react'
import { asset } from '@/lib/asset'

// ─────────────────────────────────────────────────────────────────────────────
// Adventures content. Every activity, its details, gallery, related package
// category, plus the section's categories / gallery / safety / why / FAQ blocks
// all live here — no activity content lives inside a component. Swap the
// placeholder scene art for real photography by editing the image paths.
// ─────────────────────────────────────────────────────────────────────────────

const img = (theme, n = 1) => asset(`images/scenes/s-${theme}-${n}.svg`)

// The two top-level buckets, used by the "Adventure Categories" cards. They
// anchor-scroll to the grids further down the landing page.
export const adventureCategories = [
  {
    id: 'summer',
    title: 'Summer Adventures',
    tagline: 'Meadows, rivers & alpine air',
    desc: 'From white-water rafting to paragliding over the valley — warm-season thrills across Kashmir’s greenest months.',
    image: img('meadow', 1),
    icon: Sun,
    to: '#summer',
  },
  {
    id: 'winter',
    title: 'Winter Adventures',
    tagline: 'Powder, peaks & first tracks',
    desc: 'World-class skiing, snowboarding and snow play in Gulmarg — one of the highest lift-served resorts on earth.',
    image: img('snow', 1),
    icon: Snowflake,
    to: '#winter',
  },
]

// The activity catalogue. `relatedCategory` maps to a package category slug so
// each detail page can surface real, bookable trips via the existing catalog.
export const activities = [
  // ── Summer ──────────────────────────────────────────────────────────────
  {
    slug: 'atv-ride', name: 'ATV Ride', season: 'summer', icon: CarFront,
    tagline: 'Four wheels, open trails', location: 'Gulmarg · Sonamarg meadows',
    image: img('forest', 3), gallery: [img('forest', 3), img('meadow', 2), img('dawn', 3), img('forest', 1)],
    overview: 'Open up the throttle across alpine meadows and forest tracks on a guided all-terrain vehicle. A guide leads every convoy, so first-timers can relax into the ride while the scenery does the rest.',
    highlights: ['Guided convoy with a lead & sweep rider', 'Helmets and full safety brief included', 'Scenic meadow and forest circuits'],
    duration: '1–2 hours', difficulty: 'Easy', bestSeason: 'May – Sep', suitableFor: 'Ages 12+ · no experience needed',
    priceFrom: 2500, relatedCategory: 'kashmir',
  },
  {
    slug: 'zipline', name: 'Zipline', season: 'summer', icon: Cable,
    tagline: 'Fly the valley on a wire', location: 'Pahalgam · Betaab Valley',
    image: img('forest', 1), gallery: [img('forest', 1), img('forest', 2), img('meadow', 3), img('dawn', 2)],
    overview: 'Clip in and glide across a river gorge on a professionally rigged steel line. Short, exhilarating and endlessly re-rideable — the fastest way to swap nerves for a grin.',
    highlights: ['Twin redundant harness system', 'Trained cable operators at both ends', 'Perfect first taste of adventure'],
    duration: '30–45 min', difficulty: 'Easy', bestSeason: 'Apr – Oct', suitableFor: 'Ages 8+ · beginners welcome',
    priceFrom: 1200, relatedCategory: 'kashmir',
  },
  {
    slug: 'river-rafting', name: 'River Rafting', season: 'summer', icon: Waves,
    tagline: 'Read the whitewater', location: 'Lidder River · Pahalgam',
    image: img('forest', 4), gallery: [img('forest', 4), img('dusk', 1), img('forest', 2), img('meadow', 1)],
    overview: 'Paddle the snow-fed Lidder through bouncy grade II–III rapids with a certified river guide steering from the stern. Big fun, big splashes, and calmer pools to catch your breath.',
    highlights: ['Grade II–III, beginner-friendly stretches', 'Certified river guide per raft', 'Life jackets, helmets & wetsuits provided'],
    duration: '1.5–2 hours', difficulty: 'Moderate', bestSeason: 'May – Aug', suitableFor: 'Ages 14+ · swimmers preferred',
    priceFrom: 1800, relatedCategory: 'trekking',
  },
  {
    slug: 'camping', name: 'Camping', season: 'summer', icon: Tent,
    tagline: 'Sleep under alpine stars', location: 'Doodhpathri · Yusmarg',
    image: img('meadow', 1), gallery: [img('meadow', 1), img('dusk', 2), img('forest', 3), img('dawn', 1)],
    overview: 'Overnight in an appointed meadow camp with quality tents, hot meals and a bonfire under some of the clearest skies in the Himalaya. Guides handle the logistics; you handle the marshmallows.',
    highlights: ['Insulated tents, bedding & hot meals', 'Bonfire, stargazing & guided walks', 'Leave-no-trace, permitted sites only'],
    duration: '1–2 nights', difficulty: 'Easy', bestSeason: 'May – Sep', suitableFor: 'Families & groups',
    priceFrom: 3500, relatedCategory: 'trekking',
  },
  {
    slug: 'horse-riding', name: 'Horse Riding', season: 'summer', icon: PersonStanding,
    tagline: 'Trails at a gentler pace', location: 'Gulmarg · Aru Valley',
    image: img('meadow', 3), gallery: [img('meadow', 3), img('meadow', 2), img('forest', 1), img('dawn', 3)],
    overview: 'Follow classic pony trails to meadows and viewpoints with a local handler leading the way. A relaxed, storybook way to reach spots the road never touches.',
    highlights: ['Calm, well-kept ponies & local handlers', 'Short viewpoint loops or half-day trails', 'Great for all ages'],
    duration: '1–3 hours', difficulty: 'Easy', bestSeason: 'Apr – Oct', suitableFor: 'All ages',
    priceFrom: 1500, relatedCategory: 'kashmir',
  },
  {
    slug: 'paragliding', name: 'Paragliding', season: 'summer', icon: Wind,
    tagline: 'Tandem flight over the valley', location: 'Sanasar · Astanmarg',
    image: img('dawn', 1), gallery: [img('dawn', 1), img('dawn', 2), img('meadow', 3), img('dusk', 1)],
    overview: 'Launch off a green ridge strapped to a certified tandem pilot and soar over a patchwork of meadows and pine. The single most jaw-dropping view we offer — no experience required.',
    highlights: ['Certified tandem pilots only', 'All flight gear & a quick ground brief', 'GoPro footage available on request'],
    duration: '15–30 min flight', difficulty: 'Moderate', bestSeason: 'Apr – Jun · Sep – Oct', suitableFor: 'Ages 14+ · weight limits apply',
    priceFrom: 3500, relatedCategory: 'kashmir',
  },
  {
    slug: 'mountain-biking', name: 'Mountain Biking', season: 'summer', icon: Bike,
    tagline: 'Singletrack & switchbacks', location: 'Gulmarg · Yusmarg',
    image: img('forest', 2), gallery: [img('forest', 2), img('forest', 3), img('meadow', 1), img('dawn', 2)],
    overview: 'Ride marked forest and meadow trails on a quality hardtail, with routes graded from gentle green loops to lung-busting climbs and flowing descents. Guided throughout.',
    highlights: ['Maintained hardtails & helmets', 'Routes from beginner to advanced', 'Support guide & basic trailside repairs'],
    duration: '2–4 hours', difficulty: 'Moderate', bestSeason: 'May – Sep', suitableFor: 'Ages 14+ · basic fitness',
    priceFrom: 2000, relatedCategory: 'trekking',
  },
  {
    slug: 'fishing', name: 'Fishing', season: 'summer', icon: Fish,
    tagline: 'Trout in mountain streams', location: 'Pahalgam · Daksum',
    image: img('dusk', 2), gallery: [img('dusk', 2), img('forest', 4), img('meadow', 2), img('dawn', 1)],
    overview: 'Try your hand at fly-fishing for prized brown and rainbow trout in cold, clear Himalayan streams. Permits, tackle and a knowledgeable ghillie all arranged.',
    highlights: ['Angling permits & tackle sorted', 'Catch-and-release best practice', 'Peaceful, scenic beats'],
    duration: 'Half or full day', difficulty: 'Easy', bestSeason: 'Apr – Sep', suitableFor: 'All levels',
    priceFrom: 2200, relatedCategory: 'kashmir',
  },

  // ── Winter ──────────────────────────────────────────────────────────────
  {
    slug: 'skiing', name: 'Skiing', season: 'winter', icon: Snowflake,
    tagline: 'Legendary Gulmarg powder', location: 'Gulmarg',
    image: img('snow', 1), gallery: [img('snow', 1), img('snow', 2), img('glacier', 1), img('dusk', 3)],
    overview: 'From gentle nursery slopes to the fabled Apharwat backcountry, Gulmarg is a world-class ski destination. Certified instruction for first-timers; guided lines for experts.',
    highlights: ['IASI-certified instructors', 'Beginner lessons to backcountry guiding', 'Avalanche-aware, safety-first ethos'],
    duration: 'Half day – multi-day', difficulty: 'Easy → Challenging', bestSeason: 'Dec – Mar', suitableFor: 'All levels',
    priceFrom: 4500, relatedCategory: 'skiing',
  },
  {
    slug: 'snowboarding', name: 'Snowboarding', season: 'winter', icon: MountainSnow,
    tagline: 'Carve the open bowls', location: 'Gulmarg · Apharwat',
    image: img('snow', 2), gallery: [img('snow', 2), img('snow', 3), img('glacier', 2), img('dusk', 3)],
    overview: 'Wide, treeless bowls and deep, dry snow make Gulmarg a snowboarder’s dream. Lessons build your basics; guided sessions unlock the powder beyond the lifts.',
    highlights: ['Instructors for every level', 'Powder terrain & natural features', 'Board & boot rental arranged'],
    duration: 'Half day – multi-day', difficulty: 'Moderate', bestSeason: 'Dec – Mar', suitableFor: 'Ages 12+',
    priceFrom: 4500, relatedCategory: 'skiing',
  },
  {
    slug: 'snowmobile', name: 'Snowmobile', season: 'winter', icon: Truck,
    tagline: 'Motor across the snowfields', location: 'Gulmarg meadow',
    image: img('snow', 3), gallery: [img('snow', 3), img('snow', 4), img('glacier', 1), img('snow', 1)],
    overview: 'Skim across the frozen Gulmarg meadow on a guided snowmobile — a fast, effortless thrill with none of the uphill effort. Driver or passenger, your call.',
    highlights: ['Guided routes on groomed snow', 'Full brief & warm gear guidance', 'Ride solo or tandem'],
    duration: '20–40 min', difficulty: 'Easy', bestSeason: 'Dec – Mar', suitableFor: 'Ages 16+ to drive',
    priceFrom: 2500, relatedCategory: 'skiing',
  },
  {
    slug: 'snow-atv', name: 'Snow ATV', season: 'winter', icon: CarFront,
    tagline: 'All-terrain, all-white', location: 'Gulmarg',
    image: img('snow', 4), gallery: [img('snow', 4), img('snow', 2), img('glacier', 3), img('dusk', 3)],
    overview: 'Grippy, studded quad bikes take on the winter meadow for a punchy, playful ride. Guides set the route and pace so it’s a blast without the risk.',
    highlights: ['Studded winter tyres for grip', 'Guided, marked circuits', 'Helmets & safety brief included'],
    duration: '30–45 min', difficulty: 'Easy', bestSeason: 'Dec – Mar', suitableFor: 'Ages 14+',
    priceFrom: 2800, relatedCategory: 'skiing',
  },
  {
    slug: 'snow-hiking', name: 'Snow Hiking', season: 'winter', icon: Footprints,
    tagline: 'Snowshoe the silent forest', location: 'Gulmarg · Khilanmarg',
    image: img('glacier', 1), gallery: [img('glacier', 1), img('snow', 1), img('glacier', 2), img('dusk', 3)],
    overview: 'Strap on snowshoes and walk into hushed, snow-laden pine forest with a guide. Gentle, meditative and utterly photogenic — the calm counterpart to the adrenaline.',
    highlights: ['Snowshoes & poles provided', 'Gentle, guided forest routes', 'Great for photography'],
    duration: '2–3 hours', difficulty: 'Easy', bestSeason: 'Dec – Mar', suitableFor: 'All levels · basic fitness',
    priceFrom: 2000, relatedCategory: 'skiing',
  },
  {
    slug: 'snow-trekking', name: 'Snow Trekking', season: 'winter', icon: Mountain,
    tagline: 'Winter summits & ridges', location: 'Gulmarg · Khilanmarg ridge',
    image: img('glacier', 2), gallery: [img('glacier', 2), img('glacier', 1), img('snow', 2), img('dusk', 3)],
    overview: 'A more committing winter walk to high ridges and viewpoints, with proper mountaineering guidance and safety kit. Earn the panorama over Nanga Parbat on a clear day.',
    highlights: ['Mountain-guide led, safety kit carried', 'Micro-spikes / crampons as needed', 'Big high-altitude payoffs'],
    duration: 'Half – full day', difficulty: 'Challenging', bestSeason: 'Jan – Mar', suitableFor: 'Good fitness required',
    priceFrom: 3200, relatedCategory: 'trekking',
  },
  {
    slug: 'snow-tubing', name: 'Snow Tubing', season: 'winter', icon: Disc,
    tagline: 'Slide, spin, repeat', location: 'Gulmarg',
    image: img('snow', 1), gallery: [img('snow', 1), img('snow', 3), img('glacier', 1), img('snow', 4)],
    overview: 'The whole family’s favourite: whizz down a groomed snow lane on an inflatable tube and hike back up for another go. Pure, simple, giggling fun.',
    highlights: ['Groomed, marshalled lanes', 'Tubes provided, no skill needed', 'Perfect for kids & first-timers'],
    duration: '30–60 min', difficulty: 'Easy', bestSeason: 'Dec – Mar', suitableFor: 'All ages',
    priceFrom: 900, relatedCategory: 'skiing',
  },
  {
    slug: 'gondola-ride', name: 'Gondola Ride', season: 'winter', icon: CableCar,
    tagline: 'Ride one of the world’s highest', location: 'Gulmarg Gondola',
    image: img('glacier', 3), gallery: [img('glacier', 3), img('snow', 2), img('glacier', 1), img('dusk', 3)],
    overview: 'Ascend to 3,980 m on the Gulmarg Gondola — among the highest cable cars on the planet — for effortless access to snowfields and staggering Himalayan views.',
    highlights: ['Two stages to ~3,980 m', 'Tickets & timing handled for you', 'Gateway to the high snowfields'],
    duration: '1–2 hours', difficulty: 'Easy', bestSeason: 'Year-round', suitableFor: 'All ages',
    priceFrom: 1600, relatedCategory: 'skiing',
  },
]

// Landing "Adventure Gallery" — a curated masonry set. Varied ratios read as a
// proper editorial gallery rather than a uniform grid.
export const galleryImages = [
  { src: img('snow', 2), alt: 'Skiers on a Gulmarg powder field' },
  { src: img('meadow', 1), alt: 'Alpine meadow camp at dusk' },
  { src: img('forest', 4), alt: 'Whitewater on the Lidder river' },
  { src: img('dawn', 1), alt: 'Paraglider over the valley at dawn' },
  { src: img('glacier', 2), alt: 'Snow trekkers on a winter ridge' },
  { src: img('forest', 2), alt: 'Mountain-bike trail through pine forest' },
  { src: img('snow', 4), alt: 'Snow ATV on the frozen meadow' },
  { src: img('dusk', 2), alt: 'Fly-fishing a mountain stream' },
  { src: img('glacier', 3), alt: 'The Gulmarg gondola climbing to the snowfields' },
  { src: img('meadow', 3), alt: 'Pony trail through summer meadows' },
]

// Adventure-specific safety pillars.
export const safety = [
  { icon: ShieldCheck, title: 'Professional guides', desc: 'Every activity is led by certified, experienced guides trained for its specific terrain and risks.' },
  { icon: Wrench, title: 'Inspected equipment', desc: 'Helmets, harnesses, life jackets and vehicles are maintained and checked before every departure.' },
  { icon: HeartPulse, title: 'Medical support', desc: 'First-aid trained guides, carried kits, and clear evacuation plans for higher-risk activities.' },
  { icon: ClipboardCheck, title: 'Safety briefing', desc: 'A clear, no-jargon briefing before you start, so everyone knows the signals and the plan.' },
  { icon: CloudSun, title: 'Weather monitoring', desc: 'We track mountain conditions daily and reschedule — never push — when the weather turns.' },
]

// "Why adventure with us" — reasons, rendered on a dark band via FeatureCards.
export const whyReasons = [
  { icon: Award, title: 'Certified adventure guides', desc: 'Mountain-, river- and snow-certified leaders who do this every season.' },
  { icon: Wrench, title: 'Premium gear included', desc: 'Quality, maintained equipment comes as standard — no rental scramble.' },
  { icon: Users, title: 'Small groups', desc: 'Low ratios mean more attention, more safety and more of the good stuff.' },
  { icon: Compass, title: 'Local knowledge', desc: 'We grew up on these slopes and rivers, and it shows in every route.' },
  { icon: ShieldCheck, title: 'Safety-first, always', desc: 'Briefings, checks and honest weather calls on every single outing.' },
  { icon: Route, title: 'Flexible & combinable', desc: 'Mix activities across a day or a week — we’ll shape it around you.' },
]

// Adventure-specific FAQs.
export const faqs = [
  { q: 'Do I need previous experience?', a: 'For most activities, no. Easy-rated adventures welcome complete beginners, and our guides brief and coach you throughout. Challenging activities note the fitness or experience needed.' },
  { q: 'Is equipment provided?', a: 'Yes — helmets, harnesses, life jackets, snowshoes, bikes and other core gear are included and inspected before use. Just bring suitable clothing and footwear.' },
  { q: 'What should I wear and bring?', a: 'Layers you can adjust, sturdy closed shoes, sunglasses and sunscreen. For winter, warm waterproofs and gloves. We’ll send a tailored list once your activities are set.' },
  { q: 'Are activities weather-dependent?', a: 'Some are. We monitor mountain conditions daily and will reschedule or swap an activity rather than run it unsafely — your safety always comes first.' },
  { q: 'Are there age or fitness limits?', a: 'They vary by activity and are listed on each one under “Suitable for”. Families are very welcome; tell us your group and we’ll suggest the right mix.' },
  { q: 'Can I combine several activities?', a: 'Absolutely — that’s how most guests do it. We’ll build a day or a multi-day plan that flows sensibly and leaves time to enjoy each one.' },
]

// ── Helpers (pure; no catalog coupling) ──────────────────────────────────────
export const summerActivities = activities.filter((a) => a.season === 'summer')
export const winterActivities = activities.filter((a) => a.season === 'winter')
export const getActivity = (slug) => activities.find((a) => a.slug === slug)

