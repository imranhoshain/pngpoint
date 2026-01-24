/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Image as ImageIcon, Check, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MEDIA_URL, SERVER_URL } from "@/utils/api";

interface FeaturedGalleryPreviewProps {
    subCategorySlug?: string;
    categorySlug?: string;
}

export const FeaturedGalleryPreview = ({ subCategorySlug, categorySlug }: FeaturedGalleryPreviewProps) => {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    // Animals content
    const animalsContent = {
        title: "Featured Gallery Preview",
        description: "Get a quick look at our most downloaded Animal PNG images in one place. This preview highlights high-resolution files with transparent backgrounds, ready for real projects. You can spot quality at a glance and download with confidence.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "High-Resolution Animal PNG for sharp detail",
            "Transparent Background PNG for clean overlays",
            "Royalty-Free PNG assets with clear usage terms"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Print Use",
            "Education",
            "Kids Projects",
            "Branding"
        ],
        footerText: "Use filters to narrow results instantly and find the right PNG without extra clicks."
    };

    // Buildings & Architecture content
    const buildingsContent = {
        title: "Gallery Preview & Live Demos",
        description: "Explore our Building and Architecture PNG gallery with an interactive experience that makes finding the right visual effortless. Each PNG preview is designed to help you quickly evaluate quality, style, and usability before downloading.",
        showcaseTitle: "Preview Features",
        showcaseItems: [
            "Hover Zoom: Examine details instantly without opening a new page.",
            "License Summary: See usage rights clearly for each PNG.",
            "Quick Actions: Add images to your lightbox for later or download previews instantly."
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Category",
            "Style",
            "Color",
            "Resolution",
            "Commercial Use",
            "Print Ready"
        ],
        footerText: "This gallery ensures a smooth workflow for designers, architects, and marketers—saving time while giving full clarity on licensing and visual quality."
    };

    const businessContent = {
        title: "Gallery Preview & Live Demos",
        description: "Get a quick overview of our most downloaded Business PNG images.This preview highlights high-resolution files with transparent backgrounds that are ready for real business use.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "High-Resolution Business PNG for sharp clarity",
            "Transparent Background PNG for clean layouts",
            "Royalty-Free PNG assets with clear licenses"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Print Use",
            "Presentations",
            "Branding",
        ],
        footerText: "Use filters to find exactly what you need in seconds"
    };

    // Culture & Religion content
    const cultureReligionContent = {
        title: "Featured Gallery Preview",
        description: "Get a quick overview of popular Culture and Religion PNG images in one place. This preview highlights high-resolution files with transparent backgrounds, ready for real-world use. You can assess quality instantly and download with confidence.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "High-Resolution Culture and Religion PNG files",
            "Transparent Background PNGs for clean overlays",
            "Royalty-Free assets with clear usage terms"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Print Ready",
            "Education",
            "Media & Editorial",
            "Branding"
        ],
        footerText: "Use filters to narrow results quickly and reach the right PNG without unnecessary clicks."
    };

    // Drinks content
    const drinksContent = {
        title: "Featured Gallery Preview",
        description: "Preview our most downloaded Drinks PNGs. High-resolution files with transparent backgrounds, perfect for web, print, and marketing campaigns.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "High-resolution drinks PNGs for sharp detail",
            "Transparent background PNGs for clean overlays",
            "Royalty-free assets with clear usage terms"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Print Use",
            "Social Media",
            "Marketing Campaigns",
            "Branding"
        ],
        footerText: "Use filters to narrow results instantly and find the right PNG without extra clicks."
    };

    // Food content
    const foodContent = {
        title: "Featured Gallery Preview",
        description: "See the most downloaded Food PNG images in one place. This preview highlights high-resolution files with transparent backgrounds, ready for real use. You can check the quality at a glance and download with confidence.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "High-resolution Food PNG for sharp detail",
            "Transparent background PNG for clean overlays",
            "Royalty-free assets with clear usage rights"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Print Use",
            "Education",
            "Branding"
        ],
        footerText: "Filters help you find the right Food PNG faster."
    };

    // Graphic Resources content
    const graphicResourcesContent = {
        title: "Featured Gallery Preview",
        description: "Explore a curated preview of the most downloaded graphic resources in one place. This section highlights high-resolution assets with clean design and flexible usage. You can assess quality instantly and download with confidence.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "High-resolution graphics for sharp visuals",
            "Transparent and layered files for easy editing",
            "Royalty-free assets with clear usage terms"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Print Use",
            "Education",
            "Branding"
        ],
        footerText: "Use filters to narrow results quickly and stay focused."
    };

    // Hobbies & Leisure content
    const hobbiesLeisureContent = {
        title: "Featured Gallery Preview",
        description: "See a curated preview of popular Hobbies and Leisure graphic resources in one place. These assets highlight clean design, balanced colors, and versatile formats. Because every preview shows real-use quality, you can choose visuals with confidence.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "High-resolution graphics for sharp detail",
            "Transparent and flexible backgrounds",
            "Royalty-free resources for repeated use"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Print Ready",
            "Education Friendly",
            "Social Media Use"
        ],
        footerText: "Filters help you find the right graphic faster, with fewer clicks."
    };

    // Industry content
    const industryContent = {
        title: "Featured Gallery Preview",
        description: "Preview our most downloaded Industry PNGs. High-resolution, transparent files ready for presentations, websites, and print materials. Spot quality at a glance and download instantly.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "High-resolution for sharp detail",
            "Transparent backgrounds for professional overlays",
            "Royalty-free with clear licensing"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Print Use",
            "Business Presentations",
            "Corporate Branding",
            "Marketing Materials"
        ],
        footerText: "Use filters to quickly find the right Industry PNG for your professional projects."
    };

    // Landscape content
    const landscapeContent = {
        title: "Featured Gallery Preview",
        description: "Get a quick look at the most downloaded Landscape PNG images in one place. This preview highlights high-resolution files with transparent backgrounds, ready for real projects. You can review quality instantly and download with confidence.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "High-resolution Landscape PNG for detailed visuals",
            "Transparent background PNG for seamless overlays",
            "Royalty-free PNG assets with clear usage terms"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Print Use",
            "Education",
            "Web Design",
            "Branding"
        ],
        footerText: "Use filters to narrow results instantly and find the right landscape PNG without extra clicks."
    };

    // Lifestyle content
    const lifestyleContent = {
        title: "Featured Gallery Preview",
        description: "Quickly explore the most downloaded Lifestyle PNGs. Preview high-resolution, transparent graphics ready for professional projects.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "HD resolution for crisp details",
            "Transparent backgrounds for clean overlays",
            "Royalty-free usage with clear licensing"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Print Use",
            "Social Media",
            "Education",
            "Personal Projects",
            "Branding"
        ],
        footerText: "Use filters to find the perfect Lifestyle PNG faster and easier."
    };

    // People content
    const peopleContent = {
        title: "Featured Gallery Preview",
        description: "See our most popular People PNG images in high resolution with transparent backgrounds. Preview highlights quality at a glance and download instantly.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "HD People PNG for sharp detail",
            "Transparent backgrounds for overlays",
            "Royalty-free with clear usage terms"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Print Use",
            "Education",
            "Branding"
        ],
        footerText: "Use filters to find the perfect People PNG quickly and efficiently."
    };

    // Plants & Flowers content
    const plantsFlowersContent = {
        title: "Featured Gallery Preview",
        description: "Preview our most popular Plants & Flowers PNGs in one place. These high-resolution, transparent files are ready for real projects. Download with confidence and spot quality instantly.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "HD Plant & Flower PNGs for crisp detail",
            "Transparent backgrounds for easy overlays",
            "Royalty-free assets with clear usage terms"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Print Use",
            "Education",
            "Kids Projects",
            "Branding"
        ],
        footerText: "Use filters to find the right PNG without extra clicks."
    };

    // Social Issues content
    const socialIssuesContent = {
        title: "Featured Gallery Preview",
        description: "Get a quick overview of popular Social Issues PNG images in one place. This preview highlights transparent, high-resolution visuals suitable for real-world use. You can assess quality instantly and download without friction.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "High-resolution Social Issues PNG for clear messaging",
            "Transparent background PNG for clean layouts",
            "Royalty-free assets with clear usage guidance"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Education",
            "Nonprofit Campaigns",
            "Print Ready",
            "Social Media"
        ],
        footerText: "Filters help you reach the right PNG faster."
    };

    // Science content
    const scienceContent = {
        title: "Featured Gallery Preview",
        description: "See the most downloaded Science PNG images at a glance. This preview highlights transparent, high-resolution files used in real educational and professional projects. You can judge quality instantly and download without hesitation.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "High-Resolution Science PNG for clear detail",
            "Transparent Background PNG for clean overlays",
            "Royalty-Free assets with clear usage terms"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Education",
            "Print Ready",
            "Presentation",
            "App & Web Use"
        ],
        footerText: "Filters help you narrow results quickly and efficiently."
    };

    // Sports content
    const sportsContent = {
        title: "Featured Gallery Preview",
        description: "Quickly view our most downloaded sports PNGs in one place. High-resolution files with transparent backgrounds are ready for real projects. Spot quality at a glance and download confidently.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "High-Resolution Sports PNG for sharp detail",
            "Transparent Background PNG for clean overlays",
            "Royalty-Free PNG assets with clear usage terms"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Print Use",
            "Education",
            "Kids Projects",
            "Branding"
        ],
        footerText: "Use filters to narrow results instantly and find the right PNG without extra clicks."
    };

    // States of Mind content
    const statesOfMindContent = {
        title: "Featured Gallery Preview",
        description: "Take a glance at our most popular States of Mind visuals. Each preview highlights high-resolution, ready-to-use images suitable for creative, educational, or professional projects.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "High-resolution visuals for sharp detail",
            "Transparent PNGs for clean overlays",
            "Royalty-free assets with clear licensing"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Print Use",
            "Educational Use",
            "Mindfulness & Wellness",
            "Creative Projects"
        ],
        footerText: "Use filters to find the right visual quickly and efficiently."
    };

    // Technology content
    const technologyContent = {
        title: "Featured Gallery Preview",
        description: "Get a quick look at the most downloaded Technology PNG images in one place. This preview highlights transparent, high-resolution files ready for real digital and print use. You can spot quality instantly and choose assets without second guessing.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "High-resolution Technology PNG for clear visuals",
            "Transparent background PNG for smooth overlays",
            "Royalty-free tech assets with clear usage rights"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "App & Web UI",
            "Presentation",
            "Education",
            "Branding"
        ],
        footerText: "Use filters to narrow results quickly and find exactly what you need."
    };

    // Environment content
    const environmentContent = {
        title: "Featured Gallery Preview",
        description: "Get a quick look at our most downloaded Environment PNG images in one place. This preview highlights transparent, high-resolution files designed for real-world projects. You can review quality instantly and download with confidence.",
        showcaseTitle: "Showcase Highlights",
        showcaseItems: [
            "High-Resolution Environment PNG for sharp detail",
            "Transparent Background PNG for clean overlays",
            "Royalty-Free PNG assets with clear usage terms"
        ],
        filtersTitle: "Smart Filters",
        filters: [
            "Free Download",
            "Commercial Use",
            "Print Use",
            "Education",
            "Awareness Campaigns",
            "Branding"
        ],
        footerText: "Use filters to find the right PNG without extra clicks."
    };

    // Select content based on category
    const availableCat: Record<string, typeof animalsContent> = {
        animals: animalsContent,
        "buildings-and-architecture": buildingsContent,
        business: businessContent,
        "culture-and-religion": cultureReligionContent,
        drinks: drinksContent,
        food: foodContent,
        "graphic-resources": graphicResourcesContent,
        "hobbies-and-leisure": hobbiesLeisureContent,
        industry: industryContent,
        landscapes: landscapeContent,
        lifestyle: lifestyleContent,
        people: peopleContent,
        "plants-and-flowers": plantsFlowersContent,
        "social-issues": socialIssuesContent,
        science: scienceContent,
        sports: sportsContent,
        "states-of-mind": statesOfMindContent,
        technology: technologyContent,
        "the-environment": environmentContent,
    };

    // Fallback to animalsContent if categorySlug is not found
    const content = categorySlug && availableCat[categorySlug] ? availableCat[categorySlug] : animalsContent;

    useEffect(() => {
        if (subCategorySlug) {
            fetchImages(currentPage);
        }
    }, [subCategorySlug, currentPage]);

    const fetchImages = async (page: number) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${SERVER_URL}/images/sub-categories/${subCategorySlug}?page=${page}&limit=20`
            );
            if (!res.ok) throw new Error("Failed to fetch images");
            const data = await res.json();
            
            setImages(data?.results?.images || []);
            setTotalPages(Math.ceil((data?.count || 100) / 100));
        } catch (err: any) {
            console.error("Error fetching images:", err);
            setImages([]);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            // Scroll to top of gallery
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

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
                            {content.description}
                        </p>
                    </div>

                    {/* Image Gallery */}
                    {subCategorySlug && (
                        <div className="w-full">
                            {loading ? (
                                <div className="flex items-center justify-center py-20">
                                    <div className="w-12 h-12 border-4 border-[#0077a2] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : images.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
                                        {images.map((image: any) => (
                                            <Link
                                                href={`/image/${image.slug}`}
                                                key={image.id}
                                                className="group relative block w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white p-3"
                                            >
                                                <div className="relative w-full aspect-square overflow-hidden rounded">
                                                    <Image
                                                        className="w-auto h-auto object-fill"
                                                        src={image.cloudflare_url}
                                                        alt={image.title}
                                                        title={image.title}
                                                        content={image.description}
                                                        width={352}
                                                        height={352}
                                                    />
                                                </div>
                                                <h4 className="mt-2 text-sm font-medium text-gray-800 truncate text-center">
                                                    {image.title}
                                                </h4>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex justify-center items-center gap-2 mt-8">
                                            <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>

                                            <div className="flex gap-2">
                                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                                    let pageNum;
                                                    if (totalPages <= 5) {
                                                        pageNum = i + 1;
                                                    } else if (currentPage <= 3) {
                                                        pageNum = i + 1;
                                                    } else if (currentPage >= totalPages - 2) {
                                                        pageNum = totalPages - 4 + i;
                                                    } else {
                                                        pageNum = currentPage - 2 + i;
                                                    }

                                                    return (
                                                        <button
                                                            key={pageNum}
                                                            onClick={() => handlePageChange(pageNum)}
                                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                                currentPage === pageNum
                                                                    ? "bg-[#0077a2] text-white"
                                                                    : "border border-gray-300 hover:bg-gray-100"
                                                            }`}
                                                        >
                                                            {pageNum}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-gray-600">No images found</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full">
                        {/* Showcase Highlights / Preview Features */}
                        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border border-gray-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <ImageIcon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                                    {content.showcaseTitle}
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                {content.showcaseItems.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-[#0077a2] rounded-full flex items-center justify-center mt-0.5">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-sm md:text-base text-gray-700 leading-relaxed">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Smart Filters */}
                        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border border-gray-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <Filter className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                                    {content.filtersTitle}
                                </h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {content.filters.map((filter, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-blue-50 to-white border border-[#0077a2] rounded-lg px-4 py-3 text-center hover:shadow-md transition-shadow duration-300"
                                    >
                                        <span className="text-sm md:text-base font-semibold text-[#0077a2]">
                                            {filter}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {categorySlug === 'buildings-and-architecture' && (
                                <p className="mt-4 text-xs md:text-sm text-gray-600 text-center">
                                    Browse by Category, Style, Color, or Resolution to find exactly what fits your project.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Footer Text */}
                    <div className="bg-gradient-to-r from-[#0077a2] to-[#005a7d] rounded-2xl p-6 lg:p-8 text-center">
                        <p className="text-base lg:text-lg text-white font-medium">
                            {content.footerText}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};