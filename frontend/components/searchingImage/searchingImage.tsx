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
    image: any;
    pageUrl: string;
    slug: string;
}

export const SingleImages: React.FC<SingleImagesProps> = ({ image, pageUrl, slug }) => {
    const { title, keyword } = useSelector((state: RootState) => state.search);

    const [singleImageData, setSingleImageData] = useState<any>(image);
    const [relatedImages, setRelatedImages] = useState<any>(null);
    const [isLoadingRelated, setIsLoadingRelated] = useState(false);
    const isFirstRender = useRef(true);

    useEffect(() => {
        const fetchSingleImage = async () => {
            try {
                // Build query params dynamically
                const params = new URLSearchParams();
                if (title) params.append("search", title);
                if (keyword) params.append("keyword", keyword);

                const queryString = params.toString();
                const url = `${SERVER_URL}/images/${slug}/${queryString ? `?${queryString}` : ""}`;

                console.log("Fetching:", url);
                setIsLoadingRelated(true);
                const res = await getFetchData(url);
                setSingleImageData(res);
                setRelatedImages(res?.results);
                setIsLoadingRelated(false);
            } catch (error) {
                console.error("Error fetching image:", error);
                setIsLoadingRelated(false);
            }
        };

        if (isFirstRender.current) {
            isFirstRender.current = false;
            // Set initial related images if available
            if (image?.results) {
                setRelatedImages(image.results);
            }
        } else {
            // Only re-fetch when title/keyword changes
            if (title || keyword) fetchSingleImage();
        }
    }, [title, keyword]);

    return (
        <>
            {singleImageData?.image && (
                <div className="grid grid-cols-1 md:grid-cols-[60%_35%] lg:grid-cols-[60%_35%] xl:grid-cols-[57%_40%] gap-5 lg:gap-10">
                    <MainImage image={singleImageData} />
                    <Content image={singleImageData} pageUrl={pageUrl} />
                </div>
            )}
            <div className="block w-full mt-5 md:mt-8">
                {isLoadingRelated ? (
                    <section className="relative top-0 left-0 right-0 py-5 w-full bg-[#FBFAFF]">
                        <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                            <div className="flex flex-col flex-wrap gap-y-5 w-full">
                                <h2 className="text-base md:text-2xl font-semibold text-center uppercase">Loading related images...</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5 basis-full">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="block w-full relative rounded-2xl border border-gray-300 shadow-sm overflow-hidden animate-pulse bg-gray-200 min-h-[200px] sm:min-h-[220px] md:min-h-[250px] lg:min-h-[350px]">
                                            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                ) : (
                    relatedImages && <RelatedImages images={relatedImages} />
                )}
            </div>
        </>
    );
};