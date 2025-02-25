"use client"
import React, { useState } from 'react'
import { featuredProducts } from '@/lib/products'
import Filters from '@/components/home/Filters'
import ProductComp from '@/components/ProductComp'
const ProductsPage = () => {
    const [shortedProducts, setShortedProducts] = useState<typeof featuredProducts[number][]>(featuredProducts)
    return (
        <div className='bg-gradient-to-b from-green-50/50 grid grid-cols-1 md:grid-cols-3 md:gap-10 p-3 md:p-10 xl:p-20'>
            <div className='col-span-1'>
                <Filters products={featuredProducts} setShortedProducts={setShortedProducts} isProductsPage={true} />
            </div>
            <div className='col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8'>
                {shortedProducts.map((product) => (
                    <ProductComp key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default ProductsPage