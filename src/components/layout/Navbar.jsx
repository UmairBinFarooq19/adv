import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Mountain } from 'lucide-react'
import { mainNav } from '@/data/site'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/cn'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

// The navbar is transparent while sitting over a hero, then turns solid once
// the user scrolls. On any page without a dark hero (About, Contact, …) we start
// solid immediately so text stays legible. `transparentOnTop` is passed by the
// layout based on the current route.
export default function Navbar({ transparentOnTop = false }) {
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)

  // Solid when scrolled, when a page has no hero, or when the mobile menu is open.
  const solid = scrolled || !transparentOnTop || open

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          'transition-colors duration-300 ease-premium',
          solid
            ? 'bg-pine-950/95 shadow-soft backdrop-blur supports-[backdrop-filter]:bg-pine-950/80'
            : 'bg-transparent',
        )}
      >
        <Container className="flex h-16 items-center justify-between lg:h-[72px]">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 text-white" onClick={() => setOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-saffron-400 text-pine-950">
              <Mountain className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Adventures<span className="text-saffron-400">Kashmir</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {mainNav.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative text-sm font-medium text-white/85 transition-colors hover:text-white',
                    'after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:bg-saffron-400 after:transition-all',
                    isActive ? 'text-white after:w-full' : 'after:w-0 hover:after:w-full',
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button to="/contact" variant="primary" size="sm" className="hidden sm:inline-flex">
              Book Now
            </Button>
            {/* Mobile menu toggle */}
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl text-white lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-pine-950 lg:hidden"
            aria-label="Primary mobile"
          >
            <Container className="flex flex-col gap-1 py-4">
              {mainNav.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-xl px-4 py-3 text-base font-medium transition-colors',
                      isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5 hover:text-white',
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
              <Button to="/contact" variant="primary" size="lg" className="mt-3" onClick={() => setOpen(false)}>
                Book Now
              </Button>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
