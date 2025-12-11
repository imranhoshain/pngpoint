
const FALLBACK_DOMAIN = "https://pngpoint.com";

export const DOMAIN_NAME =
    process.env.NEXT_PUBLIC_DOMAIN_NAME || FALLBACK_DOMAIN;

export const MEDIA_URL =
    process.env.NEXT_PUBLIC_MEDIA_URL || DOMAIN_NAME;

export const SERVER_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || `${DOMAIN_NAME}/api/v1`;

export const ROW_DOMAIN_NAME =
    process.env.NEXT_PUBLIC_ROW_DOMAIN_NAME || "pngpoint.com";

