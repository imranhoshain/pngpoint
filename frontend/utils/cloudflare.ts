/**
 * Cloudflare Images URL helper
 * ─────────────────────────────────────────────────────────────────────────────
 * Converts a Cloudflare Images URL from any variant to a target variant.
 *
 * Cloudflare Images URLs follow this pattern:
 *   https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT>
 *
 * By switching the variant name at the end of the URL you get different
 * formats/sizes without storing extra copies.
 *
 * Setup steps (one-time, in Cloudflare dashboard):
 *   1. Go to Cloudflare Dashboard → Images → Variants
 *   2. Create variant "webp"  → WebP, width 700, quality 85, fit scale-down
 *   3. Create variant "thumb" → WebP, width 400, quality 80, fit scale-down
 *   4. Keep "public" as your original PNG fallback
 *
 * Usage:
 *   getCloudflareUrl(image.cloudflare_url)           // → .../webp  (default)
 *   getCloudflareUrl(image.cloudflare_url, 'thumb')  // → .../thumb
 *   getCloudflareUrl(image.cloudflare_url, 'public') // → original PNG
 */
export function getCloudflareUrl(
    url: string | undefined | null,
    variant: "webp" | "thumb" | "public" = "webp"
): string {
    if (!url) return "";

    try {
        // Cloudflare Images URL ends with /<variant>
        // Replace the last path segment with the requested variant
        const parts = url.split("/");
        if (parts.length < 2) return url;

        // Last segment is the variant name
        parts[parts.length - 1] = variant;
        return parts.join("/");
    } catch {
        return url;
    }
}

/**
 * Returns a srcSet string for responsive Cloudflare images.
 * Use this for the first 4 (above-fold) images to maximise LCP.
 *
 * Usage:
 *   <img
 *     src={getCloudflareUrl(image.cloudflare_url)}
 *     srcSet={getCloudflareeSrcSet(image.cloudflare_url)}
 *     sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
 *   />
 *
 * Requires Cloudflare variants: "thumb" (400px) and "webp" (700px)
 */
export function getCloudflareSrcSet(url: string | undefined | null): string {
    if (!url) return "";
    return [
        `${getCloudflareUrl(url, "thumb")} 400w`,
        `${getCloudflareUrl(url, "webp")} 700w`,
    ].join(", ");
}