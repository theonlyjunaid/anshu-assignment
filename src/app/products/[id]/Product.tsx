"use client"

import React, { useEffect, useState } from 'react'
import { featuredProducts } from '@/lib/products'
import ProductCarousel from '@/components/ProductCarousel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, ShoppingCart, Heart, Shield, ArrowCounterClockwise, Truck } from '@phosphor-icons/react'
import { toast } from 'sonner'

type Product = typeof featuredProducts[number]

const Product = ({ product }: { product: Product }) => {
    const [quantity, setQuantity] = useState(1)
    const [isWishlisted, setIsWishlisted] = useState(false)

    const addToCart = () => {
        try {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]")
            const existingProductIndex = cart.findIndex((item: Product) => item.id === product.id)

            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += quantity
            } else {
                cart.push({
                    ...product,
                    quantity
                })
            }

            localStorage.setItem("cart", JSON.stringify(cart))
            // Dispatch custom event for cart update
            window.dispatchEvent(new Event('cartUpdated'))
            toast.success('Added to cart successfully!')
        } catch (error) {
            console.error('Error adding to cart:', error)
            toast.error('Failed to add to cart')
        }
    }

    const toggleWishlist = () => {
        try {
            let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
            const isCurrentlyWishlisted = wishlist.some((item: Product) => item.id === product.id)

            if (isCurrentlyWishlisted) {
                wishlist = wishlist.filter((item: Product) => item.id !== product.id)
                toast.success('Removed from wishlist', {
                    description: 'You can add it back anytime'
                })
            } else {
                wishlist.push(product)
                toast.success('Added to wishlist', {
                    description: 'You can remove it anytime'
                })
            }

            localStorage.setItem("wishlist", JSON.stringify(wishlist))
            // Dispatch custom event for wishlist update
            window.dispatchEvent(new Event('wishlistUpdated'))
            setIsWishlisted(!isCurrentlyWishlisted)
        } catch (error) {
            console.error('Error updating wishlist:', error)
            toast.error('Failed to update wishlist', {
                description: 'Please try again'
            })
        }
    }

    const updateQuantity = (newQuantity: number) => {
        setQuantity(Math.max(1, Math.min(newQuantity, 99))) // Limit quantity between 1 and 99
    }

    useEffect(() => {
        try {
            const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
            setIsWishlisted(wishlist.some((item: Product) => item.id === product.id))
        } catch (error) {
            console.error('Error loading wishlist status:', error)
        }
    }, [product.id])

    const discountedPrice = product.price * (1 - product.discount / 100)
    const originalPrice = product.price

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="w-full">
                    <ProductCarousel images={product.images} />
                </div>

                <div className="space-y-6 sm:space-y-8">
                    <div>
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-base sm:text-lg">
                                {product.brand}
                            </Badge>
                            <div className="flex items-center gap-2 bg-green-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                                <Star weight="fill" className="text-yellow-400 h-4 w-4 sm:h-5 sm:w-5" />
                                <span className="text-sm sm:text-base text-green-700 font-medium">{product.rating}</span>
                            </div>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{product.title}</h1>
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">{product.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                            {product.benefits.map((benefit, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-green-100/50 text-green-700 text-sm sm:text-base py-1 sm:py-1.5"
                                >
                                    {benefit}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 sm:space-y-6 border-y border-gray-200 py-4 sm:py-6">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    ${discountedPrice.toFixed(2)}
                                </span>
                                {product.discount > 0 && (
                                    <span className="text-lg sm:text-xl text-gray-500 line-through">
                                        ${originalPrice.toFixed(2)}
                                    </span>
                                )}
                            </div>
                            {product.discount > 0 && (
                                <Badge variant="destructive" className="bg-green-600 text-sm sm:text-base">
                                    Save {product.discount}%
                                </Badge>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                            <div className="flex items-center border-2 rounded-lg">
                                <button
                                    className="px-3 sm:px-4 py-2 text-lg sm:text-xl hover:bg-gray-100 transition-colors"
                                    onClick={() => updateQuantity(quantity - 1)}
                                    aria-label="Decrease quantity"
                                >
                                    -
                                </button>
                                <span className="px-3 sm:px-4 py-2 text-lg sm:text-xl border-x-2">{quantity}</span>
                                <button
                                    className="px-3 sm:px-4 py-2 text-lg sm:text-xl hover:bg-gray-100 transition-colors"
                                    onClick={() => updateQuantity(quantity + 1)}
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                            <div className="flex gap-4 flex-1">
                                <Button
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-base sm:text-lg py-4 sm:py-6 transition-colors duration-200"
                                    onClick={addToCart}
                                >
                                    <ShoppingCart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                    Add to Cart
                                </Button>
                                <Button
                                    variant="outline"
                                    className={`p-4 sm:p-6 border-2 transition-colors duration-200 ${isWishlisted ? "bg-green-200 hover:bg-green-300" : "bg-white hover:bg-gray-100"}`}
                                    onClick={toggleWishlist}
                                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                >
                                    <Heart
                                        weight={isWishlisted ? "fill" : "regular"}
                                        className={`h-5 w-5 sm:h-6 sm:w-6 ${isWishlisted ? "text-green-600" : "text-gray-400"}`}
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-2" />
                            <span className="text-xs sm:text-sm font-medium">Quality Guaranteed</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                            <ArrowCounterClockwise className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-2" />
                            <span className="text-xs sm:text-sm font-medium">30-Day Returns</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-3 sm:p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                            <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mb-2" />
                            <span className="text-xs sm:text-sm font-medium">Free Shipping</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product