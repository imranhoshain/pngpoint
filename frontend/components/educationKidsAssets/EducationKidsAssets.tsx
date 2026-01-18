/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GraduationCap, BookOpen, Presentation, Laptop, FileText, Palette, TrendingUp } from "lucide-react";

interface EducationKidsAssetsProps {
    categorySlug?: string;
}

export const EducationKidsAssets = ({ categorySlug }: EducationKidsAssetsProps) => {
    // Animals content
    const animalsContent = {
        title: "Education & Kids-Friendly Assets",
        description: "Teachers, parents, and educators love these PNGs because they're safe, clear, and easy to understand. Use them in worksheets, school presentations, learning apps, or classroom projects. We've personally used these assets for interactive lessons, and students stay engaged when visuals are sharp and distraction-free.",
        features: [
            {
                icon: GraduationCap,
                title: "Worksheets",
                description: "Create engaging learning materials"
            },
            {
                icon: Presentation,
                title: "School Presentations",
                description: "Make lessons visually appealing"
            },
            {
                icon: Laptop,
                title: "Learning Apps",
                description: "Build interactive educational tools"
            },
            {
                icon: BookOpen,
                title: "Classroom Projects",
                description: "Support creative academic work"
            }
        ],
        bottomCard: {
            title: "Perfect for Educational Use",
            description: "Whether you need a transparent PNG background for a teaching aid or a specific graphic for a report, our site ensures students and educators can work efficiently. All images are optimized for PowerPoint and Google Slides.",
            icon: GraduationCap
        }
    };

    // Buildings & Architecture content
    const buildingsContent = {
        title: "Education & Resources",
        description: "Unlock helpful guides and resources designed for architects, designers, and students. Our materials make it easy to use building and architecture PNGs effectively across projects.",
        keyTopicsTitle: "Key Topics",
        keyTopics: [
            { label: "Choosing PNGs for Architectural Presentations:", text: "Learn how to pick visuals that enhance client decks and proposals." },
            { label: "Using Transparent PNGs in Branding:", text: "Tips on integrating PNGs seamlessly into websites, brochures, and marketing campaigns." },
            { label: "Minimalism & Modern Architecture Visuals:", text: "Explore design trends and apply clean, contemporary styles with our curated PNGs." }
        ],
        features: [
            {
                icon: Presentation,
                title: "Architectural Presentations",
                description: "Enhance client proposals with professional visuals"
            },
            {
                icon: Palette,
                title: "Branding Integration",
                description: "Seamlessly blend PNGs into marketing materials"
            },
            {
                icon: TrendingUp,
                title: "Design Trends",
                description: "Stay current with modern architecture styles"
            },
            {
                icon: FileText,
                title: "Project Resources",
                description: "Access guides for effective PNG usage"
            }
        ],
        bottomCard: {
            title: "Resources That Save Time",
            description: "These resources help you save time, make smarter design decisions, and get the most out of every PNG in your projects.",
            icon: BookOpen
        }
    };

    const businessContent = {
        title: "Education & Kids-Friendly Assets",
        description: "Teachers, parents, and educators love these PNGs because they're safe, clear, and easy to understand. Use them in worksheets, school presentations, learning apps, or classroom projects. We've personally used these assets for interactive lessons, and students stay engaged when visuals are sharp and distraction-free.",
        features: [
            {
                icon: GraduationCap,
                title: "Worksheets",
                description: "Create engaging learning materials"
            },
            {
                icon: Presentation,
                title: "School Presentations",
                description: "Make lessons visually appealing"
            },
            {
                icon: Laptop,
                title: "Learning Apps",
                description: "Build interactive educational tools"
            },
            {
                icon: BookOpen,
                title: "Classroom Projects",
                description: "Support creative academic work"
            }
        ],
        bottomCard: {
            title: "Perfect for Educational Use",
            description: "Whether you need a transparent PNG background for a teaching aid or a specific graphic for a report, our site ensures students and educators can work efficiently. All images are optimized for PowerPoint and Google Slides.",
            icon: GraduationCap
        }
    };

    const availableCat: Record<string, typeof animalsContent> = {
        animals: animalsContent,
        "buildings-and-architecture": buildingsContent,
        business: businessContent,
    };

    // Fallback to animalsContent if categorySlug is not found
    const content = categorySlug && availableCat[categorySlug] ? availableCat[categorySlug] : animalsContent;

    const isBuildingsCategory = categorySlug === 'buildings-and-architecture';

    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-10 w-full">
                    {/* Header */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <h2 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                            {content.title}
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600 max-w-4xl">
                            {content.description}
                        </p>
                    </div>

                    {/* Key Topics Section for Buildings */}
                    {isBuildingsCategory && buildingsContent.keyTopics && (
                        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 max-w-4xl mx-auto w-full">
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">
                                {buildingsContent.keyTopicsTitle}
                            </h3>
                            <ul className="space-y-4">
                                {buildingsContent.keyTopics.map((topic, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                        <span className="text-sm md:text-base text-gray-700">
                                            <strong>{topic.label}</strong> {topic.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {content.features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center mb-4 mx-auto">
                                        <IconComponent className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 text-center">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom Info Card */}
                    <div className="bg-gradient-to-r from-[#0077a2] to-[#005a7d] rounded-2xl p-8 lg:p-10 shadow-xl">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex-1 text-white">
                                <h3 className="text-xl lg:text-2xl font-bold mb-3">
                                    {content.bottomCard.title}
                                </h3>
                                <p className="text-sm md:text-base leading-relaxed">
                                    {content.bottomCard.description}
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                                    {(() => {
                                        const BottomIcon = content.bottomCard.icon;
                                        return <BottomIcon className="w-12 h-12 text-white" />;
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};