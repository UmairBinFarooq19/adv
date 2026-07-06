import { useState } from 'react'
import { Phone, MessageCircle, PhoneCall, ShieldCheck, BadgeCheck, Clock } from 'lucide-react'
import Button from '@/components/ui/Button'
import { site } from '@/data/site'
import { formatPrice } from '@/data/catalog'
import { useInquiry } from '@/store/InquiryContext'
import { packageWhatsApp } from '@/lib/whatsapp'

// Sticky booking summary for the details page. "Book" and "Request callback"
// open the global inquiry modal (pre-filled with this package); WhatsApp uses
// the chosen date/guests for a richer pre-filled message. Reusable via `pkg`.
const trust = [
  { icon: ShieldCheck, text: 'Free changes up to 15 days before' },
  { icon: BadgeCheck, text: 'Best-price promise — no hidden costs' },
  { icon: Clock, text: 'Fast confirmation, usually same day' },
]

export default function BookingSidebar({ pkg }) {
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState('2')
  const { openInquiry } = useInquiry()
  const tel = `tel:${site.contact.phone.replace(/\s/g, '')}`
  const field = 'w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400'

  return (
    <div className="rounded-3xl border border-line bg-surface p-6 shadow-lift">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted">from</span>
        <span className="text-xs text-muted">{pkg.duration}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-3xl font-semibold text-pine-900">{formatPrice(pkg.priceFrom)}</span>
        <span className="text-sm text-muted">/ person</span>
      </div>

      <div className="mt-5 space-y-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Preferred date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={field} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Travellers</span>
          <select value={guests} onChange={(e) => setGuests(e.target.value)} className={field}>
            {['1', '2', '3', '4', '5', '6+'].map((n) => (
              <option key={n} value={n}>{n} {n === '1' ? 'traveller' : 'travellers'}</option>
            ))}
          </select>
        </label>
        <Button variant="primary" size="lg" className="w-full" onClick={() => openInquiry(pkg)}>Book this trip</Button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button href={packageWhatsApp(pkg, { date, guests })} variant="outline" size="md" className="w-full">
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </Button>
        <Button href={tel} variant="outline" size="md" className="w-full">
          <Phone className="h-4 w-4" /> Call
        </Button>
      </div>
      <Button variant="ghost" size="md" className="mt-2 w-full" onClick={() => openInquiry(pkg, 'callback')}>
        <PhoneCall className="h-4 w-4" /> Request a callback
      </Button>

      <ul className="mt-5 space-y-2 border-t border-line pt-4">
        {trust.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2.5 text-sm text-muted">
            <Icon className="h-4 w-4 shrink-0 text-saffron-600" aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </div>
  )
}
