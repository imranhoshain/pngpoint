import Footer from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PNGBay License Agreement",
  description: "PNGBay's DMCA Copyright Policy explains how copyright owners can report content infringement and how we handle takedown requests.",
  alternates: {
    canonical: "https://pngbay.com/dmca",
  },
};

export default function DMCA() {
    return (
        <>
            <Header />
            <section className="relative top-0 left-0 right-0 py-6 lg:py-12 w-full bg-[#FBFAFF]">
                <div className="max-w-screen-lg container mx-auto px-4 lg:px-6 w-full">
                    <div className="bg-white shadow-sm rounded-2xl p-6 lg:p-10">
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                            DMCA Copyright Policy
                        </h1>
                        <p className="text-gray-700 mb-6">
                            <a 
                                href="https://pngbay.com" 
                                className="font-semibold text-[#0077a2] hover:text-[#005a7d] hover:underline transition-colors"
                            >
                                PNGBay (pngbay.com)
                            </a> respects the intellectual property rights of others and expects its users to do the same. This Digital Millennium Copyright Act (DMCA) Policy explains how copyright owners can report content they believe infringes their rights.
                        </p>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                1. Copyright Infringement Notification
                            </h2>
                            <p className="text-gray-700 mb-3">
                                If you are a copyright owner (or authorized to act on behalf of one) and believe that any content available on PNGBay infringes your copyright, you may submit a DMCA takedown notice.
                            </p>
                            <p className="text-gray-700 mb-2 font-medium">
                                Your notification must include the following information:
                            </p>
                            <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                                <li>Your full name, company name (if applicable), and contact information (email address).</li>
                                <li>A description of the copyrighted work you claim has been infringed.</li>
                                <li>The exact URL(s) of the infringing content on PNGBay.</li>
                                <li>A statement that you have a good‑faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law.</li>
                                <li>A statement that the information in your notice is accurate, and under penalty of perjury, that you are the copyright owner or authorized to act on their behalf.</li>
                                <li>Your physical or electronic signature.</li>
                            </ol>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                2. How to Submit a DMCA Notice
                            </h2>
                            <p className="text-gray-700 mb-2">
                                Please send your DMCA takedown request via email to:
                            </p>
                            <p className="text-gray-700 mb-2">
                                📧 <a href="mailto:copyright@pngbay.com" className="text-[#0077a2] hover:underline font-medium">copyright@pngbay.com</a>
                            </p>
                            <p className="text-gray-700 mb-2 font-medium">
                                Use the subject line:
                            </p>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200 inline-block">
                                DMCA Takedown Request
                            </p>
                            <p className="text-gray-700 mt-3 italic">
                                Incomplete or improperly formatted notices may be delayed or ignored.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                3. Action Upon Receipt of a Valid Notice
                            </h2>
                            <p className="text-gray-700 mb-2">
                                Upon receiving a valid DMCA notice, PNGBay will:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                <li>Review the claim promptly</li>
                                <li>Remove or disable access to the allegedly infringing content</li>
                                <li>Notify the content uploader, if applicable</li>
                            </ul>
                            <p className="text-gray-700 mt-3">
                                PNGBay reserves the right to remove content at its sole discretion.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                4. Counter‑Notification
                            </h2>
                            <p className="text-gray-700 mb-3">
                                If you believe that content you uploaded was removed or disabled as a result of a mistake or misidentification, you may submit a counter‑notification.
                            </p>
                            <p className="text-gray-700 mb-2 font-medium">
                                Your counter‑notification must include:
                            </p>
                            <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4 mb-3">
                                <li>Your name and contact information</li>
                                <li>Identification of the content that was removed and its previous URL</li>
                                <li>A statement under penalty of perjury that you believe the content was removed due to a mistake or misidentification</li>
                                <li>A statement consenting to the jurisdiction of your local federal court</li>
                                <li>Your physical or electronic signature</li>
                            </ol>
                            <p className="text-gray-700">
                                Counter‑notifications should be sent to: <a href="mailto:copyright@pngbay.com" className="text-[#0077a2] hover:underline font-medium">copyright@pngbay.com</a>
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                5. Repeat Infringers
                            </h2>
                            <p className="text-gray-700">
                                PNGBay may terminate access for users who are found to be repeat infringers, in accordance with applicable copyright laws.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                6. Disclaimer
                            </h2>
                            <p className="text-gray-700">
                                PNGBay does not host or upload content with the intent to infringe copyrights. Images are provided by contributors or believed to be licensed for free use. However, PNGBay does not guarantee that all content is free from third‑party rights.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                7. Contact Information
                            </h2>
                            <p className="text-gray-700 mb-2">
                                For questions regarding this DMCA Policy, please contact:
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