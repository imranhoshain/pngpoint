/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Image as ImageIcon, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MEDIA_URL, SERVER_URL } from "@/utils/api";

interface FeaturedGalleryPreviewProps {
    subCategorySlug?: string;
}

export const FeaturedGalleryPreview = ({ subCategorySlug }: FeaturedGalleryPreviewProps) => {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const showcaseHighlights = [
        "High-Resolution Animal PNG for sharp detail",
        "Transparent Background PNG for clean overlays",
        "Royalty-Free PNG assets with clear usage terms"
    ];

    const smartFilters = [
        "Free Download",
        "Commercial Use",
        "Print Use",
        "Education",
        "Kids Projects",
        "Branding"
    ];

    useEffect(() => {
        if (subCategorySlug) {
            fetchImages(currentPage);
        }
    }, [subCategorySlug, currentPage]);

    const fetchImages = async (page: number) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${SERVER_URL}/images/sub-categories/${subCategorySlug}?page=${page}&limit=20`
            );
            if (!res.ok) throw new Error("Failed to fetch images");
            const data = await res.json();
            
            setImages(data?.results?.images || []);
            setTotalPages(Math.ceil((data?.count || 20) / 20));
        } catch (err: any) {
            console.error("Error fetching images:", err);
            setImages([]);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            // Scroll to top of gallery
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-10 w-full">
                    {/* Header */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <h2 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                            Featured Gallery Preview
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600 max-w-4xl">
                            Get a quick look at our most downloaded Animal PNG images in one place. This preview highlights high-resolution files with transparent backgrounds, ready for real projects. You can spot quality at a glance and download with confidence.
                        </p>
                    </div>

                    {/* Image Gallery */}
                    {subCategorySlug && (
                        <div className="w-full">
                            {loading ? (
                                <div className="flex items-center justify-center py-20">
                                    <div className="w-12 h-12 border-4 border-[#0077a2] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : images.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
                                        {images.map((image: any) => (
                                            <Link
                                                href={`/images/${image.slug}`}
                                                key={image.id}
                                                className="group relative block w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white p-3"
                                            >
                                                <div className="relative w-full aspect-square overflow-hidden rounded">
                                                    <Image
                                                        className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-110"
                                                        src={image.cloudflare_url}
                                                        alt={image.title || "Animal PNG"}
                                                        width={300}
                                                        height={300}
                                                    />
                                                </div>
                                                <h4 className="mt-2 text-sm font-medium text-gray-800 truncate text-center">
                                                    {image.title}
                                                </h4>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex justify-center items-center gap-2 mt-8">
                                            <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>

                                            <div className="flex gap-2">
                                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                                    let pageNum;
                                                    if (totalPages <= 5) {
                                                        pageNum = i + 1;
                                                    } else if (currentPage <= 3) {
                                                        pageNum = i + 1;
                                                    } else if (currentPage >= totalPages - 2) {
                                                        pageNum = totalPages - 4 + i;
                                                    } else {
                                                        pageNum = currentPage - 2 + i;
                                                    }

                                                    return (
                                                        <button
                                                            key={pageNum}
                                                            onClick={() => handlePageChange(pageNum)}
                                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                                                currentPage === pageNum
                                                                    ? "bg-[#0077a2] text-white"
                                                                    : "border border-gray-300 hover:bg-gray-100"
                                                            }`}
                                                        >
                                                            {pageNum}
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <button
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                disabled={currentPage === totalPages}
                                                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-gray-600">No images found</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full">
                        {/* Showcase Highlights */}
                        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border border-gray-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <ImageIcon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                                    Showcase Highlights
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                {showcaseHighlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-[#0077a2] rounded-full flex items-center justify-center mt-0.5">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-sm md:text-base text-gray-700 leading-relaxed">
                                            {highlight}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Smart Filters */}
                        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-lg border border-gray-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                                    Smart Filters
                                </h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {smartFilters.map((filter, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-blue-50 to-white border border-[#0077a2] rounded-lg px-4 py-3 text-center hover:shadow-md transition-shadow duration-300"
                                    >
                                        <span className="text-sm md:text-base font-semibold text-[#0077a2]">
                                            {filter}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Text */}
                    <div className="bg-gradient-to-r from-[#0077a2] to-[#005a7d] rounded-2xl p-6 lg:p-8 text-center">
                        <p className="text-base lg:text-lg text-white font-medium">
                            Use filters to narrow results instantly and find the right PNG without extra clicks.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};