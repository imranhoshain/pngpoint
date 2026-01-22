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

const businessFaqData: FAQItem[] = [
    {
        id: 1,
        question: "What is a Business PNG image?",
        answer: "A Business PNG is a transparent image used for presentations, websites, marketing, and branding without background issues."
    },
    {
        id: 2,
        question: "Why use PNG for business visuals?",
        answer: "PNG supports transparency and sharp edges, making layouts cleaner and easier to manage."
    },
    {
        id: 3,
        question: "Are Business PNGs free to use?",
        answer: "Some are free, others are premium. Always check license details before use."
    },
    {
        id: 4,
        question: "Can I use Business PNGs commercially?",
        answer: "Yes, many allow commercial use. Look for \"Royalty-Free\" or \"Commercial Use Allowed.\""
    },
    {
        id: 5,
        question: "Do Business PNGs work for presentations?",
        answer: "Yes. They are ideal for pitch decks, reports, and client presentations."
    },
    {
        id: 6,
        question: "Are high-resolution Business PNGs available?",
        answer: "Most files are HD and suitable for both screen and print use."
    },
    {
        id: 7,
        question: "Can I edit Business PNG images?",
        answer: "Yes, resizing and recoloring are usually allowed. Check the license to confirm."
    },
    {
        id: 8,
        question: "What industries use Business PNGs most?",
        answer: "Marketing, finance, startups, education, SaaS, and corporate teams."
    },
    {
        id: 9,
        question: "Are these PNGs good for branding?",
        answer: "Yes. Icons, logos, and illustrations support consistent branding."
    },
    {
        id: 10,
        question: "What does royalty-free mean here?",
        answer: "You can reuse the image across projects without extra fees, within license terms."
    },
    {
        id: 11,
        question: "Can Business PNG images be used for client projects?",
        answer: "Yes. Most Business PNG images allow use in client work, including presentations, websites, and marketing materials. Always review the license to confirm client redistribution rules."
    },
    {
        id: 12,
        question: "Are Business PNGs suitable for social media marketing?",
        answer: "Absolutely. Business PNGs work well for social posts, ads, thumbnails, and story graphics because transparent backgrounds blend cleanly with any design layout."
    },
    {
        id: 13,
        question: "Do Business PNG images work for print materials like brochures?",
        answer: "Yes. High-resolution Business PNGs are suitable for brochures, flyers, banners, and reports. Always check that the file is high resolution (preferably 300 dpi) before printing."
    },
    {
        id: 14,
        question: "Can I use Business PNGs in SaaS dashboards or apps?",
        answer: "Yes. Many teams use Business PNG icons and illustrations in dashboards, apps, and UI sections. PNG transparency makes them easy to integrate without visual conflicts."
    },
    {
        id: 15,
        question: "How do I choose the right Business PNG for my project?",
        answer: "Start by defining your use case—presentation, website, branding, or education. Then filter by style, resolution, and license to ensure the PNG fits both design and legal needs."
    }
];

const cultureReligionFaqData: FAQItem[] = [
    {
        id: 1,
        question: "What is a Culture and Religion PNG image?",
        answer: "A Culture and Religion PNG is a transparent image representing cultural traditions, religious symbols, or spiritual concepts, designed for easy use in digital and print projects."
    },
    {
        id: 2,
        question: "Why use PNG for cultural and religious visuals?",
        answer: "PNG supports transparency and great detail, making it ideal for overlays, presentations, and respectful visual storytelling."
    },
    {
        id: 3,
        question: "Are Culture and Religion PNGs free to use?",
        answer: "Some assets are free, while others may be premium. Always check the license details listed on each file."
    },
    {
        id: 4,
        question: "Can I use these PNGs for commercial projects?",
        answer: "Many PNGs allow commercial use, including branding and media. Confirm license terms before publishing."
    },
    {
        id: 5,
        question: "Do these PNGs have transparent backgrounds?",
        answer: "Yes, most Culture and Religion PNGs include transparent backgrounds for seamless placement."
    },
    {
        id: 6,
        question: "Are these images suitable for education?",
        answer: "Yes. Many are created for educational content, cultural studies, and learning platforms."
    },
    {
        id: 7,
        question: "What resolution should I choose?",
        answer: "For web use, standard HD is sufficient. For print, select high-resolution or 300 dpi files when available."
    },
    {
        id: 8,
        question: "Can I edit or recolor these PNGs?",
        answer: "Editing is usually allowed, but always confirms modification rights in the license terms."
    },
    {
        id: 9,
        question: "Are religious symbols used respectfully?",
        answer: "The collection focuses on culturally accurate and neutral representations suitable for informational and creative use."
    },
    {
        id: 10,
        question: "What does royalty-free mean here?",
        answer: "Royalty-free means you can reuse the image across projects without repeated fees, within license conditions."
    },
    {
        id: 11,
        question: "Can I use Culture and Religion PNGs for presentations or slideshows?",
        answer: "Yes. These PNGs are perfect for educational presentations, lectures, webinars, and community workshops. Transparent backgrounds make them easy to layer over any slide or template."
    },
    {
        id: 12,
        question: "Are these PNGs suitable for social media posts?",
        answer: "Absolutely. Use them for Instagram, Facebook, Pinterest, or Twitter to visually highlight cultural events, religious celebrations, or festivals without extra editing."
    },
    {
        id: 13,
        question: "How can I search for specific religions or festivals?",
        answer: "Use the search bar or category filters like \"Islam PNG,\" \"Diwali PNG,\" or \"Christmas Symbols PNG\" to quickly find the visuals you need."
    },
    {
        id: 14,
        question: "Are the PNGs optimized for both web and print?",
        answer: "Yes. Files come in high-resolution and standard web-friendly sizes, making them suitable for digital media, banners, brochures, and printed educational materials."
    },
    {
        id: 15,
        question: "Can I combine multiple Culture and Religion PNGs into one project?",
        answer: "Yes. PNGs are fully compatible with design software like Photoshop, Illustrator, Canva, and PowerPoint, allowing layering, resizing, and combining while preserving transparency."
    }
];

