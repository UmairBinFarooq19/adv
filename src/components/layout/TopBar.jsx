import { Phone, MessageCircle } from 'lucide-react'
import { site, contactBar, socialLinks } from '@/data/site'

// Top information bar. On desktop it shows full contact details + every social
// and review link. On mobile it collapses to a compact strip with just the two
// primary tap targets (call, WhatsApp) so it stays useful without crowding —
// the full set still lives in the mobile menu and footer.
export default function TopBar() {
  const tel = `tel:${site.contact.phone.replace(/\s/g, '')}`
  const wa = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}`

  return (
    <div className="relative z-40 border-b border-white/10 bg-pine-950 text-pine-100">
      {/* Desktop */}
      <div className="container hidden h-10 items-center justify-between text-xs lg:flex">
        <div className="flex items-center gap-6">
          {contactBar.map(({ label, value, href, icon: Icon }) => (
            <a key={label} href={href} className="flex items-center gap-2 transition-colors hover:text-saffron-300">
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{value}</span>
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a key={label} href={href} aria-label={label} className="text-pine-200 transition-colors hover:text-saffron-300">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* Mobile: compact, two primary actions */}
      <div className="container flex h-9 items-center justify-between text-xs lg:hidden">
        <a href={tel} className="flex items-center gap-1.5 transition-colors hover:text-saffron-300">
          <Phone className="h-3.5 w-3.5" />
          <span>{site.contact.phone}</span>
        </a>
        <a href={wa} className="flex items-center gap-1.5 transition-colors hover:text-saffron-300">
          <MessageCircle className="h-3.5 w-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
