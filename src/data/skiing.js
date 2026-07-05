import {
  Sparkles, Gauge, Mountain, User, Users, Package, BedDouble,
} from 'lucide-react'

// Skiing & snowboarding group offerings — the hero product of the homepage.
export const skiingPrograms = [
  { id: 'beginner', icon: Sparkles, level: 'Beginner', title: 'First Tracks', desc: 'Gentle nursery slopes with patient instructors — for skiers finding their feet.', price: '6,500', unit: '/ day' },
  { id: 'intermediate', icon: Gauge, level: 'Intermediate', title: 'Blue Runs & Bowls', desc: 'Build confidence on longer descents and your first off-piste lines.', price: '8,500', unit: '/ day' },
  { id: 'advanced', icon: Mountain, level: 'Advanced', title: 'Backcountry Powder', desc: 'Guided descents on Apharwat with avalanche-trained mountain guides.', price: '12,000', unit: '/ day', featured: true },
  { id: 'private', icon: User, level: 'Lessons', title: 'Private Coaching', desc: 'One-to-one instruction paced entirely around you.', price: '9,000', unit: '/ day' },
  { id: 'group', icon: Users, level: 'Lessons', title: 'Group Lessons', desc: 'Small groups of up to six — learn together, progress faster.', price: '4,500', unit: '/ day' },
  { id: 'rental', icon: Package, level: 'Gear', title: 'Equipment Rental', desc: 'Premium skis, boards, boots and avalanche safety kit.', price: '2,000', unit: '/ day' },
  { id: 'hotel-ski', icon: BedDouble, level: 'Bundle', title: 'Hotel + Ski Package', desc: 'Four nights slope-side, lift passes, gear and daily instruction.', price: '58,000', unit: '/ 4 nights', featured: true },
]
