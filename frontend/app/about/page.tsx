import Link from "next/link";

export default function About() {
    return (
        <section className="relative top-0 left-0 right-0 py-6 lg:py-12 w-full bg-[#FBFAFF]">
            <div className="max-w-screen-lg container mx-auto px-4 lg:px-6 w-full">
                <div className="bg-white shadow-sm rounded-2xl p-6 lg:p-10">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                        About Us
                    </h1>
                    <p className="text-gray-700 mb-6 text-lg">
                        Welcome to <a 
                            href="https://pngbay.com" 
                            className="font-semibold text-[#0077a2] hover:text-[#005a7d] hover:underline transition-colors"
                        >
                            PNGBay
                        </a> – your trusted source for free HD transparent PNG images.
                    </p>
                    <p className="text-gray-700 mb-6">
                        At pngbay.com, our mission is simple: to make high‑quality PNG images accessible to everyone, without cost, without signup, and without complicated licenses.
                    </p>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            Who We Are
                        </h2>
                        <p className="text-gray-700 mb-3">
                            PNGBay is a free PNG stock platform created for designers, developers, students, marketers, and content creators around the world. We believe great design should be easy, fast, and affordable — and that starts with free, high‑quality visual resources.
                        </p>
                        <p className="text-gray-700">
                            Our growing library includes thousands of transparent PNG images, carefully organized and optimized for quick downloads and real‑world use.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            What We Offer
                        </h2>
                        <p className="text-gray-700 mb-2">
                            On PNGBay, you can download:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-3">
                            <li>Transparent PNG images</li>
                            <li>HD PNG files with no background</li>
                            <li>Logo PNGs</li>
                            <li>Icons & UI elements</li>
                            <li>Animals, objects, symbols, and more</li>
                        </ul>
                        <p className="text-gray-700">
                            All images are provided under a free license, allowing both personal and commercial use.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            Why Choose PNGBay
                        </h2>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p className="text-gray-700">
                                ✔ 100% free PNG downloads<br />
                                ✔ No registration required<br />
                                ✔ High‑resolution, transparent images<br />
                                ✔ Commercial use allowed<br />
                                ✔ Fast, clean, and user‑friendly website
                            </p>
                        </div>
                        <p className="text-gray-700 mt-3">
                            We focus on quality, speed, and simplicity — so you can spend less time searching and more time creating.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            Our Vision
                        </h2>
                        <p className="text-gray-700 mb-3">
                            Our goal is to build one of the most reliable and comprehensive free PNG image libraries on the web. We continuously add new images and improve our platform to meet the needs of modern creators.
                        </p>
                        <p className="text-gray-700">
                            We also respect creators' rights and take copyright protection seriously. If you ever have concerns, our team is ready to help.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            Get in Touch
                        </h2>
                        <p className="text-gray-700 mb-2">
                            We love feedback and suggestions from our community.
                        </p>
                        <p className="text-gray-700 mb-1">
                            📧 Email: <a href="mailto:support@pngbay.com" className="text-[#0077a2] hover:underline font-medium">support@pngbay.com</a>
                        </p>
                        <p className="text-gray-700 mb-2">
                            🌐 Website: <a href="https://pngbay.com" className="text-[#0077a2] hover:underline font-medium">https://pngbay.com</a>
                        </p>
                        <p className="text-gray-700">
                            You can also visit our <Link href="/contact" className="text-[#0077a2] hover:underline font-medium">Contact Page</Link> to reach us directly.
                        </p>
                    </div>

                    <div className="text-center pt-4 border-t border-gray-200">
                        <p className="text-lg font-semibold text-gray-900">
                            PNGBay – Free HD Transparent PNG Images for Everyone
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}