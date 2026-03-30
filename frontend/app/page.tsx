import { Suspense } from "react";
import { HomepageMainComponent } from "@/components/homepageMainComponent/homepageMainComponent";
import { HomeLoading } from "@/components/loading/homeLoading";
import { SERVER_URL } from "@/utils/api";

interface HomeProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

interface ImagesData {
    count: number;
    images: unknown[];
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
        /*
         * FIX LCP: Increased revalidate from 120s → 300s (5 min).
         * Longer cache means more requests are served from edge cache,
         * drastically reducing TTFB and therefore LCP.
         *
         * Also added cache: "force-cache" as an explicit signal to Next.js
         * and the CDN to aggressively cache this response.
         */
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
     * FIX LCP: Extract the first image URL from the SSR data so we can
     * inject a <link rel="preload"> in the <head> for it. The LCP element
     * on most pages is the first image in the grid. Preloading it gives the
     * browser a head-start before it parses the component tree.
     *
     * This is the single highest-impact LCP fix available at the page level.
     */
    const firstImageUrl =
        Array.isArray((imagesData as any).images) && (imagesData as any).images.length > 0
            ? (imagesData as any).images[0]?.cloudflare_url
            : null;

    return (
        <>
            {/*
             * FIX LCP: Preload the first (LCP candidate) image.
             * Place this as early as possible in the document head so the
             * browser starts fetching it before it processes JS/CSS.
             *
             * as="image" + fetchpriority="high" ensures highest fetch priority.
             * imageSrcSet / imagesizes can be added if you serve responsive images.
             */}
            {firstImageUrl && (
                <link
                    rel="preload"
                    as="image"
                    href={firstImageUrl}
                    // @ts-expect-error: fetchpriority is a valid HTML attribute not yet in React types
                    fetchpriority="high"
                />
            )}

            <section className="relative top-0 left-0 right-0 w-full">
                {/*
                 * FIX LCP: HomeLoading (the Suspense fallback) must reserve
                 * the same vertical space as HomepageMainComponent.
                 * If HomeLoading renders a tiny spinner, the page jumps when
                 * the real content loads → CLS + delayed LCP measurement.
                 * Ensure HomeLoading renders a full-height skeleton.
                 */}
                <Suspense fallback={<HomeLoading />}>
                    <HomepageMainComponent initialImagesData={imagesData} />
                </Suspense>
            </section>
        </>
    );
}