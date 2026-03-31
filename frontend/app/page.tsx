import { Suspense } from "react";
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

export default async function Home({ searchParams }: HomeProps) {
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

    /*
     * FIX LCP — preload URL must EXACTLY match the <img src> the browser fetches.
     *
     * BEFORE (broken): preload href = raw cloudflare_url  (e.g. .../public/image.png)
     *                  img src      = getCloudflareUrl(url, "webp")  (e.g. .../webp/image.png)
     * → Browser preloads one URL, then fetches a DIFFERENT URL for the img.
     *   The preload is completely wasted — the browser makes two requests.
     *
     * AFTER (fixed): both preload href AND img src use getCloudflareUrl(..., "webp")
     * → Browser starts fetching the exact same resource from the preload tag,
     *   so when the img element is parsed the resource is already in cache.
     *
     * imageSrcSet + imageSizes mirror the srcSet/sizes on the <img> so the
     * browser picks the correct variant for the current viewport.
     */
    const rawFirstImageUrl =
        Array.isArray(imagesData.images) && imagesData.images.length > 0
            ? imagesData.images[0]?.cloudflare_url
            : null;

    // Transform to WebP variant — must match USE_CLOUDFLARE_WEBP=true in trendingimages.tsx
    const preloadImageUrl = rawFirstImageUrl
        ? getCloudflareUrl(rawFirstImageUrl, "webp")
        : null;

    // Build srcset for the preload — mirrors getCloudflareSrcSet() output
    const preloadImageSrcSet = rawFirstImageUrl
        ? `${getCloudflareUrl(rawFirstImageUrl, "thumb")} 400w, ${getCloudflareUrl(rawFirstImageUrl, "webp")} 700w`
        : null;

    return (
        <>
            {/*
             * FIX LCP: Preload the first (LCP candidate) image.
             *
             * Placed as early as possible so the browser queues the fetch
             * before it processes any JS or CSS.
             *
             * as="image" + fetchpriority="high" = highest browser fetch priority.
             * imageSrcSet / imageSizes = hints the browser to the correct variant
             * for each viewport, matching the <img srcSet sizes> in trendingimages.tsx.
             */}
            {preloadImageUrl && (
                <link
                    rel="preload"
                    as="image"
                    href={preloadImageUrl}
                    // @ts-expect-error: imageSrcSet is valid HTML but not in React types yet
                    imageSrcSet={preloadImageSrcSet ?? undefined}
                    // @ts-expect-error: imageSizes is valid HTML but not in React types yet
                    imageSizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    // @ts-expect-error: fetchpriority is a valid HTML attribute not yet in React types
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