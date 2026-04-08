import HeroSection from '@/components/home/HeroSection'
import FeaturedProperties from '@/components/home/FeaturedProperties'
import StatsBanner from '@/components/home/StatsBanner'
import ServicesOverview from '@/components/home/ServicesOverview'
import Testimonials from '@/components/home/Testimonials'
import BlogPreview from '@/components/home/BlogPreview'
import CTABanner from '@/components/home/CTABanner'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProperties />
      <StatsBanner />
      <ServicesOverview />
      <Testimonials />
      <BlogPreview />
      <CTABanner />
    </>
  )
}
