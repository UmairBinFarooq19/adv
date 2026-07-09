import {
  Mountain, Waves, TreePine, Landmark, Tent, Sparkles, Compass,
  Sprout, Sun, Leaf, Snowflake, Flower2, Star, ShieldCheck, Heart, Users,
} from 'lucide-react'
import { asset } from '@/lib/asset'

// ─────────────────────────────────────────────────────────────────────────────
// Destination GUIDE content (the full travel-guide dataset for the Destinations
// section). Note: the lighter `destinations.js` powers the Home preview strip and
// is intentionally left untouched — this file is the standalone source of truth
// for the guide pages. Add a destination by appending one object to
// `destinations` (and optionally `featuredSlugs`); it then gets a card, a full
// detail page, a map pin, a search entry and cross-links automatically. Swap the
// placeholder scene art for real photography by editing the image paths.
// ─────────────────────────────────────────────────────────────────────────────

const img = (theme, n = 1) => asset(`images/scenes/s-${theme}-${n}.svg`)
const g = (theme) => [1, 2, 3, 4].map((n) => ({ src: img(theme, n), alt: '' }))

// Reusable weather templates (season → conditions). Destinations reference one,
// so the four-season data stays consistent and DRY.
const WX = {
  valley: [
    { season: 'Spring', months: 'Mar – May', temp: '8 – 20°C', icon: Sprout, desc: 'Blossoms, tulips and mild days — the valley wakes up in colour.' },
    { season: 'Summer', months: 'Jun – Aug', temp: '15 – 30°C', icon: Sun, desc: 'Warm, green and lively; the peak season for gardens and lakes.' },
    { season: 'Autumn', months: 'Sep – Nov', temp: '6 – 23°C', icon: Leaf, desc: 'Golden chinars and crisp air — a photographer’s dream.' },
    { season: 'Winter', months: 'Dec – Feb', temp: '−2 – 8°C', icon: Snowflake, desc: 'Cold and often snowy, with a frozen Dal and quiet charm.' },
  ],
  alpine: [
    { season: 'Spring', months: 'Apr – May', temp: '3 – 15°C', icon: Sprout, desc: 'Melting snow gives way to the first green meadows.' },
    { season: 'Summer', months: 'Jun – Aug', temp: '10 – 24°C', icon: Sun, desc: 'Cool alpine days and wildflower meadows — ideal for walking.' },
    { season: 'Autumn', months: 'Sep – Oct', temp: '2 – 16°C', icon: Leaf, desc: 'Crisp and golden, with the first dustings of early snow.' },
    { season: 'Winter', months: 'Nov – Mar', temp: '−8 – 4°C', icon: Snowflake, desc: 'Deep, dry snow — prime skiing and snow-play season.' },
  ],
  ladakh: [
    { season: 'Spring', months: 'Apr – May', temp: '0 – 18°C', icon: Sprout, desc: 'Passes thaw and skies clear as the road season begins.' },
    { season: 'Summer', months: 'Jun – Sep', temp: '8 – 28°C', icon: Sun, desc: 'Warm days, cold nights — the best window for travel.' },
    { season: 'Autumn', months: 'Oct', temp: '−2 – 15°C', icon: Leaf, desc: 'Crisp, golden and quiet as the high roads begin to close.' },
    { season: 'Winter', months: 'Nov – Mar', temp: '−20 – 2°C', icon: Snowflake, desc: 'Bitterly cold; many roads closed but hauntingly beautiful.' },
  ],
  highLake: [
    { season: 'Spring', months: 'May', temp: '−5 – 12°C', icon: Sprout, desc: 'Ice recedes from the shore; access opens up slowly.' },
    { season: 'Summer', months: 'Jun – Sep', temp: '3 – 20°C', icon: Sun, desc: 'Best access and the most brilliant blue water of the year.' },
    { season: 'Autumn', months: 'Oct', temp: '−8 – 8°C', icon: Leaf, desc: 'A short, spectacular window before the cold shuts the roads.' },
    { season: 'Winter', months: 'Nov – Apr', temp: '−25 – −2°C', icon: Snowflake, desc: 'Frozen and largely inaccessible to visitors.' },
  ],
}

