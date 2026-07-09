import {
  Compass, Snowflake, MountainSnow, Mountain, Camera, Utensils,
  Landmark, Backpack, Lightbulb, MapPin,
} from 'lucide-react'
import { asset } from '@/lib/asset'

// ─────────────────────────────────────────────────────────────────────────────
// Blog content. Categories, authors, articles, FAQs — all of it lives here. No
// article content lives inside a component.
//
// An article `body` is an array of typed BLOCKS rather than an HTML string:
//   { type: 'h2',      text, id }        → section heading (feeds the ToC)
//   { type: 'p',       text }            → paragraph
//   { type: 'list',    items[], ordered? }
//   { type: 'callout', tone, title, text }   tone: 'tip' | 'warning' | 'note'
//   { type: 'quote',   text, cite }
//   { type: 'image',   src, alt, caption }
// This keeps content structured and safe to render (no dangerouslySetInnerHTML),
// lets the Table of Contents build itself from the h2 blocks, and makes reading
// time computable. Cross-links (`destinations`, `adventures`, `packages`) are
// slugs resolved at render time against the live data, so they can never go stale.
// ─────────────────────────────────────────────────────────────────────────────

const img = (theme, n) => asset(`images/scenes/s-${theme}-${n}.svg`)
const blogImg = (n) => asset(`images/blog-${n}.svg`)

export const categories = [
  { id: 'travel-guides', label: 'Travel Guides', icon: Compass },
  { id: 'skiing-guides', label: 'Skiing Guides', icon: Snowflake },
  { id: 'snowboarding', label: 'Snowboarding', icon: MountainSnow },
  { id: 'adventure-activities', label: 'Adventure Activities', icon: Mountain },
  { id: 'trekking', label: 'Trekking', icon: Mountain },
  { id: 'destination-guides', label: 'Destination Guides', icon: MapPin },
  { id: 'photography', label: 'Photography', icon: Camera },
  { id: 'local-food', label: 'Local Food', icon: Utensils },
  { id: 'culture', label: 'Culture', icon: Landmark },
  { id: 'travel-tips', label: 'Travel Tips', icon: Lightbulb },
  { id: 'packing-guides', label: 'Packing Guides', icon: Backpack },
]

export const seasons = ['Spring', 'Summer', 'Autumn', 'Winter']

export const authors = {
  imran: { id: 'imran', name: 'Imran Bhat', role: 'Lead ski guide', bio: 'IASI-certified, twenty winters on Apharwat. Writes about snow, safety and the long walk up.', avatar: img('snow', 2) },
  aisha: { id: 'aisha', name: 'Aisha Kaul', role: 'Culture & food writer', bio: 'Srinagar-born. Chronicles the valley’s kitchens, crafts and the people who keep them alive.', avatar: img('dawn', 3) },
  rahul: { id: 'rahul', name: 'Rahul Menon', role: 'Trek leader', bio: 'Has walked the Great Lakes more times than he can count. Believes in slow days and early starts.', avatar: img('meadow', 2) },
  tenzin: { id: 'tenzin', name: 'Tenzin Norbu', role: 'Ladakh specialist', bio: 'Leh-based, high-altitude obsessive. Writes about passes, permits and acclimatisation.', avatar: img('desert', 3) },
}

// Words-per-minute used to derive reading time from the body blocks.
const WPM = 220

