/* eslint-disable @typescript-eslint/no-explicit-any */
import { SERVER_URL } from "@/utils/api";
import { getSubCategoryUrl } from "@/config/site";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    try {
        const res = await fetch(`${SERVER_URL}/images/sub-categories/${slug}/page_data`, {
            next: { revalidate: 120 },
        });
        if (!res.ok) {
            return {
                title: "PNGPoint",
                description: "PNGPoint image details",
                alternates: { canonical: getSubCategoryUrl(slug) },
            };
        }
        const data = await res.json();
        const metaTitle = data?.meta_title;
        const metaDescription = data?.meta_description;

        return {
            title: metaTitle,
            description: metaDescription,
            alternates: {
                canonical: getSubCategoryUrl(slug),
            },
        };

    } catch (error: any) {
        console.log(error.message);
        return {
            title: "PNGPoint",
            description: "PNGPoint image details",
            alternates: { canonical: getSubCategoryUrl(slug) },
        };
    }
}

export default function SingleSubCategoryRootLayout({
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