const drinksFaqData: FAQItem[] = [
    {
        id: 1,
        question: "What is a Drinks PNG image, and why is it useful?",
        answer: "A Drinks PNG is a high-quality raster image with a transparent background, ideal for web, print, and marketing designs."
    },
    {
        id: 2,
        question: "Can I use Drinks PNGs for commercial projects?",
        answer: "Yes, many Drinks PNGs allow commercial use. Check each file's license for confirmation."
    },
    {
        id: 3,
        question: "Are Drinks PNGs free to download?",
        answer: "Some are free, while others are premium with extended commercial rights."
    },
    {
        id: 4,
        question: "Can I edit or customize Drinks PNGs?",
        answer: "Yes, you can resize, recolor, or combine PNGs in compatible software."
    },
    {
        id: 5,
        question: "What file formats are available for Drinks PNGs?",
        answer: "Transparent PNGs, HD PNGs, vector versions (SVG), and clipart illustrations."
    },
    {
        id: 6,
        question: "Do you offer drinks PNGs suitable for social media?",
        answer: "Yes, optimized for Instagram, Facebook, Pinterest, and web banners."
    },
    {
        id: 7,
        question: "Can I use Drinks PNGs for educational purposes?",
        answer: "Absolutely, these are perfect for nutrition, health, and beverage-themed educational projects."
    },
    {
        id: 8,
        question: "How do I ensure PNGs display well on web pages?",
        answer: "Use proper resolution: 72–150 dpi for screens, 300 dpi for print. Transparent backgrounds ensure clean overlays."
    },
    {
        id: 9,
        question: "Are there specific drink types like coffee, tea, or cocktails?",
        answer: "Yes, the collection is organized by beverage type and style for easy browsing."
    },
    {
        id: 10,
        question: "Can I download multiple drinks PNGs at once?",
        answer: "Yes, the library allows batch downloads to streamline workflow."
    },
    {
        id: 11,
        question: "Can I use Drinks PNGs for packaging design?",
        answer: "Yes, these PNGs are perfect for product labels, bottles, cartons, and promotional packaging."
    },
    {
        id: 12,
        question: "Are the Drinks PNGs suitable for presentations and slides?",
        answer: "Definitely! Transparent backgrounds and high-resolution make them ideal for PowerPoint, Keynote, or Google Slides."
    },
    {
        id: 13,
        question: "Do you provide seasonal or themed Drinks PNGs?",
        answer: "Yes, you can find holiday drinks, summer beverages, and festive cocktail PNGs in the collection."
    },
    {
        id: 14,
        question: "Can I use Drinks PNGs in mobile apps or games?",
        answer: "Absolutely. All PNGs are optimized for digital use, including apps, games, and interactive media."
    },
    {
        id: 15,
        question: "Are these Drinks PNGs updated regularly?",
        answer: "Yes, the library is continuously updated with new drinks, styles, and trendy beverage graphics."
    }
];

