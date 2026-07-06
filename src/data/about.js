import {
  ShieldCheck, LifeBuoy, Umbrella, Users, Snowflake, Radio,
  Compass, Telescope,
} from 'lucide-react'
import { asset } from '@/lib/asset'

// ─────────────────────────────────────────────────────────────────────────────
// About-page content. Everything the About page renders lives here, so copy,
// team members, milestones and numbers can be edited without touching a single
// component. Swap the placeholder scene art for real photography by changing the
// image paths (drop files in /public/images and update the asset(...) calls).
// ─────────────────────────────────────────────────────────────────────────────

export const about = {
  hero: {
    eyebrow: 'About us',
    title: 'Locally rooted, quietly ambitious',
    lead: 'We are a small team of Kashmiri guides, ski instructors and planners crafting premium journeys through the Himalaya — with the safety, comfort and care of the world’s finest mountain outfitters.',
    image: asset('images/scenes/s-dawn-2.svg'),
  },

  story: {
    eyebrow: 'Our story',
    title: 'Born on the slopes we call home',
    image: asset('images/scenes/s-forest-2.svg'),
    paragraphs: [
      'AdventuresKashmir began with a simple frustration: the valley we grew up in — its powder bowls, alpine lakes and golden chinars — was too often sold as a checklist, rushed and impersonal.',
      'So in 2013 a handful of certified guides set out to do it differently. We built a company around the mountains we know by name, the families who host our guests, and a standard of hospitality that treats every traveller as our own.',
      'A decade on, we still guide many trips ourselves — because the best way to protect a place is to share it, carefully.',
    ],
  },

  whoWeAre: {
    eyebrow: 'Who we are',
    title: 'Guides first, a company second',
    image: asset('images/scenes/s-glacier-2.svg'),
    paragraphs: [
      'Every member of our team is from the region and trained to international standards — in mountaineering, ski instruction, wilderness first aid and, above all, reading the mountain.',
      'We stay deliberately small so the person planning your trip is close to the people delivering it. No call centres, no handoffs — just a team that answers to its own name on the trail.',
    ],
  },

  mission: 'To share the Himalaya of Kashmir and Ladakh through journeys that are safe, unhurried and genuinely personal — leaving our guests transformed and our mountains better cared for than we found them.',
  vision: 'To be the most trusted name in Himalayan adventure travel: the outfitter discerning travellers recommend to the people they love most.',

  team: [
    { name: 'Imran Wani', role: 'Founder & Lead Guide', bio: 'IFMGA-track mountain guide with 15 seasons across Gulmarg and the Great Lakes. Started the company from a single houseboat.' },
    { name: 'Sara Bhat', role: 'Head of Skiing', bio: 'IASI Level 4 instructor and avalanche-safety lead. Coaches everyone from first-timers to backcountry veterans.' },
    { name: 'Bilal Khan', role: 'Expedition & Trek Lead', bio: 'Ladakh high-altitude specialist. Has crossed every major pass in the region — usually before breakfast.' },
    { name: 'Ayesha Mir', role: 'Guest Experience', bio: 'The voice behind every itinerary and late-night WhatsApp. Makes sure nothing is left to chance.' },
  ],

  stats: [
    { value: 8000, suffix: '+', label: 'Happy travellers' },
    { value: 20, suffix: '+', label: 'Countries hosted' },
    { value: 12, suffix: ' yrs', label: 'Guiding the valley' },
    { value: 49, divisor: 10, suffix: '★', label: 'Average guest rating' },
  ],

  timeline: [
    { year: '2013', title: 'The first season', desc: 'Four certified guides and one houseboat on Dal Lake. A promise to do Kashmir slowly and properly.' },
    { year: '2016', title: 'Ski school opens', desc: 'Certified instruction arrives in Gulmarg, from nervous first turns to Asia’s finest backcountry.' },
    { year: '2018', title: 'Over the passes', desc: 'We extend into Leh–Ladakh with fully acclimatised, oxygen-supported high-altitude expeditions.' },
    { year: '2021', title: 'Safety, formalised', desc: 'Wilderness first-aid, avalanche and rescue protocols accredited across the whole guiding team.' },
    { year: '2024', title: '8,000 guests in', desc: 'Travellers from 20+ countries, a 4.9 average rating, and the same small team on the trail.' },
  ],

  safety: [
    { icon: ShieldCheck, title: 'Certified guides', desc: 'Every guide is mountain-certified and trained to international standards for the terrain they lead.' },
    { icon: LifeBuoy, title: 'First-aid & rescue', desc: 'Wilderness first-aid and rescue training across the team, with kits carried on every departure.' },
    { icon: Umbrella, title: 'Fully insured', desc: 'Comprehensive operator cover, and we help arrange the right travel and evacuation insurance for you.' },
    { icon: Users, title: 'Small group ratios', desc: 'Deliberately low guide-to-guest ratios so no one is ever out of sight on serious ground.' },
    { icon: Snowflake, title: 'Quality equipment', desc: 'Maintained, season-appropriate gear — from avalanche safety kit to well-serviced vehicles.' },
    { icon: Radio, title: '24/7 support line', desc: 'A real person on call for the length of your journey, and a staffed on-trip emergency line.' },
  ],

  purpose: { mission: { icon: Compass }, vision: { icon: Telescope } },
}
