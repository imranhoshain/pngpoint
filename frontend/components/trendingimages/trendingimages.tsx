/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import Image from "next/image";
import bgShape from "../../public/bg-shape.jpg";
import { Download } from "../download/download";
import { siteConfig, getImageUrl } from "@/config/site";

type TrendingimagesProps = {
    imagesData: any;
};

export const Trendingimages: React.FC<TrendingimagesProps> = ({ imagesData }) => {
    const images = imagesData;
    
    return (
        <section className="relative top-0 left-0 right-0 py-5 w-full bg-[#FBFAFF]">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                    <h2 className="text-xl lg:text-3xl font-bold text-[#0077a2]">Popular PNG Images Downloaded by Users</h2>
                </div>
                <div className="flex flex-col flex-wrap w-full">
                    <>
                        {images?.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 w-full mt-5">
                                {images && images.map((image: any) => {
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
                                                "width": image.width || 500,
                                                "height": image.height || 600,
                                                "contentSize": image.file_size ? `${image.file_size} KB` : undefined,
                                                "keywords": processedKeywords,
                                                "creator": {
                                                    "@type": "Organization",
                                                    "name": "PNGPoint",
                                                    "url": "https://pngpoint.com/",
                                                },
                                                "license": "https://pngpoint.com/license",
                                                "acquireLicensePage": "https://pngpoint.com/license",
                                                "creditText": "PNGPoint",
                                                "copyrightNotice": "© PNGPoint",
                                                "isAccessibleForFree": true,
                                                "datePublished": image.created_at || new Date().toISOString(),
                                                "dateModified": image.updated_at || new Date().toISOString(),
                                            },
                                        ],
                                    };
                                    
                                    return (
                                        <div className="block w-full h-full relative rounded-2xl border border-gray-300 shadow-sm group overflow-hidden" key={image.id}>
                                            <script
                                                type="application/ld+json"
                                                dangerouslySetInnerHTML={{
                                                    __html: JSON.stringify(imageSchema),
                                                }}
                                            />
                                            <Link
                                                className="flex flex-col flex-wrap justify-center items-center w-full min-h-[200px] sm:min-h-[220px] md:min-h-[250px] lg:min-h-[350px] h-full z-50 relative overflow-hidden"
                                                href={`/image/${image.slug}/`}
                                            >
                                                <div
                                                    className="rounded-2xl bg-center bg-no-repeat bg-cover opacity-0 absolute top-0 right-0 left-0 w-full h-full group-hover:opacity-100 transition-all duration-300 ease-in-out"
                                                    style={{ backgroundImage: `url(${bgShape.src})` }}
                                                ></div>
                                                <div className="flex flex-col flex-wrap justify-center items-center z-50">
                                                    <img
                                                        className="w-auto h-auto object-fill"
                                                        src={image.cloudflare_url}
                                                        alt={image.title}
                                                        title={image.title}
                                                        content={image.description}
                                                        width={352}
                                                        height={352}
                                                    />
                                                </div>
                                                {image.title && (
                                                    <div
                                                        className="absolute bottom-0 right-0 left-0 w-full px-2.5 py-2.5 text-white/80 text-sm bg-black/80 z-50 rounded-b-2xl translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out"
                                                    >
                                                        <p className="text-sm font-normal text-center line-clamp-3">{image.title}</p>
                                                    </div>
                                                )}
                                            </Link>
                                            <Download
                                                imageId={image.cloudflare_id}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col flex-wrap justify-center items-center py-5 md:py-10 w-full">
                                <p>No images found</p>
                            </div>
                        )}
                    </>
                </div>
            </div>
        </section>
    );
}