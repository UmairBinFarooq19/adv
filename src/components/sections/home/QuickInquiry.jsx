import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, Users, Compass, Search } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { fadeUp } from '@/lib/motion'

// Floating quick-inquiry card that overlaps the hero (negative top margin).
// Frosted glass so the hero imagery shows through the top edge; the inputs
// themselves stay solid for legibility. No real submission yet — wired to
// preventDefault so it's ready for an API/booking backend later.
const fieldBase =
  'w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-body ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400'

const destinations = ['Gulmarg', 'Srinagar', 'Pahalgam', 'Sonamarg', 'Doodhpathri', 'Leh Ladakh']
const adventureTypes = ['Skiing & snowboarding', 'Trekking', 'Sightseeing', 'Adventure sports', 'Luxury escape']

function Field({ icon: Icon, label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
        <Icon className="h-3.5 w-3.5 text-saffron-500" />
        {label}
      </span>
      {children}
    </label>
  )
}

export default function QuickInquiry() {
  const [form, setForm] = useState({ destination: '', date: '', guests: '2', type: '' })
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <div className="relative z-20 -mt-24 sm:-mt-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="rounded-4xl border border-white/40 bg-white/80 p-6 shadow-lift backdrop-blur-xl sm:p-8"
        >
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-xl font-semibold text-pine-900">Plan your escape</h2>
            <p className="text-sm text-muted">Tell us the essentials — we’ll craft the rest.</p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto] lg:items-end"
          >
            <Field icon={MapPin} label="Destination">
              <select className={fieldBase} value={form.destination} onChange={update('destination')}>
                <option value="">Anywhere</option>
                {destinations.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </Field>

            <Field icon={Calendar} label="Travel date">
              <input type="date" className={fieldBase} value={form.date} onChange={update('date')} />
            </Field>

            <Field icon={Users} label="Guests">
              <select className={fieldBase} value={form.guests} onChange={update('guests')}>
                {['1', '2', '3', '4', '5', '6+'].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === '1' ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </Field>

            <Field icon={Compass} label="Adventure type">
              <select className={fieldBase} value={form.type} onChange={update('type')}>
                <option value="">Any experience</option>
                {adventureTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>

            <Button type="submit" variant="primary" size="lg" className="h-[46px] w-full lg:w-auto">
              <Search className="h-4 w-4" />
              Send inquiry
            </Button>
          </form>
        </motion.div>
      </Container>
    </div>
  )
}
