import { site } from '@/data/site'

// One place that knows how to build WhatsApp deep links. Pre-filled messages are
// generated from package data so every "WhatsApp" button is consistent.
const NUMBER = site.contact.whatsapp.replace(/\D/g, '')

export function waLink(message) {
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(message)}`
}

// Pre-filled enquiry for a specific package (optionally with date/guests).
export function packageWhatsApp(pkg, { date = '', guests = '' } = {}) {
  const msg =
    `Hello AdventuresKashmir,\n\n` +
    `I am interested in the ${pkg.title}.\n\n` +
    `Travel Date: ${date}\n` +
    `Number of Guests: ${guests}\n\n` +
    `Please share the complete itinerary.`
  return waLink(msg)
}

export function generalWhatsApp(text) {
  return waLink(text || 'Hello AdventuresKashmir, I would like to plan a trip. Could you help?')
}
