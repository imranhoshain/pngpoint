/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Download } from "@/components/download/download";
import { SERVER_URL } from "@/utils/api";
import { getFetchData } from "@/utils/getFetchData";
import { siteConfig, getImageUrl } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import bgShape from "../../../public/bg-shape.jpg";
import Pagination from "@/components/pagination/pagination";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FAQ {
    question: string;
    answer: string;
}

interface PageContent {
    meta_title?: string;
    meta_description?: string;
    intro_heading?: string;
    intro_paragraph_1?: string;
    intro_paragraph_2?: string;
    seo_heading?: string;
    seo_paragraph_1?: string;
    seo_paragraph_2?: string;
    seo_paragraph_3?: string;
    popular_uses_heading?: string;
    popular_uses?: string[];
    pagination_text_template?: string;
    faq_heading?: string;
    faqs?: FAQ[];
}

// ─── Skeleton — mirrors homepage ImageGridSkeleton exactly ───────────────────
const PageSkeleton = () => (
    <section className="relative top-0 left-0 right-0 py-5 lg:py-10 w-full bg-[#FBFAFF]">
        <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
            {/* Heading */}
            <div className="flex flex-col items-center gap-y-3 mb-8">
                <div className="h-8 lg:h-10 w-[480px] max-w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-96 max-w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-72 max-w-full bg-gray-200 rounded animate-pulse" />
            </div>
            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="w-full rounded-2xl bg-gray-200 animate-pulse min-h-[200px] sm:min-h-[220px] md:min-h-[250px] lg:min-h-[350px]"
                    />
                ))}
            </div>
        </div>
    </section>
);

// ─── Error state ──────────────────────────────────────────────────────────────
const ErrorState = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center min-h-[60vh] w-full bg-[#FBFAFF]">
        <div className="flex flex-col items-center px-4 text-center">
            <svg
                className="w-14 h-14 text-red-400 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                />
            </svg>
            <h1 className="text-xl font-bold text-red-500 mb-2">Something went wrong</h1>
            <p className="text-gray-500 text-sm">{message}</p>
        </div>
    </div>
);

