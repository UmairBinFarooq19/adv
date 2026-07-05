import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check, CalendarRange, Users, Wallet, MapPin, Sparkles, BedDouble, Car,
  CheckCircle2, MessageCircle, Mail, RotateCcw,
} from 'lucide-react'
import Container from '@/components/ui/Container'
import { Section } from '@/components/ui'
import Button from '@/components/ui/Button'
import PackageHero from '@/components/packages/PackageHero'
import { cn } from '@/lib/cn'
import { site } from '@/data/site'
import { scene } from '@/data/catalog/_shared'
import { useSeo } from '@/lib/seo'
import { fadeUp } from '@/lib/motion'

// Declarative option lists — the whole form is driven by these arrays.
const DESTINATIONS = ['Srinagar', 'Gulmarg', 'Pahalgam', 'Sonamarg', 'Yusmarg', 'Leh', 'Nubra', 'Pangong', 'Tso Moriri']
const ACTIVITIES = ['Sightseeing', 'Houseboat stay', 'Skiing', 'Trekking', 'Camping', 'Golf', 'Shikara ride', 'Photography']
const BUDGETS = ['Under ₹25k', '₹25k–50k', '₹50k–1L', '₹1L+']
const HOTELS = ['Budget', 'Comfort (3★)', 'Premium (4★)', 'Luxury (5★)']
const TRANSPORT = ['Sedan', 'SUV', 'Tempo Traveller', 'Motorcycle']

const breadcrumbs = [{ label: 'Home', to: '/' }, { label: 'Packages', to: '/packages' }, { label: 'Custom' }]

function Chip({ active, children, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-2 text-sm transition-all duration-200 ease-premium',
        active ? 'border-pine-800 bg-pine-800 text-white shadow-soft' : 'border-line bg-background text-pine-800 hover:border-pine-300 hover:bg-white',
      )}
    >
      {children}
    </button>
  )
}

function Field({ icon: Icon, label, children }) {
  return (
    <fieldset>
      <legend className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-pine-900">
        <Icon className="h-5 w-5 text-saffron-600" aria-hidden="true" />{label}
      </legend>
      {children}
    </fieldset>
  )
}

