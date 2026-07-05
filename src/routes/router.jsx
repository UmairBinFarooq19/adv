import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/components/layout/RootLayout'
import Home from '@/pages/Home'

// Home is eager (it's the landing page — no reason to split it). Every other
// page is lazy-loaded so a first visit only downloads the code it needs, which
// keeps the initial bundle small. Adding a page later = one import + one route.
const About = lazy(() => import('@/pages/About'))
const PackagesLanding = lazy(() => import('@/pages/packages/PackagesLanding'))
const PackageCollection = lazy(() => import('@/pages/packages/PackageCollection'))
const CustomPackages = lazy(() => import('@/pages/packages/CustomPackages'))
const PackageDetails = lazy(() => import('@/pages/packages/PackageDetails'))
const Adventures = lazy(() => import('@/pages/Adventures'))
const Destinations = lazy(() => import('@/pages/Destinations'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const Blogs = lazy(() => import('@/pages/Blogs'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Minimal fallback shown while a lazy page chunk loads.
function PageFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-pine-200 border-t-saffron-400" />
    </div>
  )
}

const withSuspense = (Component) => (
  <Suspense fallback={<PageFallback />}>
    <Component />
  </Suspense>
)

// `basename` reads Vite's BASE_URL so the same build works at the domain root
// or under /<repo>/ on GitHub Pages without touching route definitions.
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'about', element: withSuspense(About) },
        // Packages section. Static routes (index, custom) are matched before the
        // dynamic :category, and :category before :category/:slug — React Router
        // ranks these correctly, so the order here is just for readability.
        { path: 'packages', element: withSuspense(PackagesLanding) },
        { path: 'packages/custom', element: withSuspense(CustomPackages) },
        { path: 'packages/:category', element: withSuspense(PackageCollection) },
        { path: 'packages/:category/:slug', element: withSuspense(PackageDetails) },
        { path: 'adventures', element: withSuspense(Adventures) },
        { path: 'destinations', element: withSuspense(Destinations) },
        { path: 'gallery', element: withSuspense(Gallery) },
        { path: 'blogs', element: withSuspense(Blogs) },
        { path: 'contact', element: withSuspense(Contact) },
        { path: '*', element: withSuspense(NotFound) },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)