// ─── FAQ accordion item ───────────────────────────────────────────────────────
const FAQItem = ({ faq, index }: { faq: FAQ; index: number }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-x-4 hover:bg-gray-50 transition-colors duration-200"
            >
                <span className="font-semibold text-gray-800 text-sm lg:text-base leading-snug">
                    {faq.question}
                </span>
                <span
                    className={`shrink-0 w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 text-[#0077a2] transition-transform duration-300 ${
                        open ? "rotate-45" : ""
                    }`}
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                </span>
            </button>
            {open && (
                <div className="px-5 pb-4 text-gray-500 text-sm lg:text-base leading-relaxed border-t border-gray-100">
                    <p className="pt-3">{faq.answer}</p>
                </div>
            )}
        </div>
    );
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function SingleSubCategories() {
    const { slug } = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    const [currentPage, setCurrentPage] = useState<number>(pageFromUrl);
    const [subCategory, setSubCategory] = useState<any>(null);
    const [pageContent, setPageContent] = useState<PageContent | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        setCurrentPage(pageFromUrl);
    }, [pageFromUrl]);

    useEffect(() => {
        let isMounted = true;
        const fetchingData = async () => {
            setLoading(true);
            try {
                const [data, pageData] = await Promise.all([
                    getFetchData(
                        `${SERVER_URL}/images/sub-categories/${slug}/?page=${currentPage}`,
                        { next: { revalidate: 180 } }
                    ),
                    getFetchData(
                        `${SERVER_URL}/images/sub-categories/${slug}/page_data`,
                        { next: { revalidate: 180 } }
                    ).catch(() => null),
                ]);

                if (!data) throw new Error("Failed to fetch sub category");
                if (isMounted) {
                    setSubCategory(data);
                    setPageContent(pageData || null);
                }
            } catch (err: any) {
                if (isMounted) setError(err.message || "Something went wrong");
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchingData();
        return () => {
            isMounted = false;
        };
    }, [slug, currentPage]);

    if (loading) return <PageSkeleton />;
    if (error) return <ErrorState message={error} />;

    const subCategoryData = subCategory?.results;
    const images = subCategoryData?.images;
    const totalPages = Math.ceil(subCategory?.count / 100);

    const paginationText = currentPage > 1
    ? `You're browsing page ${currentPage} of our ${subCategoryData?.name || ""} PNG collection. Explore more pages to discover additional high-quality transparent images.`
    : null;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const params = new URLSearchParams(searchParams.toString());
        if (page === 1) {
            params.delete("page");
        } else {
            params.set("page", String(page));
        }
        router.push(`?${params.toString()}`, { scroll: true });
    };

    return (
        <section className="relative top-0 left-0 right-0 py-5 lg:py-10 w-full bg-[#FBFAFF]">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-8 lg:gap-y-12 w-full">

                    {/* ── TOP INTRO — matches homepage heading style ── */}
                    <div className="flex flex-col items-center text-center gap-y-3 w-full">
                        <h1 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                            {pageContent?.intro_heading ||
                                `All PNG Image ${subCategoryData?.name}s — Free Transparent Downloads`}
                        </h1>
                        {pageContent?.intro_paragraph_1 && (
                            <p className="text-gray-500 text-sm lg:text-base leading-relaxed max-w-2xl">
                                {pageContent.intro_paragraph_1}
                            </p>
                        )}
                        {pageContent?.intro_paragraph_2 && (
                            <p className="text-gray-500 text-sm lg:text-base leading-relaxed max-w-2xl">
                                {pageContent.intro_paragraph_2}
                            </p>
                        )}
                    </div>

                    {/* ── IMAGE GRID — identical to homepage trending grid ── */}
                    <div className="flex flex-col w-full">
                        {images?.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
                                {images.map((image: any) => {
                                    const imageUrl = getImageUrl(image.slug);

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
                                                description: `Download high-quality ${
                                                    image.description || "image"
                                                } PNG with a transparent background, free to use for personal or commercial projects.`,
                                                inLanguage: "en",
                                                primaryImageOfPage: { "@id": `${imageUrl}#image` },
                                            },
                                            {
                                                "@type": "ImageObject",
                                                "@id": `${imageUrl}#image`,
                                                name: image.title,
                                                description: `Download high-quality ${
                                                    image.description || "image"
                                                } PNG with a transparent background.`,
                                                caption: image.caption || image.title,
                                                contentUrl: image.cloudflare_url,
                                                thumbnailUrl:
                                                    image.thumbnail_url || image.cloudflare_url,
                                                encodingFormat: "image/png",
                                                width: image.width || 352,
                                                height: image.height || 352,
                                                contentSize: image.file_size
                                                    ? `${image.file_size} KB`
                                                    : undefined,
                                                keywords: processedKeywords,
                                                creator: {
                                                    "@type": "Organization",
                                                    name: siteConfig.siteName,
                                                    url: siteConfig.url,
                                                },
                                                license: siteConfig.licenseUrl,
                                                acquireLicensePage: siteConfig.licenseUrl,
                                                creditText: siteConfig.siteName,
                                                copyrightNotice: siteConfig.copyright,
                                                isAccessibleForFree: true,
                                                datePublished:
                                                    image.created_at || new Date().toISOString(),
                                                dateModified:
                                                    image.updated_at || new Date().toISOString(),
                                                copyrightHolder: {
                                                    "@type": "Organization",
                                                    name: siteConfig.siteName,
                                                },
                                            },
                                        ],
                                    };

                                    return (
                                        <div
                                            key={image.id}
                                            className="block w-full h-full relative rounded-2xl border border-gray-200 shadow-sm bg-white group overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                        >
                                            <script
                                                type="application/ld+json"
                                                dangerouslySetInnerHTML={{
                                                    __html: JSON.stringify(imageSchema),
                                                }}
                                            />
                                            <Link
                                                className="flex flex-col justify-center items-center w-full min-h-[200px] sm:min-h-[220px] md:min-h-[250px] lg:min-h-[350px] h-full z-50 relative overflow-hidden"
                                                href={`/image/${image.slug}/`}
                                            >
                                                {/* bg-shape hover overlay */}
                                                <div
                                                    className="rounded-2xl bg-center bg-no-repeat bg-cover opacity-0 absolute inset-0 w-full h-full group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
                                                    style={{
                                                        backgroundImage: `url(${bgShape.src})`,
                                                    }}
                                                />
                                                <div className="flex flex-col justify-center items-center z-50">
                                                    <Image
                                                        className="w-auto h-auto object-fill"
                                                        src={image.cloudflare_url}
                                                        alt={image.title}
                                                        title={image.title}
                                                        width={352}
                                                        height={352}
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
                            <div className="flex justify-center items-center min-h-[40vh] w-full">
                                <p className="text-xl text-gray-400 font-medium">
                                    No images found.
                                </p>
                            </div>
                        )}

                        {/* ── PAGINATION TEXT ── */}
                        {paginationText && (
                            <p className="text-center text-gray-400 text-sm mt-5">
                                {paginationText}
                            </p>
                        )}

                        {/* ── PAGINATION — fixed-height wrapper prevents CLS (matches homepage) ── */}
                        <div className="min-h-[52px] flex justify-center items-center mt-2.5 lg:mt-5 w-full">
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>

                    {/* ── BOTTOM SEO CONTENT ── */}
                    {pageContent?.seo_heading && (
                        <div className="flex flex-col gap-y-4 w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:p-8">
                            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
                                {pageContent.seo_heading}
                            </h2>
                            {pageContent.seo_paragraph_1 && (
                                <p className="text-gray-500 text-sm lg:text-base leading-relaxed">
                                    {pageContent.seo_paragraph_1}
                                </p>
                            )}
                            {pageContent.seo_paragraph_2 && (
                                <p className="text-gray-500 text-sm lg:text-base leading-relaxed">
                                    {pageContent.seo_paragraph_2}
                                </p>
                            )}
                            {pageContent.seo_paragraph_3 && (
                                <p className="text-gray-500 text-sm lg:text-base leading-relaxed">
                                    {pageContent.seo_paragraph_3}
                                </p>
                            )}

                            {pageContent.popular_uses_heading &&
                                pageContent.popular_uses &&
                                pageContent.popular_uses.length > 0 && (
                                    <div className="mt-2">
                                        <h3 className="text-lg font-semibold text-gray-700 mb-3">
                                            {pageContent.popular_uses_heading}
                                        </h3>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {pageContent.popular_uses.map((use, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-x-2 text-gray-500 text-sm lg:text-base"
                                                >
                                                    {/* Brand-coloured bullet */}
                                                    <span className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-[#0077a2]" />
                                                    {use}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                        </div>
                    )}

                    {/* ── FAQ SECTION — interactive accordion ── */}
                    {pageContent?.faqs && pageContent.faqs.length > 0 && (
                        <div className="flex flex-col gap-y-4 w-full">
                            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
                                {pageContent.faq_heading || "Frequently Asked Questions (FAQ)"}
                            </h2>
                            <div className="flex flex-col gap-y-3">
                                {pageContent.faqs.map((faq, index) => (
                                    <FAQItem key={index} faq={faq} index={index} />
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}