export default function CustomPackages() {
  const [form, setForm] = useState({
    start: '', end: '', travellers: '2', budget: BUDGETS[1],
    destinations: [], activities: [], hotel: HOTELS[1], transport: TRANSPORT[1],
    name: '', email: '', phone: '', notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))
  const toggleArr = (k, v) =>
    setForm((f) => ({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) {
      setError('Please add your name and email so we can send your itinerary.')
      return
    }
    setError('')
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const reset = () => {
    setSubmitted(false)
    setForm({ start: '', end: '', travellers: '2', budget: BUDGETS[1], destinations: [], activities: [], hotel: HOTELS[1], transport: TRANSPORT[1], name: '', email: '', phone: '', notes: '' })
  }

  useSeo({
    title: 'Build a Custom Package',
    description: 'Design your own Kashmir or Ladakh trip — pick your dates, destinations, activities, stays and transport, and get a tailored itinerary and quote.',
    image: scene('dawn', 3),
  })

  const summaryText = encodeURIComponent(
    `Custom trip request\n` +
    `Name: ${form.name}\nDates: ${form.start || 'flexible'}${form.end ? ' → ' + form.end : ''}\n` +
    `Travellers: ${form.travellers}\nBudget: ${form.budget}\n` +
    `Destinations: ${form.destinations.join(', ') || 'open to suggestions'}\n` +
    `Activities: ${form.activities.join(', ') || 'open to suggestions'}\n` +
    `Hotel: ${form.hotel}\nTransport: ${form.transport}`,
  )
  const wa = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}?text=${summaryText}`
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent('Custom trip request')}&body=${summaryText}`

  const field = 'w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400'

  return (
    <>
      <PackageHero
        image={scene('dawn', 3)}
        eyebrow="Custom packages"
        title="Design your own journey"
        intro="Tell us how you like to travel and we’ll craft a private itinerary and quote around it — no templates, no compromises."
        breadcrumbs={breadcrumbs}
      />

      <Section>
        <Container className="max-w-4xl px-0">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-3xl border border-line bg-surface p-8 shadow-lift sm:p-10">
                <div className="flex items-center gap-3 text-glacier-700">
                  <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
                  <h2 className="font-display text-2xl font-semibold text-pine-900">Your trip request is ready</h2>
                </div>
                <p className="mt-3 text-muted">
                  Thanks, {form.name.split(' ')[0]}! Here’s a summary of what you’ve designed. Send it over and a trip specialist will reply, usually the same day, with a tailored itinerary and exact quote.
                </p>

                <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                  {[
                    ['Travel dates', form.start ? `${form.start}${form.end ? ` → ${form.end}` : ''}` : 'Flexible'],
                    ['Travellers', form.travellers],
                    ['Budget (per person)', form.budget],
                    ['Hotel category', form.hotel],
                    ['Transport', form.transport],
                    ['Destinations', form.destinations.join(', ') || 'Open to suggestions'],
                    ['Activities', form.activities.join(', ') || 'Open to suggestions'],
                    ...(form.notes ? [['Notes', form.notes]] : []),
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{k}</dt>
                      <dd className="mt-1 text-pine-900">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={wa} variant="primary" size="lg"><MessageCircle className="h-4 w-4" /> Send on WhatsApp</Button>
                  <Button href={mailto} variant="outline" size="lg"><Mail className="h-4 w-4" /> Email request</Button>
                  <Button variant="ghost" size="lg" onClick={reset}><RotateCcw className="h-4 w-4" /> Start over</Button>
                </div>
                <p className="mt-4 text-xs text-muted">This builder runs entirely in your browser — nothing is sent until you choose WhatsApp or email.</p>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field icon={CalendarRange} label="Travel dates">
                    <div className="grid grid-cols-2 gap-3">
                      <input type="date" aria-label="Start date" value={form.start} onChange={(e) => set('start', e.target.value)} className={field} />
                      <input type="date" aria-label="End date" value={form.end} onChange={(e) => set('end', e.target.value)} className={field} />
                    </div>
                  </Field>
                  <Field icon={Users} label="Travellers">
                    <select value={form.travellers} onChange={(e) => set('travellers', e.target.value)} className={field}>
                      {['1', '2', '3', '4', '5', '6', '7', '8+'].map((n) => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </Field>
                </div>

                <Field icon={Wallet} label="Budget per person">
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => <Chip key={b} active={form.budget === b} onClick={() => set('budget', b)}>{b}</Chip>)}
                  </div>
                </Field>

                <Field icon={MapPin} label="Destinations">
                  <div className="flex flex-wrap gap-2">
                    {DESTINATIONS.map((d) => <Chip key={d} active={form.destinations.includes(d)} onClick={() => toggleArr('destinations', d)}>{d}</Chip>)}
                  </div>
                </Field>

                <Field icon={Sparkles} label="Activities">
                  <div className="flex flex-wrap gap-2">
                    {ACTIVITIES.map((a) => <Chip key={a} active={form.activities.includes(a)} onClick={() => toggleArr('activities', a)}>{a}</Chip>)}
                  </div>
                </Field>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field icon={BedDouble} label="Hotel category">
                    <div className="flex flex-wrap gap-2">
                      {HOTELS.map((h) => <Chip key={h} active={form.hotel === h} onClick={() => set('hotel', h)}>{h}</Chip>)}
                    </div>
                  </Field>
                  <Field icon={Car} label="Transport">
                    <div className="flex flex-wrap gap-2">
                      {TRANSPORT.map((t) => <Chip key={t} active={form.transport === t} onClick={() => set('transport', t)}>{t}</Chip>)}
                    </div>
                  </Field>
                </div>

                <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
                  <h2 className="font-display text-lg font-semibold text-pine-900">Where should we send your itinerary?</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <input type="text" placeholder="Full name" value={form.name} onChange={(e) => set('name', e.target.value)} className={field} aria-label="Full name" />
                    <input type="email" placeholder="Email" value={form.email} onChange={(e) => set('email', e.target.value)} className={field} aria-label="Email" />
                    <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={field} aria-label="Phone" />
                  </div>
                  <textarea placeholder="Anything else we should know? (occasion, must-sees, pace…)" value={form.notes} onChange={(e) => set('notes', e.target.value)} rows={3} className={cn(field, 'mt-3 resize-y')} aria-label="Notes" />
                  {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
                  <motion.div variants={fadeUp}>
                    <Button type="submit" variant="primary" size="lg" className="mt-5 w-full sm:w-auto">
                      <Check className="h-4 w-4" /> Review my trip
                    </Button>
                  </motion.div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Container>
      </Section>
    </>
  )
}
