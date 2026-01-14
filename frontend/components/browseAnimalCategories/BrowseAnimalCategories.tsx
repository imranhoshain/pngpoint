/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export const BrowseAnimalCategories = () => {
    const coreTypes = [
        "Wild Animals PNG",
        "Domestic Animals PNG",
        "Pet Animals PNG",
        "Farm Animals PNG",
        "Jungle Animals PNG",
        "Zoo Animals PNG"
    ];

    const natureSpecies = [
        "Aquatic & Sea Animals PNG",
        "Birds PNG Images",
        "Farm Animals PNG",
        "Reptiles PNG",
        "Pets PNG",
        "Amphibians PNG",
        "Insects PNG"
    ];

    const stylesFormats = [
        "Cute Animals PNG",
        "Cartoon Animal PNG",
        "Realistic Animal PNG",
        "Animal Silhouette PNG"
    ];

    const creativeAssets = [
        "Animal Face PNG",
        "Animal Icons PNG",
        "Animal Logo PNG",
        "Animal Illustration PNG",
        "Animal Clipart PNG",
        "Animal Sticker PNG",
        "Animal Vector PNG"
    ];

    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-10 w-full">
                    {/* Header */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <h2 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                            Browse Animal Categories
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600 max-w-4xl">
                            Finding the right Animal PNG should be fast and intuitive. That&apos;s why the collection is organized by animal type, species, and creative style. Each category helps you reach the exact PNG you need without extra searching. Simply click a category and explore a filtered gallery instantly.
                        </p>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full">
                        {/* Core Animal Types */}
                        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 lg:p-8 shadow-md border border-gray-200">
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-5">
                                Core Animal Types
                            </h3>
                            <ul className="space-y-3">
                                {coreTypes.map((type, index) => (
                                    <li key={index} className="flex items-center text-sm md:text-base text-gray-700">
                                        <span className="w-2 h-2 bg-[#0077a2] rounded-full mr-3"></span>
                                        {type}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Nature & Species */}
                        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 lg:p-8 shadow-md border border-gray-200">
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-5">
                                Nature & Species
                            </h3>
                            <ul className="space-y-3">
                                {natureSpecies.map((species, index) => (
                                    <li key={index} className="flex items-center text-sm md:text-base text-gray-700">
                                        <span className="w-2 h-2 bg-[#0077a2] rounded-full mr-3"></span>
                                        {species}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Styles & Formats */}
                        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 lg:p-8 shadow-md border border-gray-200">
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-5">
                                Styles & Formats
                            </h3>
                            <ul className="space-y-3">
                                {stylesFormats.map((style, index) => (
                                    <li key={index} className="flex items-center text-sm md:text-base text-gray-700">
                                        <span className="w-2 h-2 bg-[#0077a2] rounded-full mr-3"></span>
                                        {style}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Creative Assets */}
                        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 lg:p-8 shadow-md border border-gray-200">
                            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-5">
                                Creative Assets
                            </h3>
                            <ul className="space-y-3">
                                {creativeAssets.map((asset, index) => (
                                    <li key={index} className="flex items-center text-sm md:text-base text-gray-700">
                                        <span className="w-2 h-2 bg-[#0077a2] rounded-full mr-3"></span>
                                        {asset}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Footer Text */}
                    <div className="text-center">
                        <p className="text-base lg:text-lg text-gray-700">
                            Each category opens a focused gallery, making downloads quick and stress-free.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};