/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Palette, GraduationCap, Globe, Building2, Presentation, Users, Briefcase, TrendingUp } from "lucide-react";

interface PopularUseCasesProps {
    categorySlug?: string;
}

export const PopularUseCases = ({ categorySlug }: PopularUseCasesProps) => {
    // Animals content
    const animalsContent = {
        title: "Popular Use Cases",
        description: "Over the years, we've noticed one common problem—people spend too much time fixing images instead of using them. That's where clean animal PNGs make life easier. When the background is already transparent, you can focus on your work, not editing.",
        useCases: [
            {
                icon: Palette,
                title: "For Designers",
                description: "If you design banners, posters, or brand visuals, animal PNGs save hours. We've used them in print layouts and logos where sharp edges and clean transparency really matter. They drop straight into the design and just work."
            },
            {
                icon: GraduationCap,
                title: "For Education",
                description: "Teachers and parents often need visuals that kids understand fast. Animal PNGs help explain lessons, create worksheets, and build learning slides without confusion. Simple images keep students focused on learning, not clutter."
            },
            {
                icon: Globe,
                title: "For Web & Media",
                description: "For websites, blogs, and campaigns, animal PNGs add personality without slowing pages down. We've seen them boost engagement when used in headers, thumbnails, and featured sections."
            },
            {
                icon: Building2,
                title: "Industry-Specific",
                description: "Pet bloggers, vet clinics, animal NGOs, zoos, and aquariums use these images to communicate clearly and emotionally. The right visual helps tell the story better than words alone."
            }
        ]
    };

    // Buildings & Architecture content
    const buildingsContent = {
        title: "Popular Use Cases",
        description: "Architecture PNGs solve a real problem: finding clean, professional building visuals that work immediately. Whether you're pitching a design, building a presentation, or creating marketing materials, transparent backgrounds and high-resolution quality save hours of editing time.",
        useCases: [
            {
                icon: Presentation,
                title: "For Architects & Designers",
                description: "Architects and interior designers use building PNGs in presentations, mood boards, and client proposals. Clean visuals with transparent backgrounds integrate seamlessly into design software, helping communicate concepts clearly without distracting elements."
            },
            {
                icon: TrendingUp,
                title: "For Real Estate & Marketing",
                description: "Real estate agencies, property developers, and marketing teams rely on architecture PNGs for brochures, websites, and social media campaigns. Professional building visuals enhance credibility and help properties stand out in competitive markets."
            },
            {
                icon: GraduationCap,
                title: "For Education & Training",
                description: "Educational institutions and training programs use architecture PNGs in course materials, textbooks, and e-learning platforms. Clear building illustrations help students understand architectural concepts, urban planning, and construction principles effectively."
            },
            {
                icon: Briefcase,
                title: "For Business & Development",
                description: "Construction companies, urban planners, and business consultants leverage building PNGs for reports, feasibility studies, and project documentation. High-quality architectural visuals add professionalism to business communications and development proposals."
            }
        ]
    };

    // Select content based on category
    const content = categorySlug === 'buildings-and-architecture' 
        ? buildingsContent 
        : animalsContent;

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

                    {/* Use Cases Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
                        {content.useCases.map((useCase, index) => {
                            const IconComponent = useCase.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                            <IconComponent className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-gray-800 leading-tight pt-3">
                                            {useCase.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                        {useCase.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};