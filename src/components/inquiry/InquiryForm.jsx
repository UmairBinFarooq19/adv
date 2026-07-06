import { useState } from 'react'
import { CheckCircle2, MessageCircle, Loader2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { submitInquiry, inquiryTransport } from '@/lib/inquiry'
import { packageWhatsApp, generalWhatsApp } from '@/lib/whatsapp'
import { formatPrice } from '@/data/catalog'

const BUDGETS = ['Under ₹25k', '₹25k–50k', '₹50k–1L', '₹1L–2L', '₹2L+']
const COUNTRIES = ['India', 'United Kingdom', 'United States', 'UAE', 'Singapore', 'Australia', 'Germany', 'France', 'Canada', 'Other']
const field = 'w-full rounded-2xl border border-line bg-background px-4 py-3 text-sm text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400'
const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted'

// The one inquiry form, reused by the global modal (with a package) and the
// Contact page (general). `mode="callback"` shows a shorter phone-first version.
export default function InquiryForm({ pkg = null, mode = 'inquiry', compact = false }) {
  const callback = mode === 'callback'
  const [form, setForm] = useState({
    name: '', email: '', phone: '', country: 'India', travelDate: '',
    adults: '2', children: '0', budget: BUDGETS[1], requests: '', preferredTime: 'Morning',
  })
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const [errorMsg, setErrorMsg] = useState('')
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending'); setErrorMsg('')
    try {
      await submitInquiry({
        package: pkg?.title || 'General enquiry',
        name: form.name, email: form.email, phone: form.phone, country: form.country,
        ...(callback
          ? { preferredTime: form.preferredTime }
          : { travelDate: form.travelDate, adults: form.adults, children: form.children, budget: form.budget, requests: form.requests }),
        _mode: mode,
      })
      setStatus('done')
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong.')
      setStatus('error')
    }
  }

  if (status === 'done') {
    const wa = pkg ? packageWhatsApp(pkg, { date: form.travelDate, guests: form.adults }) : generalWhatsApp()
    return (
      <div className="rounded-3xl border border-line bg-surface p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-glacier-600" aria-hidden="true" />
        <h3 className="mt-4 font-display text-xl font-semibold text-pine-900">
          {inquiryTransport === 'mailto' ? 'Almost there — check your email app' : 'Thank you! Your request is in.'}
        </h3>
        <p className="mt-2 text-muted">
          {inquiryTransport === 'mailto'
            ? 'We opened a pre-filled email for you to send. Prefer instant? Message us on WhatsApp.'
            : `We’ll be in touch shortly${form.name ? ', ' + form.name.split(' ')[0] : ''} — usually the same day.`}
        </p>
        <Button href={wa} variant="primary" size="lg" className="mt-6">
          <MessageCircle className="h-4 w-4" /> Continue on WhatsApp
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {pkg && (
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-glacier-50 px-4 py-3">
          <span className="text-sm">
            <span className="block text-xs uppercase tracking-wider text-muted">Package</span>
            <span className="font-semibold text-pine-900">{pkg.title}</span>
          </span>
          <span className="shrink-0 font-display text-lg font-semibold text-pine-900">{formatPrice(pkg.priceFrom)}</span>
        </div>
      )}

      <div className={cn('grid gap-4', !compact && 'sm:grid-cols-2')}>
        <label className="block">
          <span className={labelCls}>Full name</span>
          <input required value={form.name} onChange={(e) => set('name', e.target.value)} className={field} placeholder="Your name" />
        </label>
        <label className="block">
          <span className={labelCls}>Phone / WhatsApp</span>
          <input required type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={field} placeholder="+91…" />
        </label>
      </div>

      {!callback && (
        <div className={cn('grid gap-4', !compact && 'sm:grid-cols-2')}>
          <label className="block">
            <span className={labelCls}>Email</span>
            <input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={field} placeholder="you@email.com" />
          </label>
          <label className="block">
            <span className={labelCls}>Country</span>
            <select value={form.country} onChange={(e) => set('country', e.target.value)} className={field}>
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
        </div>
      )}

      {callback ? (
        <label className="block">
          <span className={labelCls}>Best time to call</span>
          <select value={form.preferredTime} onChange={(e) => set('preferredTime', e.target.value)} className={field}>
            {['Morning', 'Afternoon', 'Evening'].map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-4">
            <label className="block sm:col-span-2">
              <span className={labelCls}>Travel date</span>
              <input type="date" value={form.travelDate} onChange={(e) => set('travelDate', e.target.value)} className={field} />
            </label>
            <label className="block">
              <span className={labelCls}>Adults</span>
              <select value={form.adults} onChange={(e) => set('adults', e.target.value)} className={field}>
                {['1', '2', '3', '4', '5', '6', '7', '8+'].map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
            <label className="block">
              <span className={labelCls}>Children</span>
              <select value={form.children} onChange={(e) => set('children', e.target.value)} className={field}>
                {['0', '1', '2', '3', '4', '5+'].map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
          </div>
          <label className="block">
            <span className={labelCls}>Budget (per person)</span>
            <select value={form.budget} onChange={(e) => set('budget', e.target.value)} className={field}>
              {BUDGETS.map((b) => <option key={b}>{b}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Special requests</span>
            <textarea rows={compact ? 2 : 3} value={form.requests} onChange={(e) => set('requests', e.target.value)} className={cn(field, 'resize-y')} placeholder="Occasion, dietary needs, must-sees, pace…" />
          </label>
        </>
      )}

      {status === 'error' && <p className="text-sm text-red-600" role="alert">{errorMsg}</p>}

      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === 'sending'}>
        {status === 'sending' ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : callback ? 'Request callback' : 'Send inquiry'}
      </Button>
      <p className="text-center text-xs text-muted">No spam, ever. We reply personally, usually within a few hours.</p>
    </form>
  )
}
