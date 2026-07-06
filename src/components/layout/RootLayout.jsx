import { Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'
import TopBar from './TopBar'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import FloatingActions from './FloatingActions'
import CompareBar from '@/components/packages/CompareBar'
import InquiryModal from '@/components/inquiry/InquiryModal'

// App shell shared by every page: top bar → nav → routed page → footer.
// On the home page the hero is full-bleed: `main` is pulled up under the
// (transparent) header stack so the hero imagery sits behind the nav. The
// header height is ~100px mobile / ~112px desktop; we pull a few px extra so no
// light seam of page background can show between the nav and the hero.
export default function RootLayout() {
  const { pathname } = useLocation()
  const hasHero = pathname === '/'

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-pine-950 focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lift"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <TopBar />
      <Navbar transparentOnTop={hasHero} />
      {/* main is the landmark for skip-links and screen readers */}
      <main id="main" tabIndex={-1} className={cn('flex-1 outline-none', hasHero && '-mt-[70px] lg:-mt-[78px]')}>
        <Outlet />
      </main>
      <Footer />

      {/* Global, site-wide hosts */}
      <FloatingActions />
      <CompareBar />
      <InquiryModal />
    </div>
  )
}
