import {
  Snowflake, Sun, Leaf, Sprout, Mountain, MountainSnow, Waves,
  Landmark, Utensils, Users, Building2, Bird, Sunrise, Sunset,
  Camera, Compass, Plane,
} from 'lucide-react'
import { asset } from '@/lib/asset'

// ─────────────────────────────────────────────────────────────────────────────
// Gallery content. Photos, videos, categories, collections and FAQs all live
// here — no gallery content lives inside a component.
//
// A photo may cross-link to the rest of the site via `destination`, `package`
// and `activity` slugs. Those are resolved at render time against the existing
// data (destinationGuides / catalog / adventures), so a link can never go stale:
// if a slug is unknown it's simply not rendered.
//
// `span` drives the masonry: 'tall' | 'wide' | 'big' | undefined (regular).
// Swap the placeholder scene art for real photography by editing `src`.
// ─────────────────────────────────────────────────────────────────────────────

const img = (theme, n) => asset(`images/scenes/s-${theme}-${n}.svg`)
const ig = (n) => asset(`images/ig-${n}.svg`)

// The 19 filterable categories. `id` is what photos tag themselves with.
export const categories = [
  { id: 'winter', label: 'Winter', icon: Snowflake },
  { id: 'summer', label: 'Summer', icon: Sun },
  { id: 'autumn', label: 'Autumn', icon: Leaf },
  { id: 'spring', label: 'Spring', icon: Sprout },
  { id: 'skiing', label: 'Skiing', icon: Snowflake },
  { id: 'snowboarding', label: 'Snowboarding', icon: MountainSnow },
  { id: 'trekking', label: 'Trekking', icon: Compass },
  { id: 'adventure', label: 'Adventure Activities', icon: Mountain },
  { id: 'landscapes', label: 'Landscapes', icon: Camera },
  { id: 'lakes', label: 'Lakes', icon: Waves },
  { id: 'mountains', label: 'Mountains', icon: Mountain },
  { id: 'hotels', label: 'Hotels', icon: Building2 },
  { id: 'culture', label: 'Local Culture', icon: Landmark },
  { id: 'food', label: 'Food', icon: Utensils },
  { id: 'people', label: 'People', icon: Users },
  { id: 'drone', label: 'Drone Photography', icon: Plane },
  { id: 'sunrise', label: 'Sunrise', icon: Sunrise },
  { id: 'sunset', label: 'Sunset', icon: Sunset },
  { id: 'wildlife', label: 'Wildlife', icon: Bird },
]

