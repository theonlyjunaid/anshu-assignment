"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Plus, Minus, List, CheckCircle } from "@phosphor-icons/react"
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'

interface CartItem {
    id: string
    title: string
    price: number
    images: string[]
    quantity: number
}

const Navbar = () => {
    const router = useRouter()
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [totalAmount, setTotalAmount] = useState(0)
    const [wishlistItems, setWishlistItems] = useState<CartItem[]>([])
    const [showDialog, setShowDialog] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isWishlistOpen, setIsWishlistOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const calculateTotal = (items: CartItem[]) => {
        return items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }

    const loadStorageData = useCallback(() => {
        try {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]")
            const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
            setCartItems(cart)
            setWishlistItems(wishlist)
            setTotalAmount(calculateTotal(cart))
        } catch (error) {
            console.error('Error loading cart/wishlist:', error)
            toast.error('Failed to load cart/wishlist data')
        }
    }, [])

    useEffect(() => {
        loadStorageData()

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "cart" || e.key === "wishlist") {
                loadStorageData()
            }
        }

        const handleCartUpdate = () => loadStorageData()
        const handleWishlistUpdate = () => loadStorageData()

        window.addEventListener('cartUpdated', handleCartUpdate)
        window.addEventListener('wishlistUpdated', handleWishlistUpdate)
        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate)
            window.removeEventListener('wishlistUpdated', handleWishlistUpdate)
            window.removeEventListener('storage', handleStorageChange)
        }
    }, [loadStorageData])

    const updateLocalStorage = (key: string, data: CartItem[]) => {
        localStorage.setItem(key, JSON.stringify(data))
        window.dispatchEvent(new Event(`${key}Updated`))
    }

    const removeFromCart = (productId: string) => {
        try {
            const updatedCart = cartItems.filter(item => item.id !== productId)
            updateLocalStorage("cart", updatedCart)
            setCartItems(updatedCart)
            setTotalAmount(calculateTotal(updatedCart))
            toast.success('Item removed from cart')
        } catch (error) {
            console.error('Error removing from cart:', error)
            toast.error('Failed to remove item')
        }
    }

    const updateQuantity = (productId: string, change: number) => {
        try {
            const updatedCart = cartItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: Math.max(1, Math.min(item.quantity + change, 99)) }
                    : item
            )
            updateLocalStorage("cart", updatedCart)
            setCartItems(updatedCart)
            setTotalAmount(calculateTotal(updatedCart))
        } catch (error) {
            console.error('Error updating quantity:', error)
            toast.error('Failed to update quantity')
        }
    }

    const toggleWishlist = (product: CartItem) => {
        try {
            const isCurrentlyWishlisted = wishlistItems.some(item => item.id === product.id)
            const updatedWishlist = isCurrentlyWishlisted
                ? wishlistItems.filter(item => item.id !== product.id)
                : [...wishlistItems, product]

            updateLocalStorage("wishlist", updatedWishlist)
            setWishlistItems(updatedWishlist)

            toast.success(
                isCurrentlyWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
                { description: isCurrentlyWishlisted ? 'You can add it back anytime' : 'You can remove it anytime' }
            )
        } catch (error) {
            console.error('Error updating wishlist:', error)
            toast.error('Failed to update wishlist', { description: 'Please try again' })
        }
    }

    const handleCheckout = () => {

        setShowDialog(true)
        updateLocalStorage("cart", [])
        setCartItems([])
        setTotalAmount(0)
        setIsCartOpen(false)
        setIsWishlistOpen(false)
        setIsMenuOpen(false)
    }

    const handleNavigation = (path: string) => {
        setIsCartOpen(false)
        setIsWishlistOpen(false)
        setIsMenuOpen(false)
        setShowDialog(false)
        router.push(path)
    }

    const CartItemComponent = ({ item }: { item: CartItem }) => (
        <div key={item.id} className="flex items-center gap-4 border-b pb-4">
            <Image
                src={item.images[0]}
                alt={item.title}
                width={60}
                height={60}
                className="rounded-md"
            />
            <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, -1)}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">{item.quantity}</span>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, 1)}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-sm font-medium mt-1">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <Button
                variant="destructive"
                size="sm"
                onClick={() => removeFromCart(item.id)}
            >
                Remove
            </Button>
        </div>
    )

    const WishlistItemComponent = ({ item }: { item: CartItem }) => (
        <div key={item.id} className="flex items-center gap-4 border-b pb-4">
            <Image
                src={item.images[0]}
                alt={item.title}
                width={60}
                height={60}
                className="rounded-md"
            />
            <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
            </div>
            <Button
                variant="outline"
                size="icon"
                onClick={() => toggleWishlist(item)}
            >
                <Heart weight="fill" className="h-4 w-4" />
            </Button>
        </div>
    )

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div onClick={() => handleNavigation('/')} className="flex items-center gap-2 cursor-pointer">
                    <span className="text-xl font-bold text-green-600">Wellness Store</span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4">
                    <div onClick={() => handleNavigation('/')} className="cursor-pointer">
                        Home
                    </div>
                    <div onClick={() => handleNavigation('/products')} className="cursor-pointer">
                        Products
                    </div>
                    <div onClick={() => handleNavigation('/about')} className="cursor-pointer">
                        About
                    </div>
                    <div onClick={() => handleNavigation('/privacy')} className="cursor-pointer">
                        Privacy
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* Mobile Menu */}

                    <Sheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <Heart className="w-6 h-6" />
                                {wishlistItems.length > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                                        {wishlistItems.length}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Wishlist</SheetTitle>
                            </SheetHeader>
                            <div className="mt-8 space-y-4">
                                {wishlistItems.length === 0 ? (
                                    <p className="text-center text-gray-500">Your wishlist is empty</p>
                                ) : (
                                    wishlistItems.map(item => (
                                        <WishlistItemComponent key={item.id} item={item} />
                                    ))
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <ShoppingCart className="w-6 h-6" />
                                {cartItems.length > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                                        {cartItems.length}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Shopping Cart</SheetTitle>
                            </SheetHeader>
                            <div className="mt-8 space-y-4">
                                {cartItems.length === 0 ? (
                                    <p className="text-center text-gray-500">Your cart is empty</p>
                                ) : (
                                    <>
                                        {cartItems.map(item => (
                                            <CartItemComponent key={item.id} item={item} />
                                        ))}
                                        <div className="pt-4 border-t">
                                            <div className="flex justify-between text-lg font-medium">
                                                <span>Total:</span>
                                                <span>${totalAmount.toFixed(2)}</span>
                                            </div>
                                            <Button className="w-full mt-4" onClick={handleCheckout}>
                                                Checkout
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <List className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-4 mt-8">
                                <div onClick={() => handleNavigation('/')} className="text-lg cursor-pointer">
                                    Home
                                </div>
                                <div onClick={() => handleNavigation('/products')} className="text-lg cursor-pointer">
                                    Products
                                </div>
                                <div onClick={() => handleNavigation('/about')} className="text-lg cursor-pointer">
                                    About
                                </div>
                                <div onClick={() => handleNavigation('/privacy')} className="text-lg cursor-pointer">
                                    Privacy
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                </div>
            </div>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-green-600">Purchase Successful!</DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Your order has been confirmed and will be processed shortly.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col items-center gap-4 py-4">
                        <div className="rounded-full bg-green-100 p-3">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>

                        <div className="text-center space-y-2">
                            <p className="text-gray-700">
                                Thank you for shopping with us! A confirmation email will be sent to your inbox.
                            </p>
                            <p className="text-sm text-gray-500">
                                Order number: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            className="w-full sm:w-auto"
                            onClick={() => handleNavigation('/products')}
                        >
                            Continue Shopping
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </nav>
    )
}

export default Navbar