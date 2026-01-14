/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GraduationCap, BookOpen, Presentation, Laptop } from "lucide-react";

export const EducationKidsAssets = () => {
    const features = [
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
    ];

    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-10 w-full">
                    {/* Header */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <h2 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                            Education & Kids-Friendly Assets
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600 max-w-4xl">
                            Teachers, parents, and educators love these PNGs because they&apos;re safe, clear, and easy to understand. Use them in worksheets, school presentations, learning apps, or classroom projects. We&apos;ve personally used these assets for interactive lessons, and students stay engaged when visuals are sharp and distraction-free.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {features.map((feature, index) => {
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
                                    Perfect for Educational Use
                                </h3>
                                <p className="text-sm md:text-base leading-relaxed">
                                    Whether you need a transparent PNG background for a teaching aid or a specific graphic for a report, our site ensures students and educators can work efficiently. All images are optimized for PowerPoint and Google Slides.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                                    <GraduationCap className="w-12 h-12 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};