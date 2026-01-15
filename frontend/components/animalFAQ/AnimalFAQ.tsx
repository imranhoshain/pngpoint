"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

interface AnimalFAQProps {
    categorySlug?: string;
    categoryName?: string;
}

const animalFaqData: FAQItem[] = [
    {
        id: 1,
        question: "What is an Animal PNG image, and why is it useful?",
        answer: "An Animal PNG is a raster image with transparent backgrounds. Its clean edges make it perfect for overlays, logos, web design, and educational materials, without the worry of a white box behind the image."
    },
    {
        id: 2,
        question: "What does \"transparent background\" mean in Animal PNGs?",
        answer: "It means only the animal shape is visible. You can place it on any background without a white border, making your designs look professional and seamless."
    },
    {
        id: 3,
        question: "Are these Animal PNGs free to download and use?",
        answer: "Some PNGs are free, while others are premium. Check the licensing note for each file. Free downloads may have limited usage; premium packs often include broader commercial rights."
    },
    {
        id: 4,
        question: "Can I use Animal PNGs for commercial projects?",
        answer: "Yes, many Animal PNGs are available for commercial use on websites, in branding, or on products. Always verify the license terms for clarity. Look for \"Royalty-Free\" or \"Commercial Use Allowed\" labels."
    },
    {
        id: 5,
        question: "What is the difference between PNG, vector, and clipart for animals?",
        answer: "PNG: Raster, high-quality, transparent. Ready-to-use for web and print. Vector (AI/SVG): Scalable without losing quality. Best for logos and illustrations. Clipart: Stylized illustrations, often simplified."
    },
    {
        id: 6,
        question: "Do you offer high-resolution or HD Animal PNG images?",
        answer: "Yes, most Animal PNGs are high-resolution, suitable for print, banners, and large displays. Check each file's specs before downloading."
    },
    {
        id: 7,
        question: "Can I use Animal PNGs for kids' educational projects?",
        answer: "Absolutely. Many are designed for worksheets, presentations, and classroom visuals. Confirm the license if your project has commercial intent."
    },
    {
        id: 8,
        question: "How do I ensure the PNG looks good on my website or app?",
        answer: "Choose a suitable resolution: 72–150 dpi for screens, 300 dpi for print. Ensure the PNG has a transparent background and clean edges."
    },
    {
        id: 9,
        question: "What file sizes should I expect for Animal PNGs?",
        answer: "File size depends on dimensions and detail. High-resolution PNGs may range from a few hundred KB to several MB. For web use, optimize with compression if permitted."
    },
    {
        id: 10,
        question: "Can I edit or customize the Animal PNG?",
        answer: "Yes, you can resize, recolor, or combine PNGs in compatible software. Check the license to confirm editing is allowed. Premium packs usually allow full modification."
    },
    {
        id: 11,
        question: "Are there Animal PNGs specifically for branding or logos?",
        answer: "Yes. Look for Animal Logo PNGs or Icon PNGs. Ensure the license covers branding and commercial usage before using it for your brand."
    },
    {
        id: 12,
        question: "Do you have Animal PNGs with transparent backgrounds for print?",
        answer: "Yes, many PNGs are print-ready with transparent backgrounds. Verify the 300 dpi resolution for banners, posters, or merchandise."
    },
    {
        id: 13,
        question: "What does \"royalty-free\" mean for Animal PNGs?",
        answer: "Royalty-free means you can use the image across multiple projects without recurring fees, as long as you follow the license terms. It doesn't always mean zero restrictions, so read the license carefully."
    },
    {
        id: 14,
        question: "How can I find Animal PNGs in specific styles (cute, realistic, cartoon)?",
        answer: "Use search filters or keywords like \"Cute Animals PNG,\" \"Cartoon Animal PNG,\" or \"Realistic Animal PNG.\" Preview thumbnails and verify licensing to ensure project compatibility."
    },
    {
        id: 15,
        question: "Can I download Animal PNGs for educational platforms or kids' projects?",
        answer: "Yes. Many are suitable for classroom use, learning apps, and student worksheets. Always verify distribution rights and license terms for educational use."
    }
];

