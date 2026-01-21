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

    const businessContent = {
        categories: [
            {
                title: "Core Business Types",
                items: [
                    "Corporate Business PNG",
                    "Startup Business PNG",
                    "Small Business PNG",
                    "Office & Workplace PNG",
                    "Professional Team PNG"
                ]
            },
            {
                title: "Industry & Function",
                items: [
                    "Finance & Accounting PNG",
                    "Marketing & Advertising PNG",
                    "Sales & Growth PNG",
                    "E-commerce Business PNG",
                    "Technology & SaaS PNG"
                ]
            },
            {
                title: "Styles & Formats",
                items: [
                    "Flat Business PNG",
                    "Minimal Business PNG",
                    "Isometric Business PNG",
                    "Business Silhouette PNG"
                ]
            },
            {
                title: "Creative Assets",
                items: [
                    "Business Icons PNG",
                    "Business Logo PNG",
                    "Business Illustration PNG",
                    "Business Clipart PNG",
                    "Business Vector PNG"
                ]
            }
        ],
        footer: "Each category leads to a clean, filtered gallery for fast downloads."
    };

    // Culture & Religion content
    const cultureReligionContent = {
        categories: [
            {
                title: "Core Culture & Religion Themes",
                items: [
                    "Culture PNG",
                    "Religion PNG",
                    "World Religions PNG",
                    "Cultural Symbols PNG",
                    "Religious Symbols PNG"
                ]
            },
            {
                title: "Religions & Belief Systems",
                items: [
                    "Islam PNG",
                    "Christianity PNG",
                    "Hinduism PNG",
                    "Buddhism PNG",
                    "Judaism PNG",
                    "Sikhism PNG"
                ]
            },
            {
                title: "Traditions & Festivals",
                items: [
                    "Religious Festival PNG",
                    "Cultural Festival PNG",
                    "Prayer & Worship PNG",
                    "Ritual & Ceremony PNG",
                    "Spiritual Symbols PNG"
                ]
            },
            {
                title: "Styles & Formats",
                items: [
                    "Religious Icon PNG",
                    "Culture Illustration PNG",
                    "Cultural Silhouette PNG",
                    "Minimal Religious PNG"
                ]
            },
            {
                title: "Creative & Educational Assets",
                items: [
                    "Culture Icon PNG",
                    "Religion Logo PNG",
                    "Cultural Clipart PNG",
                    "Religious Vector PNG",
                    "Culture Illustration PNG"
                ]
            }
        ],
        footer: "Each category opens a filtered gallery, so downloads stay quick and stress-free."
    };

    // Drinks content
    const drinksContent = {
        categories: [
            {
                title: "Core Drink Types",
                items: [
                    "Coffee PNG",
                    "Tea PNG",
                    "Soda PNG",
                    "Juice PNG",
                    "Cocktail PNG",
                    "Wine PNG",
                    "Beer PNG"
                ]
            },
            {
                title: "Drink Styles & Formats",
                items: [
                    "Cold Drinks PNG",
                    "Hot Drinks PNG",
                    "Cartoon Drinks PNG",
                    "Realistic Drinks PNG",
                    "Beverage Silhouette PNG"
                ]
            },
            {
                title: "Creative Assets",
                items: [
                    "Drink Icons PNG",
                    "Drink Logo PNG",
                    "Drink Illustration PNG",
                    "Drink Clipart PNG",
                    "Drink Sticker PNG",
                    "Drink Vector PNG"
                ]
            }
        ],
        footer: "Each category opens a focused gallery for quick, easy downloads."
    };

    // Food content
    const foodContent = {
        categories: [
            {
                title: "Core Food Types",
                items: [
                    "Fruits PNG",
                    "Vegetables PNG",
                    "Fast Food PNG",
                    "Snacks PNG",
                    "Desserts PNG",
                    "Street Food PNG"
                ]
            },
            {
                title: "Meals & Ingredients",
                items: [
                    "Breakfast Food PNG",
                    "Lunch & Dinner PNG",
                    "Ingredients PNG",
                    "Spices PNG",
                    "Bakery Items PNG",
                    "Seafood PNG"
                ]
            },
            {
                title: "Styles & Formats",
                items: [
                    "Realistic Food PNG",
                    "Cartoon Food PNG",
                    "Cute Food PNG",
                    "Food Silhouette PNG"
                ]
            },
            {
                title: "Creative Assets",
                items: [
                    "Food Icons PNG",
                    "Food Logo PNG",
                    "Food Illustration PNG",
                    "Food Clipart PNG",
                    "Food Sticker PNG",
                    "Food Vector PNG"
                ]
            }
        ],
        footer: "Each category opens a focused gallery, so downloads stay fast and stress-free."
    };

    // Graphic Resources content
    const graphicResourcesContent = {
        categories: [
            {
                title: "Core Graphic Types",
                items: [
                    "Icons & Symbols",
                    "Illustrations",
                    "Vectors & Line Art",
                    "UI & UX Elements",
                    "Mockups & Templates"
                ]
            },
            {
                title: "Design Styles",
                items: [
                    "Minimal & Flat Design",
                    "Cartoon & Creative Graphics",
                    "Realistic & Detailed Assets",
                    "Silhouettes & Outline Graphics"
                ]
            },
            {
                title: "Creative Assets",
                items: [
                    "Logo Templates",
                    "Infographics & Charts",
                    "Backgrounds & Patterns",
                    "Stickers & Clipart",
                    "Social Media Graphics"
                ]
            }
        ],
        footer: "Each category is designed to speed up browsing and downloads."
    };

    // Hobbies & Leisure content
    const hobbiesLeisureContent = {
        categories: [
            {
                title: "Popular Hobby Types",
                items: [
                    "Arts & Crafts Graphics",
                    "Sports & Fitness Graphics",
                    "Music & Dance Graphics",
                    "Gaming & Esports Graphics",
                    "Photography & Creative Arts"
                ]
            },
            {
                title: "Leisure & Lifestyle",
                items: [
                    "Travel & Adventure Graphics",
                    "Outdoor & Nature Activities",
                    "Relaxation & Wellness",
                    "Reading & Learning",
                    "DIY & Handmade Projects"
                ]
            },
            {
                title: "Styles & Formats",
                items: [
                    "Flat Illustration Graphics",
                    "Icon Sets",
                    "Cartoon-Style Assets",
                    "Minimal & Line Graphics",
                    "Realistic Leisure Illustrations"
                ]
            },
            {
                title: "Creative Assets",
                items: [
                    "Hobby Icons",
                    "Leisure Illustrations",
                    "Activity Clipart",
                    "Lifestyle Stickers",
                    "Vector Graphics"
                ]
            }
        ],
        footer: "Each category opens a focused gallery for fast and easy downloads."
    };

    // Industry content
    const industryContent = {
        categories: [
            {
                title: "Core Industry Types",
                items: [
                    "Manufacturing PNG",
                    "Technology PNG",
                    "Construction PNG",
                    "Logistics & Transport PNG",
                    "Energy & Utilities PNG",
                    "Office & Corporate PNG"
                ]
            },
            {
                title: "Sector & Visuals",
                items: [
                    "Industrial Machinery PNG",
                    "Electronics PNG",
                    "Factory PNG",
                    "Tools & Equipment PNG",
                    "Industrial Icons PNG"
                ]
            },
            {
                title: "Styles & Formats",
                items: [
                    "Realistic Industry PNG",
                    "Flat Design PNG",
                    "Minimalist PNG",
                    "Iconic PNG"
                ]
            },
            {
                title: "Creative Assets",
                items: [
                    "Industry Logo PNG",
                    "Infographic PNG",
                    "Industry Illustration PNG",
                    "Industry Sticker PNG",
                    "Vector PNG"
                ]
            }
        ],
        footer: "Each category links directly to filtered galleries for fast, professional downloads."
    };

    // Landscape content
    const landscapeContent = {
        categories: [
            {
                title: "Core Landscape Types",
                items: [
                    "Mountain Landscape PNG",
                    "Forest Landscape PNG",
                    "Beach Landscape PNG",
                    "Desert Landscape PNG",
                    "Countryside Landscape PNG",
                    "City Landscape PNG"
                ]
            },
            {
                title: "Nature & Environment",
                items: [
                    "Sunrise & Sunset PNG",
                    "Sky & Cloud Landscape PNG",
                    "River & Lake PNG",
                    "Snow Landscape PNG",
                    "Waterfall PNG",
                    "Island Landscape PNG"
                ]
            },
            {
                title: "Styles & Formats",
                items: [
                    "Realistic Landscape PNG",
                    "Cartoon Landscape PNG",
                    "Minimal Landscape PNG",
                    "Landscape Silhouette PNG"
                ]
            },
            {
                title: "Creative Assets",
                items: [
                    "Landscape Background PNG",
                    "Nature Scene PNG",
                    "Landscape Illustration PNG",
                    "Landscape Clipart PNG",
                    "Landscape Sticker PNG",
                    "Landscape Vector PNG"
                ]
            }
        ],
        footer: "Each category opens a focused gallery, making downloads fast and stress-free."
    };

    // Lifestyle content
    const lifestyleContent = {
        categories: [
            {
                title: "Core Lifestyle Types",
                items: [
                    "Fitness & Exercise PNG",
                    "Wellness & Yoga PNG",
                    "Travel & Adventure PNG",
                    "Food & Drinks PNG",
                    "Hobbies & Leisure PNG",
                    "Fashion & Style PNG"
                ]
            },
            {
                title: "Styles & Formats",
                items: [
                    "Minimalist Lifestyle PNG",
                    "Realistic Lifestyle PNG",
                    "Cartoon & Fun Lifestyle PNG",
                    "Silhouette Lifestyle PNG"
                ]
            },
            {
                title: "Creative Assets",
                items: [
                    "Lifestyle Icons PNG",
                    "Lifestyle Illustration PNG",
                    "Lifestyle Sticker PNG",
                    "Lifestyle Logo PNG",
                    "Lifestyle Clipart PNG",
                    "Lifestyle Vector PNG"
                ]
            }
        ],
        footer: "Each category opens a focused gallery for fast and easy downloads."
    };

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
    };

    // Fallback to animalsContent if categorySlug is not found
    const content = categorySlug && availableCat[categorySlug] ? availableCat[categorySlug] : animalsContent;

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