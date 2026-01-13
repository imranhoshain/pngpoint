/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MEDIA_URL, SERVER_URL } from "@/utils/api";

// Category descriptions mapping
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
    "animals": "High-detail PNGs of animals for educational and creative media.",
    "buildings-and-architecture": "Transparent architectural elements, structures, and cityscapes for design mockups.",
    "business": "Professional icons and graphics for presentations, reports, and branding.",
    "culture-and-religion": "Diverse cultural symbols and religious assets for global design projects.",
    "drinks": "HD food items and beverage PNGs for menus, ads, and culinary blogs.",
    "food": "HD food items and beverage PNGs for menus, ads, and culinary blogs.",
    "graphic-resources": "Essential design components including shapes, textures, and UI elements.",
    "hobbies-and-leisure": "Creative assets for personal interests, gaming, and recreational content.",
    "industry": "Technical graphics for industrial reports, logistics, and engineering visuals.",
    "landscapes": "Transparent natural scenery and outdoor elements for background compositing.",
    "lifestyle": "High-quality PNGs depicting everyday activities and lifestyle themes.",
    "people": "Isolated human figures and character assets for diverse storytelling.",
    "plants-and-flowers": "Detailed botanical PNGs for floral designs and environmental projects.",
    "science": "Precise diagrams and scientific assets for academic and technical use.",
    "social-issues": "Visual resources for awareness campaigns and social commentary.",
    "sports": "Action-oriented graphics for athletic branding and sports media.",
    "states-of-mind": "Conceptual PNGs representing emotions, psychology, and mental health.",
    "technology": "Modern tech assets for software reviews, IT blogs, and digital innovation.",
    "the-environment": "Eco-friendly icons and graphics for sustainability and green projects.",
    "transport": "Transparent vehicles and logistics assets for travel and shipping industries.",
    "travel": "Destination-themed PNGs for travel agencies and vacation planning.",
};

// Helper function to get description by category slug or name
const getCategoryDescription = (category: any): string => {
    const slug = category.slug?.toLowerCase() || "";
    const name = category.name?.toLowerCase() || "";
    
    // Try exact slug match first
    if (CATEGORY_DESCRIPTIONS[slug]) {
        return CATEGORY_DESCRIPTIONS[slug];
    }
    
    // Try to find by partial match in name
    const matchingKey = Object.keys(CATEGORY_DESCRIPTIONS).find(key => {
        const cleanKey = key.replace(/-/g, " ");
        return name.includes(cleanKey) || cleanKey.includes(name);
    });
    
    return matchingKey ? CATEGORY_DESCRIPTIONS[matchingKey] : "";
};

export const HomeCategories = () => {
    const [categoriesData, setCategoriesData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${SERVER_URL}/images/categories`)
            .then(res => res.json())
            .then(data => setCategoriesData(data.data || []))
            .catch(err => console.error("Failed to fetch categories:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section className="relative top-0 left-0 right-0 py-5 lg:py-10 w-full bg-white">
                <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                    <p className="text-center py-10">Loading categories...</p>
                </div>
            </section>
        );
    }

    if (categoriesData.length === 0) return null;

    return (
        <section className="relative top-0 left-0 right-0 py-5 lg:py-10 w-full bg-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-5 lg:gap-y-10 w-full">
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <h2 className="text-xl lg:text-3xl font-bold text-[#0077a2]">
                            Browse PNG Categories
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600">
                            Explore our organized collection of PNG images by category
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-5 w-full">
                        {categoriesData.slice(0, 12).map(category => {
                            const description = getCategoryDescription(category);
                            
                            return (
                                <Link
                                    className="group relative block w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
                                    href={`/categories/${category.slug}`}
                                    key={category.id}
                                >
                                    <div className="relative w-full aspect-square overflow-hidden">
                                        <img
                                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                            src={category.icon ? `${MEDIA_URL}${category.icon}` : ""}
                                            alt={category.name}
                                            width={300}
                                            height={300}
                                            title={category.name}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                                        
                                        {/* Default view - just category name */}
                                        <div className="absolute bottom-0 left-0 right-0 p-3 transition-opacity duration-300 group-hover:opacity-0">
                                            <h3 className="text-sm md:text-base text-white font-semibold text-center line-clamp-2">
                                                {category.name}
                                            </h3>
                                        </div>
                                        
                                        {/* Hover view - name and description */}
                                        {description && (
                                            <div className="absolute inset-0 p-3 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80">
                                                <p className="text-xs text-gray-200 text-center line-clamp-4 px-1">
                                                    {description}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {categoriesData.length > 12 && (
                        <div className="flex justify-center w-full mt-5">
                            <Link
                                href="/categories"
                                className="px-6 py-3 bg-[#0077a2] hover:bg-[#005a7d] text-white font-semibold rounded-lg transition-colors duration-300"
                            >
                                View All Categories
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};