/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MEDIA_URL, SERVER_URL } from "@/utils/api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setKeyword } from "@/redux/features/getImages/getImageSlice";
import { ReactIcons } from "@/utils/reactIcons";
import AnimalFAQ from "@/components/animalFAQ/AnimalFAQ";
import { IntroductionContent } from "@/components/introductionContent/IntroductionContent";
import { PopularUseCases } from "@/components/popularUseCases/PopularUseCases";
import { LicensingDownload } from "@/components/licensingDownload/LicensingDownload";
import { BrowseAnimalCategories } from "@/components/browseAnimalCategories/BrowseAnimalCategories";
import { EducationKidsAssets } from "@/components/educationKidsAssets/EducationKidsAssets";
import { BrandingStudioToolkit } from "@/components/brandingStudioToolkit/BrandingStudioToolkit";
import { AboutPngpoint } from "@/components/aboutPngpoint/AboutPngpoint";
import { ImageIcon, Check } from "lucide-react";

export default function SingleCategory() {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState<string>("");
    const [category, setCategory] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const { IoSearchOutline } = ReactIcons;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchValue(val);
        dispatch(setKeyword(val));
    };

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await fetch(`${SERVER_URL}/images/categories/${slug}`, {
                    next: {revalidate: 180}
                });
                if (!res.ok) throw new Error("Failed to fetch category");
                const data = await res.json();
                setCategory(data);
            } catch (err: any) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, [slug]);

    // ------------------ Loading State ------------------
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-[#FBFAFF]">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-xl text-gray-700">Loading...</p>
                </div>
            </div>
        );
    }

    // ------------------ Error State ------------------
    if (error) {
        return (
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
                    <h1 className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong</h1>
                    <p className="text-center text-gray-700">{error}</p>
                </div>
            </div>
        );
    }

    const sub_categories = category?.data?.sub_categories;
    const isAnimalCategory = slug === 'animals';

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

    return (
        <>
            {/* Search Section */}
            <section className="relative top-0 left-0 right-0 pb-2.5 md:pb-5 w-full bg-[#0077a2]">
                <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                    <div className="flex flex-col flex-wrap items-center justify-center gap-y-5 w-full py-8 lg:py-12">
                        {isAnimalCategory ? (
                            <>
                                <h1 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center">
                                    Animal PNG Images with Transparent Background
                                </h1>
                                <h2 className="text-white text-sm md:text-base lg:text-base font-light text-center">
                                    High-resolution, royalty-free, and ready to use for design, web, branding, and commercial projects.
                                </h2>
                            </>
                        ) : (
                            <>
                                <h1 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center">
                                    {category?.data?.name} PNG Images - Free Transparent Downloads
                                </h1>
                                <h2 className="text-white text-sm md:text-base lg:text-base font-light text-center">
                                    Download high-quality, royalty-free {category?.data?.name} PNG images with transparent backgrounds.
                                </h2>
                            </>
                        )}
                        
                        <div className="flex flex-col flex-wrap w-full lg:w-[95%] xl:w-[60%] relative">
                            <input
                                className="bg-transparent text-white placeholder:text-white text-sm xl:text-base font-normal pl-4 md:pl-5 pr-[12%] md:pr-20 py-3 sm:py-4 border md:border-2 border-white outline-none rounded-full w-full [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
                                type="search"
                                name="search"
                                placeholder="Search images..."
                                value={searchValue}
                                onChange={handleInputChange}
                            />
                            <button
                                className="absolute right-3 sm:right-4 md:right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                                type="button"
                            >
                                <IoSearchOutline className="text-white text-3xl md:text-4xl font-bold" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Gallery Preview with Subcategory Images */}
            {isAnimalCategory && (
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

                            {/* Subcategory Images Grid */}
                            {sub_categories && sub_categories.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 w-full">
                                    {sub_categories.slice(0, 10).map((sub_category: any) => (
                                        <Link
                                            href={`/sub-categories/${sub_category.slug}`}
                                            key={sub_category.id}
                                            className="group relative block w-full overflow-hidden rounded-lg shadow-lg bg-white"
                                        >
                                            <div className="relative w-full h-48 overflow-hidden">
                                                <Image
                                                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                                    src={sub_category.icon ? `${MEDIA_URL}${sub_category.icon}` : ""}
                                                    alt={sub_category.name}
                                                    width={250}
                                                    height={250}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <h4 className="absolute left-1/2 bottom-3 text-sm md:text-base text-white font-semibold transform -translate-x-1/2 text-center w-full px-2">
                                                    {sub_category.name}
                                                </h4>
                                            </div>
                                        </Link>
                                    ))}
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
            )}

            {/* Subcategories Section (for non-animal categories or full list) */}
            <section className="relative top-0 left-0 right-0 py-2.5 lg:py-10 w-full bg-[#FBFAFF]">
                <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                    <div className="flex flex-col flex-wrap gap-y-2.5 lg:gap-y-10 w-full">
                        {/* Subcategories Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
                            {sub_categories?.map((sub_category: any) => (
                                <Link
                                    href={`/sub-categories/${sub_category.slug}`}
                                    key={sub_category.id}
                                    className="group relative block w-full overflow-hidden rounded-lg shadow-lg bg-white py-2.5 px-2.5"
                                >
                                    <div className="relative w-full h-64 md:h-72 overflow-hidden rounded">
                                        <Image
                                            className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                                            src={sub_category.icon ? `${MEDIA_URL}${sub_category.icon}` : ""}
                                            alt={sub_category.name}
                                            width={352}
                                            height={352}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-20 transition-opacity duration-700 ease-in-out group-hover:opacity-40"></div>
                                        <h4 className="absolute left-1/2 bottom-8 text-lg md:text-xl text-white font-semibold transform -translate-x-1/2 text-center">
                                            {sub_category.name}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Sections for Animals Category */}
            {isAnimalCategory && (
                <>
                    <IntroductionContent />
                    <PopularUseCases />
                    <LicensingDownload />
                    <BrowseAnimalCategories />
                    <EducationKidsAssets />
                    <BrandingStudioToolkit />
                    <AboutPngpoint />
                </>
            )}

            {/* FAQ Section for Animals */}
            {isAnimalCategory && <AnimalFAQ />}
        </>
    );
}