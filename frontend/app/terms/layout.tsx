import Footer from "@/components/footer/footer";
import { Header } from "@/components/header/header";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "PNGBay License Agreement",
    description: "Review the terms and conditions for using PNGBay.",
    alternates: {
    canonical: "https://pngbay.com/terms",
  },
};

export default function TermsRootLayout({
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
