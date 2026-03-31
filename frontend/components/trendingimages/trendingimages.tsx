/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Link from "next/link";
import bgShape from "../../public/bg-shape.jpg";
import { Download } from "../download/download";
import { getImageUrl } from "@/config/site";
import { getCloudflareUrl, getCloudflareSrcSet } from "@/utils/cloudflare";

const USE_CLOUDFLARE_WEBP = true;

type TrendingimagesProps = {
    imagesData: any;
};

export const Trendingimages: React.FC<TrendingimagesProps> = ({ imagesData }) => {
    const images = imagesData;

    return (
        <section className="relative top-0 left-0 right-0 py-5 w-full bg-[#FBFAFF]">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                    <h2 className="text-xl lg:text-3xl font-bold text-[#0077a2] min-h-[28px] lg:min-h-[36px]">
                        Popular PNG Images Downloaded by Users
                    </h2>
                </div>

                <div className="flex flex-col flex-wrap w-full">
                    {images?.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 w-full mt-5">
                            {images.map((image: any, index: number) => {
                                const imageUrl = getImageUrl(image.slug);
                                const isAboveFold = index < 4;
                                /*
                                 * FIX LCP: The very first image (index 0) is the
                                 * primary LCP candidate on all viewports.
                                 *
                                 * fetchPriority breakdown:
                                 *   index 0  → "high"  (LCP element — fetch immediately)
                                 *   index 1–3 → "auto"  (above fold but not LCP)
                                 *   index 4+  → "low"   (below fold — don't compete with LCP)
                                 *
                                 * Previously ALL 4 above-fold images used "high", which
                                 * caused the browser to treat them equally and slowed down
                                 * the actual LCP image.
                                 */
                                const isLCP = index === 0;
                                const fetchPriorityValue: "high" | "auto" | "low" = isLCP
                                    ? "high"
                                    : isAboveFold
                                    ? "auto"
                                    : "low";

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
                                            url: imageUrl,
                                            name: image.title,
                                            description: `Download high-quality ${image.description || "image"} PNG with a transparent background, free to use for personal or commercial projects.`,
                                            inLanguage: "en",
                                            primaryImageOfPage: { "@id": `${imageUrl}#image` },
                                        },
                                        {
                                            "@type": "ImageObject",
                                            "@id": `${imageUrl}#image`,
                                            name: image.title,
                                            description: `Download high-quality ${image.description || "image"} PNG with a transparent background.`,
                                            caption: image.caption || image.title,
                                            contentUrl: image.cloudflare_url,
                                            thumbnailUrl: image.thumbnail_url || image.cloudflare_url,
                                            encodingFormat: "image/png",
                                            width: image.width || 500,
                                            height: image.height || 600,
                                            contentSize: image.file_size
                                                ? `${image.file_size} KB`
                                                : undefined,
                                            keywords: processedKeywords,
                                            creator: {
                                                "@type": "Organization",
                                                name: "PNGPoint",
                                                url: "https://pngpoint.com/",
                                            },
                                            license: "https://pngpoint.com/license",
                                            acquireLicensePage: "https://pngpoint.com/license",
                                            creditText: "PNGPoint",
                                            copyrightNotice: "© PNGPoint",
                                            isAccessibleForFree: true,
                                            datePublished:
                                                image.created_at || new Date().toISOString(),
                                            dateModified:
                                                image.updated_at || new Date().toISOString(),
                                        },
                                    ],
                                };

                                return (
                                    <div
                                        className="block w-full relative rounded-2xl border border-gray-300 shadow-sm group overflow-hidden"
                                        key={image.id}
                                    >
                                        <script
                                            type="application/ld+json"
                                            dangerouslySetInnerHTML={{
                                                __html: JSON.stringify(imageSchema),
                                            }}
                                        />

                                        <Link
                                            className="flex flex-col justify-center items-center w-full z-50 relative overflow-hidden"
                                            href={`/image/${image.slug}/`}
                                        >
                                            {/*
                                             * FIX CLS: aspect-square reserves exact 1:1 space before
                                             * the image loads. No height collapse = zero CLS from grid.
                                             */}
                                            <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden rounded-t-2xl">
                                                <div
                                                    className="rounded-2xl bg-center bg-no-repeat bg-cover opacity-0 absolute inset-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                                                    style={{ backgroundImage: `url(${bgShape.src})` }}
                                                />

                                                <img
                                                    className="w-auto h-auto max-w-full max-h-full object-contain z-10 relative"
                                                    src={
                                                        USE_CLOUDFLARE_WEBP
                                                            ? getCloudflareUrl(
                                                                  image.cloudflare_url,
                                                                  "webp"
                                                              )
                                                            : image.cloudflare_url
                                                    }
                                                    srcSet={
                                                        USE_CLOUDFLARE_WEBP && isAboveFold
                                                            ? getCloudflareSrcSet(
                                                                  image.cloudflare_url
                                                              )
                                                            : undefined
                                                    }
                                                    sizes={
                                                        USE_CLOUDFLARE_WEBP && isAboveFold
                                                            ? "(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                                            : undefined
                                                    }
                                                    alt={image.title}
                                                    title={image.title}
                                                    /*
                                                     * FIX "Image elements do not have explicit width and height":
                                                     * Always provide width + height to avoid layout shifts.
                                                     * The aspect-square container already prevents CLS, but
                                                     * PageSpeed still flags missing attributes as a warning.
                                                     * Using the actual image dimensions (or fallback 352×352)
                                                     * satisfies both PSI and the browser's aspect-ratio hint.
                                                     */
                                                    width={image.width || 352}
                                                    height={image.height || 352}
                                                    loading={isAboveFold ? "eager" : "lazy"}
                                                    decoding={isAboveFold ? "sync" : "async"}
                                                    /*
                                                     * FIX LCP: Give ONLY the first image "high" priority.
                                                     * Marking multiple images as high-priority forces them
                                                     * to compete, effectively making none of them high-priority.
                                                     * index 0 = "high", index 1-3 = "auto", rest = "low"
                                                     */
                                                    fetchPriority={fetchPriorityValue}
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