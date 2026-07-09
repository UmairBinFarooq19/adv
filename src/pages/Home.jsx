import Hero from '@/components/sections/home/Hero'
import QuickInquiry from '@/components/sections/home/QuickInquiry'
import FeaturedPackages from '@/components/sections/home/FeaturedPackages'
import SkiingPackages from '@/components/sections/home/SkiingPackages'
import PopularActivities from '@/components/sections/home/PopularActivities'
import TopDestinations from '@/components/sections/home/TopDestinations'
import WhyChooseUs from '@/components/sections/home/WhyChooseUs'
import Reviews from '@/components/sections/home/Reviews'
import InstagramGallery from '@/components/sections/home/InstagramGallery'
import TravelBlogs from '@/components/sections/home/TravelBlogs'
import ContactCTA from '@/components/sections/home/ContactCTA'
import { useSeo } from '@/lib/seo'
import { asset } from '@/lib/asset'

// The home page is pure composition — it declares WHAT sections appear and in
// WHAT order. All layout/logic lives inside each section.
export default function Home() {
  // The site-wide Organization and WebSite nodes live in index.html, so the home
  // page needs no page-level JSON-LD — but it does need a canonical, robots
  // directive and OpenGraph tags like every other route.
  useSeo({
    description:
      'Premium guided ski, trekking and adventure journeys across Kashmir and Ladakh — handcrafted itineraries, certified local guides and a safety-first ethos.',
    image: asset('images/hero-1.svg'),
  })

  return (
    <>
      <Hero />
      <QuickInquiry />
      <FeaturedPackages />
      <SkiingPackages />
      <PopularActivities />
      <TopDestinations />
      <WhyChooseUs />
      <Reviews />
      <InstagramGallery />
      <TravelBlogs />
      <ContactCTA />
    </>
  )
}
