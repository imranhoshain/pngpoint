/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Image as ImageIcon, Check } from "lucide-react";

export const FeaturedGalleryPreview = () => {
    const showcaseHighlights = [
        "High-Resolution Animal PNG for sharp detail",
        "Transparent Background PNG for clean overlays",
        "Royalty-Free PNG assets with clear usage terms"
    ];

    const smartFilters = [
        "Free Download",
        "Commercial Use",
        "Print Use",
        "Education",
        "Kids Projects",
        "Branding"
    ];

    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-10 w-full">
                    {/* Header */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <h2 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                            Featured Gallery Preview
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600 max-w-4xl">
                            Get a quick look at our most downloaded Animal PNG images in one place. This preview highlights high-resolution files with transparent backgrounds, ready for real projects. You can spot quality at a glance and download with confidence.
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full">
                        {/* Showcase Highlights */}
                        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border border-gray-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <ImageIcon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                                    Showcase Highlights
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                {showcaseHighlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-[#0077a2] rounded-full flex items-center justify-center mt-0.5">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-sm md:text-base text-gray-700 leading-relaxed">
                                            {highlight}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Smart Filters */}
                        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border border-gray-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                                    Smart Filters
                                </h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {smartFilters.map((filter, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-blue-50 to-white border border-[#0077a2] rounded-lg px-4 py-3 text-center hover:shadow-md transition-shadow duration-300"
                                    >
                                        <span className="text-sm md:text-base font-semibold text-[#0077a2]">
                                            {filter}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Text */}
                    <div className="bg-gradient-to-r from-[#0077a2] to-[#005a7d] rounded-2xl p-6 lg:p-8 text-center">
                        <p className="text-base lg:text-lg text-white font-medium">
                            Use filters to narrow results instantly and find the right PNG without extra clicks.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};