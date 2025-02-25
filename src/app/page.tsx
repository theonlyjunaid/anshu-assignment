'use client'

import HeroSection from '@/components/home/HeroSection'
import { FeaturedCarousel } from '@/components/home/Carousel'
import Filters from '@/components/home/Filters'
import { featuredProducts } from '@/lib/products'

export default function Home() {






  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">


      <HeroSection />
      <FeaturedCarousel />
      <Filters products={featuredProducts} />


    </main>
  )
}