export const photos = [
  { id: 'p01', src: img('snow', 1), span: 'big', caption: 'First light on the Apharwat ridge, untouched after a night of snowfall.', location: 'Apharwat, Gulmarg', photographer: 'Imran Bhat', categories: ['winter', 'skiing', 'mountains', 'landscapes', 'sunrise'], destination: 'gulmarg', package: 'ski-advanced', activity: 'skiing' },
  { id: 'p02', src: img('dawn', 1), span: 'tall', caption: 'A shikara cuts a clean line across the Dal before the city wakes.', location: 'Dal Lake, Srinagar', photographer: 'Aisha Kaul', categories: ['sunrise', 'lakes', 'landscapes', 'culture'], destination: 'srinagar', package: '5-days-kashmir' },
  { id: 'p03', src: img('snow', 2), caption: 'Deep powder turns below the gondola’s second stage.', location: 'Gulmarg', photographer: 'Imran Bhat', categories: ['winter', 'skiing', 'adventure'], destination: 'gulmarg', package: 'ski-intermediate', activity: 'skiing' },
  { id: 'p04', src: img('forest', 1), span: 'wide', caption: 'Pine shadows stretch across the Lidder’s bank in late afternoon.', location: 'Betaab Valley, Pahalgam', photographer: 'Rahul Menon', categories: ['summer', 'landscapes', 'mountains'], destination: 'pahalgam', package: '7-days-kashmir' },
  { id: 'p05', src: img('glacier', 3), span: 'tall', caption: 'Pangong shifts from turquoise to indigo as the afternoon light turns.', location: 'Pangong Tso, Ladakh', photographer: 'Tenzin Norbu', categories: ['lakes', 'landscapes', 'summer'], destination: 'pangong-lake', package: 'pangong-lake' },
  { id: 'p06', src: img('meadow', 1), caption: 'Wildflowers carpet the meadow after the last of the snowmelt.', location: 'Doodhpathri', photographer: 'Aisha Kaul', categories: ['spring', 'landscapes', 'mountains'], destination: 'doodhpathri', package: 'kashmir-family' },
  { id: 'p07', src: img('snow', 3), caption: 'A snowboarder drops into an empty bowl at first light.', location: 'Gulmarg', photographer: 'Imran Bhat', categories: ['winter', 'snowboarding', 'adventure'], destination: 'gulmarg', activity: 'snowboarding', package: 'ski-advanced' },
  { id: 'p08', src: img('desert', 1), span: 'wide', caption: 'Prayer flags snap above the Indus valley on the road to Leh.', location: 'Leh, Ladakh', photographer: 'Tenzin Norbu', categories: ['culture', 'landscapes', 'mountains'], destination: 'leh', package: 'leh-explorer' },
  { id: 'p09', src: img('glacier', 2), span: 'tall', caption: 'Roped up on the ridge, the valley opening below.', location: 'Khilanmarg', photographer: 'Rahul Menon', categories: ['winter', 'trekking', 'adventure', 'mountains'], destination: 'gulmarg', activity: 'snow-trekking', package: 'great-lakes-trek' },
  { id: 'p10', src: img('dusk', 1), caption: 'The Kishanganga runs turquoise beneath Habba Khatoon peak.', location: 'Gurez Valley', photographer: 'Aisha Kaul', categories: ['landscapes', 'summer', 'mountains'], destination: 'gurez-valley' },
  { id: 'p11', src: img('forest', 4), caption: 'Whitewater on the Lidder — the guide calls the line.', location: 'Lidder River, Pahalgam', photographer: 'Rahul Menon', categories: ['adventure', 'summer', 'people'], destination: 'pahalgam', activity: 'river-rafting', package: '7-days-kashmir' },
  { id: 'p12', src: img('dawn', 2), span: 'big', caption: 'Sunrise over the Mughal terraces, mist still on the water.', location: 'Nishat Bagh, Srinagar', photographer: 'Aisha Kaul', categories: ['sunrise', 'culture', 'landscapes'], destination: 'srinagar', package: 'kashmir-luxury' },
  { id: 'p13', src: img('meadow', 3), caption: 'A pony handler leads the trail to Baisaran meadow.', location: 'Aru Valley, Pahalgam', photographer: 'Rahul Menon', categories: ['people', 'summer', 'culture'], destination: 'pahalgam', activity: 'horse-riding' },
  { id: 'p14', src: img('desert', 2), span: 'wide', caption: 'Bactrian camels cross the cold-desert dunes at Hunder.', location: 'Nubra Valley, Ladakh', photographer: 'Tenzin Norbu', categories: ['landscapes', 'wildlife', 'summer'], destination: 'nubra-valley', package: 'nubra-valley' },
  { id: 'p15', src: img('dusk', 3), span: 'tall', caption: 'The last of the light on the snowfields above the tree line.', location: 'Gulmarg', photographer: 'Imran Bhat', categories: ['sunset', 'winter', 'mountains'], destination: 'gulmarg' },
  { id: 'p16', src: img('forest', 2), caption: 'A rider threads singletrack through the pines.', location: 'Yusmarg', photographer: 'Rahul Menon', categories: ['adventure', 'summer'], destination: 'yusmarg', activity: 'mountain-biking' },
  { id: 'p17', src: img('meadow', 2), caption: 'Camp set, kettle on, the meadow going gold.', location: 'Yusmarg', photographer: 'Aisha Kaul', categories: ['adventure', 'summer', 'landscapes'], destination: 'yusmarg', activity: 'camping', package: 'custom-trek' },
  { id: 'p18', src: img('glacier', 1), span: 'tall', caption: 'Meltwater braids across the Thajiwas glacier snout.', location: 'Sonamarg', photographer: 'Rahul Menon', categories: ['mountains', 'landscapes', 'trekking'], destination: 'sonamarg', package: 'great-lakes-trek' },
  { id: 'p19', src: img('dawn', 3), caption: 'Kahwa poured at dawn, saffron threads still turning.', location: 'Srinagar', photographer: 'Aisha Kaul', categories: ['food', 'culture'], destination: 'srinagar' },
  { id: 'p20', src: img('snow', 4), caption: 'A snow ATV throws a rooster tail across the frozen meadow.', location: 'Gulmarg', photographer: 'Imran Bhat', categories: ['winter', 'adventure'], destination: 'gulmarg', activity: 'snow-atv' },
  { id: 'p21', src: img('glacier', 4), span: 'big', caption: 'Tso Moriri, mirror-still, before the wind arrives.', location: 'Tso Moriri, Ladakh', photographer: 'Tenzin Norbu', categories: ['lakes', 'landscapes', 'drone'], destination: 'tso-moriri', package: 'tso-moriri' },
  { id: 'p22', src: img('forest', 3), caption: 'Autumn turns the chinar canopy to copper.', location: 'Pahalgam', photographer: 'Rahul Menon', categories: ['autumn', 'landscapes'], destination: 'pahalgam', package: '3-days-kashmir' },
  { id: 'p23', src: img('dusk', 2), caption: 'A fly line lays out over a cold, clear pool.', location: 'Daksum', photographer: 'Rahul Menon', categories: ['adventure', 'summer', 'people'], activity: 'fishing' },
  { id: 'p24', src: img('meadow', 4), span: 'wide', caption: 'The saucer meadow of Bangus, empty to the horizon.', location: 'Bangus Valley', photographer: 'Aisha Kaul', categories: ['landscapes', 'drone', 'summer'], destination: 'bangus-valley' },
  { id: 'p25', src: img('desert', 3), span: 'tall', caption: 'Monks cross the courtyard at Thiksey before morning prayers.', location: 'Thiksey, Ladakh', photographer: 'Tenzin Norbu', categories: ['culture', 'people'], destination: 'leh', package: 'leh-explorer' },
  { id: 'p26', src: img('snow', 1), caption: 'Cable cars climb into cloud on the second stage.', location: 'Gulmarg Gondola', photographer: 'Imran Bhat', categories: ['winter', 'adventure', 'mountains'], destination: 'gulmarg', activity: 'gondola-ride' },
  { id: 'p27', src: img('dawn', 4), caption: 'A houseboat’s cedar veranda catches the first sun.', location: 'Dal Lake, Srinagar', photographer: 'Aisha Kaul', categories: ['hotels', 'culture', 'sunrise'], destination: 'srinagar', package: 'kashmir-honeymoon' },
  { id: 'p28', src: img('forest', 1), caption: 'The Aharbal falls in full spring spate.', location: 'Aharbal', photographer: 'Rahul Menon', categories: ['spring', 'landscapes'], destination: 'aharbal' },
  { id: 'p29', src: img('dusk', 4), span: 'wide', caption: 'The valley floor glows as the sun drops behind Pir Panjal.', location: 'Pir Panjal range', photographer: 'Imran Bhat', categories: ['sunset', 'mountains', 'drone', 'landscapes'], destination: 'gulmarg' },
  { id: 'p30', src: img('glacier', 2), caption: 'Snowshoes break a fresh trail through silent forest.', location: 'Khilanmarg', photographer: 'Imran Bhat', categories: ['winter', 'trekking'], destination: 'gulmarg', activity: 'snow-hiking' },
  { id: 'p31', src: img('meadow', 1), span: 'tall', caption: 'A shepherd and his flock drift across the high pasture.', location: 'Doodhpathri', photographer: 'Aisha Kaul', categories: ['people', 'culture', 'summer'], destination: 'doodhpathri' },
  { id: 'p32', src: img('desert', 4), caption: 'A bar-headed goose lifts off the Changthang shallows.', location: 'Tso Moriri, Ladakh', photographer: 'Tenzin Norbu', categories: ['wildlife', 'lakes'], destination: 'tso-moriri' },
  { id: 'p33', src: img('snow', 2), caption: 'A luxury lodge glows against the blue hour snow.', location: 'Gulmarg', photographer: 'Imran Bhat', categories: ['hotels', 'winter'], destination: 'gulmarg', package: 'ski-hotel-package' },
  { id: 'p34', src: img('forest', 2), caption: 'Walnut groves and rice terraces in the valley of love.', location: 'Lolab Valley', photographer: 'Aisha Kaul', categories: ['autumn', 'landscapes', 'drone'], destination: 'lolab-valley' },
  { id: 'p35', src: img('dawn', 1), caption: 'Rogan josh and saffron rice, the wazwan begins.', location: 'Srinagar', photographer: 'Aisha Kaul', categories: ['food', 'culture'], destination: 'srinagar' },
  { id: 'p36', src: img('glacier', 3), span: 'big', caption: 'A paraglider banks over the ridge, the valley a patchwork below.', location: 'Sanasar', photographer: 'Rahul Menon', categories: ['adventure', 'drone', 'summer'], activity: 'paragliding' },
  { id: 'p37', src: img('dusk', 1), caption: 'Tents lit from within under a spill of stars.', location: 'Pangong Tso, Ladakh', photographer: 'Tenzin Norbu', categories: ['adventure', 'lakes'], destination: 'pangong-lake', activity: 'camping', package: 'pangong-lake' },
  { id: 'p38', src: img('meadow', 3), caption: 'Tulips in their tens of thousands beneath Zabarwan.', location: 'Tulip Garden, Srinagar', photographer: 'Aisha Kaul', categories: ['spring', 'landscapes'], destination: 'srinagar', package: 'kashmir-budget' },
  { id: 'p39', src: img('forest', 3), span: 'tall', caption: 'A red fox pauses at the forest edge, first snow falling.', location: 'Pahalgam', photographer: 'Rahul Menon', categories: ['wildlife', 'winter'], destination: 'pahalgam' },
  { id: 'p40', src: img('desert', 1), caption: 'Switchbacks stack toward Khardung La, thin air and thinner road.', location: 'Khardung La, Ladakh', photographer: 'Tenzin Norbu', categories: ['mountains', 'drone', 'landscapes'], destination: 'nubra-valley', package: 'ladakh-bike-tour' },
]

