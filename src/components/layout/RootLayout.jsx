import { Outlet, useLocation } from 'react-router-dom'
import TopBar from './TopBar'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

// App shell shared by every page: top bar → nav → routed page → footer.
// Only the home page has a full-bleed dark hero, so only there does the nav
// start transparent. Everywhere else it starts solid for legibility.
export default function RootLayout() {
  const { pathname } = useLocation()
  const hasHero = pathname === '/'

  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <TopBar />
      <Navbar transparentOnTop={hasHero} />
      {/* main is the landmark for skip-links and screen readers */}
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
