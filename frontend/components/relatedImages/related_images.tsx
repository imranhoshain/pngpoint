"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import bgShape from "../../public/bg-shape.jpg";
import { Download } from "../download/download";
import { siteConfig, getImageUrl } from "@/config/site";

interface ImagesProps {
    images: any;
}

export const RelatedImages: React.FC<ImagesProps> = ({ images }) => {
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

    const handleRelatedImageClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleImageLoad = (imageId: string) => {
        setLoadedImages(prev => new Set(prev).add(imageId));
    };

    return (
        <section className="relative top-0 left-0 right-0 py-5 w-full bg-[#FBFAFF]">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-5 w-full">
                    <h2 className="text-base md:text-2xl font-semibold text-center uppercase">below are more related png files</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5 basis-full">
                        {images?.map((image: any) => {
                            const isLoaded = loadedImages.has(image.id);
                            const imageUrl = getImageUrl(image.slug);
                            
                            // Process keywords for schema
                            let processedKeywords: string[] | undefined = undefined;
                            if (image.keywords) {
                                if (Array.isArray(image.keywords)) {
                                    processedKeywords = image.keywords
                                        .map((item: any) => item.name || item)
                                        .filter(Boolean);
                                } else if (typeof image.keywords === 'string') {
                                    processedKeywords = image.keywords
                                        .split(",")
                                        .map((k: string) => k.trim())
                                        .filter(Boolean);
                                }
                            }
                            
                            // Create image schema
                            const imageSchema = {
                                "@context": "https://schema.org",
                                "@graph": [
                                    {
                                        "@type": "WebPage",
                                        "@id": imageUrl,
                                        "url": imageUrl,
                                        "name": image.title,
                                        "description": `Download high-quality ${image.description || 'image'} PNG with a transparent background, free to use for personal or commercial projects. Explore more related PNG images below—perfect for design, presentations, social media posts, and more.` || image.title,
                                        "inLanguage": "en",
                                        "primaryImageOfPage": {
                                            "@id": `${imageUrl}#image`,
                                        },
                                    },
                                    {
                                        "@type": "ImageObject",
                                        "@id": `${imageUrl}#image`,
                                        "name": image.title,
                                        "description": `Download high-quality ${image.description || 'image'} PNG with a transparent background, free to use for personal or commercial projects. Explore more related PNG images below—perfect for design, presentations, social media posts, and more.` || image.title,
                                        "caption": image.caption || image.title,
                                        "contentUrl": image.cloudflare_url,
                                        "thumbnailUrl": image.thumbnail_url || image.cloudflare_url,
                                        "encodingFormat": "image/png",
                                        "width": image.width || 352,
                                        "height": image.height || 352,
                                        "contentSize": image.file_size ? `${image.file_size} KB` : undefined,
                                        "keywords": processedKeywords,
                                        "creator": {
                                            "@type": "Organization",
                                            "name": "PNGBay",
                                            "url": "https://pngbay.com/",
                                        },
                                        "license": "https://pngbay.com/license",
                                        "acquireLicensePage": "https://pngbay.com/license",
                                        "creditText": "PNGBay",
                                        "copyrightNotice": "© PNGBay",
                                        "isAccessibleForFree": true,
                                        "datePublished": image.created_at || new Date().toISOString(),
                                        "dateModified": image.updated_at || new Date().toISOString(),
                                    },
                                ],
                            };
                            
                            return (
                                <div className="block w-full h-full relative rounded-2xl border border-gray-300 shadow-sm group" key={image.id} onClick={() => handleRelatedImageClick()}>
                                    <Link
                                        className="flex flex-col flex-wrap justify-center items-center w-full min-h-[200px] sm:min-h-[220px] md:min-h-[250px] lg:min-h-[350px] h-full z-50 relative overflow-hidden"
                                        href={`/image/${image.slug}/`}
                                    >
                                        <script
                                            type="application/ld+json"
                                            dangerouslySetInnerHTML={{
                                                __html: JSON.stringify(imageSchema),
                                            }}
                                        /> 
                                        
                                        {/* Skeleton loader */}
                                        {!isLoaded && (
                                            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl">
                                                <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
                                            </div>
                                        )}
                                        
                                        <div className="rounded-2xl bg-center bg-no-repeat bg-cover opacity-0 absolute top-0 right-0 left-0 w-full h-full group-hover:opacity-100 transition-all duration-300 ease-in-out" style={{ backgroundImage: `url(${bgShape.src})` }}></div>
                                        
                                        <div className={`flex flex-col flex-wrap justify-center items-center z-50 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                                            <Image
                                                className="w-auto h-auto"
                                                src={image.cloudflare_url}
                                                alt={image.title}
                                                title={image.title}
                                                content={image.description}
                                                width={352}
                                                height={352}
                                                loading="lazy"
                                                onLoad={() => handleImageLoad(image.id)}
                                                placeholder="blur"
                                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                                            />
                                        </div>
                                        
                                        <div
                                            className={`absolute bottom-0 right-0 left-0 w-full px-2.5 py-2.5 text-white/80 text-sm bg-black/80 z-50 rounded-b-2xl translate-y-full group-hover:translate-y-0 transition-all duration-400 ease-in-out ${!isLoaded ? 'invisible' : 'visible'}`}
                                        >
                                            <p className="text-sm font-normal text-center line-clamp-3">{image.title}</p>
                                        </div>
                                    </Link>
                                    <Download imageId={image.cloudflare_id} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}