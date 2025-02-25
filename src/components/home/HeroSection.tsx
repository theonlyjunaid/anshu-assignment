'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MagnifyingGlass, CaretDown, X, Heart, Pill, Leaf, Brain } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useRouter } from 'next/navigation'

const HeroSection = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [isSearchFocused, setIsSearchFocused] = useState(false)
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)

        // Generate dynamic health-focused suggestions based on input
        if (value.trim()) {
            const searchTerms = [
                'vitamins & supplements',
                'organic products',
                'natural remedies',
                'wellness products',
                'health foods',
                'fitness equipment',
                'natural solutions',
                'holistic health'
            ]
            setSuggestions(
                searchTerms.map(term =>
                    term.toLowerCase().includes(value.toLowerCase())
                        ? term
                        : `${value} ${term}`
                )
            )
        } else {
            setSuggestions([])
        }
    }

    const clearSearch = () => {
        setSearchQuery('')
        setSuggestions([])
        setIsSearchFocused(false)
    }

    const categories = [
        { icon: Pill, label: 'Supplements', href: '/categories/supplements' },
        { icon: Leaf, label: 'Natural', href: '/categories/natural' },
        { icon: Heart, label: 'Wellness', href: '/categories/wellness' },
        { icon: Brain, label: 'Mental Health', href: '/categories/mental-health' }
    ]

    return (
        <section
            className="relative h-[700px] bg-cover bg-center"
            style={{ backgroundImage: 'url("/hero-banner.webp")' }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/50 backdrop-blur-[2px]" />
            <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight leading-tight max-w-2xl">
                            Your Journey to Better Health Starts Here
                        </h1>
                        <p className="text-lg sm:text-xl text-white mb-8 max-w-2xl">
                            Discover premium health & wellness products backed by science and nature
                        </p>

                        <div className="flex flex-wrap gap-4 mb-12">
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category.label}
                                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => router.push(category.href)}
                                    className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-white text-center cursor-pointer transition-colors"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <category.icon weight="light" className="h-6 w-6 mx-auto mb-2" />
                                    <span className="text-sm font-medium">{category.label}</span>
                                </motion.button>
                            ))}
                        </div>

                        <div className="max-w-2xl relative">
                            <form onSubmit={handleSearch} className="relative z-20">
                                <div className="relative">
                                    <div className="flex items-center relative">
                                        <MagnifyingGlass weight="bold" className="absolute left-6 text-emerald-600 h-5 w-5" />
                                        <Input
                                            type="text"
                                            value={searchQuery}
                                            onChange={handleSearchInput}
                                            onFocus={() => setIsSearchFocused(true)}
                                            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                            placeholder="Search for health products..."
                                            className="pl-14 pr-24 py-6 rounded-full text-lg bg-white/95 backdrop-blur-sm border-emerald-100 focus:border-emerald-300 transition-all shadow-lg focus:shadow-emerald-200/20"
                                        />
                                        {searchQuery && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={clearSearch}
                                                className="absolute right-20 hover:text-emerald-600 transition-colors"
                                            >
                                                <X className="h-5 w-5" />
                                                <span className="sr-only">Clear search</span>
                                            </Button>
                                        )}
                                        <Button
                                            type="submit"
                                            className="absolute right-2 rounded-full bg-emerald-600 hover:bg-emerald-700 transition-colors"
                                        >
                                            Search
                                        </Button>
                                    </div>

                                    <AnimatePresence>
                                        {suggestions.length > 0 && isSearchFocused && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute mt-2 w-full bg-white rounded-2xl shadow-xl border border-emerald-100 py-2 z-50"
                                            >
                                                <ScrollArea className="h-[300px]">
                                                    {suggestions.map((suggestion, index) => (
                                                        <motion.div
                                                            key={suggestion}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            className="px-4 py-3 hover:bg-emerald-50 cursor-pointer flex items-center justify-between group transition-all"
                                                            onClick={() => {
                                                                setSearchQuery(suggestion)
                                                                setSuggestions([])
                                                                handleSearch({ preventDefault: () => { } } as React.FormEvent)
                                                            }}
                                                        >
                                                            <div className="flex items-center">
                                                                <MagnifyingGlass
                                                                    weight="light"
                                                                    className="text-emerald-500 mr-3 h-4 w-4"
                                                                />
                                                                <span className="text-gray-700">{suggestion}</span>
                                                            </div>
                                                            <CaretDown
                                                                weight="bold"
                                                                className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity h-4 w-4"
                                                            />
                                                        </motion.div>
                                                    ))}
                                                </ScrollArea>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection