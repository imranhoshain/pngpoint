/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "@/components/footer/footer";
import { SingleImageHeader } from "@/components/header/single_image_header";
import { SERVER_URL } from "@/utils/api";
import { getImageUrl } from "@/config/site";
import { Metadata } from "next";
import React from "react";
import Script from "next/script";

/* =========================
   METADATA
========================= */

type GenerateMetadataProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: GenerateMetadataProps
): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(`${SERVER_URL}/images/${slug}`, {
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      return {
        title: "Image - PNGPoint",
        description: "PNGPoint image details",
        alternates: {
          canonical: getImageUrl(slug),
        },
      };
    }

    const imageResdata = await res.json();
    const data = imageResdata?.image;
    const imageUrl = data.cloudflare_url;

    return {
      title: `${data.title} - PNGPoint`,
      description: data.description,
      alternates: {
        canonical: getImageUrl(slug),
      },
      openGraph: {
        title: `${data.title} - PNGPoint`,
        description: data.description,
        url: getImageUrl(slug),
        type: "website",
        images: [
          {
            url: imageUrl,
            width: data.width,
            height: data.height,
            alt: data.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: data.title,
        description: data.description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "Image - PNGPoint",
      description: "PNGPoint image details",
      alternates: {
        canonical: getImageUrl(slug),
      },
    };
  }
}

/* =========================
   IMAGE DATA FETCH
========================= */

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
      categoryName: data.category_name || "Images",
    };
  } catch {
    return null;
  }
}

/* =========================
   LAYOUT
========================= */

export default async function ImageRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const imageData = await getImageData(slug);

  const imageSchema = imageData
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": imageData.pageUrl,
            "url": imageData.pageUrl,
            "name": imageData.title,
            "description": imageData.description,
            "primaryImageOfPage": {
              "@id": `${imageData.pageUrl}#image`,
            },
          },
          {
            "@type": "ImageObject",
            "@id": `${imageData.pageUrl}#image`,
            "name": imageData.title,
            "description": imageData.description,
            "caption": imageData.caption,
            "contentUrl": imageData.fileUrl,
            "thumbnailUrl": imageData.thumbnailUrl,
            "fileFormat": "image/png",
            "width": imageData.width,
            "height": imageData.height,
            "contentSize": imageData.fileSize,
            "keywords": Array.isArray(imageData.keywords)
              ? imageData.keywords.join(", ")
              : imageData.keywords,
            "creator": {
              "@type": "Organization",
              "name": "PNGPoint",
              "url": "https://pngpoint.com/",
            },
            "license": "https://pngpoint.com/license",
            "acquireLicensePage": "https://pngpoint.com/acquire-license",
            "datePublished": imageData.publishDate,
            "dateModified": imageData.modifiedDate,
          },
        ],
      }
    : null;

  return (
    <>
      {imageSchema && (
        <Script
          id="image-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(imageSchema),
          }}
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