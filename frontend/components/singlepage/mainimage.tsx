/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useState } from "react";
import bgShape from "../../public/bg-shape.jpg";
import { siteConfig, getImageUrl } from "@/config/site";

interface MainImageProps {
    image: any;
}

export const MainImage: React.FC<MainImageProps> = ({ image }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="flex flex-col flex-wrap gap-y-2.5 md:gap-y-5 w-full h-full">
            {/* Main Image Container - Reduced height */}
            <div className="relative rounded-2xl border border-gray-300 cursor-pointer shadow-md group">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ImageObject",
                            name: image?.image?.title,
                            description: image?.image?.description || image?.image?.title,
                            author: {
                                "@type": "Organization",
                                name: siteConfig.siteName,
                                url: siteConfig.url,
                            },
                            contentUrl: image?.image?.cloudflare_url,
                            url: getImageUrl(image?.image?.slug),
                            datePublished: image.created_at,
                            creator: {
                                "@type": "Organization",
                                name: siteConfig.siteName,
                            },
                            acquireLicensePage: siteConfig.licenseUrl,
                            copyrightNotice: siteConfig.copyright,
                            width: image.width || 352,
                            height: image.height || 352,
                            license: siteConfig.licenseUrl,
                            copyrightHolder: {
                                "@type": "Organization",
                                name: siteConfig.siteName,
                            },
                            exifData: image.exifData || [],
                        }),
                    }}
                />
                <div className="flex flex-col flex-wrap justify-center items-center w-full h-full z-50 relative overflow-hidden">
                    {/* Skeleton loader - shows while main image is loading */}
                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-2xl">
                            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl"></div>
                            <div className="absolute text-gray-400 text-sm">Loading image...</div>
                        </div>
                    )}
                    
                    <div className="rounded-2xl bg-center bg-no-repeat bg-cover opacity-0 absolute top-0 right-0 left-0 w-full h-full group-hover:opacity-100 transition-all duration-300 ease-in-out" style={{ backgroundImage: `url(${bgShape.src})` }}></div>
                    
                    <div className={`flex flex-col flex-wrap justify-center items-center p-2.5 z-50 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                        <Image
                            className="w-auto h-auto max-h-[280px] md:max-h-[380px] lg:max-h-[420px]"
                            src={image?.image?.main_url}
                            alt={image?.image?.title}
                            title={image?.image?.title}
                            content={image?.image?.description}
                            width={500}
                            height={600}
                            priority
                            onLoad={() => setIsLoaded(true)}
                        />
                    </div>
                </div>
            </div>

            {/* Description below image */}
            {image?.image?.description && (
                <div className="flex flex-col flex-wrap border border-gray-300 rounded-lg px-3 py-3 w-full bg-white shadow-sm">
                    <p className="text-sm text-gray-700 leading-relaxed">
                        Download high-quality {image?.image?.description} PNG with a transparent background, free to use for personal or commercial projects. Explore more related PNG images below—perfect for design, presentations, social media posts, and more.
                    </p>
                </div>
            )}
        </div>
    );
}