"use client";

import { ReactIcons } from "@/utils/reactIcons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../public/PNGPOINT-White-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setTitle } from "@/redux/features/getImages/getImageSlice";
import { getSearchSchema } from "@/utils/searchSchema";

interface ImageData {
    pageUrl: string;
    title: string;
    description: string;
    caption: string;
    fileUrl: string;
    thumbnailUrl: string;
    width: number;
    height: number;
    fileSize?: number;
    keywords?: string;
    publishDate: string;
    modifiedDate: string;
    categoryPageUrl?: string;
    categoryName?: string;
}

interface SingleImageHeaderProps {
    imageData?: ImageData | null;
}

export const SingleImageHeader: React.FC<SingleImageHeaderProps> = ({ imageData }) => {
    const { IoSearchOutline } = ReactIcons;
    const dispatch = useDispatch();
    const title = useSelector((state: RootState) => state.search.title);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        dispatch(setTitle(val));
    };
    
    const searchSchema = getSearchSchema(title);
    
    // Image schema
    const imageSchema = imageData
        ? {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebPage",
                    "@id": imageData.pageUrl,
                    "url": imageData.pageUrl,
                    "name": imageData.title,
                    "description": `Download high-quality ${imageData.description || 'image'} PNG with a transparent background, free to use for personal or commercial projects. Explore more related PNG images below—perfect for design, presentations, social media posts, and more.`,
                    "inLanguage": "en",
                    "primaryImageOfPage": {
                        "@id": `${imageData.pageUrl}#image`,
                    },
                },
                {
                    "@type": "ImageObject",
                    "@id": `${imageData.pageUrl}#image`,
                    "name": imageData.title,
                    "description": `Download high-quality ${imageData.description || 'image'} PNG with a transparent background, free to use for personal or commercial projects. Explore more related PNG images below—perfect for design, presentations, social media posts, and more.`,
                    "caption": imageData.caption,
                    "contentUrl": imageData.fileUrl,
                    "thumbnailUrl": imageData.thumbnailUrl,
                    "encodingFormat": "image/png",
                    "width": imageData.width,
                    "height": imageData.height,
                    "contentSize": imageData.fileSize ? `${imageData.fileSize} KB` : undefined,
                    "keywords": imageData.keywords 
                        ? imageData.keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
                        : undefined,
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
                    "datePublished": imageData.publishDate,
                    "dateModified": imageData.modifiedDate,
                },
            ],
        }
        : null;

    return (
        <header className="relative top-0 left-0 right-0 py-1.5 w-full bg-[#0077a2]">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-row flex-wrap justify-between items-center w-full">
                    <Link className="block w-fit" href={"/"}>
                        <Image
                            className="w-32 sm:w-40 md:w-56 h-auto"
                            src={Logo}
                            alt="pngpoint"
                            width={244}
                            height={244}
                            loading="eager"
                            priority
                        />
                    </Link>
                    <div className="flex flex-col flex-wrap items-center relative w-[60%] md:w-[50%]">
                        <input
                            className="bg-transparent text-white placeholder:text-white text-sm md:text-base font-normal pl-4 md:pl-5 pr-20 py-3 md:py-4 border md:border-2 border-white outline-none rounded-full w-full [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
                            type="search"
                            name="search"
                            placeholder="Search images..."
                            value={title}
                            onChange={handleInputChange}
                        />
                        <button className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 cursor-pointer" type="button">
                            <IoSearchOutline className="text-white text-3xl md:text-4xl font-bold" />
                        </button>
                        
                        {/* Search Schema */}
                        {/* <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(searchSchema) }}
                        /> */}
                        
                        {/* Image Schema */}
                        {imageSchema && (
                            <script
                                type="application/ld+json"
                                dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}