export const posts = [
  {
    slug: 'gulmarg-first-timers-ski-guide',
    title: 'A first-timer’s guide to skiing Gulmarg',
    subtitle: 'What nobody tells you about Asia’s most talked-about powder — from gondola timings to reading the snowpack.',
    excerpt: 'Gulmarg rewards preparation. Here is everything a first-time visitor should know before clicking into bindings.',
    category: 'skiing-guides',
    author: 'imran',
    date: '2026-01-14',
    cover: img('snow', 1),
    featured: true,
    popular: true,
    season: 'Winter',
    destinations: ['gulmarg'],
    adventures: ['skiing', 'gondola-ride'],
    packages: ['ski-beginner', 'ski-advanced'],
    tags: ['skiing', 'gulmarg', 'winter'],
    gallery: [
      { src: img('snow', 2), alt: 'Untracked powder below the gondola', caption: 'The second stage opens terrain most visitors never reach.' },
      { src: img('snow', 3), alt: 'A skier drops into an open bowl', caption: 'Wide, treeless bowls — forgiving for confident intermediates.' },
      { src: img('glacier', 1), alt: 'Snow-laden pines at first light', caption: 'First light on the tree line, before the first lift.' },
    ],
    body: [
      { type: 'p', text: 'Gulmarg has a reputation that arrives before you do. People talk about the powder, the gondola, the price of a lift ticket relative to the Alps. What they mention less often is that Gulmarg is a genuine mountain — lightly patrolled, occasionally windswept, and far more serious than its resort label suggests.' },
      { type: 'p', text: 'That is not a warning to stay away. It is an argument for arriving prepared. Do that, and few places on earth give back so much for so little.' },
      { type: 'h2', id: 'when-to-come', text: 'When to come' },
      { type: 'p', text: 'The season runs from late December to March. January and February hold the most reliable cold and the deepest snowpack. March brings longer days, softer afternoons and a friendlier learning curve for beginners.' },
      { type: 'callout', tone: 'tip', title: 'Book the gondola early', text: 'Tickets for the second stage sell out on clear mornings. Buy the day before, and be at the base by 08:30 if you want first tracks.' },
      { type: 'h2', id: 'the-gondola', text: 'Understanding the gondola' },
      { type: 'p', text: 'The gondola climbs in two stages. Stage one, to Kongdoori, serves gentle intermediate terrain and the nursery slopes. Stage two lifts you to roughly 3,980 m on Apharwat, where the mountain stops being a resort and starts being the Himalaya.' },
      { type: 'list', items: ['Stage one: learning, cruising, warming up', 'Stage two: exposed, high, and genuinely alpine', 'Weather closes stage two often — build slack into your plans'] },
      { type: 'h2', id: 'terrain-and-snow', text: 'Terrain and snow' },
      { type: 'p', text: 'The snow is famously dry, a consequence of altitude and a continental climate. The bowls off Apharwat are wide and treeless; the tree runs lower down hold soft snow for days after a storm. Neither is groomed in any meaningful sense.' },
      { type: 'callout', tone: 'warning', title: 'This is avalanche terrain', text: 'Gulmarg’s off-piste is uncontrolled. Carry a transceiver, shovel and probe, know how to use them, and ski with a guide until you understand the snowpack. Every season this advice is ignored, and every season it matters.' },
      { type: 'h2', id: 'getting-there', text: 'Getting there' },
      { type: 'p', text: 'Fly into Srinagar, then drive roughly two hours to Gulmarg. The road climbs steadily and can close briefly after heavy snowfall — an argument for arriving a day before you intend to ski.' },
      { type: 'h2', id: 'what-to-pack', text: 'What to pack' },
      { type: 'list', ordered: true, items: ['Layers, not bulk: a base, a mid and a hardshell', 'Goggles with two lens tints — flat light is common', 'Sunscreen; the altitude is deceptive', 'Cash, since card acceptance is patchy above the base'] },
      { type: 'quote', text: 'The mountain does not care how far you have travelled. Ski it the way you would ski anything unfamiliar: slowly, and with someone who knows it.', cite: 'Imran Bhat' },
      { type: 'h2', id: 'a-sensible-first-week', text: 'A sensible first week' },
      { type: 'p', text: 'Spend day one on the nursery slopes reacquainting your legs. Day two, ride stage one and cruise. From day three, if the snow is stable and you have a guide, stage two opens up. Leave a spare day for weather. You will use it.' },
    ],
    faqs: [
      { q: 'Do I need my own equipment?', a: 'No — quality skis, boards and boots are available to rent in Gulmarg, and we arrange it as part of any ski package.' },
      { q: 'Is Gulmarg suitable for absolute beginners?', a: 'Yes. The nursery slopes and stage-one terrain are gentle, and certified instructors teach there daily.' },
    ],
  },
  {
    slug: 'kashmir-great-lakes-trek-guide',
    title: 'Walking the Kashmir Great Lakes',
    subtitle: 'Seven days, five alpine lakes, and the finest trek in the Indian Himalaya.',
    excerpt: 'A practical account of the Great Lakes trek: the passes, the campsites, the weather and the honest difficulty.',
    category: 'trekking',
    author: 'rahul',
    date: '2026-01-06',
    cover: img('glacier', 1),
    featured: false,
    popular: true,
    season: 'Summer',
    destinations: ['sonamarg', 'pahalgam'],
    adventures: ['camping', 'snow-trekking'],
    packages: ['great-lakes-trek'],
    tags: ['trekking', 'summer', 'sonamarg'],
    gallery: [
      { src: img('glacier', 2), alt: 'An alpine lake beneath snow peaks', caption: 'Vishansar, still as glass before the wind arrives.' },
      { src: img('meadow', 1), alt: 'Meadow campsite at dusk', caption: 'Camp at Nichnai — the last easy night.' },
    ],
    body: [
      { type: 'p', text: 'The Great Lakes trek is the walk people mean when they say Kashmir is beautiful. Over roughly seven days it strings together five high lakes, four passes and a procession of meadows that seem designed to be disbelieved.' },
      { type: 'h2', id: 'the-route', text: 'The route' },
      { type: 'p', text: 'Most itineraries begin at Sonamarg and finish near Naranag, crossing Nichnai, Gadsar, Zaj and Gangbal passes. Distances are modest; the altitude is not.' },
      { type: 'h2', id: 'difficulty', text: 'How hard is it, honestly' },
      { type: 'p', text: 'Moderate to challenging. You will walk five to seven hours a day, cross snow patches into July, and sleep above 3,500 m. Fit walkers with no technical experience manage it well. Unfit walkers have a long week.' },
      { type: 'callout', tone: 'note', title: 'Acclimatise first', text: 'Spend a night in Srinagar and a night in Sonamarg before you start. The trek gains height quickly and there is no shortcut around the physiology.' },
      { type: 'h2', id: 'when-to-go', text: 'When to go' },
      { type: 'p', text: 'July through early September. Earlier and the passes hold snow; later and the weather turns unreliable. Late August is a fine compromise: wildflowers gone, skies clear.' },
      { type: 'list', items: ['July: snow on the passes, fewest people', 'August: the classic window', 'September: crisp, cold nights, short season'] },
      { type: 'quote', text: 'Nobody remembers the pass. Everybody remembers what was on the other side of it.', cite: 'Rahul Menon' },
    ],
    faqs: [
      { q: 'Do I need trekking experience?', a: 'Not technical experience, but real fitness. If you can walk 15 km with a daypack on consecutive days, you are ready.' },
      { q: 'Are permits required?', a: 'Yes, and we arrange them. Carry photo ID throughout.' },
    ],
  },
  {
    slug: 'wazwan-a-guide-to-kashmiri-feasting',
    title: 'Wazwan: a guide to Kashmiri feasting',
    subtitle: 'Thirty-six courses, one copper platter, and centuries of ceremony.',
    excerpt: 'How to understand — and properly eat — the Kashmir valley’s great ceremonial meal.',
    category: 'local-food',
    author: 'aisha',
    date: '2025-12-28',
    cover: blogImg(1),
    featured: false,
    popular: true,
    season: 'Autumn',
    destinations: ['srinagar'],
    adventures: [],
    packages: ['kashmir-luxury', '5-days-kashmir'],
    tags: ['food', 'culture', 'srinagar'],
    gallery: [
      { src: img('dawn', 3), alt: 'Kahwa poured into a cup', caption: 'Kahwa closes the meal, saffron threads still turning.' },
    ],
    body: [
      { type: 'p', text: 'Wazwan is not a menu. It is an institution — a multi-course banquet cooked by hereditary chefs, the wazas, and eaten from a shared copper platter called the trami.' },
      { type: 'h2', id: 'the-structure', text: 'The structure of the meal' },
      { type: 'p', text: 'Guests sit in fours around one trami. Rice arrives first, then the courses: seekh kababs, methi maaz, rista, rogan josh, and finally gushtaba, whose arrival signals the meal is ending.' },
      { type: 'list', ordered: true, items: ['Wash your hands at the tash-t-nari basin', 'Eat with your right hand, from your quadrant', 'Pace yourself — gushtaba is a long way off', 'When gushtaba arrives, the meal is closing'] },
      { type: 'callout', tone: 'tip', title: 'Ask in advance', text: 'A proper wazwan takes a day to prepare. Give any host or restaurant at least 24 hours’ notice, and go hungry.' },
      { type: 'h2', id: 'the-dishes', text: 'The dishes that matter' },
      { type: 'p', text: 'Rista — pounded meatballs in a red, fennel-scented gravy. Gushtaba — the same craft, finished in yoghurt, softer and richer. Between them sits rogan josh, the dish the rest of the world thinks it knows.' },
      { type: 'quote', text: 'You do not order wazwan. You are given it.', cite: 'Aisha Kaul' },
      { type: 'h2', id: 'etiquette', text: 'A little etiquette' },
      { type: 'p', text: 'Refusing a course outright is awkward; taking less is not. Leave a little rice to signal you are satisfied. And drink the kahwa — it is doing serious digestive work.' },
    ],
    faqs: [
      { q: 'Is there a vegetarian wazwan?', a: 'A vegetarian equivalent exists and is excellent, though the classical wazwan is meat-centred. Tell us in advance and we will arrange it.' },
    ],
  },
  {
    slug: 'ladakh-acclimatisation-and-permits',
    title: 'Ladakh: acclimatisation, permits and the honest timeline',
    subtitle: 'Why every good Ladakh itinerary starts by doing almost nothing.',
    excerpt: 'Altitude is the whole story in Ladakh. Here is how to plan around it — and which permits you actually need.',
    category: 'travel-guides',
    author: 'tenzin',
    date: '2025-12-19',
    cover: img('desert', 1),
    featured: false,
    popular: false,
    season: 'Summer',
    destinations: ['leh', 'nubra-valley', 'pangong-lake'],
    adventures: ['camping'],
    packages: ['leh-explorer', 'pangong-lake'],
    tags: ['ladakh', 'altitude', 'permits'],
    gallery: [],
    body: [
      { type: 'p', text: 'Leh sits at 3,500 m. Pangong is 4,350 m. Khardung La, on the way to Nubra, is higher still. Nothing about a Ladakh itinerary works if you ignore that.' },
      { type: 'h2', id: 'the-first-48-hours', text: 'The first 48 hours' },
      { type: 'p', text: 'Do very little. Walk to Leh Palace, drink water, skip the beer. Two nights in Leh before any high pass is not conservative — it is the minimum that reliably works.' },
      { type: 'callout', tone: 'warning', title: 'Know the symptoms', text: 'Headache, nausea, breathlessness at rest and disturbed sleep are altitude sickness, not tiredness. The only reliable treatment is to descend. Tell your guide early; nobody will think less of you.' },
      { type: 'h2', id: 'permits', text: 'Permits, plainly' },
      { type: 'p', text: 'Inner Line Permits are required for Nubra, Pangong and Tso Moriri. They are straightforward, they need your passport or ID, and we arrange them before you arrive.' },
      { type: 'h2', id: 'a-workable-order', text: 'A workable order' },
      { type: 'list', ordered: true, items: ['Two nights in Leh, low effort', 'Nubra over Khardung La, one or two nights', 'Pangong, sleeping lakeside if you are acclimatised', 'Tso Moriri only if you have the days'] },
    ],
    faqs: [
      { q: 'Can I fly in and drive to Pangong the next day?', a: 'You can. You should not. It is the single most common cause of a ruined Ladakh trip.' },
    ],
  },
  {
    slug: 'packing-for-a-kashmir-winter',
    title: 'Packing for a Kashmir winter',
    subtitle: 'A layering system that works from Srinagar’s streets to Apharwat’s ridgeline.',
    excerpt: 'One bag, two climates. What to bring for a Kashmir winter, and what to leave at home.',
    category: 'packing-guides',
    author: 'imran',
    date: '2025-12-08',
    cover: img('snow', 4),
    featured: false,
    popular: false,
    season: 'Winter',
    destinations: ['gulmarg', 'srinagar'],
    adventures: ['skiing', 'snow-hiking'],
    packages: ['ski-hotel-package'],
    tags: ['packing', 'winter'],
    gallery: [],
    body: [
      { type: 'p', text: 'A Kashmir winter asks two different things of your wardrobe. Srinagar is cold and damp; Gulmarg is cold and dry, at altitude, in wind. One bag can cover both if you think in layers rather than garments.' },
      { type: 'h2', id: 'the-three-layers', text: 'The three layers' },
      { type: 'list', items: ['Base: merino or synthetic, never cotton', 'Mid: fleece or light down, something you will actually take off', 'Shell: waterproof and windproof, with a hood that fits over a helmet'] },
      { type: 'callout', tone: 'tip', title: 'Two pairs of gloves', text: 'A thin liner for the gondola queue and your phone, a heavy pair for the descent. One pair is always the wrong pair.' },
      { type: 'h2', id: 'the-small-things', text: 'The small things' },
      { type: 'p', text: 'Sunscreen and lip balm, because snow reflects far more than you expect. A spare goggle lens for flat light. Cash. A power bank, which the cold will drain faster than you think.' },
    ],
    faqs: [
      { q: 'Can I rent warm clothing there?', a: 'Outerwear and ski gear, yes. Base layers and gloves are worth bringing yourself.' },
    ],
  },
  {
    slug: 'photographing-the-dal-at-dawn',
    title: 'Photographing the Dal at dawn',
    subtitle: 'Mist, shikaras and the fifteen minutes that make the trip.',
    excerpt: 'A practical field guide to shooting Srinagar’s lake in the only light that really suits it.',
    category: 'photography',
    author: 'aisha',
    date: '2025-11-30',
    cover: img('dawn', 1),
    featured: false,
    popular: true,
    season: 'Autumn',
    destinations: ['srinagar'],
    adventures: [],
    packages: ['kashmir-honeymoon'],
    tags: ['photography', 'srinagar'],
    gallery: [
      { src: img('dawn', 2), alt: 'Mist over the Mughal gardens', caption: 'The gardens hold mist longer than the open water.' },
      { src: img('dawn', 4), alt: 'A houseboat veranda at sunrise', caption: 'Cedar verandas catch the first warm light.' },
    ],
    body: [
      { type: 'p', text: 'The Dal has one truly great hour, and most visitors sleep through it. Between first light and the moment the lake wakes, mist sits on the water, the shikaras move slowly, and everything is soft.' },
      { type: 'h2', id: 'timing', text: 'Timing' },
      { type: 'p', text: 'Be on the water thirty minutes before sunrise. Arrange the shikara the night before and agree the rate then — negotiating at 05:30 costs you the light.' },
      { type: 'h2', id: 'settings', text: 'Settings and kit' },
      { type: 'list', items: ['A fast standard prime; you will be shooting wide open early', 'Expose for the highlights, lift the shadows later', 'A cloth — the boat throws spray you will not notice until you review'] },
      { type: 'callout', tone: 'note', title: 'Ask before you photograph people', text: 'The floating market is a working place, not a set. A word and a smile first; nobody has ever said no to me twice.' },
    ],
    faqs: [
      { q: 'Is a drone allowed over the Dal?', a: 'Generally no — Srinagar has significant restrictions. Do not fly without written permission.' },
    ],
  },
  {
    slug: 'rafting-the-lidder',
    title: 'Rafting the Lidder, grade by grade',
    subtitle: 'What the river actually asks of a first-time paddler.',
    excerpt: 'Pahalgam’s Lidder is snow-fed, bouncy and beginner-friendly. Here is what to expect on the water.',
    category: 'adventure-activities',
    author: 'rahul',
    date: '2025-11-21',
    cover: img('forest', 4),
    featured: false,
    popular: false,
    season: 'Summer',
    destinations: ['pahalgam'],
    adventures: ['river-rafting', 'camping'],
    packages: ['7-days-kashmir'],
    tags: ['rafting', 'pahalgam', 'summer'],
    gallery: [],
    body: [
      { type: 'p', text: 'The Lidder is a snow-fed river with a short, lively season. It is graded II to III on the stretches we run — enough to soak you thoroughly, not enough to frighten you.' },
      { type: 'h2', id: 'what-happens', text: 'What actually happens' },
      { type: 'p', text: 'You are briefed on the bank, fitted with a life jacket and helmet, and taught three commands. Then you paddle, the guide steers, and the river does the rest.' },
      { type: 'callout', tone: 'tip', title: 'Go in the morning', text: 'Flows are steadier and the light through the pines is better. Afternoons bring wind up the valley.' },
      { type: 'h2', id: 'when', text: 'When to raft' },
      { type: 'p', text: 'May to August. Peak melt in June gives the biggest water; August is gentler and warmer.' },
    ],
    faqs: [
      { q: 'Do I need to swim?', a: 'Swimmers are preferred but not required — you wear a life jacket throughout and guides are trained in rescue.' },
    ],
  },
  {
    slug: 'gurez-valley-the-quiet-frontier',
    title: 'Gurez Valley: the quiet frontier',
    subtitle: 'Log villages, a turquoise river, and a valley that only recently opened its door.',
    excerpt: 'Why Gurez rewards the long drive, and how to travel there thoughtfully.',
    category: 'destination-guides',
    author: 'aisha',
    date: '2025-11-12',
    cover: img('dusk', 1),
    featured: false,
    popular: false,
    season: 'Summer',
    destinations: ['gurez-valley', 'bangus-valley'],
    adventures: ['camping', 'fishing'],
    packages: [],
    tags: ['gurez', 'remote', 'culture'],
    gallery: [
      { src: img('dusk', 2), alt: 'The Kishanganga river at dusk', caption: 'The Kishanganga runs turquoise even under grey skies.' },
    ],
    body: [
      { type: 'p', text: 'Gurez sits beyond the Razdan Pass, along the Kishanganga, in a valley that spent decades effectively closed. It is now open, and it is extraordinary.' },
      { type: 'h2', id: 'getting-in', text: 'Getting in' },
      { type: 'p', text: 'The pass dictates everything. Snow-free from roughly May to September; outside that window, plan elsewhere. Carry ID — this is a frontier district.' },
      { type: 'callout', tone: 'note', title: 'Travel gently', text: 'Gurez is not set up for volume tourism, and its Dard-Shin communities are living their lives, not staging them. Ask before photographing people or homes.' },
      { type: 'h2', id: 'what-to-see', text: 'What to see' },
      { type: 'p', text: 'Habba Khatoon, the pyramid peak that presides over the valley. The log-built villages of Tulail. And the river, which is a colour you will spend the drive home trying to describe.' },
    ],
    faqs: [
      { q: 'Is there mobile signal?', a: 'Patchy at best. Treat Gurez as an offline trip and tell people at home in advance.' },
    ],
  },
  {
    slug: 'snowboarding-gulmarg-bowls',
    title: 'Snowboarding Gulmarg’s open bowls',
    subtitle: 'Treeless, wind-affected, and better than almost anywhere — if you read it right.',
    excerpt: 'How Gulmarg rides on a board, and where a snowboarder should actually spend their week.',
    category: 'snowboarding',
    author: 'imran',
    date: '2025-11-02',
    cover: img('snow', 3),
    featured: false,
    popular: false,
    season: 'Winter',
    destinations: ['gulmarg'],
    adventures: ['snowboarding', 'skiing'],
    packages: ['ski-intermediate'],
    tags: ['snowboarding', 'gulmarg'],
    gallery: [],
    body: [
      { type: 'p', text: 'Gulmarg suits a snowboard better than most Himalayan resorts. The bowls are wide, the fall lines are long, and there are few of the flat run-outs that punish a board.' },
      { type: 'h2', id: 'the-wind', text: 'Reading the wind' },
      { type: 'p', text: 'Apharwat is exposed. Wind moves snow constantly, loading some aspects and scouring others. The best riding is often not where the best snow fell, but where the wind put it.' },
      { type: 'callout', tone: 'warning', title: 'Wind-loading builds slabs', text: 'The same wind that gathers lovely soft snow also builds avalanche slabs. Ride with a guide until you can read the aspects yourself.' },
      { type: 'h2', id: 'where-to-ride', text: 'Where to spend your week' },
      { type: 'list', items: ['Stage one for cruising and low-visibility days', 'Stage two bowls when it is clear and stable', 'The tree line for storm days and soft snow'] },
    ],
    faqs: [
      { q: 'Is splitboarding worthwhile here?', a: 'Very. It opens terrain the gondola cannot reach, and the skinning is straightforward.' },
    ],
  },
  {
    slug: 'kashmiri-craft-traditions',
    title: 'The craft traditions of the old city',
    subtitle: 'Pashmina, papier-mâché, walnut wood — and how to buy them honestly.',
    excerpt: 'A short guide to Srinagar’s living crafts, and how to tell the real thing from the rest.',
    category: 'culture',
    author: 'aisha',
    date: '2025-10-24',
    cover: blogImg(2),
    featured: false,
    popular: false,
    season: 'Autumn',
    destinations: ['srinagar'],
    adventures: [],
    packages: ['3-days-kashmir'],
    tags: ['culture', 'craft', 'srinagar'],
    gallery: [],
    body: [
      { type: 'p', text: 'Srinagar’s old city still works. Behind the shopfronts, looms run, and craftsmen do things with walnut and papier-mâché that machines cannot replicate.' },
      { type: 'h2', id: 'pashmina', text: 'Pashmina, and how to test it' },
      { type: 'p', text: 'True pashmina is hand-spun from Changthangi goat fleece. It is warm out of proportion to its weight, slightly irregular under a loupe, and not cheap. The ring test is folklore; the price is the tell.' },
      { type: 'callout', tone: 'tip', title: 'Buy at the workshop', text: 'Ask to see the loom. Anyone genuinely making the thing will be pleased to show you, and the price will be better than at the hotel counter.' },
      { type: 'h2', id: 'papier-mache', text: 'Papier-mâché and walnut' },
      { type: 'p', text: 'Papier-mâché is painted in layers over months. Walnut carving comes from a single, dense local wood, and the good pieces are heavy. Both reward patience and a slow conversation over kahwa.' },
    ],
    faqs: [
      { q: 'Can I have purchases shipped?', a: 'Reputable workshops ship internationally and will give you paperwork. Insist on it for anything expensive.' },
    ],
  },
]

