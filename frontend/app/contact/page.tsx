import Link from "next/link";

export default function Contact() {
    return (
        <section className="relative top-0 left-0 right-0 py-6 lg:py-12 w-full bg-[#FBFAFF]">
            <div className="max-w-screen-lg container mx-auto px-4 lg:px-6 w-full">
                <div className="bg-white shadow-sm rounded-2xl p-6 lg:p-10">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-gray-700 mb-6">
                        Welcome to <a 
                            href="https://pngbay.com" 
                            className="font-semibold text-[#0077a2] hover:text-[#005a7d] hover:underline transition-colors"
                        >
                            PNGBay (pngbay.com)
                        </a>! We are always happy to hear from our users. Whether you have questions, suggestions, or need support, you can reach out to us using the information below.
                    </p>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            1. General Inquiries
                        </h2>
                        <p className="text-gray-700 mb-2">
                            For general questions, feedback, or partnership opportunities, please email us at:
                        </p>
                        <p className="text-gray-700 mb-2">
                            📧 <a href="mailto:support@pngbay.com" className="text-[#0077a2] hover:underline font-medium">support@pngbay.com</a>
                        </p>
                        <p className="text-gray-700 italic">
                            We aim to respond within 24–48 hours.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            2. License & Copyright Questions
                        </h2>
                        <p className="text-gray-700 mb-2">
                            If you have questions regarding image usage, licensing, or need clarification on our License Agreement, please contact us at:
                        </p>
                        <p className="text-gray-700 mb-2">
                            📧 <a href="mailto:copyright@pngbay.com" className="text-[#0077a2] hover:underline font-medium">copyright@pngbay.com</a>
                        </p>
                        <p className="text-gray-700">
                            For DMCA takedown requests, refer to our <Link href="/dmca" className="text-[#0077a2] hover:underline font-medium">DMCA Page</Link>.
                        </p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            3. Business & Media Inquiries
                        </h2>
                        <p className="text-gray-700 mb-2">
                            For business partnerships, media requests, or collaborations, reach us at:
                        </p>
                        <p className="text-gray-700">
                            📧 <a href="mailto:business@pngbay.com" className="text-[#0077a2] hover:underline font-medium">business@pngbay.com</a>
                        </p>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            4. Social Media
                        </h2>
                        <p className="text-gray-700 mb-3">
                            Stay connected and get the latest updates, new PNG uploads, and design inspiration:
                        </p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                            <li>
                                Facebook: <a href="https://facebook.com/pngbay" target="_blank" rel="noopener noreferrer" className="text-[#0077a2] hover:underline">facebook.com/pngbay</a>
                            </li>
                            <li>
                                Twitter: <a href="https://twitter.com/pngbay" target="_blank" rel="noopener noreferrer" className="text-[#0077a2] hover:underline">twitter.com/pngbay</a>
                            </li>
                            <li>
                                Instagram: <a href="https://instagram.com/pngbay" target="_blank" rel="noopener noreferrer" className="text-[#0077a2] hover:underline">instagram.com/pngbay</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">
                            5. Contact Form (Optional)
                        </h2>
                        <p className="text-gray-700 mb-2">
                            You can also reach us directly via our website contact form: <a href="https://pngbay.com/contact" className="text-[#0077a2] hover:underline font-medium">https://pngbay.com/contact</a>
                        </p>
                        <p className="text-gray-700">
                            Please provide your name, email address, subject, and message, and we will get back to you as soon as possible.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}