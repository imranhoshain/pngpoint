/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MEDIA_URL, SERVER_URL } from "@/utils/api";
import AnimalFAQ from "@/components/animalFAQ/AnimalFAQ";
import { BrowseAnimalCategories } from "@/components/browseAnimalCategories/BrowseAnimalCategories";
import { FeaturedGalleryPreview } from "@/components/featuredGalleryPreview/FeaturedGalleryPreview";
import { EducationKidsAssets } from "@/components/educationKidsAssets/EducationKidsAssets";
import { BrandingStudioToolkit } from "@/components/brandingStudioToolkit/BrandingStudioToolkit";
import { AboutPngpoint } from "@/components/aboutPngpoint/AboutPngpoint";

export default function SingleCategory() {
    const { slug } = useParams();
    const [category, setCategory] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

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

    // ------------------ Normal UI ------------------
    const sub_categories = category?.data?.sub_categories;
    const isAnimalCategory = slug === 'animals';

    return (
        <>
            <section className="relative top-0 left-0 right-0 py-2.5 lg:py-10 w-full bg-[#FBFAFF]">
                <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                    <div className="flex flex-col flex-wrap gap-y-2.5 lg:gap-y-10 w-full">
                        {/* Header Section */}
                        <div className="flex flex-col flex-wrap items-center justify-center w-full gap-y-3">
                            {isAnimalCategory ? (
                                <>
                                    <h1 className="text-2xl lg:text-4xl font-bold text-center">
                                        Animal PNG Images with Transparent Background
                                    </h1>
                                    <h2 className="text-lg lg:text-l font-semibold text-center text-gray-700">
                                        Free & Royalty-Free Downloads for Design, Education, and Commercial Use
                                    </h2>
                                </>
                            ) : (
                                <h1 className="text-2xl lg:text-4xl font-bold text-center">
                                    All PNG Image {category?.data?.name} - Free Transparent Downloads
                                </h1>
                            )}
                        </div>


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

                        {/* Additional Content for Animals Category */}
                        {isAnimalCategory && (
                            <div className="flex flex-col gap-y-6 w-full max-w-5xl mx-auto">
                                <div className="prose prose-lg max-w-none">
                                    <h2 className="text-lg lg:text-2xl font-semibold text-center text-gray-700">
                                        High-resolution, royalty-free, and ready to use
                                    </h2>
                                    <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                                        Animal PNG images help people save time when they need clean, ready-to-use visuals for design, learning, or business work. If you want transparent animal graphics that work on any background, this page solves that problem fast and clearly. At Pngpoint, we&apos;ve used animal PNGs in web layouts, kids&apos; projects, and branding work, and clean files always make the job easier.
                                    </p>
                                    <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                                        That&apos;s why this collection focuses on high-quality, transparent PNG files with clear usage terms you can trust. Explore the animal PNG library and pick the images that fit your project today.
                                    </p>
                                </div>

                                {/* Why Choose Section */}
                                <div className="bg-white rounded-lg p-6 lg:p-8 shadow-sm border border-gray-200">
                                    <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
                                        Why Choose Our Animal PNG Collection
                                    </h2>
                                    <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-6">
                                        Finding the right animal graphics should feel simple, not slow or confusing. This collection is built for creators who need clean, reusable Animal PNG images that work instantly across projects. Every file focuses on clarity, flexibility, and real-world use.
                                    </p>
                                    
                                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Key Benefits</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                                        <li><strong>Wide coverage:</strong> Wild animals, domestic pets, farm animals, jungle wildlife, zoo animals, aquatic life, and birds</li>
                                        <li><strong>High-quality formats:</strong> Transparent PNG files, HD PNG images, sharp edges, clean cut-outs</li>
                                        <li><strong>Flexible usage:</strong> Websites, branding, print designs, education materials, and kids&apos; projects</li>
                                        <li><strong>Clear licensing:</strong> Simple usage terms explained upfront, no confusion before download</li>
                                    </ul>

                                    <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">What Makes It Reliable</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                                        <li>Thousands of curated animal PNG files</li>
                                        <li>Regular updates with new animals and styles</li>
                                        <li>Consistent licenses across the collection</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Additional Content Sections for Animals */}
                        {isAnimalCategory && (
                            <>
                                {/* Popular Use Cases */}
                                <div className="flex flex-col gap-y-6 w-full max-w-5xl mx-auto mt-8">
                                    <div className="bg-white rounded-lg p-6 lg:p-8 shadow-sm border border-gray-200">
                                        <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
                                            Popular Use Cases
                                        </h2>
                                        <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-6">
                                            Over the years, we&apos;ve noticed one common problem—people spend too much time fixing images instead of using them. That&apos;s where clean animal PNGs make life easier. When the background is already transparent, you can focus on your work, not editing.
                                        </p>

                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">For Designers</h3>
                                                <p className="text-gray-700">
                                                    If you design banners, posters, or brand visuals, animal PNGs save hours. We&apos;ve used them in print layouts and logos where sharp edges and clean transparency really matter. They drop straight into the design and just work.
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">For Education</h3>
                                                <p className="text-gray-700">
                                                    Teachers and parents often need visuals that kids understand fast. Animal PNGs help explain lessons, create worksheets, and build learning slides without confusion. Simple images keep students focused on learning, not clutter.
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">For Web & Media</h3>
                                                <p className="text-gray-700">
                                                    For websites, blogs, and campaigns, animal PNGs add personality without slowing pages down. We&apos;ve seen them boost engagement when used in headers, thumbnails, and featured sections.
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry-Specific</h3>
                                                <p className="text-gray-700">
                                                    Pet bloggers, vet clinics, animal NGOs, zoos, and aquariums use these images to communicate clearly and emotionally. The right visual helps tell the story better than words alone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Licensing & Download Info */}
                                <div className="flex flex-col gap-y-6 w-full max-w-5xl mx-auto">
                                    <div className="bg-white rounded-lg p-6 lg:p-8 shadow-sm border border-gray-200">
                                        <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
                                            Licensing & Usage Rights
                                        </h2>
                                        <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                                            We know licensing can be confusing, so we made it simple. All Animal PNG images are royalty-free, and most allow commercial and print use. If an image requires attribution, it&apos;s clearly noted on its page.
                                        </p>
                                        <div className="bg-amber-50 border-l-4 border-[#0077a2] p-4 rounded">
                                            <p className="text-sm md:text-base text-gray-700">
                                                <strong>Pro tip:</strong> Always double-check the license info before downloading—it keeps your projects safe and worry-free.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-lg p-6 lg:p-8 shadow-sm border border-gray-200">
                                        <h2 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
                                            Download Options & File Quality
                                        </h2>
                                        <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                                            Whether you need one image or an entire set, downloading is easy. Choose free Animal PNG downloads, HD/high-resolution files, or transparent background PNGs depending on your project. You can grab single images or select multiple for a faster workflow. Clean, ready-to-use files help you focus on designing instead of editing.
                                        </p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Additional Sections for Animals Category */}
            {isAnimalCategory && (
                <>
                    <BrowseAnimalCategories />
                    <FeaturedGalleryPreview />
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