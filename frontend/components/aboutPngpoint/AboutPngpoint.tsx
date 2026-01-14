/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sparkles, Download, Shield, Zap } from "lucide-react";

export const AboutPngpoint = () => {
    const features = [
        {
            icon: Download,
            title: "Fast Downloads",
            description: "Instant access to high-quality PNG files"
        },
        {
            icon: Shield,
            title: "Clear Licenses",
            description: "Royalty-free with transparent usage terms"
        },
        {
            icon: Zap,
            title: "Optimized Files",
            description: "Ready for web, print, and commercial use"
        },
        {
            icon: Sparkles,
            title: "Organized Library",
            description: "Easy navigation with categorized collections"
        }
    ];

    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-10 w-full">
                    {/* Header */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-10 h-10 text-[#0077a2]" />
                            <h2 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                                About Pngpoint
                            </h2>
                            <Sparkles className="w-10 h-10 text-[#0077a2]" />
                        </div>
                        <p className="text-base md:text-lg font-medium text-gray-700 max-w-4xl">
                            Your Source for Free Commercial-Grade PNG Assets
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-200">
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed text-center max-w-5xl mx-auto mb-8">
                            Animal PNGs at PNGPoint provide a curated collection of high-quality, transparent images for designers, educators, developers, and content creators. Whether you&apos;re building websites, creating educational materials, or designing branding assets, our library makes it easy to find clean, ready-to-use graphics. All PNGs are royalty-free, clear-licensed, and optimized for web, print, and commercial projects. With fast downloads, organized categories, and consistent quality, PNGPoint helps you create professional visuals quickly and efficiently.
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                            {features.map((feature, index) => {
                                const IconComponent = feature.icon;
                                return (
                                    <div
                                        key={index}
                                        className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center mb-4 mx-auto">
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-base font-bold text-gray-800 mb-2 text-center">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 text-center">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-[#0077a2] to-[#005a7d] rounded-2xl p-8 lg:p-10 text-center shadow-xl">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                            Start Creating with PNGPoint Today
                        </h3>
                        <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-4xl mx-auto mb-6">
                            Join thousands of designers, educators, and businesses who trust PNGPoint for their visual content needs. Explore our extensive library and bring your creative projects to life with professional-grade PNG assets.
                        </p>
                        <a
                            href="https://pngpoint.com"
                            className="inline-block px-8 py-3 bg-white text-[#0077a2] font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                        >
                            Explore Collection
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};