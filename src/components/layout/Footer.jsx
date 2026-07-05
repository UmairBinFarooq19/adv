import { Link } from 'react-router-dom'
import { Mountain, Send, MapPin } from 'lucide-react'
import { site, footerColumns, socialLinks } from '@/data/site'
import Container from '@/components/ui/Container'
import ContourDivider from '@/components/ui/ContourDivider'
import Button from '@/components/ui/Button'

export default function Footer() {
  return (
    <footer className="relative bg-gradient-pine text-pine-100">
      {/* Signature contour motif seams the footer to the page above it. */}
      <ContourDivider className="h-14 text-saffron-400/30" />

      <Container className="grid gap-12 pb-10 pt-6 lg:grid-cols-12 lg:gap-8">
        {/* Brand + newsletter */}
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-2.5 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-saffron-400 text-pine-950">
              <Mountain className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-semibold">
              Adventures<span className="text-saffron-400">Kashmir</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-pine-200">
            Handcrafted premium journeys through the Kashmir Himalayas — skiing,
            snow and slow luxury, guided by people who call these mountains home.
          </p>

          <form
            className="mt-6 flex max-w-sm items-center gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="newsletter" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter"
              type="email"
              required
              placeholder="Your email"
              className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-pine-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
            />
            <Button type="submit" variant="primary" size="md" aria-label="Subscribe">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Link columns */}
        {footerColumns.map((col) => (
          <div key={col.title} className="lg:col-span-2">
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-pine-200 transition-colors hover:text-saffron-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact + socials */}
        <div className="lg:col-span-4">
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
            Visit us
          </h4>
          <p className="mt-4 flex items-start gap-2 text-sm text-pine-200">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron-400" />
            {site.contact.address}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-pine-100 transition-colors hover:border-saffron-400 hover:text-saffron-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-pine-300 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/contact#policies" className="hover:text-saffron-300">Privacy</Link>
            <Link to="/contact#policies" className="hover:text-saffron-300">Terms</Link>
            <Link to="/contact#faqs" className="hover:text-saffron-300">FAQs</Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
