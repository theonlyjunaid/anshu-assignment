"use client"

import React, { useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi
} from "@/components/ui/carousel"
import { motion } from 'framer-motion'
import Image from 'next/image'

interface ProductCarouselProps {
    images: string[]
}

const ProductCarousel = ({ images }: ProductCarouselProps) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [api, setApi] = useState<CarouselApi>()
    const [currentIndex, setCurrentIndex] = useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        api.on("select", () => {
            setCurrentIndex(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <div className='relative w-full space-y-4 flex flex-col-reverse md:flex-row gap-4'>

            <div className="flex flex-row md:flex-col gap-2 justify-center ">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${currentIndex === index ? 'border-green-500 opacity-100' : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                    >
                        <Image
                            fill
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className='object-cover'
                        />
                    </button>
                ))}
            </div>
            <Carousel
                className="relative w-full"
                opts={{
                    align: "start",
                    loop: true,
                }}
                setApi={setApi}
            >
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <motion.div
                                className="relative aspect-square overflow-hidden rounded-xl"
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                            >
                                <motion.img
                                    src={image}
                                    alt={`Product image ${index + 1}`}
                                    className="h-full w-full object-cover"
                                    animate={{
                                        scale: hoveredIndex === index ? 1.2 : 1
                                    }}
                                    transition={{
                                        duration: 0.3
                                    }}
                                />
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>


        </div>
    )
}

export default ProductCarousel