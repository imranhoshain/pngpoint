/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Shield, Download, Lightbulb } from "lucide-react";

interface LicensingDownloadProps {
    categorySlug?: string;
}

export const LicensingDownload = ({ categorySlug }: LicensingDownloadProps) => {

// Helper function to convert text with links
const processTextWithLinks = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    
    // Pattern to match: PNGPoint, transparent images, or words ending with 'license'
    const pattern = /(PNGPoint|transparent images|\w*[Ll]icense)/g;
    let match;
    
    while ((match = pattern.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        
        // Add the linked text
        const matchedText = match[0];
        let url = 'https://pngpoint.com/';
        
        // Determine the URL based on the matched text
        if (matchedText.toLowerCase().includes('license')) {
            url = 'https://pngpoint.com/license';
        }
        
        parts.push(
            <a
                key={match.index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0077a2] hover:text-[#005a7d] underline font-medium"
            >
                {matchedText}
            </a>
        );
        
        lastIndex = match.index + matchedText.length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? <>{parts}</> : text;
};


    // Determine category type
    const isBuildingsCategory = categorySlug === 'buildings-and-architecture';
    const isCultureReligionCategory = categorySlug === 'culture-and-religion';
    const isBusinessCategory = categorySlug === 'business';
    const isDrinksCategory = categorySlug === 'drinks';
    const isFoodCategory = categorySlug === 'food';
    const isGraphicResourcesCategory = categorySlug === 'graphic-resources';

    // Animals content
    const animalsContent = {
        title: "Licensing & Download Information",
        subtitle: "Simple, transparent terms that keep your projects safe and hassle-free",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "We know licensing can be confusing, so we made it simple. All Animal PNG images are royalty-free, and most allow commercial and print use. If an image requires attribution, it's clearly noted on its page.",
            proTip: "Always double-check the license info before downloading—it keeps your projects safe and worry-free."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Whether you need one image or an entire set, downloading is easy. Choose free Animal PNG downloads, HD/high-resolution files, or transparent background PNGs depending on your project.",
            features: [
                "Single images or bulk downloads available",
                "Multiple resolution options for different needs",
                "Clean, ready-to-use files that save editing time"
            ]
        },
        cta: {
            title: "Start Downloading Today",
            description: "Access our complete Animal PNG library with clear licensing and instant downloads. No hidden fees, no watermarks—just high-quality graphics ready for your projects."
        }
    };

    // Buildings & Architecture content
    const buildingsContent = {
        title: "Licensing, Rights & Usage",
        subtitle: "Transparent, easy-to-understand licenses for confident use",
        licensing: {
            title: "Key Points",
            description: "Every Building and Architecture PNG comes with a transparent, easy-to-understand license. You can confidently use these assets without worrying about legal issues.",
            proTip: "Always double-check the license information displayed on each image page to ensure your intended use aligns with the terms. This helps maintain compliance for commercial or educational projects."
        },
        licensingKeyPoints: [
            { label: "Royalty-Free:", text: "Use PNGs for both digital and print projects without extra fees." },
            { label: "Commercial Use Allowed:", text: "Perfect for branding, marketing, presentations, and client work." },
            { label: "No Attribution Needed:", text: "Most PNGs don't require credit, unless specified in the license." }
        ],
        download: {
            title: "Download Options & File Quality",
            description: "Access high-resolution Building and Architecture PNGs optimized for professional use. Download individual images or entire collections based on your project requirements.",
            features: [
                "High-resolution files suitable for print and web",
                "Transparent backgrounds for seamless integration",
                "Organized collections by building type and style"
            ]
        },
        cta: {
            title: "Start Building Your Vision",
            description: "Access our complete Architecture PNG library with clear licensing and instant downloads. Professional-quality assets ready for architectural presentations, marketing materials, and design projects."
        }
    };

    const businessContent = {
        title: "Licensing, Rights & Usage",
        subtitle: "Transparent, easy-to-understand licenses for confident use",
        licensing: {
            title: "Key Points",
            description: "Every Business comes with a transparent, easy-to-understand license. You can confidently use these assets without worrying about legal issues.",
            proTip: "Always double-check the license information displayed on each image page to ensure your intended use aligns with the terms. This helps maintain compliance for commercial or educational projects."
        },
        licensingKeyPoints: [
            { label: "Royalty-Free:", text: "Use PNGs for both digital and print projects without extra fees." },
            { label: "Commercial Use Allowed:", text: "Perfect for branding, marketing, presentations, and client work." },
            { label: "No Attribution Needed:", text: "Most PNGs don't require credit, unless specified in the license." }
        ],
        download: {
            title: "Download Options & File Quality",
            description: "Access high-resolution Business optimized for professional use. Download individual images or entire collections based on your project requirements.",
            features: [
                "High-resolution files suitable for print and web",
                "Transparent backgrounds for seamless integration",
                "Organized collections by building type and style"
            ]
        },
        cta: {
            title: "Start Building Your Vision",
            description: "Access our complete Architecture PNG library with clear licensing and instant downloads. Professional-quality assets ready for architectural presentations, marketing materials, and design projects."
        }
    };

    // Culture & Religion content
    const cultureReligionContent = {
        title: "Licensing & Usage Rights",
        subtitle: "Simple, transparent terms for safe and respectful use",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "Licensing should never be unclear, especially for cultural content. All Culture and Religion PNG images come with clear usage information. Most assets are royalty-free and allow commercial and print use. If attribution is required, it's clearly mentioned on the file page.",
            proTip: "Always review the license details before downloading to keep projects compliant and stress-free."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Downloading is simple and flexible. Choose free Culture and Religion PNG downloads, HD files for print, or transparent PNGs for digital use. You can download single images or multiple assets to speed up your workflow.",
            features: [
                "Single images or bulk downloads available",
                "HD resolution files for print and web use",
                "Clean, ready-to-use files help you focus on storytelling instead of editing"
            ]
        },
        cta: {
            title: "Start Creating Meaningful Content",
            description: "Access our complete Culture and Religion PNG library with clear licensing and instant downloads. High-quality, culturally accurate visuals ready for education, media, and creative projects."
        }
    };

    // Drinks content
    const drinksContent = {
        title: "Licensing & Usage Rights",
        subtitle: "Simple, transparent terms for safe project use",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "All Drinks PNGs are royalty-free, many allowing commercial and print use. Any attribution requirements are clearly mentioned. Always verify license info before download.",
            proTip: "Always verify license info before download to keep your projects safe and compliant."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Download single or multiple PNGs, free or HD. Transparent backgrounds make it easy to integrate into any project.",
            features: [
                "Single or bulk downloads for faster workflow",
                "HD and standard resolution options available",
                "Transparent backgrounds ensure clean, professional results"
            ]
        },
        cta: {
            title: "Start Downloading Today",
            description: "Access our complete Drinks PNG library with clear licensing and instant downloads. High-quality beverage graphics ready for web, print, and marketing projects."
        }
    };

    // Food content
    const foodContent = {
        title: "Licensing & Usage Rights",
        subtitle: "Simple, transparent terms for safe project use",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "Licensing stays simple and transparent. All Food PNG images are royalty-free, and many allow commercial and print use. If attribution is required, it's clearly mentioned on the image page.",
            proTip: "Always review the license details before downloading to avoid confusion later."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Downloading is quick and flexible. Choose free Food PNGs, HD files, or transparent background images based on your project. You can download single images or multiple files at once. Clean files help you focus on creativity, not editing.",
            features: [
                "Single images or bulk downloads available",
                "HD and standard resolution options for different needs",
                "Clean, ready-to-use files that save editing time"
            ]
        },
        cta: {
            title: "Start Downloading Today",
            description: "Access our complete Food PNG library with clear licensing and instant downloads. High-quality food graphics ready for menus, marketing, and creative projects."
        }
    };

    // Graphic Resources content
    const graphicResourcesContent = {
        title: "Licensing & Usage Rights",
        subtitle: "Simple, transparent terms for safe project use",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "Licensing is kept simple. All graphic resources are royalty-free, and most support commercial and print use. Any attribution requirements are clearly mentioned on individual asset pages.",
            proTip: "Always review the license details before downloading to ensure full compliance."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Download single assets or complete packs based on your workflow. Choose transparent PNGs, scalable SVGs, or layered PSD and AI files depending on your needs. High-quality files help maintain consistency across digital and print designs.",
            features: [
                "Single assets or complete packs available",
                "Multiple file formats: PNG, SVG, AI, PSD",
                "High-quality files for digital and print consistency"
            ]
        },
        cta: {
            title: "Start Creating Today",
            description: "Access our complete graphic resources library with clear licensing and instant downloads. High-quality design assets ready for websites, branding, and creative projects."
        }
    };

    // Hobbies & Leisure content
    const hobbiesLeisureContent = {
        title: "Licensing & Usage Rights",
        subtitle: "Simple, transparent terms for safe project use",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "Licensing stays simple and transparent. Most Hobbies and Leisure graphic resources are royalty-free and allow personal and commercial use. If attribution is required, it's clearly mentioned on the asset page.",
            proTip: "Always review license details before downloading to avoid issues later."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Download single graphics or complete sets based on your needs. Choose free downloads, high-resolution files, or vector formats for scalable design. Clean files help you focus on creativity instead of technical fixes.",
            features: [
                "Single graphics or complete sets available",
                "Free downloads and high-resolution options",
                "Vector formats for scalable design"
            ]
        },
        cta: {
            title: "Start Creating Today",
            description: "Access our complete Hobbies and Leisure library with clear licensing and instant downloads. High-quality graphics ready for creative projects and lifestyle branding."
        }
    };

    // Industry content
    const industryContent = {
        title: "Licensing & Usage Rights",
        subtitle: "Simple, transparent terms for safe project use",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "All Industry PNGs are royalty-free, and most allow commercial and print use. Attribution is clearly noted if required. Always check licensing to ensure compliance.",
            proTip: "Always check licensing to ensure compliance before using Industry PNGs in your projects."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Download individual files or sets in HD/high-resolution, transparent PNGs. Quickly grab multiple images for faster workflow, helping you focus on project execution rather than editing.",
            features: [
                "Individual files or complete sets available",
                "HD/high-resolution transparent PNGs",
                "Fast downloads for efficient workflows"
            ]
        },
        cta: {
            title: "Start Your Professional Projects",
            description: "Access our complete Industry PNG library with clear licensing and instant downloads. High-quality industrial graphics ready for presentations, marketing, and corporate use."
        }
    };

    // Landscape content
    const landscapeContent = {
        title: "Licensing & Usage Rights",
        subtitle: "Simple, transparent terms for safe project use",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "Licensing should never feel confusing. All Landscape PNG images here are royalty-free, and many allow commercial and print use. If attribution is required, it's clearly stated on the image page.",
            proTip: "Always review the license details before downloading to keep your project safe and compliant."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Downloading landscape PNG images is simple and flexible. Choose free PNG downloads, HD landscape PNG files, or transparent background images based on your needs. You can download single images or multiple files at once for a faster workflow. Clean, ready-to-use files help you focus on creativity instead of image cleanup.",
            features: [
                "Single images or multiple files available",
                "Free PNG downloads and HD landscape PNG options",
                "Clean, ready-to-use files save editing time"
            ]
        },
        cta: {
            title: "Start Creating Today",
            description: "Access our complete Landscape PNG library with clear licensing and instant downloads. High-quality landscape graphics ready for websites, presentations, and creative projects."
        }
    };

    // Lifestyle content
    const lifestyleContent = {
        title: "Licensing & Usage Rights",
        subtitle: "Simple, transparent terms for safe project use",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "All Lifestyle PNGs are royalty-free, with many available for commercial, personal, and print projects. Attribution requirements, if any, are clearly noted. Always check the license before downloading to avoid any issues.",
            proTip: "Always check the license before downloading to avoid any issues."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Select single PNGs or entire packs depending on your project. Choose free downloads, high-resolution, or transparent background files. Quick downloads save time for creative workflows.",
            features: [
                "Single PNGs or complete packs available",
                "Free downloads and high-resolution options",
                "Quick downloads for efficient workflows"
            ]
        },
        cta: {
            title: "Start Creating Today",
            description: "Access our complete Lifestyle PNG library with clear licensing and instant downloads. High-quality lifestyle graphics ready for social media, branding, and creative projects."
        }
    };

    // People content
    const peopleContent = {
        title: "Licensing & Usage Rights",
        subtitle: "Simple, transparent terms for safe project use",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "All People PNG images are royalty-free. Most allow commercial, educational, and print use. Attribution notes appear when required. Always check the license info before downloading.",
            proTip: "Always check the license info before downloading."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Single or multiple PNG downloads available. HD, transparent background, and high-resolution options streamline workflow and reduce editing time.",
            features: [
                "Single or multiple PNG downloads available",
                "HD and high-resolution transparent backgrounds",
                "Fast downloads for efficient workflows"
            ]
        },
        cta: {
            title: "Start Creating Today",
            description: "Access our complete People PNG library with clear licensing and instant downloads. High-quality people graphics ready for websites, branding, and creative projects."
        }
    };

    // Plants & Flowers content
    const plantsFlowersContent = {
        title: "Licensing & Usage Rights",
        subtitle: "Simple, transparent terms for safe project use",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "All Plants & Flowers PNG images are royalty-free. Many allow commercial and print use. Attribution requirements are clearly stated on each file page. Always double-check the license info before downloading.",
            proTip: "Always double-check the license info before downloading."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Grab single images or full sets, choose free downloads or HD files, and ensure transparent backgrounds for seamless integration. Clean files save editing time.",
            features: [
                "Single images or complete sets available",
                "Free downloads and HD file options",
                "Transparent backgrounds for seamless integration"
            ]
        },
        cta: {
            title: "Start Creating Today",
            description: "Access our complete Plants & Flowers PNG library with clear licensing and instant downloads. High-quality botanical graphics ready for web, print, and creative projects."
        }
    };

    // Social Issues content
    const socialIssuesContent = {
        title: "Licensing & Usage Rights",
        subtitle: "Simple, transparent terms for safe project use",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "Licensing should never feel confusing. Most Social Issues PNG images are royalty-free and allow educational and awareness use. Commercial usage is clearly marked on each file. If attribution is required, it appears directly on the download page.",
            proTip: "Always review the license before publishing to keep your project safe and compliant."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Downloading is simple and flexible. Choose from free Social Issues PNGs, HD files, or transparent background assets based on your needs. You can download individual images or select multiple files to speed up your workflow. Clean files help you focus on impact, not editing.",
            features: [
                "Individual images or multiple file selections",
                "Free Social Issues PNGs and HD options",
                "Transparent backgrounds for clean integration"
            ]
        },
        cta: {
            title: "Start Your Campaign Today",
            description: "Access our complete Social Issues PNG library with clear licensing and instant downloads. High-quality awareness graphics ready for education, campaigns, and advocacy projects."
        }
    };

    // Science content
    const scienceContent = {
        title: "Licensing & Usage Rights",
        subtitle: "Simple, transparent terms for safe project use",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "Licensing should be simple and transparent. Most Science PNG images are royalty-free and suitable for educational use. Commercial usage is clearly marked on each file. If attribution is required, it's mentioned upfront.",
            proTip: "Always review license details before publishing or distributing content."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Downloading Science PNGs is fast and flexible. Choose free downloads, HD files, or transparent background images based on your project needs. You can download single images or multiple assets at once. Clean files help you focus on teaching, designing, or building—not editing.",
            features: [
                "Single images or multiple asset downloads",
                "Free downloads and HD file options",
                "Transparent backgrounds optimized for education"
            ]
        },
        cta: {
            title: "Start Your Science Project Today",
            description: "Access our complete Science PNG library with clear licensing and instant downloads. High-quality educational graphics ready for STEM projects, presentations, and learning platforms."
        }
    };

    // Sports content
    const sportsContent = {
        title: "Licensing & Usage Rights",
        subtitle: "Simple, transparent terms for safe project use",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "All Sports PNGs are royalty-free, and most allow commercial and print use. Attribution notes are clearly mentioned where required. Always check license info before downloading.",
            proTip: "Always check license info before downloading."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Download single images or multiple PNGs in HD/high-resolution. Transparent backgrounds ensure ready-to-use files for web, print, or branding projects.",
            features: [
                "Single images or multiple PNG downloads",
                "HD/high-resolution transparent files",
                "Ready-to-use for web, print, and branding"
            ]
        },
        cta: {
            title: "Start Your Sports Project Today",
            description: "Access our complete Sports PNG library with clear licensing and instant downloads. High-quality sports graphics ready for design, education, and branding projects."
        }
    };

    // States of Mind content
    const statesOfMindContent = {
        title: "Licensing & Usage Rights",
        subtitle: "Simple, transparent terms for safe project use",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "All States of Mind visuals are royalty-free and most allow commercial and print use. If an image requires attribution, it is clearly noted. Always double-check licensing before download to ensure project safety.",
            proTip: "Always double-check licensing before download to ensure project safety."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Download single images, full packs, or high-resolution transparent PNGs. Ready-to-use files save editing time and allow seamless integration into projects.",
            features: [
                "Single images or complete packs available",
                "High-resolution transparent PNGs",
                "Seamless integration into projects"
            ]
        },
        cta: {
            title: "Start Your Creative Project Today",
            description: "Access our complete States of Mind library with clear licensing and instant downloads. High-quality emotional and mental state visuals ready for education, wellness, and creative projects."
        }
    };

    // Technology content
    const technologyContent = {
        title: "Licensing & Usage Rights",
        subtitle: "Simple, transparent terms for safe project use",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "Licensing is kept simple and transparent. Most Technology PNG images are royalty-free and allow commercial and print use. If attribution is required, it's clearly mentioned on the image page.",
            proTip: "Always review license details before downloading to keep your project compliant and safe."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Download single images or complete sets based on your workflow. Choose free Technology PNGs, HD files, or transparent background assets depending on your project needs. Clean, optimized files help you focus on building and designing instead of editing.",
            features: [
                "Single images or complete sets available",
                "Free Technology PNGs and HD file options",
                "Clean, optimized files for efficient workflow"
            ]
        },
        cta: {
            title: "Start Your Tech Project Today",
            description: "Access our complete Technology PNG library with clear licensing and instant downloads. High-quality tech graphics ready for apps, websites, presentations, and digital products."
        }
    };

    // Environment content
    const environmentContent = {
        title: "Licensing & Usage Rights",
        subtitle: "Simple, transparent terms for safe project use",
        licensing: {
            title: "Licensing & Usage Rights",
            description: "Licensing should never feel confusing. All Environment PNG images are royalty-free, and many allow commercial and print use. If attribution is required, it's clearly shown on the image page.",
            proTip: "Always check license details before downloading to keep projects safe and compliant."
        },
        download: {
            title: "Download Options & File Quality",
            description: "Downloading is simple and flexible. Choose free Environment PNG downloads, HD files, or transparent background images based on your needs. Download single files or multiple assets for faster workflows. Clean files help you focus on your message, not editing.",
            features: [
                "Single files or multiple asset downloads",
                "Free Environment PNG downloads and HD options",
                "Clean files for message-focused workflows"
            ]
        },
        cta: {
            title: "Start Your Green Project Today",
            description: "Access our complete Environment PNG library with clear licensing and instant downloads. High-quality eco graphics ready for education, sustainability campaigns, and environmental awareness."
        }
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
                            {content.subtitle}
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
                        {/* Licensing & Usage Rights / Key Points */}
                        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <Shield className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 leading-tight pt-3">
                                    {content.licensing.title}
                                </h3>
                            </div>
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                                {processTextWithLinks(content.licensing.description)}
                            </p>
                            
                            {/* Key Points for Buildings/Business, Pro Tip Box for others */}
                            {(isBuildingsCategory || isBusinessCategory) ? (
                                <>
                                    <div className="space-y-3 mb-4">
                                        {buildingsContent.licensingKeyPoints.map((point, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                                <span className="text-sm md:text-base text-gray-700">
                                                    <strong>{point.label}</strong> {point.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-[#0077a2] p-4 rounded-lg">
                                        <div className="flex items-start gap-3">
                                            <Lightbulb className="w-5 h-5 text-[#0077a2] flex-shrink-0 mt-0.5" />
                                            <p className="text-sm md:text-base text-gray-700">
                                                <strong className="text-[#0077a2]">Pro Tip:</strong> {processTextWithLinks(content.licensing.proTip)}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-[#0077a2] p-4 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <Lightbulb className="w-5 h-5 text-[#0077a2] flex-shrink-0 mt-0.5" />
                                        <p className="text-sm md:text-base text-gray-700">
                                            <strong className="text-[#0077a2]">Tip:</strong> {processTextWithLinks(content.licensing.proTip)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Download Options & File Quality */}
                        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <Download className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 leading-tight pt-3">
                                    {content.download.title}
                                </h3>
                            </div>
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                                {processTextWithLinks(content.download.description)}
                            </p>
                            <div className="space-y-3">
                                {content.download.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                        <span className="text-sm md:text-base text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="bg-gradient-to-r from-[#0077a2] to-[#005a7d] rounded-2xl p-8 lg:p-10 text-center shadow-xl">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                            {content.cta.title}
                        </h3>
                        <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-3xl mx-auto">
                            {processTextWithLinks(content.cta.description)}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};