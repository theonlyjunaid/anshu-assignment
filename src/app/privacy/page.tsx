import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Privacy Policy | Wellness Store',
    description: 'Learn about how we collect, use, and protect your personal information. Our privacy policy outlines our commitment to data security and user privacy.',
}

const page = () => {
    return (
        <main className="min-h-screen bg-gradient-to-b from-green-50/50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto ">
                <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Privacy Policy</h1>

                <section className="mb-12 hover:bg-gray-50/50 rounded-xl p-6 transition-colors">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-green-100 p-2 rounded-lg mr-3">
                            🔍
                        </span>
                        Information We Collect
                    </h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        We collect information that you provide directly to us, including:
                    </p>
                    <ul className="list-none text-gray-600 space-y-3">
                        {[
                            "Name and contact information",
                            "Billing and shipping addresses",
                            "Payment information",
                            "Order history and preferences"
                        ].map((item, index) => (
                            <li key={index} className="flex items-center">
                                <span className="mr-3 text-green-500">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-12 hover:bg-gray-50/50 rounded-xl p-6 transition-colors">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-blue-100 p-2 rounded-lg mr-3">
                            📊
                        </span>
                        How We Use Your Information
                    </h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        We use the information we collect to:
                    </p>
                    <ul className="list-none text-gray-600 space-y-3">
                        {[
                            "Process your orders and payments",
                            "Communicate with you about your orders",
                            "Send you marketing communications (with your consent)",
                            "Improve our products and services",
                            "Comply with legal obligations"
                        ].map((item, index) => (
                            <li key={index} className="flex items-center">
                                <span className="mr-3 text-blue-500">•</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-12 hover:bg-gray-50/50 rounded-xl p-6 transition-colors">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-purple-100 p-2 rounded-lg mr-3">
                            🔒
                        </span>
                        Data Security
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                </section>

                <section className="mb-12 hover:bg-gray-50/50 rounded-xl p-6 transition-colors">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-yellow-100 p-2 rounded-lg mr-3">
                            ⚖️
                        </span>
                        Your Rights
                    </h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        You have the right to:
                    </p>
                    <ul className="list-none text-gray-600 space-y-3">
                        {[
                            "Access your personal information",
                            "Correct inaccurate information",
                            "Request deletion of your information",
                            "Opt-out of marketing communications"
                        ].map((item, index) => (
                            <li key={index} className="flex items-center">
                                <span className="mr-3 text-yellow-500">★</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-12 hover:bg-gray-50/50 rounded-xl p-6 transition-colors">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="bg-red-100 p-2 rounded-lg mr-3">
                            ✉️
                        </span>
                        Contact Us
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        If you have any questions about our Privacy Policy, please contact us at{' '}
                        <a href="mailto:privacy@wellnessstore.com" className="text-green-600 hover:text-green-700 underline">
                            privacy@wellnessstore.com
                        </a>
                    </p>
                </section>

                <p className="text-sm text-gray-500 text-center mt-12 border-t pt-8">
                    Last updated: March 2024
                </p>
            </div>
        </main>
    )
}

export default page