/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Info, CheckCircle, Shield } from "lucide-react";

interface IntroductionContentProps {
    categorySlug?: string;
}

export const IntroductionContent = ({ categorySlug }: IntroductionContentProps) => {
    // Animals content
    const animalsContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "Animal PNG images help people save time when they need clean, ready-to-use visuals for design, learning, or business work. If you want transparent animal graphics that work on any background, this page solves that problem fast and clearly. At Pngpoint, we've used animal PNGs in web layouts, kids' projects, and branding work, and clean files always make the job easier.",
            "That's why this collection focuses on high-quality, transparent PNG files with clear usage terms you can trust. Explore the animal PNG library and pick the images that fit your project today."
        ],
        mainTitle: "Why Choose Our Animal PNG Collection",
        mainDescription: "Finding the right animal graphics should feel simple, not slow or confusing. This collection is built for creators who need clean, reusable Animal PNG images that work instantly across projects. Every file focuses on clarity, flexibility, and real-world use.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Wild animals, domestic pets, farm animals, jungle wildlife, zoo animals, aquatic life, and birds" },
                { label: "High-quality formats:", text: "Transparent PNG files, HD PNG images, sharp edges, clean cut-outs" },
                { label: "Flexible usage:", text: "Websites, branding, print designs, education materials, and kids' projects" },
                { label: "Clear licensing:", text: "Simple usage terms explained upfront, no confusion before download" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Thousands of curated animal PNG files",
                "Regular updates with new animals and styles",
                "Consistent licenses across the collection"
            ]
        }
    };

    // Buildings & Architecture content
    const buildingsContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "Architecture PNG images help designers, architects, and builders work faster by providing clean, ready-to-use visuals that integrate seamlessly into any project. Whether you need transparent building graphics, architectural icons, or complete structure designs, this collection delivers professional-quality assets that save hours of preparation time.",
            "Our Architecture PNGs slip seamlessly into projects, saving hours of cleanup and preparation. Explore the architecture PNG library and find the perfect visuals for your next project."
        ],
        mainTitle: "Why Choose Our Architecture PNGs",
        mainDescription: "Designers, architects, and builders know that speed and precision are key. Our Architecture PNGs slip seamlessly into projects, saving hours of cleanup and preparation.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Versatile formats:", text: "transparent PNGs, silhouettes, icons, and vector-style PNGs" },
                { label: "Consistent color palettes", text: "and balanced visuals across collections" },
                { label: "Clear licensing", text: "for web, print, marketing, and internal use" },
                { label: "SEO-friendly assets", text: "with clean file names, alt text, and structured metadata" }
            ]
        },
        reliableSection: {
            title: "Trusted by professionals",
            items: [
                "Architects, developers, educators, and marketers worldwide rely on PNGPoint",
                "Deliver reliable, high-quality building and architecture visuals",
                "Perfect for any project scale, from presentations to full-scale marketing campaigns"
            ]
        }
    };

    const businessContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "Business PNG images help professionals work faster when they need clean visuals for presentations, websites, or marketing materials. If you're looking for transparent business graphics that fit any background, this page gives you a clear solution without extra editing. At PNGPoint, we've used business PNGs in pitch decks, landing pages, and client proposals, and clean assets always save time. That's why this collection focuses on high-resolution, transparent PNG files with clear licenses you can trust. Browse the business PNG library and pick visuals that support your goals today."
        ],
        mainTitle: "Why Choose Our Business PNG Collection",
        mainDescription: "Creating business visuals should feel efficient, not frustrating.This collection is designed for marketers, designers, founders, and educators who need ready-to-use Business PNG images that fit real workflows. Because the files are clean and consistent, you spend less time fixing visuals and more time delivering results.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Wide coverage:", text: "Corporate, finance, marketing, startup, office, and e-commerce visuals" },
                { label: "High-quality formats:", text: "Transparent PNG files, HD resolution, sharp edges" },
                { label: "Flexible usage:", text: "Websites, presentations, branding, print, and education" },
                { label: "Clear licensing:", text: "Simple terms explained before download" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Curated business-focused PNG assets",
                "Regular updates with modern styles",
                "Consistent licensing across categories"
            ]
        }
    };

    // Culture & Religion content
    const cultureReligionContent = {
        subheading: "High-resolution, royalty-free, and ready to use",
        introText: [
            "Culture and Religion PNG images help creators communicate ideas that words alone often cannot. When you need clean visuals for beliefs, traditions, festivals, or cultural identity, transparent PNGs save time and reduce design friction.",
            "If you're working on educational content, editorial projects, branding, or presentations, this page gives you ready-to-use Culture and Religion graphics that fit naturally on any background. At PNGPoint, we've seen how culturally accurate visuals improve clarity and respect in real projects.",
            "That's why this collection focuses on high-quality, transparent PNG files with clear licensing. Explore the Culture and Religion PNG library and choose visuals that support your message with confidence."
        ],
        mainTitle: "Why Choose Our Culture and Religion PNG Collection",
        mainDescription: "Finding culturally respectful visuals should feel clear and reliable, not risky or confusing. This collection is built for designers, educators, and creators who need accurate Culture and Religion PNG images that work instantly across projects. Each file emphasizes clarity, symbolism, and practical use. As a result, you spend less time searching and more time creating meaningful content.",
        keyBenefits: {
            title: "Key Benefits",
            items: [
                { label: "Broad coverage:", text: "Global cultures, religions, traditions, rituals, and festivals" },
                { label: "High-quality formats:", text: "Transparent PNG files, HD resolution, clean cut-outs" },
                { label: "Flexible usage:", text: "Education, media, branding, print, web, and presentations" },
                { label: "Clear licensing:", text: "Royalty-free terms explained upfront for safe usage" }
            ]
        },
        reliableSection: {
            title: "What Makes It Reliable",
            items: [
                "Curated visuals focused on cultural accuracy",
                "Regular updates with new themes and traditions",
                "Consistent licensing across the entire collection"
            ]
        }
    };

    const availableCat: Record<string, typeof animalsContent> = {
        animals: animalsContent,
        "buildings-and-architecture": buildingsContent,
        business: businessContent,
        "culture-and-religion": cultureReligionContent,
    };

    // Fallback to animalsContent if categorySlug is not found
    const content = categorySlug && availableCat[categorySlug] ? availableCat[categorySlug] : animalsContent;

    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-10 w-full">
                    {/* Subheading */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <h2 className="text-xl lg:text-3xl font-bold text-[#0077a2]">
                            {content.subheading}
                        </h2>
                    </div>

                    {/* Introduction Text */}
                    <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 max-w-5xl mx-auto w-full">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                <Info className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                {content.introText.map((paragraph, index) => (
                                    <p 
                                        key={index} 
                                        className={`text-base lg:text-lg text-gray-700 leading-relaxed ${
                                            index < content.introText.length - 1 ? 'mb-4' : ''
                                        }`}
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Why Choose Section */}
                    <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 max-w-5xl mx-auto w-full">
                        <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
                            {content.mainTitle}
                        </h2>
                        <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-8">
                            {content.mainDescription}
                        </p>
                        
                        {/* Key Benefits */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
                                    {content.keyBenefits.title}
                                </h3>
                            </div>
                            <ul className="space-y-3 ml-13">
                                {content.keyBenefits.items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                        <span className="text-base text-gray-700">
                                            <strong>{item.label}</strong> {item.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* What Makes It Reliable / Trusted by professionals */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
                                    {content.reliableSection.title}
                                </h3>
                            </div>
                            <ul className="space-y-3 ml-13">
                                {content.reliableSection.items.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                        <span className="text-base text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};