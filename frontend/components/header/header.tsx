"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/PNGPOINT-White-logo.png";
import { useDispatch } from "react-redux";
import { setCategory, setKeyword, setTitle, setPage } from "@/redux/features/getImages/getImageSlice";

export const Header = () => {
    const dispatch = useDispatch();
    const handleLogo = () => {
        dispatch(setTitle(''));
        dispatch(setCategory(''))
        dispatch(setKeyword(''));
        setPage(1);
    }

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is a PNG image and why is it popular for free downloads?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A PNG image is a high-quality image format that supports transparency. It is popular because designers can place it on any background without extra editing. PNG files also keep sharp edges and clear details."
                }
            },
            {
                "@type": "Question",
                "name": "Where can I legally download free PNG images?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can legally download free PNG images from trusted websites that display clear license information. These platforms explain how images can be used. Always review the license before downloading."
                }
            },
            {
                "@type": "Question",
                "name": "Do free PNGs come with transparent backgrounds?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Many free PNGs include transparent backgrounds, but not all. Transparent PNGs are usually labeled clearly. Always check the preview or file details."
                }
            },
            {
                "@type": "Question",
                "name": "Are free PNGs safe to download?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Free PNGs are safe when downloaded from reputable sources. Trusted websites scan files and provide clear usage terms. Avoid unknown or misleading download pages."
                }
            },
            {
                "@type": "Question",
                "name": "Can I use free PNGs for commercial projects?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Many free PNGs allow commercial use based on their license. This includes websites, ads, and products. Always confirm the license details before use."
                }
            },
            {
                "@type": "Question",
                "name": "Do I need to credit the creator when using a free PNG?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Some free PNGs require attribution, while others do not. The requirement depends on the license. If credit is needed, it is usually mentioned clearly."
                }
            },
            {
                "@type": "Question",
                "name": "What resolution or size should I look for in a free PNG?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Choose a PNG with high resolution for better quality. Large images work best for print and detailed designs. Smaller PNGs are suitable for web use."
                }
            },
            {
                "@type": "Question",
                "name": "Can I edit or modify free PNGs?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "In most cases, free PNGs can be edited. This includes resizing, cropping, and color changes. Any limits are listed in the license terms."
                }
            },
            {
                "@type": "Question",
                "name": "How do I verify the license of a free PNG?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can verify the license by checking the image page. Look for a license section or usage notes. Reading this helps prevent misuse."
                }
            },
            {
                "@type": "Question",
                "name": "Are there free PNG collections with icons and logos?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Many websites offer free PNG collections with icons and logos. These are useful for apps, websites, and presentations. Always check branding and trademark rules."
                }
            },
            {
                "@type": "Question",
                "name": "Can I download multiple PNGs at once?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Some platforms allow bulk or pack downloads. Others only support single-image downloads. This depends on how the site organizes its library."
                }
            },
            {
                "@type": "Question",
                "name": "What about PNGs with backgrounds (non-transparent)?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Not all PNG images are transparent. Some include solid or styled backgrounds. These work well for posters, banners, and social graphics."
                }
            },
            {
                "@type": "Question",
                "name": "How do PNGs compare to SVGs for web design?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "PNGs are image-based and easy to use everywhere. SVGs are vector-based and scale without quality loss. PNGs are better for detailed visuals, while SVGs suit icons and shapes."
                }
            },
            {
                "@type": "Question",
                "name": "Can I use free PNGs in print projects?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Free PNGs can be used in print if the resolution is high enough. Always check DPI and image size. The license must allow print use."
                }
            },
            {
                "@type": "Question",
                "name": "What should I do if I can't find a suitable free PNG image?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Try different keywords or browse related categories. You can also combine multiple PNGs creatively. Custom design tools are another option."
                }
            }
        ]
    };

    return (
        <header className="relative top-0 left-0 right-0 pt-2.5 md:pt-5 pb-1.5 w-full bg-[#0077a2] text-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap justify-center items-center w-full">
                    <script 
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                    />
                    <Link className="block w-fit" href={"/"}>
                        <img
                            className="w-40 md:w-56 h-auto"
                            src="/PNGPOINT-White-logo.webp"
                            alt="pngpoint"
                            onClick={() => handleLogo()}
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}