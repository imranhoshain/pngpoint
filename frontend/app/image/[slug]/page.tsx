import { SingleImages } from "@/components/singleimages/singleimages";
import { getImageUrl } from "@/config/site";

type SingleImageProps = {
  params: Promise<{ slug: string }>;
};

// Keep async only for params (Next.js 15 requirement)
// But DO NOT fetch data here!
export default async function SingleImage({ params }: SingleImageProps) {
  const { slug } = await params; // This is fast - just unwrapping params
  const pageUrl = getImageUrl(slug);

  // REMOVED the slow getFetchData call!
  // The SingleImages component will fetch data on the client side and show skeletons

  return (
    <section className="relative py-5 lg:py-10 w-full bg-white">
      <div className="max-w-screen-2xl container mx-auto px-2.5 lg:px-5 w-full">
        {/* Pass null instead of image - component will show skeleton immediately */}
        <SingleImages image={null} pageUrl={pageUrl} slug={slug} />
      </div>
    </section>
  );
}

// Optional: Add metadata without blocking page render
export async function generateMetadata({ params }: SingleImageProps) {
  const { slug } = await params;
  
  return {
    title: `Image ${slug} | Your Site`,
    description: 'View image details and related images',
  };
}