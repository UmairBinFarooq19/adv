import Hero from '@/components/sections/home/Hero'
import FeaturedPackages from '@/components/sections/home/FeaturedPackages'
import SkiingPackages from '@/components/sections/home/SkiingPackages'
import PopularActivities from '@/components/sections/home/PopularActivities'
import TopDestinations from '@/components/sections/home/TopDestinations'
import WhyChooseUs from '@/components/sections/home/WhyChooseUs'
import Reviews from '@/components/sections/home/Reviews'
import InstagramGallery from '@/components/sections/home/InstagramGallery'
import TravelBlogs from '@/components/sections/home/TravelBlogs'
import ContactCTA from '@/components/sections/home/ContactCTA'

// The home page is pure composition — it declares WHAT sections appear and in
// WHAT order, and nothing else. All layout/logic lives inside each section, so
// reordering the page is just reordering these lines.
export default function Home() {
  return (
    <>
      <Hero />
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
