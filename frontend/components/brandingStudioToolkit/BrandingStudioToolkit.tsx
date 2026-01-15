/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Palette, Package, Megaphone, Lightbulb } from "lucide-react";

interface BrandingStudioToolkitProps {
    categoryName?: string;
}

export const BrandingStudioToolkit = ({ categoryName = "Animal" }: BrandingStudioToolkitProps) => {
    const features = [
        {
            icon: Palette,
            title: "Logos & Icons",
            description: "Professional branding elements ready for immediate use in your brand identity"
        },
        {
            icon: Package,
            title: "Detailed Illustrations",
            description: "High-quality graphics perfect for packaging and product design"
        },
        {
            icon: Megaphone,
            title: "Ad Campaigns",
            description: "Eye-catching visuals for advertisements and marketing materials"
        },
        {
            icon: Lightbulb,
            title: "Digital Assets",
            description: "Versatile designs for websites, social media, and digital campaigns"
        }
    ];

    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-10 w-full">
                    {/* Header */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <h2 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                            Branding & Studio Toolkit
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600 max-w-4xl">
                            For designers and branding teams, {categoryName} PNGs go beyond simple illustrations. You get logos, icons, and detailed illustrations ready for ads, packaging, or digital campaigns.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center mb-4 mx-auto">
                                        <IconComponent className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pro Tip Card */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-[#0077a2] rounded-lg p-6 lg:p-8 shadow-md">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-[#0077a2] rounded-full flex items-center justify-center">
                                <Lightbulb className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2">
                                    Pro Tip
                                </h3>
                                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                    Use a consistent style across all visuals—it instantly improves brand recognition and design cohesion. This approach helps create a unified brand identity that resonates with your audience.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="bg-gradient-to-r from-[#0077a2] to-[#005a7d] rounded-2xl p-8 lg:p-10 text-center shadow-xl">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                            Elevate Your Brand Identity
                        </h3>
                        <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-3xl mx-auto">
                            Access professional-grade {categoryName} PNG assets designed specifically for branding projects. From startup logos to enterprise campaigns, our collection provides the visual foundation for memorable brand experiences.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};