export const destinations = [
  {
    slug: 'gulmarg', name: 'Gulmarg', region: 'Kashmir Valley', tagline: 'Meadow of flowers, kingdom of snow',
    blurb: 'A world-class ski resort in summer meadows, home to one of the highest gondolas on earth.',
    elevation: '2,650 m', image: img('snow', 1), gallery: g('snow'), coords: { lat: 34.05, lng: 74.38 }, mapPos: { x: 16, y: 46 },
    category: 'skiing', packageMatch: ['Gulmarg'],
    overview: [
      'Gulmarg is Kashmir’s crown jewel of adventure — a broad alpine bowl that turns from wildflower meadow in summer to one of Asia’s finest powder fields in winter.',
      'The Gulmarg Gondola climbs to nearly 4,000 m, opening high snowfields to skiers and sightseers alike, while gentler slopes and forest trails suit every pace.',
    ],
    highlights: [
      { icon: Snowflake, title: 'World-class skiing', desc: 'Legendary backcountry and groomed runs from December to March.' },
      { icon: Mountain, title: 'The Gondola', desc: 'Two stages to ~3,980 m — among the highest cable cars anywhere.' },
      { icon: Flower2, title: 'Summer meadows', desc: 'Wildflower slopes, golf and gentle rides once the snow melts.' },
    ],
    thingsToDo: ['Ride the Gulmarg Gondola to Apharwat', 'Ski or snowboard the famous powder', 'Play the world’s highest golf course', 'Walk or ride to Khilanmarg for the views'],
    activitySlugs: ['skiing', 'snowboarding', 'gondola-ride', 'horse-riding'],
    bestSeason: 'Dec – Mar (snow) · May – Sep (meadows)', bestSeasonNote: 'Come in winter for skiing, or summer for green meadows and mild walks.',
    weather: WX.alpine,
    culture: 'A high-altitude resort town with deep ties to Kashmiri pastoral life; Gujjar shepherds still graze the surrounding meadows in summer.',
    food: [
      { name: 'Kahwa', desc: 'Saffron-and-almond green tea — the perfect warm-up after the slopes.' },
      { name: 'Rogan Josh', desc: 'Aromatic Kashmiri lamb curry, rich and warming.' },
      { name: 'Harissa', desc: 'A slow-cooked winter meat porridge, a local cold-weather staple.' },
    ],
    nearbyAttractions: ['Khilanmarg meadow', 'Alpather Lake', 'St Mary’s Church'],
    nearbySlugs: ['srinagar', 'yusmarg', 'doodhpathri'],
    travelTips: ['Book gondola tickets early in peak season', 'Layer up — weather turns fast at altitude', 'Hire gear and guides locally through us', 'Acclimatise before strenuous activity'],
    faqs: [
      { q: 'When is the ski season?', a: 'Reliable snow runs from late December to March, peaking in January–February.' },
      { q: 'Is Gulmarg good for non-skiers?', a: 'Absolutely — the gondola, snow play, sledging and meadow walks suit everyone.' },
    ],
  },
  {
    slug: 'srinagar', name: 'Srinagar', region: 'Kashmir Valley', tagline: 'City of lakes and gardens',
    blurb: 'Houseboats, Mughal gardens and the shimmering Dal Lake — the soul of the valley.',
    elevation: '1,585 m', image: img('dawn', 1), gallery: g('dawn'), coords: { lat: 34.08, lng: 74.80 }, mapPos: { x: 30, y: 44 },
    category: 'kashmir', packageMatch: ['Srinagar', 'Dal'],
    overview: [
      'Srinagar is the valley’s beating heart — a lake city of cedar houseboats, floating gardens and centuries-old Mughal terraces.',
      'Glide across the Dal by shikara at dawn, wander the old city’s craft lanes, and use the city as the gateway to every corner of Kashmir.',
    ],
    highlights: [
      { icon: Waves, title: 'Dal Lake', desc: 'Shikara rides, houseboats and the famous floating vegetable market.' },
      { icon: Landmark, title: 'Mughal gardens', desc: 'Nishat, Shalimar and Chashme Shahi terraces above the lake.' },
      { icon: Sparkles, title: 'Old-city crafts', desc: 'Pashmina, papier-mâché and walnut wood from master artisans.' },
    ],
    thingsToDo: ['Take a dawn shikara across the Dal', 'Stay overnight on a heritage houseboat', 'Tour the Mughal gardens', 'Shop for pashmina and crafts in the old city'],
    activitySlugs: ['horse-riding', 'fishing'],
    bestSeason: 'Mar – Nov', bestSeasonNote: 'Spring for tulips, summer for gardens, autumn for chinars; winter is cold but magical.',
    weather: WX.valley,
    culture: 'A centuries-old centre of Kashmiri art, Sufi music and cuisine, where lake life and craft traditions still shape daily rhythms.',
    food: [
      { name: 'Wazwan', desc: 'The multi-course royal feast — rista, gushtaba and more.' },
      { name: 'Nadru Yakhni', desc: 'Lotus-stem in a delicate yoghurt gravy, a lake speciality.' },
      { name: 'Kahwa', desc: 'Fragrant saffron tea served everywhere, all day.' },
    ],
    nearbyAttractions: ['Hazratbal Shrine', 'Shankaracharya Hill', 'Pari Mahal'],
    nearbySlugs: ['gulmarg', 'pahalgam', 'sonamarg'],
    travelTips: ['Agree shikara rates before boarding', 'Book houseboats through trusted operators', 'Dawn is the calmest, most photogenic time on the Dal', 'Try a Wazwan with advance notice'],
    faqs: [
      { q: 'Is a houseboat stay worth it?', a: 'Yes — a night on a heritage houseboat is a quintessential Srinagar experience.' },
      { q: 'How do I get around?', a: 'Autos and cabs on land, shikaras on the water; we arrange private transfers.' },
    ],
  },
  {
    slug: 'pahalgam', name: 'Pahalgam', region: 'Kashmir Valley', tagline: 'Valley of shepherds',
    blurb: 'Pine forests, the rushing Lidder river and gateway to high-alpine treks.',
    elevation: '2,130 m', image: img('forest', 1), gallery: g('forest'), coords: { lat: 34.01, lng: 75.31 }, mapPos: { x: 40, y: 62 },
    category: 'kashmir', packageMatch: ['Pahalgam', 'Lidder'],
    overview: [
      'Pahalgam sits where pine forests meet the snow-fed Lidder, a laid-back base for riverside days and serious mountain adventures.',
      'It’s the trailhead for the Kashmir Great Lakes and a favourite for rafting, riding and simply breathing the mountain air.',
    ],
    highlights: [
      { icon: Waves, title: 'The Lidder river', desc: 'Grade II–III rafting and idyllic riverside picnics.' },
      { icon: TreePine, title: 'Betaab & Aru valleys', desc: 'Two of the most photogenic side-valleys in Kashmir.' },
      { icon: Mountain, title: 'Trek gateway', desc: 'The launch point for the Kashmir Great Lakes trek.' },
    ],
    thingsToDo: ['Raft the Lidder river', 'Drive to Betaab and Aru valleys', 'Ride ponies to Baisaran meadow', 'Start a multi-day alpine trek'],
    activitySlugs: ['river-rafting', 'camping', 'horse-riding', 'zipline'],
    bestSeason: 'Apr – Oct', bestSeasonNote: 'Summer for rafting and treks; autumn for golden forests.',
    weather: WX.valley,
    culture: 'A traditional shepherding valley and a stop on the Amarnath pilgrimage, blending pastoral life with a steady stream of visitors.',
    food: [
      { name: 'Trout', desc: 'Fresh-caught river trout, simply grilled.' },
      { name: 'Rogan Josh', desc: 'The classic Kashmiri lamb curry.' },
      { name: 'Kahwa', desc: 'Saffron tea by the river as the light fades.' },
    ],
    nearbyAttractions: ['Betaab Valley', 'Aru Valley', 'Chandanwari'],
    nearbySlugs: ['aharbal', 'srinagar', 'sonamarg'],
    travelTips: ['Book rafting through certified operators', 'Carry layers for cool river evenings', 'Side-valleys need a local taxi permit', 'Great base for a 2–3 night stay'],
    faqs: [
      { q: 'Is rafting safe for beginners?', a: 'Yes — the Lidder’s graded stretches are beginner-friendly with certified guides.' },
      { q: 'Can I trek from Pahalgam?', a: 'It’s the classic trailhead for the Kashmir Great Lakes and other routes.' },
    ],
  },
  {
    slug: 'sonamarg', name: 'Sonamarg', region: 'Kashmir Valley', tagline: 'Meadow of gold',
    blurb: 'Glaciers, alpine lakes and the last valley town before the road to Ladakh.',
    elevation: '2,800 m', image: img('glacier', 1), gallery: g('glacier'), coords: { lat: 34.30, lng: 75.29 }, mapPos: { x: 44, y: 36 },
    category: 'trekking', packageMatch: ['Sonamarg'],
    overview: [
      'Sonamarg — the “meadow of gold” — is a glacier-ringed basin of rushing streams and wildflowers, and the gateway to some of Kashmir’s best high-alpine trekking.',
      'It’s the last major stop before the Zoji La pass to Ladakh, and a base for Thajiwas glacier and the Great Lakes.',
    ],
    highlights: [
      { icon: Mountain, title: 'Thajiwas glacier', desc: 'A short pony ride or walk to a living glacier.' },
      { icon: TreePine, title: 'Alpine trailheads', desc: 'Gateway to Vishansar, Krishansar and the Great Lakes.' },
      { icon: Waves, title: 'Rivers & lakes', desc: 'Snow-fed streams perfect for trout and picnics.' },
    ],
    thingsToDo: ['Trek or ride to Thajiwas glacier', 'Start the Kashmir Great Lakes trek', 'Fish for trout in the Sindh river', 'Camp under alpine peaks'],
    activitySlugs: ['snow-trekking', 'camping', 'fishing', 'horse-riding'],
    bestSeason: 'May – Sep', bestSeasonNote: 'Roads and high trails open only in the warmer months.',
    weather: WX.alpine,
    culture: 'A seasonal alpine settlement, busy in summer with trekkers and Ladakh-bound travellers, and largely snowbound in winter.',
    food: [
      { name: 'Trout', desc: 'Sindh-river trout, a Sonamarg staple.' },
      { name: 'Kashmiri Pulao', desc: 'Fragrant rice with dried fruit and saffron.' },
      { name: 'Noon Chai', desc: 'Pink salt tea to warm the alpine chill.' },
    ],
    nearbyAttractions: ['Thajiwas Glacier', 'Zoji La Pass', 'Baltal'],
    nearbySlugs: ['srinagar', 'gulmarg', 'leh'],
    travelTips: ['Start glacier trips early in the day', 'Roads may close after heavy snow', 'Acclimatise before longer treks', 'Best combined with a Ladakh onward journey'],
    faqs: [
      { q: 'Is Sonamarg open in winter?', a: 'Access is limited by snow; it’s primarily a May–September destination.' },
      { q: 'How do I reach Thajiwas glacier?', a: 'A short pony ride or a gentle 2–3 km walk from the meadow.' },
    ],
  },
  {
    slug: 'doodhpathri', name: 'Doodhpathri', region: 'Kashmir Valley', tagline: 'Valley of milk',
    blurb: 'Untouched rolling meadows and milky streams, blissfully off the tourist trail.',
    elevation: '2,730 m', image: img('meadow', 1), gallery: g('meadow'), coords: { lat: 33.85, lng: 74.85 }, mapPos: { x: 22, y: 56 },
    category: 'kashmir', packageMatch: ['Doodhpathri'],
    overview: [
      'Doodhpathri is a quiet expanse of emerald meadows and frothing streams — its name, “valley of milk”, comes from the white rush of its waters.',
      'Far less visited than Gulmarg or Pahalgam, it rewards those seeking calm, space and unspoiled alpine scenery.',
    ],
    highlights: [
      { icon: Sprout, title: 'Rolling meadows', desc: 'Vast, soft pastures ideal for slow walks and picnics.' },
      { icon: Waves, title: 'Milky streams', desc: 'Fast, foaming brooks that give the valley its name.' },
      { icon: Tent, title: 'Peace & quiet', desc: 'One of the valley’s most tranquil, uncrowded escapes.' },
    ],
    thingsToDo: ['Picnic beside the streams', 'Ride ponies across the meadows', 'Walk to the higher pastures', 'Camp overnight under the stars'],
    activitySlugs: ['camping', 'horse-riding', 'mountain-biking'],
    bestSeason: 'Apr – Oct', bestSeasonNote: 'Green and accessible in the warmer months; snowbound in winter.',
    weather: WX.alpine,
    culture: 'A pastoral highland grazed by Gujjar and Bakarwal herders, with little commercial development — part of its charm.',
    food: [
      { name: 'Packed Wazwan', desc: 'Best to bring a picnic; options on-site are limited.' },
      { name: 'Kahwa', desc: 'Flask of saffron tea for the meadows.' },
      { name: 'Local bread', desc: 'Girda and lavasa from valley bakeries en route.' },
    ],
    nearbyAttractions: ['Tangnar meadows', 'Palmaidan', 'Mujpathri'],
    nearbySlugs: ['yusmarg', 'srinagar', 'gulmarg'],
    travelTips: ['Carry your own food and water', 'A day trip from Srinagar works well', 'Facilities are minimal — plan ahead', 'Best enjoyed slowly, without a packed schedule'],
    faqs: [
      { q: 'Is it a day trip?', a: 'Yes — it’s an easy day trip from Srinagar, or an overnight camp for the keen.' },
      { q: 'Are there hotels?', a: 'Very few; most visitors come for the day or camp with an operator.' },
    ],
  },
  {
    slug: 'yusmarg', name: 'Yusmarg', region: 'Kashmir Valley', tagline: 'Meadow of Jesus',
    blurb: 'Serene pine-fringed meadows and gentle trails, a peaceful day-trip favourite.',
    elevation: '2,400 m', image: img('meadow', 2), gallery: g('meadow'), coords: { lat: 33.83, lng: 74.66 }, mapPos: { x: 26, y: 60 },
    category: 'kashmir', packageMatch: ['Yusmarg'],
    overview: [
      'Yusmarg is a hushed meadow ringed by pine and snow peaks, long a quiet retreat for those in the know.',
      'Gentle trails lead to the Doodh Ganga river and Nilnag lake, making it a lovely, low-key alternative to the busier hill stations.',
    ],
    highlights: [
      { icon: TreePine, title: 'Pine meadows', desc: 'Soft pastures framed by fragrant conifer forest.' },
      { icon: Waves, title: 'Doodh Ganga', desc: 'A pretty river walk through the woods.' },
      { icon: Compass, title: 'Nilnag Lake', desc: 'A short hike to a serene alpine lake.' },
    ],
    thingsToDo: ['Walk to the Doodh Ganga river', 'Hike to Nilnag lake', 'Ride ponies across the meadow', 'Enjoy a quiet forest picnic'],
    activitySlugs: ['camping', 'horse-riding', 'snow-hiking'],
    bestSeason: 'Apr – Oct', bestSeasonNote: 'Lush in summer; light snow makes it pretty in early winter too.',
    weather: WX.alpine,
    culture: 'A tranquil grazing meadow with Gujjar shepherd roots, favoured by locals seeking calm close to Srinagar.',
    food: [
      { name: 'Picnic fare', desc: 'Bring your own; limited stalls on-site.' },
      { name: 'Kahwa', desc: 'Warm saffron tea for the pine-shaded air.' },
      { name: 'Kashmiri snacks', desc: 'Pick up bakery treats in nearby Charar-i-Sharief.' },
    ],
    nearbyAttractions: ['Nilnag Lake', 'Charar-i-Sharief shrine', 'Doodh Ganga'],
    nearbySlugs: ['doodhpathri', 'aharbal', 'srinagar'],
    travelTips: ['An easy day trip from Srinagar', 'Wear sturdy shoes for the trails', 'Carry snacks and water', 'Combine with Charar-i-Sharief en route'],
    faqs: [
      { q: 'How far is it from Srinagar?', a: 'About 1.5–2 hours by road — a comfortable day trip.' },
      { q: 'Is it good for families?', a: 'Yes — gentle meadows and short walks suit all ages.' },
    ],
  },
  {
    slug: 'gurez-valley', name: 'Gurez Valley', region: 'Kashmir Valley', tagline: 'Frontier of forgotten beauty',
    blurb: 'A remote high valley on the old Silk Route, wrapped around the Kishanganga river.',
    elevation: '2,400 m', image: img('dusk', 1), gallery: g('dusk'), coords: { lat: 34.63, lng: 74.83 }, mapPos: { x: 18, y: 12 },
    category: 'trekking', packageMatch: ['Gurez'],
    overview: [
      'Gurez is one of Kashmir’s most remote and dramatic valleys, opened to visitors only in recent years, set along the Kishanganga amid soaring peaks.',
      'Habba Khatoon peak presides over log-built Dard-Shin villages, offering a rare glimpse of frontier life and untouched scenery.',
    ],
    highlights: [
      { icon: Mountain, title: 'Habba Khatoon peak', desc: 'The valley’s iconic pyramid mountain.' },
      { icon: Waves, title: 'Kishanganga river', desc: 'Turquoise waters threading the valley floor.' },
      { icon: Sparkles, title: 'Dard-Shin culture', desc: 'Distinct log villages and a unique frontier heritage.' },
    ],
    thingsToDo: ['Photograph Habba Khatoon peak', 'Explore Dard-Shin log villages', 'Fish and picnic by the Kishanganga', 'Camp in pristine wilderness'],
    activitySlugs: ['camping', 'fishing', 'mountain-biking'],
    bestSeason: 'May – Sep', bestSeasonNote: 'Accessible only when the Razdan Pass is snow-free.',
    weather: WX.alpine,
    culture: 'Home to the Dard-Shin people, with their own language, log architecture and traditions — a living echo of the old Silk Route.',
    food: [
      { name: 'Local trout', desc: 'From the Kishanganga, simply prepared.' },
      { name: 'Maize bread', desc: 'A Gurezi staple, hearty and warming.' },
      { name: 'Noon Chai', desc: 'Salt tea against the mountain cold.' },
    ],
    nearbyAttractions: ['Habba Khatoon Peak', 'Tulail Valley', 'Razdan Pass'],
    nearbySlugs: ['sonamarg', 'srinagar', 'bangus-valley'],
    travelTips: ['Permits/ID may be required — we arrange these', 'Carry cash; connectivity is limited', 'Access depends on pass conditions', 'Best as a 2–3 day immersive trip'],
    faqs: [
      { q: 'Do I need a permit for Gurez?', a: 'Photo ID is required and conditions can change; we handle the formalities.' },
      { q: 'How remote is it?', a: 'Very — expect limited connectivity and basic but characterful stays.' },
    ],
  },
  {
    slug: 'bangus-valley', name: 'Bangus Valley', region: 'Kashmir Valley', tagline: 'The hidden saucer meadow',
    blurb: 'A vast, little-known bowl of grassland ringed by conifer ridges in far Kupwara.',
    elevation: '3,000 m', image: img('meadow', 3), gallery: g('meadow'), coords: { lat: 34.42, lng: 74.10 }, mapPos: { x: 10, y: 28 },
    category: 'kashmir', packageMatch: ['Bangus'],
    overview: [
      'Bangus is a spectacular saucer-shaped meadow — a wide grassland cradle rimmed by fir forest, still largely unknown to visitors.',
      'Split into Greater and Lesser Bangus, it’s a pristine expanse for walking, camping and simply soaking in the silence.',
    ],
    highlights: [
      { icon: Sprout, title: 'Saucer meadows', desc: 'A rare, vast bowl of open grassland.' },
      { icon: TreePine, title: 'Conifer rim', desc: 'Dense fir and pine ridges enclosing the valley.' },
      { icon: Tent, title: 'True wilderness', desc: 'Undeveloped and gloriously quiet.' },
    ],
    thingsToDo: ['Walk across the Greater Bangus meadow', 'Camp in untouched wilderness', 'Spot alpine birds and wildflowers', 'Ride to the forest edges'],
    activitySlugs: ['camping', 'horse-riding'],
    bestSeason: 'May – Sep', bestSeasonNote: 'Open and green only in the warmer months.',
    weather: WX.alpine,
    culture: 'A remote grazing ground in Kupwara near the frontier, visited by shepherds and, increasingly, intrepid travellers.',
    food: [
      { name: 'Camp meals', desc: 'Bring supplies; we cater fully on guided trips.' },
      { name: 'Kahwa', desc: 'Saffron tea for the crisp meadow air.' },
      { name: 'Local bread', desc: 'Stock up in Kupwara town en route.' },
    ],
    nearbyAttractions: ['Lesser Bangus', 'Rangwar', 'Chandigam'],
    nearbySlugs: ['lolab-valley', 'gurez-valley', 'srinagar'],
    travelTips: ['A guide is strongly recommended', 'Frontier area — carry ID', 'No facilities; come self-sufficient', 'Best experienced as a guided camp'],
    faqs: [
      { q: 'Is Bangus easy to reach?', a: 'It’s remote; the last stretch is rough and best done with a local guide and 4×4.' },
      { q: 'Can I camp there?', a: 'Yes — camping is the ideal way to experience Bangus, on a guided trip.' },
    ],
  },
  {
    slug: 'aharbal', name: 'Aharbal', region: 'Kashmir Valley', tagline: 'The Niagara of Kashmir',
    blurb: 'A thundering forest waterfall and a gateway to serene high-altitude lakes.',
    elevation: '2,266 m', image: img('forest', 4), gallery: g('forest'), coords: { lat: 33.60, lng: 74.85 }, mapPos: { x: 28, y: 70 },
    category: 'trekking', packageMatch: ['Aharbal'],
    overview: [
      'Aharbal is best known for its powerful waterfall, where the Veshaw river plunges through pine forest in a roar of white water.',
      'Beyond the falls lie trails to Kousarnag lake and quiet meadows, making it a fine base for gentle treks away from the crowds.',
    ],
    highlights: [
      { icon: Waves, title: 'Aharbal Falls', desc: 'A dramatic forest cascade, the valley’s signature sight.' },
      { icon: Mountain, title: 'Kousarnag trek', desc: 'A rewarding hike to a high alpine lake.' },
      { icon: TreePine, title: 'Pine forests', desc: 'Cool, fragrant woodland walks and picnic spots.' },
    ],
    thingsToDo: ['Watch the Aharbal waterfall', 'Trek towards Kousarnag lake', 'Picnic in the pine forest', 'Fish in the Veshaw river'],
    activitySlugs: ['camping', 'fishing', 'snow-trekking'],
    bestSeason: 'Apr – Oct', bestSeasonNote: 'The falls run strongest after the spring melt.',
    weather: WX.valley,
    culture: 'A forested pocket of south Kashmir, long a local picnic favourite and a quiet trailhead for higher routes.',
    food: [
      { name: 'Trout', desc: 'From the Veshaw river nearby.' },
      { name: 'Kashmiri snacks', desc: 'Grab local bakery treats en route.' },
      { name: 'Kahwa', desc: 'Warm saffron tea by the falls.' },
    ],
    nearbyAttractions: ['Kousarnag Lake', 'Kungwattan meadow', 'Veshaw river'],
    nearbySlugs: ['yusmarg', 'pahalgam', 'doodhpathri'],
    travelTips: ['Paths near the falls can be slippery', 'Go after the melt for the fullest flow', 'A day trip from Srinagar is feasible', 'Wear proper footwear for the trails'],
    faqs: [
      { q: 'Can I trek from Aharbal?', a: 'Yes — it’s the gateway to the Kousarnag lake trek and quiet meadows.' },
      { q: 'Is the waterfall accessible?', a: 'A viewing area is a short walk from the road; nearby paths can be slick.' },
    ],
  },
  {
    slug: 'lolab-valley', name: 'Lolab Valley', region: 'Kashmir Valley', tagline: 'The valley of love',
    blurb: 'A lush, orchard-filled valley of springs, forests and gentle village life.',
    elevation: '1,700 m', image: img('forest', 2), gallery: g('forest'), coords: { lat: 34.55, lng: 74.25 }, mapPos: { x: 14, y: 20 },
    category: 'kashmir', packageMatch: ['Lolab'],
    overview: [
      'Lolab is a green, gently rolling valley of rice fields, walnut groves and freshwater springs in far-north Kupwara.',
      'Ringed by dense forest and dotted with quiet villages, it offers an unhurried, deeply pastoral side of Kashmir.',
    ],
    highlights: [
      { icon: TreePine, title: 'Forests & orchards', desc: 'Walnut groves, pine woods and apple orchards.' },
      { icon: Waves, title: 'Freshwater springs', desc: 'Crystal springs like Lavnag and Kalaroos.' },
      { icon: Sparkles, title: 'Village life', desc: 'A window into traditional rural Kashmir.' },
    ],
    thingsToDo: ['Wander the orchard villages', 'Visit the Kalaroos springs and caves', 'Walk the forest trails', 'Picnic among the walnut groves'],
    activitySlugs: ['camping', 'fishing', 'mountain-biking'],
    bestSeason: 'Apr – Oct', bestSeasonNote: 'Greenest in summer; orchards blush in autumn.',
    weather: WX.valley,
    culture: 'A peaceful farming valley in Kupwara, known for its springs, folklore and warm village hospitality.',
    food: [
      { name: 'Walnuts', desc: 'Fresh from the valley’s famous groves.' },
      { name: 'Trout', desc: 'From the local streams.' },
      { name: 'Noon Chai', desc: 'Pink salt tea with village bread.' },
    ],
    nearbyAttractions: ['Kalaroos Caves', 'Lavnag Spring', 'Kalaroos'],
    nearbySlugs: ['bangus-valley', 'gurez-valley', 'srinagar'],
    travelTips: ['Combine with Bangus for a northern loop', 'Roads are quiet and rural — allow time', 'Respect village customs and privacy', 'Autumn brings beautiful orchard colour'],
    faqs: [
      { q: 'Is Lolab touristy?', a: 'Not at all — it’s a quiet, rural valley ideal for slow, immersive travel.' },
      { q: 'What’s the highlight?', a: 'The springs, walnut groves and gentle village life set among forests.' },
    ],
  },
  {
    slug: 'leh', name: 'Leh', region: 'Ladakh', tagline: 'Roof of the world',
    blurb: 'A high-desert town of monasteries and passes, the beating heart of Ladakh.',
    elevation: '3,500 m', image: img('desert', 1), gallery: g('desert'), coords: { lat: 34.15, lng: 77.58 }, mapPos: { x: 72, y: 52 },
    category: 'leh-ladakh', packageMatch: ['Leh', 'Ladakh'],
    overview: [
      'Leh is the gateway to Ladakh — a stark, luminous high-desert town where Tibetan Buddhist culture meets some of the world’s most dramatic mountain scenery.',
      'Whitewashed monasteries cling to ridges above the Indus, and every road out climbs to a legendary high pass.',
    ],
    highlights: [
      { icon: Landmark, title: 'Monasteries', desc: 'Thiksey, Hemis and Diskit perched above the valley.' },
      { icon: Mountain, title: 'High passes', desc: 'Khardung La and Chang La among the world’s highest roads.' },
      { icon: Sparkles, title: 'Tibetan culture', desc: 'Prayer flags, gompas and a deep Buddhist heritage.' },
    ],
    thingsToDo: ['Visit Thiksey and Hemis monasteries', 'Acclimatise with a walk to Leh Palace', 'Drive over Khardung La pass', 'Explore the old town bazaar'],
    activitySlugs: ['mountain-biking', 'camping'],
    bestSeason: 'Jun – Sep', bestSeasonNote: 'The high roads are reliably open only in the short summer.',
    weather: WX.ladakh,
    culture: 'The cultural capital of Ladakh, steeped in Tibetan Buddhism, with vibrant monastery festivals and a proud mountain identity.',
    food: [
      { name: 'Momos', desc: 'Steamed dumplings, the region’s beloved staple.' },
      { name: 'Thukpa', desc: 'Hearty noodle soup for cold high-desert nights.' },
      { name: 'Butter tea', desc: 'Salted, buttered tea that fuels life at altitude.' },
    ],
    nearbyAttractions: ['Thiksey Monastery', 'Shanti Stupa', 'Khardung La'],
    nearbySlugs: ['nubra-valley', 'pangong-lake', 'tso-moriri'],
    travelTips: ['Spend 2 days acclimatising before high passes', 'Hydrate and avoid alcohol on arrival', 'Carry Inner Line Permits — we arrange them', 'Cash is essential; ATMs are limited'],
    faqs: [
      { q: 'How do I handle the altitude?', a: 'Rest and hydrate for your first 24–48 hours; every itinerary builds this in.' },
      { q: 'When can I visit?', a: 'June to September is the reliable window for open roads and lakes.' },
    ],
  },
  {
    slug: 'nubra-valley', name: 'Nubra Valley', region: 'Ladakh', tagline: 'Valley of dunes and camels',
    blurb: 'Sand dunes, Bactrian camels and monasteries where two rivers meet the desert.',
    elevation: '3,050 m', image: img('desert', 2), gallery: g('desert'), coords: { lat: 34.70, lng: 77.55 }, mapPos: { x: 76, y: 36 },
    category: 'leh-ladakh', packageMatch: ['Nubra'],
    overview: [
      'Reached over the mighty Khardung La, Nubra is a surreal double-valley where cold-desert sand dunes meet green oasis villages.',
      'Ride a double-humped Bactrian camel at Hunder, visit Diskit’s giant Buddha, and sleep under staggering starfields.',
    ],
    highlights: [
      { icon: Sparkles, title: 'Hunder dunes', desc: 'Bactrian camel rides across silver sand.' },
      { icon: Landmark, title: 'Diskit Monastery', desc: 'A towering Maitreya Buddha above the valley.' },
      { icon: Mountain, title: 'Khardung La', desc: 'The dramatic high pass en route from Leh.' },
    ],
    thingsToDo: ['Ride a Bactrian camel at Hunder', 'Visit Diskit Monastery', 'Soak in Panamik hot springs', 'Stargaze from a desert camp'],
    activitySlugs: ['atv-ride', 'camping'],
    bestSeason: 'Jun – Sep', bestSeasonNote: 'Access is over Khardung La, open in summer only.',
    weather: WX.ladakh,
    culture: 'A Buddhist valley of oasis villages and monasteries, historically a caravan stop on the route to Central Asia.',
    food: [
      { name: 'Skyu', desc: 'A traditional Ladakhi pasta-and-vegetable stew.' },
      { name: 'Momos', desc: 'Steamed dumplings, everywhere and delicious.' },
      { name: 'Apricots', desc: 'Nubra’s famous fruit, fresh or dried.' },
    ],
    nearbyAttractions: ['Hunder Dunes', 'Diskit Monastery', 'Panamik hot springs'],
    nearbySlugs: ['leh', 'pangong-lake', 'tso-moriri'],
    travelTips: ['Permits required — we arrange them', 'Acclimatise in Leh first', 'Carry warm layers for cold nights', 'Fuel up in Leh; stations are scarce'],
    faqs: [
      { q: 'How do I get to Nubra?', a: 'By road from Leh over Khardung La, with an Inner Line Permit we arrange.' },
      { q: 'Are the camel rides ethical?', a: 'We work with operators who keep the Bactrian camels well cared for.' },
    ],
  },
  {
    slug: 'pangong-lake', name: 'Pangong Lake', region: 'Ladakh', tagline: 'The lake that changes colour',
    blurb: 'A vast, high-altitude lake whose waters shift from turquoise to deep blue.',
    elevation: '4,350 m', image: img('glacier', 3), gallery: g('glacier'), coords: { lat: 33.75, lng: 78.90 }, mapPos: { x: 88, y: 50 },
    category: 'leh-ladakh', packageMatch: ['Pangong'],
    overview: [
      'Pangong Tso is Ladakh’s most famous lake — a 130-km ribbon of water at 4,350 m that glows in impossible shades of blue against barren peaks.',
      'Straddling the India–China border, its shifting colours and vast silence make it one of the Himalaya’s most unforgettable sights.',
    ],
    highlights: [
      { icon: Waves, title: 'Shifting blues', desc: 'Waters that change hue through the day.' },
      { icon: Star, title: 'Night skies', desc: 'Some of the darkest, starriest skies on earth.' },
      { icon: Mountain, title: 'Chang La pass', desc: 'The high, dramatic route in from Leh.' },
    ],
    thingsToDo: ['Watch the lake change colour', 'Stargaze from a lakeside camp', 'Photograph the barren shoreline', 'Cross the high Chang La pass'],
    activitySlugs: ['camping'],
    bestSeason: 'Jun – Sep', bestSeasonNote: 'Summer offers the safest access and the bluest water.',
    weather: WX.highLake,
    culture: 'A sacred, sparsely inhabited high-altitude zone; the Changpa nomads graze pashmina goats on the surrounding plains.',
    food: [
      { name: 'Maggi & chai', desc: 'The classic lakeside camp warm-up.' },
      { name: 'Thukpa', desc: 'Noodle soup against the cold.' },
      { name: 'Butter tea', desc: 'Traditional fuel for high altitude.' },
    ],
    nearbyAttractions: ['Chang La Pass', 'Spangmik village', 'Merak'],
    nearbySlugs: ['leh', 'nubra-valley', 'tso-moriri'],
    travelTips: ['Camp overnight to catch dawn and stars', 'Altitude is serious — acclimatise fully first', 'Permits required; we handle them', 'Nights are freezing even in summer'],
    faqs: [
      { q: 'Can I stay overnight?', a: 'Yes — lakeside camps let you catch sunset, stars and sunrise; acclimatise first.' },
      { q: 'How high is Pangong?', a: 'About 4,350 m, so proper acclimatisation in Leh is essential.' },
    ],
  },
  {
    slug: 'tso-moriri', name: 'Tso Moriri', region: 'Ladakh', tagline: 'The remote jewel of Changthang',
    blurb: 'A serene, seldom-visited high lake ringed by snow peaks and nomad lands.',
    elevation: '4,522 m', image: img('glacier', 4), gallery: g('glacier'), coords: { lat: 32.90, lng: 78.30 }, mapPos: { x: 82, y: 70 },
    category: 'leh-ladakh', packageMatch: ['Tso Moriri', 'Moriri'],
    overview: [
      'Tso Moriri is Pangong’s quieter, wilder cousin — a pristine high-altitude lake deep in the Changthang plateau, far from the crowds.',
      'A protected wetland, it draws rare birds and Changpa nomads to its shores, wrapped in absolute Himalayan stillness.',
    ],
    highlights: [
      { icon: Waves, title: 'Pristine waters', desc: 'A protected, mirror-still high-altitude lake.' },
      { icon: Sparkles, title: 'Rare wildlife', desc: 'Bar-headed geese, black-necked cranes and kiangs.' },
      { icon: Tent, title: 'True remoteness', desc: 'One of Ladakh’s most peaceful, untouched corners.' },
    ],
    thingsToDo: ['Birdwatch along the shore', 'Visit Korzok village and monastery', 'Camp beneath snow peaks', 'Photograph the untouched plateau'],
    activitySlugs: ['camping'],
    bestSeason: 'Jun – Sep', bestSeasonNote: 'The long drive is only advisable in the summer months.',
    weather: WX.highLake,
    culture: 'A sacred lake of the Changthang, home to the Changpa nomads and the high monastery village of Korzok.',
    food: [
      { name: 'Camp meals', desc: 'Fully catered on guided trips; supplies are scarce.' },
      { name: 'Thukpa', desc: 'Warming noodle soup at altitude.' },
      { name: 'Butter tea', desc: 'A Changthang essential.' },
    ],
    nearbyAttractions: ['Korzok Monastery', 'Tso Kar lake', 'Changthang plateau'],
    nearbySlugs: ['pangong-lake', 'leh', 'nubra-valley'],
    travelTips: ['A long drive — plan a 2-day trip', 'Full acclimatisation is essential', 'Restricted area; permits arranged by us', 'Pack for sub-zero nights year-round'],
    faqs: [
      { q: 'How does it compare to Pangong?', a: 'Quieter, more remote and pristine — for travellers who want solitude.' },
      { q: 'Is it hard to reach?', a: 'It’s a long high-altitude drive from Leh; we plan it with proper acclimatisation.' },
    ],
  },
]

