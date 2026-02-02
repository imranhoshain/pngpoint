import Footer from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Metadata } from "next";
import { siteConfig, getSiteHostname } from "@/config/site";

export const metadata: Metadata = {
  title: "PNGBay License Agreement",
  description: "Read PNGBay's licensing information to understand how you can use our PNG assets legally and responsibly.",
  alternates: {
    canonical: "https://pngbay.com/license",
  },
};

export default function License() {
    const hostname = getSiteHostname();
    
    return (
        <>
            <Header />
            <section className="relative top-0 left-0 right-0 py-6 lg:py-12 w-full bg-[#FBFAFF]">
                <div className="max-w-screen-lg container mx-auto px-4 lg:px-6 w-full">
                    <div className="bg-white shadow-sm rounded-2xl p-6 lg:p-10">
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                            PNGBay Content License Agreement
                        </h1>
                        <p className="text-gray-700 mb-6">
                            Welcome to <a 
                                href="https://pngbay.com" 
                                className="font-semibold text-[#0077a2] hover:text-[#005a7d] hover:underline transition-colors"
                            >
                                PNGBay (pngbay.com)
                            </a>. This License Agreement explains how you may use the PNG images and other resources available on our website. By downloading or using any content from PNGBay, you agree to the terms below.
                        </p>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                1. Free License Overview
                            </h2>
                            <p className="text-gray-700 mb-2">
                                All PNG images on PNGBay are provided free of charge and can be used for personal and commercial projects without payment or subscription, unless otherwise stated.
                            </p>
                            <p className="text-gray-700">
                                ✔ Free for personal use ✔ Free for commercial use ✔ No attribution required (credit appreciated but optional)
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                2. Permitted Uses
                            </h2>
                            <p className="text-gray-700 mb-2">You are allowed to:</p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>Use PNG images in websites, blogs, apps, and software</li>
                                <li>Use images in graphic design, presentations, posters, and videos</li>
                                <li>Use images for commercial products, marketing, and advertising</li>
                                <li>Edit, resize, recolor, or modify images to suit your project</li>
                                <li>Use images in social media posts and online content</li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                3. Prohibited Uses
                            </h2>
                            <p className="text-gray-700 mb-2">You are NOT allowed to:</p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>Sell, sublicense, or redistribute PNGBay images as standalone files</li>
                                <li>Upload PNGBay images to other stock websites or marketplaces</li>
                                <li>Claim PNGBay images as your own original work</li>
                                <li>Use images in illegal, harmful, or misleading content</li>
                                <li>Use images in logos or trademarks without significant modification</li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                4. Attribution
                            </h2>
                            <p className="text-gray-700 mb-2">
                                Attribution is not required, but we appreciate it.
                            </p>
                            <p className="text-gray-700 font-medium">
                                Optional credit example: Image by PNGBay (pngbay.com)
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                5. Copyright & Ownership
                            </h2>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>
                                    All images are either:
                                    <ul className="list-disc list-inside ml-6 mt-1">
                                        <li>Created by PNGBay contributors, or</li>
                                        <li>Submitted by users, or</li>
                                        <li>Believed to be in the public domain</li>
                                    </ul>
                                </li>
                                <li>PNGBay does not guarantee that all images are free from third-party rights.</li>
                                <li>If you believe an image infringes your copyright, please contact us immediately.</li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                6. DMCA & Copyright Infringement
                            </h2>
                            <p className="text-gray-700 mb-2">
                                PNGBay respects copyright laws. If you are a copyright owner and believe that content on PNGBay violates your rights, please submit a DMCA takedown request including:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-2">
                                <li>Your name and contact information</li>
                                <li>The URL of the infringing content</li>
                                <li>Proof of ownership</li>
                                <li>A statement made under penalty of perjury</li>
                            </ul>
                            <p className="text-gray-700">
                                Contact us at: <a href="mailto:copyright@pngbay.com" className="text-[#0077a2] hover:underline">copyright@pngbay.com</a>
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                7. Disclaimer
                            </h2>
                            <p className="text-gray-700">
                                All images are provided "as is" without warranties of any kind. PNGBay is not responsible for any damages, losses, or legal issues arising from the use of images downloaded from this site.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                8. Changes to This License
                            </h2>
                            <p className="text-gray-700">
                                PNGBay reserves the right to update or modify this License Agreement at any time without prior notice. Continued use of the website constitutes acceptance of the updated terms.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                9. Contact Information
                            </h2>
                            <p className="text-gray-700 mb-2">
                                If you have any questions about this License Agreement, please contact us:
                            </p>
                            <p className="text-gray-700">
                                📧 Email: <a href="mailto:support@pngbay.com" className="text-[#0077a2] hover:underline">support@pngbay.com</a>
                            </p>
                            <p className="text-gray-700">
                                🌐 Website: <a href="https://pngbay.com" className="text-[#0077a2] hover:underline">https://pngbay.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}