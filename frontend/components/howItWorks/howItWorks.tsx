/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Search, Download, Rocket, ChevronDown, ChevronUp } from "lucide-react";

export const HowItWorks = () => {
    const [isExpanded, setIsExpanded] = useState(false);

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

                    {/* Read More Button */}
                    <div className="flex justify-center w-full">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-2 px-6 py-3 bg-[#0077a2] text-white font-semibold rounded-lg hover:bg-[#005a7d] transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            {isExpanded ? "Show Less" : "Read More"}
                            {isExpanded ? (
                                <ChevronUp className="w-5 h-5" />
                            ) : (
                                <ChevronDown className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    {/* Expandable Content */}
                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            isExpanded ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                    >
                        <div className="flex flex-col gap-y-10 pt-6">
                            {/* Why Choose Pngpoint Section */}
                            <div className="flex flex-col gap-y-6">
                                <h2 className="text-2xl lg:text-3xl font-bold text-[#0077a2] text-center">
                                    Why Choose Pngpoint for Your Free PNG Resources?
                                </h2>
                                <p className="text-sm md:text-base text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
                                    Pngpoint provides high-quality, transparent PNG images tailored for designers, marketers, and AI enthusiasts. We optimize every asset in our library for seamless integration into web, print, and AI-driven design workflows, ensuring your projects stand out without the hassle of background removal.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-6">
                                    {/* Card 1 */}
                                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                        <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">
                                            High-Quality Transparent PNGs for Flawless Overlays
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                            Download our transparent PNG assets to layer images effortlessly without messy backgrounds. Whether you need a specific PNG file for web design or are searching for the best PNG images online, our library ensures a professional look for marketing materials and presentations.
                                        </p>
                                    </div>

                                    {/* Card 2 */}
                                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                        <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">
                                            Background-Free Assets for Seamless Composition
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                            Our library provides free PNG resources with no background options, ensuring your PNG graphics, illustrations, and icons blend effortlessly into any project. You can quickly replace backgrounds or merge high-quality PNG images online to add creative effects without the need for extra editing.
                                        </p>
                                    </div>

                                    {/* Card 3 */}
                                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                        <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">
                                            High-Quality PNGs for Web, Print, and AI Tools
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                            Our library features high-quality PNG files, each rendered in HD and optimized for multiple platforms. Whether you are building a website, creating social media visuals, or searching for free PNG assets for AI design tools, download our free PNG photos to retain maximum sharpness and clarity in every project.
                                        </p>
                                    </div>

                                    {/* Card 4 */}
                                    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                        <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">
                                            Ad-Friendly and Royalty-Free PNG Assets
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                                            All our free PNG resources are royalty-free and safe for commercial use, allowing you to integrate them into your projects confidently. Since these PNG images online come with no watermarks and require no attribution, they are perfectly suited for blogs, e-commerce, social media, and AI-generated designs.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Explore Collection Section */}
                            <div className="flex flex-col gap-y-6">
                                <h2 className="text-2xl lg:text-3xl font-bold text-[#0077a2] text-center">
                                    Explore Our Comprehensive Free PNG Collection
                                </h2>
                                <p className="text-sm md:text-base text-gray-600 text-center max-w-4xl mx-auto leading-relaxed">
                                    Discover a massive library of free PNG stock designed for every project. Each PNG image is high-quality, transparent, and ready for immediate use in web design, marketing, or creative projects. We organize our free PNG bundle into clear categories, making it easy to find exactly what you need.
                                </p>

                                <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 mt-6">
                                    <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-4">
                                        Assets by Type
                                    </h3>
                                    <ul className="space-y-3 text-sm md:text-base text-gray-600">
                                        <li className="flex items-start">
                                            <span className="text-[#0077a2] font-bold mr-2">•</span>
                                            <span><strong>PNG Icons:</strong> Perfect for apps, UI kits, and dashboards. These transparent HD PNG icons ensure seamless integration.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-[#0077a2] font-bold mr-2">•</span>
                                            <span><strong>PNG Clipart:</strong> Use these for presentations or school projects. Every PNG picture asset is optimized for instant download.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-[#0077a2] font-bold mr-2">•</span>
                                            <span><strong>PNG Design Elements:</strong> Enhance designs with high-quality PNG artwork. Ideal for blog visuals, banners, and social media posts.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-[#0077a2] font-bold mr-2">•</span>
                                            <span><strong>PNG Illustrations:</strong> High-resolution illustrations for digital art or marketing campaigns—part of our premium free PNG assets library.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-[#0077a2] font-bold mr-2">•</span>
                                            <span><strong>PNG Logos:</strong> Ready-to-use logos for branding and business presentations.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-[#0077a2] font-bold mr-2">•</span>
                                            <span><strong>PNG Backgrounds:</strong> Transparent backgrounds that work perfectly for overlaying text or high-quality PNG graphics.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};