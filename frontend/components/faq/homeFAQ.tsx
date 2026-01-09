/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
    id: number;
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        id: 1,
        question: "What are PNG images and why should I use them?",
        answer: "PNG (Portable Network Graphics) images are high-quality image files that support transparent backgrounds. They're perfect for logos, icons, graphics, and designs where you need to layer images without a white or colored background. PNG images maintain their quality without compression artifacts, making them ideal for professional design work."
    },
    {
        id: 2,
        question: "Are all the PNG images free to download?",
        answer: "Yes! All PNG images on our platform are completely free to download and use. You can use them for personal projects, commercial projects, websites, presentations, and more without any cost. However, please check our license terms for specific usage guidelines."
    },
    {
        id: 3,
        question: "Do I need to create an account to download images?",
        answer: "No account is required! You can browse and download any PNG image directly from our website without signing up. Simply find the image you want, click the download button, and it's yours to use."
    },
    {
        id: 4,
        question: "What image formats are available for download?",
        answer: "We primarily offer PNG format for all our images to ensure transparency support and high quality. PNG files work seamlessly with design software like Photoshop, Illustrator, Canva, and can be used directly in web development and presentations."
    },
    {
        id: 5,
        question: "Can I use these images for commercial purposes?",
        answer: "Yes, our PNG images can be used for both personal and commercial projects. You can use them in your business presentations, marketing materials, websites, products, and more. We provide royalty-free images for your convenience."
    },
    {
        id: 6,
        question: "How do I search for specific PNG images?",
        answer: "Use our search bar at the top of the page to find specific images. You can search by keywords, browse by categories, or use our trending tags to discover popular images. Our advanced search helps you find exactly what you need quickly."
    },
    {
        id: 7,
        question: "What if I can't find the image I'm looking for?",
        answer: "If you can't find a specific image, try using different search terms or browse our categories. We regularly update our collection with new PNG images. You can also check our trending section for popular and frequently downloaded images."
    },
    {
        id: 8,
        question: "Are the images high quality and high resolution?",
        answer: "Yes! We ensure all our PNG images are high quality and suitable for professional use. Most images are available in high resolution, perfect for both digital and print projects. You can see the image dimensions before downloading."
    },
    {
        id: 9,
        question: "Can I edit the PNG images after downloading?",
        answer: "Absolutely! You can edit our PNG images using any image editing software like Photoshop, GIMP, Canva, or even online editors. The transparent background makes it easy to integrate them into your designs and modify them as needed."
    },
    {
        id: 10,
        question: "How often do you add new PNG images?",
        answer: "We regularly update our collection with fresh PNG images. New images are added daily across various categories to ensure you always have access to the latest and most trending graphics for your projects."
    },
    {
        id: 11,
        question: "Do you have PNG images for specific industries?",
        answer: "Yes! Our extensive collection includes PNG images for various industries including business, education, healthcare, technology, food, fashion, and more. Browse our categories to find images specific to your industry needs."
    },
    {
        id: 12,
        question: "What's the difference between PNG and JPG?",
        answer: "PNG files support transparency and maintain quality without compression loss, making them ideal for graphics, logos, and designs. JPG files are better for photographs and don't support transparency, but have smaller file sizes. We focus on PNG to give you the most versatile format."
    }
];

export const HomeFAQ = () => {
    const [openId, setOpenId] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="relative top-0 left-0 right-0 py-10 lg:py-16 w-full bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
                <div className="flex flex-col flex-wrap gap-y-8 w-full">
                    {/* Header */}
                    <div className="flex flex-col flex-wrap justify-center items-center gap-y-3 text-center w-full">
                        <h2 className="text-2xl lg:text-4xl font-bold text-[#0077a2]">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-sm md:text-base font-normal text-gray-600 max-w-2xl">
                            Find answers to common questions about our PNG images, downloads, and usage
                        </p>
                    </div>

                    {/* FAQ Items - Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5 w-full">
                        {faqData.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md h-fit"
                            >
                                <button
                                    onClick={() => toggleFAQ(faq.id)}
                                    className="w-full flex justify-between items-center p-4 md:p-5 text-left hover:bg-gray-50 transition-colors duration-200"
                                    aria-expanded={openId === faq.id}
                                >
                                    <h3 className="text-sm md:text-base font-semibold text-gray-800 pr-4">
                                        {faq.question}
                                    </h3>
                                    <span className="flex-shrink-0 text-[#0077a2]">
                                        {openId === faq.id ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </span>
                                </button>
                                
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        openId === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <div className="p-4 md:p-5 pt-0 md:pt-0 border-t border-gray-100">
                                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Section */}
                    <div className="flex flex-col items-center gap-y-3 mt-6 text-center">
                        <p className="text-sm md:text-base text-gray-600">
                            Still have questions?
                        </p>
                        <a
                            href="/contact"
                            className="px-6 py-2.5 bg-[#0077a2] hover:bg-[#005a7d] text-white font-semibold rounded-lg transition-colors duration-300"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};