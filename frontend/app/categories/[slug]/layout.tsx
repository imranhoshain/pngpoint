/* eslint-disable @typescript-eslint/no-explicit-any */
import { SERVER_URL } from "@/utils/api";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import React from "react";

const getCategoryUrl = (slug: string) => `${siteConfig.url}/api/v1/images/categories/${slug}`;

// Schema data mapping for different categories
// Each category has a unique @graph structure with CollectionPage, BreadcrumbList, ItemList, and ImageObject
// FAQs are embedded in CollectionPage via mainEntity to avoid duplicate FAQPage errors
const categorySchemas: Record<string, any> = {
    animals: {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": "https://pngpoint.com/categories/animals#webpage",
                "name": "Animal PNG Images with Transparent Background",
                "description": "Browse free Animal PNGs with transparent backgrounds. Perfect for web, print, branding, and education. High-quality, royalty-free, easy-to-download images.",
                "url": "https://pngpoint.com/categories/animals",
                "isPartOf": {
                    "@type": "WebSite",
                    "@id": "https://pngpoint.com/#website"
                },
                "breadcrumb": {
                    "@id": "https://pngpoint.com/categories/animals#breadcrumb"
                },
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is an Animal PNG image, and why is it useful?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "An Animal PNG is a raster image with transparent backgrounds. Its clean edges make it perfect for overlays, logos, web design, and educational materials, without the worry of a white box behind the image."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What does transparent background mean in Animal PNGs?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "It means only the animal shape is visible. You can place it on any background without a white border, making your designs look professional and seamless."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are these Animal PNGs free to download and use?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Some PNGs are free, while others are premium. Check the licensing note for each file. Free downloads may have limited usage; premium packs often include broader commercial rights."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use Animal PNGs for commercial projects?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, many Animal PNGs are available for commercial use on websites, in branding, or on products. Always verify the license terms for clarity. Look for Royalty-Free or Commercial Use Allowed labels."
                        }
                    }
                ]
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://pngpoint.com/categories/animals#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://pngpoint.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Animals PNG Images with Transparent Background",
                        "item": "https://pngpoint.com/categories/animals"
                    }
                ]
            },
            {
                "@type": "ItemList",
                "@id": "https://pngpoint.com/categories/animals#subcategories",
                "itemListOrder": "https://schema.org/ItemListOrderAscending",
                "numberOfItems": 6,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Aquatic Animals PNG",
                        "url": "https://pngpoint.com/sub-categories/aquatic-animals-png"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Birds PNG",
                        "url": "https://pngpoint.com/sub-categories/birds-png"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Farm Animals PNG",
                        "url": "https://pngpoint.com/sub-categories/farm-animals-png"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "Insects PNG",
                        "url": "https://pngpoint.com/sub-categories/insects-png"
                    },
                    {
                        "@type": "ListItem",
                        "position": 5,
                        "name": "Pets PNG",
                        "url": "https://pngpoint.com/sub-categories/pets-png"
                    },
                    {
                        "@type": "ListItem",
                        "position": 6,
                        "name": "Wild Animals PNG",
                        "url": "https://pngpoint.com/sub-categories/wild-animals-png"
                    }
                ]
            },
            {
                "@type": "ImageObject",
                "@id": "https://pngpoint.com/categories/animals#primaryimage",
                "name": "Snail in sunglasses: summer vibes",
                "contentUrl": "https://pngpoint.com/image/snail-in-sunglasses-summer-vibes",
                "caption": "Snail in sunglasses: summer vibes",
                "license": "https://pngpoint.com/license",
                "acquireLicensePage": "https://pngpoint.com/license",
                "creditText": "PNGPoint",
                "copyrightNotice": "© PNGPoint",
                "creator": {
                    "@type": "Organization",
                    "name": "PNGPoint",
                    "url": "https://pngpoint.com/"
                }
            }
        ]
    },
    business: {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": "https://pngpoint.com/categories/business#webpage",
                "name": "Business PNG Images with Transparent Background",
                "description": "Professional business PNG images for corporate presentations, marketing, finance, startups, and office concepts. Includes transparent icons, illustrations, and visuals designed for branding, websites, reports, and commercial communication materials.",
                "url": "https://pngpoint.com/categories/business",
                "isPartOf": {
                    "@type": "WebSite",
                    "@id": "https://pngpoint.com/#website"
                },
                "breadcrumb": {
                    "@id": "https://pngpoint.com/categories/business#breadcrumb"
                },
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is a Business PNG image?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "A Business PNG is a transparent image used for presentations, websites, marketing, and branding without background issues."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are Business PNGs free to use?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Some are free, others are premium. Always check license details before use."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use Business PNGs commercially?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, many allow commercial use. Look for 'Royalty-Free' or 'Commercial Use Allowed'."
                        }
                    }
                ]
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://pngpoint.com/categories/business#breadcrumb",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://pngpoint.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Business PNG Images with Transparent Background",
                        "item": "https://pngpoint.com/categories/business"
                    }
                ]
            },
            {
                "@type": "ItemList",
                "@id": "https://pngpoint.com/categories/business#subcategories",
                "itemListOrder": "https://schema.org/ItemListOrderAscending",
                "numberOfItems": 6,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Partnerships & Deals PNG",
                        "url": "https://pngpoint.com/sub-categories/partnerships-deals-png"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Banking & Finance PNG",
                        "url": "https://pngpoint.com/sub-categories/banking-finance-png"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Business People PNG",
                        "url": "https://pngpoint.com/sub-categories/business-people-png"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "Communication & Networking PNG",
                        "url": "https://pngpoint.com/sub-categories/communication-networking-png"
                    },
                    {
                        "@type": "ListItem",
                        "position": 5,
                        "name": "Corporate Offices PNG",
                        "url": "https://pngpoint.com/sub-categories/corporate-offices-png"
                    },
                    {
                        "@type": "ListItem",
                        "position": 6,
                        "name": "E-commerce & Shopping PNG",
                        "url": "https://pngpoint.com/sub-categories/e-commerce-shopping-png"
                    }
                ]
            },
            {
                "@type": "ImageObject",
                "@id": "https://pngpoint.com/categories/business#primaryimage",
                "name": "Stacks of gold coins with 'BUY' and 'SELL' labels",
                "contentUrl": "https://pngpoint.com/image/stacks-of-gold-coins-with-buy-and-sell-labels317",
                "caption": "Stacks of gold coins with 'BUY' and 'SELL' labels",
                "license": "https://pngpoint.com/license",
                "acquireLicensePage": "https://pngpoint.com/license",
                "creditText": "PNGPoint",
                "copyrightNotice": "© PNGPoint",
                "creator": {
                    "@type": "Organization",
                    "name": "PNGPoint",
                    "url": "https://pngpoint.com/"
                }
            }
        ]
    },
    "buildings-and-architecture": {
        "@context": "https://schema.org",
        "@graph": [
            {
            "@type": "CollectionPage",
            "@id": "https://pngpoint.com/categories/buildings-and-architecture#collectionpage",
            "name": "Building and Architecture PNG Images",
            "description": "Download high-quality, royalty-free building and architecture PNG images with transparent backgrounds for design, web, branding, and commercial projects.",
            "url": "https://pngpoint.com/categories/buildings-and-architecture",
            "isPartOf": {
                "@type": "WebSite",
                "@id": "https://pngpoint.com/#website"
            },
            "breadcrumb": {
                "@id": "https://pngpoint.com/categories/buildings-and-architecture#breadcrumb"
            },
            "mainEntity": {
                "@type": "ItemList",
                "@id": "https://pngpoint.com/categories/buildings-and-architecture#itemlist",
                "itemListOrder": "https://schema.org/ItemListOrderAscending",
                "numberOfItems": 12,
                "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Ancient Structures PNG",
                    "url": "https://pngpoint.com/sub-categories/ancient-structures-png"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Bridge PNG",
                    "url": "https://pngpoint.com/sub-categories/bridges-png"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "City Skylines PNG",
                    "url": "https://pngpoint.com/sub-categories/city-skylines-png"
                },
                {
                    "@type": "ListItem",
                    "position": 4,
                    "name": "Commercial Buildings PNG",
                    "url": "https://pngpoint.com/sub-categories/commercial-buildings-png"
                },
                {
                    "@type": "ListItem",
                    "position": 5,
                    "name": "Houses & Homes PNG",
                    "url": "https://pngpoint.com/sub-categories/houses-homes-png"
                },
                {
                    "@type": "ListItem",
                    "position": 6,
                    "name": "Lighthouses PNG",
                    "url": "https://pngpoint.com/sub-categories/lighthouses-png"
                },
                {
                    "@type": "ListItem",
                    "position": 7,
                    "name": "Modern Architecture PNG",
                    "url": "https://pngpoint.com/sub-categories/modern-architecture-png"
                },
                {
                    "@type": "ListItem",
                    "position": 8,
                    "name": "Mosques & Temples PNG",
                    "url": "https://pngpoint.com/sub-categories/mosques-temples-png"
                },
                {
                    "@type": "ListItem",
                    "position": 9,
                    "name": "Stadiums & Arenas PNG",
                    "url": "https://pngpoint.com/sub-categories/stadiums-arenas-png"
                }
                ]
            }
            },

            {
            "@type": "BreadcrumbList",
            "@id": "https://pngpoint.com/categories/buildings-and-architecture#breadcrumb",
            "itemListElement": [
                {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://pngpoint.com/"
                },
                {
                "@type": "ListItem",
                "position": 2,
                "name": "Buildings & Architecture PNG",
                "item": "https://pngpoint.com/categories/buildings-and-architecture"
                }
            ]
            },

            {
            "@type": "ImageObject",
            "@id": "https://pngpoint.com/building-architecture/#imageobject",
            "name": "Modern Building PNG",
            "contentUrl": "https://pngpoint.com/images/modern-building.png",
            "caption": "Modern building PNG with transparent background",
            "license": "https://pngpoint.com/license",
            "acquireLicensePage": "https://pngpoint.com/license",
            "creditText": "PNGPoint",
            "copyrightNotice": "© PNGPoint",
            "creator": {
                "@type": "Organization",
                "name": "PNGPoint",
                "url": "https://pngpoint.com/"
            }
            }
        ]
        }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    try {
        const res = await fetch(`${SERVER_URL}/images/categories/${slug}`, {
            next: { revalidate: 120 },
        });

        if (!res.ok) {
            return {
                title: "PNGPoint",
                description: "PNGPoint image details",
                alternates: { canonical: getCategoryUrl(slug) },
            };
        }

        const SingleCategoryResdata = await res.json();
        const data = SingleCategoryResdata?.data;

        // Custom metadata for animals category
        if (slug === 'animals') {
            return {
                title: "Animal PNG Images – Free, Transparent & High-Quality",
                description: "Browse free Animal PNGs with transparent backgrounds. Perfect for web, print, branding, and education. High-quality, royalty-free, easy-to-download images.",
                alternates: { canonical: getCategoryUrl(slug) },
            };
        }

        return {
            title: `Browse All PNG Image ${data.name} | Free Transparent PNGs | PNGPoint`,
            description: "Discover our full collection of PNG images, neatly organized by category for quick and easy downloads.",
            alternates: { canonical: getCategoryUrl(slug) },
        };
    } catch (error: any) {
        console.error(error.message);
        return {
            title: "PNGPoint",
            description: "PNGPoint image details",
            alternates: { canonical: getCategoryUrl(slug) },
        };
    }
}

export default async function SingleCategoryRootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    // Await the params directly in the async server component
    const { slug } = await params;

    // Get the schema for the current category
    const schema = categorySchemas[slug];

    return (
        <section className="relative top-0 left-0 right-0 w-full">
            {schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            )}
            {children}
        </section>
    );
}