const hobbiesLeisureFaqData: FAQItem[] = [
    {
        id: 1,
        question: "What are Hobbies and Leisure graphic resources?",
        answer: "They are visual assets designed around activities, interests, and free-time themes, used for design, education, and content creation."
    },
    {
        id: 2,
        question: "Are Hobbies and Leisure graphics free to use?",
        answer: "Many assets are free, while others may be premium. Always check the license before use."
    },
    {
        id: 3,
        question: "Can I use these graphics for commercial projects?",
        answer: "Yes, most resources allow commercial use. Verify licensing details on each asset page."
    },
    {
        id: 4,
        question: "What file formats are available?",
        answer: "Common formats include PNG, SVG, vector files, illustrations, and icons."
    },
    {
        id: 5,
        question: "Are these resources suitable for education?",
        answer: "Yes. Many assets are ideal for lessons, worksheets, and learning materials."
    },
    {
        id: 6,
        question: "Can I edit or customize the graphics?",
        answer: "Most licenses allow resizing, recoloring, and basic editing. Check usage terms first."
    },
    {
        id: 7,
        question: "Do these graphics work for social media content?",
        answer: "Absolutely. They are optimized for digital platforms and fast loading."
    },
    {
        id: 8,
        question: "Are there hobby-specific graphics available?",
        answer: "Yes. Categories cover sports, art, music, travel, gaming, and more."
    },
    {
        id: 9,
        question: "What does royalty-free mean here?",
        answer: "You can reuse the asset across projects without repeated fees, within license limits."
    },
    {
        id: 10,
        question: "How do I find the right leisure graphic quickly?",
        answer: "Use category browsing and smart filters to narrow results based on use case."
    },
    {
        id: 11,
        question: "Are Hobbies and Leisure graphics suitable for mobile apps?",
        answer: "Yes. Most graphics are optimized for digital use and work well in mobile apps, dashboards, and interactive platforms. Check resolution and format before use."
    },
    {
        id: 12,
        question: "Can I use these graphics for YouTube thumbnails or video content?",
        answer: "Yes. Many Hobbies and Leisure graphics are ideal for video thumbnails, intros, and overlays. Always confirm the license for commercial video use."
    },
    {
        id: 13,
        question: "Do these resources support both print and digital projects?",
        answer: "Yes. High-resolution and vector files support print materials, while optimized PNG and SVG files work well for web and digital screens."
    },
    {
        id: 14,
        question: "Are the Hobbies and Leisure graphics updated regularly?",
        answer: "The collection is refreshed with new activities, trends, and creative styles to stay relevant for modern design and content needs."
    },
    {
        id: 15,
        question: "How do Hobbies and Leisure graphics improve user engagement?",
        answer: "Visuals related to hobbies and leisure create emotional connection, improve clarity, and keep users engaged longer across websites, learning platforms, and social media."
    }
];

const industryFaqData: FAQItem[] = [
    {
        id: 1,
        question: "What is an Industry PNG image, and why is it useful?",
        answer: "A raster image with transparent backgrounds, perfect for overlays, presentations, websites, or marketing materials without extra editing."
    },
    {
        id: 2,
        question: "Can I use Industry PNGs for commercial purposes?",
        answer: "Yes. Many allow commercial use; always check licensing notes for clarity."
    },
    {
        id: 3,
        question: "Are these PNGs free to download?",
        answer: "Some are free, others premium. Free files may have limited usage; premium packs include broader rights."
    },
    {
        id: 4,
        question: "What types of industry visuals are included?",
        answer: "Factories, machinery, office equipment, energy, transport, logistics, technology, and industrial icons."
    },
    {
        id: 5,
        question: "Are Industry PNGs high-resolution?",
        answer: "Yes, most are HD, suitable for presentations, print, banners, and web use."
    },
    {
        id: 6,
        question: "Can I use these images for corporate training?",
        answer: "Absolutely. Designed for slides, e-learning, and reports with clean visuals."
    },
    {
        id: 7,
        question: "What file formats are available?",
        answer: "Transparent PNG, vector PNG, icons, illustrations, and logos."
    },
    {
        id: 8,
        question: "Can I customize or edit Industry PNGs?",
        answer: "Yes, resize, recolor, or combine in compatible software. License info confirms editing rights."
    },
    {
        id: 9,
        question: "How do I find PNGs for specific sectors?",
        answer: "Use categories or filters like Manufacturing, Technology, Construction, or Logistics."
    },
    {
        id: 10,
        question: "Are these images suitable for marketing campaigns?",
        answer: "Yes. High-quality, clear, and professional PNGs enhance digital and print campaigns."
    },
    {
        id: 11,
        question: "Can I use Industry PNGs for website banners or headers?",
        answer: "Yes. Transparent backgrounds and high-resolution files make them perfect for website visuals, landing pages, and digital campaigns."
    },
    {
        id: 12,
        question: "Are there Industry PNGs for specific tools and machinery?",
        answer: "Absolutely. The collection includes detailed PNGs of industrial tools, machines, equipment, and factory setups for professional use."
    },
    {
        id: 13,
        question: "Can Industry PNGs be used in print materials like brochures and flyers?",
        answer: "Yes. Most files are HD and print-ready, ensuring sharp visuals for marketing brochures, flyers, reports, or posters."
    },
    {
        id: 14,
        question: "Do you provide Industry PNGs in different design styles?",
        answer: "Yes. You can find realistic, flat design, minimalist, and icon-style PNGs tailored for corporate and industrial projects."
    },
    {
        id: 15,
        question: "How can I quickly find the Industry PNGs I need?",
        answer: "Use category filters, sector tags, or style labels to instantly locate the perfect PNGs for manufacturing, technology, construction, energy, or logistics projects."
    }
];

