/* eslint-disable @typescript-eslint/no-explicit-any */
import { SERVER_URL } from "@/utils/api";
import { getSubCategoryUrl } from "@/config/site";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    try {
        const [subCategoryRes, pageDataRes] = await Promise.all([
            fetch(`${SERVER_URL}/images/sub-categories/${slug}`, {
                next: { revalidate: 120 },
            }),
            fetch(`${SERVER_URL}/images/sub-categories/${slug}/page_data`, {
                next: { revalidate: 120 },
            }),
        ]);

        if (!subCategoryRes.ok) {
            return {
                title: "PNGPoint",
                description: "PNGPoint image details",
                alternates: { canonical: getSubCategoryUrl(slug) },
            };
        }

        const SingleSubCategoryResdata = await subCategoryRes.json();
        const data = SingleSubCategoryResdata?.data;

        let metaTitle = `Browse All PNG Image ${data.name} | Free Transparent PNGs | PNGPoint`;
        let metaDescription = "Discover our full collection of PNG images, neatly organized by category for quick and easy downloads.";

        if (pageDataRes.ok) {
            const pageData = await pageDataRes.json();
            if (pageData?.meta_title) metaTitle = pageData.meta_title;
            if (pageData?.meta_description) metaDescription = pageData.meta_description;
        }

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