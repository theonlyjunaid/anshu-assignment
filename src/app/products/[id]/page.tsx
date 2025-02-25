import { notFound } from 'next/navigation'
import { featuredProducts } from '@/lib/products'
import Product from './Product'
import { Metadata } from 'next'

export const generateStaticParams = () => {
    return featuredProducts.map((product) => ({
        id: product.id.toString(),
    }))
}

export const metadata: Metadata = {
    title: 'Product | Wellness Store',
    description: 'Explore our wide range of health supplements and wellness products. Find the perfect solution for your wellbeing journey.',
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const param = await params
    const productId = parseInt(param.id)

    const product = featuredProducts.find(
        (product) => product.id === productId
    )

    if (!product) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white ">
            <Product product={product} />
        </main>
    )
}