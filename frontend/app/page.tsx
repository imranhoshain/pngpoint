import { Suspense } from "react";
import { HomepageMainComponent } from "@/components/homepageMainComponent/homepageMainComponent";
import { HomeLoading } from "@/components/loading/homeLoading";
import { SERVER_URL } from "@/utils/api";

interface HomeProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
    const params = await searchParams;

    const title = typeof params.title === "string" ? params.title : "";
    const category = typeof params.category === "string" ? params.category : "";
    const keyword = typeof params.keyword === "string" ? params.keyword : "";
    const page = typeof params.page === "string" ? params.page : "1";

    const queryParams = new URLSearchParams(
        Object.entries({ title, category, keyword, page })
            .filter(([, v]) => v && v !== "1")
    ).toString();

    const url = `${SERVER_URL}/images/approved/${queryParams ? `?${queryParams}` : ""}`;

    const res = await fetch(url, { next: { revalidate: 120 } });
    const imagesData = await res.json();

    return (
        <section className="relative top-0 left-0 right-0 w-full">
            <Suspense fallback={<HomeLoading />}>
                <HomepageMainComponent initialImagesData={imagesData} />
            </Suspense>
        </section>
    );
}
