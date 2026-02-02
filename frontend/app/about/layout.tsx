import Footer from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "About PNGBay – Free Transparent PNG Image Platform",
    description: "Learn about PNGBay, a free platform offering high-quality transparent PNG images for personal and commercial use.",
    alternates: {
        canonical: "https://pngbay.com/about",
    },
    keywords: [
        "about pngbay",
        "free png website",
        "transparent png platform"
    ],
};

export default function AboutRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="relative top-0 left-0 right-0 w-full h-screen">
            <Header />
            {children}
            <Footer />
        </section>
    );
}
