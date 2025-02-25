'use client'

import { useEffect, useState } from 'react'
import { Star, Funnel } from '@phosphor-icons/react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { featuredProducts } from "@/lib/products"
type Product = typeof featuredProducts[number]

export default function Filters({ products, setShortedProducts, isProductsPage = false }: { products: Product[], setShortedProducts?: (products: Product[]) => void, isProductsPage?: boolean }) {
    const maxPrice = Math.max(...products.map(product => product.price))
    const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice])
    const [selectedBrands, setSelectedBrands] = useState<string[]>([])
    const [selectedRating, setSelectedRating] = useState<number>(0)
    const [isFilterVisible, setIsFilterVisible] = useState(false)

    // Get unique brands and count their occurrences
    const brands = Array.from(new Set(products.map(product => product.brand)))
        .map(brand => ({
            name: brand,
            count: products.filter(product => product.brand === brand).length
        }))

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            if (scrollPosition > 600) {
                setIsFilterVisible(true)
            } else {
                setIsFilterVisible(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Apply filters whenever filter values change
    useEffect(() => {
        const originalProducts = [...products]
        const filteredProducts = originalProducts.filter(product => {
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
            const matchesRating = selectedRating === 0 || product.rating >= selectedRating

            return matchesPrice && matchesBrand && matchesRating
        })

        if (setShortedProducts) {
            setShortedProducts(filteredProducts)
        }
    }, [priceRange, selectedBrands, selectedRating, setShortedProducts, products])

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: isProductsPage ? 1 : isFilterVisible ? 1 : 0 }}
            className={` px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50/50 ${!isProductsPage ? 'py-16 ' : 'pt-16 pb-3 '}`}
        >
            <div className="max-w-7xl mx-auto">
                <div className={`flex items-center  ${isProductsPage ? 'md:hidden justify-end' : ' mb-12 justify-between '}`}>
                    <div className={`${isProductsPage ? 'hidden' : ''}`}>
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">
                            Filter Health Products
                        </h2>
                        <p className="text-gray-600">Find the perfect wellness products for your needs</p>
                    </div>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="lg" className="flex items-center gap-2 border-green-200">
                                <Funnel className="h-5 w-5" />
                                Filter
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Filter Health Products</SheetTitle>
                                <SheetDescription>
                                    Customize your wellness journey with our filters
                                </SheetDescription>
                            </SheetHeader>
                            <Separator className="my-4" />
                            <div className="space-y-8">
                                {/* Price Range Filter */}
                                <div>
                                    <Label>Price Range</Label>
                                    <Slider
                                        defaultValue={[priceRange[0], priceRange[1]]}
                                        max={maxPrice}
                                        step={1}
                                        onValueChange={(value) => setPriceRange([value[0], value[1]])}
                                        className="mt-4"
                                    />
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="bg-green-50 px-4 py-2 rounded-lg">
                                            <p className="text-sm text-green-700">Min</p>
                                            <p className="text-lg font-semibold">${priceRange[0]}</p>
                                        </div>
                                        <div className="bg-green-50 px-4 py-2 rounded-lg">
                                            <p className="text-sm text-green-700">Max</p>
                                            <p className="text-lg font-semibold">${priceRange[1]}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Brand Filter */}
                                <div>
                                    <Label>Health Brands</Label>
                                    <ScrollArea className="h-[200px] mt-4">
                                        {brands.map((brand) => (
                                            <label key={brand.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                                                <div className="flex items-center space-x-3">
                                                    <Checkbox
                                                        checked={selectedBrands.includes(brand.name)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                setSelectedBrands([...selectedBrands, brand.name])
                                                            } else {
                                                                setSelectedBrands(selectedBrands.filter((b) => b !== brand.name))
                                                            }
                                                        }}
                                                    />
                                                    <span className="text-gray-700">{brand.name}</span>
                                                </div>
                                                <Badge variant="secondary" className="bg-green-100 text-green-700">{brand.count}</Badge>
                                            </label>
                                        ))}
                                    </ScrollArea>
                                </div>

                                {/* Rating Filter */}
                                <div>
                                    <Label>Customer Rating</Label>
                                    <div className="space-y-3 mt-4">
                                        {[5, 4, 3, 2, 1].map((rating) => (
                                            <Button
                                                key={rating}
                                                variant={selectedRating === rating ? "default" : "ghost"}
                                                onClick={() => setSelectedRating(rating)}
                                                className={`w-full justify-between ${selectedRating === rating ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                            >
                                                <div className="flex items-center space-x-1">
                                                    {[...Array(rating)].map((_, i) => (
                                                        <Star key={i} weight="fill" className="text-yellow-400 h-5 w-5" />
                                                    ))}
                                                    {[...Array(5 - rating)].map((_, i) => (
                                                        <Star key={i} weight="regular" className="text-gray-300 h-5 w-5" />
                                                    ))}
                                                </div>
                                                <span className="text-sm">{rating}+ stars</span>
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className={`grid grid-cols-1 gap-8 ${isProductsPage ? 'hidden md:grid md:grid-cols-1' : 'md:grid-cols-3'}`}>
                    {/* Price Range Filter */}
                    <Card className="border-2 border-green-100/50">
                        <CardHeader>
                            <CardTitle>Price Range</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Slider
                                defaultValue={[priceRange[0], priceRange[1]]}
                                max={maxPrice}
                                step={1}
                                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                            />
                            <div className="flex items-center justify-between">
                                <div className="bg-green-50 px-4 py-2 rounded-lg">
                                    <p className="text-sm text-green-700">Min</p>
                                    <p className="text-lg font-semibold">${priceRange[0]}</p>
                                </div>
                                <div className="bg-green-50 px-4 py-2 rounded-lg">
                                    <p className="text-sm text-green-700">Max</p>
                                    <p className="text-lg font-semibold">${priceRange[1]}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Brand Filter */}
                    <Card className="border-2 border-green-100/50">
                        <CardHeader>
                            <CardTitle>Health Brands</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[300px]">
                                {brands.map((brand) => (
                                    <label key={brand.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                checked={selectedBrands.includes(brand.name)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        setSelectedBrands([...selectedBrands, brand.name])
                                                    } else {
                                                        setSelectedBrands(selectedBrands.filter((b) => b !== brand.name))
                                                    }
                                                }}
                                            />
                                            <span className="text-gray-700">{brand.name}</span>
                                        </div>
                                        <Badge variant="secondary" className="bg-green-100 text-green-700">{brand.count}</Badge>
                                    </label>
                                ))}
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    {/* Rating Filter */}
                    <Card className="border-2 border-green-100/50">
                        <CardHeader>
                            <CardTitle>Customer Rating</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[5, 4, 3, 2, 1].map((rating) => (
                                    <Button
                                        key={rating}
                                        variant={selectedRating === rating ? "default" : "ghost"}
                                        onClick={() => setSelectedRating(rating)}
                                        className={`w-full justify-between ${selectedRating === rating ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                    >
                                        <div className="flex items-center space-x-1">
                                            {[...Array(rating)].map((_, i) => (
                                                <Star key={i} weight="fill" className="text-yellow-400 h-5 w-5" />
                                            ))}
                                            {[...Array(5 - rating)].map((_, i) => (
                                                <Star key={i} weight="regular" className="text-gray-300 h-5 w-5" />
                                            ))}
                                        </div>
                                        <span className="text-sm">{rating}+ stars</span>
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </motion.section>
    )
}
