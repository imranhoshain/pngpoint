import Footer from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Contact PNGBay – Free PNG Image Support",
    description: "Contact PNGBay for support, copyright, licensing, or business inquiries related to free PNG images.",
    alternates: {
        canonical: "https://pngbay.com/contact",
    },
    keywords: [
        "contact pngbay",
        "png support",
        "png image help"
    ],
};

export default function ContactRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="relative top-0 left-0 right-0 w-full h-screen">
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
        </section>
    );
}