// ── Landing-page blocks ──────────────────────────────────────────────────────
export const featuredSlugs = ['gulmarg', 'srinagar', 'pahalgam', 'leh', 'pangong-lake', 'sonamarg']
export const popularExperienceSlugs = ['skiing', 'river-rafting', 'paragliding', 'gondola-ride']

export const seasonGuide = [
  { season: 'Spring', months: 'Mar – May', icon: Sprout, desc: 'Tulip blooms in Srinagar and orchards in colour across the valley.', bestFor: 'Gardens · blossoms · mild treks' },
  { season: 'Summer', months: 'Jun – Sep', icon: Sun, desc: 'Green meadows, open Ladakh roads and the full run of adventures.', bestFor: 'Ladakh · trekking · rafting' },
  { season: 'Autumn', months: 'Oct – Nov', icon: Leaf, desc: 'Golden chinars and crisp, clear light — the photographer’s season.', bestFor: 'Photography · culture · calm' },
  { season: 'Winter', months: 'Dec – Feb', icon: Snowflake, desc: 'World-class snow in Gulmarg and a serene, frozen valley.', bestFor: 'Skiing · snow play · quiet' },
]

export const whyVisit = [
  { icon: Mountain, title: 'Landscapes like nowhere else', desc: 'From alpine meadows to high-desert lakes, the variety is astonishing.' },
  { icon: Sparkles, title: 'Deep living culture', desc: 'Kashmiri craft and cuisine, Ladakhi Buddhism and warm hospitality.' },
  { icon: Snowflake, title: 'Every season delivers', desc: 'Powder in winter, blooms in spring, treks in summer, gold in autumn.' },
  { icon: ShieldCheck, title: 'Guided with care', desc: 'Local expertise and a safety-first ethos on every journey.' },
  { icon: Heart, title: 'Genuinely personal', desc: 'Small groups and itineraries shaped around how you travel.' },
  { icon: Users, title: 'For everyone', desc: 'Families, couples, thrill-seekers and slow travellers all find their pace.' },
]

