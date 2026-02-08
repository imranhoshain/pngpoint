import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000';
  
  const robotsTxt = `# As a condition of accessing this website, you agree to abide by the following
# content signals:

# (a)  If a Content-Signal = yes, you may collect content for the corresponding
#      use.
# (b)  If a Content-Signal = no, you may not collect content for the
#      corresponding use.
# (c)  If the website operator does not include a Content-Signal for a
#      corresponding use, the website operator neither grants nor restricts
#      permission via Content-Signal with respect to the corresponding use.

# The content signals and their meanings are:

# search:   building a search index and providing search results (e.g., returning
#           hyperlinks and short excerpts from your website's contents). Search does not
#           include providing AI-generated search summaries.
# ai-input: inputting content into one or more AI models (e.g., retrieval
#           augmented generation, grounding, or other real-time taking of content for
#           generative AI search answers).
# ai-train: training or fine-tuning AI models.

# ANY RESTRICTIONS EXPRESSED VIA CONTENT SIGNALS ARE EXPRESS RESERVATIONS OF
# RIGHTS UNDER ARTICLE 4 OF THE EUROPEAN UNION DIRECTIVE 2019/790 ON COPYRIGHT
# AND RELATED RIGHTS IN THE DIGITAL SINGLE MARKET.

# BEGIN Cloudflare Managed content

User-agent: *
Content-Signal: search=yes,ai-train=no
Allow: /

User-agent: Amazonbot
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: meta-externalagent
Disallow: /

# END Cloudflare Managed Content

# Allow Google-Extended and GPTBot
User-agent: Google-Extended
Allow: /

User-agent: GPTBot
Allow: /

# AhrefsBot
User-agent: AhrefsBot
Disallow: /

# Barkrowler
User-agent: Barkrowler
Disallow: /

# DotBot
User-agent: DotBot
Disallow: /

# GrapeshotCrawler
User-agent: GrapeshotCrawler
Disallow: /

# HyScore
User-agent: HyScore
Disallow: /

# Qwantify
User-agent: Qwantify
Disallow: /

# SemrushBot
User-agent: SemrushBot
Disallow: /

# SeznamBot
User-agent: SeznamBot
Disallow: /

# TinEye-bot
User-agent: TinEye-bot
Disallow: /

# coccocbot-image
User-agent: coccocbot-image
Disallow: /

# coccocbot-web
User-agent: coccocbot-web
Disallow: /

# ia_archiver
User-agent: ia_archiver
Disallow: /

# musobot
User-agent: musobot
Disallow: /

# proximic
User-agent: proximic
Disallow: /

# Qwantify/Bleriot
User-agent: Qwantify/Bleriot
Disallow: /

# Baiduspider
User-agent: Baiduspider
Disallow: /

# MJ12bot
User-agent: MJ12bot
Disallow: /

# MauiBot
User-agent: MauiBot
Disallow: /

# weborama-fetcher
User-agent: weborama-fetcher
Disallow: /

# Clickagy Intelligence Bot
User-agent: Clickagy Intelligence Bot
Disallow: /

# Clickagy Intelligence Bot v2
User-agent: Clickagy Intelligence Bot v2
Disallow: /

# HubSpot Crawler
User-agent: HubSpot Crawler
Disallow: /

# Sogou web spider
User-agent: Sogou web spider
Disallow: /

# Sogou spider
User-agent: Sogou spider
Disallow: /

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