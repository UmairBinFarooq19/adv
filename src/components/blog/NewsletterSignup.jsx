import { useState } from 'react'
import { Mail, Send, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'

// NewsletterSignup — the subscribe block, used on the blog landing and at the
// foot of every article. There is no mailing-list backend yet, so rather than
// fake a success state this validates the address, stores nothing, and tells the
// reader plainly that we'll be in touch. Wire `onSubscribe` to a real endpoint
// (or the existing inquiry transport) and the UI is unchanged.
export default function NewsletterSignup({ tone = 'light', onSubscribe, className }) {
  const dark = tone === 'dark'
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | error | done

  const submit = () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!valid) return setState('error')
    onSubscribe?.(email.trim())
    setState('done')
  }

  return (
    <div className={cn('mx-auto max-w-2xl text-center', className)}>
      <span className={cn('mx-auto grid h-12 w-12 place-items-center rounded-2xl', dark ? 'bg-white/10 text-saffron-300' : 'bg-glacier-100 text-pine-700')}>
        <Mail className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className={cn('mt-5 font-display text-3xl font-semibold tracking-tight', dark ? 'text-white' : 'text-pine-900')}>
        Dispatches from the valley
      </h2>
      <p className={cn('mt-3 text-lg leading-relaxed', dark ? 'text-pine-100' : 'text-muted')}>
        Snow reports in winter, trail notes in summer, and the occasional recipe. Twice a month, never more.
      </p>

      {state === 'done' ? (
        <p className={cn('mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium', dark ? 'bg-white/10 text-white' : 'bg-glacier-100 text-pine-900')}>
          <Check className="h-4 w-4 text-saffron-500" aria-hidden="true" />
          Thank you — we’ll write to {email} soon.
        </p>
      ) : (
        <div className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle') }}
              onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
              placeholder="you@example.com"
              aria-invalid={state === 'error'}
              aria-describedby={state === 'error' ? 'newsletter-error' : undefined}
              className={cn(
                'w-full rounded-full px-5 py-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 sm:w-80',
                dark ? 'bg-white/10 text-white placeholder:text-pine-100/60 backdrop-blur' : 'border border-line bg-surface text-pine-900 placeholder:text-muted',
              )}
            />
            <Button variant={dark ? 'solid' : 'primary'} size="md" onClick={submit}>
              Subscribe <Send className="h-4 w-4" />
            </Button>
          </div>
          {state === 'error' && (
            <p id="newsletter-error" role="alert" className={cn('mt-3 text-sm', dark ? 'text-saffron-200' : 'text-pine-800')}>
              Please enter a valid email address.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
