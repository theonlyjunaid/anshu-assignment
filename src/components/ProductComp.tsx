import { motion } from "framer-motion"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart } from "@phosphor-icons/react"
import Image from "next/image"
import { featuredProducts } from "@/lib/products"
import { toast } from "sonner"
import { useEffect } from "react"
import { useState } from "react"
import Link from "next/link"

interface ProductCompProps {
    product: typeof featuredProducts[number]
}

export default function ProductComp({ product }: ProductCompProps) {
    const [isWishlisted, setIsWishlisted] = useState(false)
    const addToCart = () => {
        try {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]")
            const existingProductIndex = cart.findIndex((item: typeof featuredProducts[number]) => item.id === product.id)

            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                })
            }

            localStorage.setItem("cart", JSON.stringify(cart))
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
            const isCurrentlyWishlisted = wishlist.some((item: typeof featuredProducts[number]) => item.id === product.id)

            if (isCurrentlyWishlisted) {
                wishlist = wishlist.filter((item: typeof featuredProducts[number]) => item.id !== product.id)
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
            setIsWishlisted(!isCurrentlyWishlisted)
            window.dispatchEvent(new Event('wishlistUpdated'))
        } catch (error) {
            console.error('Error updating wishlist:', error)
            toast.error('Failed to update wishlist', {
                description: 'Please try again'
            })
        }
    }
    useEffect(() => {
        try {
            const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
            setIsWishlisted(wishlist.some((item: typeof featuredProducts[number]) => item.id === product.id))
        } catch (error) {
            console.error('Error loading wishlist status:', error)
        }
    }, [product.id])
    return (
        <motion.div
            transition={{ duration: 0.2 }}
            className="p-1"
        >

            <Card className="overflow-hidden border-2 border-green-100/50 shadow-xl group rounded-xl">
                <CardContent className="p-0">
                    <div className="relative">
                        <Link href={`/products/${product.id}`}>    <Image
                            src={product.images[0]}
                            alt={product.title}
                            width={500}
                            height={500}
                            className="w-full aspect-square object-cover"
                        />
                        </Link>

                        {product.discount > 0 && (
                            <Badge variant="destructive" className="absolute top-4 left-4 bg-green-600">
                                Save {product.discount}%
                            </Badge>
                        )}
                        <Badge variant="secondary" className="absolute top-4 right-4 bg-green-100 text-green-800">
                            {product.category}
                        </Badge>
                        <Button
                            variant="outline"
                            className={`absolute bottom-4 right-4 p-4 border-2 transition-colors duration-200 ${isWishlisted ? "bg-green-200 hover:bg-green-300" : "bg-white hover:bg-gray-100"}`}
                            onClick={toggleWishlist}
                            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            <Heart
                                weight={isWishlisted ? "fill" : "regular"}
                                className={`h-5 w-5 ${isWishlisted ? "text-green-600" : "text-gray-400"}`}
                            />
                        </Button>
                    </div>

                    <div className="p-6">
                        <Link href={`/products/${product.id}`}>
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                        {product.brand}
                                    </Badge>
                                    <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                                        <Star weight="fill" className="text-yellow-400 h-4 w-4" />
                                        <span className="text-sm text-green-700 font-medium">{product.rating}</span>
                                    </div>
                                </div>

                                <CardTitle className="text-xl font-semibold mb-3 line-clamp-2 text-gray-800">
                                    {product.title}
                                </CardTitle>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {product.benefits.map((benefit, index) => (
                                        <Badge key={index} variant="secondary" className="bg-green-100/50 text-green-700">
                                            {benefit}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-green-700">
                                            ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                                        </span>
                                        {product.discount > 0 && (
                                            <span className="text-sm text-gray-500 line-through">
                                                ${product.price}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <Button className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2 transition-all duration-200" onClick={addToCart}>
                            <ShoppingCart className="h-5 w-5" />
                            Add to Cart
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