const landscapeFaqData: FAQItem[] = [
    {
        id: 1,
        question: "What is a Landscape PNG image?",
        answer: "A Landscape PNG is a raster image showing scenery with a transparent background, making it easy to place on any design without borders."
    },
    {
        id: 2,
        question: "Why use transparent landscape PNGs?",
        answer: "Transparent backgrounds allow seamless placement on websites, presentations, and print designs without extra editing."
    },
    {
        id: 3,
        question: "Are Landscape PNG images free to use?",
        answer: "Some are free, while others may be premium. Always check the license details on each image page."
    },
    {
        id: 4,
        question: "Can I use Landscape PNGs for commercial projects?",
        answer: "Yes, many allow commercial use. Look for Royalty-Free or Commercial Use Allowed labels."
    },
    {
        id: 5,
        question: "Do you offer high-resolution Landscape PNG images?",
        answer: "Yes. Most files are HD and suitable for both digital and print use."
    },
    {
        id: 6,
        question: "Can I edit Landscape PNG images?",
        answer: "You can resize or combine them in design software, as long as the license allows modifications."
    },
    {
        id: 7,
        question: "Are Landscape PNGs suitable for education?",
        answer: "Yes. They are widely used in presentations, worksheets, and learning platforms."
    },
    {
        id: 8,
        question: "What resolution is best for web or print?",
        answer: "Use 72–150 dpi for screens and 300 dpi for print projects."
    },
    {
        id: 9,
        question: "Do Landscape PNGs work for branding?",
        answer: "Yes. Many brands use them for headers, backgrounds, and campaign visuals."
    },
    {
        id: 10,
        question: "What does royalty-free mean for Landscape PNGs?",
        answer: "Royalty-free means you can reuse the image across multiple projects without paying recurring fees, while following license terms."
    },
    {
        id: 11,
        question: "Can I use Landscape PNG images for social media posts?",
        answer: "Yes. Landscape PNGs work well for social media banners, posts, ads, and stories. The transparent background helps the image blend naturally with text, colors, and layouts on any platform."
    },
    {
        id: 12,
        question: "Are Landscape PNG files optimized for fast website loading?",
        answer: "Most Landscape PNG images are optimized for web use. For best performance, choose the right image size and compress files when allowed by the license to maintain speed without losing quality."
    },
    {
        id: 13,
        question: "Do Landscape PNGs support print projects like posters or brochures?",
        answer: "Yes. Many Landscape PNG images are high-resolution and suitable for print. Always check the image dimensions and aim for 300 dpi when preparing files for posters, brochures, or large-format prints."
    },
    {
        id: 14,
        question: "Can Landscape PNG images be used in presentations or slides?",
        answer: "Absolutely. Landscape PNGs are ideal for presentations because they add visual context without clutter. They work smoothly in PowerPoint, Google Slides, and other presentation tools."
    },
    {
        id: 15,
        question: "How do I choose the right Landscape PNG for my project?",
        answer: "Start by defining your purpose—web, print, education, or branding. Then filter by resolution, style, and license. Preview the PNG on your layout to ensure it fits the mood and message clearly."
    }
];

