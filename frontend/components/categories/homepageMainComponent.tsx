/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MEDIA_URL, SERVER_URL } from "@/utils/api";

export const HomeCategories = () => {
    const [categoriesData, setCategoriesData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${SERVER_URL}/images/categories`)
            .then(res => res.json())
            .then(data => setCategoriesData(data.data || []))
            .catch(err => console.error("Failed to fetch categories:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section className="relative top-0 left-0 right-0 py-5 lg:py-10 w-full bg-white">
                <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                    <p className="text-center py-10">Loading categories...</p>
                </div>
            </section>
        );
    }

    if (categoriesData.length === 0) return null;

    return (
        <section className="relative top-0 left-0 right-0 py-5 lg:py-10 w-full bg-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-5 lg:gap-y-10 w-full">
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <h2 className="text-xl lg:text-3xl font-bold text-[#0077a2]">
                            Browse PNG Categories
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600">
                            Explore our organized collection of PNG images by category
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-5 w-full">
                        {categoriesData.slice(0, 12).map(category => (
                            <Link
                                className="group relative block w-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
                                href={`/categories/${category.slug}`}
                                key={category.id}
                            >
                                <div className="relative w-full aspect-square overflow-hidden">
                                    <Image
                                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                        src={category.icon ? `${MEDIA_URL}${category.icon}` : ""}
                                        alt={category.name}
                                        width={300}
                                        height={300}
                                        title={category.name}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-3">
                                        <h3 className="text-sm md:text-base text-white font-semibold text-center line-clamp-2">
                                            {category.name}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {categoriesData.length > 12 && (
                        <div className="flex justify-center w-full mt-5">
                            <Link
                                href="/categories"
                                className="px-6 py-3 bg-[#0077a2] hover:bg-[#005a7d] text-white font-semibold rounded-lg transition-colors duration-300"
                            >
                                View All Categories
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};