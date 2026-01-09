/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Search, Download, Rocket } from "lucide-react";

export const HowItWorks = () => {
    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-10 w-full">
                    {/* Header */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <h2 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                            How to Get Your Assets in 3 Simple Steps
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600 max-w-3xl">
                            Downloading high-quality resources from Pngpoint is fast, intuitive, and hassle-free. Follow these three simple steps to get your assets ready for personal or commercial projects.
                        </p>
                    </div>

                    {/* Three Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center bg-white rounded-xl p-6 lg:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-full flex items-center justify-center mb-4">
                                <Search className="w-8 h-8 text-white" />
                            </div>
                            <div className="w-12 h-12 bg-[#0077a2] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                                Find Your Perfect PNG
                            </h3>
                            <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">
                                Search our library or browse categories to locate the ideal asset. Whether you need a PNG for e-commerce, a PNG for social media, or a high-impact PNG for banners, our filters help you identify the right resolution and style in seconds.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center bg-white rounded-xl p-6 lg:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-full flex items-center justify-center mb-4">
                                <Download className="w-8 h-8 text-white" />
                            </div>
                            <div className="w-12 h-12 bg-[#0077a2] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                                Instant PNG Download
                            </h3>
                            <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">
                                Once you find what you need, use our direct PNG download system to get it immediately. There is no waiting time—every instant PNG download ensures a clean, watermark-free, and high-resolution file. We provide a fast PNG download experience, whether you need a single image or a free PNG download pack.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center bg-white rounded-xl p-6 lg:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-full flex items-center justify-center mb-4">
                                <Rocket className="w-8 h-8 text-white" />
                            </div>
                            <div className="w-12 h-12 bg-[#0077a2] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                                Use Freely for Any Project
                            </h3>
                            <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">
                                After downloading, integrate the assets into your workflow without restrictions. Our free unlimited PNG download service provides royalty-free PNG files and is 100% safe for business use. These are perfect for PNG for commercial use, requiring no attribution for marketing, branding, or AI-driven designs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};