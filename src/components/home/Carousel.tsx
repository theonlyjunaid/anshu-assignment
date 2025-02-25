"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from 'embla-carousel-autoplay'
import ProductComp from "../ProductComp"
import { featuredProducts } from "@/lib/products"

export function FeaturedCarousel() {


    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-green-50/50">
            <div className="max-w-6xl mx-auto mb-12 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Wellness Products</h2>
                <p className="text-gray-600">Discover our carefully selected range of premium health supplements</p>
            </div>

            <Carousel
                className="relative"
                opts={{
                    align: "start",
                    loop: true,

                }}
                plugins={[
                    Autoplay({
                        delay: 4000,
                    }),
                ]}
            >
                <div className="absolute hidden md:flex right-0 top-0 -mt-20 space-x-2">
                    <CarouselPrevious className="bg-green-50 hover:bg-green-100" />
                    <CarouselNext className="bg-green-50 hover:bg-green-100" />
                </div>

                <CarouselContent>
                    {featuredProducts.map((product) => (
                        <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 cursor-pointer">
                            <ProductComp product={product} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    )
}
