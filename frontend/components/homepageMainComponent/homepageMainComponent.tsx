/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { getFetchData } from "@/utils/getFetchData";
import { SERVER_URL } from "@/utils/api";

import Footer from "../footer/footer";
import { Header } from "../header/header";
import { SearchingImage } from "../searchingImage/searchingImage";
import { Trendingimages } from "../trendingimages/trendingimages";
import { Trendingtags } from "../trendingtags/trendingtags";
import { setSearch } from "@/redux/features/getImages/getImageSlice";
import { TrendingImagesPagination } from "../trendingimages/trendingImagesPagination";
import { HomeCategories } from "../categories/homeCategories";
import { HowItWorks } from "../howItWorks/howItWorks";
import { UseCases } from "../useCases/useCases";
import { HomeReviews } from "../reviews/homeReviews";
import HomeFAQ from "../faq/homeFAQ";

interface ImagesData {
    count: number;
    images: any[];
}

/*
 * FIX CLS: Grid skeleton that exactly mirrors the Trendingimages grid layout.
 * Rendered while a new page of images is loading (on filter/page change).
 * This prevents the grid from collapsing and re-expanding, which causes CLS.
 */
const ImageGridSkeleton = () => (
    <section className="relative top-0 left-0 right-0 py-5 w-full bg-[#FBFAFF]">
        <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
            <div className="h-8 lg:h-10 w-96 bg-gray-200 rounded animate-pulse mx-auto mb-5" />
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 w-full mt-5">
                {Array.from({ length: 8 }).map((_, i) => (
                    /*
                     * aspect-square must match the aspect ratio used in Trendingimages
                     * cards so the skeleton height equals the real content height.
                     */
                    <div key={i} className="w-full aspect-square rounded-2xl bg-gray-200 animate-pulse" />
                ))}
            </div>
        </div>
    </section>
);

export const HomepageMainComponent = ({ initialImagesData }: { initialImagesData: ImagesData }) => {
    const [imagesData, setImagesData] = useState<ImagesData>(initialImagesData);

    /*
     * FIX LCP/CLS: useTransition marks the fetch + state update as a
     * non-urgent transition. React keeps the CURRENT content visible
     * (no blank flash) while the new data loads, then swaps atomically.
     * This prevents the CLS caused by the grid unmounting + remounting.
     */
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
        dispatch(setSearch(payload));
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

            /*
             * FIX LCP: scroll:false prevents the browser from scrolling to top
             * on every filter change, which would cause above-fold images to
             * change → re-triggering LCP measurement.
             */
            router.push(nextPath, { scroll: false });

            const url = `${SERVER_URL}/images/approved/home${queryParams ? `?${queryParams}` : ""}`;

            /*
             * FIX CLS: Wrap state update in startTransition so React keeps
             * existing DOM stable while fetching. Without this, setImagesData
             * immediately empties the grid → CLS spike.
             */
            startTransition(async () => {
                try {
                    const data = await getFetchData(url, { next: { revalidate: 120 } });
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

            {/*
             * FIX CLS: Show skeleton overlay while transition is pending instead
             * of unmounting the grid. isPending is true only during filter/page
             * changes – the initial SSR render always shows real content.
             */}
            {isPending ? (
                <ImageGridSkeleton />
            ) : (
                <Trendingimages imagesData={imagesData.images} />
            )}

            {imagesData?.count > 50 && (
                <TrendingImagesPagination count={imagesData?.count} />
            )}

            <HomeCategories />
            {/* <Trendingtags /> */}
            <HowItWorks />
            <UseCases />
            <HomeReviews />
            <HomeFAQ />
            <Footer />
        </>
    );
};