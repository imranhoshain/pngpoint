/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

interface BrowseCategoriesProps {
    categorySlug: string;
}

export const BrowseAnimalCategories = ({ categorySlug }: BrowseCategoriesProps) => {
    // Animals content
    const animalsContent = {
        categories: [
            {
                title: "Core Animal Types",
                items: [
                    "Wild Animals PNG",
                    "Domestic Animals PNG",
                    "Pet Animals PNG",
                    "Farm Animals PNG",
                    "Jungle Animals PNG",
                    "Zoo Animals PNG"
                ]
            },
            {
                title: "Nature & Species",
                items: [
                    "Aquatic & Sea Animals PNG",
                    "Birds PNG Images",
                    "Farm Animals PNG",
                    "Reptiles PNG",
                    "Pets PNG",
                    "Amphibians PNG",
                    "Insects PNG"
                ]
            },
            {
                title: "Styles & Formats",
                items: [
                    "Cute Animals PNG",
                    "Cartoon Animal PNG",
                    "Realistic Animal PNG",
                    "Animal Silhouette PNG"
                ]
            },
            {
                title: "Creative Assets",
                items: [
                    "Animal Face PNG",
                    "Animal Icons PNG",
                    "Animal Logo PNG",
                    "Animal Illustration PNG",
                    "Animal Clipart PNG",
                    "Animal Sticker PNG",
                    "Animal Vector PNG"
                ]
            }
        ],
        footer: "Each category opens a focused gallery, making downloads quick and stress-free."
    };

    // Buildings & Architecture content
    const buildingsContent = {
        categories: [
            {
                title: "Core Categories",
                items: [
                    "Building and Architecture PNG – versatile visuals for all project types",
                    "Modern Architecture PNG – sleek, contemporary structures",
                    "Commercial, Residential, Office, Apartment Building PNG – ready for branding, presentations, or digital layouts",
                    "Skyscraper & High-Rise Building PNG – cityscapes and skyline assets",
                    "House & Home PNG (Interior / Exterior) – realistic and decorative designs"
                ]
            },
            {
                title: "Design & Technical Assets",
                items: [
                    "Architectural Design PNG – professional-grade visuals for proposals",
                    "Architectural Elements PNG – doors, windows, facades, and structural icons",
                    "Blueprint Architecture PNG – technical plans and schematic overlays",
                    "Architectural Drawing PNG – detailed sketches for design inspiration"
                ]
            },
            {
                title: "Urban & Infrastructure",
                items: [
                    "Construction Site PNG – cranes, scaffolding, and project scenes",
                    "Cityscape & Urban Architecture PNG – urban planning and skyline visuals",
                    "Real Estate & Infrastructure PNG – ideal for marketing and property listings",
                    "Landmark & Historic Architecture PNG – iconic buildings from around the world"
                ]
            },
            {
                title: "Styles & Formats",
                items: [
                    "Minimal & Contemporary Architecture PNG – clean, modern designs",
                    "Architecture Illustration PNG – artistic representations for creative projects",
                    "Architecture Icons PNG – simplified, versatile symbols",
                    "Architecture Silhouette PNG – bold outlines for presentations",
                    "Architecture Clipart PNG – fun, creative design elements",
                    "Architecture Vector PNG – scalable designs for print and digital",
                    "HD / High-Resolution Building PNG – print-ready, crystal-clear visuals"
                ]
            }
        ],
        footer: "Each category links to a filtered gallery with previews, alt text, and practical use-case tips for designers, marketers, and educators."
    };

    // Select content based on category slug
    const content = categorySlug === 'animals' 
        ? animalsContent 
        : categorySlug === 'buildings-and-architecture'
        ? buildingsContent
        : null;

    // Don't render if no matching content
    if (!content) return null;

    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-10 w-full">
                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full">
                        {content.categories.map((category, categoryIndex) => (
                            <div 
                                key={categoryIndex}
                                className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 lg:p-8 shadow-md border border-gray-200"
                            >
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-5">
                                    {category.title}
                                </h3>
                                <ul className="space-y-3">
                                    {category.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-start text-sm md:text-base text-gray-700">
                                            <span className="w-2 h-2 bg-[#0077a2] rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Footer Text */}
                    <div className="text-center">
                        <p className="text-base lg:text-lg text-gray-700">
                            {content.footer}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};