/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Shield, Download, Lightbulb } from "lucide-react";

interface LicensingDownloadProps {
    categorySlug?: string;
}

export const LicensingDownload = ({ categorySlug }: LicensingDownloadProps) => {
    // Determine if this is buildings category
    const isBuildingsCategory = categorySlug === 'buildings-and-architecture';

    // Animals content
    const animalsContent = {
        title: "Licensing & Download Information",
        subtitle: "Simple, transparent terms that keep your projects safe and hassle-free",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "We know licensing can be confusing, so we made it simple. All Animal PNG images are royalty-free, and most allow commercial and print use. If an image requires attribution, it's clearly noted on its page.",
            proTip: "Always double-check the license info before downloading—it keeps your projects safe and worry-free."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Whether you need one image or an entire set, downloading is easy. Choose free Animal PNG downloads, HD/high-resolution files, or transparent background PNGs depending on your project.",
            features: [
                "Single images or bulk downloads available",
                "Multiple resolution options for different needs",
                "Clean, ready-to-use files that save editing time"
            ]
        },
        cta: {
            title: "Start Downloading Today",
            description: "Access our complete Animal PNG library with clear licensing and instant downloads. No hidden fees, no watermarks—just high-quality graphics ready for your projects."
        }
    };

    // Buildings & Architecture content
    const buildingsContent = {
        title: "Licensing, Rights & Usage",
        subtitle: "Transparent, easy-to-understand licenses for confident use",
        licensing: {
            title: "Key Points",
            description: "Every Building and Architecture PNG comes with a transparent, easy-to-understand license. You can confidently use these assets without worrying about legal issues.",
            proTip: "Always double-check the license information displayed on each image page to ensure your intended use aligns with the terms. This helps maintain compliance for commercial or educational projects."
        },
        licensingKeyPoints: [
            { label: "Royalty-Free:", text: "Use PNGs for both digital and print projects without extra fees." },
            { label: "Commercial Use Allowed:", text: "Perfect for branding, marketing, presentations, and client work." },
            { label: "No Attribution Needed:", text: "Most PNGs don't require credit, unless specified in the license." }
        ],
        download: {
            title: "Download Options & File Quality",
            description: "Access high-resolution Building and Architecture PNGs optimized for professional use. Download individual images or entire collections based on your project requirements.",
            features: [
                "High-resolution files suitable for print and web",
                "Transparent backgrounds for seamless integration",
                "Organized collections by building type and style"
            ]
        },
        cta: {
            title: "Start Building Your Vision",
            description: "Access our complete Architecture PNG library with clear licensing and instant downloads. Professional-quality assets ready for architectural presentations, marketing materials, and design projects."
        }
    };
    const businessContent = {
        title: "Licensing, Rights & Usage",
        subtitle: "Transparent, easy-to-understand licenses for confident use",
        licensing: {
            title: "Key Points",
            description: "Every Business comes with a transparent, easy-to-understand license. You can confidently use these assets without worrying about legal issues.",
            proTip: "Always double-check the license information displayed on each image page to ensure your intended use aligns with the terms. This helps maintain compliance for commercial or educational projects."
        },
        licensingKeyPoints: [
            { label: "Royalty-Free:", text: "Use PNGs for both digital and print projects without extra fees." },
            { label: "Commercial Use Allowed:", text: "Perfect for branding, marketing, presentations, and client work." },
            { label: "No Attribution Needed:", text: "Most PNGs don't require credit, unless specified in the license." }
        ],
        download: {
            title: "Download Options & File Quality",
            description: "Access high-resolution Business optimized for professional use. Download individual images or entire collections based on your project requirements.",
            features: [
                "High-resolution files suitable for print and web",
                "Transparent backgrounds for seamless integration",
                "Organized collections by building type and style"
            ]
        },
        cta: {
            title: "Start Building Your Vision",
            description: "Access our complete Architecture PNG library with clear licensing and instant downloads. Professional-quality assets ready for architectural presentations, marketing materials, and design projects."
        }
    };

    const availableCat: Record<string, typeof animalsContent> = {
        animals: animalsContent,
        "buildings-and-architecture": buildingsContent,
        business: businessContent,
    };

    // Fallback to animalsContent if categorySlug is not found
    const content = categorySlug && availableCat[categorySlug] ? availableCat[categorySlug] : animalsContent;

    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-10 w-full">
                    {/* Header */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <h2 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                            {content.title}
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600 max-w-4xl">
                            {content.subtitle}
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
                        {/* Licensing & Usage Rights / Key Points */}
                        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <Shield className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 leading-tight pt-3">
                                    {content.licensing.title}
                                </h3>
                            </div>
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                                {content.licensing.description}
                            </p>
                            
                            {/* Key Points for Buildings, Pro Tip Box for Animals */}
                            {isBuildingsCategory ? (
                                <>
                                    <div className="space-y-3 mb-4">
                                        {buildingsContent.licensingKeyPoints.map((point, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                                <span className="text-sm md:text-base text-gray-700">
                                                    <strong>{point.label}</strong> {point.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-[#0077a2] p-4 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <Lightbulb className="w-5 h-5 text-[#0077a2] flex-shrink-0 mt-0.5" />
                                            <p className="text-sm md:text-base text-gray-700">
                                                <strong className="text-[#0077a2]">Pro Tip:</strong> {content.licensing.proTip}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-[#0077a2] p-4 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <Lightbulb className="w-5 h-5 text-[#0077a2] flex-shrink-0 mt-0.5" />
                                        <p className="text-sm md:text-base text-gray-700">
                                            <strong className="text-[#0077a2]">Pro tip:</strong> {content.licensing.proTip}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Download Options & File Quality */}
                        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <Download className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 leading-tight pt-3">
                                    {content.download.title}
                                </h3>
                            </div>
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                                {content.download.description}
                            </p>
                            <div className="space-y-3">
                                {content.download.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                        <span className="text-sm md:text-base text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="bg-gradient-to-r from-[#0077a2] to-[#005a7d] rounded-2xl p-8 lg:p-10 text-center shadow-xl">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                            {content.cta.title}
                        </h3>
                        <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-3xl mx-auto">
                            {content.cta.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};