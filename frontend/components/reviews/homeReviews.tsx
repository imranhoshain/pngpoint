/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

interface Review {
    id: number;
    name: string;
    role: string;
    avatar: string;
    rating: number;
    review: string;
    date: string;
}

const reviewsData: Review[] = [
    {
        id: 1,
        name: "Daniel Morris",
        role: "Graphic Designer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        rating: 5,
        review: "PNGPoint is a reliable platform for good royalty-free PNG images with transparent backgrounds. I use it regularly for web and design projects. The images are clean, organized, and easy to download. Licensing is clear, which builds trust. PNGPoint saves time and helps create professional visuals quickly for the Creative Design Team.",
        date: "2 weeks ago"
    },
    {
        id: 2,
        name: "Daniel Cooper",
        role: "Web Developer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        rating: 5,
        review: "PNG Point is my go-to platform for clean, transparent free PNG images for professional design work. The quality is impressive, and licenses are clear. I save valuable time on every project. Search is fast, downloads are smooth, and usage feels reliable. Perfect for web design, branding, marketing, and commercial visuals used by creative teams day ok.",
        date: "1 month ago"
    },
    {
        id: 3,
        name: "Sarah Mitchell",
        role: "Marketing Manager",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        rating: 5,
        review: "PNGPoint makes finding high-quality transparent PNG images simple and stress-free. I regularly use it for web design and marketing visuals. The images load fast, look professional, and work perfectly in commercial projects. Clear licensing and easy search make PNGPoint a dependable resource for designers and content creators worldwide.",
        date: "3 weeks ago"
    }
];

export const HomeReviews = () => {
    const [selectedReview, setSelectedReview] = useState<Review>(reviewsData[0]);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-5 h-5 ${
                    index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
            />
        ));
    };

    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-white">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-8 w-full">
                    {/* Header */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-3 text-center w-full">
                        <h2 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                            What Our Users Say
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600 max-w-2xl">
                            Trusted by designers, developers, and creators worldwide
                        </p>
                    </div>

                    {/* Reviews Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 w-full">
                        {/* Left Side - People List */}
                        <div className="lg:col-span-4 flex flex-col gap-4">
                            {reviewsData.map((review) => (
                                <button
                                    key={review.id}
                                    onClick={() => setSelectedReview(review)}
                                    className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                                        selectedReview.id === review.id
                                            ? "border-[#0077a2] bg-blue-50 shadow-md"
                                            : "border-gray-200 bg-white hover:border-[#0077a2] hover:shadow-sm"
                                    }`}
                                >
                                    <div className="relative w-16 h-16 flex-shrink-0">
                                        <Image
                                            src={review.avatar}
                                            alt={review.name}
                                            width={64}
                                            height={64}
                                            className="rounded-full object-cover ring-2 ring-gray-200"
                                        />
                                        {selectedReview.id === review.id && (
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0077a2] rounded-full flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base md:text-lg font-semibold text-gray-800 truncate">
                                            {review.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 truncate">{review.role}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Right Side - Selected Review */}
                        <div className="lg:col-span-8 bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 md:p-8 shadow-lg border border-gray-200 relative overflow-hidden">
                            {/* Quote Icon */}
                            <div className="absolute top-4 right-4 opacity-10">
                                <Quote className="w-24 h-24 text-[#0077a2]" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex flex-col gap-6">
                                {/* User Info */}
                                <div className="flex items-center gap-4">
                                    <div className="relative w-20 h-20 flex-shrink-0">
                                        <Image
                                            src={selectedReview.avatar}
                                            alt={selectedReview.name}
                                            width={80}
                                            height={80}
                                            className="rounded-full object-cover ring-4 ring-white shadow-md"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                                            {selectedReview.name}
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-600">
                                            {selectedReview.role}
                                        </p>
                                        <div className="flex items-center gap-1 mt-2">
                                            {renderStars(selectedReview.rating)}
                                        </div>
                                    </div>
                                </div>

                                {/* Review Text */}
                                <div className="bg-white rounded-lg p-6 shadow-sm">
                                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                        "{selectedReview.review}"
                                    </p>
                                </div>

                                {/* Date */}
                                <div className="flex justify-end">
                                    <span className="text-sm text-gray-500 italic">
                                        Reviewed {selectedReview.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg text-center border border-gray-200">
                            <div className="text-3xl md:text-4xl font-bold text-[#0077a2]">50K+</div>
                            <div className="text-sm md:text-base text-gray-600 mt-2">Happy Users</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg text-center border border-gray-200">
                            <div className="text-3xl md:text-4xl font-bold text-[#0077a2]">100K+</div>
                            <div className="text-sm md:text-base text-gray-600 mt-2">PNG Images</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg text-center border border-gray-200">
                            <div className="text-3xl md:text-4xl font-bold text-[#0077a2]">4.9</div>
                            <div className="text-sm md:text-base text-gray-600 mt-2">Average Rating</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg text-center border border-gray-200">
                            <div className="text-3xl md:text-4xl font-bold text-[#0077a2]">24/7</div>
                            <div className="text-sm md:text-base text-gray-600 mt-2">Free Access</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};