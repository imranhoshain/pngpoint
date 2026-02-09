// Define the image type
type ImageSlug = {
  slug: string;
  updatedAt: string;
};

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000';

  // Static routes
  const staticRoutes = ['', '/about', '/contact','/dmca','/license','/privacy','/terms'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  // Dynamic image routes
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/slugs`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    const imageData: ImageSlug[] = await response.json();

    const imageRoutes = imageData.map((image) => ({
      url: `${siteUrl}/image/${image.slug}`,
      lastModified: new Date(image.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...staticRoutes, ...imageRoutes];
  } catch (error) {
    console.error('Error fetching image URLs for sitemap:', error);
    return staticRoutes;
  }
}