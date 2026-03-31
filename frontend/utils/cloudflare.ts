/**
 * Cloudflare Images URL helper
 * ─────────────────────────────────────────────────────────────────────────────
 * FIX image delivery (2,877–3,189 KiB savings):
 *
 * The previous default variant was "public" (original full-size PNG).
 * Any call to getCloudflareUrl(url) without a second argument was serving
 * uncompressed originals, which is why PageSpeed flagged enormous payloads.
 *
 * Default is now "webp" (700px wide, WebP, quality 85) — the smallest
 * variant suitable for display use.
 *
 * Cloudflare Images variant setup (Cloudflare Dashboard → Images → Variants):
 *   "webp"   → WebP, width 700, quality 85, fit scale-down  ← display default
 *   "thumb"  → WebP, width 400, quality 80, fit scale-down  ← mobile / srcset
 *   "small"  → WebP, width 200, quality 75, fit scale-down  ← category grids
 *   "public" → original PNG (keep for download button only)
 */
export function getCloudflareUrl(
    url: string | undefined | null,
    variant: "webp" | "thumb" | "small" | "public" = "webp" // FIX: was "public"
): string {
    if (!url) return "";

    try {
        const parts = url.split("/");
        if (parts.length < 2) return url;
        parts[parts.length - 1] = variant;
        return parts.join("/");
    } catch {
        return url;
    }
}

/**
 * Returns a srcSet string for responsive Cloudflare images.
 *
 * Use on above-fold images (index < 4) for LCP optimization.
 * Below-fold images should use just src={getCloudflareUrl(url)} (webp default)
 * with loading="lazy" — no srcSet needed since they won't affect LCP.
 *
 * Usage:
 *   <img
 *     src={getCloudflareUrl(image.cloudflare_url)}
 *     srcSet={getCloudflareSrcSet(image.cloudflare_url)}
 *     sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
 *   />
 */
export function getCloudflareSrcSet(url: string | undefined | null): string {
    if (!url) return "";
    return [
        `${getCloudflareUrl(url, "thumb")} 400w`,
        `${getCloudflareUrl(url, "webp")} 700w`,
    ].join(", ");
}

/**
 * Returns a small thumbnail URL for use in category grids, review avatars,
 * and any other UI where images are displayed at less than ~250px wide.
 *
 * Creates a "small" variant (200px WebP) which is ~4x smaller than "webp".
 * Make sure the "small" variant exists in your Cloudflare Images dashboard.
 */
export function getCloudflareThumbnailUrl(url: string | undefined | null): string {
    return getCloudflareUrl(url, "small");
}