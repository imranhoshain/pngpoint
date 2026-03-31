/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef, useTransition, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import { RootState } from "@/redux/store";
import { getFetchData } from "@/utils/getFetchData";
import { SERVER_URL } from "@/utils/api";

/*
 * FIX LCP: Above-fold components remain synchronous imports.
 */
import Footer from "../footer/footer";
import { Header } from "../header/header";
import { SearchingImage } from "../searchingImage/searchingImage";
import { Trendingimages } from "../trendingimages/trendingimages";
import { TrendingImagesPagination } from "../trendingimages/trendingImagesPagination";

/*
 * FIX CLS: Changed ssr: false → ssr: true on all below-fold sections.
 *
 * ssr: false was the primary cause of CLS on desktop (0.46) and mobile (0.31).
 * With ssr: false, Next.js renders nothing on the server for these components.
 * The browser receives HTML with empty slots, hydrates, then the components
 * load and push all subsequent content down — a massive layout shift.
 *
 * With ssr: true the server renders the full HTML, so the browser never sees
 * an empty slot. The loading skeleton is now only shown during client-side
 * navigation (when the user changes pages/filters), not on initial load.
 *
 * IMPORTANT: If any of these components directly access `window`, `document`,
 * or `localStorage` at module scope (outside useEffect), they will throw during
 * SSR. Fix those by moving the access inside useEffect, or keep ssr: false
 * only for those specific components and add accurate minHeight skeletons.
 */
const HomeCategories = dynamic(
    () => import("../categories/homeCategories").then((m) => ({ default: m.HomeCategories })),
    {
        ssr: true,
        loading: () => (
            <div className="w-full bg-white py-5 lg:py-10" style={{ minHeight: "420px" }}>
                <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5">
                    <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-8" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        ),
    }
);

const HowItWorks = dynamic(
    () => import("../howItWorks/howItWorks").then((m) => ({ default: m.HowItWorks })),
    {
        ssr: true,
        loading: () => <div className="w-full bg-gray-50" style={{ minHeight: "400px" }} />,
    }
);

const UseCases = dynamic(
    () => import("../useCases/useCases").then((m) => ({ default: m.UseCases })),
    {
        ssr: true,
        loading: () => <div className="w-full bg-white" style={{ minHeight: "500px" }} />,
    }
);

const HomeReviews = dynamic(
    () => import("../reviews/homeReviews").then((m) => ({ default: m.HomeReviews })),
    {
        ssr: true,
        loading: () => <div className="w-full bg-gray-50" style={{ minHeight: "450px" }} />,
    }
);

const HomeFAQ = dynamic(() => import("../faq/homeFAQ"), {
    ssr: true,
    loading: () => <div className="w-full bg-white" style={{ minHeight: "600px" }} />,
});

interface ImagesData {
    count: number;
    images: any[];
}

const ImageGridSkeleton = () => (
    <section className="relative top-0 left-0 right-0 py-5 w-full bg-[#FBFAFF]">
        <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
            <div className="h-8 lg:h-10 w-96 bg-gray-200 rounded animate-pulse mx-auto mb-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 w-full mt-5">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-full aspect-square rounded-2xl bg-gray-200 animate-pulse" />
                ))}
            </div>
        </div>
    </section>
);

/*
 * FIX INP: Simple debounce hook to delay Redux dispatches on search input.
 * Prevents a Redux state update + full re-render on every single keystroke.
 */
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);
    return debouncedValue;
}

export const HomepageMainComponent = ({ initialImagesData }: { initialImagesData: ImagesData }) => {
    const [imagesData, setImagesData] = useState<ImagesData>(initialImagesData);
    const [isPending, startTransition] = useTransition();

    const search = useSelector((state: RootState) => state.search);
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isFirstRender = useRef(true);

    /*
     * FIX INP: Debounce the search state that triggers the fetch effect.
     * The search Redux state updates immediately (for URL sync), but the
     * actual API fetch is delayed by 300ms so rapid typing doesn't fire
     * multiple simultaneous requests or block the main thread.
     */
    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());
        const payload = {
            title: params.title ?? "",
            category: params.category ?? "",
            keyword: params.keyword ?? "",
            page: params.page ? Number(params.page) : 1,
        };
        dispatch({ type: "search/setSearch", payload });
    }, [searchParams, dispatch]);

    /*
     * FIX INP: Use debouncedSearch instead of search so this effect (which
     * calls router.push + fetch) only fires 300ms after the user stops typing.
     */
    const fetchImages = useCallback(async () => {
        const { title, category, keyword, page } = debouncedSearch;

        const queryParams = Object.entries({ title, category, keyword, page })
            .filter(([, value]) => value !== undefined && value !== null && value !== "" && value !== 1)
            .map(([key, value]) => {
                if (key === "keyword" && typeof value === "string") {
                    const slugValue = value.trim().replace(/\s+/g, "-").toLowerCase();
                    return `${encodeURIComponent(key)}=${encodeURIComponent(slugValue)}`;
                }
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            })
            .join("&");

        const nextPath = queryParams ? `/?${queryParams}` : "/";
        router.push(nextPath, { scroll: false });

        const url = `${SERVER_URL}/images/approved/home${queryParams ? `?${queryParams}` : ""}`;

        startTransition(async () => {
            try {
                const data = await getFetchData(url, { next: { revalidate: 300 } });
                setImagesData(data);
            } catch (error) {
                console.error("Failed to fetch images", error);
            }
        });
    }, [debouncedSearch, router]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        fetchImages();
    }, [fetchImages]);

    return (
        <>
            <Header />
            <SearchingImage />

            {isPending ? <ImageGridSkeleton /> : <Trendingimages imagesData={imagesData.images} />}

            {/*
             * FIX CLS: Always render a fixed-height wrapper for pagination,
             * even when there are ≤50 images. Without this, when pagination
             * appears (count > 50) it pushes content down causing a CLS spike.
             * The min-h-[52px] reserves the space pagination occupies.
             */}
            <div className="min-h-[52px]">
                {imagesData?.count > 50 && (
                    <TrendingImagesPagination count={imagesData?.count} />
                )}
            </div>

            {/* Below-fold sections — SSR enabled to eliminate CLS */}
            <HomeCategories />
            <HowItWorks />
            <UseCases />
            <HomeReviews />
            <HomeFAQ />
            <Footer />
        </>
    );
};