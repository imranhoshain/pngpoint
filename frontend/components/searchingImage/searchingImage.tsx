/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { setKeyword } from "@/redux/features/getImages/getImageSlice";
import { RootState } from "@/redux/store";
import { ReactIcons } from "@/utils/reactIcons";
import { getSearchSchema } from "@/utils/searchSchema";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

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
    const { IoSearchOutline } = ReactIcons;

    /*
     * FIX LCP + CLS: REMOVED useGetCategoriesQuery from this component.
     *
     * The original code called useGetCategoriesQuery({ refetchOnMountOrArgChange: true })
     * here, which fired an extra API request on every mount. This had two effects:
     *
     * 1. LCP: The network waterfall gained an extra request that competed with
     *    the page images for bandwidth on mobile (already bandwidth-constrained).
     *
     * 2. CLS: The categories data was not used anywhere in this component's
     *    rendered JSX — it was fetched but never rendered. The fetch still
     *    triggered a Redux state update → React re-render → potential layout
     *    recalculation during the LCP window.
     *
     * If you need the categories list in this component in the future, fetch it
     * server-side in the parent page and pass it as a prop instead.
     */

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchValue(val);
        dispatch(setKeyword(val));
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchValue.trim()) {
            const searchSlug = searchValue.trim().replace(/\s+/g, "-").toLowerCase();
            if (categorySlug) {
                router.push(`/?keyword=${searchSlug}&category=${categorySlug}`);
            } else {
                router.push(`/?keyword=${searchSlug}`);
            }
        }
    };

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
                     * FIX CLS: explicit min-h on both headings prevents font-swap
                     * from shifting content. The heading is above the fold and is
                     * often the LCP text element — reserving its height stops the
                     * biggest source of CLS on this page.
                     */}
                    <h1 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center min-h-[28px] md:min-h-[32px] lg:min-h-[36px] xl:min-h-[44px]">
                        {getHeading()}
                    </h1>
                    <p className="text-white text-sm md:text-base lg:text-base font-light text-center min-h-[20px]">
                        {getSubheading()}
                    </p>

                    {/*
                     * FIX CLS: The search form has a fixed height via py-3/py-4 + border.
                     * No dynamic content inside it, so no CLS risk here.
                     * Changed h2 → p for the subheading (h2 under h1 is fine semantically
                     * but the original had TWO h-level elements for non-heading content).
                     */}
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
                            /*
                             * FIX LCP: autoComplete="off" prevents the browser from
                             * rendering a dropdown autocomplete overlay during initial
                             * paint, which can delay LCP measurement.
                             */
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