// Featured collections — curated sets, each pointing at a category filter.
export const collections = [
  { id: 'winter-light', title: 'Winter Light', desc: 'Powder, blue hour and the quiet after snowfall.', cover: img('snow', 2), count: photos.filter((p) => p.categories.includes('winter')).length, filter: 'winter' },
  { id: 'high-lakes', title: 'The High Lakes', desc: 'Pangong, Tso Moriri and the water that changes colour.', cover: img('glacier', 3), count: photos.filter((p) => p.categories.includes('lakes')).length, filter: 'lakes' },
  { id: 'living-culture', title: 'A Living Culture', desc: 'Craft, kitchens, monasteries and the people who keep them.', cover: img('desert', 3), count: photos.filter((p) => p.categories.includes('culture')).length, filter: 'culture' },
  { id: 'from-above', title: 'From Above', desc: 'The valley as only a drone can frame it.', cover: img('dusk', 4), count: photos.filter((p) => p.categories.includes('drone')).length, filter: 'drone' },
]

// Popular moments — the shots guests ask us about most.
export const popularIds = ['p01', 'p05', 'p12', 'p21', 'p29', 'p36']

// Videos. `poster` is a still; `duration` is display-only. `href` would carry a
// real embed/stream URL — kept null here so nothing points at a dead player.
export const videos = [
  { id: 'v1', title: 'Gulmarg from the air', kind: 'Drone footage', duration: '2:14', poster: img('snow', 1), location: 'Gulmarg', href: null },
  { id: 'v2', title: 'First tracks, Apharwat', kind: 'Skiing videos', duration: '3:02', poster: img('snow', 3), location: 'Apharwat', href: null },
  { id: 'v3', title: 'Rafting the Lidder', kind: 'Adventure videos', duration: '1:48', poster: img('forest', 4), location: 'Pahalgam', href: null },
  { id: 'v4', title: 'Ladakh in ten days', kind: 'Travel reels', duration: '4:26', poster: img('desert', 1), location: 'Leh · Nubra · Pangong', href: null },
  { id: 'v5', title: 'Above the high lakes', kind: 'Drone footage', duration: '2:51', poster: img('glacier', 3), location: 'Pangong Tso', href: null },
  { id: 'v6', title: 'A morning on the Dal', kind: 'Travel reels', duration: '1:35', poster: img('dawn', 1), location: 'Srinagar', href: null },
]

