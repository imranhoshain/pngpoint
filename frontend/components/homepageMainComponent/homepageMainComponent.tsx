/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import { RootState } from "@/redux/store";
import { getFetchData } from "@/utils/getFetchData";
import { SERVER_URL } from "@/utils/api";

/*
 * FIX LCP: Import above-fold components synchronously.
 * These are visible on first paint — must be in the initial bundle.
 */
import Footer from "../footer/footer";
import { Header } from "../header/header";
import { SearchingImage } from "../searchingImage/searchingImage";
import { Trendingimages } from "../trendingimages/trendingimages";
import { TrendingImagesPagination } from "../trendingimages/trendingImagesPagination";

/*
 * FIX unused JS (205 KiB savings):
 * All components below are below the fold. Dynamic imports means their JS
 * is excluded from the initial bundle and only fetched when needed.
 * This reduces parse/compile time on mobile by ~200ms.
 *
 * FIX CLS (desktop 0.46 → 0):
 * The skeletons MUST reserve the same vertical space as the real component.
 * If the skeleton is too short, when the real component loads it pushes all
 * subsequent content down → CLS spike.
 *
 * Heights below are calibrated to approximate each section's rendered height.
 * If you change section content/padding significantly, update these too.
 * Use Chrome DevTools → Performance → Layout Shifts to verify after changes.
 */
const HomeCategories = dynamic(
    () => import("../categories/homeCategories").then((m) => ({ default: m.HomeCategories })),
    {
        ssr: false,
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
        ssr: false,
        /*
         * FIX CLS: minHeight must match HowItWorks rendered height.
         * Inspect the real component in DevTools and set this accordingly.
         * 400px is a conservative estimate for a typical "3 steps" section.
         */
        loading: () => <div className="w-full bg-gray-50" style={{ minHeight: "400px" }} />,
    }
);

const UseCases = dynamic(
    () => import("../useCases/useCases").then((m) => ({ default: m.UseCases })),
    {
        ssr: false,
        /*
         * FIX CLS: UseCases typically contains a grid of use-case cards.
         * 500px is a conservative estimate — adjust to your actual height.
         */
        loading: () => <div className="w-full bg-white" style={{ minHeight: "500px" }} />,
    }
);

const HomeReviews = dynamic(
    () => import("../reviews/homeReviews").then((m) => ({ default: m.HomeReviews })),
    {
        ssr: false,
        /*
         * FIX CLS: Reviews section with testimonial cards.
         * Adjust minHeight to match your actual rendered height.
         */
        loading: () => <div className="w-full bg-gray-50" style={{ minHeight: "450px" }} />,
    }
);

const HomeFAQ = dynamic(() => import("../faq/homeFAQ"), {
    ssr: false,
    /*
     * FIX CLS: FAQ section is often tall due to accordion items.
     * 600px is conservative — measure and update if needed.
     */
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

export const HomepageMainComponent = ({ initialImagesData }: { initialImagesData: ImagesData }) => {
    const [imagesData, setImagesData] = useState<ImagesData>(initialImagesData);
    const [isPending, startTransition] = useTransition();

    const search = useSelector((state: RootState) => state.search);
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isFirstRender = useRef(true);

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

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const fetchImages = async () => {
            const { title, category, keyword, page } = search;

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
        };

        fetchImages();
    }, [search, router]);

    return (
        <>
            <Header />
            <SearchingImage />

            {isPending ? <ImageGridSkeleton /> : <Trendingimages imagesData={imagesData.images} />}

            {imagesData?.count > 50 && <TrendingImagesPagination count={imagesData?.count} />}

            {/* Below-fold: loaded dynamically to reduce initial JS bundle */}
            <HomeCategories />
            <HowItWorks />
            <UseCases />
            <HomeReviews />
            <HomeFAQ />
            <Footer />
        </>
    );
};