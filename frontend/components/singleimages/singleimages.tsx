/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getFetchData } from "@/utils/getFetchData";
import { SERVER_URL } from "@/utils/api";

import { MainImage } from "../singlepage/mainimage";
import { Content } from "../singlepage/content";
import { RelatedImages } from "../relatedImages/related_images";

interface SingleImagesProps {
    image?: any;
    pageUrl: string;
    slug: string;
}

// Skeleton loader for main image - UPDATED to match new layout
const MainImageSkeleton = () => (
    <div className="w-full animate-pulse">
        {/* Image skeleton - reduced height */}
        <div className="bg-gray-300 rounded-2xl w-full h-[280px] md:h-[380px] lg:h-[420px]"></div>
        {/* Description skeleton below image */}
        <div className="mt-2.5 md:mt-5">
            <div className="h-20 bg-gray-300 rounded-lg w-full"></div>
        </div>
    </div>
);

// Skeleton loader for content sidebar
const ContentSkeleton = () => (
    <div className="w-full animate-pulse space-y-4">
        <div className="h-8 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        <div className="mt-6 space-y-2">
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
    </div>
);

// Skeleton loader for related images
const RelatedImagesSkeleton = () => (
    <section className="relative top-0 left-0 right-0 py-5 w-full bg-[#FBFAFF]">
        <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
            <div className="flex flex-col flex-wrap gap-y-5 w-full">
                <h2 className="text-base md:text-2xl font-semibold text-center uppercase">
                    Related Images
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5 basis-full">
                    {[...Array(8)].map((_, i) => (
                        <div 
                            key={i} 
                            className="block w-full relative rounded-2xl border border-gray-300 shadow-sm overflow-hidden animate-pulse bg-gray-200 min-h-[200px] sm:min-h-[220px] md:min-h-[250px] lg:min-h-[350px]"
                        >
                            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export const SingleImages: React.FC<SingleImagesProps> = ({ image, pageUrl, slug }) => {
    const { title, keyword } = useSelector((state: RootState) => state.search);

    // ALWAYS START WITH LOADING STATE - This ensures skeletons show immediately
    const [singleImageData, setSingleImageData] = useState<any>(null);
    const [relatedImages, setRelatedImages] = useState<any>(null);
    const [isLoadingMain, setIsLoadingMain] = useState(true); // Start as loading
    const [isLoadingRelated, setIsLoadingRelated] = useState(true); // Start as loading
    
    const prevSearchRef = useRef({ title: "", keyword: "" });
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    // Fetch main image data
    const fetchMainImage = async (searchTitle?: string, searchKeyword?: string) => {
        try {
            // Cancel previous request
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            
            abortControllerRef.current = new AbortController();

            const params = new URLSearchParams();
            if (searchTitle) params.append("search", searchTitle);
            if (searchKeyword) params.append("keyword", searchKeyword);

            const queryString = params.toString();
            const url = `${SERVER_URL}/images/${slug}${queryString ? `?${queryString}` : ""}`;

            console.log("Fetching:", url);

            const res = await getFetchData(url, {
                signal: abortControllerRef.current.signal
            });

            setSingleImageData(res);
            setIsLoadingMain(false);
            
            // Set related images if they come with main response
            if (res?.results) {
                setRelatedImages(res.results);
                setIsLoadingRelated(false);
            } else {
                setIsLoadingRelated(false);
            }
        } catch (error: any) {
            if (error.name !== 'AbortError') {
                console.error("Error fetching main image:", error);
                setIsLoadingMain(false);
                setIsLoadingRelated(false);
            }
        }
    };

    // Initial load - runs immediately on mount
    useEffect(() => {
        console.log("Component mounted, starting fetch...");
        
        // If we have initial data from props, use it immediately
        if (image && image.image) {
            console.log("Using initial data from props");
            setSingleImageData(image);
            setIsLoadingMain(false);
            
            if (image.results) {
                setRelatedImages(image.results);
                setIsLoadingRelated(false);
            } else {
                // Still loading related images
                setIsLoadingRelated(true);
            }
        }
        
        // Always fetch fresh data (even if we have initial data)
        // Use setTimeout with 0 to ensure it runs after render
        const timeoutId = setTimeout(() => {
            fetchMainImage(title, keyword);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []); // Only run once on mount

    // Handle search changes with debounce
    useEffect(() => {
        const hasSearchChanged = 
            prevSearchRef.current.title !== title || 
            prevSearchRef.current.keyword !== keyword;

        if (!hasSearchChanged) return;

        prevSearchRef.current = { title: title || "", keyword: keyword || "" };

        if (!title && !keyword) return;

        // Clear existing timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Debounce search by 500ms
        debounceTimerRef.current = setTimeout(() => {
            setIsLoadingMain(true);
            setIsLoadingRelated(true);
            fetchMainImage(title, keyword);
        }, 500);

        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [title, keyword]);

    // RENDER IMMEDIATELY - Always show something, never return null
    return (
        <>
            {/* Main Image Section - ALWAYS visible */}
            <div className="grid grid-cols-1 md:grid-cols-[60%_35%] lg:grid-cols-[60%_35%] xl:grid-cols-[57%_40%] gap-5 lg:gap-10">
                {isLoadingMain ? (
                    <>
                        <MainImageSkeleton />
                        <ContentSkeleton />
                    </>
                ) : singleImageData?.image ? (
                    <>
                        <MainImage image={singleImageData} />
                        <Content image={singleImageData} pageUrl={pageUrl} />
                    </>
                ) : (
                    <div className="col-span-full text-center py-10">
                        <p className="text-gray-500 text-lg">Image not found</p>
                    </div>
                )}
            </div>

            {/* Related Images Section - ALWAYS visible */}
            <div className="block w-full mt-5 md:mt-8">
                {isLoadingRelated ? (
                    <RelatedImagesSkeleton />
                ) : relatedImages && relatedImages.length > 0 ? (
                    <RelatedImages images={relatedImages} />
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No related images found</p>
                    </div>
                )}
            </div>
        </>
    );
};