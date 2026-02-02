/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "@/components/footer/footer";
import { SingleImageHeader } from "@/components/header/single_image_header";
import { SERVER_URL } from "@/utils/api";
import { getImageUrl } from "@/config/site";
import { Metadata } from "next";
import React from "react";

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
        title: "Image - PNGBay",
        description: "PNGBay image details",
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
        title: "Image - PNGBay",
        description: "PNGBay image details",
        alternates: {
          canonical: getImageUrl(slug),
        },
      };
    }

    const imageUrl = data.cloudflare_url;

    // Process keywords safely
    const keywords = data.keywords && Array.isArray(data.keywords) 
      ? data.keywords.map((item: any) => item.name || item).filter(Boolean).join(', ')
      : '';

    return {
      title: `${data.title || 'Image'} - PNGBay`,
      description: `The ${data.title || 'image'} image is a high-quality, transparent background graphic designed for creative and professional use. This PNG file is available in HD resolution and can be downloaded for free from PNGBay. You can use this transparent PNG in website designs, presentations, social media graphics, posters, advertisements, and digital projects.This PNG is free for both personal and commercial use under the PNGBay license. No attribution is required, and you can resize or modify the image to suit your project needs.`,
      keywords: keywords || undefined,
      alternates: {
        canonical: getImageUrl(slug),
      },
      openGraph: {
        title: `${data.title || 'Image'} - PNGBay`,
        description: `The ${data.title || 'image'} image is a high-quality, transparent background graphic designed for creative and professional use. This PNG file is available in HD resolution and can be downloaded for free from PNGBay. You can use this transparent PNG in website designs, presentations, social media graphics, posters, advertisements, and digital projects.This PNG is free for both personal and commercial use under the PNGBay license. No attribution is required, and you can resize or modify the image to suit your project needs.`,
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
        description: `The ${data.title || 'image'} image is a high-quality, transparent background graphic designed for creative and professional use. This PNG file is available in HD resolution and can be downloaded for free from PNGBay. You can use this transparent PNG in website designs, presentations, social media graphics, posters, advertisements, and digital projects.This PNG is free for both personal and commercial use under the PNGBay license. No attribution is required, and you can resize or modify the image to suit your project needs.`,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Image - PNGBay",
      description: "PNGBay image details",
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

    // Process keywords for schema
    let processedKeywords = '';
    if (data.keywords) {
      if (Array.isArray(data.keywords)) {
        processedKeywords = data.keywords.map((item: any) => item.name || item).filter(Boolean).join(',');
      } else if (typeof data.keywords === 'string') {
        processedKeywords = data.keywords;
      }
    } else if (data.tags) {
      if (Array.isArray(data.tags)) {
        processedKeywords = data.tags.map((item: any) => item.name || item).filter(Boolean).join(',');
      } else if (typeof data.tags === 'string') {
        processedKeywords = data.tags;
      }
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
      keywords: processedKeywords,
      publishDate: data.created_at || new Date().toISOString(),
      modifiedDate: data.updated_at || new Date().toISOString(),
      categoryPageUrl: data.category_url || "https://pngbay.com/",
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

  return (
    <>
      <section className="relative top-0 left-0 right-0 w-full">
        <SingleImageHeader imageData={imageData} />
        {children}
        <Footer />
      </section>
    </>
  );
}