const lifestyleFaqData: FAQItem[] = [
    {
        id: 1,
        question: "What is a Lifestyle PNG image, and why is it useful?",
        answer: "A Lifestyle PNG is a raster image with a transparent background. Perfect for overlays, social posts, presentations, and branding without a white border."
    },
    {
        id: 2,
        question: "Can I use these Lifestyle PNGs for commercial projects?",
        answer: "Yes, many allow commercial use. Check license terms before using for brands, campaigns, or products."
    },
    {
        id: 3,
        question: "Are Lifestyle PNGs free to download?",
        answer: "Some are free, while others are premium. Licensing details are shown for each file."
    },
    {
        id: 4,
        question: "What file formats are included?",
        answer: "Mostly PNG with transparent backgrounds. Some collections include vector (SVG/AI) for scalable designs."
    },
    {
        id: 5,
        question: "Can I edit or customize Lifestyle PNGs?",
        answer: "Yes. Resize, recolor, or combine them in compatible software, respecting license restrictions."
    },
    {
        id: 6,
        question: "What does transparent background mean in Lifestyle PNGs?",
        answer: "It means only the object or person in the image is visible. You can place it over any color, photo, or design without white borders or backgrounds."
    },
    {
        id: 7,
        question: "Are these Lifestyle PNGs suitable for social media posts?",
        answer: "Yes! They are optimized for web and social media, ensuring fast loading and high-quality display on Instagram, Facebook, Pinterest, and blogs."
    },
    {
        id: 8,
        question: "Can I use Lifestyle PNGs for presentations or educational content?",
        answer: "Absolutely. Teachers, instructors, and online course creators can enhance slides, worksheets, and e-learning materials with engaging visuals."
    },
    {
        id: 9,
        question: "What resolution are Lifestyle PNGs available in?",
        answer: "Most are high-resolution (HD) suitable for web, print, and large displays. You can choose 72–150 dpi for screens and 300 dpi for print projects."
    },
    {
        id: 10,
        question: "Do you offer themed Lifestyle PNG packs?",
        answer: "Yes. Collections are categorized by fitness, wellness, travel, food, hobbies, fashion, and home décor for faster selection and better project organization."
    },
    {
        id: 11,
        question: "Can Lifestyle PNGs be used for commercial branding or marketing?",
        answer: "Yes, many allow commercial use. Always check the license details to ensure compliance for ads, product packaging, or digital campaigns."
    },
    {
        id: 12,
        question: "Are Lifestyle PNGs compatible with design software?",
        answer: "Yes. They work with Photoshop, Illustrator, Canva, Figma, PowerPoint, and most graphic design tools without extra formatting."
    },
    {
        id: 13,
        question: "Can I combine multiple Lifestyle PNGs into one design?",
        answer: "Yes, you can layer or combine images to create custom compositions, collages, or graphics, respecting license restrictions."
    },
    {
        id: 14,
        question: "How do I search for a specific lifestyle PNG quickly?",
        answer: "Use our category filters, keyword search, and style tags such as Travel PNG, Fitness PNG, or Cartoon Lifestyle PNG to find the perfect image instantly."
    },
    {
        id: 15,
        question: "Are Lifestyle PNGs updated regularly?",
        answer: "Yes. Our collection is constantly refreshed with trending lifestyle themes, seasonal graphics, and popular styles to keep your projects modern and engaging."
    }
];

