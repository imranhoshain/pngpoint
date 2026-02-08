import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000';
  
  const robotsTxt = `
User-agent: *
Content-Signal: search=yes,ai-train=no
Allow: /

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}