/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Download } from "@/components/download/download";
import { SERVER_URL } from "@/utils/api";
import { getFetchData } from "@/utils/getFetchData";
import { siteConfig, getImageUrl } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition, useRef } from "react";
import bgShape from "../../../public/bg-shape.jpg";
import Pagination from "@/components/pagination/pagination";
import { Header } from "@/components/header/header";
import Footer from "@/components/footer/footer";

/* ─── Types ─────────────────────────────────────────────── */
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

/* ─── Skeletons ─────────────────────────────────────────── */
const ImageGridSkeleton = () => (
    <section className="relative top-0 left-0 right-0 py-5 w-full bg-[#FBFAFF]">
        <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
            <div className="h-8 lg:h-10 w-96 bg-gray-200 rounded animate-pulse mx-auto mb-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 w-full mt-5">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-full aspect-square rounded-2xl bg-gray-200 animate-pulse" />
                ))}
            </div>
        </div>
    </section>
);

const IntroSkeleton = () => (
    <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full mb-5">
        <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse mx-auto mb-3" />
        <div className="h-4 w-full bg-gray-100 rounded animate-pulse mb-2" />
        <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
    </div>
);

const BottomSEOSkeleton = () => (
    <div className="w-full bg-white py-5 lg:py-10" style={{ minHeight: "400px" }}>
        <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5">
            <div className="h-7 w-64 bg-gray-200 rounded animate-pulse mb-4" />
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-4 w-full bg-gray-100 rounded animate-pulse mb-2" />
            ))}
        </div>
    </div>
);

const FAQSkeleton = () => (
    <div className="w-full bg-gray-50 py-5 lg:py-10" style={{ minHeight: "300px" }}>
        <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5">
            <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-4" />
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 mb-3 bg-white">
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
                </div>
            ))}
        </div>
    </div>
);