const peopleFaqData: FAQItem[] = [
    {
        id: 1,
        question: "What is a People PNG image, and why is it useful?",
        answer: "A People PNG is a raster image with a transparent background, perfect for overlays, logos, presentations, and social media visuals."
    },
    {
        id: 2,
        question: "What does transparent background mean in People PNGs?",
        answer: "Only the person's shape is visible. You can place it on any background without a white border."
    },
    {
        id: 3,
        question: "Are People PNGs free to download and use?",
        answer: "Some are free, others are premium. Check licensing for usage rights. Free downloads may have restrictions; premium offers full commercial rights."
    },
    {
        id: 4,
        question: "Can I use People PNGs for commercial projects?",
        answer: "Yes. Many allow commercial use for websites, branding, and marketing campaigns. Always verify license terms."
    },
    {
        id: 5,
        question: "What is the difference between PNG, vector, and clipart for people?",
        answer: "PNG: High-quality, transparent, ready-to-use raster images. Vector (AI/SVG): Scalable, best for logos and illustrations. Clipart: Stylized, simplified illustrations."
    },
    {
        id: 6,
        question: "Do you offer high-resolution or HD People PNG images?",
        answer: "Yes. Most PNGs are HD, suitable for print, presentations, and large displays."
    },
    {
        id: 7,
        question: "Can I use People PNGs for kids' educational projects?",
        answer: "Absolutely. Many are safe and easy to understand for worksheets, presentations, and e-learning apps."
    },
    {
        id: 8,
        question: "How do I ensure the PNG looks good on my website or app?",
        answer: "Choose a suitable resolution: 72–150 dpi for screens, 300 dpi for print. Transparent backgrounds ensure seamless integration."
    },
    {
        id: 9,
        question: "What file sizes should I expect for People PNGs?",
        answer: "File sizes vary by dimension and detail. HD PNGs can range from a few hundred KB to several MB."
    },
    {
        id: 10,
        question: "Can I edit or customize People PNGs?",
        answer: "Yes. Resize, recolor, or combine PNGs in compatible software. Check the license for editing permissions."
    },
    {
        id: 11,
        question: "Can I use People PNGs in social media campaigns?",
        answer: "Yes. Transparent people graphics are perfect for Instagram posts, Facebook ads, YouTube thumbnails, and other social media visuals. They add personality and engagement to campaigns."
    },
    {
        id: 12,
        question: "Are there People PNGs in different ethnicities and cultures?",
        answer: "Absolutely. Our collection includes diverse people PNGs representing multiple ethnicities, cultural attire, and lifestyles for authentic, inclusive visuals."
    },
    {
        id: 13,
        question: "Can I use People PNGs for presentation slides?",
        answer: "Yes. High-resolution PNGs with transparent backgrounds integrate seamlessly into PowerPoint, Google Slides, or Keynote, making your presentations visually engaging."
    },
    {
        id: 14,
        question: "Do you provide animated or character-style People PNGs?",
        answer: "Yes. We offer cartoon, illustrated, and stylized character PNGs in addition to realistic images. Perfect for marketing, apps, or educational storytelling."
    },
    {
        id: 15,
        question: "How do I search for specific poses or actions in People PNGs?",
        answer: "Use filters or keywords like working people PNG, running PNG, sitting PNG, or holding object PNG to quickly find the exact pose or activity you need."
    }
];

const plantsFlowersFaqData: FAQItem[] = [
    {
        id: 1,
        question: "What is a Plants & Flowers PNG, and why is it useful?",
        answer: "A Plants & Flowers PNG is a raster image with a transparent background, making it easy to place on any design without a white box or border. These PNGs are perfect for web design, social media posts, educational materials, and creative projects."
    },
    {
        id: 2,
        question: "What does transparent background mean in plant PNGs?",
        answer: "A transparent background means only the plant or flower is visible. You can overlay it on any color, pattern, or image, ensuring seamless integration into your designs."
    },
    {
        id: 3,
        question: "Are these plant PNGs free to download and use?",
        answer: "Many PNGs in our collection are free, while some premium packs include additional designs and commercial rights. Always check the license information before downloading."
    },
    {
        id: 4,
        question: "Can I use Plants & Flowers PNGs for commercial projects?",
        answer: "Yes! Most plant PNGs allow commercial use, including websites, branding, social media, and print designs. Always verify license terms on the specific image page."
    },
    {
        id: 5,
        question: "What is the difference between PNG, vector, and clipart for plants and flowers?",
        answer: "PNG: Raster format, high-quality, transparent, ready-to-use for digital and print. Vector (SVG/AI): Scalable without losing quality, ideal for logos and illustrations. Clipart: Stylized or simplified illustrations, perfect for fun projects and graphics."
    },
    {
        id: 6,
        question: "Do you offer high-resolution plant PNGs?",
        answer: "Yes, most plant and flower PNGs are HD or high-resolution, suitable for banners, posters, websites, and print projects."
    },
    {
        id: 7,
        question: "Can I use plant PNGs for kids' educational projects?",
        answer: "Absolutely! Teachers and parents can use these PNGs for worksheets, slides, apps, or interactive lessons. Visuals are clear and distraction-free."
    },
    {
        id: 8,
        question: "How do I ensure the PNG looks good on my website or app?",
        answer: "Choose the correct resolution: 72–150 dpi for screens, 300 dpi for print. Use images with transparent backgrounds and clean edges for seamless integration."
    },
    {
        id: 9,
        question: "What file sizes should I expect for plant PNGs?",
        answer: "File sizes vary depending on resolution and detail. High-resolution PNGs can range from a few hundred KB to several MB. Optimize for the web if necessary."
    },
    {
        id: 10,
        question: "Can I edit or customize plant PNGs?",
        answer: "Yes, you can resize, recolor, or combine PNGs in compatible software. Some premium packs allow full modification, while free PNGs may have restrictions."
    },
    {
        id: 11,
        question: "Are there plant PNGs specifically for branding or logos?",
        answer: "Yes, the collection includes plant logos, icons, and botanical illustrations designed for branding. Check the license to confirm commercial use."
    },
    {
        id: 12,
        question: "Do you have plant PNGs with transparent backgrounds for print?",
        answer: "Yes, most PNGs are print-ready. For large banners or posters, ensure the PNG has 300 dpi resolution for optimal quality."
    },
    {
        id: 13,
        question: "What does "royalty-free" mean for plant PNGs?",
        answer: "Royalty-free means you can use the image in multiple projects without recurring fees. Always check for attribution or other limitations in the license."
    },
    {
        id: 14,
        question: "How can I find plant PNGs in specific styles (realistic, cartoon, cute)?",
        answer: "Use the category filters or search keywords like "Realistic Plant PNG," "Cartoon Flower PNG," or "Cute Plant PNG." Preview thumbnails before downloading."
    },
    {
        id: 15,
        question: "Can I download plant PNGs for educational platforms or kids' projects?",
        answer: "Yes! Many PNGs are designed for classrooms, apps, worksheets, and learning platforms. Always confirm distribution rights for commercial or public use."
    }
];







