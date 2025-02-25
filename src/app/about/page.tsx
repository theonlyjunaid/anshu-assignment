import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
    title: 'About Us | Wellness Store',
    description: 'Learn about our mission to provide premium health supplements and wellness products. Discover our commitment to quality, customer care, and your journey to better health.',
}

const page = () => {
    return (
        <main className="min-h-screen bg-gradient-to-b from-green-50/50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Us</h1>

                <section className="mb-12 hover:bg-gray-50/50 rounded-xl p-6 transition-colors">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-green-100 p-2 rounded-lg mr-3">
                            🌱
                        </span>
                        Our Mission
                    </h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        At our core, we believe that everyone deserves access to high-quality health products
                        that enhance their wellbeing. We carefully select each product in our catalog,
                        ensuring it meets our strict standards for quality and effectiveness.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Our commitment goes beyond just selling products - we&apos;re here to educate and
                        support you on your wellness journey, providing expert guidance and
                        reliable health information.
                    </p>
                </section>

                <section className="mb-12 hover:bg-gray-50/50 rounded-xl p-6 transition-colors">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-blue-100 p-2 rounded-lg mr-3">
                            💫
                        </span>
                        Our Values
                    </h2>
                    <ul className="list-none text-gray-600 space-y-6">
                        <li className="flex items-start">
                            <span className="mr-3 text-blue-500 mt-1">•</span>
                            <div>
                                <h3 className="font-semibold mb-2">Quality First</h3>
                                <p className="leading-relaxed">
                                    We partner with trusted manufacturers and rigorously test all products
                                    to ensure the highest quality standards.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-blue-500 mt-1">•</span>
                            <div>
                                <h3 className="font-semibold mb-2">Customer Care</h3>
                                <p className="leading-relaxed">
                                    Your satisfaction and wellbeing are our top priorities. Our team is always
                                    here to help and support you.
                                </p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-3 text-blue-500 mt-1">•</span>
                            <div>
                                <h3 className="font-semibold mb-2">Sustainability</h3>
                                <p className="leading-relaxed">
                                    We&apos;re committed to eco-friendly practices and sustainable packaging
                                    to protect our planet.
                                </p>
                            </div>
                        </li>
                    </ul>
                </section>

                <section className="mb-12 hover:bg-gray-50/50 rounded-xl p-6 transition-colors">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-purple-100 p-2 rounded-lg mr-3">
                            🎯
                        </span>
                        Our Promise
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        We&apos;re dedicated to providing premium health supplements and wellness products
                        to help you live your healthiest life. Your journey to wellness starts here with us.
                    </p>
                </section>
            </div>
        </main>
    )
}

export default page