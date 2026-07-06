// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for site-wide content that appears in more than one
// place (nav, footer, top bar). Editing a phone number or adding a nav item is
// a one-line change here — no hunting through components. When a CMS is added
// later, this file is the natural seam to replace with fetched data.
// ─────────────────────────────────────────────────────────────────────────────

import {
  Phone,
  Mail,
  MessageCircle,
  Star,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react'

export const site = {
  name: 'AdventuresKashmir',
  tagline: 'Premium Himalayan Adventures',
  contact: {
    phone: '+91 194 000 0000',
    whatsapp: '+91 90000 00000',
    email: 'hello@adventureskashmir.com',
    address: 'Boulevard Road, Dal Lake, Srinagar, J&K 190001',
  },
}

// Primary navigation — order matters and is reused by Navbar + Footer.
export const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Packages', to: '/packages' },
  { label: 'Adventures', to: '/adventures' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Contact', to: '/contact' },
]

// Contact channels shown in the top information bar.
export const contactBar = [
  { label: 'Call us', value: site.contact.phone, href: `tel:${site.contact.phone.replace(/\s/g, '')}`, icon: Phone },
  { label: 'WhatsApp', value: 'WhatsApp', href: `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}`, icon: MessageCircle },
  { label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}`, icon: Mail },
]

// Review / social platforms (top bar + footer). `kind` lets us style groups.
export const socialLinks = [
  { label: 'Google Reviews', href: '#', icon: Star, kind: 'review' },
  { label: 'TripAdvisor', href: '#', icon: MapPin, kind: 'review' },
  { label: 'Facebook', href: '#', icon: Facebook, kind: 'social' },
  { label: 'Instagram', href: '#', icon: Instagram, kind: 'social' },
  { label: 'LinkedIn', href: '#', icon: Linkedin, kind: 'social' },
  { label: 'YouTube', href: '#', icon: Youtube, kind: 'social' },
]

// Footer link columns. Keeping these declarative keeps the Footer JSX tiny.
export const footerColumns = [
  {
    title: 'Explore',
    links: [
      { label: 'Packages', to: '/packages' },
      { label: 'Adventure Activities', to: '/adventures' },
      { label: 'Destinations', to: '/destinations' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Blogs', to: '/blogs' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'FAQs', to: '/faq' },
      { label: 'Policies', to: '/contact#policies' },
    ],
  },
]