const graphicResourcesFaqData: FAQItem[] = [
    {
        id: 1,
        question: "What are graphic resources, and why are they useful?",
        answer: "Graphic resources are ready-made design assets like icons, illustrations, and templates. They save time and improve visual consistency."
    },
    {
        id: 2,
        question: "Are these graphic resources free to use?",
        answer: "Many assets are free, while others may be premium. Licensing details are clearly listed on each resource page."
    },
    {
        id: 3,
        question: "Can I use graphic resources for commercial projects?",
        answer: "Yes, most resources support commercial use. Always verify the license before publishing."
    },
    {
        id: 4,
        question: "What file formats are available?",
        answer: "Common formats include PNG, SVG, AI, and PSD, suitable for both digital and print work."
    },
    {
        id: 5,
        question: "Can I edit or customize the graphics?",
        answer: "Most licenses allow resizing, recoloring, and editing. Premium assets often include full modification rights."
    },
    {
        id: 6,
        question: "Are these assets suitable for print projects?",
        answer: "Yes. Many files are high-resolution and print-ready. Check DPI and format details before use."
    },
    {
        id: 7,
        question: "Can educators use these resources in classrooms?",
        answer: "Absolutely. Many graphics are ideal for educational materials and presentations."
    },
    {
        id: 8,
        question: "How do I choose the right format for my project?",
        answer: "Use PNG for quick visuals, SVG or AI for scalable designs, and PSD for layered editing."
    },
    {
        id: 9,
        question: "Do you offer modern and minimal design styles?",
        answer: "Yes. Collections include flat, minimal, creative, and detailed design styles."
    },
    {
        id: 10,
        question: "What does \"royalty-free\" mean here?",
        answer: "Royalty-free means you can reuse assets across projects without recurring fees, as long as you follow the license terms."
    },
    {
        id: 11,
        question: "Are these graphic resources suitable for mobile apps and UI design?",
        answer: "Yes. Many graphic resources are optimized for mobile interfaces, dashboards, and app layouts. Scalable formats like SVG and vector files ensure clarity across different screen sizes."
    },
    {
        id: 12,
        question: "Do graphic resources affect website loading speed?",
        answer: "Well-optimized graphics help maintain fast loading times. Lightweight SVGs and compressed PNGs improve performance while preserving visual quality."
    },
    {
        id: 13,
        question: "Can I use these graphic resources for social media content?",
        answer: "Absolutely. Graphic resources work well for posts, ads, thumbnails, and stories. Consistent visuals help improve brand recognition across platforms."
    },
    {
        id: 14,
        question: "How often are new graphic resources added?",
        answer: "New assets are added regularly to keep the library aligned with current design trends and modern use cases."
    },
    {
        id: 15,
        question: "Can I bundle multiple graphic resources into one project?",
        answer: "Yes. Royalty-free licensing typically allows combining multiple assets within a single project, as long as license terms are followed."
    }
];

