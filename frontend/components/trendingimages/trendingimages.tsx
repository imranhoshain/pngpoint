/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import bgShape from "../../public/bg-shape.jpg";
import { Download } from "../download/download";
import { getImageUrl } from "@/config/site";

type TrendingimagesProps = {
    imagesData: any;
};

export const Trendingimages: React.FC<TrendingimagesProps> = ({ imagesData }) => {
    const images = imagesData;

    return (
        <section className="relative top-0 left-0 right-0 py-5 w-full bg-[#FBFAFF]">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                    {/*
                        FIX CLS: Added explicit min-h to prevent layout shift from
                        font loading. Without a reserved height, the heading pushes
                        content down when the web font loads.
                    */}
                    <h2 className="text-xl lg:text-3xl font-bold text-[#0077a2] min-h-[28px] lg:min-h-[36px]">
                        Popular PNG Images Downloaded by Users
                    </h2>
                </div>

                <div className="flex flex-col flex-wrap w-full">
                    {images?.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 w-full mt-5">
                            {images.map((image: any, index: number) => {
                                const imageUrl = getImageUrl(image.slug);

                                // Process keywords for schema
                                let processedKeywords: string[] | undefined = undefined;
                                if (image.keywords) {
                                    if (Array.isArray(image.keywords)) {
                                        processedKeywords = image.keywords
                                            .map((item: any) => item.name || item)
                                            .filter(Boolean);
                                    } else if (typeof image.keywords === "string") {
                                        processedKeywords = image.keywords
                                            .split(",")
                                            .map((k: string) => k.trim())
                                            .filter(Boolean);
                                    }
                                }

                                const imageSchema = {
                                    "@context": "https://schema.org",
                                    "@graph": [
                                        {
                                            "@type": "WebPage",
                                            "@id": imageUrl,
                                            "url": imageUrl,
                                            "name": image.title,
                                            "description": `Download high-quality ${image.description || "image"} PNG with a transparent background, free to use for personal or commercial projects.` || image.title,
                                            "inLanguage": "en",
                                            "primaryImageOfPage": { "@id": `${imageUrl}#image` },
                                        },
                                        {
                                            "@type": "ImageObject",
                                            "@id": `${imageUrl}#image`,
                                            "name": image.title,
                                            "description": `Download high-quality ${image.description || "image"} PNG with a transparent background, free to use for personal or commercial projects.` || image.title,
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

                                /*
                                 * FIX LCP: The first 4 images (above the fold on all screen sizes)
                                 * must load as fast as possible:
                                 *   - fetchpriority="high"  → tells the browser to fetch these first
                                 *   - loading="eager"       → disables lazy-loading for above-fold images
                                 *   - decoding="sync"       → forces synchronous decode so image
                                 *                             appears before next paint
                                 *
                                 * FIX CLS: Every image card uses aspect-square (1:1) enforced by the
                                 * wrapper div so the browser reserves the correct space before the
                                 * image bytes arrive. Without this, the grid row height is 0 until
                                 * the image loads → massive CLS.
                                 *
                                 * We also use explicit width/height on the <img> tag. Even though the
                                 * image is CSS-sized, the browser uses the ratio to calculate
                                 * intrinsic dimensions before the image loads.
                                 */
                                const isAboveFold = index < 4;

                                return (
                                    <div
                                        className="block w-full relative rounded-2xl border border-gray-300 shadow-sm group overflow-hidden"
                                        key={image.id}
                                    >
                                        <script
                                            type="application/ld+json"
                                            dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
                                        />

                                        <Link
                                            className="flex flex-col justify-center items-center w-full z-50 relative overflow-hidden"
                                            href={`/image/${image.slug}/`}
                                        >
                                            {/*
                                             * FIX CLS: aspect-square reserves 1:1 space.
                                             * Change to aspect-[4/5] or similar if your images
                                             * are portrait – the key is picking ONE fixed ratio.
                                             */}
                                            <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden rounded-t-2xl">
                                                {/* Hover background – absolutely positioned, no layout impact */}
                                                <div
                                                    className="rounded-2xl bg-center bg-no-repeat bg-cover opacity-0 absolute inset-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                                                    style={{ backgroundImage: `url(${bgShape.src})` }}
                                                />

                                                {/* FIX LCP + CLS: explicit width/height, fetchpriority, loading */}
                                                <img
                                                    className="w-auto h-auto max-w-full max-h-full object-contain z-10 relative"
                                                    src={image.cloudflare_url}
                                                    alt={image.title}
                                                    title={image.title}
                                                    width={image.width || 352}
                                                    height={image.height || 352}
                                                    loading={isAboveFold ? "eager" : "lazy"}
                                                    decoding={isAboveFold ? "sync" : "async"}
                                                    fetchPriority={isAboveFold ? "high" : "low"}
                                                />
                                            </div>

                                            {image.title && (
                                                <div className="absolute bottom-0 right-0 left-0 w-full px-2.5 py-2.5 text-white/80 text-sm bg-black/80 z-50 rounded-b-2xl translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                                                    <p className="text-sm font-normal text-center line-clamp-3">
                                                        {image.title}
                                                    </p>
                                                </div>
                                            )}
                                        </Link>

                                        <Download imageId={image.cloudflare_id} />
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col flex-wrap justify-center items-center py-5 md:py-10 w-full">
                            <p>No images found</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};