/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Palette, Megaphone, Briefcase, GraduationCap, Cpu, Sparkles } from "lucide-react";

interface UseCase {
    id: number;
    icon: any;
    title: string;
    description: string;
}

const useCasesData: UseCase[] = [
    {
        id: 1,
        icon: Palette,
        title: "PNG Resources for Designers & Creative Professionals",
        description: "Designers can instantly access high-quality PNG images, including diverse PNG clipart and PNG illustration sets to enhance their creative workflows. Whether you are building website mockups, UI elements, or marketing visuals, these transparent assets integrate seamlessly into Photoshop, Figma, and Illustrator. By using our PNG graphics, designers can work faster, maintain consistency, and apply clear background images for professional results. Every PNG design asset in our library is HD and royalty-free—perfect for client work, portfolios, or personal projects with no attribution required."
    },
    {
        id: 2,
        icon: Megaphone,
        title: "PNG Assets for Content Creators & Digital Marketers",
        description: "Content creators, marketers, and social media managers can leverage our PNG graphics and HD transparent assets to craft engaging visuals for blogs and advertising campaigns. Our library of free PNG resources simplifies your workflow by providing ready-to-use PNG icons, logos, and banners that significantly improve audience engagement. Whether you are designing YouTube thumbnails, Instagram posts, or promotional materials, our PNG photos are fully compatible with online editing tools like Canva and Adobe Express. Using our PNG stock with no background ensures clean overlays and consistent branding across all digital platforms."
    },
    {
        id: 3,
        icon: Briefcase,
        title: "PNG Solutions for Small Businesses & Entrepreneurs",
        description: "Small business owners and startups can leverage our high-quality PNG files for product images, branding assets, and marketing collateral. Our PNG for e-commerce collection makes it easy to create professional Shopify, Amazon, or Etsy listings that attract more customers. From PNG for logo design to essential branding elements, all our assets are royalty-free and safe for commercial use. Businesses can download these PNGs for branding resources for multiple campaigns without worrying about watermarks, hidden costs, or copyright issues."
    },
    {
        id: 4,
        icon: GraduationCap,
        title: "Educational Graphics for Students & Educators",
        description: "Students, teachers, and educational content creators can find specialized PNG clipart, diagrams, and illustrations for academic projects and presentations. Using our free PNG assets helps create clean, visually appealing slides that make learning more engaging. Our library supports creative academic work by providing high-quality resources that are easy to implement in educational software like PowerPoint or Google Slides. Whether you need a transparent PNG background for a teaching aid or a specific graphic for a report, our site ensures students and educators can work efficiently."
    },
    {
        id: 5,
        icon: Cpu,
        title: "High-Resolution PNGs for AI & Tech Enthusiasts",
        description: "AI and tech enthusiasts can integrate our PNG for generative AI workflows, including Canva, MidJourney, DALL·E, and ChatGPT prompts. Our files are structured for seamless multimodal applications, making them the perfect PNG for AI tools and other advanced design platforms. High-resolution AI PNG image assets allow tools to generate digital outputs with extreme precision. Creators can perform a free PNG download to incorporate icons, illustrations, or graphics directly into their PNG for ChatGPT visual prompts without any background editing issues."
    }
];

export const UseCases = () => {
    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-10 w-full">
                    {/* Header */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <h2 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                            Use Cases by Audience
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600 max-w-3xl">
                            Explore how different users can benefit from our free transparent PNG images. Our library is designed to support creativity, efficiency, and professional results across multiple fields.
                        </p>
                    </div>

                    {/* Use Cases Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full">
                        {useCasesData.map((useCase) => {
                            const IconComponent = useCase.icon;
                            return (
                                <div
                                    key={useCase.id}
                                    className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                            <IconComponent className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-gray-800 leading-tight">
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

                    {/* Conclusion Section */}
                    <div className="bg-gradient-to-r from-[#0077a2] to-[#005a7d] rounded-2xl p-8 lg:p-12 text-center text-white shadow-xl mt-6">
                        <div className="flex justify-center mb-4">
                            <Sparkles className="w-12 h-12" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                            Start Creating with Pngpoint Today
                        </h2>
                        <p className="text-sm md:text-base leading-relaxed max-w-4xl mx-auto mb-6">
                            Find the perfect free PNG images with transparent backgrounds at Pngpoint, the trusted resource for designers, content creators, and businesses worldwide. Every high-quality PNG file is royalty-free and ready for personal or commercial use, optimized for both web design and AI workflows. Our library is designed for easy search, direct PNG download, and seamless integration into any project. Explore our massive free PNG collection of HD clipart, icons, and illustrations—all curated for quality and reliability. Start creating with Pngpoint today and bring your ideas to life effortlessly.
                        </p>
                        {/* <a
                            href="#search"
                            className="inline-block px-8 py-3 bg-white text-[#0077a2] font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                        >
                            Explore PNG Library
                        </a> */}
                    </div>
                </div>
            </div>
        </section>
    );
};