export const faqs = [
  { q: 'When is the best time to visit Kashmir?', a: 'Every season has its charm: spring for blossoms, summer for meadows and Ladakh, autumn for golden light, and winter for snow. Tell us your interests and we’ll advise.' },
  { q: 'How many destinations can I combine in one trip?', a: 'Comfortably two to four in the valley in a week, or a Kashmir-plus-Ladakh loop over 10–12 days. We’ll pace it sensibly around travel times and altitude.' },
  { q: 'Do I need permits for Ladakh’s lakes and valleys?', a: 'Yes — Inner Line Permits for Nubra, Pangong and Tso Moriri. We arrange these before you arrive.' },
  { q: 'Are the remote valleys safe and accessible?', a: 'The regions we operate in are well-established; access to remote valleys depends on season and passes, which our guides monitor closely.' },
  { q: 'Can you build a trip around specific destinations?', a: 'Absolutely — every package is a starting point. Pick the places that call to you and we’ll craft the route.' },
]

// ── Helpers (pure; no component coupling) ────────────────────────────────────
export const getDestination = (slug) => destinations.find((d) => d.slug === slug)
export const featuredDestinations = featuredSlugs.map(getDestination).filter(Boolean)
export const kashmirDestinations = destinations.filter((d) => d.region === 'Kashmir Valley')
export const ladakhDestinations = destinations.filter((d) => d.region === 'Ladakh')
export const regions = ['Kashmir Valley', 'Ladakh']
