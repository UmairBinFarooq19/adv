import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Mountain, Search, Heart } from 'lucide-react'
import { mainNav } from '@/data/site'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/cn'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SearchModal from '@/components/search/SearchModal'
import { useFavorites } from '@/store/FavoritesContext'
import { useInquiry } from '@/store/InquiryContext'

// The navbar is transparent while sitting over a hero, then turns solid once
// the user scrolls. Search + favorites live in the right cluster (icon buttons)
// so they're reachable everywhere without disturbing the primary nav. Press "/"
// anywhere to open search.
export default function Navbar({ transparentOnTop = false }) {
  const scrolled = useScrolled(24)
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { count } = useFavorites()
  const { openInquiry } = useInquiry()

  const solid = scrolled || !transparentOnTop || open

  // "/" opens search (unless the user is typing in a field).
  useEffect(() => {
    const onKey = (e) => {
      const t = e.target
      const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const iconBtn = 'relative grid h-10 w-10 place-items-center rounded-xl text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400'

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          'transition-colors duration-300 ease-premium',
          solid
            ? 'bg-pine-950/95 shadow-soft backdrop-blur supports-[backdrop-filter]:bg-pine-950/80'
            : 'bg-gradient-to-b from-pine-950/80 via-pine-950/40 to-transparent',
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
          <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Primary">
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

          <div className="flex items-center gap-1 sm:gap-2">
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Search (press /)" className={iconBtn}>
              <Search className="h-5 w-5" />
            </button>
            <Link to="/favorites" aria-label={`Saved packages${count ? ` (${count})` : ''}`} className={cn(iconBtn, 'hidden lg:grid')}>
              <Heart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-saffron-400 px-1 text-[10px] font-bold text-pine-950">{count}</span>
              )}
            </Link>
            <Button variant="primary" size="sm" className="hidden sm:inline-flex" onClick={() => openInquiry()}>
              Book Now
            </Button>
            {/* Mobile menu toggle */}
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl text-white lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
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
            id="mobile-menu"
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
              <Link to="/favorites" onClick={() => setOpen(false)} className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-white/80 hover:bg-white/5 hover:text-white">
                <span className="flex items-center gap-2"><Heart className="h-5 w-5" /> Saved packages</span>
                {count > 0 && <span className="rounded-full bg-saffron-400 px-2 text-sm font-bold text-pine-950">{count}</span>}
              </Link>
              <Button variant="primary" size="lg" className="mt-3" onClick={() => { setOpen(false); openInquiry() }}>
                Book Now
              </Button>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
