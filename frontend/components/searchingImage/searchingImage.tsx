/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { setKeyword } from "@/redux/features/getImages/getImageSlice";
import { RootState } from "@/redux/store";
import { getSearchSchema } from "@/utils/searchSchema";
import { useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";

interface SearchingImageProps {
    categorySlug?: string;
    categoryName?: string;
}

export const SearchingImage: React.FC<SearchingImageProps> = ({
    categorySlug,
    categoryName,
}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [searchValue, setSearchValue] = useState<string>("");
    const title = useSelector((state: RootState) => state.search.title);
/*
     * FIX INP: Debounce the Redux dispatch so it only fires 300ms after the
     * user stops typing. Previously every keystroke dispatched to Redux,
     * which triggered a store update → re-render of all Redux subscribers.
     * On mobile this was contributing to the 341ms INP.
     *
     * setSearchValue still updates immediately (local state, fast) so the
     * input feels responsive. Only the Redux side effect is delayed.
     */
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value;
            // Update local state immediately so the input stays responsive
            setSearchValue(val);

            // Debounce the Redux dispatch to avoid per-keystroke re-renders
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(() => {
                dispatch(setKeyword(val));
            }, 300);
        },
        [dispatch]
    );

    const handleSearch = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            // On explicit submit, cancel the debounce and dispatch immediately
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            if (searchValue.trim()) {
                dispatch(setKeyword(searchValue.trim()));
                const searchSlug = searchValue.trim().replace(/\s+/g, "-").toLowerCase();
                if (categorySlug) {
                    router.push(`/?keyword=${searchSlug}&category=${categorySlug}`);
                } else {
                    router.push(`/?keyword=${searchSlug}`);
                }
            }
        },
        [searchValue, categorySlug, dispatch, router]
    );

    const schema = getSearchSchema(title);

    const getHeading = () => {
        if (categorySlug && categoryName) {
            return `${categoryName} PNG Images with Transparent Background`;
        }
        return "Free PNG Images Download with Transparent Background";
    };

    const getSubheading = () => {
        if (categorySlug && categoryName) {
            return "Free & Royalty-Free Downloads for Design, Education, and Commercial Use";
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
            {schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            )}
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap items-center justify-center gap-y-5 w-full">
                    {/*
                     * FIX CLS: min-h on headings prevents font-swap reflow.
                     * The font-display: swap in layout.tsx means Inter loads
                     * after the fallback font paints. Without reserved height
                     * the metric shift of the fallback → Inter causes CLS.
                     */}
                    <h1 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center min-h-[28px] md:min-h-[32px] lg:min-h-[36px] xl:min-h-[44px]">
                        {getHeading()}
                    </h1>
                    <p className="text-white text-sm md:text-base lg:text-base font-light text-center min-h-[20px]">
                        {getSubheading()}
                    </p>

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
                            autoComplete="off"
                        />
                        <button
                            className="absolute right-3 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                            type="submit"
                            aria-label="Search images"
                        >
                            <IoSearchOutline className="text-white text-3xl md:text-4xl font-bold" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};