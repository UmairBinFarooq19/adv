import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '@/components/layout/RootLayout'
import Home from '@/pages/Home'
import { PageSkeleton } from '@/components/ui/Skeleton'

// Home is eager (it's the landing page — no reason to split it). Every other
// page is lazy-loaded so a first visit only downloads the code it needs, which
// keeps the initial bundle small. Adding a page later = one import + one route.
const About = lazy(() => import('@/pages/About'))
const PackagesLanding = lazy(() => import('@/pages/packages/PackagesLanding'))
const PackageCollection = lazy(() => import('@/pages/packages/PackageCollection'))
const CustomPackages = lazy(() => import('@/pages/packages/CustomPackages'))
const PackageDetails = lazy(() => import('@/pages/packages/PackageDetails'))
const Adventures = lazy(() => import('@/pages/Adventures'))
const AdventureDetail = lazy(() => import('@/pages/AdventureDetail'))
const Destinations = lazy(() => import('@/pages/Destinations'))
const DestinationDetail = lazy(() => import('@/pages/DestinationDetail'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const Blogs = lazy(() => import('@/pages/Blogs'))
const Reviews = lazy(() => import('@/pages/Reviews'))
const BlogPost = lazy(() => import('@/pages/BlogPost'))
const Contact = lazy(() => import('@/pages/Contact'))
const Favorites = lazy(() => import('@/pages/Favorites'))
const Faq = lazy(() => import('@/pages/Faq'))
const NotFound = lazy(() => import('@/pages/NotFound'))

// Skeleton fallback shown while a lazy page chunk loads (perceived performance).
function PageFallback() {
  return <PageSkeleton />
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
        { path: 'adventures/:slug', element: withSuspense(AdventureDetail) },
        { path: 'destinations', element: withSuspense(Destinations) },
        { path: 'destinations/:slug', element: withSuspense(DestinationDetail) },
        { path: 'gallery', element: withSuspense(Gallery) },
        { path: 'blogs', element: withSuspense(Blogs) },
        { path: 'blogs/:slug', element: withSuspense(BlogPost) },
        { path: 'reviews', element: withSuspense(Reviews) },
        { path: 'contact', element: withSuspense(Contact) },
        { path: 'favorites', element: withSuspense(Favorites) },
        { path: 'faq', element: withSuspense(Faq) },
        { path: '*', element: withSuspense(NotFound) },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)
