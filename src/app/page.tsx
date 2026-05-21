import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import About from '@/components/About'
import Reviews from '@/components/Reviews'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getGalleryItems } from '@/lib/cloudinary'
import { getApprovedReviews } from '@/lib/reviews'
import { siteConfig } from '@/lib/config'

export default async function Home() {
  const [items, reviews] = await Promise.all([
    getGalleryItems(siteConfig.cloudinaryFolder),
    getApprovedReviews(),
  ])

  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Gallery items={items} />
      <About />
      <Reviews reviews={reviews} />
      <Contact />
      <Footer />
    </main>
  )
}
