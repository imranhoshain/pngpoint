/* eslint-disable @typescript-eslint/no-explicit-any */
import { SERVER_URL } from "@/utils/api";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import React from "react";

const getCategoryUrl = (slug: string) => `${siteConfig.url}/api/v1/images/categories/${slug}`;

// Schema data mapping for different categories
const categorySchemas: Record<string, any> = {
    animals: {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": "https://pngpoint.com/categories/animals#collectionpage",
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
                "mainEntity": {
                    "@type": "ItemList",
                    "@id": "https://pngpoint.com/categories/animals#itemlist",
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
                }
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
                "@type": "ImageObject",
                "@id": "https://pngpoint.com/categories/animals#imageobject",
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
            },
            {
                "@type": "FAQPage",
                "@id": "https://pngpoint.com/categories/animals#faq",
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
                    },
                    {
                        "@type": "Question",
                        "name": "What is the difference between PNG, vector, and clipart for animals?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "PNG: Raster, high-quality, transparent. Ready-to-use for web and print.\nVector (AI/SVG): Scalable without losing quality. Best for logos and illustrations.\nClipart: Stylized illustrations, often simplified."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do you offer high-resolution or HD Animal PNG images?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, most Animal PNGs are high-resolution, suitable for print, banners, and large displays. Check each file's specs before downloading."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use Animal PNGs for kids' educational projects?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Absolutely. Many are designed for worksheets, presentations, and classroom visuals. Confirm the license if your project has commercial intent."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How do I ensure the PNG looks good on my website or app?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Choose a suitable resolution: 72–150 dpi for screens, 300 dpi for print. Ensure the PNG has a transparent background and clean edges."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What file sizes should I expect for Animal PNGs?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "File size depends on dimensions and detail. High-resolution PNGs may range from a few hundred KB to several MB. For web use, optimize with compression if permitted."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I edit or customize the Animal PNG?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, you can resize, recolor, or combine PNGs in compatible software. Check the license to confirm editing is allowed. Premium packs usually allow full modification."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are there Animal PNGs specifically for branding or logos?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Look for Animal Logo PNGs or Icon PNGs. Ensure the license covers branding and commercial usage before using it for your brand."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do you have Animal PNGs with transparent backgrounds for print?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, many PNGs are print-ready with transparent backgrounds. Verify the 300 dpi resolution for banners, posters, or merchandise."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What does royalty-free mean for Animal PNGs?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Royalty-free means you can use the image across multiple projects without recurring fees, as long as you follow the license terms. It doesn't always mean zero restrictions, so read the license carefully."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I download Animal PNGs for educational platforms or kids' projects?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Many are suitable for classroom use, learning apps, and student worksheets. Always verify distribution rights and license terms for educational use."
                        }
                    }
                ]
            }
        ]
    },
    business: {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": "https://pngpoint.com/categories/business/#collectionpage",
                "name": "Professional business PNG images for corporate presentations, marketing, finance, startups, and office concepts. Includes transparent icons, illustrations, and visuals designed for branding, websites, reports, and commercial communication materials.",
                "url": "https://pngpoint.com/categories/business/",
                "isPartOf": {
                    "@type": "WebSite",
                    "@id": "https://pngpoint.com/#website"
                },
                "breadcrumb": {
                    "@id": "https://pngpoint.com/categories/business/#breadcrumb"
                },
                "mainEntity": {
                    "@type": "ItemList",
                    "@id": "https://pngpoint.com/categories/business/#itemlist",
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
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://pngpoint.com/categories/business/#breadcrumb",
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
                "@type": "ImageObject",
                "@id": "https://pngpoint.com/categories/business#imageobject",
                "name": "Stacks of gold coins with 'BUY' and 'SELL' labels317",
                "contentUrl": "https://pngpoint.com/image/stacks-of-gold-coins-with-buy-and-sell-labels317",
                "caption": "Stacks of gold coins with 'BUY' and 'SELL' labels317",
                "license": "https://pngpoint.com/license",
                "acquireLicensePage": "https://pngpoint.com/license",
                "creditText": "PNGPoint",
                "copyrightNotice": "© PNGPoint",
                "creator": {
                    "@type": "Organization",
                    "name": "PNGPoint",
                    "url": "https://pngpoint.com/"
                }
            },
            {
                "@type": "FAQPage",
                "@id": "https://pngpoint.com/categories/business#faq",
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
                        "name": "Do Business PNGs work for presentations?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. They are ideal for pitch decks, reports, and client presentations."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I edit Business PNG images?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, resizing and recoloring are usually allowed. Check the license to confirm."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are these PNGs good for branding?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Icons, logos, and illustrations support consistent branding."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can Business PNG images be used for client projects?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Most Business PNG images allow use in client work, including presentations, websites, and marketing materials. Always review the license to confirm client redistribution rules."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do Business PNG images work for print materials like brochures?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. High-resolution Business PNGs are suitable for brochures, flyers, banners, and reports. Always check that the file is high resolution (preferably 300 dpi) before printing."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How do I choose the right Business PNG for my project?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Start by defining your use case—presentation, website, branding, or education. Then filter by style, resolution, and license to ensure the PNG fits both design and legal needs."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Why use PNG for business visuals?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "PNG supports transparency and sharp edges, making layouts cleaner and easier to manage."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use Business PNGs commercially?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, many allow commercial use. Look for 'Royalty-Free' or 'Commercial Use Allowed."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are high-resolution Business PNGs available?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Most files are HD and suitable for both screen and print use."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What industries use Business PNGs most?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Marketing, finance, startups, education, SaaS, and corporate teams."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What does royalty-free mean here?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "You can reuse the image across projects without extra fees, within license terms."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are Business PNGs suitable for social media marketing?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Absolutely. Business PNGs work well for social posts, ads, thumbnails, and story graphics because transparent backgrounds blend cleanly with any design layout."
                        }
                    }
                ]
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
            },
            {
                "@type": "FAQPage",
                "@id": "https://pngpoint.com/building-architecture/#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Can I use building PNG images for commercial projects?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, many building and architecture PNG images on PNGPoint are royalty-free and allowed for commercial and print use. Always check the license details on the image page."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do architecture PNG images come with transparent backgrounds?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Most architecture PNG images include transparent backgrounds, making them easy to use in designs, presentations, and websites."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are high-resolution building PNG images available?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, PNGPoint offers high-resolution and HD building PNG images suitable for both web and print projects."
                        }
                    }
                ]
            }
        ]
    },
    industry: {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": "https://pngpoint.com/categories/industry/#collectionpage",
                "name": "Industry PNG Images with Transparent Background",
                "description": "Industry PNG images showcasing manufacturing, construction, machinery, logistics, factories, and industrial processes. High-resolution transparent graphics designed for business presentations, technical documentation, education, and commercial communication.",
                "url": "https://pngpoint.com/categories/industry/",
                "isPartOf": {
                    "@type": "WebSite",
                    "@id": "https://pngpoint.com/#website"
                },
                "breadcrumb": {
                    "@id": "https://pngpoint.com/categories/industry/#breadcrumb"
                },
                "mainEntity": {
                    "@type": "ItemList",
                    "@id": "https://pngpoint.com/categories/industry/#itemlist",
                    "itemListOrder": "https://schema.org/ItemListOrderAscending",
                    "numberOfItems": 14,
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Agriculture & Farming PNG",
                            "url": "https://pngpoint.com/sub-categories/agriculture-farming-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Automotive Industry PNG",
                            "url": "https://pngpoint.com/sub-categories/automotive-industry-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": "Chemical Industry PNG",
                            "url": "https://pngpoint.com/sub-categories/chemical-industry-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 4,
                            "name": "Construction & Engineering PNG",
                            "url": "https://pngpoint.com/sub-categories/construction-engineering-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 5,
                            "name": "Electrical & Energy PNG",
                            "url": "https://pngpoint.com/sub-categories/electrical-energy-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 6,
                            "name": "Food Industry PNG",
                            "url": "https://pngpoint.com/sub-categories/food-industry-png"
                        }
                    ]
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://pngpoint.com/categories/industry/#breadcrumb",
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
                        "name": "Industry PNG Images with Transparent Background",
                        "item": "https://pngpoint.com/categories/industry/"
                    }
                ]
            },
            {
                "@type": "ImageObject",
                "@id": "https://pngpoint.com/categories/industry/#imageobject",
                "name": "Industry PNG Images with Transparent Background",
                "contentUrl": "https://pngpoint.com/image/smiling-man-sits-with-yellow-suitcase-and-book-ready-for-vacation/",
                "caption": "Smiling man sits with yellow suitcase and book, ready for vacation",
                "license": "https://pngpoint.com/license",
                "acquireLicensePage": "https://pngpoint.com/license",
                "creditText": "PNGPoint",
                "copyrightNotice": "© PNGPoint",
                "creator": {
                    "@type": "Organization",
                    "name": "PNGPoint",
                    "url": "https://pngpoint.com/"
                }
            },
            {
                "@type": "FAQPage",
                "@id": "https://pngpoint.com/categories/industry/#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is an Industry PNG image, and why is it useful?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "A raster image with transparent backgrounds, perfect for overlays, presentations, websites, or marketing materials without extra editing."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use Industry PNGs for commercial purposes?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Many allow commercial use; always check licensing notes for clarity."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are these PNGs free to download?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Some are free, others premium. Free files may have limited usage; premium packs include broader rights."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What types of industry visuals are included?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Factories, machinery, office equipment, energy, transport, logistics, technology, and industrial icons."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are Industry PNGs high-resolution?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, most are HD, suitable for presentations, print, banners, and web use."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use these images for corporate training?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Absolutely. Designed for slides, e-learning, and reports with clean visuals."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What file formats are available?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Transparent PNG, vector PNG, icons, illustrations, and logos."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I customize or edit Industry PNGs?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, resize, recolor, or combine in compatible software. License info confirms editing rights."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How do I find PNGs for specific sectors?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Use categories or filters like Manufacturing, Technology, Construction, or Logistics."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are these images suitable for marketing campaigns?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. High-quality, clear, and professional PNGs enhance digital and print campaigns."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use Industry PNGs for website banners or headers?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Transparent backgrounds and high-resolution files make them perfect for website visuals, landing pages, and digital campaigns."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are there Industry PNGs for specific tools and machinery?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Absolutely. The collection includes detailed PNGs of industrial tools, machines, equipment, and factory setups for professional use."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can Industry PNGs be used in print materials like brochures and flyers?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Most files are HD and print-ready, ensuring sharp visuals for marketing brochures, flyers, reports, or posters."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do you provide Industry PNGs in different design styles?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. You can find realistic, flat design, minimalist, and icon-style PNGs tailored for corporate and industrial projects."
                        }
                    }
                ]
            }
        ]
    },
    "graphic-resources": {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": "https://pngpoint.com/categories/graphic-resources/#collectionpage",
                "name": "Graphic Resources PNG Images with Transparent Background",
                "description": "Graphic resource PNG images including icons, symbols, illustrations, UI elements, and design assets. Transparent and versatile files suitable for web design, presentations, apps, branding projects, and creative workflows across industries.",
                "url": "https://pngpoint.com/categories/graphic-resources/",
                "isPartOf": {
                    "@type": "WebSite",
                    "@id": "https://pngpoint.com/#website"
                },
                "breadcrumb": {
                    "@id": "https://pngpoint.com/categories/graphic-resources/#breadcrumb"
                },
                "mainEntity": {
                    "@type": "ItemList",
                    "@id": "https://pngpoint.com/categories/graphic-resources/#itemlist",
                    "itemListOrder": "https://schema.org/ItemListOrderAscending",
                    "numberOfItems": 9,
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Arrows PNG",
                            "url": "https://pngpoint.com/sub-categories/arrows-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Backgrounds PNG",
                            "url": "https://pngpoint.com/sub-categories/backgrounds-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": "Banners & Ribbons PNG",
                            "url": "https://pngpoint.com/sub-categories/banners-ribbons-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 4,
                            "name": "Borders & Frames PNG",
                            "url": "https://pngpoint.com/sub-categories/borders-frames-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 5,
                            "name": "Buttons & Icons PNG",
                            "url": "https://pngpoint.com/sub-categories/buttons-icons-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 6,
                            "name": "Emojis & Stickers PNG",
                            "url": "https://pngpoint.com/sub-categories/emojis-stickers-png"
                        }
                    ]
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://pngpoint.com/categories/graphic-resources/#breadcrumb",
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
                        "name": "Graphic Resources PNG Images with Transparent Background",
                        "item": "https://pngpoint.com/categories/graphic-resources/"
                    }
                ]
            },
            {
                "@type": "ImageObject",
                "@id": "https://pngpoint.com/categories/graphic-resources/#imageobject",
                "name": "Graphic Resources PNG Images with Transparent Background",
                "contentUrl": "https://pngpoint.com/image/free-tag-on-black/",
                "caption": "Free tag on black",
                "license": "https://pngpoint.com/license",
                "acquireLicensePage": "https://pngpoint.com/license",
                "creditText": "PNGPoint",
                "copyrightNotice": "© PNGPoint",
                "creator": {
                    "@type": "Organization",
                    "name": "PNGPoint",
                    "url": "https://pngpoint.com/"
                }
            },
            {
                "@type": "FAQPage",
                "@id": "https://pngpoint.com/categories/graphic-resources/#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What are graphic resources, and why are they useful?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Graphic resources are ready-made design assets like icons, illustrations, and templates. They save time and improve visual consistency."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are these graphic resources free to use?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Many assets are free, while others may be premium. Licensing details are clearly listed on each resource page."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use graphic resources for commercial projects?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, most resources support commercial use. Always verify the license before publishing."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What file formats are available?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Common formats include PNG, SVG, AI, and PSD, suitable for both digital and print work."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I edit or customize the graphics?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Most licenses allow resizing, recoloring, and editing. Premium assets often include full modification rights."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are these assets suitable for print projects?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Many files are high-resolution and print-ready. Check DPI and format details before use."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can educators use these resources in classrooms?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Absolutely. Many graphics are ideal for educational materials and presentations."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How do I choose the right format for my project?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Use PNG for quick visuals, SVG or AI for scalable designs, and PSD for layered editing."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do you offer modern and minimal design styles?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Collections include flat, minimal, creative, and detailed design styles."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What does royalty-free mean here?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Royalty-free means you can reuse assets across projects without recurring fees, as long as you follow the license terms."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are these graphic resources suitable for mobile apps and UI design?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Many graphic resources are optimized for mobile interfaces, dashboards, and app layouts. Scalable formats like SVG and vector files ensure clarity across different screen sizes."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do graphic resources affect website loading speed?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Well-optimized graphics help maintain fast loading times. Lightweight SVGs and compressed PNGs improve performance while preserving visual quality."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use these graphic resources for social media content?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Absolutely. Graphic resources work well for posts, ads, thumbnails, and stories. Consistent visuals help improve brand recognition across platforms."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How often are new graphic resources added?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "New assets are added regularly to keep the library aligned with current design trends and modern use cases."
                        }
                    }
                ]
            }
        ]
    },
    food: {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": "https://pngpoint.com/categories/food/#collectionpage",
                "name": "Food PNG Images with Transparent Background",
                "description": "Food PNG images with transparent backgrounds, including meals, ingredients, fruits, desserts, and snacks. Designed for menus, websites, social media, education, and marketing, offering clean visuals ready for web and print use.",
                "url": "https://pngpoint.com/categories/food/",
                "isPartOf": {
                    "@type": "WebSite",
                    "@id": "https://pngpoint.com/#website"
                },
                "breadcrumb": {
                    "@id": "https://pngpoint.com/categories/food/#breadcrumb"
                },
                "mainEntity": {
                    "@type": "ItemList",
                    "@id": "https://pngpoint.com/categories/food/#itemlist",
                    "itemListOrder": "https://schema.org/ItemListOrderAscending",
                    "numberOfItems": 14,
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Appetizers & Snacks PNG",
                            "url": "https://pngpoint.com/sub-categories/appetizers-snacks-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Bakery & Desserts PNG",
                            "url": "https://pngpoint.com/sub-categories/bakery-desserts-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": "Dairy Products PNG",
                            "url": "https://pngpoint.com/sub-categories/dairy-products-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 4,
                            "name": "Fast Food PNG",
                            "url": "https://pngpoint.com/sub-categories/fast-food-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 5,
                            "name": "Grains & Cereals PNG",
                            "url": "https://pngpoint.com/sub-categories/grains-cereals-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 6,
                            "name": "Fruits PNG",
                            "url": "https://pngpoint.com/sub-categories/fruits-png"
                        }
                    ]
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://pngpoint.com/categories/food/#breadcrumb",
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
                        "name": "Food PNG Images with Transparent Background",
                        "item": "https://pngpoint.com/categories/food/"
                    }
                ]
            },
            {
                "@type": "ImageObject",
                "@id": "https://pngpoint.com/categories/food/#imageobject",
                "name": "Food PNG Images with Transparent Background",
                "contentUrl": "https://pngpoint.com/image/delicious-peanut-butter-sandwich-with-peanuts",
                "caption": "Delicious peanut butter sandwich with peanuts",
                "license": "https://pngpoint.com/license",
                "acquireLicensePage": "https://pngpoint.com/license",
                "creditText": "PNGPoint",
                "copyrightNotice": "© PNGPoint",
                "creator": {
                    "@type": "Organization",
                    "name": "PNGPoint",
                    "url": "https://pngpoint.com/"
                }
            },
            {
                "@type": "FAQPage",
                "@id": "https://pngpoint.com/categories/food/#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is a Food PNG image?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "A Food PNG is an image with a transparent background. It allows easy placement on any design without visible borders."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are Food PNG images free to use?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Some are free, while others may be premium. Always check the license shown on the image page."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use Food PNGs for restaurant menus?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Many Food PNGs support commercial and print use, making them suitable for menus and ads."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What resolution should I choose for Food PNGs?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Use lower resolution for web and 300 dpi for print projects like posters or menus."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I edit or resize Food PNG images?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Most licenses allow resizing and basic editing. Premium files often allow full customization."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What does a transparent background mean in Food PNG images?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "A transparent background means only the food item is visible. You can place it on any color, photo, or design without a white box."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are Food PNG images suitable for social media posts?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Food PNGs work well for Instagram, Facebook, ads, and thumbnails because they look clean and professional on any background."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can Food PNGs be used for food delivery apps or menus?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Many Food PNGs allow commercial use, making them suitable for delivery apps, digital menus, and promotional graphics. Always confirm the license first."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What is the difference between Food PNG and Food JPG images?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "PNG files support transparent backgrounds, while JPG files do not. PNGs are better for overlays and design flexibility."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are high-resolution Food PNGs good for print materials?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. High-resolution Food PNGs can be used for posters, flyers, packaging, and menus when the file meets print-quality standards."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use Food PNG images in presentations or slides?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Absolutely. Food PNGs are ideal for presentations because they blend smoothly into slides without distracting backgrounds."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do Food PNG images affect website loading speed?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Large PNG files can increase load time. For best performance, choose optimized sizes or compress images without losing quality."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are Food PNGs safe for kids' educational content?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Many Food PNGs are designed for learning materials, food charts, and classroom projects. Check usage rights for educational distribution."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I recolor or modify Food PNG images?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Most licenses allow basic edits like resizing or recoloring. Premium files usually allow more advanced customization."
                        }
                    }
                ]
            }
        ]
    },
    drinks: {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": "https://pngpoint.com/categories/drinks/",
                "name": "Drinks PNG Images with Transparent Background",
                "description": "Drinks PNG images featuring beverages such as coffee, tea, juice, soft drinks, and cocktails. Transparent, high-quality graphics ideal for menus, branding, food blogs, advertisements, packaging designs, and hospitality-related projects.",
                "url": "https://pngpoint.com/categories/drinks/",
                "isPartOf": {
                    "@type": "WebSite",
                    "@id": "https://pngpoint.com/#website"
                },
                "breadcrumb": {
                    "@id": "https://pngpoint.com/categories/drinks/#breadcrumb"
                },
                "mainEntity": {
                    "@type": "ItemList",
                    "@id": "https://pngpoint.com/categories/drinks/#itemlist",
                    "itemListOrder": "https://schema.org/ItemListOrderAscending",
                    "numberOfItems": 8,
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Cocktails & Mocktails PNG",
                            "url": "https://pngpoint.com/sub-categories/cocktails-mocktails-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Coffee & Tea PNG",
                            "url": "https://pngpoint.com/sub-categories/coffee-tea-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": "Fruit Juices PNG",
                            "url": "https://pngpoint.com/sub-categories/fruit-juices-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 4,
                            "name": "Cold Drinks PNG",
                            "url": "https://pngpoint.com/sub-categories/cold-drinks-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 5,
                            "name": "Energy Drinks PNG",
                            "url": "https://pngpoint.com/sub-categories/energy-drinks-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 6,
                            "name": "Milk & Dairy Drinks PNG",
                            "url": "https://pngpoint.com/sub-categories/milk-dairy-drinks-png"
                        }
                    ]
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://pngpoint.com/categories/drinks/#breadcrumb",
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
                        "name": "Drinks PNG Images with Transparent Background",
                        "item": "https://pngpoint.com/categories/drinks/"
                    }
                ]
            },
            {
                "@type": "ImageObject",
                "@id": "https://pngpoint.com/categories/drinks/#imageobject",
                "name": "Drinks PNG Images with Transparent Background",
                "contentUrl": "https://pngpoint.com/image/close-up-of-a-gleaming-polished-teaspoon883/",
                "caption": "Close up of a gleaming, polished teaspoon883",
                "license": "https://pngpoint.com/license",
                "acquireLicensePage": "https://pngpoint.com/license",
                "creditText": "PNGPoint",
                "copyrightNotice": "© PNGPoint",
                "creator": {
                    "@type": "Organization",
                    "name": "PNGPoint",
                    "url": "https://pngpoint.com/"
                }
            },
            {
                "@type": "FAQPage",
                "@id": "https://pngpoint.com/categories/animals#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is a Drinks PNG image, and why is it useful?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "A Drinks PNG is a high-quality raster image with a transparent background, ideal for web, print, and marketing designs."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use Drinks PNGs for commercial projects?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, many Drinks PNGs allow commercial use. Check each file's license for confirmation."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are Drinks PNGs free to download?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Some are free, while others are premium with extended commercial rights."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I edit or customize Drinks PNGs?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, you can resize, recolor, or combine PNGs in compatible software."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What file formats are available for Drinks PNGs?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Transparent PNGs, HD PNGs, vector versions (SVG), and clipart illustrations."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do you offer drinks PNGs suitable for social media?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, optimized for Instagram, Facebook, Pinterest, and web banners."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use Drinks PNGs for educational purposes?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Absolutely, these are perfect for nutrition, health, and beverage-themed educational projects."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How do I ensure PNGs display well on web pages?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Use proper resolution: 72–150 dpi for screens, 300 dpi for print. Transparent backgrounds ensure clean overlays."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are there specific drink types like coffee, tea, or cocktails?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, the collection is organized by beverage type and style for easy browsing."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I download multiple drinks PNGs at once?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, the library allows batch downloads to streamline workflow."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use Drinks PNGs for packaging design?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, these PNGs are perfect for product labels, bottles, cartons, and promotional packaging."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are the Drinks PNGs suitable for presentations and slides?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Definitely! Transparent backgrounds and high-resolution make them ideal for PowerPoint, Keynote, or Google Slides."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do you provide seasonal or themed Drinks PNGs?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, you can find holiday drinks, summer beverages, and festive cocktail PNGs in the collection."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use Drinks PNGs in mobile apps or games?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Absolutely. All PNGs are optimized for digital use, including apps, games, and interactive media."
                        }
                    }
                ]
            }
        ]
    },
    "culture-and-religion": {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "CollectionPage",
                "@id": "https://pngpoint.com/categories/culture-and-religion/#collectionpage",
                "name": "Culture and Religion PNG Images with Transparent Background",
                "description": "Culture and religion PNG images representing traditions, rituals, symbols, festivals, and spiritual concepts. Transparent visuals suitable for education, cultural awareness, presentations, publishing, and respectful creative or informational projects.",
                "url": "https://pngpoint.com/categories/culture-and-religion/",
                "isPartOf": {
                    "@type": "WebSite",
                    "@id": "https://pngpoint.com/#website"
                },
                "breadcrumb": {
                    "@id": "https://pngpoint.com/categories/culture-and-religion/#breadcrumb"
                },
                "mainEntity": {
                    "@type": "ItemList",
                    "@id": "https://pngpoint.com/categories/culture-and-religion/#itemlist",
                    "itemListOrder": "https://schema.org/ItemListOrderAscending",
                    "numberOfItems": 9,
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Artifacts & Relics PNG",
                            "url": "https://pngpoint.com/sub-categories/artifacts-relics-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Ancient Symbols PNG",
                            "url": "https://pngpoint.com/sub-categories/ancient-symbols-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 3,
                            "name": "Books & Scriptures PNG",
                            "url": "https://pngpoint.com/sub-categories/books-scriptures-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 4,
                            "name": "Ceremonies & Festivals PNG",
                            "url": "https://pngpoint.com/sub-categories/ceremonies-festivals-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 5,
                            "name": "Costumes & Traditional Dress PNG",
                            "url": "https://pngpoint.com/sub-categories/costumes-traditional-dress-png"
                        },
                        {
                            "@type": "ListItem",
                            "position": 6,
                            "name": "Prayers & Worship PNG",
                            "url": "https://pngpoint.com/sub-categories/prayers-worship-png"
                        }
                    ]
                }
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://pngpoint.com/categories/culture-and-religion/#breadcrumb",
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
                        "name": "Culture and Religion PNG Images with Transparent Background",
                        "item": "https://pngpoint.com/categories/culture-and-religion/"
                    }
                ]
            },
            {
                "@type": "ImageObject",
                "@id": "https://pngpoint.com/categories/culture-and-religion/#imageobject",
                "name": "Culture and Religion PNG Images with Transparent Background",
                "contentUrl": "https://pngpoint.com/image/elegant-oval-vase-with-botanical-design-illustration/",
                "caption": "Elegant oval vase with botanical design illustration",
                "license": "https://pngpoint.com/license",
                "acquireLicensePage": "https://pngpoint.com/license",
                "creditText": "PNGPoint",
                "copyrightNotice": "© PNGPoint",
                "creator": {
                    "@type": "Organization",
                    "name": "PNGPoint",
                    "url": "https://pngpoint.com/"
                }
            },
            {
                "@type": "FAQPage",
                "@id": "https://pngpoint.com/categories/culture-and-religion/#faq",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What is a Culture and Religion PNG image?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "A Culture and Religion PNG is a transparent image representing cultural traditions, religious symbols, or spiritual concepts, designed for easy use in digital and print projects."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Why use PNG for cultural and religious visuals?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "PNG supports transparency and great detail, making it ideal for overlays, presentations, and respectful visual storytelling."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are Culture and Religion PNGs free to use?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Some assets are free, while others may be premium. Always check the license details listed on each file."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use these PNGs for commercial projects?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Many PNGs allow commercial use, including branding and media. Confirm license terms before publishing."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do these PNGs have transparent backgrounds?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, most Culture and Religion PNGs include transparent backgrounds for seamless placement."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are these images suitable for education?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Many are created for educational content, cultural studies, and learning platforms."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What resolution should I choose?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "For web use, standard HD is sufficient. For print, select high-resolution or 300 dpi files when available."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I edit or recolor these PNGs?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Editing is usually allowed, but always confirms modification rights in the license terms."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are religious symbols used respectfully?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "The collection focuses on culturally accurate and neutral representations suitable for informational and creative use."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What does royalty-free mean here?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Royalty-free means you can reuse the image across projects without repeated fees, within license conditions."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Can I use Culture and Religion PNGs for presentations or slideshows?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. These PNGs are perfect for educational presentations, lectures, webinars, and community workshops. Transparent backgrounds make them easy to layer over any slide or template."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are these PNGs suitable for social media posts?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Absolutely. Use them for Instagram, Facebook, Pinterest, or Twitter to visually highlight cultural events, religious celebrations, or festivals without extra editing."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How can I search for specific religions or festivals?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Use the search bar or category filters like Islam PNG,Diwali PNG, or Christmas Symbols PNG to quickly find the visuals you need."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Are the PNGs optimized for both web and print?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. Files come in high-resolution and standard web-friendly sizes, making them suitable for digital media, banners, brochures, and printed educational materials."
                        }
                    }
                ]
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

export default function SingleCategoryRootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const [slug, setSlug] = React.useState<string>("");

    React.useEffect(() => {
        params.then((resolvedParams) => {
            setSlug(resolvedParams.slug);
        });
    }, [params]);

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