import { Outlet, useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'
import TopBar from './TopBar'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

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
      <ScrollToTop />
      <TopBar />
      <Navbar transparentOnTop={hasHero} />
      {/* main is the landmark for skip-links and screen readers */}
      <main id="main" className={cn('flex-1', hasHero && '-mt-[70px] lg:-mt-[78px]')}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
