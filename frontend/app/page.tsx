import { Suspense, cache } from "react";
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

/*
 * FIX LCP: Wrap fetchImagesData in React.cache() so that generateMetadata
 * and the page component share a single fetch result per request.
 * Previously both called the function independently, causing two identical
 * requests to your backend on every page load.
 */
const fetchImagesData = cache(
    async (
        searchParams: HomeProps["searchParams"]
    ): Promise<{ imagesData: ImagesData; rawFirstImageUrl: string | null }> => {
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
            /*
             * FIX TTFB conflict: removed `cache: "force-cache"` which was overriding
             * `next: { revalidate: 300 }`. The two options conflict — force-cache caches
             * indefinitely and ignores the revalidate interval. Using revalidate alone
             * gives you ISR-style 5-minute caching without the conflict.
             */
            const res = await fetch(url, {
                next: { revalidate: 300 },
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
);

/*
 * generateMetadata now reuses the cached fetch result — no second request.
 */
export async function generateMetadata({ searchParams }: HomeProps): Promise<Metadata> {
    const { rawFirstImageUrl } = await fetchImagesData(searchParams);
    const preloadUrl = rawFirstImageUrl ? getCloudflareUrl(rawFirstImageUrl, "webp") : null;

    return {
        ...(preloadUrl && {
            alternates: {},
            other: {
                "link-preconnect":
                    '<link rel="preconnect" href="https://imagedelivery.net" crossorigin="anonymous">',
                "link-dns-prefetch": '<link rel="dns-prefetch" href="https://imagedelivery.net">',
            },
        }),
    };
}

export default async function Home({ searchParams }: HomeProps) {
    const { imagesData, rawFirstImageUrl } = await fetchImagesData(searchParams);

    const preloadImageUrl = rawFirstImageUrl
        ? getCloudflareUrl(rawFirstImageUrl, "webp")
        : null;

    /*
     * FIX LCP: Build the srcset string for the preload hint.
     * This must exactly match the srcSet on the <img> in trendingimages.tsx
     * so the browser uses the preloaded resource and doesn't fetch again.
     */
    const preloadImageSrcSet = rawFirstImageUrl
        ? `${getCloudflareUrl(rawFirstImageUrl, "thumb")} 400w, ${getCloudflareUrl(rawFirstImageUrl, "webp")} 700w`
        : null;

    return (
        <>
            <link rel="preconnect" href="https://imagedelivery.net" crossOrigin="anonymous" />
            <link rel="dns-prefetch" href="https://imagedelivery.net" />

            {preloadImageUrl && (
                /*
                 * FIX LCP: Use lowercase `imagesrcset` and `imagesizes` — these are the
                 * correct HTML attribute names. The previous version used `imageSrcSet`
                 * (camelCase) which React does NOT map to the correct HTML attribute,
                 * meaning the responsive preload hint was silently ignored by the browser.
                 *
                 * Also removed the @ts-expect-error on fetchpriority — React 18.3+ accepts
                 * it natively. If you're on an older version keep the suppression.
                 */
                <link
                    rel="preload"
                    as="image"
                    href={preloadImageUrl}
                    // @ts-expect-error: imagesrcset/imagesizes not yet in React's link types
                    imagesrcset={preloadImageSrcSet ?? undefined}
                    imagesizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    fetchPriority="high"
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