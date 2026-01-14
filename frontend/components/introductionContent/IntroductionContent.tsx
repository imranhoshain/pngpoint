/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Info, CheckCircle, Shield, Download } from "lucide-react";

export const IntroductionContent = () => {
    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-10 w-full">
                    {/* Subheading */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <h2 className="text-xl lg:text-3xl font-bold text-[#0077a2]">
                            High-resolution, royalty-free, and ready to use
                        </h2>
                    </div>

                    {/* Introduction Text */}
                    <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 max-w-5xl mx-auto w-full">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                <Info className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                                    Animal PNG images help people save time when they need clean, ready-to-use visuals for design, learning, or business work. If you want transparent animal graphics that work on any background, this page solves that problem fast and clearly. At Pngpoint, we&apos;ve used animal PNGs in web layouts, kids&apos; projects, and branding work, and clean files always make the job easier.
                                </p>
                                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                                    That&apos;s why this collection focuses on high-quality, transparent PNG files with clear usage terms you can trust. Explore the animal PNG library and pick the images that fit your project today.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Why Choose Section */}
                    <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 max-w-5xl mx-auto w-full">
                        <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
                            Why Choose Our Animal PNG Collection
                        </h2>
                        <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-8">
                            Finding the right animal graphics should feel simple, not slow or confusing. This collection is built for creators who need clean, reusable Animal PNG images that work instantly across projects. Every file focuses on clarity, flexibility, and real-world use.
                        </p>
                        
                        {/* Key Benefits */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Key Benefits</h3>
                            </div>
                            <ul className="space-y-3 ml-13">
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                    <span className="text-base text-gray-700"><strong>Wide coverage:</strong> Wild animals, domestic pets, farm animals, jungle wildlife, zoo animals, aquatic life, and birds</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                    <span className="text-base text-gray-700"><strong>High-quality formats:</strong> Transparent PNG files, HD PNG images, sharp edges, clean cut-outs</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                    <span className="text-base text-gray-700"><strong>Flexible usage:</strong> Websites, branding, print designs, education materials, and kids&apos; projects</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                    <span className="text-base text-gray-700"><strong>Clear licensing:</strong> Simple usage terms explained upfront, no confusion before download</span>
                                </li>
                            </ul>
                        </div>

                        {/* What Makes It Reliable */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg lg:text-xl font-semibold text-gray-900">What Makes It Reliable</h3>
                            </div>
                            <ul className="space-y-3 ml-13">
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                    <span className="text-base text-gray-700">Thousands of curated animal PNG files</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                    <span className="text-base text-gray-700">Regular updates with new animals and styles</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                    <span className="text-base text-gray-700">Consistent licenses across the collection</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};