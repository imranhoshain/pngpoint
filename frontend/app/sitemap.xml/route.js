import { NextResponse } from 'next/server';

export const revalidate = 3600; // Revalidate every hour (adjust as needed)
export const dynamic = 'force-dynamic'; // Always generate fresh

export async function GET() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000';
    
    // Fetch images from your API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/images/slugs`,
      {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    
    const imageData = await response.json();
    
    console.log(`Generating sitemap with ${imageData.length} images`);

    // Define static URLs
    const staticUrls = [
      { 
        loc: '/', 
        changefreq: 'daily', 
        priority: 1.0,
        lastmod: new Date().toISOString()
      },
      // Add other static pages here
      // Example:
      // { loc: '/about', changefreq: 'monthly', priority: 0.8 },
      // { loc: '/contact', changefreq: 'monthly', priority: 0.7 },
    ];

    // Pages to exclude (from your original config)
    const excludedPaths = [
      '/categories',
      '/forgot-password',
      '/password-change-successful',
      '/sub-categories',
      '/user/login',
      '/user/register',
    ];

    // Generate image URLs
    const imageUrls = imageData.map((image) => ({
      loc: `/image/${image.slug}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: image.updatedAt || new Date().toISOString(),
    }));

    // Combine all URLs
    const allUrls = [...staticUrls, ...imageUrls].filter(
      url => !excludedPaths.includes(url.loc)
    );

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${siteUrl}${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
    <lastmod>${url.lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000'}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`,
      {
        status: 500,
        headers: {
          'Content-Type': 'application/xml',
        },
      }
    );
  }
}