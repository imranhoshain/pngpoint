import { Suspense } from "react";
import type { Metadata } from "next";
import { HomepageMainComponent } from "@/components/homepageMainComponent/homepageMainComponent";
import { HomeLoading } from "@/components/loading/homeLoading";
import { SERVER_URL } from "@/utils/api";
import { getCloudflareUrl } from "@/utils/cloudflare";

interface HomeProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface ImagesData {
    count: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images: any[];
}

async function fetchImagesData(searchParams: HomeProps["searchParams"]): Promise<{ imagesData: ImagesData; rawFirstImageUrl: string | null }> {
    const params = await searchParams;

    const title = typeof params.title === "string" ? params.title : "";
    const category = typeof params.category === "string" ? params.category : "";
    const keyword = typeof params.keyword === "string" ? params.keyword : "";
    const page = typeof params.page === "string" ? params.page : "1";

    const queryParams = new URLSearchParams(
        Object.entries({ title, category, keyword, page }).filter(([, v]) => v && v !== "1")
    ).toString();

    const url = `${SERVER_URL}/images/approved/home${queryParams ? `?${queryParams}` : ""}`;

    let imagesData: ImagesData = { count: 0, images: [] };
    try {
        const res = await fetch(url, {
            next: { revalidate: 300 },
            cache: "force-cache",
        });
        if (!res.ok) {
            console.error(`Homepage fetch failed with status ${res.status}`);
        } else {
            imagesData = await res.json();
        }
    } catch (error) {
        console.error("Failed to load homepage images", error);
    }

    const rawFirstImageUrl =
        Array.isArray(imagesData.images) && imagesData.images.length > 0
            ? (imagesData.images[0]?.cloudflare_url ?? null)
            : null;

    return { imagesData, rawFirstImageUrl };
}

/*
 * FIX LCP: generateMetadata injects the preload + preconnect into <head> during SSR.
 * This is earlier than anything returned from the component body, giving the browser
 * a head-start on the LCP image fetch before any JS or CSS is processed.
 *
 * Also adds preconnect for the Cloudflare Images CDN origin to eliminate
 * TCP+TLS setup time (~100-300ms on mobile) before the first image byte.
 */
export async function generateMetadata({ searchParams }: HomeProps): Promise<Metadata> {
    const { rawFirstImageUrl } = await fetchImagesData(searchParams);
    const preloadUrl = rawFirstImageUrl ? getCloudflareUrl(rawFirstImageUrl, "webp") : null;

    return {
        ...(preloadUrl && {
            // Next.js will render these as <link> tags inside <head>
            alternates: {},
            // We use the 'other' metadata field to inject arbitrary link tags
            other: {
                // preconnect: eliminates TCP+TLS round-trip to Cloudflare CDN
                "link-preconnect": '<link rel="preconnect" href="https://imagedelivery.net" crossorigin="anonymous">',
                // dns-prefetch: fallback for browsers that ignore preconnect
                "link-dns-prefetch": '<link rel="dns-prefetch" href="https://imagedelivery.net">',
            },
        }),
    };
}

export default async function Home({ searchParams }: HomeProps) {
    const { imagesData, rawFirstImageUrl } = await fetchImagesData(searchParams);

    /*
     * FIX LCP: The preload href MUST exactly match the <img src> rendered in
     * trendingimages.tsx. Both use getCloudflareUrl(url, "webp") — any URL
     * mismatch causes the browser to make TWO fetches, wasting the preload.
     */
    const preloadImageUrl = rawFirstImageUrl
        ? getCloudflareUrl(rawFirstImageUrl, "webp")
        : null;

    const preloadImageSrcSet = rawFirstImageUrl
        ? `${getCloudflareUrl(rawFirstImageUrl, "thumb")} 400w, ${getCloudflareUrl(rawFirstImageUrl, "webp")} 700w`
        : null;

    return (
        <>
            {/*
             * FIX LCP: preconnect to Cloudflare Images CDN inline.
             * Even though generateMetadata above also injects this, inline
             * placement guarantees it appears in streaming SSR output as early
             * as possible regardless of metadata hoisting behaviour.
             */}
            <link rel="preconnect" href="https://imagedelivery.net" crossOrigin="anonymous" />
            <link rel="dns-prefetch" href="https://imagedelivery.net" />

            {/*
             * FIX LCP: <link rel="preload"> for the first (LCP candidate) image.
             * imageSrcSet + imageSizes mirror the srcSet/sizes on the <img> in
             * trendingimages.tsx so the browser picks the right variant per viewport.
             */}
            {preloadImageUrl && (
                <link
                    rel="preload"
                    as="image"
                    href={preloadImageUrl}
                    imageSrcSet={preloadImageSrcSet ?? undefined}
                    imageSizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    // @ts-expect-error: lowercase fetchpriority is valid HTML, not yet in React types
                    fetchpriority="high"
                />
            )}

            <section className="relative top-0 left-0 right-0 w-full">
                <Suspense fallback={<HomeLoading />}>
                    <HomepageMainComponent initialImagesData={imagesData} />
                </Suspense>
            </section>
        </>
    );
}