// ── Derived helpers (pure; no component coupling) ────────────────────────────

// Reading time is computed from the body blocks, so it can never drift from
// the actual article. Returns whole minutes, minimum 1.
export function readingTime(post) {
  const words = post.body.reduce((n, b) => {
    if (b.type === 'list') return n + b.items.join(' ').split(/\s+/).length
    if (b.type === 'image') return n + (b.caption?.split(/\s+/).length ?? 0)
    return n + ((b.text ?? '').split(/\s+/).filter(Boolean).length)
  }, 0)
  return Math.max(1, Math.round(words / WPM))
}

// The h2 blocks are the table of contents. One source of truth.
export const tableOfContents = (post) => post.body.filter((b) => b.type === 'h2').map(({ id, text }) => ({ id, text }))

export const getPost = (slug) => posts.find((p) => p.slug === slug)
export const getAuthor = (id) => authors[id]
export const getBlogCategory = (id) => categories.find((c) => c.id === id)

export const featuredPost = posts.find((p) => p.featured) ?? posts[0]
export const latestPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))
export const popularPosts = posts.filter((p) => p.popular)
export const postsByCategory = (id) => (id === 'all' ? posts : posts.filter((p) => p.category === id))
export const categoryCounts = () =>
  categories.reduce((acc, c) => ({ ...acc, [c.id]: posts.filter((p) => p.category === c.id).length }), { all: posts.length })

// Only categories that actually have articles are offered as filters.
export const activeCategories = categories.filter((c) => posts.some((p) => p.category === c.id))
// Every destination slug referenced by at least one article.
export const referencedDestinations = [...new Set(posts.flatMap((p) => p.destinations))]

// Related posts: same category first, then shared tags, then recency.
export function relatedPosts(post, n = 3) {
  const others = posts.filter((p) => p.slug !== post.slug)
  const score = (p) =>
    (p.category === post.category ? 10 : 0) + p.tags.filter((t) => post.tags.includes(t)).length
  return [...others].sort((a, b) => score(b) - score(a) || b.date.localeCompare(a.date)).slice(0, n)
}

export const faqs = [
  { q: 'How often do you publish?', a: 'Roughly twice a month, and more often through the winter season when conditions change week to week.' },
  { q: 'Who writes these articles?', a: 'Our own guides and specialists — the same people who lead the trips. Each article carries its author’s name and background.' },
  { q: 'Can I republish an article?', a: 'Ask us. We are usually happy to share with attribution and a link back.' },
  { q: 'Can you advise on my specific trip?', a: 'Yes. The articles are a starting point; message us and we will answer your actual question.' },
]
