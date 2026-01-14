/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Shield, Download, Lightbulb } from "lucide-react";

export const LicensingDownload = () => {
    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-10 w-full">
                    {/* Header */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-4 text-center w-full">
                        <h2 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                            Licensing & Download Information
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600 max-w-4xl">
                            Simple, transparent terms that keep your projects safe and hassle-free
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
                        {/* Licensing & Usage Rights */}
                        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <Shield className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 leading-tight pt-3">
                                    Licensing & Usage Rights
                                </h3>
                            </div>
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                                We know licensing can be confusing, so we made it simple. All Animal PNG images are royalty-free, and most allow commercial and print use. If an image requires attribution, it&apos;s clearly noted on its page.
                            </p>
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-[#0077a2] p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Lightbulb className="w-5 h-5 text-[#0077a2] flex-shrink-0 mt-0.5" />
                                    <p className="text-sm md:text-base text-gray-700">
                                        <strong className="text-[#0077a2]">Pro tip:</strong> Always double-check the license info before downloading—it keeps your projects safe and worry-free.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Download Options & File Quality */}
                        <div className="bg-white rounded-xl p-6 lg:p-8 shadow-md border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#0077a2] to-[#005a7d] rounded-lg flex items-center justify-center">
                                    <Download className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 leading-tight pt-3">
                                    Download Options & File Quality
                                </h3>
                            </div>
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                                Whether you need one image or an entire set, downloading is easy. Choose free Animal PNG downloads, HD/high-resolution files, or transparent background PNGs depending on your project.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                    <span className="text-sm md:text-base text-gray-700">Single images or bulk downloads available</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                    <span className="text-sm md:text-base text-gray-700">Multiple resolution options for different needs</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="flex-shrink-0 w-2 h-2 bg-[#0077a2] rounded-full mt-2"></span>
                                    <span className="text-sm md:text-base text-gray-700">Clean, ready-to-use files that save editing time</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="bg-gradient-to-r from-[#0077a2] to-[#005a7d] rounded-2xl p-8 lg:p-10 text-center shadow-xl">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                            Start Downloading Today
                        </h3>
                        <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-3xl mx-auto">
                            Access our complete Animal PNG library with clear licensing and instant downloads. No hidden fees, no watermarks—just high-quality graphics ready for your projects.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};