import { contactBar, socialLinks } from '@/data/site'

// Slim utility bar above the nav: quick contact + review/social links.
// Hidden on small screens (space is precious on mobile); these details also
// live in the mobile menu and footer, so nothing is lost.
export default function TopBar() {
  return (
    <div className="hidden border-b border-white/10 bg-pine-950 text-pine-100 lg:block">
      <div className="container flex h-10 items-center justify-between text-xs">
        <div className="flex items-center gap-6">
          {contactBar.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-2 transition-colors hover:text-saffron-300"
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{value}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-pine-200 transition-colors hover:text-saffron-300"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
