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

    // Validate required data exists
    if (!data || !data.cloudflare_url) {
      return {
        title: "Image - PNGPoint",
        description: "PNGPoint image details",
        alternates: {
          canonical: getImageUrl(slug),
        },
      };
    }

    const imageUrl = data.cloudflare_url;

    return {
      title: `${data.title || 'Image'} - PNGPoint`,
      description: `Download high-quality ${data.description || 'image'} PNG with a transparent background, free to use for personal or commercial projects. Explore more related PNG images below—perfect for design, presentations, social media posts, and more.` || 'PNGPoint image details',
      keywords:typeof data.keywords === 'string' 
              ? data.keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
              : data.keywords,
      alternates: {
        canonical: getImageUrl(slug),
      },
      openGraph: {
        title: `${data.title || 'Image'} - PNGPoint`,
        description: `Download high-quality ${data.description || 'image'} PNG with a transparent background, free to use for personal or commercial projects. Explore more related PNG images below—perfect for design, presentations, social media posts, and more.` || 'PNGPoint image details',
        url: getImageUrl(slug),
        type: "website",
        images: [
          {
            url: imageUrl,
            width: data.width || 800,
            height: data.height || 600,
            alt: data.title || 'Image',
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: data.title || 'Image',
        description: `Download high-quality ${data.description || 'image'} PNG with a transparent background, free to use for personal or commercial projects. Explore more related PNG images below—perfect for design, presentations, social media posts, and more.`,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
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
      cache: 'force-cache',
    });

    if (!res.ok) {
      console.error(`Failed to fetch image data: ${res.status} ${res.statusText}`);
      return null;
    }

    const imageResdata = await res.json();
    const data = imageResdata?.image;

    // Validate essential data
    if (!data || !data.cloudflare_url) {
      console.error('Invalid image data structure');
      return null;
    }

    return {
      title: data.title || 'Untitled Image',
      description: data.description || '',
      caption: data.caption || data.title || 'Image',
      pageUrl: getImageUrl(slug),
      fileUrl: data.cloudflare_url,
      thumbnailUrl: data.thumbnail_url || data.cloudflare_url,
      width: data.width || 800,
      height: data.height || 600,
      fileSize: data.file_size || 0,
      keywords: data.keywords || data.tags || '',
      publishDate: data.created_at || new Date().toISOString(),
      modifiedDate: data.updated_at || new Date().toISOString(),
      categoryPageUrl: data.category_url || "https://pngpoint.com/",
      categoryName: data.category_name || "Images",
    };
  } catch (error) {
    console.error('Error fetching image data:', error);
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

  // Only create schema if we have valid image data
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
            "inLanguage": "en",
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
            "encodingFormat": "image/png",
            "width": imageData.width,
            "height": imageData.height,
            "contentSize": imageData.fileSize ? `${imageData.fileSize} KB` : undefined,
            "keywords": typeof imageData.keywords === 'string' 
              ? imageData.keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
              : imageData.keywords,
            "creator": {
              "@type": "Organization",
              "name": "PNGPoint",
              "url": "https://pngpoint.com/",
            },
            "license": "https://pngpoint.com/license",
            "acquireLicensePage": "https://pngpoint.com/license",
            "creditText": "PNGPoint",
            "copyrightNotice": "© PNGPoint",
            "isAccessibleForFree": true,
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
          strategy="afterInteractive"
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