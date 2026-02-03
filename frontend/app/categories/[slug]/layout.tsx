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
    },
    industry:{
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
        ]
    },
    "graphic-resources":{
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
  ]
},
food:{
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
  ]
},
drinks:{
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
    }
  ]
},
"culture-and-religion":{
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
    }
  ]
},
landscapes:{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://pngpoint.com/categories/landscapes/#collectionpage",
      "name": "Landscapes PNG Images with Transparent Background",
      "description": "Landscape PNG images featuring mountains, forests, beaches, cities, and natural scenery. Transparent and high-quality visuals suitable for design projects, educational content, media, presentations, and nature-focused creative work.",
      "url": "https://pngpoint.com/categories/landscapes/",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://pngpoint.com/#website"
      },
      "breadcrumb": {
        "@id": "https://pngpoint.com/categories/landscapes/#breadcrumb"
      },
      "mainEntity": {
        "@type": "ItemList",
        "@id": "https://pngpoint.com/categories/landscapes/#itemlist",
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "numberOfItems": 11,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beaches & Coastlines PNG",
            "url": "https://pngpoint.com/sub-categories/beaches-coastlines-png"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Countryside & Rural PNG",
            "url": "https://pngpoint.com/sub-categories/countryside-rural-png"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Deserts PNG",
            "url": "https://pngpoint.com/sub-categories/deserts-png"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Forests & Woods PNG",
            "url": "https://pngpoint.com/sub-categories/forests-woods-png"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Gardens & Parks PNG",
            "url": "https://pngpoint.com/sub-categories/gardens-parks-png"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Hills & Mountains PNG",
            "url": "https://pngpoint.com/sub-categories/hills-mountains-png"
          }
        ]
      }
    },

    {
      "@type": "BreadcrumbList",
      "@id": "https://pngpoint.com/categories/landscapes/#breadcrumb",
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
          "name": "Landscapes PNG Images",
          "item": "https://pngpoint.com/categories/landscapes/"
        }
      ]
    },

    {
      "@type": "ImageObject",
      "@id": "https://pngpoint.com/categories/landscapes/#imageobject",
      "name": "Landscapes PNG Images with Transparent Background",
      "contentUrl": "https://pngpoint.com/image/pile-of-colorful-crayons-art-supplies-drawing/",
      "caption": "Pile of colorful crayons, art supplies, drawing",
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
  ]
},
lifestyle:{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://pngpoint.com/categories/lifestyle/#collectionpage",
      "name": "Lifestyle PNG Images with Transparent Background",
      "description": "Lifestyle PNG images representing daily life, wellness, fashion, work routines, and modern living. Transparent graphics suitable for blogs, social media, branding, education, and content focused on personal and social experiences.",
      "url": "https://pngpoint.com/categories/lifestyle/",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://pngpoint.com/#website"
      },
      "breadcrumb": {
        "@id": "https://pngpoint.com/categories/lifestyle/#breadcrumb"
      },
      "mainEntity": {
        "@type": "ItemList",
        "@id": "https://pngpoint.com/categories/lifestyle/#itemlist",
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "numberOfItems": 11,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Beauty & Fashion PNG",
            "url": "https://pngpoint.com/sub-categories/beauty-fashion-png"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Celebrations & Parties PNG",
            "url": "https://pngpoint.com/sub-categories/celebrations-parties-png"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Education & Learning PNG",
            "url": "https://pngpoint.com/sub-categories/education-learning-png"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Family & Relationships PNG",
            "url": "https://pngpoint.com/sub-categories/family-relationships-png"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": " Fitness & Wellness PNG",
            "url": "https://pngpoint.com/sub-categories/fitness-wellness-png"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Health & Medical PNG",
            "url": "https://pngpoint.com/sub-categories/health-medical-png"
          }
        ]
      }
    },

    {
      "@type": "BreadcrumbList",
      "@id": "https://pngpoint.com/categories/lifestyle/#breadcrumb",
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
          "name": "Lifestyle PNG Images",
          "item": "https://pngpoint.com/categories/lifestyle/"
        }
      ]
    },

    {
      "@type": "ImageObject",
      "@id": "https://pngpoint.com/categories/lifestyle/#imageobject",
      "name": "Lifestyle PNG Images with Transparent Background",
      "contentUrl": "https://pngpoint.com/image/symbol-of-love-commitment-and-marriage/",
      "caption": "Symbol of love, commitment, and marriage",
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
people:{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://pngpoint.com/categories/people/#collectionpage",
      "name": "People PNG Images with Transparent Background",
      "description": "People PNG images illustrating individuals, groups, professions, and everyday activities. Transparent, high-resolution visuals designed for education, presentations, marketing, websites, and creative storytelling across multiple industries.",
      "url": "https://pngpoint.com/categories/people/",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://pngpoint.com/#website"
      },
      "breadcrumb": {
        "@id": "https://pngpoint.com/categories/people/#breadcrumb"
      },
      "mainEntity": {
        "@type": "ItemList",
        "@id": "https://pngpoint.com/categories/people/#itemlist",
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "numberOfItems": 11,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Children PNG",
            "url": "https://pngpoint.com/sub-categories/children-png"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Couples & Relationships PNG",
            "url": "https://pngpoint.com/sub-categories/couples-relationships-png"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Crowds & Groups PNG",
            "url": "https://pngpoint.com/sub-categories/crowds-groups-png"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Elderly People PNG",
            "url": "https://pngpoint.com/sub-categories/elderly-people-png"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Families PNG",
            "url": "https://pngpoint.com/sub-categories/families-png"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Occupations & Professions PNG",
            "url": "https://pngpoint.com/sub-categories/occupations-professions-png"
          }
        ]
      }
    },

    {
      "@type": "BreadcrumbList",
      "@id": "https://pngpoint.com/categories/people/#breadcrumb",
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
          "name": "People PNG Images",
          "item": "https://pngpoint.com/categories/people/"
        }
      ]
    },

    {
      "@type": "ImageObject",
      "@id": "https://pngpoint.com/categories/people/#imageobject",
      "name": "People PNG Images with Transparent Background",
      "contentUrl": "https://pngpoint.com/image/elegant-wedding-couple-silhouette-perfect-for-invitations/",
      "caption": "Elegant wedding couple silhouette, perfect for invitations",
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
  ]
},
"plants-and-flowers":{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://pngpoint.com/categories/plants-and-flowers/#collectionpage",
      "name": "Plants and Flowers PNG Images with Transparent Background",
      "description": "Plants and flowers PNG images featuring botanical elements, leaves, trees, and floral designs. Transparent, clean visuals ideal for education, branding, decoration, nature projects, and creative or environmental design use.",
      "url": "https://pngpoint.com/categories/plants-and-flowers/",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://pngpoint.com/#website"
      },
      "breadcrumb": {
        "@id": "https://pngpoint.com/categories/plants-and-flowers/#breadcrumb"
      },
      "mainEntity": {
        "@type": "ItemList",
        "@id": "https://pngpoint.com/categories/plants-and-flowers/#itemlist",
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "numberOfItems": 11,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Cacti & Succulents PNG",
            "url": "https://pngpoint.com/sub-categories/cacti-succulents-png"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Climbing Plants & Vines PNG",
            "url": "https://pngpoint.com/sub-categories/climbing-plants-vines-png"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Flower Bouquets PNG",
            "url": "https://pngpoint.com/sub-categories/flower-bouquets-png"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Flower Icons & Symbols PNG",
            "url": "https://pngpoint.com/sub-categories/flower-icons-symbols-png"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Flowering Plants PNG",
            "url": "https://pngpoint.com/sub-categories/flowering-plants-png"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Herbs & Medicinal Plants PNG",
            "url": "https://pngpoint.com/sub-categories/herbs-medicinal-plants-png"
          }
        ]
      }
    },

    {
      "@type": "BreadcrumbList",
      "@id": "https://pngpoint.com/categories/plants-and-flowers/#breadcrumb",
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
          "name": "Plants and Flowers PNG Images",
          "item": "https://pngpoint.com/categories/plants-and-flowers/"
        }
      ]
    },

    {
      "@type": "ImageObject",
      "@id": "https://pngpoint.com/categories/plants-and-flowers/#imageobject",
      "name": "Plants and Flowers PNG Images with Transparent Background",
      "contentUrl": "https://pngpoint.com/image/green-hedge-with-lush-leaves-for-landscaping-and-design",
      "caption": "Green hedge with lush leaves for landscaping and design",
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
"hobbies-and-leisure":{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://pngpoint.com/categories/hobbies-and-leisure/#collectionpage",
      "name": "Hobbies and Leisure PNG Images with Transparent Background",
      "description": "Hobbies and leisure PNG images covering sports, games, music, travel activities, and free-time interests. Transparent visuals ideal for blogs, education, lifestyle content, presentations, and creative designs focused on recreation.",
      "url": "https://pngpoint.com/categories/hobbies-and-leisure/",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://pngpoint.com/#website"
      },
      "breadcrumb": {
        "@id": "https://pngpoint.com/categories/hobbies-and-leisure/#breadcrumb"
      },
      "mainEntity": {
        "@type": "ItemList",
        "@id": "https://pngpoint.com/categories/hobbies-and-leisure/#itemlist",
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "numberOfItems": 14,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Arts & Crafts PNG",
            "url": "https://pngpoint.com/sub-categories/arts-crafts-png"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Board Games PNG",
            "url": "https://pngpoint.com/sub-categories/board-games-png"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Collectibles PNG",
            "url": "https://pngpoint.com/sub-categories/collectibles-png"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Dancing PNG",
            "url": "https://pngpoint.com/sub-categories/dancing-png"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Fishing PNG",
            "url": "https://pngpoint.com/sub-categories/fishing-png"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Hiking & Camping PNG",
            "url": "https://pngpoint.com/sub-categories/hiking-camping-png"
          }
        ]
      }
    },

    {
      "@type": "BreadcrumbList",
      "@id": "https://pngpoint.com/categories/hobbies-and-leisure/#breadcrumb",
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
          "name": "Hobbies and Leisure PNG",
          "item": "https://pngpoint.com/categories/hobbies-and-leisure/"
        }
      ]
    },

    {
      "@type": "ImageObject",
      "@id": "https://pngpoint.com/categories/hobbies-and-leisure/#imageobject",
      "name": "Hobbies and Leisure PNG Images with Transparent Background",
      "contentUrl": "https://pngpoint.com/image/pile-of-colorful-crayons-art-supplies-drawing/",
      "caption": "Pile of colorful crayons, art supplies, drawing",
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
technology:{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://pngpoint.com/categories/technology/#collectionpage",
      "name": "Technology PNG Images with Transparent Background",
      "description": "Technology PNG images covering digital tools, software, hardware, AI, data, and innovation concepts. Transparent, modern visuals designed for tech presentations, websites, education, and future-focused creative projects.",
      "url": "https://pngpoint.com/categories/technology/",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://pngpoint.com/#website"
      },
      "breadcrumb": {
        "@id": "https://pngpoint.com/categories/technology/#breadcrumb"
      },
      "mainEntity": {
        "@type": "ItemList",
        "@id": "https://pngpoint.com/categories/technology/#itemlist",
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "numberOfItems": 11,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Artificial Intelligence PNG",
            "url": "https://pngpoint.com/sub-categories/artificial-intelligence-png"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blockchain & Cryptocurrency PNG",
            "url": "https://pngpoint.com/sub-categories/blockchain-cryptocurrency-png"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Cloud Computing PNG",
            "url": "https://pngpoint.com/sub-categories/cloud-computing-png"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Computers & Hardware PNG",
            "url": "https://pngpoint.com/sub-categories/computers-hardware-png"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": " Cybersecurity PNG",
            "url": "https://pngpoint.com/sub-categories/cybersecurity-png"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Data & Analytics PNG",
            "url": "https://pngpoint.com/sub-categories/data-analytics-png"
          }
        ]
      }
    },

    {
      "@type": "BreadcrumbList",
      "@id": "https://pngpoint.com/categories/technology/#breadcrumb",
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
          "name": "Technology",
          "item": "https://pngpoint.com/categories/technology/"
        }
      ]
    },

    {
      "@type": "ImageObject",
      "@id": "https://pngpoint.com/categories/technology/#imageobject",
      "name": "Technology PNG Images with Transparent Background",
      "contentUrl": "https://pngpoint.com/image/business-team-analyzing-financial-data-on-computer-screen/",
      "caption": "Business team analyzing financial data on computer screen",
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
  ]
},
"states-of-mind":{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://pngpoint.com/categories/states-of-mind/#collectionpage",
      "name": "States of Mind PNG Images with Transparent Background",
      "description": "States of mind PNG images representing emotions, feelings, mental health concepts, and psychological states. Transparent visuals suitable for education, presentations, wellness content, awareness campaigns, and creative storytelling.",
      "url": "https://pngpoint.com/categories/states-of-mind/",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://pngpoint.com/#website"
      },
      "breadcrumb": {
        "@id": "https://pngpoint.com/categories/states-of-mind/#breadcrumb"
      },
      "mainEntity": {
        "@type": "ItemList",
        "@id": "https://pngpoint.com/categories/states-of-mind/#itemlist",
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "numberOfItems": 11,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Bullying & Harassment PNG",
            "url": "https://pngpoint.com/sub-categories/bullying-harassment-png"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Child Protection PNG",
            "url": "https://pngpoint.com/sub-categories/child-protection-png"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Disability Inclusion PNG",
            "url": "https://pngpoint.com/sub-categories/disability-inclusion-png"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Equality & Human Rights PNG",
            "url": "https://pngpoint.com/sub-categories/equality-human-rights-png"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": " Health Awareness PNG",
            "url": "https://pngpoint.com/sub-categories/health-awareness-png"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Peace & Unity PNG",
            "url": "https://pngpoint.com/sub-categories/peace-unity-png"
          }
        ]
      }
    },

    {
      "@type": "BreadcrumbList",
      "@id": "https://pngpoint.com/categories/states-of-mind/#breadcrumb",
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
          "name": "States of Mind",
          "item": "https://pngpoint.com/categories/states-of-mind/"
        }
      ]
    },

    {
      "@type": "ImageObject",
      "@id": "https://pngpoint.com/categories/states-of-mind/#imageobject",
      "name": "States of Mind PNG Images with Transparent Background",
      "contentUrl": "https://pngpoint.com/image/microscopic-cell-view/",
      "caption": "Microscopic Cell View",
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
  ]
},
sports:{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://pngpoint.com/categories/sports/#collectionpage",
      "name": "Sports PNG Images with Transparent Background",
      "description": "Sports PNG images featuring athletes, equipment, fitness activities, and competitive games. Transparent, high-quality visuals suitable for media, education, marketing, event promotion, and sports-related creative projects.",
      "url": "https://pngpoint.com/categories/sports/",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://pngpoint.com/#website"
      },
      "breadcrumb": {
        "@id": "https://pngpoint.com/categories/sports/#breadcrumb"
      },
      "mainEntity": {
        "@type": "ItemList",
        "@id": "https://pngpoint.com/categories/sports/#itemlist",
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "numberOfItems": 11,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Bullying & Harassment PNG",
            "url": "https://pngpoint.com/sub-categories/bullying-harassment-png"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Child Protection PNG",
            "url": "https://pngpoint.com/sub-categories/child-protection-png"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Disability Inclusion PNG",
            "url": "https://pngpoint.com/sub-categories/disability-inclusion-png"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Equality & Human Rights PNG",
            "url": "https://pngpoint.com/sub-categories/equality-human-rights-png"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": " Health Awareness PNG",
            "url": "https://pngpoint.com/sub-categories/health-awareness-png"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Peace & Unity PNG",
            "url": "https://pngpoint.com/sub-categories/peace-unity-png"
          }
        ]
      }
    },

    {
      "@type": "BreadcrumbList",
      "@id": "https://pngpoint.com/categories/sports/#breadcrumb",
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
          "name": "Sports PNG Images",
          "item": "https://pngpoint.com/categories/sports/"
        }
      ]
    },

    {
      "@type": "ImageObject",
      "@id": "https://pngpoint.com/categories/sports/#imageobject",
      "name": "Sports PNG Images with Transparent Background",
      "contentUrl": "https://pngpoint.com/image/microscopic-cell-view/",
      "caption": "Microscopic Cell View",
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
"social-issues":{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://pngpoint.com/categories/social-issues/#collectionpage",
      "name": "Social Issues PNG Images with Transparent Background",
      "description": "Social issues PNG images highlighting awareness topics such as equality, human rights, education, health, and community challenges. Transparent visuals designed for campaigns, presentations, educational content, and nonprofit communication.",
      "url": "https://pngpoint.com/categories/social-issues/",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://pngpoint.com/#website"
      },
      "breadcrumb": {
        "@id": "https://pngpoint.com/categories/social-issues/#breadcrumb"
      },
      "mainEntity": {
        "@type": "ItemList",
        "@id": "https://pngpoint.com/categories/social-issues/#itemlist",
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "numberOfItems": 11,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Bullying & Harassment PNG",
            "url": "https://pngpoint.com/sub-categories/bullying-harassment-png"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Child Protection PNG",
            "url": "https://pngpoint.com/sub-categories/child-protection-png"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Disability Inclusion PNG",
            "url": "https://pngpoint.com/sub-categories/disability-inclusion-png"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Equality & Human Rights PNG",
            "url": "https://pngpoint.com/sub-categories/equality-human-rights-png"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": " Health Awareness PNG",
            "url": "https://pngpoint.com/sub-categories/health-awareness-png"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Peace & Unity PNG",
            "url": "https://pngpoint.com/sub-categories/peace-unity-png"
          }
        ]
      }
    },

    {
      "@type": "BreadcrumbList",
      "@id": "https://pngpoint.com/categories/social-issues/#breadcrumb",
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
          "name": "Social Issues PNG Images",
          "item": "https://pngpoint.com/categories/social-issues/"
        }
      ]
    },

    {
      "@type": "ImageObject",
      "@id": "https://pngpoint.com/categories/social-issues/#imageobject",
      "name": "Social Issues PNG Images with Transparent Background",
      "contentUrl": "https://pngpoint.com/image/microscopic-cell-view/",
      "caption": "Microscopic Cell View",
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
  ]
},
science:{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://pngpoint.com/categories/science/#collectionpage",
      "name": "Science PNG Images with Transparent Background",
      "description": "Science PNG images covering biology, chemistry, physics, laboratories, experiments, and STEM concepts. Transparent graphics suitable for education, research presentations, e-learning platforms, and science-focused visual communication.",
      "url": "https://pngpoint.com/categories/science/",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://pngpoint.com/#website"
      },
      "breadcrumb": {
        "@id": "https://pngpoint.com/categories/science/#breadcrumb"
      },
      "mainEntity": {
        "@type": "ItemList",
        "@id": "https://pngpoint.com/categories/science/#itemlist",
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "numberOfItems": 11,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Astronomy & Space PNG",
            "url": "https://pngpoint.com/sub-categories/astronomy-space-png"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Biology & Life Science PNG",
            "url": "https://pngpoint.com/sub-categories/biology-life-science-png"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Chemistry PNG",
            "url": "https://pngpoint.com/sub-categories/chemistry-png"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Earth Science PNG",
            "url": "https://pngpoint.com/sub-categories/earth-science-png"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": " Genetics & DNA PNG",
            "url": "https://pngpoint.com/sub-categories/genetics-dna-png"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Mathematics PNG",
            "url": "https://pngpoint.com/sub-categories/mathematics-png"
          }
        ]
      }
    },

    {
      "@type": "BreadcrumbList",
      "@id": "https://pngpoint.com/categories/science/#breadcrumb",
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
          "name": "Science PNG Images",
          "item": "https://pngpoint.com/categories/science/"
        }
      ]
    },

    {
      "@type": "ImageObject",
      "@id": "https://pngpoint.com/categories/science/#imageobject",
      "name": "Science PNG Images with Transparent Background",
      "contentUrl": "https://pngpoint.com/image/microscopic-cell-view/",
      "caption": "Microscopic Cell View",
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
            title: `Browse All PNG Image ${data.name} | Free Transparent PNGs | PNGBay`,
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