export const videoKinds = ['Drone footage', 'Adventure videos', 'Skiing videos', 'Travel reels']

// Instagram strip — uses the existing ig-*.svg assets.
export const instagram = {
  handle: '@adventureskashmir',
  posts: [1, 2, 3, 4, 5, 6].map((n) => ({ id: `ig${n}`, src: ig(n), alt: `Instagram post ${n}` })),
}

export const faqs = [
  { q: 'Can I use these photographs?', a: 'They’re the work of our guides and guest photographers, so they’re protected. Downloads are disabled, but write to us and we’re usually happy to license an image or share the original with the guest who appears in it.' },
  { q: 'Are these real, unedited locations?', a: 'Every frame was taken on a trip we ran, at the location tagged on the image. We colour-grade, but we don’t composite skies or move mountains.' },
  { q: 'Can I book the exact trip in a photo?', a: 'Yes — most images link straight to the destination, adventure or package they were shot on. Follow the links in the photo detail panel.' },
  { q: 'Will you photograph my trip?', a: 'We can arrange a photographer or drone operator for most itineraries, subject to permits in restricted areas. Ask us when you plan your trip.' },
  { q: 'Do you fly drones everywhere?', a: 'No. Drone flights need permission in much of Kashmir and Ladakh, and are prohibited near airports, military zones and some monasteries. We only fly where it is permitted.' },
]

// ── Helpers (pure; no component coupling) ────────────────────────────────────
export const getPhoto = (id) => photos.find((p) => p.id === id)
export const getCategory = (id) => categories.find((c) => c.id === id)
export const popularPhotos = popularIds.map(getPhoto).filter(Boolean)
export const dronePhotos = photos.filter((p) => p.categories.includes('drone'))
export const photosByCategory = (id) => (id === 'all' ? photos : photos.filter((p) => p.categories.includes(id)))
// Only categories that actually have photos are offered as filters.
export const activeCategories = categories.filter((c) => photos.some((p) => p.categories.includes(c.id)))