/* ─── Sub-components ─────────────────────────────────────── */
const SubCategoryBottomSEO = ({ pageContent }: { pageContent: PageContent }) => (
    <section className="w-full bg-white py-5 lg:py-10">
        <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5">
            <div className="flex flex-col gap-y-4 w-full">
                {pageContent.seo_heading && (
                    <h2 className="text-xl font-bold">{pageContent.seo_heading}</h2>
                )}
                {pageContent.seo_paragraph_1 && (
                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                        {pageContent.seo_paragraph_1}
                    </p>
                )}
                {pageContent.seo_paragraph_2 && (
                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                        {pageContent.seo_paragraph_2}
                    </p>
                )}
                {pageContent.seo_paragraph_3 && (
                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                        {pageContent.seo_paragraph_3}
                    </p>
                )}
                {pageContent.popular_uses_heading &&
                    pageContent.popular_uses &&
                    pageContent.popular_uses.length > 0 && (
                        <div className="mt-2">
                            <h3 className="text-lg font-semibold mb-2">
                                {pageContent.popular_uses_heading}
                            </h3>
                            <ul className="list-disc list-inside space-y-1">
                                {pageContent.popular_uses.map((use, i) => (
                                    <li key={i} className="text-gray-600 text-sm lg:text-base">
                                        {use}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
            </div>
        </div>
    </section>
);

const SubCategoryFAQ = ({
    faqHeading,
    faqs,
}: {
    faqHeading?: string;
    faqs: FAQ[];
}) => (
    <section className="w-full bg-gray-50 py-5 lg:py-10">
        <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5">
            <div className="flex flex-col gap-y-4 w-full">
                <h2 className="text-xl font-bold">
                    {faqHeading || "Frequently Asked Questions (FAQ)"}
                </h2>
                <div className="flex flex-col gap-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
                        >
                            <h4 className="font-semibold text-gray-800 text-sm lg:text-base mb-1">
                                {faq.question}
                            </h4>
                            <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

/* ─── Main component ─────────────────────────────────────── */
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
    const [isPending, startTransition] = useTransition();
    const isFirstRender = useRef(true);

    /* Sync page state when URL changes (browser back/forward) */
    useEffect(() => {
        setCurrentPage(pageFromUrl);
    }, [pageFromUrl]);

    /* Initial + page-change fetch */
    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (isFirstRender.current) {
                setLoading(true);
            }

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
                    startTransition(() => {
                        setSubCategory(data);
                        setPageContent(pageData || null);
                    });
                }
            } catch (err: any) {
                if (isMounted) setError(err.message || "Something went wrong");
            } finally {
                if (isMounted) {
                    setLoading(false);
                    isFirstRender.current = false;
                }
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, [slug, currentPage]);

    /* ── Loading state ── */
    if (loading) {
        return (
            <>
                <Header />
                <div className="flex items-center justify-center h-screen w-full bg-[#FBFAFF]">
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <p className="mt-4 text-xl text-gray-700">Loading...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    /* ── Error state ── */
    if (error) {
        return (
            <>
                <Header />
                <div className="flex items-center justify-center h-screen w-full bg-[#FBFAFF]">
                    <div className="flex flex-col items-center px-4">
                        <svg
                            className="w-16 h-16 text-red-500 mb-4 animate-bounce"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                            />
                        </svg>
                        <h1 className="text-2xl font-bold text-red-600 mb-2">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-center text-gray-700">{error}</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const subCategoryData = subCategory?.results;
    const images = subCategoryData?.images;
    const totalPages = Math.ceil(subCategory?.count / 100);

    const paginationText = pageContent?.pagination_text_template
        ? pageContent.pagination_text_template
            .replace("{page}", String(currentPage))
            .replace("{name}", subCategoryData?.name || "")
        : currentPage > 1
        ? `You're browsing page ${currentPage} of our ${
              subCategoryData?.name || ""
          } PNG collection. Explore more pages to discover additional high-quality transparent images.`
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
        <>
            <Header />

            {/* ── MAIN SECTION ── */}
            <section className="relative top-0 left-0 right-0 py-5 lg:py-10 w-full bg-[#FBFAFF]">
                <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                    <div className="flex flex-col gap-y-5 lg:gap-y-10 w-full">

                        {/* ── TOP INTRO ── */}
                        {isPending ? (
                            <IntroSkeleton />
                        ) : (
                            <div className="flex flex-col w-full gap-y-3">
                                <h1 className="text-2xl font-bold text-center">
                                    {pageContent?.intro_heading ||
                                        `All PNG Image ${subCategoryData?.name}s - Free Transparent Downloads`}
                                </h1>
                                {pageContent?.intro_paragraph_1 && (
                                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                                        {pageContent.intro_paragraph_1}
                                    </p>
                                )}
                                {pageContent?.intro_paragraph_2 && (
                                    <p className="text-gray-600 text-sm lg:text-base leading-relaxed">
                                        {pageContent.intro_paragraph_2}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* ── IMAGE GRID ── */}
                        {isPending ? (
                            <ImageGridSkeleton />
                        ) : (
                            <div className="flex flex-col w-full">
                                {images?.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 w-full mt-5">
                                        {images.map((image: any) => {
                                            const imageUrl = getImageUrl(image.slug);

                                            let processedKeywords: string[] | undefined;
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
                                                        primaryImageOfPage: {
                                                            "@id": `${imageUrl}#image`,
                                                        },
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
                                                    className="block w-full h-full relative rounded-2xl border border-gray-300 shadow-sm group overflow-hidden"
                                                >
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
                                                            style={{
                                                                backgroundImage: `url(${bgShape.src})`,
                                                            }}
                                                        />
                                                        <div className="flex flex-col flex-wrap justify-center items-center z-50">
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
                                                            <div className="absolute bottom-0 right-0 left-0 w-full px-2.5 py-2.5 text-white/80 text-sm bg-black/80 z-50 rounded-b-2xl translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out">
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
                                    <div className="flex justify-center items-center h-[calc(100vh-280px)] w-full">
                                        <p className="text-2xl text-gray-600 font-medium">
                                            No images found...
                                        </p>
                                    </div>
                                )}

                                {/* ── PAGINATION TEXT ── */}
                                {paginationText && (
                                    <p className="text-center text-gray-500 text-sm mt-4">
                                        {paginationText}
                                    </p>
                                )}

                                {/* ── PAGINATION (min-h reserves space to prevent CLS) ── */}
                                <div className="min-h-[52px]">
                                    {totalPages > 1 && (
                                        <div className="flex flex-col flex-wrap justify-center items-center mt-2.5 lg:mt-5 w-full">
                                            <Pagination
                                                totalPages={totalPages}
                                                currentPage={currentPage}
                                                onPageChange={handlePageChange}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── BOTTOM SEO CONTENT ── */}
            {isPending ? (
                <BottomSEOSkeleton />
            ) : (
                pageContent?.seo_heading && (
                    <SubCategoryBottomSEO pageContent={pageContent} />
                )
            )}

            {/* ── FAQ SECTION ── */}
            {isPending ? (
                <FAQSkeleton />
            ) : (
                pageContent?.faqs &&
                pageContent.faqs.length > 0 && (
                    <SubCategoryFAQ
                        faqHeading={pageContent.faq_heading}
                        faqs={pageContent.faqs}
                    />
                )
            )}

            <Footer />
        </>
    );
}