const buildingFaqData: FAQItem[] = [
    {
        id: 1,
        question: "What is a Building PNG image?",
        answer: "A Building PNG is a high-resolution raster file featuring architectural structures (buildings, skylines, or interiors) with an alpha channel for background transparency."
    },
    {
        id: 2,
        question: "Why use PNG for architectural visuals?",
        answer: "PNG supports lossless compression, preserving sharp edges and fine details essential to architectural overlays, mockups, and professional presentations without introducing background noise."
    },
    {
        id: 3,
        question: "Architecture PNG vs. Architectural Design PNG: What's the difference?",
        answer: "Architecture PNG is a broad category for buildings and structures. Architectural Design PNG focuses specifically on design concepts, rendered elements, and floor-plan visuals."
    },
    {
        id: 4,
        question: "Are Cityscape and Skyline PNGs always transparent?",
        answer: "Most professional assets provide transparent backgrounds for layering. Always verify the file properties to ensure the alpha channel is active for seamless compositing."
    },
    {
        id: 5,
        question: "How to identify high-resolution Architecture PNGs?",
        answer: "Prioritize files with 300+ DPI for print or dimensions like 4000x3000 px for digital use. Check the download metadata for HD or Ultra-HD labels."
    },
    {
        id: 6,
        question: "Can I use Building PNGs for commercial projects?",
        answer: "Yes, but licensing varies. Our assets are royalty-free, but always confirm if specific landmark images require additional permissions for commercial use."
    },
    {
        id: 7,
        question: "How to edit PNGs without quality loss?",
        answer: "Edit in raster software like Photoshop using non-destructive layers. Avoid repeated re-saving with high compression to maintain the original transparency and detail."
    },
    {
        id: 8,
        question: "Do PNGs support transparency for blueprints?",
        answer: "Yes. PNG is the industry standard for transparent overlays, allowing you to layer building elements directly over blueprints or textured backgrounds."
    },
    {
        id: 9,
        question: "What are the primary use cases for Architecture PNGs?",
        answer: "Typical applications include site plan renders, mood boards, website hero sections, app UI icons, and professional architectural marketing materials."
    },
    {
        id: 10,
        question: "How to optimize PNGs for web and print?",
        answer: "For the web, export as PNG-24 with alpha transparency. For print, ensure a 300 DPI resolution and convert to the appropriate color profile (CMYK) in your design tool."
    },
    {
        id: 11,
        question: "Architecture PNG vs. Blueprint Architecture PNG?",
        answer: "Architecture PNGs depict visual structures, while Blueprint Architecture PNGs focus on technical schematics, structural layouts, and floor plans."
    },
    {
        id: 12,
        question: "Are there restrictions on Historical or Landmark PNGs?",
        answer: "Historical assets may have specific reproduction rights. Verify the source's terms before using famous landmark PNGs for commercial branding."
    },
    {
        id: 13,
        question: "How to find Architecture Silhouette PNGs?",
        answer: "Search the silhouette category for solid-color building profiles. These are optimized for minimalist logos, icons, and clean graphic design."
    },
    {
        id: 14,
        question: "Can I customize colors in Architecture PNGs?",
        answer: "Yes. Use masking or hue/saturation adjustments in editing software. For flat PNGs, use the \"Color Overlay\" tool to match the asset to your project's theme."
    },
    {
        id: 15,
        question: "What metadata is essential for SEO and branding?",
        answer: "Include descriptive Alt Text (e.g., \"Modern office building silhouette PNG\"), file resolution, and license type. This ensures accessibility and improves Google Image search rankings."
    }
];

const renderAnswerWithLink = (answer: string, id: number, categorySlug?: string): React.ReactNode => {
    const shouldApplyLink = 
        (categorySlug === 'animals' && id === 4) || 
        (categorySlug === 'buildings-and-architecture' && id === 6);
    
    if (shouldApplyLink) {
        const parts = answer.split(/(license|licensing)/gi);
        return parts.map((part, index) => {
            if (part.toLowerCase() === 'license' || part.toLowerCase() === 'licensing') {
                return (
                    
                        key={index}
                        href="https://pngpoint.com/license"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0077a2] hover:text-[#005a7d] underline font-medium"
                    >
                        {part}
                    </a>
                );
            }
            return <span key={index}>{part}</span>;
        });
    }
    return answer;
};

export default function AnimalFAQ({ categorySlug = 'animals', categoryName = 'Animal' }: AnimalFAQProps) {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    const faqData = categorySlug === 'buildings-and-architecture' ? buildingFaqData : animalFaqData;

    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-8 w-full">
                    {/* Header */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-3 text-center w-full">
                        <h2 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600 max-w-2xl">
                            Find answers to common questions about our {categoryName} PNG images, downloads, and usage
                        </p>
                    </div>

                    {/* FAQ Items - Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 w-full">
                        {faqData.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md h-fit"
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full flex justify-between items-center p-4 md:p-5 text-left hover:bg-gray-50 transition-colors duration-200"
                                    aria-expanded={openId === faq.id}
                                >
                                    <h3 className="text-sm md:text-base font-semibold text-gray-800 pr-4">
                                        {faq.question}
                                    </h3>
                                    <span className="flex-shrink-0 text-[#0077a2]">
                                        {openId === faq.id ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </span>
                                </button>
                                
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        openId === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <div className="p-4 md:p-5 pt-0 md:pt-0 border-t border-gray-100">
                                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                            {renderAnswerWithLink(faq.answer, faq.id, categorySlug)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}