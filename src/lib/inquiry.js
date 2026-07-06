import { site } from '@/data/site'

// Booking / inquiry submission — designed for a static host (GitHub Pages) with
// NO backend. Two transports, chosen automatically:
//   1. Web3Forms (recommended): set VITE_WEB3FORMS_KEY and submissions POST to
//      their API and arrive in your inbox. EmailJS could drop in here identically.
//   2. mailto fallback: if no key is configured, we open the user's mail client
//      pre-filled — so the form still "works" out of the box with zero setup.
//
// Backend migration path: replace the body of submitInquiry() with a fetch to
// your own endpoint. The form component and all call sites stay the same.
const ENDPOINT = 'https://api.web3forms.com/submit'
const KEY = import.meta.env.VITE_WEB3FORMS_KEY

export const inquiryTransport = KEY ? 'web3forms' : 'mailto'

const LABELS = {
  package: 'Package', name: 'Name', email: 'Email', phone: 'Phone', country: 'Country',
  travelDate: 'Travel date', adults: 'Adults', children: 'Children', budget: 'Budget',
  requests: 'Special requests', preferredTime: 'Preferred callback time',
}

function toText(data) {
  return Object.entries(data)
    .filter(([k, v]) => !k.startsWith('_') && v !== '' && v != null)
    .map(([k, v]) => `${LABELS[k] ?? k}: ${v}`)
    .join('\n')
}

export async function submitInquiry(data) {
  const subject = `${data._mode === 'callback' ? 'Callback request' : 'Trip inquiry'}: ${data.package || 'General'}`

  if (KEY) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: KEY,
        subject,
        from_name: data.name || 'Website visitor',
        ...Object.fromEntries(Object.entries(data).filter(([k]) => !k.startsWith('_'))),
      }),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok || !json.success) throw new Error(json.message || 'Submission failed. Please try WhatsApp or email.')
    return { ok: true, via: 'web3forms' }
  }

  // No key configured → open a pre-filled email as a graceful fallback.
  const body = `${toText(data)}\n\n— sent from adventureskashmir.com`
  window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { ok: true, via: 'mailto' }
}
