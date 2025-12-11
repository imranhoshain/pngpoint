/* eslint-disable @typescript-eslint/no-explicit-any */
import { DOMAIN_NAME, SERVER_URL } from "@/utils/api";
import { Metadata } from "next";
import React from "react";

// Async function to generate page metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    try {
        const res = await fetch(`${SERVER_URL}/images/categories/${slug}/`, {
            next: { revalidate: 120 },
        });

        if (!res.ok) {
            return {
                title: "PNGPoint",
                description: "PNGPoint image details",
                alternates: { canonical: `${DOMAIN_NAME}/categories/${slug}` },
            };
        }

        const SingleCategoryResdata = await res.json();
        const data = SingleCategoryResdata?.data;

        return {
            title: `Browse All PNG Image ${data.name} | Free Transparent PNGs | PNGPoint`,
            description: "Discover our full collection of PNG images, neatly organized by category for quick and easy downloads.",
            alternates: { canonical: `${DOMAIN_NAME}/categories/${slug}` },
        };
    } catch (error: any) {
        console.error(error.message);
        return {
            title: "PNGPoint",
            description: "PNGPoint image details",
            alternates: { canonical: `${DOMAIN_NAME}/categories/${slug}` },
        };
    }
}

// Root layout for the category page
export default function SingleCategoryRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="relative top-0 left-0 right-0 w-full">
            {children}
        </section>
    );
}
