/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetCategoriesQuery } from "@/redux/features/categories/categoriesApi";
import { setKeyword } from "@/redux/features/getImages/getImageSlice";
import { RootState } from "@/redux/store";
import { ReactIcons } from "@/utils/reactIcons";
import { getSearchSchema } from "@/utils/searchSchema";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

interface SearchingImageProps {
    categorySlug?: string;
    categoryName?: string;
}

export const SearchingImage: React.FC<SearchingImageProps> = ({ 
    categorySlug, 
    categoryName 
}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [searchValue, setSearchValue] = useState<string>("");
    const title = useSelector((state: RootState) => state.search.title);
    const { IoSearchOutline } = ReactIcons;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchValue(val);
        dispatch(setKeyword(val));
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (searchValue.trim()) {
            const searchSlug = searchValue.trim().replace(/\s+/g, "-").toLowerCase();
            
            // If we're on a category page, include category in search
            if (categorySlug) {
                router.push(`/?keyword=${searchSlug}&category=${categorySlug}`);
            } else {
                router.push(`/?keyword=${searchSlug}`);
            }
        }
    };

    const { data: categoriesData } = useGetCategoriesQuery(undefined, { 
        refetchOnMountOrArgChange: true 
    });

    const category_list = categoriesData?.data;
    const schema = getSearchSchema(title);

    // Dynamic content based on whether we're on a category page
    const getHeading = () => {
        if (categorySlug && categoryName) {
            return `${categoryName} PNG Images with Transparent Background`;
        }
        return "Free PNG Images Download with Transparent Background";
    };

    const getSubheading = () => {
        if (categorySlug && categoryName) {
            return `Free & Royalty-Free Downloads for Design, Education, and Commercial Use`;
        }
        return "Download high-quality, royalty-free PNG images with transparent backgrounds for design, web, branding, and commercial use.";
    };

    const getPlaceholder = () => {
        if (categorySlug && categoryName) {
            return `Search ${categoryName.toLowerCase()} images...`;
        }
        return "Search images...";
    };

    return (
        <section className="relative top-0 left-0 right-0 pb-2.5 md:pb-5 w-full bg-[#0077a2]">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap items-center justify-center gap-y-5 w-full">
                    <h1 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center">
                        {getHeading()}
                    </h1>
                    <h2 className="text-white text-sm md:text-base lg:text-base font-light text-center">
                        {getSubheading()}
                    </h2>
                    <form 
                        onSubmit={handleSearch}
                        className="flex flex-col flex-wrap w-full lg:w-[95%] xl:w-[60%] relative"
                    >
                        <input
                            className="bg-transparent text-white placeholder:text-white text-sm xl:text-base font-normal pl-4 md:pl-5 pr-[12%] md:pr-20 py-3 sm:py-4 border md:border-2 border-white outline-none rounded-full w-full [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
                            type="search"
                            name="search"
                            placeholder={getPlaceholder()}
                            value={searchValue}
                            onChange={handleInputChange}
                        />
                        <button
                            className="absolute right-3 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                            type="submit"
                        >
                            <IoSearchOutline className="text-white text-3xl md:text-4xl font-bold" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}