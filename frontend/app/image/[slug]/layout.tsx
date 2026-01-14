/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "@/components/footer/footer";
import { SingleImageHeader } from "@/components/header/single_image_header";
import { SERVER_URL } from "@/utils/api";
import { getImageUrl } from "@/config/site";
import { Metadata } from "next";
import React from "react";
import Script from "next/script";

type GenerateMetadataProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
    const { slug } = await params; 
    try {
        const res = await fetch(`${SERVER_URL}/images/${slug}`, {
            next: { revalidate: 120 },
        });

        if (!res.ok) {
            return {
                title: "Image - PNGPoint",
                description: "PNGPoint image details",
                alternates: { canonical: getImageUrl(slug) },
            };
        }

        const imageResdata = await res.json();
        const data = imageResdata?.image;

        const imageUrl = data.cloudflare_url;

        return {
            title: `${data.title || "Image"} - PNGPoint`,
            description: `Download high-quality ${data.description || "High-quality PNG image from PNGPoint"} PNG with a transparent background, free to use for personal or commercial projects.`,
            alternates: { canonical: getImageUrl(slug) },
            openGraph: {
                title: `${data.title || "Image"} - PNGPoint`,
                description: data.description || "High-quality PNG image from PNGPoint",
                url: getImageUrl(slug),
                type: "website",
                images: [
                    {
                        url: imageUrl,
                        width: data.width || 450,
                        height: data.height || 300,
                        alt: data.title || "PNGPoint Image",
                    },
                ],
            },
            twitter: {
                card: "summary_large_image",
                title: data.title || "Image - PNGPoint",
                description: data.description || "High-quality PNG image from PNGPoint",
                images: [imageUrl],
            },
        };
    } catch (error: any) {
        console.error(error.message);
        return {
            title: "Image - PNGPoint",
            description: "PNGPoint image details",
            alternates: { canonical: getImageUrl(slug) },
        };
    }
}

async function getImageData(slug: string) {
    try {
        const res = await fetch(`${SERVER_URL}/images/${slug}`, {
            next: { revalidate: 120 },
        });

        if (!res.ok) return null;

        const imageResdata = await res.json();
        const data = imageResdata?.image;

        return {
            title: data.title,
            description: data.description,
            caption: data.caption || data.title,
            pageUrl: getImageUrl(slug),
            fileUrl: data.cloudflare_url,
            thumbnailUrl: data.thumbnail_url || data.cloudflare_url,
            width: data.width,
            height: data.height,
            fileSize: data.file_size,
            keywords: data.keywords || data.tags || [],
            publishDate: data.created_at || new Date().toISOString(),
            modifiedDate: data.updated_at || new Date().toISOString(),
            categoryPageUrl: data.category_url || "https://pngpoint.com/",
            categoryName: data.category_name || "Images"
        };
    } catch (error: any) {
        console.error(error.message);
        return null;
    }
}

export default async function ImageRootLayout({ 
    children, 
    params 
}: { 
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const imageData = await getImageData(slug);

    // Generate ImageObject schema
    const imageSchema = imageData ? {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "name": imageData.title,
        "description": imageData.description,
        "caption": imageData.caption,
        "url": imageData.pageUrl,
        "contentUrl": imageData.fileUrl,
        "thumbnailUrl": imageData.thumbnailUrl,
        "fileFormat": "image/png",
        "encodingFormat": "image/png",
        "width": imageData.width,
        "height": imageData.height,
        "contentSize": imageData.fileSize,
        "keywords": imageData.keywords,
        "creator": {
            "@type": "Organization",
            "name": "PNGPoint",
            "url": "https://pngpoint.com/"
        },
        "creditText": "Image by PNGPoint",
        "license": "https://pngpoint.com/license",
        "acquireLicensePage": "https://pngpoint.com/acquire-license",
        "copyrightNotice": "© 2026 PNGPoint. All rights reserved.",
        "datePublished": imageData.publishDate,
        "dateModified": imageData.modifiedDate,
        "mainEntityOfPage": imageData.pageUrl,
        "representativeOfPage": true,
        "isPartOf": {
            "@type": "WebPage",
            "url": imageData.categoryPageUrl,
            "name": imageData.categoryName
        }
    } : null;

    return (
        <>
            {/* Add schema to head using Next.js Script component */}
            {imageSchema && (
                <Script
                    id="image-schema"
                    type="application/ld+json"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
                />
            )}
            
            <section className="relative top-0 left-0 right-0 w-full">
                <SingleImageHeader />
                {children}
                <Footer />
            </section>
        </>
    );
}