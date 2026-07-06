import { Phone, Mail, MapPin, MessageCircle, Clock, LifeBuoy } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import { Section } from '@/components/ui'
import Button from '@/components/ui/Button'
import InquiryForm from '@/components/inquiry/InquiryForm'
import { site } from '@/data/site'
import { generalWhatsApp } from '@/lib/whatsapp'
import { useSeo } from '@/lib/seo'

const tel = `tel:${site.contact.phone.replace(/\s/g, '')}`
const hours = [
  { day: 'Monday – Saturday', time: '9:00 AM – 8:00 PM IST' },
  { day: 'Sunday', time: '10:00 AM – 5:00 PM IST' },
  { day: 'Public holidays', time: 'On call' },
]

export default function Contact() {
  useSeo({
    title: 'Contact',
    description: 'Plan your Kashmir or Ladakh trip. Call, WhatsApp or email us, or send an inquiry — we usually reply the same day.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: site.name,
      email: site.contact.email,
      telephone: site.contact.phone,
      address: { '@type': 'PostalAddress', streetAddress: site.contact.address },
    },
  })

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let’s plan your trip" lead="Tell us how you like to travel — we usually reply within a day." />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Form */}
          <div>
            <h2 className="font-display text-2xl font-semibold text-pine-900">Send us an inquiry</h2>
            <p className="mt-2 text-muted">Share a few details and we’ll craft a tailored plan and quote.</p>
            <div className="mt-6 rounded-3xl border border-line bg-surface p-6 shadow-soft sm:p-8">
              <InquiryForm />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <a href={tel} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 shadow-soft transition-colors hover:border-pine-300">
                <Phone className="h-5 w-5 shrink-0 text-saffron-600" aria-hidden="true" />
                <span><span className="block text-xs uppercase tracking-wider text-muted">Call</span><span className="font-semibold text-pine-900">{site.contact.phone}</span></span>
              </a>
              <a href={generalWhatsApp()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 shadow-soft transition-colors hover:border-pine-300">
                <MessageCircle className="h-5 w-5 shrink-0 text-[#25D366]" aria-hidden="true" />
                <span><span className="block text-xs uppercase tracking-wider text-muted">WhatsApp</span><span className="font-semibold text-pine-900">Chat with us</span></span>
              </a>
              <a href={`mailto:${site.contact.email}`} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 shadow-soft transition-colors hover:border-pine-300">
                <Mail className="h-5 w-5 shrink-0 text-saffron-600" aria-hidden="true" />
                <span><span className="block text-xs uppercase tracking-wider text-muted">Email</span><span className="font-semibold text-pine-900 break-all">{site.contact.email}</span></span>
              </a>
              <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 shadow-soft">
                <MapPin className="h-5 w-5 shrink-0 text-saffron-600" aria-hidden="true" />
                <span><span className="block text-xs uppercase tracking-wider text-muted">Office</span><span className="font-semibold text-pine-900">{site.contact.address}</span></span>
              </div>
            </div>

            {/* Business hours */}
            <div className="rounded-2xl border border-line bg-surface p-6 shadow-soft">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-pine-900"><Clock className="h-5 w-5 text-saffron-600" /> Business hours</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4"><span className="text-muted">{h.day}</span><span className="font-medium text-pine-900">{h.time}</span></li>
                ))}
              </ul>
            </div>

            {/* Emergency */}
            <div className="rounded-2xl border border-saffron-300 bg-saffron-50 p-6">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-pine-900"><LifeBuoy className="h-5 w-5 text-saffron-600" /> On-trip emergency line</h3>
              <p className="mt-2 text-sm text-pine-800">Travelling with us and need urgent help? Our support line is staffed 24/7 during your trip.</p>
              <Button href={tel} variant="primary" size="md" className="mt-4"><Phone className="h-4 w-4" /> {site.contact.phone}</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Map */}
      <Section tone="surface" className="pt-0">
        <h2 className="sr-only">Our location</h2>
        <div className="overflow-hidden rounded-3xl border border-line shadow-soft">
          <iframe
            title="AdventuresKashmir office location — Dal Lake, Srinagar"
            src="https://maps.google.com/maps?q=Dal%20Lake%2C%20Srinagar&t=&z=12&ie=UTF8&iwloc=&output=embed"
            className="h-[360px] w-full sm:h-[440px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Section>
    </>
  )
}