const foodFaqData: FAQItem[] = [
    {
        id: 1,
        question: "What is a Food PNG image?",
        answer: "A Food PNG is an image with a transparent background. It allows easy placement on any design without visible borders."
    },
    {
        id: 2,
        question: "Are Food PNG images free to use?",
        answer: "Some are free, while others may be premium. Always check the license shown on the image page."
    },
    {
        id: 3,
        question: "Can I use Food PNGs for restaurant menus?",
        answer: "Yes. Many Food PNGs support commercial and print use, making them suitable for menus and ads."
    },
    {
        id: 4,
        question: "What resolution should I choose for Food PNGs?",
        answer: "Use lower resolution for web and 300 dpi for print projects like posters or menus."
    },
    {
        id: 5,
        question: "Can I edit or resize Food PNG images?",
        answer: "Yes. Most licenses allow resizing and basic editing. Premium files often allow full customization."
    },
    {
        id: 6,
        question: "What does a transparent background mean in Food PNG images?",
        answer: "A transparent background means only the food item is visible. You can place it on any color, photo, or design without a white box."
    },
    {
        id: 7,
        question: "Are Food PNG images suitable for social media posts?",
        answer: "Yes. Food PNGs work well for Instagram, Facebook, ads, and thumbnails because they look clean and professional on any background."
    },
    {
        id: 8,
        question: "Can Food PNGs be used for food delivery apps or menus?",
        answer: "Many Food PNGs allow commercial use, making them suitable for delivery apps, digital menus, and promotional graphics. Always confirm the license first."
    },
    {
        id: 9,
        question: "What is the difference between Food PNG and Food JPG images?",
        answer: "PNG files support transparent backgrounds, while JPG files do not. PNGs are better for overlays and design flexibility."
    },
    {
        id: 10,
        question: "Are high-resolution Food PNGs good for print materials?",
        answer: "Yes. High-resolution Food PNGs can be used for posters, flyers, packaging, and menus when the file meets print-quality standards."
    },
    {
        id: 11,
        question: "Can I use Food PNG images in presentations or slides?",
        answer: "Absolutely. Food PNGs are ideal for presentations because they blend smoothly into slides without distracting backgrounds."
    },
    {
        id: 12,
        question: "Do Food PNG images affect website loading speed?",
        answer: "Large PNG files can increase load time. For best performance, choose optimized sizes or compress images without losing quality."
    },
    {
        id: 13,
        question: "Are Food PNGs safe for kids' educational content?",
        answer: "Yes. Many Food PNGs are designed for learning materials, food charts, and classroom projects. Check usage rights for educational distribution."
    },
    {
        id: 14,
        question: "Can I recolor or modify Food PNG images?",
        answer: "Most licenses allow basic edits like resizing or recoloring. Premium files usually allow more advanced customization."
    },
    {
        id: 15,
        question: "How do I choose the right Food PNG for branding projects?",
        answer: "Select PNGs with consistent style, clean edges, and clear licensing. Consistent visuals help strengthen brand identity."
    }
];

const renderAnswerWithLink = (answer: string, id: number, categorySlug?: string): React.ReactNode => {
    const shouldApplyLink = 
        (categorySlug === 'animals' && id === 4) || 
        (categorySlug === 'buildings-and-architecture' && id === 6) ||
        (categorySlug === 'business' && (id === 3 || id === 7 || id === 11)) ||
        (categorySlug === 'culture-and-religion' && id === 4) ||
        (categorySlug === 'drinks' && id === 2) ||
        (categorySlug === 'food' && (id === 2 || id === 3 || id === 5 || id === 8)) ||
        (categorySlug === 'graphic-resources' && (id === 2 || id === 3)) ||
        (categorySlug === 'hobbies-and-leisure' && (id === 2 || id === 3)) ||
        (categorySlug === 'industry' && (id === 2 || id === 3)) ||
        (categorySlug === 'landscapes' && (id === 3 || id === 4)) ||
        (categorySlug === 'lifestyle' && (id === 2 || id === 3 || id === 11)) ||
        (categorySlug === 'people' && (id === 3 || id === 4 || id === 10)) ||
        (categorySlug === 'plants-and-flowers' && (id === 3 || id === 4 || id === 11));
    
    if (shouldApplyLink) {
        const parts = answer.split(/(license|licensing)/gi);
        return parts.map((part, index) => {
            if (part.toLowerCase() === 'license' || part.toLowerCase() === 'licensing') {
                return (
                    <a
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

    const faqData = categorySlug === 'buildings-and-architecture' ? buildingFaqData : 
                    categorySlug === 'business' ? businessFaqData :
                    categorySlug === 'culture-and-religion' ? cultureReligionFaqData :
                    categorySlug === 'drinks' ? drinksFaqData :
                    categorySlug === 'food' ? foodFaqData :
                    categorySlug === 'graphic-resources' ? graphicResourcesFaqData :
                    categorySlug === 'hobbies-and-leisure' ? hobbiesLeisureFaqData :
                    categorySlug === 'industry' ? industryFaqData :
                    categorySlug === 'landscapes' ? landscapeFaqData :
                    categorySlug === 'lifestyle' ? lifestyleFaqData :
                    categorySlug === 'people' ? peopleFaqData :
                    categorySlug === 'plants-and-flowers' ? plantsFlowersFaqData :
                    animalFaqData;

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